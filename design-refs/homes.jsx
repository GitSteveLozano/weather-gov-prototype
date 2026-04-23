// Four home-screen variations for Skybureau
// All live inside an iOS device frame (402x874).

const T = SB_TOKENS;
const F = SB_FAKE;

// ─────────────────────────────────────────────────────────────
// A. Civic Modern — typographic, editorial, big numbers
// ─────────────────────────────────────────────────────────────
function HomeCivic({ units = 'F', banner = null }) {
  const now = F.now;
  const temp = units === 'C' ? Math.round((now.temp - 32) * 5/9) : now.temp;
  const hi = units === 'C' ? Math.round((now.high - 32) * 5/9) : now.high;
  const lo = units === 'C' ? Math.round((now.low - 32) * 5/9) : now.low;

  return (
    <div className="sb sb-scroll" style={{
      width: '100%', height: '100%', overflowY: 'auto', background: T.paper,
      fontFamily: T.font, color: T.ink, paddingBottom: 40,
    }}>
      {/* status bar space */}
      <div style={{ height: 54 }} />

      {/* header — brand + location */}
      <div style={{ padding: '12px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SBWordmark size={12} />
        <div style={{ fontSize: 11, color: T.inkMute, fontFamily: T.mono, letterSpacing: 0.4 }}>
          WED · APR 23 · 1:04 PM
        </div>
      </div>

      {/* Location masthead */}
      <div style={{ padding: '18px 22px 6px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: T.inkMute, fontWeight: 600 }}>
          Forecast for
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, marginTop: 4, lineHeight: 1.05 }}>
          {F.location.name}, <span style={{ color: T.inkMute, fontWeight: 400 }}>{F.location.state}</span>
        </div>
      </div>

      {banner}

      {/* Big number + condition */}
      <div style={{ padding: '24px 22px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 132, fontWeight: 300, letterSpacing: -6, lineHeight: 0.85, fontFamily: T.font }}>
            {temp}<span style={{ fontSize: 48, fontWeight: 300, letterSpacing: -2, verticalAlign: 'top', marginTop: 10, display: 'inline-block' }}>°</span>
          </div>
          <div style={{ fontSize: 18, marginTop: 8, fontWeight: 500 }}>{now.condition}</div>
          <div style={{ fontSize: 13, color: T.inkMute, marginTop: 2, fontFamily: T.mono }}>
            H {hi}° &nbsp;·&nbsp; L {lo}° &nbsp;·&nbsp; Feels {units === 'C' ? Math.round((now.feels - 32) * 5/9) : now.feels}°
          </div>
        </div>
        <WxIcon kind={now.icon} size={56} color={T.ink} stroke={1.2} />
      </div>

      {/* Natural language summary */}
      <div style={{ padding: '0 22px 22px' }}>
        <div style={{
          fontSize: 15.5, lineHeight: 1.45, color: T.inkSoft,
          fontWeight: 400, textWrap: 'pretty', fontFamily: `"Inter Tight", serif`,
          paddingTop: 18, borderTop: `1px solid ${T.line}`,
        }}>
          {F.summary}
        </div>
      </div>

      {/* Depth invitation — "More detail ↓" */}
      <div style={{ padding: '0 22px 16px', display: 'flex', gap: 6, alignItems: 'center', color: T.inkMute, fontSize: 11, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
        <span>Next 12 hours</span>
        <div style={{ flex: 1, height: 1, background: T.line }} />
      </div>

      {/* Hourly strip */}
      <div className="sb-scroll" style={{ padding: '0 22px 24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 18, minWidth: 'max-content' }}>
          {F.hourly.map((h, i) => {
            const hTemp = units === 'C' ? Math.round((h[1] - 32) * 5/9) : h[1];
            return (
              <div key={i} style={{ textAlign: 'center', minWidth: 36 }}>
                <div style={{ fontSize: 11, color: T.inkMute, fontFamily: T.mono, marginBottom: 10 }}>{h[0]}</div>
                <WxIcon kind={h[2]} size={22} color={T.ink} stroke={1.4} />
                <div style={{ fontSize: 15, fontWeight: 500, marginTop: 10, fontFamily: T.mono }}>{hTemp}°</div>
                {h[3] > 0 && (
                  <div style={{ fontSize: 10, color: T.skyRain, fontFamily: T.mono, marginTop: 2 }}>{h[3]}%</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-day section header */}
      <div style={{ padding: '0 22px 10px', display: 'flex', gap: 6, alignItems: 'center', color: T.inkMute, fontSize: 11, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
        <span>7-day outlook</span>
        <div style={{ flex: 1, height: 1, background: T.line }} />
      </div>

      {/* 7-day list */}
      <div style={{ padding: '0 22px' }}>
        {F.daily.map((d, i) => {
          const dHi = units === 'C' ? Math.round((d[1] - 32) * 5/9) : d[1];
          const dLo = units === 'C' ? Math.round((d[2] - 32) * 5/9) : d[2];
          // temp range bar — map 45-80F to 0-100%
          const gLo = units === 'C' ? 7 : 45;
          const gHi = units === 'C' ? 27 : 80;
          const loPct = ((dLo - gLo) / (gHi - gLo)) * 100;
          const hiPct = ((dHi - gLo) / (gHi - gLo)) * 100;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderBottom: i < F.daily.length - 1 ? `1px solid ${T.line}` : 'none',
            }}>
              <div style={{ width: 44, fontSize: 14, fontWeight: 500 }}>{d[0]}</div>
              <WxIcon kind={d[3]} size={20} color={T.inkSoft} stroke={1.4} />
              <div style={{ fontSize: 11, color: T.skyRain, fontFamily: T.mono, width: 26 }}>
                {d[4] > 0 ? `${d[4]}%` : ''}
              </div>
              <div style={{ fontSize: 12, fontFamily: T.mono, color: T.inkMute, width: 22, textAlign: 'right' }}>{dLo}°</div>
              <div style={{ flex: 1, height: 4, background: T.line, borderRadius: 2, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: `${loPct}%`, width: `${hiPct - loPct}%`,
                  top: 0, bottom: 0, borderRadius: 2,
                  background: `linear-gradient(90deg, ${T.skyClear}, ${T.skySunny})`,
                }} />
              </div>
              <div style={{ fontSize: 12, fontFamily: T.mono, fontWeight: 600, width: 22 }}>{dHi}°</div>
            </div>
          );
        })}
      </div>

      {/* modular cards grid */}
      <div style={{ padding: '24px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniCard title="AIR QUALITY" value={F.now.airQuality} unit="AQI" note="Good" />
        <MiniCard title="UV INDEX" value={F.now.uv} unit="" note="Moderate" />
        <MiniCard title="WIND" value={F.now.wind} unit="mph" note={F.now.windDir} />
        <MiniCard title="HUMIDITY" value={F.now.humidity} unit="%" note={`Dew ${F.now.dewpoint}°`} />
        <MiniCard title="PRESSURE" value={F.now.pressure} unit="in" note={F.now.pressureTrend} />
        <MiniCard title="VISIBILITY" value={F.now.visibility} unit="mi" note="Clear" />
      </div>

      <div style={{ padding: '22px 22px 8px', fontSize: 10, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase', borderTop: `1px solid ${T.line}`, marginTop: 22, display: 'flex', justifyContent: 'space-between' }}>
        <span>Issued 12:47 PM</span>
        <span>Station KDCA</span>
      </div>
    </div>
  );
}

function MiniCard({ title, value, unit, note }) {
  return (
    <div style={{
      background: T.paperSoft, borderRadius: 8, padding: '10px 12px',
      border: `1px solid ${T.line}`,
    }}>
      <div style={{ fontSize: 9.5, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, marginTop: 2, fontFamily: T.font, letterSpacing: -0.5 }}>
        {value}
        {unit && <span style={{ fontSize: 12, color: T.inkMute, marginLeft: 3, fontFamily: T.mono }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 11, color: T.inkSoft, marginTop: 2 }}>{note}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// B. Atmospheric — sky gradient behind data
// ─────────────────────────────────────────────────────────────
function HomeAtmos({ units = 'F', condition = 'clear-day', banner = null }) {
  const now = F.now;
  const temp = units === 'C' ? Math.round((now.temp - 32) * 5/9) : now.temp;

  // Sky gradient per condition
  const skies = {
    'clear-day': ['#7bb3e0', '#e8d5b5', '#f6f2ea'],
    'partly-cloudy-day': ['#8aa8c0', '#c8cfd5', '#e8e5de'],
    'cloudy': ['#8690a0', '#a8adb5', '#c8c8c5'],
    'rain': ['#4a5a6b', '#6a7580', '#8a8d90'],
    'thunder': ['#3a3545', '#5a4e7a', '#7a6d95'],
    'clear-night': ['#0d1425', '#1a2540', '#3a4868'],
    'snow': ['#a8b4c0', '#d0d8e0', '#ecedef'],
  };
  const sky = skies[condition] || skies['clear-day'];
  const isDark = condition === 'clear-night' || condition === 'thunder' || condition === 'rain';
  const fg = isDark ? '#f2ede3' : T.ink;
  const fgMute = isDark ? 'rgba(242,237,227,0.7)' : T.inkMute;
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="sb sb-scroll" style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 55%, ${sky[2]} 100%)`,
      fontFamily: T.font, color: fg, paddingBottom: 40,
      position: 'relative',
    }}>
      {/* weather effects layer */}
      {condition === 'rain' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: -10, left: `${(i * 4.2) % 100}%`,
              width: 1, height: 14, background: 'rgba(255,255,255,0.35)',
              animation: `sb-rain ${0.8 + (i%5) * 0.1}s linear infinite`,
              animationDelay: `${(i * 0.07) % 1}s`,
            }} />
          ))}
        </div>
      )}
      {condition === 'clear-night' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${(i * 13.7) % 50}%`, left: `${(i * 23.3) % 100}%`,
              width: 1.5, height: 1.5, borderRadius: 2,
              background: '#fff',
              opacity: 0.3 + ((i * 7) % 7) / 10,
            }} />
          ))}
        </div>
      )}

      <div style={{ height: 54, position: 'relative' }} />

      <div style={{ padding: '12px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <SBWordmark size={12} color={fg} />
        <div style={{ fontSize: 11, color: fgMute, fontFamily: T.mono, letterSpacing: 0.4 }}>
          {F.location.name.toUpperCase()}
        </div>
      </div>

      {banner}

      {/* Huge hero */}
      <div style={{ padding: '56px 22px 40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: fgMute, fontWeight: 500, marginBottom: 8 }}>
          {now.condition}
        </div>
        <div style={{
          fontSize: 180, fontWeight: 200, letterSpacing: -10, lineHeight: 0.85,
          fontFeatureSettings: '"tnum" 1',
        }}>
          {temp}<span style={{ fontSize: 60, letterSpacing: -2, verticalAlign: 'top', marginTop: 18, display: 'inline-block', opacity: 0.6 }}>°</span>
        </div>
        <div style={{ fontSize: 14, color: fgMute, marginTop: 8, fontFamily: T.mono }}>
          H {units === 'C' ? Math.round((now.high - 32) * 5/9) : now.high}°  ·  L {units === 'C' ? Math.round((now.low - 32) * 5/9) : now.low}°
        </div>
      </div>

      {/* Poetic summary */}
      <div style={{ padding: '0 28px 32px', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 17, lineHeight: 1.4, fontWeight: 400, textWrap: 'balance' }}>
          {F.summary}
        </div>
      </div>

      {/* Glass hourly card */}
      <div style={{ padding: '0 16px 12px', position: 'relative' }}>
        <div style={{
          background: cardBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${cardBorder}`,
          borderRadius: 18, padding: '14px 14px 16px',
        }}>
          <div style={{ fontSize: 10.5, letterSpacing: 1.5, textTransform: 'uppercase', color: fgMute, fontWeight: 600, marginBottom: 12, fontFamily: T.mono }}>
            Hourly forecast
          </div>
          <div className="sb-scroll" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 20, minWidth: 'max-content', paddingBottom: 4 }}>
              {F.hourly.map((h, i) => {
                const hTemp = units === 'C' ? Math.round((h[1] - 32) * 5/9) : h[1];
                return (
                  <div key={i} style={{ textAlign: 'center', minWidth: 32 }}>
                    <div style={{ fontSize: 11, color: fgMute, fontWeight: 500, marginBottom: 8 }}>{h[0]}</div>
                    <WxIcon kind={h[2]} size={22} color={fg} stroke={1.4} />
                    <div style={{ fontSize: 15, fontWeight: 500, marginTop: 8, fontFamily: T.mono }}>{hTemp}°</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Glass 7-day card */}
      <div style={{ padding: '0 16px 12px', position: 'relative' }}>
        <div style={{
          background: cardBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${cardBorder}`,
          borderRadius: 18, padding: '14px 16px',
        }}>
          <div style={{ fontSize: 10.5, letterSpacing: 1.5, textTransform: 'uppercase', color: fgMute, fontWeight: 600, marginBottom: 10, fontFamily: T.mono }}>
            7-day
          </div>
          {F.daily.map((d, i) => {
            const dHi = units === 'C' ? Math.round((d[1] - 32) * 5/9) : d[1];
            const dLo = units === 'C' ? Math.round((d[2] - 32) * 5/9) : d[2];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: i < F.daily.length - 1 ? `1px solid ${cardBorder}` : 'none',
                fontSize: 14,
              }}>
                <div style={{ width: 40, fontWeight: 500 }}>{d[0]}</div>
                <WxIcon kind={d[3]} size={18} color={fg} stroke={1.4} />
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 12, color: fgMute, fontFamily: T.mono }}>{dLo}°</div>
                <div style={{ width: 50, height: 3, background: cardBorder, borderRadius: 2, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '10%', right: '15%',
                    top: 0, bottom: 0, borderRadius: 2,
                    background: `linear-gradient(90deg, ${T.skyClear}, ${T.skySunny})`,
                  }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.mono, width: 22, textAlign: 'right' }}>{dHi}°</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sunrise / Sunset strip */}
      <div style={{ padding: '0 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, position: 'relative' }}>
        <GlassStat label="Sunrise" value={F.now.sunrise + ' AM'} bg={cardBg} border={cardBorder} fg={fg} mute={fgMute} />
        <GlassStat label="Sunset" value={F.now.sunset + ' PM'} bg={cardBg} border={cardBorder} fg={fg} mute={fgMute} />
      </div>
    </div>
  );
}

function GlassStat({ label, value, bg, border, fg, mute }) {
  return (
    <div style={{
      background: bg, backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${border}`, borderRadius: 18, padding: 12,
    }}>
      <div style={{ fontSize: 10.5, letterSpacing: 1.5, textTransform: 'uppercase', color: mute, fontWeight: 600, fontFamily: T.mono }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, color: fg, fontFamily: T.font, letterSpacing: -0.5 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// C. Cartographic — radar map is the hero
// ─────────────────────────────────────────────────────────────
function HomeCarto({ units = 'F', banner = null }) {
  const now = F.now;
  const temp = units === 'C' ? Math.round((now.temp - 32) * 5/9) : now.temp;

  return (
    <div className="sb sb-scroll" style={{
      width: '100%', height: '100%', overflowY: 'auto', background: T.paper,
      fontFamily: T.font, color: T.ink,
    }}>
      <div style={{ height: 54 }} />

      {/* Map hero — full bleed */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', background: '#d8dcd4' }}>
        <FakeMap />

        {/* top controls */}
        <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <SBWordmark size={11} color={T.ink} />
          <div style={{ display: 'flex', gap: 6 }}>
            <MapChip>Radar</MapChip>
            <MapChip muted>Temp</MapChip>
            <MapChip muted>Alerts</MapChip>
          </div>
        </div>

        {banner}

        {/* timeline scrubber */}
        <div style={{ position: 'absolute', bottom: 120, left: 12, right: 12, zIndex: 2 }}>
          <div style={{
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 10, padding: '10px 12px',
            border: `1px solid ${T.line}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.inkMute, fontFamily: T.mono, letterSpacing: 0.5, marginBottom: 6 }}>
              <span>-1h</span><span>NOW</span><span>+1h</span><span>+2h</span>
            </div>
            <div style={{ height: 4, background: T.line, borderRadius: 2, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '30%', top: -3, width: 10, height: 10, borderRadius: 10, background: T.ink, border: '2px solid #fff', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
              <div style={{ position: 'absolute', left: '45%', right: '15%', top: 0, height: 4, background: T.skyRain, borderRadius: 2, opacity: 0.6 }} />
            </div>
            <div style={{ fontSize: 11, color: T.inkSoft, marginTop: 6, fontFamily: T.mono, letterSpacing: 0.3 }}>
              Rain arriving <span style={{ color: T.ink, fontWeight: 600 }}>~8:20 PM</span>
            </div>
          </div>
        </div>

        {/* temp pill over map */}
        <div style={{ position: 'absolute', bottom: 18, left: 16, zIndex: 2 }}>
          <div style={{
            background: '#fff', borderRadius: 14, padding: '10px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <WxIcon kind={now.icon} size={30} color={T.ink} stroke={1.4} />
            <div>
              <div style={{ fontSize: 11, color: T.inkMute, fontFamily: T.mono, letterSpacing: 0.4, textTransform: 'uppercase' }}>You</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5 }}>
                {temp}° <span style={{ fontSize: 12, fontWeight: 400, color: T.inkMute, marginLeft: 2 }}>{now.condition}</span>
              </div>
            </div>
          </div>
        </div>

        {/* zoom controls */}
        <div style={{ position: 'absolute', right: 12, bottom: 26, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#fff', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 300, borderBottom: `1px solid ${T.line}` }}>+</div>
          <div style={{ background: '#fff', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 300 }}>−</div>
        </div>
      </div>

      {/* summary card that peeks up over map */}
      <div style={{ padding: '14px 18px 0', background: T.paper }}>
        <div style={{ fontSize: 15, lineHeight: 1.4, color: T.inkSoft, fontWeight: 400, textWrap: 'pretty' }}>
          {F.summary}
        </div>
      </div>

      {/* Hourly compressed row */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: T.inkMute, fontWeight: 600, fontFamily: T.mono }}>Next 12 hours</div>
          <div style={{ fontSize: 11, color: T.blue, fontWeight: 500 }}>Expand →</div>
        </div>
        <div className="sb-scroll" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 16, minWidth: 'max-content', paddingBottom: 6 }}>
            {F.hourly.slice(0, 10).map((h, i) => {
              const hTemp = units === 'C' ? Math.round((h[1] - 32) * 5/9) : h[1];
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: T.inkMute, fontFamily: T.mono, marginBottom: 6 }}>{h[0]}</div>
                  <WxIcon kind={h[2]} size={20} color={T.ink} stroke={1.4} />
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 6, fontFamily: T.mono }}>{hTemp}°</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* layer chips as depth drivers */}
      <div style={{ padding: '18px 18px 24px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: T.inkMute, fontWeight: 600, fontFamily: T.mono, marginBottom: 10 }}>
          More layers
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <LayerChip icon="wind" label="Wind" detail="8 mph WSW" />
          <LayerChip icon="cloudy" label="Cloud cover" detail="42%" />
          <LayerChip icon="thunder" label="Lightning" detail="None near" />
          <LayerChip icon="snow" label="Snow depth" detail="N/A" />
        </div>
      </div>
    </div>
  );
}

function MapChip({ children, muted }) {
  return (
    <div style={{
      background: muted ? 'rgba(255,255,255,0.6)' : '#fff',
      color: muted ? T.inkSoft : T.ink,
      fontSize: 11, fontWeight: 600, fontFamily: T.mono,
      padding: '6px 10px', borderRadius: 20,
      letterSpacing: 0.3, textTransform: 'uppercase',
      border: `1px solid ${T.line}`,
      boxShadow: muted ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
    }}>{children}</div>
  );
}

function LayerChip({ icon, label, detail }) {
  return (
    <div style={{
      background: T.paperSoft, border: `1px solid ${T.line}`,
      borderRadius: 8, padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <WxIcon kind={icon} size={20} color={T.inkSoft} stroke={1.4} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: T.inkMute, fontFamily: T.mono }}>{detail}</div>
      </div>
    </div>
  );
}

// Fake radar map — generative SVG, no external deps
function FakeMap() {
  // Drawn topographic-ish: roads + coast + radar blobs
  const roads = [
    'M0 80 Q80 70 180 90 T400 70',
    'M0 180 Q120 200 240 180 T400 220',
    'M0 300 Q100 280 200 310 T400 290',
    'M80 0 Q100 100 70 220 T120 420',
    'M220 0 Q200 120 240 260 T200 420',
    'M320 0 Q340 140 310 280 T350 420',
  ];
  const minor = [
    'M0 40 L400 60', 'M0 140 L400 150', 'M0 240 L400 250', 'M0 340 L400 360',
    'M40 0 L50 420', 'M150 0 L170 420', 'M270 0 L280 420',
  ];
  return (
    <svg width="100%" height="420" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="sbRadar1" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#d63a2f" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#e8701e" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#d4a017" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4a6b8a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sbRadar2" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#4a6b8a" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#7ba2c0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7ba2c0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* base */}
      <rect width="400" height="420" fill="#e8ebe5" />
      {/* water */}
      <path d="M0 330 Q100 320 180 340 T400 340 L400 420 L0 420 Z" fill="#c8d5dd" />
      {/* parks */}
      <path d="M200 100 Q250 90 290 130 Q300 170 260 190 Q220 200 195 160 Z" fill="#d5dcc8" opacity="0.7" />
      <path d="M50 240 Q90 230 130 260 Q140 290 100 300 Q65 295 45 270 Z" fill="#d5dcc8" opacity="0.7" />
      {/* minor roads */}
      {minor.map((d, i) => <path key={i} d={d} stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.5" />)}
      {/* major roads */}
      {roads.map((d, i) => <path key={i} d={d} stroke="#fff" strokeWidth="2.2" fill="none" />)}
      {roads.map((d, i) => <path key={i} d={d} stroke="#c4a878" strokeWidth="1" fill="none" />)}

      {/* radar precipitation blobs */}
      <g opacity="0.85">
        <ellipse cx="280" cy="160" rx="80" ry="60" fill="url(#sbRadar2)" />
        <ellipse cx="320" cy="200" rx="40" ry="35" fill="url(#sbRadar1)" />
        <ellipse cx="120" cy="60" rx="50" ry="35" fill="url(#sbRadar2)" />
      </g>

      {/* your location marker */}
      <g>
        <circle cx="180" cy="210" r="32" fill={T.ink} opacity="0.08">
          <animate attributeName="r" values="32;44;32" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.08;0;0.08" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="210" r="7" fill="#fff" />
        <circle cx="180" cy="210" r="5" fill={T.blue} />
      </g>

      {/* radar sweep */}
      <g style={{ transformOrigin: '180px 210px', animation: 'sb-sweep 6s linear infinite' }}>
        <path d="M180 210 L180 80 A130 130 0 0 1 295 160 Z" fill={T.blue} opacity="0.05" />
      </g>

      {/* labels */}
      <text x="190" y="226" fontFamily={T.mono} fontSize="10" fill={T.ink} fontWeight="600">Silver Spring</text>
      <text x="300" y="350" fontFamily={T.mono} fontSize="9" fill={T.inkMute} fontWeight="500">Chesapeake</text>
      <text x="70" y="60" fontFamily={T.mono} fontSize="9" fill={T.inkMute} fontWeight="500">Frederick</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// D. Data-forward — dense dashboard for nerds
// ─────────────────────────────────────────────────────────────
function HomeData({ units = 'F', banner = null }) {
  const now = F.now;
  const temp = units === 'C' ? Math.round((now.temp - 32) * 5/9) : now.temp;
  const tempSeries = F.hourly.map(h => units === 'C' ? (h[1]-32)*5/9 : h[1]);
  const popSeries = F.hourly.map(h => h[3]);

  return (
    <div className="sb sb-scroll" style={{
      width: '100%', height: '100%', overflowY: 'auto', background: T.paper,
      fontFamily: T.font, color: T.ink, paddingBottom: 40,
    }}>
      <div style={{ height: 54 }} />

      {/* Dense header */}
      <div style={{ padding: '10px 14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.line}` }}>
        <SBWordmark size={11} />
        <div style={{ display: 'flex', gap: 14, fontFamily: T.mono, fontSize: 10, letterSpacing: 0.5, color: T.inkMute }}>
          <span>ZULU 17:04</span>
          <span>KDCA</span>
          <span style={{ color: T.blue }}>● LIVE</span>
        </div>
      </div>

      {/* Station line */}
      <div style={{ padding: '10px 14px', fontFamily: T.mono, fontSize: 11, color: T.inkSoft, letterSpacing: 0.3, background: T.paperSoft, borderBottom: `1px solid ${T.line}` }}>
        SILVER SPRING, MD · 38.9907°N 77.0261°W · ELEV 271FT · OBS 12:47 EDT
      </div>

      {banner}

      {/* Top row: big temp + 4 key stats */}
      <div style={{ padding: '14px 14px 8px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 10 }}>
        <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 4, padding: '10px 12px' }}>
          <div style={{ fontSize: 9.5, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase' }}>Temperature</div>
          <div style={{ fontSize: 52, fontWeight: 300, letterSpacing: -2, lineHeight: 1, fontFamily: T.font, marginTop: 2 }}>
            {temp}<span style={{ fontSize: 22, fontWeight: 300, verticalAlign: 'top', marginTop: 4, display: 'inline-block' }}>°{units}</span>
          </div>
          <div style={{ fontSize: 11, color: T.inkMute, marginTop: 4, fontFamily: T.mono }}>
            Feels {units === 'C' ? Math.round((now.feels - 32) * 5/9) : now.feels}° · Δ -2° / hr
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 6 }}>
          <TightStat label="DEW" val={`${now.dewpoint}°`} />
          <TightStat label="RH" val={`${now.humidity}%`} />
          <TightStat label="WIND" val={`${now.wind}`} sub={now.windDir} />
          <TightStat label="PRES" val={now.pressure} sub="▲" />
        </div>
      </div>

      {/* Condition + asos line */}
      <div style={{ padding: '8px 14px', fontFamily: T.mono, fontSize: 10.5, color: T.inkSoft, letterSpacing: 0.5, background: '#fff', borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        METAR KDCA 231747Z 24008KT 10SM FEW045 SCT250 19/09 A3012 RMK AO2 SLP200
      </div>

      {/* Hourly chart */}
      <div style={{ padding: '14px 14px 10px', background: '#fff', margin: '10px 14px', border: `1px solid ${T.line}`, borderRadius: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Hourly · Temp + POP</div>
          <div style={{ fontSize: 10, color: T.inkMute, fontFamily: T.mono }}>12h</div>
        </div>
        <div style={{ position: 'relative', height: 80 }}>
          <SBLineChart data={tempSeries} width={348} height={80} color={T.ink} fill="rgba(26,22,19,0.04)" yRange={[Math.min(...tempSeries) - 2, Math.max(...tempSeries) + 2]} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            {popSeries.map((p, i) => (
              <div key={i} style={{ flex: 1, height: `${p}%`, background: T.skyRain, opacity: 0.6, minHeight: 1 }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: T.mono, fontSize: 9, color: T.inkMute }}>
          {F.hourly.map((h, i) => <span key={i}>{h[0]}</span>)}
        </div>
      </div>

      {/* Model consensus row */}
      <div style={{ padding: '0 14px 10px' }}>
        <div style={{ fontSize: 10, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Model consensus · 24h precip (in)</div>
        <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 4 }}>
          {[
            ['GFS', 0.42, 85],
            ['NAM', 0.38, 78],
            ['HRRR', 0.51, 90],
            ['ECMWF', 0.35, 72],
            ['NBM ensemble', 0.41, 82],
          ].map(([m, v, conf], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '7px 10px', gap: 10, borderTop: i ? `1px solid ${T.line}` : 'none', fontFamily: T.mono, fontSize: 11 }}>
              <div style={{ width: 96, fontWeight: 600 }}>{m}</div>
              <div style={{ width: 40, color: T.skyRain, fontWeight: 600 }}>{v.toFixed(2)}"</div>
              <div style={{ flex: 1, height: 4, background: T.line, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${conf}%`, background: T.ink, borderRadius: 2 }} />
              </div>
              <div style={{ width: 30, color: T.inkMute, textAlign: 'right', fontSize: 10 }}>{conf}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day condensed table */}
      <div style={{ padding: '10px 14px 16px' }}>
        <div style={{ fontSize: 10, color: T.inkMute, fontFamily: T.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>7-day</div>
        <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '44px 24px 1fr 1fr 1fr', gap: 8, padding: '6px 10px', fontFamily: T.mono, fontSize: 9, color: T.inkMute, letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}` }}>
            <span>DAY</span><span></span><span>HI/LO</span><span>POP</span><span>WIND</span>
          </div>
          {F.daily.map((d, i) => {
            const dHi = units === 'C' ? Math.round((d[1] - 32) * 5/9) : d[1];
            const dLo = units === 'C' ? Math.round((d[2] - 32) * 5/9) : d[2];
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 24px 1fr 1fr 1fr', gap: 8, padding: '8px 10px', fontFamily: T.mono, fontSize: 11.5, alignItems: 'center', borderTop: i ? `1px solid ${T.line}` : 'none' }}>
                <span style={{ fontWeight: 600 }}>{d[0]}</span>
                <WxIcon kind={d[3]} size={16} color={T.ink} stroke={1.4} />
                <span><b>{dHi}</b>/<span style={{ color: T.inkMute }}>{dLo}</span></span>
                <span style={{ color: d[4] > 50 ? T.skyRain : T.inkMute }}>{d[4]}%</span>
                <span style={{ color: T.inkMute }}>{8 + i}mph SW</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TightStat({ label, val, sub }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 4, padding: '6px 8px' }}>
      <div style={{ fontSize: 9, color: T.inkMute, fontFamily: T.mono, letterSpacing: 0.8, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: T.mono, marginTop: 2 }}>
        {val} {sub && <span style={{ fontSize: 10, color: T.inkMute, fontWeight: 400 }}>{sub}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { HomeCivic, HomeAtmos, HomeCarto, HomeData, FakeMap });
