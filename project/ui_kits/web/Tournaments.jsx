// CHEATIT — Tournaments.

const Tournaments = () => {
  const featured = {
    title: 'CHEATIT MAJOR · СПРИНГ 2026',
    prize: '₽ 500 000',
    teams: '32 команды',
    starts: 'ЧЕРЕЗ 4 ДНЯ',
    status: 'РЕГИСТРАЦИЯ',
  };
  const list = [
    { title: 'WEEKLY HVH CUP #142', prize: '₽ 25 000', mode: '5v5', starts: '23:00 МСК', slots: '64 / 128', status: 'OPEN' },
    { title: 'NIGHTSHIFT WINGMAN',  prize: '₽ 10 000', mode: '2v2', starts: 'ЗАВТРА',  slots: '12 / 64',  status: 'OPEN' },
    { title: 'AIM ARENA DAILY',     prize: '₽ 5 000',  mode: '1v1', starts: 'СЕЙЧАС',  slots: '47 / 64',  status: 'LIVE' },
    { title: 'НОВИЧКОВЫЙ КУБОК',    prize: 'СКИНЫ',     mode: '5v5', starts: 'СБ 18:00', slots: '8 / 32',   status: 'OPEN' },
    { title: 'NEVERLOSE INVITE',    prize: '₽ 100 000', mode: '5v5', starts: '7 ДНЕЙ',   slots: 'ПО ИНВАЙТУ', status: 'INVITE' },
    { title: 'MIDNIGHT MAYHEM',     prize: '₽ 15 000',  mode: '5v5', starts: 'ВС 22:00', slots: '24 / 32',  status: 'OPEN' },
  ];
  const statusTone = { OPEN: 'success', LIVE: 'danger', INVITE: 'brand' };
  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <Eyebrow color="#FF5500">CS2 · ОФИЦИАЛЬНЫЕ + ПОЛЬЗОВАТЕЛЬСКИЕ</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, textTransform: 'uppercase', margin: '8px 0 24px', letterSpacing: '-0.01em' }}>Турниры</h1>

        {/* Featured hero */}
        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 32, background: 'linear-gradient(135deg, #1C1C1F 0%, #0D0D0F 100%)' }}>
          <div style={{ position: 'absolute', right: -100, top: -50, width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(255,85,0,0.25), transparent 65%)' }}/>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 40px, rgba(255,85,0,0.04) 40px 41px)' }}/>
          <div style={{ position: 'relative', padding: 40, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            <div>
              <Pill tone="brand">{featured.status}</Pill>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, textTransform: 'uppercase', margin: '12px 0', letterSpacing: '-0.01em', lineHeight: 1 }}>{featured.title}</div>
              <div style={{ display: 'flex', gap: 32, marginTop: 16, marginBottom: 24 }}>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#FF5500' }}>{featured.prize}</div><Eyebrow>Призовой фонд</Eyebrow></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff' }}>{featured.teams}</div><Eyebrow>Участники</Eyebrow></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff' }}>{featured.starts}</div><Eyebrow>Начало</Eyebrow></div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="primary" size="md" glow>Зарегистрироваться</Button>
                <Button variant="ghost" size="md">Сетка ›</Button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 200, color: 'rgba(255,85,0,0.15)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>04<br/><span style={{ fontSize: 80 }}>ДНЕЙ</span></div>
            </div>
          </div>
        </div>

        <SectionTitle action={<a style={{ color: '#FF5500', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Все турниры ›</a>}>Открытые турниры</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {list.map(t => (
            <Card key={t.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Pill tone={statusTone[t.status]}>{t.status}</Pill>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{t.mode}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 14 }}>{t.title}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FF5500' }}>{t.prize}</div><Eyebrow>Приз</Eyebrow></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff' }}>{t.starts}</div><Eyebrow>Старт</Eyebrow></div>
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#8A8A92', fontFamily: 'var(--font-mono)' }}>{t.slots}</span>
                <Button variant={t.status === 'INVITE' ? 'ghost' : 'secondary'} size="sm">{t.status === 'INVITE' ? 'Инвайт' : 'Войти'}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

window.Tournaments = Tournaments;
