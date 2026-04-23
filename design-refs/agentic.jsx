// AI / agentic screens + Tier gap-fill screens

const AI = SB_TOKENS;

// ─────────────────────────────────────────────────────────────
// 1. Skybureau Brief — AI morning digest as home hero
// ─────────────────────────────────────────────────────────────
function BriefHome() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '12px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SBWordmark size={12} />
        <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase' }}>Wed · 6:45 AM</div>
      </div>

      <div style={{ padding: '20px 22px 8px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, color: AI.blue, fontFamily: AI.mono, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', background: AI.blueSoft, borderRadius: 3 }}>
          <span style={{ width: 5, height: 5, borderRadius: 5, background: AI.blue }} />
          Your morning brief
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.25, marginTop: 14, textWrap: 'balance' }}>
          Good morning, Alex. <span style={{ color: AI.inkMute, fontWeight: 400 }}>Here's what matters today.</span>
        </div>
      </div>

      {/* Hero AI summary */}
      <div style={{ padding: '8px 22px 18px' }}>
        <div style={{ fontSize: 18, lineHeight: 1.45, fontWeight: 400, color: AI.ink, textWrap: 'pretty' }}>
          Cool start at <b>52°</b> — you'll want a light jacket for the <b>8 AM bike commute</b>. Tailwind 8mph SW. Skies cloud up by lunch, and rain arrives around <b>4:30 PM</b>, right as you'd head home. Bring a shell.
        </div>
      </div>

      {/* Why (sources) */}
      <div style={{ padding: '0 22px 14px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['🚲 Bike commute', '📍 Home → work', '🌧 Rain sensitive', '👕 Layer prefs'].map((t, i) => (
            <div key={i} style={{ fontSize: 11, fontFamily: AI.mono, color: AI.inkSoft, background: AI.paperSoft, border: `1px solid ${AI.line}`, padding: '3px 8px', borderRadius: 12, letterSpacing: 0.2 }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 22px 16px', borderTop: `1px solid ${AI.line}` }} />

      {/* three agentic at-a-glance cards */}
      <div style={{ padding: '0 22px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <BriefCard time="8:00 AM" title="Bike to work" detail="52° · 8mph tailwind · dry" status="good" />
        <BriefCard time="12:45 PM" title="Lunch walk" detail="66° · clouding up · 10% pop" status="ok" />
        <BriefCard time="4:30 PM" title="Commute home" detail="Rain starts · bring shell" status="warn" />
        <BriefCard time="7:30 PM" title="Trash night" detail="Heavy rain — put out now?" status="warn" />
      </div>

      {/* Ask bar */}
      <div style={{ padding: '4px 16px 14px' }}>
        <div style={{ background: AI.ink, color: AI.paper, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke={AI.paper} strokeWidth="1.3"/><path d="M8 5v3.5l2 1" stroke={AI.paper} strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>
          <div style={{ flex: 1, fontSize: 14, opacity: 0.7 }}>Ask about today's weather…</div>
          <div style={{ fontSize: 10, fontFamily: AI.mono, opacity: 0.5, padding: '2px 6px', border: `1px solid rgba(246,242,234,0.2)`, borderRadius: 3, letterSpacing: 0.5 }}>AI</div>
        </div>
      </div>
    </div>
  );
}

function BriefCard({ time, title, detail, status }) {
  const c = { good: '#2b8a3e', ok: AI.inkMute, warn: AI.watch }[status];
  const dot = { good: '●', ok: '●', warn: '●' }[status];
  return (
    <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 70, fontSize: 11, fontFamily: AI.mono, color: AI.inkMute, letterSpacing: 0.3 }}>{time}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: AI.inkMute, marginTop: 2 }}>{detail}</div>
      </div>
      <div style={{ color: c, fontSize: 10 }}>{dot}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Ask — conversational screen
// ─────────────────────────────────────────────────────────────
function AskScreen() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: AI.paper, fontFamily: AI.font, color: AI.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 16, color: AI.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Ask Skybureau</div>
        <div style={{ fontSize: 9, fontFamily: AI.mono, color: AI.blue, padding: '2px 6px', background: AI.blueSoft, borderRadius: 3, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Beta</div>
      </div>

      <div className="sb-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        {/* User question */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <div style={{ background: AI.ink, color: AI.paper, padding: '10px 14px', borderRadius: 16, borderBottomRightRadius: 4, maxWidth: '80%', fontSize: 14, lineHeight: 1.4 }}>
            Can I grill tonight?
          </div>
        </div>

        {/* AI answer */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <SBLogo size={14} />
            <div style={{ fontSize: 11, fontFamily: AI.mono, color: AI.inkMute, letterSpacing: 0.5 }}>Skybureau · 1:04 PM</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 14, borderTopLeftRadius: 4, padding: '12px 14px', fontSize: 14, lineHeight: 1.45 }}>
            <div>
              <b style={{ color: '#2b8a3e' }}>Yes — but wrap it by 7 PM.</b> Rain arrives around 8 tonight and sticks through morning.
            </div>
            <div style={{ marginTop: 10, padding: '8px 10px', background: AI.paperSoft, borderRadius: 8, fontSize: 12.5, color: AI.inkSoft }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                <span>5:00 PM</span><span style={{ fontFamily: AI.mono }}>69° · dry · 10% pop</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                <span>6:30 PM</span><span style={{ fontFamily: AI.mono }}>66° · cloudy · 20%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', color: AI.watch }}>
                <span>8:00 PM</span><span style={{ fontFamily: AI.mono }}>60° · rain · 60%</span>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: AI.inkMute }}>
              Sunset is 7:48. Wind is light (8mph WSW) — no gusts that would bother a grill.
            </div>
          </div>
          {/* sources */}
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <SrcChip>Hourly · HRRR</SrcChip>
            <SrcChip>Wind · KDCA</SrcChip>
            <SrcChip>POP · NBM</SrcChip>
          </div>
        </div>

        {/* Second Q */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <div style={{ background: AI.ink, color: AI.paper, padding: '10px 14px', borderRadius: 16, borderBottomRightRadius: 4, maxWidth: '80%', fontSize: 14, lineHeight: 1.4 }}>
            What about Saturday for a hike?
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 14, borderTopLeftRadius: 4, padding: '12px 14px', fontSize: 14, lineHeight: 1.45 }}>
            <b style={{ color: '#2b8a3e' }}>Excellent hiking weather.</b> 74° high, sunny, 8mph breeze, low humidity. Trail should be dry by then — Thursday's rain tapers Friday morning.
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="sb-scroll" style={{ padding: '0 16px 10px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {['Safe to fly a drone?', 'When to water plants?', 'Snow this week?', 'Golden hour tonight?'].map((s, i) => (
            <div key={i} style={{ fontSize: 12, fontFamily: AI.font, color: AI.inkSoft, background: AI.paperSoft, border: `1px solid ${AI.line}`, padding: '7px 12px', borderRadius: 16, whiteSpace: 'nowrap' }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: '8px 14px 16px', display: 'flex', gap: 8, alignItems: 'center', borderTop: `1px solid ${AI.line}`, background: '#fff' }}>
        <div style={{ flex: 1, background: AI.paperSoft, border: `1px solid ${AI.line}`, borderRadius: 22, padding: '10px 14px', fontSize: 14, color: AI.inkMute }}>Ask anything about weather…</div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: AI.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3 7l5-5 5 5" stroke={AI.paper} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function SrcChip({ children }) {
  return (
    <span style={{ fontSize: 10, fontFamily: AI.mono, color: AI.inkMute, padding: '2px 7px', background: AI.paperSoft, borderRadius: 10, border: `1px solid ${AI.line}`, letterSpacing: 0.2 }}>◇ {children}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Minute-cast with confidence bands
// ─────────────────────────────────────────────────────────────
function MinuteCast() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 16, color: AI.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Next 60 minutes</div>
      </div>

      <div style={{ padding: '22px 22px 8px' }}>
        <div style={{ fontSize: 13, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Right now</div>
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15, marginTop: 6, textWrap: 'balance' }}>
          Rain starts in <span style={{ color: AI.skyRain }}>14 minutes</span>. Light at first, moderate by 1:35.
        </div>
      </div>

      {/* Precip chart with confidence bands */}
      <div style={{ padding: '14px 14px 10px' }}>
        <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 10, padding: '14px 12px 10px' }}>
          <MinuteChart />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: AI.inkMute, fontFamily: AI.mono, marginTop: 6, padding: '0 4px', letterSpacing: 0.3 }}>
            <span>NOW</span><span>+15</span><span>+30</span><span>+45</span><span>+60m</span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${AI.line}`, fontSize: 11, fontFamily: AI.mono, color: AI.inkSoft }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 16, height: 2, background: AI.skyRain }} /> Likely</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 16, height: 8, background: AI.skyRain, opacity: 0.2, borderRadius: 1 }} /> 80% confidence</span>
          </div>
        </div>
      </div>

      {/* Confidence explainer */}
      <div style={{ padding: '6px 14px 16px' }}>
        <div style={{ background: AI.blueSoft, border: `1px solid ${AI.blue}22`, borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 10 }}>
          <div style={{ fontSize: 16, color: AI.blue }}>◇</div>
          <div>
            <div style={{ fontSize: 10.5, color: AI.blue, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 3 }}>High confidence</div>
            <div style={{ fontSize: 13, lineHeight: 1.4, color: AI.inkSoft }}>
              Models agree within 3 minutes on start time. Radar shows a clean line 4 miles SW moving toward you at 22mph.
            </div>
          </div>
        </div>
      </div>

      {/* Intensity timeline */}
      <div style={{ padding: '0 22px 20px' }}>
        <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Intensity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TLEvent t="1:18 PM" desc="Drizzle begins" />
          <TLEvent t="1:23 PM" desc="Light rain, ≈0.02 in/hr" />
          <TLEvent t="1:35 PM" desc="Moderate, ≈0.15 in/hr" emph />
          <TLEvent t="1:52 PM" desc="Tapering" />
          <TLEvent t="2:12 PM" desc="Dry, cloudy" />
        </div>
      </div>
    </div>
  );
}

function MinuteChart() {
  // line + confidence band
  const W = 340, H = 110, P = 8;
  const mean = [0, 0, 0.05, 0.15, 0.3, 0.5, 0.75, 0.85, 0.9, 0.85, 0.7, 0.5, 0.35, 0.2, 0.1, 0.05];
  const band = mean.map(m => [Math.max(0, m - 0.15), Math.min(1, m + 0.12)]);
  const xOf = (i) => P + (i / (mean.length - 1)) * (W - 2 * P);
  const yOf = (v) => P + (1 - v) * (H - 2 * P);
  const meanPath = mean.map((m, i) => (i ? 'L' : 'M') + xOf(i).toFixed(1) + ',' + yOf(m).toFixed(1)).join(' ');
  const bandPath = band.map((b, i) => `${xOf(i).toFixed(1)},${yOf(b[1]).toFixed(1)}`).join(' ') + ' ' +
                   band.slice().reverse().map((b, i) => `${xOf(band.length - 1 - i).toFixed(1)},${yOf(b[0]).toFixed(1)}`).join(' ');
  const nowX = xOf(3); // "14 min" marker
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <polygon points={bandPath} fill={AI.skyRain} opacity="0.18" />
      <path d={meanPath} fill="none" stroke={AI.skyRain} strokeWidth="2" strokeLinecap="round" />
      <line x1={nowX} y1={P} x2={nowX} y2={H - P} stroke={AI.ink} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={nowX} cy={yOf(mean[3])} r="4" fill={AI.ink} />
      <text x={nowX + 6} y={P + 10} fontSize="10" fontFamily={AI.mono} fill={AI.ink} fontWeight="600">14m</text>
    </svg>
  );
}

function TLEvent({ t, desc, emph }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 58, fontSize: 11, color: AI.inkMute, fontFamily: AI.mono }}>{t}</div>
      <div style={{ width: 6, height: 6, borderRadius: 6, background: emph ? AI.skyRain : AI.inkMute }} />
      <div style={{ fontSize: 13, fontWeight: emph ? 600 : 400, color: emph ? AI.ink : AI.inkSoft }}>{desc}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Push notifications + lock screen
// ─────────────────────────────────────────────────────────────
function LockScreen() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: '#0d1425', color: '#fff', fontFamily: AI.font, position: 'relative', overflow: 'hidden' }}>
      {/* subtle stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${(i * 13.7) % 70}%`, left: `${(i * 23.3) % 100}%`, width: 1.5, height: 1.5, borderRadius: 2, background: '#fff', opacity: 0.3 + ((i * 7) % 7) / 10 }} />
      ))}

      <div style={{ height: 54 }} />
      <div style={{ padding: '40px 22px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Wednesday, April 23</div>
        <div style={{ fontSize: 86, fontWeight: 300, letterSpacing: -3, lineHeight: 1, marginTop: 4 }}>8:42</div>
      </div>

      <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NotifCard level="emergency" title="Tornado Emergency" body="Take shelter now. Confirmed tornado 4 mi SW, moving east." time="now" urgent />
        <NotifCard level="warning" title="Severe Thunderstorm Warning" body="Howard Co until 2:30 PM · 60mph winds, hail possible." time="2m ago" />
        <NotifCard level="brief" title="Your evening brief" body="Light rain 8–11 PM. Bring umbrella for the walk home." time="15m ago" />
      </div>
    </div>
  );
}

