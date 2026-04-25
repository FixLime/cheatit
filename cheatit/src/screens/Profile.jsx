import { useState } from 'react';
import { Icon, Avatar, Level, Button, Card, Eyebrow, SectionTitle } from '../components/Common';
import {
  getLevel, getNextLevelElo, getPrevLevelElo, formatAgo,
  getFriends, addFriend, removeFriend, isFriend,
  PLAYERS, addFakeMatch, updateUser,
} from '../store';

const MAPS = ['de_mirage','de_inferno','de_nuke','de_ancient','de_anubis','de_dust2','de_overpass','de_vertigo'];

export default function Profile({ user, onUserUpdate, onNavigate }) {
  const [expanded,    setExpanded]    = useState(null);
  const [friendList,  setFriendList]  = useState(() => getFriends(user.id));
  const [addSearch,   setAddSearch]   = useState('');
  const [showSearch,  setShowSearch]  = useState(false);
  const [simulating,  setSimulating]  = useState(false);

  const level    = getLevel(user.elo);
  const nextElo  = getNextLevelElo(user.elo);
  const prevElo  = getPrevLevelElo(user.elo);
  const progress = nextElo === prevElo ? 100 : Math.round(((user.elo - prevElo) / (nextElo - prevElo)) * 100);
  const toNext   = nextElo - user.elo;

  const totalKd  = user.totalDeaths > 0 ? (user.totalKills / user.totalDeaths).toFixed(2) : '—';
  const winRate  = user.matches > 0 ? Math.round((user.wins / user.matches) * 100) : 0;
  const hsRate   = user.totalKills > 0 ? Math.round((user.totalHs / user.totalKills) * 100) : 0;

  const friendPlayers = PLAYERS.filter(p => friendList.includes(p.id));
  const searchResults = addSearch.length >= 2
    ? PLAYERS.filter(p => p.name.includes(addSearch.toLowerCase()) && !friendList.includes(p.id)).slice(0, 5)
    : [];

  function toggleFriend(playerId) {
    if (isFriend(user.id, playerId)) {
      removeFriend(user.id, playerId);
      setFriendList(prev => prev.filter(id => id !== playerId));
    } else {
      addFriend(user.id, playerId);
      setFriendList(prev => [...prev, playerId]);
    }
  }

  async function simulateMatch() {
    setSimulating(true);
    await new Promise(r => setTimeout(r, 800));
    const map   = MAPS[Math.floor(Math.random() * MAPS.length)];
    const res   = addFakeMatch(user.id, { map, cheat: user.cheat });
    if (res) {
      onUserUpdate(res.user);
      setFriendList(getFriends(user.id));
    }
    setSimulating(false);
  }

  const history = user.matchHistory || [];
  const streak  = user.streak || 0;
  const streakAbs = Math.abs(streak);
  const streakWin = streak > 0;

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      {/* Hero */}
      <div style={{ position: 'relative', background: 'linear-gradient(180deg, #1C1C1F 0%, #0D0D0F 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '32px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(255,85,0,0.18), transparent 60%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 32, position: 'relative', flexWrap: 'wrap' }}>

          <div style={{ width: 120, height: 120, borderRadius: 6, background: 'linear-gradient(135deg,#3a3a40,#1c1c1f)', border: '2px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 48, color: '#5A5A62', flexShrink: 0 }}>
            {user.username.slice(0, 2).toUpperCase()}
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <Eyebrow color="#FF5500">CS2 · ELO {user.elo} · {user.region}</Eyebrow>
            <h1 style={{ margin: '6px 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {user.username}
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#C8C8CE', fontSize: 13, flexWrap: 'wrap' }}>
              <span>{user.country}</span>
              <span style={{ color: '#3A3A40' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{user.cheat}</span>
              <span style={{ color: '#3A3A40' }}>·</span>
              <span style={{ color: '#32D74B', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#32D74B', boxShadow: '0 0 8px #32D74B' }}/>
                Online
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <Level n={level} size="xl"/>
            <div style={{ marginTop: 8, fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.12em' }}>LEVEL</div>
            <div style={{ marginTop: 14, width: 180 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8A8A92', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                <span>{user.elo}</span><span>{nextElo === 9999 ? 'MAX' : nextElo}</span>
              </div>
              <div style={{ height: 4, background: '#26262A', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #FF8A00, #FF5500)', transition: 'width 400ms' }}/>
              </div>
              <div style={{ marginTop: 4, fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {nextElo === 9999 ? 'MAX LEVEL' : `To level ${level + 1} · ${toNext} ELO`}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <Button variant="primary" size="lg" glow onClick={() => onNavigate?.('play')}>Play</Button>
            <Button variant="secondary" size="md" onClick={simulateMatch} disabled={simulating}>
              {simulating ? 'Simulating...' : 'Simulate match'}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { v: totalKd,       l: 'AVG K/D',  d: null },
          { v: `${winRate}%`, l: 'WIN RATE', d: null },
          { v: `${hsRate}%`,  l: 'HS%',      d: null },
          { v: user.matches,  l: 'MATCHES',  d: null },
        ].map((s, i) => (
          <Card key={i} padding={20}>
            <Eyebrow>{s.l}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontVariantNumeric: 'tabular-nums', color: '#fff', marginTop: 4 }}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <SectionTitle>Recent matches</SectionTitle>

          {history.length === 0 ? (
            <Card padding={32} style={{ textAlign: 'center' }}>
              <div style={{ color: '#5A5A62', fontSize: 13 }}>No matches yet. Hit Play or Simulate match to get started.</div>
            </Card>
          ) : (
            <Card padding={0}>
              {history.map((m, i) => (
                <div key={m.id}>
                  <div
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{
                      display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto auto',
                      gap: 12, alignItems: 'center', padding: '14px 20px',
                      borderLeft: `3px solid ${m.won ? '#32D74B' : '#FF453A'}`,
                      borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer', transition: 'background 120ms',
                      background: expanded === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (expanded !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { if (expanded !== i) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ color: m.won ? '#32D74B' : '#FF453A', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em' }}>
                      {m.won ? 'WIN' : 'LOSS'}
                    </span>
                    <div>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{m.map}</div>
                      <div style={{ color: '#8A8A92', fontSize: 11, marginTop: 2, display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span>{formatAgo(m.ts)}</span>
                        <span style={{ color: '#3A3A40' }}>·</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: '#C8C8CE', fontSize: 10 }}>{m.cheat}</span>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontVariantNumeric: 'tabular-nums', minWidth: 70, textAlign: 'right' }}>{m.score}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: '#C8C8CE', fontSize: 12, minWidth: 55, textAlign: 'right' }}>{m.kills}-{m.deaths}</div>
                    <span style={{ color: m.eloDelta > 0 ? '#32D74B' : '#FF453A', fontFamily: 'var(--font-display)', fontSize: 16, minWidth: 44, textAlign: 'right' }}>
                      {m.eloDelta > 0 ? '+' : ''}{m.eloDelta}
                    </span>
                    <Icon name="chevronDown" size={14} color="#5A5A62" style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 180ms' }}/>
                  </div>

                  {expanded === i && (
                    <div style={{ padding: '14px 20px 18px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {[
                          { l: 'KILLS',    v: m.kills },
                          { l: 'DEATHS',   v: m.deaths },
                          { l: 'ASSISTS',  v: m.assists },
                          { l: 'DAMAGE',   v: m.damage.toLocaleString() },
                          { l: 'HS KILLS', v: m.hs },
                          { l: 'HS%',      v: `${Math.round(m.hs / Math.max(1, m.kills) * 100)}%` },
                          { l: 'ADR',      v: Math.round(m.damage / 30) },
                          { l: 'K/D',      v: (m.kills / Math.max(1, m.deaths)).toFixed(2) },
                        ].map(s => (
                          <div key={s.l} style={{ background: '#26262A', borderRadius: 4, padding: '8px 12px' }}>
                            <Eyebrow>{s.l}</Eyebrow>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Card>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Streak */}
          <Card>
            <Eyebrow>{streakWin ? 'WIN STREAK' : 'LOSS STREAK'}</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <Icon name="fire" size={28} color={streakWin ? '#FF5500' : '#FF453A'}/>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: streakWin ? '#FF5500' : '#FF453A' }}>{streakAbs}</div>
              <div style={{ fontSize: 11, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {streakWin ? 'wins' : 'losses'}<br/>in a row
              </div>
            </div>
            {history.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
                {history.slice(0, 5).map((m, i) => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: m.won ? '#32D74B' : '#FF453A' }}/>
                ))}
              </div>
            )}
          </Card>

          {/* Calibration */}
          {!user.isCalibrated && (
            <Card>
              <Eyebrow>CALIBRATION</Eyebrow>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#C8C8CE', marginBottom: 6 }}>
                  <span>Placement matches</span>
                  <span style={{ fontFamily: 'var(--font-display)', color: '#FF5500' }}>{user.matches} / 10</span>
                </div>
                <div style={{ height: 4, background: '#26262A', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${(user.matches / 10) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF8A00, #FF5500)', transition: 'width 400ms' }}/>
                </div>
                <div style={{ marginTop: 6, fontSize: 10, color: '#8A8A92' }}>{10 - user.matches} more matches to get your rank</div>
              </div>
            </Card>
          )}

          {/* Friends */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Eyebrow>FRIENDS · {friendPlayers.length}</Eyebrow>
              <button
                onClick={() => setShowSearch(v => !v)}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#C8C8CE', padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                + Add
              </button>
            </div>

            {showSearch && (
              <div style={{ marginBottom: 12 }}>
                <input
                  value={addSearch}
                  onChange={e => setAddSearch(e.target.value)}
                  placeholder="Search players..."
                  style={{
                    width: '100%', background: '#26262A', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4, padding: '8px 10px', color: '#fff', fontSize: 12,
                    fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box',
                  }}
                />
                {searchResults.length > 0 && (
                  <div style={{ marginTop: 6, background: '#26262A', borderRadius: 4, overflow: 'hidden' }}>
                    {searchResults.map(p => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onClick={() => { toggleFriend(p.id); setAddSearch(''); setShowSearch(false); }}
                      >
                        <Avatar initials={p.name.slice(0, 2).toUpperCase()} size={24}/>
                        <span style={{ flex: 1, fontSize: 12, color: '#fff' }}>{p.name}</span>
                        <span style={{ fontSize: 10, color: '#8A8A92' }}>{p.elo} ELO</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {friendPlayers.length === 0 ? (
              <div style={{ color: '#5A5A62', fontSize: 12, textAlign: 'center', padding: '8px 0' }}>No friends yet. Add some players.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {friendPlayers.map(f => (
                  <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={f.name.slice(0, 2).toUpperCase()} level={f.lvl} size={32}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                      <div style={{ color: f.online ? '#32D74B' : '#5A5A62', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {f.online ? 'Online' : 'Offline'} · {f.elo} ELO
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {f.online && (
                        <button
                          style={{ background: '#FF5500', color: '#fff', border: 0, padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                          onClick={() => onNavigate?.('play')}
                        >Join</button>
                      )}
                      <button
                        style={{ background: 'transparent', color: '#5A5A62', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 8px', borderRadius: 4, fontSize: 10, cursor: 'pointer' }}
                        onClick={() => toggleFriend(f.id)}
                        title="Remove friend"
                      >×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
