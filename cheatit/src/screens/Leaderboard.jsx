import { useState } from 'react';
import { Avatar, Level, Card, Eyebrow } from '../components/Common';

const ALL_PLAYERS = {
  EUROPE: [
    { rank: 1,  name: 'silent_aim_god',  lvl: 10, elo: 3214, kd: 2.18, wr: 81, country: '🇷🇺', cheat: 'NEVERLOSE', delta: '+12' },
    { rank: 2,  name: 'pasta_resolver',  lvl: 10, elo: 3098, kd: 2.04, wr: 78, country: '🇺🇦', cheat: 'NIXWARE',   delta: '+8' },
    { rank: 3,  name: 'fake_duck',       lvl: 10, elo: 3041, kd: 1.96, wr: 76, country: '🇰🇿', cheat: 'PRIMORDIAL',delta: '−4' },
    { rank: 4,  name: 'desync_main',     lvl: 10, elo: 2987, kd: 1.92, wr: 75, country: '🇧🇾', cheat: 'NEVERLOSE', delta: '+15' },
    { rank: 5,  name: 'onetap_only',     lvl: 10, elo: 2954, kd: 1.88, wr: 74, country: '🇷🇺', cheat: 'ONETAP',    delta: '−2' },
    { rank: 6,  name: 'no_spread_btw',   lvl: 10, elo: 2901, kd: 1.85, wr: 73, country: '🇷🇺', cheat: 'FATALITY',  delta: '+6' },
    { rank: 7,  name: 'fdoc_master',     lvl: 10, elo: 2876, kd: 1.81, wr: 72, country: '🇵🇱', cheat: 'NIXWARE',   delta: '+3' },
    { rank: 8,  name: 'antiaim_wizard',  lvl: 10, elo: 2820, kd: 1.78, wr: 71, country: '🇷🇺', cheat: 'MEMESENSE', delta: '−7' },
    { rank: 9,  name: 'lc_fake_lag',     lvl: 9,  elo: 2788, kd: 1.74, wr: 70, country: '🇩🇪', cheat: 'MIDNIGHT',  delta: '+1' },
    { rank: 10, name: 'jitter_god',      lvl: 9,  elo: 2755, kd: 1.71, wr: 69, country: '🇷🇺', cheat: 'XONE',      delta: '−3' },
  ],
  CIS: [
    { rank: 1,  name: 'kz_resolver',     lvl: 10, elo: 3180, kd: 2.12, wr: 80, country: '🇰🇿', cheat: 'NEVERLOSE', delta: '+9' },
    { rank: 2,  name: 'by_hvh_king',     lvl: 10, elo: 3020, kd: 1.99, wr: 77, country: '🇧🇾', cheat: 'NIXWARE',   delta: '+14' },
    { rank: 3,  name: 'ru_onetap',       lvl: 10, elo: 2960, kd: 1.93, wr: 75, country: '🇷🇺', cheat: 'ONETAP',    delta: '−1' },
    { rank: 4,  name: 'ua_fakewalk',     lvl: 10, elo: 2890, kd: 1.88, wr: 74, country: '🇺🇦', cheat: 'FATALITY',  delta: '+5' },
    { rank: 5,  name: 'ru_desync',       lvl: 9,  elo: 2810, kd: 1.81, wr: 72, country: '🇷🇺', cheat: 'MEMESENSE', delta: '+11' },
    { rank: 6,  name: 'hvh_god_2007',    lvl: 7,  elo: 1842, kd: 1.42, wr: 63, country: '🇷🇺', cheat: 'NIXWARE',   delta: '+25' },
  ],
  GLOBAL: [
    { rank: 1,  name: 'silent_aim_god',  lvl: 10, elo: 3214, kd: 2.18, wr: 81, country: '🇷🇺', cheat: 'NEVERLOSE', delta: '+12' },
    { rank: 2,  name: 'kz_resolver',     lvl: 10, elo: 3180, kd: 2.12, wr: 80, country: '🇰🇿', cheat: 'NEVERLOSE', delta: '+9' },
    { rank: 3,  name: 'pasta_resolver',  lvl: 10, elo: 3098, kd: 2.04, wr: 78, country: '🇺🇦', cheat: 'NIXWARE',   delta: '+8' },
    { rank: 4,  name: 'fake_duck',       lvl: 10, elo: 3041, kd: 1.96, wr: 76, country: '🇰🇿', cheat: 'PRIMORDIAL',delta: '−4' },
    { rank: 5,  name: 'ru_onetap',       lvl: 10, elo: 2960, kd: 1.93, wr: 75, country: '🇷🇺', cheat: 'ONETAP',    delta: '−1' },
    { rank: 6,  name: 'desync_main',     lvl: 10, elo: 2987, kd: 1.92, wr: 75, country: '🇧🇾', cheat: 'NEVERLOSE', delta: '+15' },
    { rank: 7,  name: 'onetap_only',     lvl: 10, elo: 2954, kd: 1.88, wr: 74, country: '🇷🇺', cheat: 'ONETAP',    delta: '−2' },
    { rank: 8,  name: 'no_spread_btw',   lvl: 10, elo: 2901, kd: 1.85, wr: 73, country: '🇷🇺', cheat: 'FATALITY',  delta: '+6' },
    { rank: 9,  name: 'fdoc_master',     lvl: 10, elo: 2876, kd: 1.81, wr: 72, country: '🇵🇱', cheat: 'NIXWARE',   delta: '+3' },
    { rank: 10, name: 'antiaim_wizard',  lvl: 10, elo: 2820, kd: 1.78, wr: 71, country: '🇷🇺', cheat: 'MEMESENSE', delta: '−7' },
  ],
  'NORTH AMERICA': [
    { rank: 1,  name: 'na_triggerbot',   lvl: 10, elo: 3050, kd: 2.01, wr: 77, country: '🇺🇸', cheat: 'NIXWARE',   delta: '+7' },
    { rank: 2,  name: 'usa_fakeping',    lvl: 9,  elo: 2910, kd: 1.89, wr: 74, country: '🇺🇸', cheat: 'ONETAP',    delta: '+4' },
    { rank: 3,  name: 'ca_hvh_pro',      lvl: 9,  elo: 2830, kd: 1.81, wr: 72, country: '🇨🇦', cheat: 'FATALITY',  delta: '−2' },
  ],
  ASIA: [
    { rank: 1,  name: 'cn_wallbang',     lvl: 10, elo: 2980, kd: 1.94, wr: 76, country: '🇨🇳', cheat: 'NEVERLOSE', delta: '+6' },
    { rank: 2,  name: 'kr_antiaim',      lvl: 9,  elo: 2850, kd: 1.82, wr: 73, country: '🇰🇷', cheat: 'NIXWARE',   delta: '+3' },
    { rank: 3,  name: 'jp_resolver',     lvl: 9,  elo: 2770, kd: 1.75, wr: 70, country: '🇯🇵', cheat: 'MEMESENSE', delta: '−1' },
  ],
};

