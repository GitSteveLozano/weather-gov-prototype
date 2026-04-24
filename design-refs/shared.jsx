// Shared primitives for Skybureau — brand tokens, icons, base UI
// Loaded as Babel; components exposed via window.

const SB_TOKENS = {
  // warm paper neutrals
  paper: '#f6f2ea',
  paperSoft: '#efe9dd',
  ink: '#1a1613',
  inkSoft: '#4a4239',
  inkMute: '#807567',
  line: 'rgba(26, 22, 19, 0.08)',
  lineStrong: 'rgba(26, 22, 19, 0.16)',

  // dark mode (night)
  nightBg: '#0d0f14',
  nightCard: '#141820',
  nightInk: '#f2ede3',
  nightInkMute: '#8a8275',
  nightLine: 'rgba(242, 237, 227, 0.08)',

  // single accent: civic blue
  blue: '#1d4ed8',
  blueSoft: '#e6ecf8',

  // severity scale — NWS-inspired but reworked
  statement: '#9a9388',    // gray — info only
  advisory: '#d4a017',     // amber
  watch: '#e8701e',        // orange
  warning: '#d63a2f',      // red
  emergency: '#a81e5b',    // magenta/crimson — tornado, flash flood emergency

  // weather condition accents (subtle)
  skySunny: '#e8bb3f',
  skyClear: '#4a7eb3',
  skyCloudy: '#8a99a8',
  skyRain: '#4a6b8a',
  skyStorm: '#5a4e7a',
  skySnow: '#c8d4e0',
  skyFog: '#a8a89f',

  font: '"Inter Tight", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", monospace',
};

// Inject Google fonts once
if (typeof document !== 'undefined' && !document.getElementById('sb-fonts')) {
  const link = document.createElement('link');
  link.id = 'sb-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap';
  document.head.appendChild(link);

  // base styles — reset scrollbars inside artboards, thin separators
  const s = document.createElement('style');
  s.id = 'sb-base';
  s.textContent = `
    .sb *{box-sizing:border-box}
    .sb-scroll::-webkit-scrollbar{display:none}
    .sb-scroll{scrollbar-width:none}
    .sb-mono{font-family:${SB_TOKENS.mono};font-feature-settings:"tnum" 1, "zero" 1}
    @keyframes sb-pulse{0%,100%{opacity:1}50%{opacity:.55}}
    @keyframes sb-spin{to{transform:rotate(360deg)}}
    @keyframes sb-rain{0%{transform:translateY(-10px);opacity:0}20%{opacity:.8}100%{transform:translateY(50px);opacity:0}}
    @keyframes sb-sweep{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
    @keyframes sb-drift{0%{transform:translateX(-5px)}50%{transform:translateX(5px)}100%{transform:translateX(-5px)}}
  `;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────
// Skybureau logo — civic mark. Small sun/compass hybrid.
// Not based on any real agency's branding.
// ─────────────────────────────────────────────────────────────
function SBLogo({ size = 20, color }) {
  const c = color || SB_TOKENS.ink;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-label="Skybureau">
      {/* outer square (civic/bureau register mark) */}
      <rect x="1" y="1" width="18" height="18" stroke={c} strokeWidth="1.4" fill="none" />
      {/* compass cross */}
      <path d="M10 4v12M4 10h12" stroke={c} strokeWidth="0.8" />
      {/* sun/ring */}
      <circle cx="10" cy="10" r="3.5" stroke={c} strokeWidth="1.4" fill="none" />
      <circle cx="10" cy="10" r="1" fill={c} />
    </svg>
  );
}

function SBWordmark({ size = 15, color, weight = 600 }) {
  const c = color || SB_TOKENS.ink;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: SB_TOKENS.font, fontWeight: weight,
      fontSize: size, color: c, letterSpacing: -0.3,
    }}>
      <SBLogo size={size + 5} color={c} />
      <span>skybureau</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Weather glyphs — clean linework, no emoji
