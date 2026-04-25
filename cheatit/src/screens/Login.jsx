import { Icon, Eyebrow } from '../components/Common';
import logoWordmark from '../assets/logo-wordmark.svg';

export default function Login({ onLogin }) {
  return (
    <div style={{
      background: '#0D0D0F', minHeight: '100vh', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(255,85,0,0.18), transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 60px, rgba(255,255,255,0.012) 60px 61px)' }}/>

      <div style={{ position: 'relative', width: 420, padding: 40, background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
        <img src={logoWordmark} style={{ height: 40, marginBottom: 32 }} alt="CHEATIT"/>
        <Eyebrow color="#FF5500">SIGN IN TO CHEATIT</Eyebrow>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '8px 0 20px', lineHeight: 1.05 }}>
          Sign in<br/>via Steam
        </div>
        <p style={{ color: '#C8C8CE', fontSize: 13, lineHeight: 1.6, marginBottom: 24, marginTop: 0 }}>
          Verify your CS2 account. We check your hours, rank and VAC history.
          Accounts under 30 days old are not accepted.
        </p>

        <button onClick={onLogin} style={{
          width: '100%', background: '#1B2838', color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'background 180ms',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#223650'}
          onMouseLeave={e => e.currentTarget.style.background = '#1B2838'}
        >
          <Icon name="steam" size={20} color="#66c0f4"/>
          Sign in via Steam
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: '#5A5A62', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}/>
          <span>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}/>
        </div>

        <button onClick={onLogin} style={{
          width: '100%', background: 'transparent', color: '#C8C8CE',
          border: '1px solid rgba(255,255,255,0.18)', padding: '12px 16px', borderRadius: 4,
          fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          cursor: 'pointer', transition: 'border-color 180ms',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
        >
          I have an invite code
        </button>

        <div style={{ marginTop: 24, fontSize: 11, color: '#5A5A62', lineHeight: 1.6, textAlign: 'center' }}>
          By registering you agree to the{' '}
          <span style={{ color: '#C8C8CE', textDecoration: 'underline', cursor: 'pointer' }}>rules</span>
          {' '}and{' '}
          <span style={{ color: '#C8C8CE', textDecoration: 'underline', cursor: 'pointer' }}>anti-cheat monitoring policy</span>.
        </div>
      </div>
    </div>
  );
}
