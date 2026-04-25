import { useState } from 'react';
import { Icon, Avatar, Level, Button, Card, Eyebrow, SectionTitle } from '../components/Common';

const recentMatches = [
  { result: 'WIN',  map: 'de_mirage',  ago: '2h ago',     cheat: 'NIXWARE',   score: '16:13', kd: '28-19', delta: 25,  kills: 28, deaths: 19, assists: 4,  damage: 3240, hs: 14 },
  { result: 'LOSS', map: 'de_inferno', ago: '5h ago',     cheat: 'NEVERLOSE', score: '11:16', kd: '15-22', delta: -18, kills: 15, deaths: 22, assists: 2,  damage: 1980, hs: 7 },
  { result: 'WIN',  map: 'de_nuke',    ago: 'yesterday',  cheat: 'NIXWARE',   score: '16:9',  kd: '24-15', delta: 22,  kills: 24, deaths: 15, assists: 6,  damage: 2880, hs: 11 },
  { result: 'WIN',  map: 'de_ancient', ago: 'yesterday',  cheat: 'NIXWARE',   score: '16:14', kd: '21-20', delta: 19,  kills: 21, deaths: 20, assists: 3,  damage: 2560, hs: 9 },
  { result: 'LOSS', map: 'de_anubis',  ago: '2 days ago', cheat: 'FATALITY',  score: '12:16', kd: '18-23', delta: -21, kills: 18, deaths: 23, assists: 5,  damage: 2140, hs: 8 },
];

const friends = [
  { n: 'awp_kid',     lvl: 5, status: 'In lobby' },
  { n: 'no_recoil',   lvl: 9, status: 'In match' },
  { n: 'flick_demon', lvl: 6, status: 'In lobby' },
];