// ─────────────────────────────────────────────────────────────
function WxIcon({ kind = 'clear-day', size = 24, color, stroke = 1.6 }) {
  const c = color || 'currentColor';
  const s = { width: size, height: size, display: 'inline-block', flexShrink: 0 };
  const P = (d) => <path d={d} stroke={c} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
  switch (kind) {
    case 'clear-day': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        <circle cx="12" cy="12" r="4" stroke={c} strokeWidth={stroke} fill="none" />
        {[0,45,90,135,180,225,270,315].map(a => {
          const r1 = 6.5, r2 = 8.5;
          const x1 = 12 + Math.cos(a*Math.PI/180)*r1, y1 = 12 + Math.sin(a*Math.PI/180)*r1;
          const x2 = 12 + Math.cos(a*Math.PI/180)*r2, y2 = 12 + Math.sin(a*Math.PI/180)*r2;
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={stroke} strokeLinecap="round" />;
        })}
      </svg>
    );
    case 'clear-night': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M18 14.5A7 7 0 0 1 9.5 6a7 7 0 1 0 8.5 8.5z')}
      </svg>
    );
    case 'partly-cloudy-day': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        <circle cx="8" cy="9" r="3" stroke={c} strokeWidth={stroke} fill="none" />
        {[-45,0,45,-90].map(a => {
          const r1 = 4.5, r2 = 6;
          const x1 = 8 + Math.cos(a*Math.PI/180)*r1, y1 = 9 + Math.sin(a*Math.PI/180)*r1;
          const x2 = 8 + Math.cos(a*Math.PI/180)*r2, y2 = 9 + Math.sin(a*Math.PI/180)*r2;
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={stroke} strokeLinecap="round" />;
        })}
        {P('M7 17a3 3 0 0 1 0-6 4 4 0 0 1 7.5 0.5A3 3 0 0 1 16 17H7z')}
      </svg>
    );
    case 'cloudy': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M6 17a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 17H6z')}
      </svg>
    );
    case 'rain': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M6 13a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 13H6z')}
        {P('M8 16l-1 3M12 16l-1 3M16 16l-1 3')}
      </svg>
    );
    case 'thunder': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M6 12a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 12H6z')}
        {P('M12 13l-2.5 4h3L10 21l3.5-5h-3l2-3z')}
      </svg>
    );
    case 'snow': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M6 12a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 12H6z')}
        {P('M8 16v3M12 15v4M16 16v3M7 17.5l2 0M11 17l2 0M15 17.5l2 0')}
      </svg>
    );
    case 'fog': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M3 9h18M5 13h14M3 17h18')}
      </svg>
    );
    case 'wind': return (
      <svg viewBox="0 0 24 24" style={s} fill="none">
        {P('M3 8h13a2.5 2.5 0 1 0-2.5-2.5M3 12h17a3 3 0 1 1-3 3M3 16h9')}
      </svg>
    );
    default: return <div style={s} />;
  }
}

// Severity chip
function SBSeverityChip({ level = 'advisory', children, small = false }) {
  const map = {
    statement: { bg: '#e8e5de', fg: '#5a5347', label: 'Statement' },
    advisory: { bg: '#fbf0cc', fg: '#7a5a0a', label: 'Advisory' },
    watch: { bg: '#fdd9b8', fg: '#8a3a0e', label: 'Watch' },
    warning: { bg: '#f7c4bf', fg: '#7a1e17', label: 'Warning' },
    emergency: { bg: '#efc1d4', fg: '#5a0e32', label: 'Emergency' },
  };
  const m = map[level];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: SB_TOKENS.font, fontWeight: 600,
      fontSize: small ? 10 : 11, letterSpacing: 0.8, textTransform: 'uppercase',
      padding: small ? '2px 6px' : '3px 8px', borderRadius: 3,
      background: m.bg, color: m.fg,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 5, background: m.fg }} />
      {children || m.label}
    </span>
  );
}

