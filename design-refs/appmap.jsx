// App Map — flow diagram showing navigation and interaction model
// Sits at the top of the canvas as one wide artboard for at-a-glance orientation.

const AM = SB_TOKENS;

// Node types with distinct visual treatments
const NODE_COLORS = {
  launch:   { bg: '#faf8f3', border: AM.lineStrong, accent: AM.inkSoft, label: 'Launch' },
  home:     { bg: '#fff', border: AM.ink, accent: AM.ink, label: 'Home' },
  depth:    { bg: '#fff', border: AM.blue, accent: AM.blue, label: 'Depth' },
  modal:    { bg: '#fff8e6', border: AM.advisory, accent: '#8a6a00', label: 'Modal / Sheet' },
  alert:    { bg: '#ffecec', border: AM.emergency, accent: AM.emergency, label: 'Alert' },
  settings: { bg: '#f1efe9', border: AM.lineStrong, accent: AM.inkSoft, label: 'Settings' },
  specialty:{ bg: '#eef3f5', border: '#3a6b7a', accent: '#3a6b7a', label: 'Specialty' },
  ai:       { bg: '#f2efe8', border: '#6b5a3a', accent: '#6b5a3a', label: 'AI / Agentic' },
  system:   { bg: '#f5f5f5', border: '#999', accent: '#666', label: 'System' },
};

