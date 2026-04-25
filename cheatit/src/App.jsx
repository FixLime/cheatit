import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TopBar } from './components/Common';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Play from './screens/Play';
import Leaderboard from './screens/Leaderboard';
import Tournaments from './screens/Tournaments';
import Ban from './screens/Ban';

const user = { name: 'hvh_god_2007', level: 7, elo: 1842, initials: 'HV' };

function AppRoutes() {
  const location = useLocation();
  const isLogin = location.pathname === '/';
  if (isLogin) return <Login />;
  return (
    <>
      <TopBar user={user} />
      <Routes>
        <Route path="/profile"     element={<Profile />} />
        <Route path="/play"        element={<Play />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/ban"         element={<Ban />} />
        <Route path="*"            element={<Navigate to="/profile" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
