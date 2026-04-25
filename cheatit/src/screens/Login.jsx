import { useState } from 'react';
import { Icon, Eyebrow } from '../components/Common';
import logoWordmark from '../assets/logo-wordmark.svg';
import { register, login } from '../store';

const CHEATS  = ['NIXWARE','FATALITY','XONE','NEVERLOSE','MIDNIGHT','MEMESENSE','PRIMORDIAL','ONETAP'];
const FLAGS   = ['🇷🇺','🇺🇦','🇰🇿','🇧🇾','🇵🇱','🇩🇪','🇫🇷','🇺🇸','🇨🇦','🇨🇳','🇰🇷','🇯🇵'];
const REGIONS = ['EU','CIS','NA','ASIA'];

function Field({ label, type = 'text', value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A8A92', marginBottom: 6 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#26262A', border: `1px solid ${error ? '#FF453A' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 13,
          fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 150ms',
        }}
        onFocus={e => e.target.style.borderColor = error ? '#FF453A' : '#FF5500'}
        onBlur={e => e.target.style.borderColor = error ? '#FF453A' : 'rgba(255,255,255,0.1)'}
      />
      {error && <div style={{ color: '#FF453A', fontSize: 11, marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A8A92', marginBottom: 6 }}>{label}</div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', background: '#26262A', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 4, padding: '10px 12px', color: '#fff', fontSize: 13,
          fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [mode,     setMode]     = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cheat,    setCheat]    = useState('NIXWARE');
  const [region,   setRegion]   = useState('EU');
  const [country,  setCountry]  = useState('🇷🇺');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit() {
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));

    let result;
    if (mode === 'login') {
      result = login({ username, password });
    } else {
      result = register({ username, password, cheat, region, country });
    }

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      onLogin(result.user);
    }
  }

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

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: '#26262A', borderRadius: 4, padding: 3, marginBottom: 24 }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
              flex: 1, padding: '8px 0', background: mode === m ? '#FF5500' : 'transparent',
              border: 0, color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', cursor: 'pointer', borderRadius: 3, transition: 'background 150ms',
            }}>{m === 'login' ? 'Sign In' : 'Register'}</button>
          ))}
        </div>

        <Eyebrow color="#FF5500">{mode === 'login' ? 'SIGN IN TO CHEATIT' : 'CREATE ACCOUNT'}</Eyebrow>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '8px 0 20px', lineHeight: 1.05 }}>
          {mode === 'login' ? 'Welcome back' : 'Join the platform'}
        </div>

        <Field label="Username" value={username} onChange={setUsername} placeholder="your_username" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {mode === 'register' && (
          <>
            <Select
              label="Cheat software"
              value={cheat}
              onChange={setCheat}
              options={CHEATS.map(c => ({ value: c, label: c }))}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Select
                label="Region"
                value={region}
                onChange={setRegion}
                options={REGIONS.map(r => ({ value: r, label: r }))}
              />
              <Select
                label="Country"
                value={country}
                onChange={setCountry}
                options={FLAGS.map(f => ({ value: f, label: f }))}
              />
            </div>
          </>
        )}

        {error && (
          <div style={{ background: 'rgba(255,69,58,0.12)', border: '1px solid rgba(255,69,58,0.3)', borderRadius: 4, padding: '10px 12px', color: '#FF453A', fontSize: 12, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !username || !password}
          style={{
            width: '100%', background: loading || !username || !password ? '#3A3A40' : '#FF5500',
            color: loading || !username || !password ? '#5A5A62' : '#fff',
            border: 0, padding: '14px 16px', borderRadius: 4,
            fontFamily: 'var(--font-display)', fontSize: 16, textTransform: 'uppercase',
            letterSpacing: '0.08em', cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
            transition: 'background 180ms', boxShadow: !loading && username && password ? '0 0 24px rgba(255,85,0,0.35)' : 'none',
          }}
        >
          {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <div style={{ marginTop: 20, fontSize: 11, color: '#5A5A62', textAlign: 'center' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already registered? '}
          <span
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ color: '#FF5500', cursor: 'pointer', fontWeight: 700 }}
          >
            {mode === 'login' ? 'Register' : 'Sign in'}
          </span>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: '#5A5A62', lineHeight: 1.6, textAlign: 'center' }}>
          By registering you agree to the{' '}
          <span style={{ color: '#C8C8CE', textDecoration: 'underline', cursor: 'pointer' }}>rules</span>
          {' '}and{' '}
          <span style={{ color: '#C8C8CE', textDecoration: 'underline', cursor: 'pointer' }}>anti-cheat monitoring policy</span>.
        </div>
      </div>
    </div>
  );
}