function NotifCard({ level, title, body, time, urgent }) {
  const map = {
    emergency: { border: AI.emergency, accent: AI.emergency },
    warning: { border: AI.warning, accent: AI.warning },
    brief: { border: 'rgba(255,255,255,0.15)', accent: AI.blue },
  };
  const m = map[level];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: 14, padding: '10px 14px',
      border: `1px solid ${m.border}`,
      display: 'flex', flexDirection: 'column',
      animation: urgent ? 'sb-pulse 1.8s ease-in-out infinite' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: m.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
          {level === 'brief' ? '◇' : '!'}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>SKYBUREAU</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, opacity: 0.6 }}>{time}</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2, lineHeight: 1.35 }}>{body}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Home screen widgets (iOS gallery)
// ─────────────────────────────────────────────────────────────
function WidgetsScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 16px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Widgets</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Skybureau on your home screen</div>
      </div>

      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <WidgetGroup title="Small · 2×2">
          <div style={{ display: 'flex', gap: 10 }}>
            <SmallWidget />
            <SmallWidgetAlt />
          </div>
        </WidgetGroup>

        <WidgetGroup title="Medium · 4×2">
          <MediumWidget />
        </WidgetGroup>

        <WidgetGroup title="Large · 4×4">
          <LargeWidget />
        </WidgetGroup>

        <WidgetGroup title="Lock screen · circular / rectangular">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#1a1613', padding: 16, borderRadius: 18 }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <WxIcon kind="partly-cloudy-day" size={18} color="#fff" stroke={1.4} />
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: AI.mono }}>67°</div>
            </div>
            <div style={{ border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 12, padding: '6px 10px', color: '#fff', fontSize: 11, fontFamily: AI.mono, lineHeight: 1.3 }}>
              <div style={{ fontWeight: 600 }}>Rain 4:30p</div>
              <div style={{ opacity: 0.7 }}>67° · Partly cloudy</div>
            </div>
          </div>
        </WidgetGroup>
      </div>
    </div>
  );
}

