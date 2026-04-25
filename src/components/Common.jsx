import { useNavigate, useLocation } from 'react-router-dom';
import logoWordmark from '../assets/logo-wordmark.svg';

export const Icon = ({ name, size = 18, color = 'currentColor', stroke = 1.75 }) => {
  const paths = {
    home:       <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5Z"/>,
    play:       <polygon points="6 4 20 12 6 20 6 4"/>,
    trophy:     <><path d="M8 3h8v4a4 4 0 0 1-8 0V3Z"/><path d="M5 5H3v2a3 3 0 0 0 3 3"/><path d="M19 5h2v2a3 3 0 0 1-3 3"/><path d="M10 14h4v3h2v3H8v-3h2v-3Z"/></>,
    users:      <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell:       <><path d="M6 8a6 6 0 1 1 12 0c0 6 3 7 3 7H3s3-1 3-7Z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    search:     <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    settings:   <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
    steam:      <><circle cx="12" cy="12" r="10"/><circle cx="9" cy="12" r="2.5"/><circle cx="16" cy="9" r="1.5"/></>,
    check:      <polyline points="20 6 9 17 4 12"/>,
    x:          <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    fire:       <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.5-1 2.5-2.5 0-2-2.5-3-2.5-5.5 0 0-1 1.5-2 2.5s-1 1.5-1 3Z"/><path d="M15 14c0 5-3 8-7 8s-7-3-7-8c0-2 1-4 2-5 0 1 1 2 2 2s2-2 2-4 1-4 2-5c0 4 4 5 4 9 1-2 4-3 4-7 1 1 2 4 2 7Z" transform="translate(2 0)"/></>,
    coin:       <><circle cx="12" cy="12" r="9"/><path d="M9 9h4.5a2 2 0 0 1 0 4H9"/><path d="M9 13v3"/></>,
    plus:       <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    skull:      <><path d="M4 11a8 8 0 1 1 16 0v4a2 2 0 0 1-1 1.7l-1 .6V20a1 1 0 0 1-1 1h-2v-2h-2v2h-2v-2h-2v2H7a1 1 0 0 1-1-1v-2.7l-1-.6A2 2 0 0 1 4 15v-4Z"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/></>,
    chevronDown:<polyline points="6 9 12 15 18 9"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

export const Level = ({ n, size = 'md' }) => {
  const cls = `lvl lvl-${n}` + (size !== 'md' ? ` lvl-${size}` : '');
  return <span className={cls}>{n}</span>;
};

export const Avatar = ({ initials = 'PL', level, size = 40 }) => (
  <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
    <div style={{
      width: size, height: size, borderRadius: 4,
      background: 'linear-gradient(135deg,#3a3a40,#1c1c1f)',
      border: '1px solid rgba(255,255,255,0.08)',
      color: '#5A5A62', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontSize: size * 0.38,
    }}>{initials}</div>
    {level && (
      <span className={`lvl lvl-${level} lvl-sm`}
        style={{ position: 'absolute', bottom: -4, right: -4, border: '2px solid #0D0D0F' }}>
        {level}
      </span>
    )}
  </div>
);

export const TopBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.replace('/', '') || 'profile';

  const tabs = [
    { id: 'play', label: 'PLAY' },
    { id: 'tournaments', label: 'TOURNAMENTS' },
    { id: 'leaderboard', label: 'LEADERBOARD' },
  ];

  return (
    <div style={{
      height: 56, background: 'rgba(13,13,15,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 24,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <a onClick={() => navigate('/profile')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src={logoWordmark} style={{ height: 28 }} alt="CHEATIT"/>
      </a>
      <div style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => navigate(`/${t.id}`)}
            style={{
              background: 'transparent', border: 0,
              color: active === t.id ? '#fff' : '#8A8A92',
              padding: '0 14px', height: 56, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              borderBottom: active === t.id ? '2px solid #FF5500' : '2px solid transparent',
              transition: 'color 180ms', textTransform: 'uppercase',
            }}>{t.label}</button>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 220, display: 'flex', alignItems: 'center', gap: 8,
          background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4, padding: '6px 10px', color: '#5A5A62', fontSize: 12,
        }}>
          <Icon name="search" size={14}/>
          <span>Search player, match...</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4, padding: '6px 10px',
        }}>
          <Icon name="coin" size={14} color="#FFD60A"/>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>1 250</span>
          <Icon name="plus" size={12} color="#FF5500"/>
        </div>
        <button style={{ background: 'transparent', border: 0, color: '#8A8A92', cursor: 'pointer', position: 'relative' }}>
          <Icon name="bell" size={18}/>
          <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: '#FF5500', borderRadius: 999 }}/>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}>
          <Avatar initials={user?.initials || 'HV'} level={user?.level || 7} size={32}/>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{user?.name || 'hvh_god_2007'}</div>
            <div style={{ color: '#FF5500', fontSize: 10, fontFamily: 'var(--font-display)' }}>{user?.elo || 1842} ELO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Pill = ({ tone = 'neutral', children }) => {
  const tones = {
    success: { bg: 'rgba(50,215,75,0.15)', fg: '#32D74B' },
    danger:  { bg: 'rgba(255,69,58,0.15)', fg: '#FF453A' },
    warning: { bg: 'rgba(255,214,10,0.15)', fg: '#FFD60A' },
    info:    { bg: 'rgba(10,132,255,0.15)', fg: '#0A84FF' },
    brand:   { bg: 'rgba(255,85,0,0.15)', fg: '#FF5500' },
    neutral: { bg: '#26262A', fg: '#C8C8CE' },
  }[tone];
  return (
    <span style={{
      background: tones.bg, color: tones.fg,
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 3,
      fontFamily: 'var(--font-body)',
    }}>{children}</span>
  );
};

export const Button = ({ variant = 'primary', size = 'md', children, glow, onClick, disabled, style }) => {
  const sizes = { sm: '6px 12px', md: '10px 20px', lg: '14px 28px' };
  const variants = {
    primary:   { bg: '#FF5500', fg: '#fff', border: '0' },
    secondary: { bg: '#26262A', fg: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
    ghost:     { bg: 'transparent', fg: '#C8C8CE', border: '1px solid rgba(255,255,255,0.18)' },
    danger:    { bg: '#FF453A', fg: '#fff', border: '0' },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? '#3A3A40' : v.bg,
      color: disabled ? '#5A5A62' : v.fg,
      border: v.border, padding: sizes[size], borderRadius: 4,
      fontFamily: size === 'lg' ? 'var(--font-display)' : 'var(--font-body)',
      fontSize: size === 'lg' ? 16 : size === 'sm' ? 11 : 12,
      fontWeight: size === 'lg' ? 400 : 700,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: glow ? '0 0 24px rgba(255,85,0,0.45)' : 'none',
      transition: 'all 180ms var(--ease-out)',
      ...style,
    }}>{children}</button>
  );
};

export const Card = ({ children, padding = 24, style }) => (
  <div style={{
    background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8, padding, ...style,
  }}>{children}</div>
);

export const Eyebrow = ({ children, color = '#8A8A92' }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.12em', color, fontFamily: 'var(--font-body)',
  }}>{children}</div>
);

export const SectionTitle = ({ children, action }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
    <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', textTransform: 'uppercase' }}>{children}</h2>
    {action}
  </div>
);