// Tiny bar for sparkline-like visuals
function SBBars({ values = [], max, color, height = 24, gap = 2, width }) {
  const m = max ?? Math.max(...values);
  return (
    <div style={{ display: 'flex', gap, alignItems: 'flex-end', height, width: width || '100%' }}>
      {values.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v / m) * 100}%`,
          background: color || SB_TOKENS.ink,
          minHeight: 1, borderRadius: 1,
        }} />
      ))}
    </div>
  );
}

// Simple line chart
function SBLineChart({ data = [], width = 260, height = 60, color, fill, pad = 4, showDots = false, yRange }) {
  if (!data.length) return null;
  const [lo, hi] = yRange || [Math.min(...data), Math.max(...data)];
  const rng = hi - lo || 1;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (v - lo) / rng) * (height - pad * 2);
    return [x, y];
  });
  const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaD = pathD + ` L${points[points.length-1][0]},${height} L${points[0][0]},${height} Z`;
  const c = color || SB_TOKENS.ink;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && <path d={areaD} fill={fill} />}
      <path d={pathD} fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {showDots && points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={2} fill={c} />)}
    </svg>
  );
}

// Fake but plausible weather data — everything references this so tweaks can mutate it
const SB_FAKE = {
  location: { name: 'Silver Spring', state: 'MD', lat: 38.99, lon: -77.03 },
  now: {
    temp: 67, feels: 65, condition: 'Partly cloudy', icon: 'partly-cloudy-day',
    wind: 8, windDir: 'WSW', humidity: 54, dewpoint: 49, pressure: 30.12, pressureTrend: 'rising',
    visibility: 10, uv: 4, airQuality: 38, sunrise: '6:22', sunset: '7:48',
    high: 71, low: 52,
  },
  summary: "Pleasant and mild through evening. Clouds build overnight with rain likely by Thursday morning — heaviest between 8-11am.",
  hourly: [
    // [hour, temp, icon, pop]
    ['Now', 67, 'partly-cloudy-day', 0],
    ['2p', 69, 'partly-cloudy-day', 0],
    ['3p', 70, 'partly-cloudy-day', 5],
    ['4p', 71, 'cloudy', 10],
    ['5p', 69, 'cloudy', 20],
    ['6p', 66, 'cloudy', 30],
    ['7p', 63, 'cloudy', 40],
    ['8p', 60, 'rain', 60],
    ['9p', 58, 'rain', 70],
    ['10p', 57, 'rain', 75],
    ['11p', 56, 'rain', 65],
    ['12a', 55, 'rain', 50],
  ],
  daily: [
    // [day, hi, lo, icon, pop, condition]
    ['Today', 71, 52, 'partly-cloudy-day', 20, 'Clouds build'],
    ['Thu', 64, 51, 'rain', 85, 'Rain, heavy AM'],
    ['Fri', 68, 48, 'partly-cloudy-day', 15, 'Clearing'],
    ['Sat', 74, 53, 'clear-day', 0, 'Sunny & mild'],
    ['Sun', 78, 58, 'clear-day', 5, 'Warm'],
    ['Mon', 76, 60, 'thunder', 50, 'PM storms'],
    ['Tue', 70, 55, 'cloudy', 30, 'Cool'],
  ],
  alerts: [
    { level: 'advisory', title: 'Dense Fog Advisory', until: 'until 9 AM', area: 'Montgomery County', issued: '4:12 AM' },
  ],
};

// ─────────────────────────────────────────────────────────────
// BottomTabBar — always-visible system navigation.
// 4 tabs: Home, Radar, Alerts, More.
// Hidden on: onboarding, fullscreen takeovers, sheets.
// ─────────────────────────────────────────────────────────────
function SBTabBar({ active = 'home', dark = false }) {
  const ink = dark ? SB_TOKENS.nightInk : SB_TOKENS.ink;
  const mute = dark ? SB_TOKENS.nightInkMute : SB_TOKENS.inkMute;
  const bg = dark ? 'rgba(13,15,20,0.92)' : 'rgba(246,242,234,0.94)';
  const line = dark ? SB_TOKENS.nightLine : SB_TOKENS.line;

  const Tab = ({ id, label, children }) => {
    const on = active === id;
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 3, padding: '6px 0 2px', color: on ? ink : mute,
        position: 'relative', cursor: 'default',
      }}>
        {on && <div style={{
          position: 'absolute', top: 0, width: 18, height: 2, background: ink, borderRadius: 1,
        }} />}
        {children}
        <div style={{
          fontSize: 10, fontWeight: on ? 600 : 500, letterSpacing: 0.1,
          fontFamily: SB_TOKENS.font,
        }}>{label}</div>
      </div>
    );
  };

  const ICON = 20;
  const stroke = 1.7;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 68, paddingBottom: 14,
      background: bg,
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${line}`,
      display: 'flex', alignItems: 'flex-start',
      zIndex: 40,
    }}>
      <Tab id="home" label="Home">
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none">
          <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z"
            stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round"
            fill={active === 'home' ? 'currentColor' : 'none'} fillOpacity={active === 'home' ? 0.08 : 1}/>
        </svg>
      </Tab>
      <Tab id="radar" label="Radar">
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={stroke} />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth={stroke} opacity="0.5" />
          <path d="M12 12 L18.5 8.5" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        </svg>
      </Tab>
      <Tab id="more" label="More">
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none">
          <circle cx="5.5" cy="7" r="1.2" fill="currentColor" />
          <circle cx="12"  cy="7" r="1.2" fill="currentColor" />
          <circle cx="18.5" cy="7" r="1.2" fill="currentColor" />
          <circle cx="5.5" cy="13" r="1.2" fill="currentColor" />
          <circle cx="12"  cy="13" r="1.2" fill="currentColor" />
          <circle cx="18.5" cy="13" r="1.2" fill="currentColor" />
          <path d="M4 18.5h16" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      </Tab>
    </div>
  );
}

Object.assign(window, {
  SB_TOKENS, SB_FAKE, SBLogo, SBWordmark, WxIcon, SBSeverityChip, SBBars, SBLineChart, SBTabBar,
});
