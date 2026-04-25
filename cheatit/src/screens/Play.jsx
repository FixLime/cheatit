import { useState, useEffect, useRef } from 'react';
import { Button, Card, Eyebrow, Avatar, Level } from '../components/Common';

const CHEATS  = ['NIXWARE', 'FATALITY', 'XONE', 'NEVERLOSE', 'MIDNIGHT', 'MEMESENSE', 'PRIMORDIAL', 'ONETAP'];
const REGIONS = [
  { id: 'EU',  label: 'Europe',        ping: '38ms' },
  { id: 'CIS', label: 'CIS',           ping: '12ms' },
  { id: 'NA',  label: 'North America', ping: '120ms' },
];
const MODES = [
  { id: '5v5', label: '5 VS 5', sub: 'Competitive' },
  { id: '2v2', label: '2 VS 2', sub: 'Wingman' },
  { id: '1v1', label: '1 VS 1', sub: 'AIM' },
  { id: 'hub', label: 'HUB',    sub: 'Custom rules' },
];

const FAKE_PLAYERS = [
  { name: 'silent_aim_god', lvl: 10 }, { name: 'pasta_resolver', lvl: 9 },
  { name: 'fake_duck',      lvl: 10 }, { name: 'desync_main',     lvl: 8 },
  { name: 'onetap_only',    lvl: 10 }, { name: 'no_spread_btw',   lvl: 9 },
  { name: 'fdoc_master',    lvl: 8  }, { name: 'antiaim_wizard',  lvl: 10 },
  { name: 'jitter_god',     lvl: 9  },
];

const MAPS = ['de_mirage', 'de_inferno', 'de_nuke', 'de_ancient', 'de_anubis', 'de_dust2', 'de_overpass'];