export default function Profile({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      {/* Hero */}
      <div style={{ position: 'relative', background: 'linear-gradient(180deg, #1C1C1F 0%, #0D0D0F 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '32px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(255,85,0,0.18), transparent 60%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 32, position: 'relative', flexWrap: 'wrap' }}>

          <div style={{ width: 120, height: 120, borderRadius: 6, background: 'linear-gradient(135deg,#3a3a40,#1c1c1f)', border: '2px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 48, color: '#5A5A62', flexShrink: 0 }}>HV</div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <Eyebrow color="#FF5500">CS2 · ELO 1842 · TOP 0.4%</Eyebrow>
            <h1 style={{ margin: '6px 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              hvh_god_2007
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#C8C8CE', fontSize: 13, flexWrap: 'wrap' }}>
              <span>🇷🇺 Moscow</span>
              <span style={{ color: '#3A3A40' }}>·</span>
              <span>On platform since 2024</span>
              <span style={{ color: '#3A3A40' }}>·</span>
              <span style={{ color: '#32D74B', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#32D74B', boxShadow: '0 0 8px #32D74B' }}/>
                Online
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <Level n={7} size="xl"/>
            <div style={{ marginTop: 8, fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.12em' }}>LEVEL</div>
            <div style={{ marginTop: 14, width: 180 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8A8A92', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                <span>1842</span><span>2000</span>
              </div>
              <div style={{ height: 4, background: '#26262A', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #FF8A00, #FF5500)' }}/>
              </div>
              <div style={{ marginTop: 4, fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em' }}>To level 8 · 158 ELO</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <Button variant="primary" size="lg" glow onClick={() => onNavigate?.('play')}>Play</Button>
            <Button variant="secondary" size="md">Invite to party</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { v: '1.42', l: 'AVG K/D',  d: '+0.08', pos: true },
          { v: '63%',  l: 'WIN RATE', d: '+2%',   pos: true },
          { v: '38%',  l: 'HS%',      d: '−1%',   pos: false },
          { v: '187',  l: 'MATCHES',  d: null },
        ].map((s, i) => (
          <Card key={i} padding={20}>
            <Eyebrow>{s.l}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontVariantNumeric: 'tabular-nums', color: '#fff', marginTop: 4 }}>{s.v}</div>
            {s.d && <div style={{ fontSize: 11, color: s.pos ? '#32D74B' : '#FF453A', fontFamily: 'var(--font-display)', marginTop: 2 }}>{s.d} this month</div>}
          </Card>
        ))}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <SectionTitle action={
            <a style={{ color: '#FF5500', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>All matches ›</a>
          }>Recent matches</SectionTitle>

          <Card padding={0}>
            {recentMatches.map((m, i) => (
              <div key={i}>
                <div
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto auto',
                    gap: 12, alignItems: 'center', padding: '14px 20px',
                    borderLeft: `3px solid ${m.result === 'WIN' ? '#32D74B' : '#FF453A'}`,
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer', transition: 'background 120ms',
                    background: expanded === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (expanded !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { if (expanded !== i) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ color: m.result === 'WIN' ? '#32D74B' : '#FF453A', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em' }}>
                    {m.result}
                  </span>
                  <div>
                    <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{m.map}</div>
                    <div style={{ color: '#8A8A92', fontSize: 11, marginTop: 2, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span>{m.ago}</span>
                      <span style={{ color: '#3A3A40' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#C8C8CE', fontSize: 10 }}>{m.cheat}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontVariantNumeric: 'tabular-nums', minWidth: 70, textAlign: 'right' }}>{m.score}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#C8C8CE', fontSize: 12, minWidth: 55, textAlign: 'right' }}>{m.kd}</div>
                  <span style={{ color: m.delta > 0 ? '#32D74B' : '#FF453A', fontFamily: 'var(--font-display)', fontSize: 16, minWidth: 44, textAlign: 'right' }}>
                    {m.delta > 0 ? '+' : ''}{m.delta}
                  </span>
                  <Icon name="chevronDown" size={14} color="#5A5A62" style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 180ms' }}/>
                </div>

                {/* Expanded detail */}
                {expanded === i && (
                  <div style={{ padding: '14px 20px 18px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                      {[
                        { l: 'KILLS',   v: m.kills },
                        { l: 'DEATHS',  v: m.deaths },
                        { l: 'ASSISTS', v: m.assists },
                        { l: 'DAMAGE',  v: m.damage.toLocaleString() },
                        { l: 'HS KILLS', v: m.hs },
                        { l: 'HS%',     v: `${Math.round(m.hs / m.kills * 100)}%` },
                        { l: 'ADR',     v: Math.round(m.damage / 30) },
                        { l: 'K/D RATIO',v: (m.kills / m.deaths).toFixed(2) },
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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <Eyebrow>WIN STREAK</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <Icon name="fire" size={28} color="#FF5500"/>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#FF5500' }}>4</div>
              <div style={{ fontSize: 11, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em' }}>wins<br/>in a row</div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
              {['W','W','W','W','L'].map((r, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: r === 'W' ? '#32D74B' : '#FF453A' }}/>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>CALIBRATION</Eyebrow>
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#C8C8CE', marginBottom: 6 }}>
                <span>Placement matches</span>
                <span style={{ fontFamily: 'var(--font-display)', color: '#FF5500' }}>7 / 10</span>
              </div>
              <div style={{ height: 4, background: '#26262A', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #FF8A00, #FF5500)' }}/>
              </div>
              <div style={{ marginTop: 6, fontSize: 10, color: '#8A8A92' }}>3 more matches to get your rank</div>
            </div>
          </Card>

          <Card>
            <Eyebrow>FRIENDS ONLINE · 3</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {friends.map(f => (
                <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={f.n.slice(0, 2).toUpperCase()} level={f.lvl} size={32}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{f.n}</div>
                    <div style={{ color: '#32D74B', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.status}</div>
                  </div>
                  <button
                    style={{ background: '#FF5500', color: '#fff', border: 0, padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'background 150ms' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E64D00'}
                    onMouseLeave={e => e.currentTarget.style.background = '#FF5500'}
                    onClick={() => onNavigate?.('play')}
                  >Join</button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