function AppMap() {
  // Canvas-level SVG that contains everything. Designed at 1840 × 1080.
  const W = 1840, H = 1080;
  return (
    <div style={{
      width: W, height: H, background: '#fbf9f4',
      fontFamily: AM.font, color: AM.ink, position: 'relative', overflow: 'hidden',
      border: `1px solid ${AM.line}`,
    }}>
      {/* Header */}
      <div style={{ padding: '26px 38px 20px', borderBottom: `1px solid ${AM.line}`, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: AM.mono, color: AM.inkMute, fontWeight: 600 }}>◇ Skybureau</div>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: AM.mono, color: AM.inkMute }}>App map · v1.0</div>
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.8, marginTop: 6 }}>How the app flows</div>
        <div style={{ fontSize: 14, color: AM.inkSoft, marginTop: 6, maxWidth: 820, lineHeight: 1.5 }}>
          Every tap target and its destination. Solid arrows are primary navigation; dashed are system-triggered (push, life-safety, permissions). Use this with the Skybureau spec sheet for engineering handoff.
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, marginTop: 18, flexWrap: 'wrap' }}>
          {Object.entries(NODE_COLORS).map(([k, v]) => (
            <LegendChip key={k} color={v} />
          ))}
          <div style={{ width: 1, background: AM.line }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: AM.inkSoft }}>
            <svg width="32" height="10"><line x1="0" y1="5" x2="32" y2="5" stroke={AM.ink} strokeWidth="1.5" /></svg>
            <span>user tap</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: AM.inkSoft }}>
            <svg width="32" height="10"><line x1="0" y1="5" x2="32" y2="5" stroke={AM.ink} strokeWidth="1.5" strokeDasharray="4 3" /></svg>
            <span>system-triggered</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: AM.inkSoft }}>
            <svg width="32" height="10"><line x1="0" y1="5" x2="32" y2="5" stroke={AM.emergency} strokeWidth="1.8" /></svg>
            <span>life-safety override</span>
          </div>
        </div>
      </div>

      {/* Flow diagram */}
      <svg width={W} height={H - 210} viewBox={`0 0 ${W} ${H - 210}`} style={{ display: 'block' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={AM.ink} />
          </marker>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={AM.blue} />
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={AM.emergency} />
          </marker>
          <marker id="arrow-mute" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={AM.inkSoft} />
          </marker>
        </defs>

        {/* ────── Column 1: Launch / onboarding ────── */}
        <ColHeader x={30} y={14} n="01" title="Launch" />
        <Node x={30} y={60} w={150} type="system" label="Cold start" sub="App open" />
        <Node x={30} y={135} w={150} type="launch" label="Welcome" sub="Onboarding 1/3" />
        <Node x={30} y={210} w={150} type="launch" label="Permissions" sub="Location + push" />
        <Node x={30} y={285} w={150} type="launch" label="Depth choice" sub="Glance / Scan / Dive" />
        <Node x={30} y={360} w={150} type="launch" label="Location search" sub="Set home city" />

        <Arrow x1={105} y1={100} x2={105} y2={135} />
        <Arrow x1={105} y1={175} x2={105} y2={210} />
        <Arrow x1={105} y1={250} x2={105} y2={285} />
        <Arrow x1={105} y1={325} x2={105} y2={360} />
        <Arrow x1={180} y1={395} x2={270} y2={395} label="done" />

        {/* ────── Column 2: Home (depth variants all flow to Scan by default) ────── */}
        <ColHeader x={270} y={14} n="02" title="Home" />
        <Node x={270} y={60} w={170} type="home" label="Home · Scan" sub="Default depth" pin />
        <Node x={270} y={135} w={170} type="home" label="Home · Glance" sub="Minimal" />
        <Node x={270} y={210} w={170} type="home" label="Home · Dive" sub="Dense" />

        {/* Depth toggle badge */}
        <g transform="translate(270, 290)">
          <rect x="0" y="0" width="170" height="46" rx="6" fill="#fff" stroke={AM.blue} strokeWidth="1.2" strokeDasharray="3 2"/>
          <text x="10" y="18" fontSize="10.5" fontFamily={AM.mono} fill={AM.blue} letterSpacing="1">DEPTH TOGGLE</text>
          <text x="10" y="36" fontSize="12" fill={AM.ink}>Swipe up/down changes density</text>
        </g>

        {/* Four home variants (visual directions — same IA) */}
        <Node x={270} y={360} w={170} type="home" label="Visual variants" sub="Civic · Atmos · Carto · Data" h={54} />

        <Arrow x1={355} y1={100} x2={355} y2={135} dashed />
        <Arrow x1={355} y1={175} x2={355} y2={210} dashed />

        {/* ────── Column 3: Primary surfaces from Home ────── */}
        <ColHeader x={560} y={14} n="03" title="From Home" />
        <Node x={530} y={60} w={170} type="depth" label="Hourly detail" sub="tap hour chip" />
        <Node x={530} y={130} w={170} type="depth" label="10-day forecast" sub="tap day card" />
        <Node x={530} y={200} w={170} type="depth" label="Radar · full" sub="tap map preview" />
        <Node x={530} y={270} w={170} type="depth" label="Wind · Dive" sub="tap wind chip" />
        <Node x={530} y={340} w={170} type="depth" label="Precip · Dive" sub="tap precip chip" />
        <Node x={530} y={410} w={170} type="depth" label="Air quality" sub="tap AQI chip" />
        <Node x={530} y={480} w={170} type="depth" label="Confidence fcst" sub="tap model card" />

        <CurveArrow from={[440, 83]} to={[530, 83]} />
        <CurveArrow from={[440, 83]} to={[530, 153]} />
        <CurveArrow from={[440, 83]} to={[530, 223]} />
        <CurveArrow from={[440, 83]} to={[530, 293]} />
        <CurveArrow from={[440, 83]} to={[530, 363]} />
        <CurveArrow from={[440, 83]} to={[530, 433]} />
        <CurveArrow from={[440, 83]} to={[530, 503]} />

        {/* ────── Column 4: Alerts escalation ────── */}
        <ColHeader x={780} y={14} n="04" title="Alerts · severity escalation" />
        <Node x={760} y={60} w={210} type="alert" label="Banner · Statement" sub="ambient, non-blocking" />
        <Node x={760} y={120} w={210} type="alert" label="Banner · Advisory" sub="yellow pill on home" />
        <Node x={760} y={180} w={210} type="alert" label="Banner · Watch" sub="orange, tappable" />
        <Node x={760} y={240} w={210} type="alert" label="Banner · Warning" sub="red, tappable" />
        <Node x={760} y={300} w={210} type="alert" label="All alerts list" sub="tap any banner →" />
        <Node x={760} y={360} w={210} type="alert" label="Single alert detail" sub="CAP text · safety tips" />
        <Node x={760} y={430} w={210} type="alert" label="EMERGENCY takeover" sub="life-safety · full screen" lifesafety />
        <Node x={760} y={510} w={210} type="modal" label="Safety drawer" sub="what to do, now" />

        <Arrow x1={865} y1={160} x2={865} y2={180} dashed />
        <Arrow x1={865} y1={220} x2={865} y2={240} dashed />
        <Arrow x1={865} y1={280} x2={865} y2={300} dashed />
        <Arrow x1={865} y1={340} x2={865} y2={360} label="tap" />
        <Arrow x1={865} y1={400} x2={865} y2={430} lifesafety label="tornado" />
        <Arrow x1={865} y1={470} x2={865} y2={510} label="acknowledge" />

        {/* Warning → Safety drawer bypasses detail */}
        <CurveArrow from={[970, 264]} to={[970, 520]} label="safety" mute/>

        {/* ────── Column 5: Settings tree ────── */}
        <ColHeader x={1030} y={14} n="05" title="Settings" />
        <Node x={1010} y={60} w={190} type="settings" label="Settings · index" sub="category list" />
        <Node x={1010} y={135} w={190} type="settings" label="Units" sub="°F · mph · inHg…" />
        <Node x={1010} y={200} w={190} type="settings" label="Alert categories" sub="12 NWS product types" />
        <Node x={1010} y={265} w={190} type="settings" label="Notification timing" sub="quiet hrs · routines" />
        <Node x={1010} y={330} w={190} type="settings" label="Brief personalization" sub="what to cover" />
        <Node x={1010} y={395} w={190} type="settings" label="Accessibility" sub="text · contrast · motion" />
        <Node x={1010} y={460} w={190} type="settings" label="Specialty opt-in" sub="marine · aviation · fire" />
        <Node x={1010} y={525} w={190} type="settings" label="Data sources" sub="provenance" />

        {[135, 200, 265, 330, 395, 460, 525].map((y, i) => (
          <CurveArrow key={i} from={[1105, 100]} to={[1105, y + 22]} />
        ))}

        {/* ────── Column 6: Specialty products ────── */}
        <ColHeader x={1240} y={14} n="06" title="Specialty · opt-in" />
        <Node x={1220} y={60} w={190} type="specialty" label="Marine · Coastal" sub="tides, waves" />
        <Node x={1220} y={125} w={190} type="specialty" label="Marine · Offshore" />
        <Node x={1220} y={190} w={190} type="specialty" label="Marine · High seas" />
        <Node x={1220} y={255} w={190} type="specialty" label="Aviation · KDCA" sub="TAF · METAR · PIREP" />
        <Node x={1220} y={320} w={190} type="specialty" label="Fire weather" sub="RFW criteria" />
        <Node x={1220} y={385} w={190} type="specialty" label="Hurricane · NHC" />
        <Node x={1220} y={450} w={190} type="specialty" label="Aurora · SWPC" />
        <Node x={1220} y={515} w={190} type="specialty" label="Flood · NWPS" />
        <Node x={1220} y={580} w={190} type="specialty" label="SKYWARN reports" />

        {/* ────── Column 7: Agentic / AI ────── */}
        <ColHeader x={1445} y={14} n="07" title="Agentic" />
        <Node x={1440} y={60} w={180} type="ai" label="Skybureau Brief" sub="morning digest · 6:45 AM" />
        <Node x={1440} y={135} w={180} type="ai" label="Ask Skybureau" sub="conversational Q&A" />
        <Node x={1440} y={210} w={180} type="ai" label="Minute-cast" sub="60-min precip, confidence" />

        {/* ────── Column 8: System surfaces ────── */}
        <ColHeader x={1660} y={14} n="08" title="System surfaces" />
        <Node x={1645} y={60} w={170} type="system" label="Lock screen" sub="live activity" />
        <Node x={1645} y={125} w={170} type="system" label="Home widgets" sub="small · med · large" />
        <Node x={1645} y={190} w={170} type="system" label="Apple Watch" sub="face + complications" />
        <Node x={1645} y={255} w={170} type="system" label="Push notifications" sub="categories per settings" />
        <Node x={1645} y={320} w={170} type="system" label="Saved locations" sub="home · work · travel" />

        {/* Cross-column system-triggered flows (dashed) */}
        {/* NWS CAP feed → Emergency takeover */}
        <text x="670" y="580" fontSize="11" fontFamily={AM.mono} fill={AM.inkMute} letterSpacing="1">CROSS-FLOWS</text>
        <line x1="670" y1="594" x2="790" y2="594" stroke={AM.line} strokeWidth="1" />

        {/* Home → Settings (via ⚙︎) */}
        <CurveArrow from={[440, 83]} to={[1010, 83]} dashed mute label="⚙︎ settings" />
        {/* Home → Brief (morning tap) */}
        <CurveArrow from={[440, 60]} to={[1440, 83]} dashed mute label="brief card" />
        {/* Home → Ask (FAB) */}
        <CurveArrow from={[440, 83]} to={[1440, 158]} dashed mute label="ask fab" />

        {/* Push → Home (from lock screen tap) */}
        <CurveArrow from={[1645, 278]} to={[440, 83]} dashed mute back />

        {/* Saved locations ↔ Home */}
        <CurveArrow from={[1645, 343]} to={[440, 60]} dashed mute back label="switch city" />

        {/* System CAP → EMERGENCY takeover */}
        <g>
          <text x="670" y="620" fontSize="11" fontFamily={AM.mono} fill={AM.emergency} fontWeight="600" letterSpacing="0.5">LIFE-SAFETY PATH</text>
          <line x1="40" y1="650" x2="970" y2="650" stroke={AM.emergency} strokeWidth="1.5" strokeDasharray="5 3" />
          <text x="40" y="672" fontSize="11" fontFamily={AM.mono} fill={AM.emergency}>NWS CAP feed</text>
          <text x="300" y="672" fontSize="11" fontFamily={AM.mono} fill={AM.emergency}>→ push (breaks silent mode, breaks quiet hours)</text>
          <text x="700" y="672" fontSize="11" fontFamily={AM.mono} fill={AM.emergency}>→ full-screen takeover</text>
        </g>

        {/* ────── Flow legend / bottom callouts ────── */}
        <g transform="translate(30, 730)">
          <rect x="0" y="0" width="1780" height="120" rx="8" fill="#fff" stroke={AM.line} />
          <text x="20" y="28" fontSize="13" fontWeight="600" fill={AM.ink}>Interaction model</text>
          <text x="20" y="50" fontSize="12" fill={AM.inkSoft}>• Every screen has a fixed back chevron. Depth changes via vertical swipe (Glance ↕ Scan ↕ Dive) and persists per-surface.</text>
          <text x="20" y="70" fontSize="12" fill={AM.inkSoft}>• Banners are non-blocking unless Warning or Emergency. Tap expands to full alert; long-press dismisses for the session (not available on life-safety).</text>
          <text x="20" y="90" fontSize="12" fill={AM.inkSoft}>• Specialty products are opt-in from Settings; once enabled they appear as home-screen chips and gain push categories.</text>
          <text x="20" y="110" fontSize="12" fill={AM.inkSoft}>• The Ask FAB is available on every surface at Scan+ depth. The Brief card appears on Home between 5–10 AM local time (configurable).</text>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────
function ColHeader({ x, y, n, title }) {
  return (
    <g>
      <text x={x} y={y + 12} fontSize="10" fontFamily={AM.mono} fill={AM.inkMute} letterSpacing="1.4" fontWeight="600">{n}</text>
      <text x={x + 26} y={y + 12} fontSize="11" fontFamily={AM.mono} fill={AM.ink} letterSpacing="1.4" fontWeight="600">{title.toUpperCase()}</text>
    </g>
  );
}

function Node({ x, y, w = 170, h = 46, type = 'home', label, sub, pin, lifesafety }) {
  const c = NODE_COLORS[type];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={w} height={h} rx="6"
        fill={c.bg} stroke={c.border}
        strokeWidth={lifesafety ? 2.2 : 1.2} />
      {pin && <circle cx="8" cy="8" r="3" fill={AM.ink} />}
      {lifesafety && (
        <rect x={w - 26} y="6" width="20" height="12" rx="2" fill={AM.emergency} />
      )}
      {lifesafety && (
        <text x={w - 16} y="15" fontSize="8" fontFamily={AM.mono} fill="#fff" textAnchor="middle" fontWeight="700">!</text>
      )}
      <text x="10" y="19" fontSize="12.5" fontWeight="600" fill={AM.ink}>{label}</text>
      {sub && <text x="10" y="35" fontSize="10.5" fontFamily={AM.mono} fill={c.accent} letterSpacing="0.2">{sub}</text>}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed, label, lifesafety }) {
  const color = lifesafety ? AM.emergency : AM.ink;
  const marker = lifesafety ? 'url(#arrow-red)' : 'url(#arrow)';
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={lifesafety ? 1.8 : 1.3}
        strokeDasharray={dashed ? '4 3' : undefined}
        markerEnd={marker} />
      {label && (
        <text x={(x1 + x2) / 2 + 6} y={(y1 + y2) / 2 + 4} fontSize="10" fontFamily={AM.mono} fill={color} fontStyle="italic">{label}</text>
      )}
    </g>
  );
}

