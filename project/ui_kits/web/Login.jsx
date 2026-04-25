// CHEATIT — Login screen with Steam OAuth.

const Login = () => {
  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(255,85,0,0.18), transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 60px, rgba(255,255,255,0.015) 60px 61px)' }}/>
      <div style={{ position: 'relative', width: 420, padding: 40, background: '#1C1C1F', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
        <img src="../../assets/logo-wordmark.svg" style={{ height: 40, marginBottom: 32 }}/>
        <Eyebrow color="#FF5500">ВХОД В CHEATIT</Eyebrow>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '8px 0 24px', lineHeight: 1.05 }}>Войди<br/>через Steam</div>
        <p style={{ color: '#C8C8CE', fontSize: 13, lineHeight: 1.5, marginBottom: 24 }}>
          Подтверди свой аккаунт CS2. Мы проверим часы в игре, ранг и историю VAC. Аккаунты младше 30 дней не принимаются.
        </p>
        <button style={{
          width: '100%', background: '#1B2838', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
          padding: '14px 16px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          cursor: 'pointer'
        }}>
          <Icon name="steam" size={20} color="#66c0f4"/> Войти через Steam
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: '#5A5A62', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}/>
          <span>или</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}/>
        </div>
        <button style={{ width: '100%', background: 'transparent', color: '#C8C8CE', border: '1px solid rgba(255,255,255,0.18)', padding: '12px 16px', borderRadius: 4, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
          У меня уже есть инвайт-код
        </button>
        <div style={{ marginTop: 24, fontSize: 11, color: '#5A5A62', lineHeight: 1.5, textAlign: 'center' }}>
          Регистрируясь, ты соглашаешься с <span style={{ color: '#C8C8CE', textDecoration: 'underline' }}>правилами</span> и <span style={{ color: '#C8C8CE', textDecoration: 'underline' }}>политикой анти-чит мониторинга</span>.
        </div>
      </div>
    </div>
  );
};

window.Login = Login;
