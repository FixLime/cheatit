import { execSync } from 'child_process';
import { PROVIDER, DATHOST_USER, DATHOST_PASSWORD, DATHOST_SERVER_ID,
         CS2_IMAGE, CS2_GSLT, SERVER_IP, SERVER_PORT_START } from './config.js';
import { db } from './db.js';
import { randomBytes } from 'crypto';

let _nextPort = SERVER_PORT_START;

function nextPort() {
  const p = _nextPort;
  _nextPort += 5; // each server uses up to 5 ports
  return p;
}

function rconPass() {
  return randomBytes(8).toString('hex');
}

// ── DATHOST provider ─────────────────────────────────────────────────────────
// Dathost has an API to duplicate an existing server and start it.
// Set up one "template" server in Dathost panel with the plugin installed,
// then we clone it per match.

async function dathostCreate(matchId, map) {
  const auth = Buffer.from(`${DATHOST_USER}:${DATHOST_PASSWORD}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };

  // Duplicate template server
  const dupRes = await fetch(
    `https://dathost.net/api/0.1/game-servers/${DATHOST_SERVER_ID}/duplicate`,
    { method: 'POST', headers }
  );
  if (!dupRes.ok) throw new Error(`Dathost duplicate failed: ${dupRes.status}`);
  const dup = await dupRes.json();
  const serverId = dup.id;

  const rcon = rconPass();

  // Update name + rcon + match cfg
  await fetch(`https://dathost.net/api/0.1/game-servers/${serverId}`, {
    method: 'PUT', headers,
    body: JSON.stringify({
      name: `CHEATIT-${matchId}`,
      cs2_settings: {
        rcon: rcon,
        mapgroup: 'mg_active',
        startmap: map,
        game_mode: 1,
        game_type: 0,
      }
    })
  });

  // Start server
  await fetch(`https://dathost.net/api/0.1/game-servers/${serverId}/start`, {
    method: 'POST', headers
  });

  // Get IP/port
  const infoRes = await fetch(`https://dathost.net/api/0.1/game-servers/${serverId}`, { headers });
  const info = await infoRes.json();

  return {
    provider:    'dathost',
    external_id: serverId,
    ip:          info.ip,
    port:        info.ports?.game || 27015,
    rcon_pass:   rcon,
  };
}

async function dathostDelete(externalId) {
  const auth = Buffer.from(`${DATHOST_USER}:${DATHOST_PASSWORD}`).toString('base64');
  await fetch(`https://dathost.net/api/0.1/game-servers/${externalId}`, {
    method: 'DELETE',
    headers: { Authorization: `Basic ${auth}` }
  });
}

// ── DOCKER provider ──────────────────────────────────────────────────────────
// Requires Docker installed on the server and the CS2 image pulled.
// Each match gets its own container with a unique port.

function dockerCreate(matchId, map) {
  const port  = nextPort();
  const rcon  = rconPass();
  const name  = `cheatit-${matchId}`;

  const cmd = [
    'docker run -d',
    `--name ${name}`,
    `-p ${port}:27015/udp`,
    `-p ${port}:27015/tcp`,
    `-p ${port + 1}:27020/udp`,
    `-e SRCDS_TOKEN=${CS2_GSLT}`,
    `-e CS2_RCONPW="${rcon}"`,
    `-e CS2_PW=""`,
    `-e CS2_MAXPLAYERS=12`,
    `-e CS2_GAMETYPE=0`,
    `-e CS2_GAMEMODE=1`,
    `-e CS2_MAPGROUP=mg_active`,
    `-e CS2_STARTMAP=${map}`,
    // Mount your plugin into the container:
    // `-v /path/to/CHEATIT.dll:/home/steam/cs2/game/csgo/addons/counterstrikesharp/plugins/CHEATIT/CHEATIT.dll`,
    CS2_IMAGE,
  ].join(' ');

  execSync(cmd);

  return {
    provider:    'docker',
    external_id: name,
    ip:          SERVER_IP,
    port,
    rcon_pass:   rcon,
  };
}

function dockerDelete(containerName) {
  try {
    execSync(`docker rm -f ${containerName}`);
  } catch {}
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function createServer(matchId, map) {
  let info;

  if (PROVIDER === 'dathost') {
    info = await dathostCreate(matchId, map);
  } else {
    info = dockerCreate(matchId, map);
  }

  const serverId = `srv-${matchId}`;
  db.prepare(`
    INSERT INTO servers (id, match_id, provider, external_id, ip, port, rcon_pass, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'configuring')
  `).run(serverId, matchId, info.provider, info.external_id, info.ip, info.port, info.rcon_pass);

  return { ...info, id: serverId };
}

export async function deleteServer(matchId) {
  const server = db.prepare('SELECT * FROM servers WHERE match_id = ?').get(matchId);
  if (!server) return;

  if (server.provider === 'dathost') await dathostDelete(server.external_id);
  else dockerDelete(server.external_id);

  db.prepare("UPDATE servers SET status='done' WHERE id=?").run(server.id);
}
