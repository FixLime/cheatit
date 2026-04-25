// CHEATIT — Match queue / lobby screen.
// Big PLAY button, queue state, cheat selection, ready up.

const Play = () => {
  const [queueing, setQueueing] = React.useState(false);
  const [cheat, setCheat] = React.useState('NIXWARE');
  const [region, setRegion] = React.useState('EU');

  const cheats = ['NIXWARE', 'FATALITY', 'XONE', 'NEVERLOSE', 'MIDNIGHT', 'MEMESENSE', 'PRIMORDIAL', 'ONETAP'];
  const modes = [
    { id: '5v5', label: '5 НА 5', sub: 'Соревновательный', active: true },
    { id: '2v2', label: '2 НА 2', sub: 'Wingman', active: false },
    { id: '1v1', label: '1 НА 1', sub: 'AIM', active: false },
    { id: 'hub', label: 'ХАБ', sub: 'Кастомные правила', active: false },
  ];

  return (
    <div style={{ background: '#0D0D0F', minHeight: '100vh', color: '#fff' }}>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '48px 24px 32px' }}>
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 1000, height: 600, background: 'radial-gradient(ellipse, rgba(255,85,0,0.12), transparent 60%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
          <Eyebrow color="#FF5500">CS2 · СОРЕВНОВАТЕЛЬНЫЙ</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '8px 0 32px' }}>Поиск матча</h1>

          {/* Mode tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {modes.map(m => (
              <div key={m.id} style={{ background: m.active ? '#1C1C1F' : '#141416', border: m.active ? '1px solid #FF5500' : '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 18, cursor: 'pointer', position: 'relative' }}>
                {m.active && <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: 999, background: '#FF5500', boxShadow: '0 0 8px #FF5500' }}/>}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: m.active ? '#fff' : '#8A8A92', textTransform: 'uppercase' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: '#8A8A92', marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Queue state */}
          <Card padding={32} style={{ textAlign: 'center', position: 'relative' }}>
            {queueing ? (
              <>
                <Eyebrow color="#FFD60A">В ОЧЕРЕДИ · 00:23</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, textTransform: 'uppercase', margin: '12px 0', letterSpacing: '-0.01em' }}>Поиск противников</div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 24 }}>Ищем 9 игроков уровня 6–8 в регионе {region} · Средний пинг 38ms</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
                  {[...Array(10)].map((_, i) => <div key={i} style={{ width: 36, height: 36, borderRadius: 4, background: i === 0 ? '#FF5500' : '#26262A', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#fff' : '#5A5A62', fontFamily: 'var(--font-display)', fontSize: 14 }}>{i === 0 ? 'HV' : ''}</div>)}
                </div>
                <Button variant="ghost" size="md" onClick={() => setQueueing(false)}>Отмена · ESC</Button>
              </>
            ) : (
              <>
                <Eyebrow>ГОТОВ К МАТЧУ</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, textTransform: 'uppercase', margin: '8px 0 16px', lineHeight: 1, letterSpacing: '-0.02em' }}>Играть</div>
                <div style={{ color: '#C8C8CE', fontSize: 13, marginBottom: 24 }}>Уровень 7 · ELO 1842 · Регион {region}</div>
                <button onClick={() => setQueueing(true)} style={{
                  background: '#FF5500', color: '#fff', border: 0, padding: '20px 80px', borderRadius: 4,
                  fontFamily: 'var(--font-display)', fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.04em',
                  boxShadow: '0 0 40px rgba(255,85,0,0.55)', cursor: 'pointer',
                }}>НАЧАТЬ ПОИСК</button>
              </>
            )}
          </Card>

          {/* Settings row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 24 }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Eyebrow>ЗАЯВЛЕННЫЙ СОФТ</Eyebrow>
                <span style={{ fontSize: 10, color: '#FF453A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>* Обязательно</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {cheats.map(c => (
                  <button key={c} onClick={() => setCheat(c)} style={{
                    background: cheat === c ? 'rgba(255,85,0,0.12)' : 'transparent',
                    border: cheat === c ? '1px solid #FF5500' : '1px solid rgba(255,255,255,0.18)',
                    color: cheat === c ? '#FF5500' : '#C8C8CE',
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                    padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
                  }}>{c}{cheat === c && ' ✓'}</button>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: '#8A8A92', lineHeight: 1.5, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                Запуск незаявленного чита фиксируется анти-чит мониторингом и ведёт к мгновенному бану без возврата средств. Заяви то, что фактически запущено.
              </div>
            </Card>

            <Card>
              <Eyebrow>РЕГИОН</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                {[{ id: 'EU', label: 'Европа', ping: '38ms' }, { id: 'CIS', label: 'СНГ', ping: '12ms' }, { id: 'NA', label: 'Сев. Америка', ping: '120ms' }].map(r => (
                  <button key={r.id} onClick={() => setRegion(r.id)} style={{
                    background: region === r.id ? '#26262A' : 'transparent',
                    border: region === r.id ? '1px solid rgba(255,255,255,0.18)' : '1px solid transparent',
                    padding: '8px 12px', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#fff', fontSize: 13,
                  }}>
                    <span>{r.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A8A92' }}>{r.ping}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Play = Play;
