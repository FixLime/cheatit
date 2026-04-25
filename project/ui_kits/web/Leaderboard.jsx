// CHEATIT — Leaderboard / Top players.

const Leaderboard = () => {
  const players = [
    { rank: 1, name: 'silent_aim_god', lvl: 10, elo: 3214, kd: 2.18, wr: 81, country: '🇷🇺', cheat: 'NEVERLOSE', delta: '+12' },
    { rank: 2, name: 'pasta_resolver', lvl: 10, elo: 3098, kd: 2.04, wr: 78, country: '🇺🇦', cheat: 'NIXWARE', delta: '+8' },
    { rank: 3, name: 'fake_duck', lvl: 10, elo: 3041, kd: 1.96, wr: 76, country: '🇰🇿', cheat: 'PRIMORDIAL', delta: '−4' },
    { rank: 4, name: 'desync_main', lvl: 10, elo: 2987, kd: 1.92, wr: 75, country: '🇧🇾', cheat: 'NEVERLOSE', delta: '+15' },
    { rank: 5, name: 'onetap_only', lvl: 10, elo: 2954, kd: 1.88, wr: 74, country: '🇷🇺', cheat: 'ONETAP', delta: '−2' },
    { rank: 6, name: 'no_spread_btw', lvl: 10, elo: 2901, kd: 1.85, wr: 73, country: '🇷🇺', cheat: 'FATALITY', delta: '+6' },
    { rank: 7, name: 'fdoc_master', lvl: 10, elo: 2876, kd: 1.81, wr: 72, country: '🇵🇱', cheat: 'NIXWARE', delta: '+3' },
    { rank: 8, name: 'antiaim_wizard', lvl: 10, elo: 2820, kd: 1.78, wr: 71, country: '🇷🇺', cheat: 'MEMESENSE', delta: '−7' },
    { rank: 9, name: 'lc_fake_lag', lvl: 9, elo: 2788, kd: 1.74, wr: 70, country: '🇩🇪', cheat: 'MIDNIGHT', delta: '+1' },
    { rank: 10, name: 'jitter_god', lvl: 9, elo: 2755, kd: 1.71, wr: 69, country: '🇷🇺', cheat: 'XONE', delta: '−3' },
  ];
  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
        <Eyebrow color="#FF5500">CS2 · ЕВРОПА · СЕЗОН 4</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, textTransform: 'uppercase', margin: '8px 0 24px', letterSpacing: '-0.01em' }}>Топ игроков</h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {['ВЕСЬ МИР', 'ЕВРОПА', 'СНГ', 'СЕВ. АМЕРИКА', 'АЗИЯ'].map((r, i) => (
            <button key={r} style={{
              background: i === 1 ? '#FF5500' : 'transparent',
              border: i === 1 ? '0' : '1px solid rgba(255,255,255,0.18)',
              color: i === 1 ? '#fff' : '#C8C8CE',
              padding: '8px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer'
            }}>{r}</button>
          ))}
        </div>

        <Card padding={0}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 32px 1fr 80px 100px 80px 80px 60px', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: '#8A8A92', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            <span>#</span><span></span><span>ИГРОК</span><span style={{ textAlign: 'right' }}>СОФТ</span><span style={{ textAlign: 'right' }}>ELO</span><span style={{ textAlign: 'right' }}>K/D</span><span style={{ textAlign: 'right' }}>WIN%</span><span style={{ textAlign: 'right' }}>Δ</span>
          </div>
          {players.map(p => (
            <div key={p.rank} style={{ display: 'grid', gridTemplateColumns: '60px 32px 1fr 80px 100px 80px 80px 60px', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center', fontSize: 13 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: p.rank <= 3 ? '#FF5500' : '#fff' }}>{p.rank}</span>
              <Level n={p.lvl} size="sm">{p.lvl}</Level>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar initials={p.name.slice(0,2).toUpperCase()} size={28}/>
                <span>{p.country}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{p.name}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8C8CE', textAlign: 'right' }}>{p.cheat}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF5500', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{p.elo}</span>
              <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{p.kd.toFixed(2)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{p.wr}%</span>
              <span style={{ fontFamily: 'var(--font-display)', textAlign: 'right', color: p.delta.startsWith('+') ? '#32D74B' : '#FF453A' }}>{p.delta}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

window.Leaderboard = Leaderboard;
