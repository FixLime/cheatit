// localStorage-based auth + user data store

const KEYS = {
  users:     'cheatit_users',
  session:   'cheatit_session',
  friends:   'cheatit_friends',
  matches:   'cheatit_matches',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// ── Generated player pool (feels real, consistent across sessions) ────────────

const NAMES = [
  'silent_aim_god','pasta_resolver','fake_duck','desync_main','onetap_only',
  'no_spread_btw','fdoc_master','antiaim_wizard','lc_fake_lag','jitter_god',
  'kz_resolver','by_hvh_king','ru_onetap','ua_fakewalk','ru_desync',
  'na_triggerbot','usa_fakeping','ca_hvh_pro','cn_wallbang','kr_antiaim',
  'jp_resolver','aimware_pro','esp_god','triggerbot99','wallhack_king',
  'spinbot_lord','bhop_master','aimlock_pro','resolver_god','norecoil_ez',
  'pixel_walker','strafe_king','peek_abuse','angle_pre','flashbang_esp',
  'smoke_esp','molly_god','nade_esp','radar_hack','speed_boost',
];
const CHEATS  = ['NIXWARE','FATALITY','XONE','NEVERLOSE','MIDNIGHT','MEMESENSE','PRIMORDIAL','ONETAP'];
const FLAGS   = ['🇷🇺','🇺🇦','🇰🇿','🇧🇾','🇵🇱','🇩🇪','🇫🇷','🇺🇸','🇨🇦','🇨🇳','🇰🇷','🇯🇵'];
const REGIONS = ['EU','CIS','NA','ASIA'];

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

export function generatePlayers() {
  return NAMES.map((name, i) => {
    const r = seededRand(i * 7919 + 12345);
    const elo     = Math.floor(1200 + r() * 2200);
    const lvl     = elo < 1400 ? 3 : elo < 1700 ? 5 : elo < 2000 ? 7 : elo < 2400 ? 8 : elo < 2800 ? 9 : 10;
    const kd      = +(0.8 + r() * 1.8).toFixed(2);
    const wr      = Math.floor(42 + r() * 40);
    const cheat   = CHEATS[Math.floor(r() * CHEATS.length)];
    const country = FLAGS[Math.floor(r() * FLAGS.length)];
    const region  = REGIONS[Math.floor(r() * REGIONS.length)];
    const online  = r() > 0.55;
    return { id: name, name, elo, lvl, kd, wr, cheat, country, region, online, isBot: true, matches: Math.floor(20 + r() * 300) };
  });
}

export const PLAYERS = generatePlayers();

// ── Auth ──────────────────────────────────────────────────────────────────────

export function getUsers() {
  return load(KEYS.users, {});
}

export function register({ username, password, cheat, region, country }) {
  const users = getUsers();
  const key   = username.toLowerCase().trim();
  if (!key || key.length < 3) return { error: 'Username must be at least 3 characters.' };
  if (key.length > 24)        return { error: 'Username too long (max 24 chars).' };
  if (!/^[\w_-]+$/.test(key)) return { error: 'Only letters, numbers, _ and - allowed.' };
  if (users[key])             return { error: 'Username already taken.' };
  if (!password || password.length < 4) return { error: 'Password must be at least 4 characters.' };

  const user = {
    id:       key,
    username: username.trim(),
    password,        // in a real app: hash this
    cheat:    cheat  || 'NIXWARE',
    region:   region || 'EU',
    country:  country|| '🇷🇺',
    elo:      1000,
    matches:  0,
    isCalibrated: false,
    wins:     0,
    losses:   0,
    totalKills: 0,
    totalDeaths: 0,
    totalDamage: 0,
    totalHs: 0,
    streak: 0,
    matchHistory: [],
    createdAt: Date.now(),
  };

  users[key] = user;
  save(KEYS.users, users);
  return { user };
}

export function login({ username, password }) {
  const users = getUsers();
  const key   = username.toLowerCase().trim();
  const user  = users[key];
  if (!user)            return { error: 'Account not found.' };
  if (user.password !== password) return { error: 'Wrong password.' };
  save(KEYS.session, key);
  return { user };
}

export function logout() {
  localStorage.removeItem(KEYS.session);
}

export function getSession() {
  const key   = load(KEYS.session, null);
  if (!key) return null;
  const users = getUsers();
  return users[key] || null;
}

export function updateUser(id, updates) {
  const users = getUsers();
  if (!users[id]) return;
  users[id] = { ...users[id], ...updates };
  save(KEYS.users, users);
  return users[id];
}

// Add a fake match to user history (simulated result)
export function addFakeMatch(userId, { map, cheat }) {
  const users = getUsers();
  const user  = users[userId];
  if (!user) return;

  const won      = Math.random() > 0.45;
  const kills    = Math.floor(8  + Math.random() * 24);
  const deaths   = Math.floor(8  + Math.random() * 22);
  const assists  = Math.floor(0  + Math.random() * 8);
  const hs       = Math.floor(kills * (0.2 + Math.random() * 0.5));
  const damage   = Math.floor(kills * 90 + Math.random() * 600);
  const score    = won
    ? `16:${Math.floor(5 + Math.random() * 10)}`
    : `${Math.floor(5 + Math.random() * 10)}:16`;
  const kd       = (kills / Math.max(1, deaths)).toFixed(2);

  const K        = user.isCalibrated ? 25 : 50;
  const avgOppElo = 1000 + Math.random() * 1800;
  const expected  = 1 / (1 + Math.pow(10, (avgOppElo - user.elo) / 400));
  const eloDelta  = Math.round(K * ((won ? 1 : 0) - expected));
  const newElo    = Math.max(100, user.elo + eloDelta);
  const newMatches = user.matches + 1;

  const match = {
    id:      Date.now(),
    map,
    cheat,
    won,
    score,
    kd,
    kills,
    deaths,
    assists,
    hs,
    damage,
    eloDelta,
    ago:     'just now',
    ts:      Date.now(),
  };

  const history = [match, ...(user.matchHistory || [])].slice(0, 20);

  const updated = {
    ...user,
    elo:         newElo,
    matches:     newMatches,
    isCalibrated: newMatches >= 10,
    wins:        user.wins + (won ? 1 : 0),
    losses:      user.losses + (won ? 0 : 1),
    totalKills:  user.totalKills + kills,
    totalDeaths: user.totalDeaths + deaths,
    totalDamage: user.totalDamage + damage,
    totalHs:     user.totalHs + hs,
    streak:      won ? (user.streak >= 0 ? user.streak + 1 : 1) : (user.streak < 0 ? user.streak - 1 : -1),
    matchHistory: history,
  };

  users[userId] = updated;
  save(KEYS.users, users);
  return { match, user: updated };
}

// ── Friends ───────────────────────────────────────────────────────────────────

export function getFriends(userId) {
  const all = load(KEYS.friends, {});
  return all[userId] || [];
}

export function addFriend(userId, friendId) {
  const all  = load(KEYS.friends, {});
  const list = all[userId] || [];
  if (!list.includes(friendId)) {
    all[userId] = [...list, friendId];
    save(KEYS.friends, all);
  }
}

export function removeFriend(userId, friendId) {
  const all  = load(KEYS.friends, {});
  all[userId] = (all[userId] || []).filter(id => id !== friendId);
  save(KEYS.friends, all);
}

export function isFriend(userId, friendId) {
  return getFriends(userId).includes(friendId);
}

// ── Utils ─────────────────────────────────────────────────────────────────────

export function getLevel(elo) {
  if (elo < 800)  return 1;
  if (elo < 950)  return 2;
  if (elo < 1100) return 3;
  if (elo < 1350) return 4;
  if (elo < 1550) return 5;
  if (elo < 1750) return 6;
  if (elo < 2000) return 7;
  if (elo < 2250) return 8;
  if (elo < 2750) return 9;
  return 10;
}

export function getNextLevelElo(elo) {
  const thresholds = [800,950,1100,1350,1550,1750,2000,2250,2750,9999];
  return thresholds.find(t => t > elo) || 9999;
}

export function getPrevLevelElo(elo) {
  const thresholds = [0,800,950,1100,1350,1550,1750,2000,2250,2750];
  const lvl = getLevel(elo);
  return thresholds[lvl - 1] || 0;
}

export function formatAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 2)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