function CurveArrow({ from, to, dashed, mute, back, lifesafety, label }) {
  const [x1, y1] = from, [x2, y2] = to;
  const color = lifesafety ? AM.emergency : mute ? AM.inkSoft : AM.ink;
  const marker = lifesafety ? 'url(#arrow-red)' : mute ? 'url(#arrow-mute)' : 'url(#arrow)';
  const dx = Math.abs(x2 - x1);
  const cx1 = x1 + Math.min(dx / 2, 140);
  const cx2 = x2 - Math.min(dx / 2, 140);
  const d = back
    ? `M ${x1} ${y1} C ${x1 - 40} ${y1 - 120}, ${x2 + 40} ${y2 + 120}, ${x2} ${y2}`
    : `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
  return (
    <g>
      <path d={d} fill="none"
        stroke={color} strokeWidth={lifesafety ? 1.8 : 1.2}
        strokeDasharray={dashed ? '4 3' : undefined}
        markerEnd={marker} />
      {label && (
        <text x={(x1 + x2) / 2} y={y1 < y2 ? (y1 + y2) / 2 - 6 : (y1 + y2) / 2 + 14} fontSize="10" fontFamily={AM.mono} fill={color} fontStyle="italic" textAnchor="middle">{label}</text>
      )}
    </g>
  );
}

function LegendChip({ color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: AM.inkSoft }}>
      <div style={{ width: 22, height: 14, background: color.bg, border: `1.2px solid ${color.border}`, borderRadius: 3 }} />
      <span>{color.label}</span>
    </div>
  );
}

Object.assign(window, { AppMap });
