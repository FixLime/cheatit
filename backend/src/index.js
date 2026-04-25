import express from 'express';
import { PORT, API_KEY, CALIBRATION_MATCHES } from './config.js';
import { db, playerRepo, matchRepo } from './db.js';
import { createServer, deleteServer } from './serverProvider.js';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json());

// Auth middleware for plugin → backend calls
function requireApiKey(req, res, next) {
  if (req.headers['x-api-key'] !== API_KEY)
    return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── MATCH MANAGEMENT ─────────────────────────────────────────────────────────

// POST /api/matches — create a new match and spin up a server
app.post('/api/matches', requireApiKey, async (req, res) => {
  try {
    const { map = 'de_mirage', spreadMode = 'spread', playerIds = [] } = req.body;
    const matchId = randomUUID();

    matchRepo.create({
      id: matchId, map, status: 'pending',
      spread_mode: spreadMode,
      server_ip: null, server_port: null,
    });

    // Spin up CS2 server
    const server = await createServer(matchId, map);

    db.prepare(`UPDATE matches SET status='configuring', server_ip=?, server_port=? WHERE id=?`)
      .run(server.ip, server.port, matchId);

    res.json({
      matchId,
      connect: `connect ${server.ip}:${server.port}`,
      ip:       server.ip,
      port:     server.port,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/matches/:id
app.get('/api/matches/:id', (req, res) => {
  const match = matchRepo.get(req.params.id);
  if (!match) return res.status(404).json({ error: 'Not found' });
  const players = db.prepare('SELECT * FROM match_players WHERE match_id = ?').all(req.params.id);
  res.json({ match, players });
});

// DELETE /api/matches/:id/server — tear down server after match
app.delete('/api/matches/:id/server', requireApiKey, async (req, res) => {
  await deleteServer(req.params.id);
  res.json({ ok: true });
});

// ── ELO ENDPOINTS (called by CS2 plugin) ────────────────────────────────────

// GET /api/elo/batch?ids=steamid1,steamid2,...
app.get('/api/elo/batch', requireApiKey, (req, res) => {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  if (!ids.length) return res.json({});

  const rows = playerRepo.getMany(ids);
  const map  = {};
  for (const r of rows) {
    map[r.steam_id] = {
      steamId:       r.steam_id,
      name:          r.name,
      elo:           r.elo,
      matchesPlayed: r.matches_played,
      isCalibrated:  !!r.is_calibrated,
      kdRatio:       r.total_deaths > 0 ? r.total_kills / r.total_deaths : r.total_kills,
      winRate:       r.wins + r.losses > 0 ? r.wins / (r.wins + r.losses) : 0,
    };
  }
  // Fill missing players with defaults
  for (const id of ids) {
    if (!map[id]) map[id] = {
      steamId: id, name: '', elo: 1000, matchesPlayed: 0, isCalibrated: false,
    };
  }
  res.json(map);
});

// POST /api/elo/update — plugin posts match results
app.post('/api/elo/update', requireApiKey, (req, res) => {
  const { matchId, tScore, ctScore, winnerTeam, changes } = req.body;
  if (!matchId || !changes) return res.status(400).json({ error: 'Missing fields' });

  const updateTx = db.transaction(() => {
    matchRepo.finish(matchId, tScore, ctScore, winnerTeam);

    for (const c of changes) {
      // Upsert player
      const existing = playerRepo.get(String(c.steamId)) || {
        steam_id: String(c.steamId), name: c.name,
        elo: c.oldElo, matches_played: 0, is_calibrated: 0,
        total_kills: 0, total_deaths: 0, total_assists: 0,
        total_damage: 0, total_hs_kills: 0, wins: 0, losses: 0,
      };

      playerRepo.upsert({
        steam_id:      String(c.steamId),
        name:          c.name || existing.name,
        elo:           c.newElo,
        matches_played: c.matchesPlayed,
        is_calibrated: c.isCalibrated ? 1 : 0,
        total_kills:   existing.total_kills   + (c.kills   || 0),
        total_deaths:  existing.total_deaths  + (c.deaths  || 0),
        total_assists: existing.total_assists + (c.assists || 0),
        total_damage:  existing.total_damage  + (c.damage  || 0),
        total_hs_kills:existing.total_hs_kills+ (c.hsKills || 0),
        wins:          existing.wins   + (c.won ? 1 : 0),
        losses:        existing.losses + (c.won ? 0 : 1),
      });

      // Record match player entry
      matchRepo.addPlayer({
        match_id:   matchId,
        steam_id:   String(c.steamId),
        team:       c.team || '',
        kills:      c.kills  || 0,
        deaths:     c.deaths || 0,
        assists:    c.assists|| 0,
        damage:     c.damage || 0,
        hs_kills:   c.hsKills|| 0,
        elo_before: c.oldElo,
        elo_after:  c.newElo,
        elo_delta:  c.delta,
        won:        c.won ? 1 : 0,
      });
    }
  });

  updateTx();
  res.json({ ok: true });
});

// ── PLAYER / LEADERBOARD ─────────────────────────────────────────────────────

app.get('/api/players/:steamId', (req, res) => {
  const p = playerRepo.get(req.params.steamId);
  if (!p) return res.status(404).json({ error: 'Player not found' });
  const matches = db.prepare(
    'SELECT mp.*, m.map, m.t_score, m.ct_score, m.winner_team, m.created_at FROM match_players mp JOIN matches m ON mp.match_id = m.id WHERE mp.steam_id = ? ORDER BY m.created_at DESC LIMIT 20'
  ).all(req.params.steamId);
  res.json({ player: p, recentMatches: matches });
});

app.get('/api/leaderboard', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100'), 500);
  res.json(playerRepo.topN(limit));
});

// ── HEALTH ───────────────────────────────────────────────────────────────────

app.get('/health', (_, res) => res.json({ status: 'ok', calibrationMatches: CALIBRATION_MATCHES }));

app.listen(PORT, () => console.log(`CHEATIT backend running on :${PORT}`));
