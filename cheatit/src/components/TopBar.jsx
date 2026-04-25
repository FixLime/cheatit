import { useState } from 'react';
import { Icon, Avatar } from './Common';
import logoWordmark from '../assets/logo-wordmark.svg';

const ALL_PLAYERS = [
  'silent_aim_god', 'pasta_resolver', 'fake_duck', 'desync_main',
  'onetap_only', 'no_spread_btw', 'fdoc_master', 'antiaim_wizard',
  'lc_fake_lag', 'jitter_god', 'hvh_god_2007', 'awp_kid',
];

export default function TopBar({ user, active, onNav, notifOpen, onNotif }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = query.length > 1
    ? ALL_PLAYERS.filter(p => p.includes(query.toLowerCase())).slice(0, 5)
    : [];

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
      <a onClick={() => onNav('profile')} style={{ cursor: 'pointer', flexShrink: 0 }}>
        <img src={logoWordmark} style={{ height: 28 }} alt="CHEATIT"/>
      </a>

      <div style={{ display: 'flex', gap: 0, marginLeft: 8 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => onNav(t.id)} style={{
            background: 'transparent', border: 0,
            color: active === t.id ? '#fff' : '#8A8A92',
            padding: '0 14px', height: 56, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.08em', fontFamily: 'var(--font-body)', cursor: 'pointer',
            borderBottom: active === t.id ? '2px solid #FF5500' : '2px solid transparent',
            transition: 'color 180ms', textTransform: 'uppercase',
          }}
            onMouseEnter={e => { if (active !== t.id) e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { if (active !== t.id) e.currentTarget.style.color = '#8A8A92'; }}
          >{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 200, display: 'flex', alignItems: 'center', gap: 8,
            background: focused ? '#26262A' : '#1C1C1F',
            border: `1px solid ${focused ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 4, padding: '6px 10px', transition: 'all 180ms',
          }}>
            <Icon name="search" size={13} color="#5A5A62"/>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => { setFocused(false); setQuery(''); }, 150)}
              placeholder="Search player..."
              style={{
                background: 'transparent', border: 0, outline: 0,
                color: '#fff', fontSize: 12, width: '100%',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
          {results.length > 0 && focused && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
              background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}>
              {results.map(r => (
                <div key={r} style={{
                  padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8,
                  cursor: 'pointer', fontSize: 13, transition: 'background 120ms',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Avatar initials={r.slice(0, 2).toUpperCase()} size={24}/>
                  <span style={{ color: '#fff' }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Points */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4, padding: '6px 10px', cursor: 'pointer',
          transition: 'border-color 150ms',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
        >
          <Icon name="coin" size={14} color="#FFD60A"/>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>1 250</span>
          <Icon name="plus" size={12} color="#FF5500"/>
        </div>

        {/* Notifications */}
        <button onClick={onNotif} style={{
          background: notifOpen ? 'rgba(255,85,0,0.12)' : 'transparent',
          border: notifOpen ? '1px solid rgba(255,85,0,0.3)' : '1px solid transparent',
          color: notifOpen ? '#FF5500' : '#8A8A92',
          cursor: 'pointer', borderRadius: 4, padding: '5px 7px',
          position: 'relative', display: 'flex', transition: 'all 150ms',
        }}>
          <Icon name="bell" size={18}/>
          <span style={{ position: 'absolute', top: 1, right: 1, width: 8, height: 8, background: '#FF5500', borderRadius: 999, border: '2px solid #0D0D0F' }}/>
        </button>

        {/* User */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.06)',
          cursor: 'pointer', borderRadius: 4, padding: '4px 8px',
          transition: 'background 150ms',
        }}
          onClick={() => onNav('profile')}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Avatar initials={user?.initials || 'HV'} level={user?.level || 7} size={32}/>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{user?.name}</div>
            <div style={{ color: '#FF5500', fontSize: 10, fontFamily: 'var(--font-display)' }}>{user?.elo} ELO</div>
          </div>
          <Icon name="chevronDown" size={12} color="#5A5A62"/>
        </div>
      </div>
    </div>
  );
}
