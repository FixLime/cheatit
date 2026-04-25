import { useState, useMemo } from 'react';
import { Avatar, Level, Card, Eyebrow } from '../components/Common';
import { PLAYERS, getFriends, addFriend, removeFriend, isFriend, getLevel } from '../store';

const regions = ['GLOBAL', 'EUROPE', 'CIS', 'NORTH AMERICA', 'ASIA'];

const REGION_MAP = { EU: 'EUROPE', CIS: 'CIS', NA: 'NORTH AMERICA', ASIA: 'ASIA' };

function playerRegion(p) {
  return REGION_MAP[p.region] || 'EUROPE';
}

export default function Leaderboard({ user, onUserUpdate }) {
  const [activeRegion, setActiveRegion] = useState('EUROPE');
  const [sortBy,       setSortBy]       = useState('elo');
  const [friendList,   setFriendList]   = useState(() => getFriends(user.id));

  function toggleFriend(playerId, e) {
    e.stopPropagation();
    if (isFriend(user.id, playerId)) {
      removeFriend(user.id, playerId);
      setFriendList(prev => prev.filter(id => id !== playerId));
    } else {
      addFriend(user.id, playerId);
      setFriendList(prev => [...prev, playerId]);
    }
  }

  const players = useMemo(() => {
    const userAsPlayer = {
      id:      user.id,
      name:    user.username,
      lvl:     getLevel(user.elo),
      elo:     user.elo,
      kd:      user.totalDeaths > 0 ? +(user.totalKills / user.totalDeaths).toFixed(2) : 1.0,
      wr:      user.matches > 0 ? Math.round((user.wins / user.matches) * 100) : 50,
      country: user.country,
      cheat:   user.cheat,
      region:  REGION_MAP[user.region] || 'EUROPE',
      online:  true,
      isBot:   false,
    };

    let pool = [
      ...PLAYERS.map(p => ({ ...p, region: playerRegion(p) })),
      userAsPlayer,
    ];

    if (activeRegion !== 'GLOBAL') {
      pool = pool.filter(p => p.region === activeRegion);
    }

    pool.sort((a, b) => {
      if (sortBy === 'elo') return b.elo - a.elo;
      if (sortBy === 'kd')  return b.kd - a.kd;
      if (sortBy === 'wr')  return b.wr - a.wr;
      return 0;
    });

    return pool.map((p, i) => ({ ...p, rank: i + 1 }));
  }, [activeRegion, sortBy, user]);

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
        <Eyebrow color="#FF5500">CS2 · {activeRegion} · SEASON 4</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', textTransform: 'uppercase', margin: '8px 0 24px', letterSpacing: '-0.01em' }}>
          Top players
        </h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {regions.map(r => (
            <button key={r} onClick={() => setActiveRegion(r)} style={{
              background: activeRegion === r ? '#FF5500' : 'transparent',
              border: activeRegion === r ? 0 : '1px solid rgba(255,255,255,0.14)',
              color: activeRegion === r ? '#fff' : '#C8C8CE',
              padding: '8px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 150ms',
            }}>{r}</button>
          ))}
        </div>

        <Card padding={0}>
          <div style={{
            display: 'grid', gridTemplateColumns: '56px 28px 1fr 90px 100px 80px 80px 56px 56px',
            gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
          }}>
            <span>#</span><span></span><span>PLAYER</span>
            <span style={{ textAlign: 'right' }}>SOFTWARE</span>
            <button onClick={() => setSortBy('elo')} style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'elo' ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>ELO {sortBy === 'elo' ? '▾' : ''}</button>
            <button onClick={() => setSortBy('kd')}  style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'kd'  ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>K/D {sortBy === 'kd' ? '▾' : ''}</button>
            <button onClick={() => setSortBy('wr')}  style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'wr'  ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>WIN% {sortBy === 'wr' ? '▾' : ''}</button>
            <span style={{ textAlign: 'right' }}></span>
            <span></span>
          </div>

          {players.map((p, i) => {
            const isMe     = p.id === user.id;
            const isFr     = !isMe && friendList.includes(p.id);
            return (
              <div key={p.id || p.name} style={{
                display: 'grid', gridTemplateColumns: '56px 28px 1fr 90px 100px 80px 80px 56px 56px',
                gap: 12, padding: '12px 20px',
                borderBottom: i < players.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                alignItems: 'center', fontSize: 13, transition: 'background 120ms', cursor: 'default',
                background: isMe ? 'rgba(255,85,0,0.06)' : 'transparent',
              }}
                onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isMe ? 'rgba(255,85,0,0.06)' : 'transparent'; }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: p.rank <= 3 ? '#FF5500' : '#C8C8CE' }}>
                  {p.rank <= 3 ? ['🥇','🥈','🥉'][p.rank - 1] : p.rank}
                </span>
                <Level n={p.lvl} size="sm"/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <Avatar initials={p.name.slice(0, 2).toUpperCase()} size={28}/>
                  <span style={{ fontSize: 13 }}>{p.country}</span>
                  <span style={{ color: isMe ? '#FF5500' : '#fff', fontWeight: isMe ? 700 : 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}{isMe ? ' (you)' : ''}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8A8A92', textAlign: 'right' }}>{p.cheat}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF5500', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{p.elo}</span>
                <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#C8C8CE' }}>{typeof p.kd === 'number' ? p.kd.toFixed(2) : p.kd}</span>
                <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#C8C8CE' }}>{p.wr}%</span>
                <span style={{ textAlign: 'right', color: p.online ? '#32D74B' : '#5A5A62', fontSize: 10 }}>
                  {p.online ? '●' : '○'}
                </span>
                <span style={{ textAlign: 'right' }}>
                  {!isMe && (
                    <button
                      onClick={e => toggleFriend(p.id, e)}
                      title={isFr ? 'Remove friend' : 'Add friend'}
                      style={{
                        background: isFr ? 'rgba(255,85,0,0.15)' : 'transparent',
                        border: `1px solid ${isFr ? '#FF5500' : 'rgba(255,255,255,0.12)'}`,
                        color: isFr ? '#FF5500' : '#8A8A92',
                        padding: '3px 8px', borderRadius: 3, fontSize: 11, cursor: 'pointer',
                        transition: 'all 150ms',
                      }}
                    >{isFr ? '✓' : '+'}</button>
                  )}
                </span>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
