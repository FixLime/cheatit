import { useState } from 'react';
import { Button, Card, Pill, Eyebrow, SectionTitle, Icon } from '../components/Common';

const featured = {
  title: 'CHEATIT MAJOR · SPRING 2026',
  prize: '₽ 500,000', teams: '32 teams', starts: 'IN 4 DAYS', status: 'REGISTRATION',
  registered: 18, maxTeams: 32,
};

const list = [
  { title: 'WEEKLY HVH CUP #142', prize: '₽ 25,000', mode: '5v5', starts: '23:00 UTC+3', slots: 64,  maxSlots: 128, status: 'OPEN' },
  { title: 'NIGHTSHIFT WINGMAN',  prize: '₽ 10,000', mode: '2v2', starts: 'TOMORROW',     slots: 12,  maxSlots: 64,  status: 'OPEN' },
  { title: 'AIM ARENA DAILY',     prize: '₽ 5,000',  mode: '1v1', starts: 'NOW',           slots: 47,  maxSlots: 64,  status: 'LIVE' },
  { title: 'ROOKIE CUP',          prize: 'SKINS',     mode: '5v5', starts: 'SAT 18:00',    slots: 8,   maxSlots: 32,  status: 'OPEN' },
  { title: 'NEVERLOSE INVITE',    prize: '₽ 100,000', mode: '5v5', starts: '7 DAYS',       slots: null, maxSlots: null, status: 'INVITE' },
  { title: 'MIDNIGHT MAYHEM',     prize: '₽ 15,000',  mode: '5v5', starts: 'SUN 22:00',    slots: 24,  maxSlots: 32,  status: 'OPEN' },
];

const statusTone = { OPEN: 'success', LIVE: 'danger', INVITE: 'brand' };