export default function Play() {
  const [phase,    setPhase]    = useState('idle');   // idle | queuing | found | mapvote | accept | live
  const [cheat,    setCheat]    = useState('NIXWARE');
  const [region,   setRegion]   = useState('EU');
  const [mode,     setMode]     = useState('5v5');
  const [elapsed,  setElapsed]  = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [accept_t, setAccept_t] = useState(20);
  const [mapBans,  setMapBans]  = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [banTurn,  setBanTurn]  = useState(0); // index into ban sequence
  const [mapPicked, setMapPicked] = useState(false);
  const timerRef = useRef(null);
  const acceptRef = useRef(null);

  // Queue timer
  useEffect(() => {
    if (phase === 'queuing') {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
      // Simulate match found after 8-15s
      const delay = 8000 + Math.random() * 7000;
      setTimeout(() => {
        if (phase === 'queuing') setPhase('found');
      }, delay);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // Accept countdown
  useEffect(() => {
    if (phase === 'found') {
      setAccept_t(20);
      setAccepted(false);
      acceptRef.current = setInterval(() => {
        setAccept_t(t => {
          if (t <= 1) { setPhase('idle'); clearInterval(acceptRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(acceptRef.current);
    }
    return () => clearInterval(acceptRef.current);
  }, [phase]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleAccept = () => {
    setAccepted(true);
    clearInterval(acceptRef.current);
    setTimeout(() => setPhase('mapvote'), 1200);
  };

  // Map ban logic (simplified: alternating, 3 bans each, 1 map left)
  const banOrder = ['YOU', 'OPP', 'YOU', 'OPP', 'YOU', 'OPP'];
  const remainingMaps = MAPS.filter(m => !mapBans.includes(m) && m !== selectedMap);

  const handleBan = (map) => {
    if (mapBans.includes(map) || banTurn >= banOrder.length || mapPicked) return;
    if (banOrder[banTurn] !== 'YOU') return;
    const newBans = [...mapBans, map];
    setMapBans(newBans);
    const next = banTurn + 1;
    setBanTurn(next);
    if (next < banOrder.length) {
      // Simulate opponent ban after 1.5s
      if (banOrder[next] === 'OPP') {
        const available = MAPS.filter(m => !newBans.includes(m));
        if (available.length > 0) {
          setTimeout(() => {
            const oppBan = available[Math.floor(Math.random() * available.length)];
            setMapBans(b => [...b, oppBan]);
            setBanTurn(t => {
              const nn = t + 1;
              if (nn >= banOrder.length) {
                // Auto-pick last map
                setTimeout(() => {
                  const left = MAPS.filter(m => ![...newBans, oppBan].includes(m));
                  if (left.length === 1) { setSelectedMap(left[0]); setMapPicked(true); }
                }, 500);
              }
              return nn;
            });
          }, 1500);
        }
      }
    } else {
      const left = MAPS.filter(m => !newBans.includes(m));
      if (left.length === 1) { setSelectedMap(left[0]); setMapPicked(true); }
    }
  };

  const startLive = () => setPhase('live');

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      {/* Match Found overlay */}
      {phase === 'found' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#1C1C1F', border: '1px solid rgba(255,85,0,0.4)',
            borderTop: '4px solid #FF5500', borderRadius: 8,
            padding: '40px 48px', textAlign: 'center', maxWidth: 440,
            boxShadow: '0 0 60px rgba(255,85,0,0.2)',
            animation: 'fadeUp 0.3s ease-out',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#FF5500', textTransform: 'uppercase', marginBottom: 8 }}>Match found</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>
              MATCH<br/>FOUND
            </div>
            <div style={{ color: '#8A8A92', fontSize: 13, margin: '16px 0 28px' }}>
              {mode === '5v5' ? '5 vs 5' : mode} · {REGIONS.find(r => r.id === region)?.label} · {cheat}
            </div>

            {/* Countdown ring */}
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 28px' }}>
              <svg width="72" height="72" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="36" cy="36" r="30" fill="none" stroke="#26262A" strokeWidth="4"/>
                <circle cx="36" cy="36" r="30" fill="none" stroke={accepted ? '#32D74B' : '#FF5500'} strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - accept_t / 20)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, color: accepted ? '#32D74B' : '#fff' }}>
                {accepted ? '✓' : accept_t}
              </div>
            </div>

            <button
              onClick={handleAccept}
              disabled={accepted}
              style={{
                width: '100%', background: accepted ? '#32D74B' : '#FF5500',
                color: '#fff', border: 0, padding: '16px', borderRadius: 4,
                fontFamily: 'var(--font-display)', fontSize: 20, textTransform: 'uppercase',
                letterSpacing: '0.04em', cursor: accepted ? 'default' : 'pointer',
                boxShadow: accepted ? '0 0 20px rgba(50,215,75,0.3)' : '0 0 30px rgba(255,85,0,0.4)',
                transition: 'all 300ms',
              }}>
              {accepted ? 'ACCEPTED' : 'ACCEPT'}
            </button>
            {!accepted && (
              <button onClick={() => setPhase('idle')} style={{
                background: 'transparent', border: 0, color: '#5A5A62',
                marginTop: 12, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-body)',
              }}>Decline</button>
            )}
          </div>
        </div>
      )}

      {/* Map vote screen */}
      {phase === 'mapvote' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '32px 40px', maxWidth: 560, width: '100%',
            boxShadow: '0 12px 60px rgba(0,0,0,0.8)',
          }}>
            <Eyebrow color="#FF5500">MAP VETO</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, textTransform: 'uppercase', margin: '8px 0 20px' }}>
              {mapPicked ? `Playing on ${selectedMap}` : `${banOrder[banTurn] === 'YOU' ? 'Your turn' : "Opponent's turn"} to ban`}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
              {MAPS.map(m => {
                const banned = mapBans.includes(m);
                const isPicked = m === selectedMap;
                return (
                  <button key={m} onClick={() => handleBan(m)} disabled={banned || mapPicked || banOrder[banTurn] !== 'YOU'} style={{
                    background: isPicked ? 'rgba(50,215,75,0.15)' : banned ? 'rgba(255,69,58,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isPicked ? '#32D74B' : banned ? 'rgba(255,69,58,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 6, padding: '10px 6px', cursor: banned || mapPicked ? 'default' : 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: isPicked ? '#32D74B' : banned ? '#5A5A62' : '#C8C8CE',
                    textDecoration: banned ? 'line-through' : 'none',
                    transition: 'all 150ms', textAlign: 'center',
                  }}
                    onMouseEnter={e => { if (!banned && !mapPicked && banOrder[banTurn] === 'YOU') e.currentTarget.style.borderColor = '#FF453A'; }}
                    onMouseLeave={e => { if (!banned && !mapPicked) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    {m.replace('de_', '')}
                    {banned && <div style={{ fontSize: 9, color: '#FF453A', marginTop: 2 }}>BANNED</div>}
                    {isPicked && <div style={{ fontSize: 9, color: '#32D74B', marginTop: 2 }}>PICKED ✓</div>}
                  </button>
                );
              })}
            </div>

            {/* Ban sequence indicator */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
              {banOrder.map((who, i) => (
                <div key={i} style={{
                  padding: '3px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700,
                  background: i < banTurn ? 'rgba(255,255,255,0.06)' : i === banTurn ? (who === 'YOU' ? 'rgba(255,85,0,0.2)' : 'rgba(255,69,58,0.15)') : 'transparent',
                  border: `1px solid ${i === banTurn ? (who === 'YOU' ? '#FF5500' : '#FF453A') : 'rgba(255,255,255,0.08)'}`,
                  color: i < banTurn ? '#5A5A62' : who === 'YOU' ? '#FF5500' : '#FF453A',
                }}>
                  {who} BAN {i + 1}
                </div>
              ))}
            </div>

            {mapPicked ? (
              <button onClick={startLive} style={{
                width: '100%', background: '#FF5500', color: '#fff', border: 0,
                padding: '14px', borderRadius: 4, fontFamily: 'var(--font-display)',
                fontSize: 18, textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 0 24px rgba(255,85,0,0.4)',
              }}>
                GO TO SERVER
              </button>
            ) : banOrder[banTurn] === 'OPP' ? (
              <div style={{ textAlign: 'center', color: '#8A8A92', fontSize: 13 }}>
                Waiting for opponent to ban...
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Live match screen */}
      {phase === 'live' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <Eyebrow color="#32D74B">LIVE MATCH</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, textTransform: 'uppercase', margin: '12px 0 8px' }}>
              {selectedMap}
            </div>
            <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 24 }}>
              Connect to: <span style={{ fontFamily: 'var(--font-mono)', color: '#FF5500' }}>connect 185.44.21.7:27015</span>
            </div>
            <button
              onClick={() => { setPhase('idle'); setMapBans([]); setBanTurn(0); setSelectedMap(null); setMapPicked(false); }}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#C8C8CE', padding: '10px 24px', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Leave
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', overflow: 'hidden', padding: '48px 24px 32px' }}>
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 1000, height: 600, background: 'radial-gradient(ellipse, rgba(255,85,0,0.10), transparent 60%)', pointerEvents: 'none' }}/>

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
                borderRadius: 8, padding: 18, cursor: 'pointer', position: 'relative', transition: 'all 180ms',
              }}
                onMouseEnter={e => { if (mode !== m.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                onMouseLeave={e => { if (mode !== m.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                {mode === m.id && <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: 999, background: '#FF5500', boxShadow: '0 0 8px #FF5500' }}/>}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: mode === m.id ? '#fff' : '#8A8A92', textTransform: 'uppercase' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Queue card */}
          <Card padding={40} style={{ textAlign: 'center' }}>
            {phase === 'queuing' ? (
              <>
                <Eyebrow color="#FFD60A">IN QUEUE · {fmt(elapsed)}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,56px)', textTransform: 'uppercase', margin: '12px 0', letterSpacing: '-0.01em' }}>
                  Searching for opponents
                </div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 28 }}>
                  Looking for 9 players level 6–8 in {REGIONS.find(r => r.id === region)?.label} · Avg ping 38ms
                </div>
                {/* Player slots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: '#FF5500', border: '1px solid #FF5500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 13, boxShadow: '0 0 12px rgba(255,85,0,0.5)' }}>HV</div>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={{
                      width: 40, height: 40, borderRadius: 4,
                      background: elapsed > (i + 1) * 1.5 ? 'rgba(255,255,255,0.06)' : '#141416',
                      border: elapsed > (i + 1) * 1.5 ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#5A5A62', fontFamily: 'var(--font-display)', fontSize: 11,
                      transition: 'all 500ms',
                    }}>
                      {elapsed > (i + 1) * 1.5 ? FAKE_PLAYERS[i]?.name.slice(0, 2).toUpperCase() : ''}
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="md" onClick={() => setPhase('idle')}>Cancel · ESC</Button>
              </>
            ) : (
              <>
                <Eyebrow>READY TO PLAY</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,80px)', textTransform: 'uppercase', margin: '8px 0 12px', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  Play
                </div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 28 }}>
                  Level 7 · ELO 1842 · {REGIONS.find(r => r.id === region)?.label}
                </div>
                <button
                  onClick={() => setPhase('queuing')}
                  disabled={!cheat}
                  style={{
                    background: cheat ? '#FF5500' : '#3A3A40', color: cheat ? '#fff' : '#5A5A62',
                    border: 0, padding: '20px 80px', borderRadius: 4,
                    fontFamily: 'var(--font-display)', fontSize: 28,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    boxShadow: cheat ? '0 0 40px rgba(255,85,0,0.55)' : 'none',
                    cursor: cheat ? 'pointer' : 'not-allowed', transition: 'all 180ms',
                  }}
                  onMouseEnter={e => { if (cheat) e.currentTarget.style.background = '#E64D00'; }}
                  onMouseLeave={e => { if (cheat) e.currentTarget.style.background = '#FF5500'; }}
                >
                  START SEARCH
                </button>
                {!cheat && <div style={{ marginTop: 12, fontSize: 11, color: '#FF453A' }}>Select a cheat first</div>}
              </>
            )}
          </Card>

          {/* Bottom settings */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 24 }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Eyebrow>DECLARED SOFTWARE</Eyebrow>
                <span style={{ fontSize: 10, color: '#FF453A', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>* Required</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CHEATS.map(c => (
                  <button key={c} onClick={() => setCheat(c)} style={{
                    background: cheat === c ? 'rgba(255,85,0,0.12)' : 'transparent',
                    border: cheat === c ? '1px solid #FF5500' : '1px solid rgba(255,255,255,0.14)',
                    color: cheat === c ? '#FF5500' : '#C8C8CE',
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
                    padding: '7px 14px', borderRadius: 999, cursor: 'pointer', transition: 'all 150ms',
                  }}
                    onMouseEnter={e => { if (cheat !== c) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseLeave={e => { if (cheat !== c) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#C8C8CE'; } }}
                  >
                    {c}{cheat === c ? ' ✓' : ''}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: '#5A5A62', lineHeight: 1.6, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                ⚠ Running undeclared software is detected and results in an immediate permanent ban. Declare what you actually run.
              </div>
            </Card>

            <Card>
              <Eyebrow>REGION</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                {REGIONS.map(r => (
                  <button key={r.id} onClick={() => setRegion(r.id)} style={{
                    background: region === r.id ? '#26262A' : 'transparent',
                    border: region === r.id ? '1px solid rgba(255,255,255,0.18)' : '1px solid transparent',
                    padding: '10px 12px', borderRadius: 4, display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', color: '#fff', fontSize: 13, transition: 'all 150ms',
                  }}
                    onMouseEnter={e => { if (region !== r.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    onMouseLeave={e => { if (region !== r.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span>{r.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{r.ping}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
