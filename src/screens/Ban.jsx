import { useNavigate } from 'react-router-dom';
import { Icon, Pill, Button, Eyebrow } from '../components/Common';

const ban = {
  id: 'BAN-7F3A91',
  detected: 'AIMWARE (running) ≠ NIXWARE (declared)',
  issued: 'Apr 24, 2026 · 22:47 UTC+3',
  matchId: 'm_a93f1c',
  map: 'de_mirage',
  elo: -1842,
};

const blocked = [
  'Match search',
  'Tournaments & cups',
  'Teams & lobbies',
  'Chat & messages',
  'Steam account tied to ban',
  'IP / HWID blacklisted',
];

export default function Ban() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: -150, left: '50%', transform: 'translateX(-50%)',
        width: 1200, height: 600,
        background: 'radial-gradient(ellipse, rgba(255,69,58,0.18), transparent 60%)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 80px, rgba(255,69,58,0.025) 80px 81px)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px', position: 'relative' }}>
        <div style={{
          background: '#1C1C1F',
          border: '1px solid rgba(255,69,58,0.4)',
          borderTop: '4px solid #FF453A',
          borderRadius: 8, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,69,58,0.15)',
        }}>
          {/* Header */}
          <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 4,
                background: 'rgba(255,69,58,0.12)', border: '1px solid #FF453A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name="skull" size={36} color="#FF453A"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Pill tone="danger">PERMANENT BAN</Pill>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5A5A62' }}>#{ban.id}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,40px)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.01em', color: '#fff' }}>
                  Account<br/>banned
                </div>
                <div style={{ marginTop: 10, color: '#C8C8CE', fontSize: 14, lineHeight: 1.5 }}>
                  Anti-cheat monitoring detected a mismatch between declared and actually running software.
                </div>
              </div>
            </div>
          </div>

          {/* Detection block */}
          <div style={{ padding: '20px 40px', background: '#141416', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Eyebrow color="#8A8A92">DETECTED</Eyebrow>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.7 }}>
              <div style={{ color: '#FF453A' }}>✗ running:    AIMWARE</div>
              <div style={{ color: '#C8C8CE' }}>  declared:   NIXWARE</div>
              <div style={{ color: '#5A5A62', marginTop: 4 }}>  match_id:   {ban.matchId}</div>
              <div style={{ color: '#5A5A62' }}>  map:        {ban.map}</div>
            </div>
          </div>

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <Eyebrow>ISSUED</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#fff', marginTop: 6, textTransform: 'uppercase' }}>APR 24, 2026</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2, fontFamily: 'var(--font-mono)' }}>22:47 UTC+3</div>
            </div>
            <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <Eyebrow>DURATION</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#FF453A', marginTop: 6, textTransform: 'uppercase' }}>PERMANENT</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2 }}>No right of reinstatement</div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <Eyebrow>ELO LOST</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#FF453A', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{ban.elo}</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2 }}>Account zeroed</div>
            </div>
          </div>

          {/* What's blocked */}
          <div style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Eyebrow>WHAT IS BLOCKED</Eyebrow>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {blocked.map(x => (
                <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#C8C8CE' }}>
                  <Icon name="x" size={14} color="#FF453A"/>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '24px 40px', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 11, color: '#8A8A92', fontFamily: 'var(--font-mono)', maxWidth: 400 }}>
              If you believe the ban was issued in error — submit an appeal within 14 days.
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Button variant="ghost" size="md">Rules</Button>
              <Button variant="primary" size="md">Submit appeal</Button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: '#5A5A62', textAlign: 'center', lineHeight: 1.6 }}>
          Running undeclared software — immediate permanent ban, non-refundable.<br/>
          This is an anti-cheat monitoring decision and is not subject to discussion except through the appeal form.
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 0, color: '#5A5A62', fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>
            ← Back to profile
          </button>
        </div>
      </div>
    </div>
  );
}
