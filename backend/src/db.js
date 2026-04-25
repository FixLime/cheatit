import Database from 'better-sqlite3';
import { DB_PATH } from './config.js';

export const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    steam_id       TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    elo            INTEGER NOT NULL DEFAULT 1000,
    matches_played INTEGER NOT NULL DEFAULT 0,
    is_calibrated  INTEGER NOT NULL DEFAULT 0,  -- 0/1
    total_kills    INTEGER NOT NULL DEFAULT 0,
    total_deaths   INTEGER NOT NULL DEFAULT 0,
    total_assists  INTEGER NOT NULL DEFAULT 0,
    total_damage   INTEGER NOT NULL DEFAULT 0,
    total_hs_kills INTEGER NOT NULL DEFAULT 0,
    wins           INTEGER NOT NULL DEFAULT 0,
    losses         INTEGER NOT NULL DEFAULT 0,
    created_at     TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS matches (
    id          TEXT PRIMARY KEY,
    map         TEXT,
    t_score     INTEGER DEFAULT 0,
    ct_score    INTEGER DEFAULT 0,
    winner_team TEXT,
    spread_mode TEXT,
    server_ip   TEXT,
    server_port INTEGER,
    status      TEXT NOT NULL DEFAULT 'pending',  -- pending/live/finished
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    finished_at TEXT
  );

  CREATE TABLE IF NOT EXISTS match_players (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id   TEXT NOT NULL REFERENCES matches(id),
    steam_id   TEXT NOT NULL,
    team       TEXT NOT NULL,
    kills      INTEGER DEFAULT 0,
    deaths     INTEGER DEFAULT 0,
    assists    INTEGER DEFAULT 0,
    damage     INTEGER DEFAULT 0,
    hs_kills   INTEGER DEFAULT 0,
    elo_before INTEGER DEFAULT 0,
    elo_after  INTEGER DEFAULT 0,
    elo_delta  INTEGER DEFAULT 0,
    won        INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS servers (
    id          TEXT PRIMARY KEY,
    match_id    TEXT,
    provider    TEXT,    -- dathost | docker
    external_id TEXT,    -- provider's server ID
    ip          TEXT,
    port        INTEGER,
    rcon_pass   TEXT,
    status      TEXT DEFAULT 'idle'  -- idle/configuring/live/done
  );
`);

export const playerRepo = {
  get: (steamId) => db.prepare('SELECT * FROM players WHERE steam_id = ?').get(steamId),

  getMany: (steamIds) => {
    const placeholders = steamIds.map(() => '?').join(',');
    return db.prepare(`SELECT * FROM players WHERE steam_id IN (${placeholders})`).all(...steamIds);
  },

  upsert: (p) => db.prepare(`
    INSERT INTO players (steam_id, name, elo, matches_played, is_calibrated,
      total_kills, total_deaths, total_assists, total_damage, total_hs_kills, wins, losses)
    VALUES (@steam_id, @name, @elo, @matches_played, @is_calibrated,
      @total_kills, @total_deaths, @total_assists, @total_damage, @total_hs_kills, @wins, @losses)
    ON CONFLICT(steam_id) DO UPDATE SET
      name           = excluded.name,
      elo            = excluded.elo,
      matches_played = excluded.matches_played,
      is_calibrated  = excluded.is_calibrated,
      total_kills    = excluded.total_kills,
      total_deaths   = excluded.total_deaths,
      total_assists  = excluded.total_assists,
      total_damage   = excluded.total_damage,
      total_hs_kills = excluded.total_hs_kills,
      wins           = excluded.wins,
      losses         = excluded.losses
  `).run(p),

  topN: (n = 100) => db.prepare(
    'SELECT * FROM players WHERE is_calibrated = 1 ORDER BY elo DESC LIMIT ?'
  ).all(n),
};

export const matchRepo = {
  create: (m) => db.prepare(`
    INSERT INTO matches (id, map, status, spread_mode, server_ip, server_port)
    VALUES (@id, @map, @status, @spread_mode, @server_ip, @server_port)
  `).run(m),

  get: (id) => db.prepare('SELECT * FROM matches WHERE id = ?').get(id),

  finish: (id, tScore, ctScore, winner) => db.prepare(`
    UPDATE matches SET status='finished', t_score=?, ct_score=?, winner_team=?, finished_at=datetime('now')
    WHERE id=?
  `).run(tScore, ctScore, winner, id),

  addPlayer: (mp) => db.prepare(`
    INSERT INTO match_players
      (match_id, steam_id, team, kills, deaths, assists, damage, hs_kills, elo_before, elo_after, elo_delta, won)
    VALUES
      (@match_id, @steam_id, @team, @kills, @deaths, @assists, @damage, @hs_kills, @elo_before, @elo_after, @elo_delta, @won)
  `).run(mp),
};