const regions = ['GLOBAL', 'EUROPE', 'CIS', 'NORTH AMERICA', 'ASIA'];

export default function Leaderboard() {
  const [activeRegion, setActiveRegion] = useState('EUROPE');
  const [sortBy, setSortBy] = useState('elo');

  const players = [...(ALL_PLAYERS[activeRegion] || [])].sort((a, b) => {
    if (sortBy === 'elo') return b.elo - a.elo;
    if (sortBy === 'kd')  return b.kd - a.kd;
    if (sortBy === 'wr')  return b.wr - a.wr;
    return 0;
  }).map((p, i) => ({ ...p, rank: i + 1 }));

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
            display: 'grid', gridTemplateColumns: '56px 28px 1fr 90px 100px 80px 80px 56px',
            gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
          }}>
            <span>#</span><span></span><span>PLAYER</span>
            <span style={{ textAlign: 'right' }}>SOFTWARE</span>
            <button onClick={() => setSortBy('elo')} style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'elo' ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>ELO {sortBy === 'elo' ? '▾' : ''}</button>
            <button onClick={() => setSortBy('kd')}  style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'kd'  ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>K/D {sortBy === 'kd' ? '▾' : ''}</button>
            <button onClick={() => setSortBy('wr')}  style={{ textAlign: 'right', background: 'none', border: 0, color: sortBy === 'wr'  ? '#FF5500' : '#8A8A92', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0 }}>WIN% {sortBy === 'wr' ? '▾' : ''}</button>
            <span style={{ textAlign: 'right' }}>Δ</span>
          </div>

          {players.map((p, i) => (
            <div key={p.name} style={{
              display: 'grid', gridTemplateColumns: '56px 28px 1fr 90px 100px 80px 80px 56px',
              gap: 12, padding: '12px 20px',
              borderBottom: i < players.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              alignItems: 'center', fontSize: 13, transition: 'background 120ms', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: p.rank <= 3 ? '#FF5500' : '#C8C8CE' }}>
                {p.rank <= 3 ? ['🥇','🥈','🥉'][p.rank - 1] : p.rank}
              </span>
              <Level n={p.lvl} size="sm"/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <Avatar initials={p.name.slice(0, 2).toUpperCase()} size={28}/>
                <span style={{ fontSize: 13 }}>{p.country}</span>
                <span style={{ color: p.name === 'hvh_god_2007' ? '#FF5500' : '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}{p.name === 'hvh_god_2007' ? ' (you)' : ''}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8A8A92', textAlign: 'right' }}>{p.cheat}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF5500', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{p.elo}</span>
              <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#C8C8CE' }}>{p.kd.toFixed(2)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#C8C8CE' }}>{p.wr}%</span>
              <span style={{ fontFamily: 'var(--font-display)', textAlign: 'right', color: p.delta.startsWith('+') ? '#32D74B' : '#FF453A' }}>{p.delta}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
