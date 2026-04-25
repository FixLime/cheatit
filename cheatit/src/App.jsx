import { useState } from 'react';
import { Icon } from './components/Common';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Play from './screens/Play';
import Leaderboard from './screens/Leaderboard';
import Tournaments from './screens/Tournaments';
import Ban from './screens/Ban';
import TopBar from './components/TopBar';
import logoWordmark from './assets/logo-wordmark.svg';

export const USER = { name: 'hvh_god_2007', level: 7, elo: 1842, initials: 'HV' };

const NAV = [
  { id: 'profile',     label: 'PROFILE',      icon: 'home' },
  { id: 'play',        label: 'PLAY',          icon: 'play' },
  { id: 'tournaments', label: 'TOURNAMENTS',   icon: 'trophy' },
  { id: 'leaderboard', label: 'LEADERBOARD',   icon: 'users' },
];

export default function App() {
  const [loggedIn, setLoggedIn]   = useState(false);
  const [screen,  setScreen]      = useState('profile');
  const [notifOpen, setNotifOpen] = useState(false);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const screens = {
    profile:     <Profile onNavigate={setScreen} />,
    play:        <Play />,
    tournaments: <Tournaments />,
    leaderboard: <Leaderboard />,
    ban:         <Ban onNavigate={setScreen} />,
  };

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', paddingBottom: 80 }}>
      <TopBar
        user={USER}
        active={screen}
        onNav={setScreen}
        notifOpen={notifOpen}
        onNotif={() => setNotifOpen(v => !v)}
      />

      {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}

      {screens[screen] ?? screens.profile}

      {/* Bottom nav rail */}
      <nav style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(13,13,15,0.95)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '6px 8px',
        display: 'flex', gap: 4, zIndex: 100, boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setScreen(n.id)} style={{
            background: screen === n.id ? '#FF5500' : 'transparent',
            border: 0, color: screen === n.id ? '#fff' : '#8A8A92',
            padding: '8px 18px', borderRadius: 999, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', fontFamily: 'var(--font-body)',
            transition: 'all 180ms', display: 'flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { if (screen !== n.id) e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { if (screen !== n.id) e.currentTarget.style.color = '#8A8A92'; }}
          >
            <Icon name={n.icon} size={13}/>
            <span className="nav-label">{n.label}</span>
          </button>
        ))}
        <button onClick={() => setScreen('ban')} style={{
          background: screen === 'ban' ? '#FF453A' : 'transparent',
          border: 0, color: screen === 'ban' ? '#fff' : '#FF453A',
          padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', fontFamily: 'var(--font-body)',
          transition: 'all 180ms', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="skull" size={13}/>
          <span className="nav-label">BAN</span>
        </button>
        <button onClick={() => setLoggedIn(false)} style={{
          background: 'transparent', border: 0, color: '#5A5A62',
          padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
          fontSize: 11, fontFamily: 'var(--font-body)', transition: 'color 180ms',
        }}
          title="Sign out"
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#5A5A62'}
        >↻</button>
      </nav>
    </div>
  );
}

const NOTIFS = [
  { icon: 'trophy', color: '#FF5500', text: 'WEEKLY HVH CUP #142 starts in 2 hours', time: '2h' },
  { icon: 'users',  color: '#32D74B', text: 'no_recoil invited you to a lobby',       time: '5m' },
  { icon: 'fire',   color: '#FFD60A', text: 'You are on a 4-win streak. Keep going.',  time: '1h' },
  { icon: 'bell',   color: '#0A84FF', text: 'New season 4 rankings are live.',         time: '1d' },
];

function NotifPanel({ onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 150 }}/>
      <div style={{
        position: 'fixed', top: 64, right: 24, width: 320, zIndex: 200,
        background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, boxShadow: '0 12px 40px rgba(0,0,0,0.7)', overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, textTransform: 'uppercase' }}>Notifications</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 0, color: '#8A8A92', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>×</button>
        </div>
        {NOTIFS.map((n, i) => (
          <div key={i} style={{
            padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
            borderBottom: i < NOTIFS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            cursor: 'pointer', transition: 'background 150ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: 32, height: 32, borderRadius: 4, background: `${n.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={n.icon} size={15} color={n.color}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#C8C8CE', lineHeight: 1.4 }}>{n.text}</div>
              <div style={{ fontSize: 10, color: '#5A5A62', marginTop: 3 }}>{n.time} ago</div>
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', textAlign: 'center' }}>
          <button style={{ background: 'transparent', border: 0, color: '#FF5500', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}