export default function Tournaments() {
  const [modal, setModal]     = useState(null);  // null | tournament object
  const [registered, setRegistered] = useState(new Set());
  const [tab, setTab]         = useState('open');

  const handleJoin = (t) => setModal(t);

  const confirmJoin = () => {
    setRegistered(s => new Set([...s, modal.title]));
    setModal(null);
  };

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>

      {/* Registration modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{ background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '32px 36px', maxWidth: 400, width: '90%', boxShadow: '0 12px 60px rgba(0,0,0,0.8)' }}>
            <Eyebrow color="#FF5500">REGISTRATION</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, textTransform: 'uppercase', margin: '8px 0 20px', lineHeight: 1.1 }}>
              {modal.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { l: 'PRIZE',  v: modal.prize },
                { l: 'MODE',   v: modal.mode },
                { l: 'STARTS', v: modal.starts },
                { l: 'SLOTS',  v: modal.slots != null ? `${modal.slots}/${modal.maxSlots}` : 'Invite only' },
              ].map(r => (
                <div key={r.l} style={{ background: '#26262A', borderRadius: 4, padding: '10px 14px' }}>
                  <Eyebrow>{r.l}</Eyebrow>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: r.l === 'PRIZE' ? '#FF5500' : '#fff', marginTop: 4 }}>{r.v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#8A8A92', marginBottom: 20, lineHeight: 1.6, padding: '10px 12px', background: 'rgba(255,214,10,0.06)', border: '1px solid rgba(255,214,10,0.15)', borderRadius: 4 }}>
              ⚠ Your declared software must match what you run. Running undeclared software = instant ban.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="md" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="primary" size="md" onClick={confirmJoin} style={{ flex: 1 }}>Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {registered.size > 0 && (
        <div style={{ position: 'fixed', bottom: 100, right: 24, zIndex: 150 }}>
          {[...registered].slice(-1).map(t => (
            <div key={t} style={{ background: '#1C1C1F', border: '1px solid rgba(50,215,75,0.3)', borderLeft: '3px solid #32D74B', borderRadius: 6, padding: '12px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: 280 }}>
              <div style={{ fontSize: 11, color: '#32D74B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Registered ✓</div>
              <div style={{ fontSize: 13, color: '#C8C8CE' }}>{t}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <Eyebrow color="#FF5500">CS2 · OFFICIAL + COMMUNITY</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', textTransform: 'uppercase', margin: '8px 0 24px', letterSpacing: '-0.01em' }}>
          Tournaments
        </h1>

        {/* Featured */}
        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 32, background: 'linear-gradient(135deg, #1C1C1F 0%, #0D0D0F 100%)' }}>
          <div style={{ position: 'absolute', right: -100, top: -50, width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(255,85,0,0.22), transparent 65%)' }}/>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 40px, rgba(255,85,0,0.035) 40px 41px)' }}/>
          <div style={{ position: 'relative', padding: 40, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            <div>
              <Pill tone="brand">{featured.status}</Pill>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', textTransform: 'uppercase', margin: '12px 0', letterSpacing: '-0.01em', lineHeight: 1 }}>
                {featured.title}
              </div>
              <div style={{ display: 'flex', gap: 32, marginTop: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#FF5500' }}>{featured.prize}</div><Eyebrow>Prize pool</Eyebrow></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>{featured.teams}</div><Eyebrow>Participants</Eyebrow></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>{featured.starts}</div><Eyebrow>Starts</Eyebrow></div>
              </div>
              {/* Registration progress */}
              <div style={{ marginBottom: 20, maxWidth: 240 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8A8A92', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                  <span>Teams registered</span><span>{featured.registered}/{featured.maxTeams}</span>
                </div>
                <div style={{ height: 3, background: '#26262A', borderRadius: 999 }}>
                  <div style={{ width: `${(featured.registered / featured.maxTeams) * 100}%`, height: '100%', background: '#FF5500', borderRadius: 999 }}/>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="primary" size="md" glow onClick={() => handleJoin(featured)}>
                  {registered.has(featured.title) ? 'Registered ✓' : 'Register'}
                </Button>
                <Button variant="ghost" size="md">Bracket ›</Button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,10vw,140px)', color: 'rgba(255,85,0,0.14)', lineHeight: 0.85, letterSpacing: '-0.04em', textAlign: 'center' }}>
                04<br/><span style={{ fontSize: '0.5em' }}>DAYS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {['open', 'live', 'upcoming'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? '#FF5500' : 'transparent',
              border: tab === t ? 0 : '1px solid rgba(255,255,255,0.14)',
              color: tab === t ? '#fff' : '#C8C8CE',
              padding: '8px 16px', borderRadius: 4, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 150ms',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {list.map(t => {
            const isReg = registered.has(t.title);
            return (
              <Card key={t.title} style={{ cursor: 'pointer', transition: 'border-color 150ms, transform 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <Pill tone={isReg ? 'success' : statusTone[t.status]}>{isReg ? 'REGISTERED' : t.status}</Pill>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{t.mode}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 14 }}>{t.title}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF5500' }}>{t.prize}</div><Eyebrow>Prize</Eyebrow></div>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{t.starts}</div><Eyebrow>Start</Eyebrow></div>
                </div>
                {t.slots != null && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ height: 2, background: '#26262A', borderRadius: 999, marginBottom: 4 }}>
                      <div style={{ width: `${(t.slots / t.maxSlots) * 100}%`, height: '100%', background: t.status === 'LIVE' ? '#FF453A' : '#32D74B', borderRadius: 999 }}/>
                    </div>
                    <div style={{ fontSize: 10, color: '#8A8A92', fontFamily: 'var(--font-mono)' }}>{t.slots}/{t.maxSlots} slots</div>
                  </div>
                )}
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#8A8A92', fontFamily: 'var(--font-mono)' }}>
                    {t.slots != null ? `${t.slots}/${t.maxSlots}` : 'By invite'}
                  </span>
                  <Button
                    variant={isReg ? 'secondary' : t.status === 'INVITE' ? 'ghost' : 'secondary'}
                    size="sm"
                    onClick={() => !isReg && handleJoin(t)}
                    style={isReg ? { color: '#32D74B' } : {}}
                  >
                    {isReg ? 'Registered ✓' : t.status === 'INVITE' ? 'Invite' : 'Join'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