function WidgetGroup({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

const WIDGET_SHADOW = '0 2px 10px rgba(0,0,0,0.08)';

function SmallWidget() {
  return (
    <div style={{ width: 150, height: 150, borderRadius: 20, background: '#fff', boxShadow: WIDGET_SHADOW, padding: 12, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 0.5, fontWeight: 600 }}>SILVER SPRING</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
        <div style={{ fontSize: 42, fontWeight: 400, letterSpacing: -2, lineHeight: 0.9 }}>67°</div>
        <WxIcon kind="partly-cloudy-day" size={22} color={AI.ink} stroke={1.4} />
      </div>
      <div style={{ fontSize: 11, color: AI.inkMute, marginTop: 2 }}>Partly cloudy</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 10.5, fontFamily: AI.mono, color: AI.inkSoft }}>H71° · L52°</div>
    </div>
  );
}

function SmallWidgetAlt() {
  // Alert-forward variant
  return (
    <div style={{ width: 150, height: 150, borderRadius: 20, background: AI.warning, color: '#fff', boxShadow: WIDGET_SHADOW, padding: 12, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, fontFamily: AI.mono, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>● Warning</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>Severe Thunderstorm</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, opacity: 0.85, fontFamily: AI.mono }}>until 2:30 PM</div>
      <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>60mph winds, hail</div>
    </div>
  );
}

