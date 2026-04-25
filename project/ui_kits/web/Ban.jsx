// CHEATIT — Ban screen. FACEIT-style "you are banned" notification page.

const Ban = () => {
  const ban = {
    id: 'BAN-7F3A91',
    reason: 'Использование незаявленного софта',
    detected: 'AIMWARE (запущен)  ≠  NIXWARE (заявлен)',
    issued: '24 апр 2026, 22:47 МСК',
    expires: 'НАВСЕГДА',
    matchId: 'm_a93f1c',
    map: 'de_mirage',
    elo: -1842,
  };

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Red wash from top */}
      <div style={{ position: 'absolute', top: -150, left: '50%', transform: 'translateX(-50%)', width: 1200, height: 600, background: 'radial-gradient(ellipse, rgba(255,69,58,0.18), transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 80px, rgba(255,69,58,0.025) 80px 81px)', pointerEvents: 'none' }}/>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px', position: 'relative' }}>
        {/* Hero card */}
        <div style={{ background: '#1C1C1F', border: '1px solid rgba(255,69,58,0.4)', borderTop: '4px solid #FF453A', borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,69,58,0.15)' }}>

          {/* Header strip */}
          <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 4, background: 'rgba(255,69,58,0.12)', border: '1px solid #FF453A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="skull" size={36} color="#FF453A"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Pill tone="danger">ПЕРМАНЕНТНЫЙ БАН</Pill>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5A5A62' }}>#{ban.id}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.01em', color: '#fff' }}>Аккаунт<br/>заблокирован</div>
                <div style={{ marginTop: 10, color: '#C8C8CE', fontSize: 14, lineHeight: 1.5 }}>Анти-чит мониторинг зафиксировал расхождение между заявленным и фактически запущенным софтом.</div>
              </div>
            </div>
          </div>

          {/* Detection block — code-style */}
          <div style={{ padding: '20px 40px', background: '#141416', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Eyebrow color="#8A8A92">ОБНАРУЖЕНО</Eyebrow>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.7 }}>
              <div style={{ color: '#FF453A' }}>✗ запущен:    AIMWARE</div>
              <div style={{ color: '#C8C8CE' }}>  заявлен:    NIXWARE</div>
              <div style={{ color: '#5A5A62', marginTop: 4 }}>  match_id:   {ban.matchId}</div>
              <div style={{ color: '#5A5A62' }}>  map:        {ban.map}</div>
            </div>
          </div>

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <Eyebrow>ВЫДАН</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#fff', marginTop: 6, textTransform: 'uppercase' }}>24 АПР 2026</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2, fontFamily: 'var(--font-mono)' }}>22:47 МСК</div>
            </div>
            <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <Eyebrow>СРОК</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#FF453A', marginTop: 6, textTransform: 'uppercase' }}>НАВСЕГДА</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2 }}>Без права восстановления</div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <Eyebrow>ПОТЕРЯНО ELO</Eyebrow>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#FF453A', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{ban.elo}</div>
              <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 2 }}>Аккаунт обнулён</div>
            </div>
          </div>

          {/* What's affected */}
          <div style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Eyebrow>ЧТО ЗАБЛОКИРОВАНО</Eyebrow>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                'Поиск матчей',
                'Турниры и кубки',
                'Команды и лобби',
                'Чат и сообщения',
                'Steam-аккаунт привязан к бану',
                'IP / HWID в чёрном списке',
              ].map(x => (
                <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#C8C8CE' }}>
                  <Icon name="x" size={14} color="#FF453A"/><span>{x}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '24px 40px', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11, color: '#8A8A92', fontFamily: 'var(--font-mono)' }}>Если ты считаешь, что бан выдан ошибочно — подай апелляцию в течение 14 дней.</div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Button variant="ghost" size="md">Правила</Button>
              <Button variant="primary" size="md">Подать апелляцию</Button>
            </div>
          </div>
        </div>

        {/* Disclaimer footer */}
        <div style={{ marginTop: 20, fontSize: 11, color: '#5A5A62', textAlign: 'center', lineHeight: 1.6 }}>
          Запуск незаявленного софта — мгновенный перманентный бан без возврата средств.<br/>
          Это решение анти-чит мониторинга и не подлежит обсуждению, кроме как через форму апелляции.
        </div>
      </div>
    </div>
  );
};

window.Ban = Ban;
