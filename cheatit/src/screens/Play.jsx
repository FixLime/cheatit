import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Eyebrow } from '../components/Common';

const CHEATS = ['NIXWARE', 'FATALITY', 'XONE', 'NEVERLOSE', 'MIDNIGHT', 'MEMESENSE', 'PRIMORDIAL', 'ONETAP'];
const REGIONS = [
  { id: 'EU',  label: 'Europe',        ping: '38ms' },
  { id: 'CIS', label: 'CIS',           ping: '12ms' },
  { id: 'NA',  label: 'North America', ping: '120ms' },
];
const MODES = [
  { id: '5v5', label: '5 VS 5', sub: 'Competitive',    active: true },
  { id: '2v2', label: '2 VS 2', sub: 'Wingman',        active: false },
  { id: '1v1', label: '1 VS 1', sub: 'AIM',            active: false },
  { id: 'hub', label: 'HUB',    sub: 'Custom rules',   active: false },
];

export default function Play() {
  const navigate = useNavigate();
  const [queueing, setQueueing] = useState(false);
  const [cheat, setCheat] = useState('NIXWARE');
  const [region, setRegion] = useState('EU');
  const [mode, setMode] = useState('5v5');
  const [elapsed, setElapsed] = useState(0);

  const startQueue = () => {
    if (!cheat) return;
    setQueueing(true);
    setElapsed(0);
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    window._queueTimer = t;
  };

  const stopQueue = () => {
    setQueueing(false);
    clearInterval(window._queueTimer);
  };

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '48px 24px 32px' }}>
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 1000, height: 600,
          background: 'radial-gradient(ellipse, rgba(255,85,0,0.12), transparent 60%)',
          pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
          <Eyebrow color="#FF5500">CS2 · COMPETITIVE</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '8px 0 32px' }}>
            Find a match
          </h1>

          {/* Mode tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {MODES.map(m => (
              <div key={m.id} onClick={() => setMode(m.id)} style={{
                background: mode === m.id ? '#1C1C1F' : '#141416',
                border: mode === m.id ? '1px solid #FF5500' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8, padding: 18, cursor: 'pointer', position: 'relative',
                transition: 'all 180ms',
              }}>
                {mode === m.id && (
                  <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: 999, background: '#FF5500', boxShadow: '0 0 8px #FF5500' }}/>
                )}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: mode === m.id ? '#fff' : '#8A8A92', textTransform: 'uppercase' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Queue state card */}
          <Card padding={32} style={{ textAlign: 'center', position: 'relative' }}>
            {queueing ? (
              <>
                <Eyebrow color="#FFD60A">IN QUEUE · {fmt(elapsed)}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,64px)', textTransform: 'uppercase', margin: '12px 0', letterSpacing: '-0.01em' }}>
                  Searching for opponents
                </div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 24 }}>
                  Looking for 9 players level 6–8 in region {region} · Avg ping 38ms
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: 4,
                      background: i === 0 ? '#FF5500' : '#26262A',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: i === 0 ? '#fff' : '#5A5A62',
                      fontFamily: 'var(--font-display)', fontSize: 14,
                    }}>{i === 0 ? 'HV' : ''}</div>
                  ))}
                </div>
                <Button variant="ghost" size="md" onClick={stopQueue}>Cancel · ESC</Button>
              </>
            ) : (
              <>
                <Eyebrow>READY TO PLAY</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,80px)', textTransform: 'uppercase', margin: '8px 0 16px', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  Play
                </div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 24 }}>
                  Level 7 · ELO 1842 · Region {region}
                </div>
                <button
                  onClick={startQueue}
                  disabled={!cheat}
                  style={{
                    background: cheat ? '#FF5500' : '#3A3A40',
                    color: cheat ? '#fff' : '#5A5A62',
                    border: 0, padding: '20px 80px', borderRadius: 4,
                    fontFamily: 'var(--font-display)', fontSize: 28,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    boxShadow: cheat ? '0 0 40px rgba(255,85,0,0.55)' : 'none',
                    cursor: cheat ? 'pointer' : 'not-allowed',
                    transition: 'all 180ms',
                  }}
                  onMouseEnter={e => cheat && (e.currentTarget.style.background = '#E64D00')}
                  onMouseLeave={e => cheat && (e.currentTarget.style.background = '#FF5500')}
                >
                  START SEARCH
                </button>
                {!cheat && (
                  <div style={{ marginTop: 12, fontSize: 11, color: '#FF453A' }}>
                    Select a cheat to continue
                  </div>
                )}
              </>
            )}
          </Card>

          {/* Settings row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 24 }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Eyebrow>DECLARED SOFTWARE</Eyebrow>
                <span style={{ fontSize: 10, color: '#FF453A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>* Required</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CHEATS.map(c => (
                  <button key={c} onClick={() => setCheat(c)} style={{
                    background: cheat === c ? 'rgba(255,85,0,0.12)' : 'transparent',
                    border: cheat === c ? '1px solid #FF5500' : '1px solid rgba(255,255,255,0.18)',
                    color: cheat === c ? '#FF5500' : '#C8C8CE',
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                    padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
                    transition: 'all 150ms',
                  }}>{c}{cheat === c ? ' ✓' : ''}</button>
                ))}
              </div>
              <div style={{
                marginTop: 14, fontSize: 11, color: '#8A8A92', lineHeight: 1.5,
                paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                Running undeclared software is detected by anti-cheat monitoring and results in an immediate ban.
                Declare what is actually running.
              </div>
            </Card>

            <Card>
              <Eyebrow>REGION</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                {REGIONS.map(r => (
                  <button key={r.id} onClick={() => setRegion(r.id)} style={{
                    background: region === r.id ? '#26262A' : 'transparent',
                    border: region === r.id ? '1px solid rgba(255,255,255,0.18)' : '1px solid transparent',
                    padding: '8px 12px', borderRadius: 4,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', color: '#fff', fontSize: 13, transition: 'all 150ms',
                  }}>
                    <span>{r.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{r.ping}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