function MediumWidget() {
  return (
    <div style={{ width: 322, height: 150, borderRadius: 20, background: '#fff', boxShadow: WIDGET_SHADOW, padding: 14, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 0.5, fontWeight: 600 }}>SILVER SPRING</div>
          <div style={{ fontSize: 32, fontWeight: 400, letterSpacing: -1.4, lineHeight: 1, marginTop: 2 }}>67°</div>
          <div style={{ fontSize: 11.5, color: AI.inkMute, fontFamily: AI.mono, marginTop: 2 }}>H71° · L52° · Partly cloudy</div>
        </div>
        <WxIcon kind="partly-cloudy-day" size={36} color={AI.ink} stroke={1.3} />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
        {SB_FAKE.hourly.slice(0, 6).map((h, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono }}>{h[0]}</div>
            <WxIcon kind={h[2]} size={16} color={AI.inkSoft} stroke={1.4} />
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: AI.mono, marginTop: 2 }}>{h[1]}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LargeWidget() {
  return (
    <div style={{ width: 322, height: 322, borderRadius: 20, background: '#fff', boxShadow: WIDGET_SHADOW, padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 0.5, fontWeight: 600 }}>SILVER SPRING</div>
          <div style={{ fontSize: 44, fontWeight: 400, letterSpacing: -2, lineHeight: 0.95, marginTop: 2 }}>67°</div>
          <div style={{ fontSize: 12, color: AI.inkMute, fontFamily: AI.mono, marginTop: 2 }}>H71° · L52° · Partly cloudy</div>
        </div>
        <WxIcon kind="partly-cloudy-day" size={44} color={AI.ink} stroke={1.2} />
      </div>
      <div style={{ fontSize: 12.5, color: AI.inkSoft, marginTop: 10, lineHeight: 1.35 }}>Rain by 4:30 PM. Bring a light shell for the commute.</div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${AI.line}`, display: 'flex', justifyContent: 'space-between' }}>
        {SB_FAKE.hourly.slice(0, 6).map((h, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono }}>{h[0]}</div>
            <WxIcon kind={h[2]} size={16} color={AI.inkSoft} stroke={1.4} />
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: AI.mono, marginTop: 2 }}>{h[1]}°</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      {SB_FAKE.daily.slice(0, 4).map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, padding: '3px 0' }}>
          <div style={{ width: 40, fontWeight: 500 }}>{d[0]}</div>
          <WxIcon kind={d[3]} size={14} color={AI.inkSoft} stroke={1.4} />
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: AI.mono, color: AI.inkMute }}>{d[2]}°</div>
          <div style={{ width: 34, height: 2, background: AI.line, borderRadius: 1 }}><div style={{ height: '100%', width: '60%', marginLeft: '15%', background: AI.ink, borderRadius: 1 }} /></div>
          <div style={{ fontFamily: AI.mono, fontWeight: 600 }}>{d[1]}°</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Saved locations
// ─────────────────────────────────────────────────────────────
function SavedLocations() {
  const locs = [
    ['Silver Spring', 'MD · Home', 67, 'partly-cloudy-day', 'H71° L52°', true],
    ['Brooklyn', 'NY', 62, 'cloudy', 'H68° L50°'],
    ['Austin', 'TX · Mom', 81, 'clear-day', 'H88° L65°'],
    ['Tofino', 'BC · Trip Apr 28', 52, 'rain', 'H56° L44°'],
    ['Denver', 'CO', 48, 'snow', 'H54° L28°'],
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 14px', borderBottom: `1px solid ${AI.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Places</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 2 }}>Saved</div>
        </div>
        <div style={{ fontSize: 22, color: AI.blue }}>+</div>
      </div>
      {locs.map(([name, sub, t, icon, hilo, here], i) => (
        <div key={i} style={{ padding: '14px 22px', borderBottom: `1px solid ${AI.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <WxIcon kind={icon} size={28} color={AI.ink} stroke={1.3} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              {name}
              {here && <span style={{ fontSize: 9, color: AI.blue, fontFamily: AI.mono, padding: '1px 5px', background: AI.blueSoft, borderRadius: 2, fontWeight: 700, letterSpacing: 0.5 }}>● HERE</span>}
            </div>
            <div style={{ fontSize: 12, color: AI.inkMute, marginTop: 1 }}>{sub}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 400, letterSpacing: -0.8, lineHeight: 1, fontFamily: AI.font }}>{t}°</div>
            <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, marginTop: 2 }}>{hilo}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Watch / wearable
// ─────────────────────────────────────────────────────────────
function WatchFace() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: AI.paper }}>
      <div style={{ width: 210, height: 258, borderRadius: 46, background: '#000', padding: 18, position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <div style={{ color: '#fff', fontFamily: AI.font, padding: '10px 6px' }}>
          <div style={{ fontSize: 10, fontFamily: AI.mono, color: '#b8b5ad', letterSpacing: 0.5 }}>SKYBUREAU · 1:04</div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 6 }}>
            <div style={{ fontSize: 54, fontWeight: 300, letterSpacing: -2, lineHeight: 1 }}>67°</div>
            <WxIcon kind="partly-cloudy-day" size={18} color="#fff" stroke={1.4} />
          </div>
          <div style={{ fontSize: 11, color: '#b8b5ad', marginTop: 2 }}>Partly cloudy · H71°</div>
          <div style={{ marginTop: 10, padding: '6px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 6, fontSize: 10.5, lineHeight: 1.3 }}>
            Rain starts in <b style={{ color: AI.skyRain }}>14m</b>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {SB_FAKE.hourly.slice(0, 4).map((h, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: '#8a8275', fontFamily: AI.mono }}>{h[0]}</div>
                <div style={{ fontSize: 11, fontWeight: 500, fontFamily: AI.mono, marginTop: 2 }}>{h[1]}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Confidence-band hourly view
// ─────────────────────────────────────────────────────────────
function ConfidenceForecast() {
  const W = 340, H = 160, P = 12;
  const hours = 12;
  const mean = [67,69,70,71,69,66,63,60,58,57,56,55];
  // confidence widens out
  const band = mean.map((m, i) => [m - 1 - i*0.5, m + 1 + i*0.5]);
  const xOf = (i) => P + (i / (hours-1)) * (W - 2*P);
  const yOf = (v) => P + (1 - (v - 50) / 30) * (H - 2*P);
  const meanPath = mean.map((m, i) => (i ? 'L':'M') + xOf(i).toFixed(1) + ',' + yOf(m).toFixed(1)).join(' ');
  const bandTop = band.map((b, i) => `${xOf(i).toFixed(1)},${yOf(b[1]).toFixed(1)}`).join(' ');
  const bandBot = band.slice().reverse().map((b, i) => `${xOf(band.length-1-i).toFixed(1)},${yOf(b[0]).toFixed(1)}`).join(' ');
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 16, color: AI.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Hourly · with confidence</div>
      </div>
      <div style={{ padding: '18px 14px' }}>
        <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 10, padding: 12 }}>
          <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
            <polygon points={`${bandTop} ${bandBot}`} fill={AI.ink} opacity="0.08" />
            <path d={meanPath} fill="none" stroke={AI.ink} strokeWidth="2" />
            {mean.map((m, i) => <circle key={i} cx={xOf(i)} cy={yOf(m)} r="2" fill={AI.ink} />)}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, fontFamily: AI.mono, color: AI.inkMute, marginTop: 4 }}>
            {SB_FAKE.hourly.slice(0, 12).map((h, i) => <span key={i}>{h[0]}</span>)}
          </div>
        </div>
        <div style={{ marginTop: 12, padding: '12px 14px', background: AI.blueSoft, borderRadius: 10, border: `1px solid ${AI.blue}22` }}>
          <div style={{ fontSize: 10.5, color: AI.blue, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 3 }}>Reading the band</div>
          <div style={{ fontSize: 13, lineHeight: 1.4, color: AI.inkSoft }}>The shaded area widens as models diverge. Near-term (0–3h) is tight — high confidence. Overnight, the ±5° band means dress for the middle, plan for both ends.</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Health card — pollen, AQI, UV bundled
// ─────────────────────────────────────────────────────────────
function HealthScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 16px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Breathing & outdoor health</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Good day to be outside</div>
      </div>

      <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <HealthStat label="Air quality" val="38" sub="Good" color="#2b8a3e" />
        <HealthStat label="UV index" val="4" sub="Moderate · burn 45m" color={AI.advisory} />
      </div>

      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Pollen</div>
        <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 8 }}>
          <PollenRow name="Tree · Oak, maple" level={4} />
          <PollenRow name="Grass" level={2} />
          <PollenRow name="Weed · Ragweed" level={1} />
          <PollenRow name="Mold spores" level={2} last />
        </div>
      </div>

      <div style={{ padding: '0 22px 20px' }}>
        <div style={{ background: AI.blueSoft, border: `1px solid ${AI.blue}22`, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: 1.4, color: AI.inkSoft }}>
          <b>Tip for allergy sufferers:</b> Oak pollen peaks 6–10 AM. If you can, run outside after 11 or wait for Thursday's rain to clear the air.
        </div>
      </div>
    </div>
  );
}

function HealthStat({ label, val, sub, color }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 400, letterSpacing: -1, lineHeight: 1, marginTop: 4, fontFamily: AI.font }}>{val}</div>
      <div style={{ fontSize: 12, color, marginTop: 4, fontWeight: 500 }}>● {sub}</div>
    </div>
  );
}

function PollenRow({ name, level, last }) {
  const scale = ['Very low', 'Low', 'Moderate', 'High', 'Very high'][level - 1] || 'None';
  const colors = ['#2b8a3e', '#8aac3e', AI.advisory, AI.watch, AI.warning];
  return (
    <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: last ? 'none' : `1px solid ${AI.line}` }}>
      <div style={{ flex: 1, fontSize: 13 }}>{name}</div>
      <div style={{ display: 'flex', gap: 3 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width: 8, height: 14, borderRadius: 2, background: i < level ? colors[level-1] : AI.line }} />
        ))}
      </div>
      <div style={{ width: 70, fontSize: 11, color: AI.inkMute, fontFamily: AI.mono, textAlign: 'right' }}>{scale}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hurricane / tropical tracking
// ─────────────────────────────────────────────────────────────
function HurricaneScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 14px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Active tropical systems</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Hurricane Iris</div>
        <div style={{ fontSize: 13, color: AI.inkMute, marginTop: 2 }}>Category 3 · 125 mph sustained · Cat 4 possible by Sun</div>
      </div>

      {/* cone map */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', background: '#c8d5dd' }}>
        <svg width="100%" height="280" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
          {/* land */}
          <path d="M0 200 Q50 180 120 190 L140 150 Q180 140 210 160 L240 140 L400 130 L400 280 L0 280 Z" fill="#d5dcc8" />
          <path d="M280 80 L320 70 L340 95 L310 110 Z" fill="#d5dcc8" />
          {/* track history */}
          <path d="M350 230 Q310 210 280 195 Q240 180 210 170" stroke={AI.ink} strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          {[[350,230],[310,210],[280,195],[240,180],[210,170]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={AI.ink} strokeWidth="1.5" />
          ))}
          {/* cone */}
          <path d="M210 170 Q180 150 140 130 L90 110 L60 85 L50 110 L90 135 L150 160 Z"
                fill={AI.warning} opacity="0.2" stroke={AI.warning} strokeWidth="1" strokeOpacity="0.5" />
          {/* forecast track */}
          <path d="M210 170 Q170 145 130 125 Q100 105 75 95" stroke={AI.warning} strokeWidth="2" fill="none" />
          {[[170,145],[130,125],[100,110],[75,95]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="#fff" stroke={AI.warning} strokeWidth="1.5" />
              <text x={x} y={y+2} textAnchor="middle" fontSize="8" fontFamily={AI.mono} fontWeight="700" fill={AI.warning}>{['3','3','4','4'][i]}</text>
            </g>
          ))}
          {/* current */}
          <g transform="translate(210,170)">
            <circle r="18" fill={AI.warning} opacity="0.2">
              <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="10" fill={AI.warning} />
            <text y="2" textAnchor="middle" fontSize="9" fontFamily={AI.mono} fontWeight="700" fill="#fff">3</text>
          </g>
          <text x="72" y="88" fontSize="9" fontFamily={AI.mono} fill={AI.ink} fontWeight="600">5-day</text>
          <text x="220" y="167" fontSize="9" fontFamily={AI.mono} fill={AI.ink} fontWeight="600">NOW</text>
        </svg>
      </div>

      <div style={{ padding: '16px 22px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniStat label="Pressure" val="948 mb" sub="falling" />
        <MiniStat label="Movement" val="WNW 12mph" sub="steering flow" />
        <MiniStat label="Max winds" val="125 mph" sub="gusts 150" />
        <MiniStat label="Landfall" val="Sun 2-8 AM" sub="LA coast" />
      </div>

      <SBAlertBanner level="warning" title="Hurricane Warning · SE Louisiana" until="landfall Sunday AM" />
    </div>
  );
}

function MiniStat({ label, val, sub }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 600, fontFamily: AI.mono, marginTop: 4 }}>{val}</div>
      <div style={{ fontSize: 11, color: AI.inkMute, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lightning + Snow + Moon — compact specialty screens
// ─────────────────────────────────────────────────────────────
function LightningScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Lightning · live</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Nearest strike <span style={{ color: AI.warning }}>3.2 mi</span></div>
        <div style={{ fontSize: 13, color: AI.inkMute, marginTop: 2 }}>62 strikes in last 10 min within 25 mi</div>
      </div>

      <div style={{ position: 'relative', height: 300, background: '#0d1425', overflow: 'hidden' }}>
        <svg width="100%" height="300" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* concentric range rings */}
          {[40, 80, 120, 160].map(r => <circle key={r} cx="200" cy="150" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" />)}
          <circle cx="200" cy="150" r="5" fill={AI.blue} />
          {/* strikes */}
          {[[140,80,1],[260,110,1],[290,170,2],[150,200,3],[130,160,4],[240,60,2],[320,130,5],[180,100,3],[310,220,4],[90,180,5]].map(([x,y,age], i) => {
            const col = age === 1 ? '#fff' : age === 2 ? '#fef08a' : age === 3 ? '#fbbf24' : age === 4 ? '#f97316' : '#ef4444';
            return <g key={i}><circle cx={x} cy={y} r={age === 1 ? 6 : 3} fill={col} opacity={age === 1 ? 1 : 0.7} />{age === 1 && <circle cx={x} cy={y} r="10" fill={col} opacity="0.3"><animate attributeName="r" values="6;16" dur="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="1s" repeatCount="indefinite"/></circle>}</g>;
          })}
          <text x="200" y="270" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)" fontFamily={AI.mono}>25 MI</text>
        </svg>
      </div>

      <div style={{ padding: '14px 22px', display: 'flex', gap: 12, alignItems: 'center', fontSize: 11, fontFamily: AI.mono, color: AI.inkMute }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 8, background: '#fff' }} /> Now</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 8, background: '#fbbf24' }} /> 5m ago</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 8, background: '#ef4444' }} /> 10m+</span>
      </div>
    </div>
  );
}

function SnowScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Snowfall forecast</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>4–7 inches expected</div>
        <div style={{ fontSize: 13, color: AI.inkMute, marginTop: 2 }}>Heaviest Thu 2 AM – 8 AM</div>
      </div>

      <div style={{ padding: '18px 22px 14px' }}>
        <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 10, padding: '14px 14px 10px' }}>
          <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
            Probability of snow accumulation
          </div>
          {[
            ['2"+', 92],
            ['4"+', 78],
            ['6"+', 45],
            ['8"+', 18],
            ['12"+', 4],
          ].map(([th, p], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
              <div style={{ width: 40, fontSize: 13, fontWeight: 600, fontFamily: AI.mono }}>{th}</div>
              <div style={{ flex: 1, height: 10, background: AI.paperSoft, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${p}%`, height: '100%', background: AI.skyClear }} />
              </div>
              <div style={{ width: 40, fontSize: 12, color: AI.inkMute, fontFamily: AI.mono, textAlign: 'right' }}>{p}%</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 22px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniStat label="Snow-water eq." val="0.65 in" sub="wet snow" />
        <MiniStat label="Ratio" val="10:1" sub="standard" />
        <MiniStat label="Surface temp" val="28°F" sub="sticking" />
        <MiniStat label="Duration" val="~9 hrs" sub="steady" />
      </div>
    </div>
  );
}

function MoonTideScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AI.paper, fontFamily: AI.font, color: AI.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${AI.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AI.inkMute, fontWeight: 600 }}>Sky · Moon & sun</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Waxing Gibbous</div>
        <div style={{ fontSize: 13, color: AI.inkMute, marginTop: 2 }}>72% illuminated · Full in 4 days</div>
      </div>

      {/* Moon visualization */}
      <div style={{ padding: '24px 22px 12px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 140, background: '#1a1613' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 140, background: 'radial-gradient(circle at 35% 35%, #f6f2ea, #d8d2c6 60%, #a8a195 100%)', clipPath: 'inset(0 28% 0 0)' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 140, boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.3)' }} />
        </div>
      </div>

      <div style={{ padding: '8px 22px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniStat label="Moonrise" val="4:12 PM" sub="ESE" />
        <MiniStat label="Moonset" val="3:48 AM" sub="WSW" />
        <MiniStat label="Sunrise" val="6:22 AM" sub="golden ends 7:01" />
        <MiniStat label="Sunset" val="7:48 PM" sub="golden from 7:12" />
      </div>

      <div style={{ padding: '8px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: AI.inkMute, fontFamily: AI.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Tide · Chesapeake
        </div>
        <div style={{ background: '#fff', border: `1px solid ${AI.line}`, borderRadius: 8, padding: 14 }}>
          <svg width="100%" height="70" viewBox="0 0 300 70">
            <path d="M0 35 Q37 10 75 35 T150 35 T225 35 T300 35" stroke={AI.blue} strokeWidth="1.8" fill="none" />
            <path d="M0 35 Q37 10 75 35 T150 35 T225 35 T300 35 L300 70 L0 70 Z" fill={AI.blueSoft} />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontFamily: AI.mono, color: AI.inkMute, marginTop: 6 }}>
            <span>L 6:12a</span><span>H 12:45p</span><span>L 6:58p</span><span>H 1:22a</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  BriefHome, AskScreen, MinuteCast, LockScreen, WidgetsScreen, SavedLocations, WatchFace,
  ConfidenceForecast, HealthScreen, HurricaneScreen, LightningScreen, SnowScreen, MoonTideScreen,
});
