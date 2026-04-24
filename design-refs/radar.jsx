// Radar — one screen, three user-selectable styles.
// Default is Clean. User picks in Settings → Radar style.

const R = SB_TOKENS;

// ─────────────────────────────────────────────────────────────
// Main RadarScreen · takes style prop
//   'clean'      — minimal chrome, map-first. Default.
//   'enthusiast' — storm cells, vectors, echo top/VIL, station selector.
//   'narrative'  — natural-language overlay ("Rain reaches you at 4:42 PM").
// ─────────────────────────────────────────────────────────────
function RadarScreen({ style = 'clean' }) {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: '#0d1218', position: 'relative', overflow: 'hidden', fontFamily: R.font, color: '#fff' }}>
      {/* Base map */}
      <RadarMap style={style} />

      {/* Status bar spacer (iOS frame renders its own; this keeps content below it) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 54, background: 'linear-gradient(to bottom, rgba(13,18,24,0.55), rgba(13,18,24,0))', pointerEvents: 'none', zIndex: 2 }} />

      {/* Top bar */}
      <TopBar style={style} />

      {/* Narrative overlay — narrative style only */}
      {style === 'narrative' && <NarrativeOverlay />}

      {/* Storm-cell annotations — enthusiast only */}
      {style === 'enthusiast' && <StormCellOverlay />}

      {/* Layer rail (right edge) */}
      <LayerRail style={style} />

      {/* Nowcast callout — all styles, appears when precip approaching */}
      <NowcastPill style={style} />

      {/* Bottom: timeline scrubber + controls */}
      <BottomControls style={style} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Base radar map — generative SVG, reuses the pattern from FakeMap
// ─────────────────────────────────────────────────────────────
function RadarMap({ style }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 402 874" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="rdr-red" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#d63a2f" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#e8701e" stopOpacity="0.7" />
          <stop offset="75%" stopColor="#d4a017" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3fa04a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rdr-green" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#3fa04a" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#4a7eb3" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4a7eb3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rdr-core" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#a81e5b" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#d63a2f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e8701e" stopOpacity="0" />
        </radialGradient>
        <pattern id="rdr-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Base land/water */}
      <rect width="402" height="874" fill="#0d1218" />
      <path d="M0 320 Q100 300 200 330 T402 320 L402 500 Q300 520 200 510 T0 520 Z" fill="#0a1a2a" opacity="0.6" />

      {/* Road network */}
      <g opacity="0.35">
        <path d="M0 200 Q120 190 240 220 T402 210" stroke="#5a4a2e" strokeWidth="1" fill="none" />
        <path d="M0 450 Q80 440 180 470 T402 450" stroke="#5a4a2e" strokeWidth="1" fill="none" />
        <path d="M150 0 Q160 200 140 400 T150 874" stroke="#5a4a2e" strokeWidth="1" fill="none" />
        <path d="M300 0 Q290 300 310 600 T300 874" stroke="#5a4a2e" strokeWidth="1" fill="none" />
        <path d="M0 650 Q150 640 280 680 T402 660" stroke="#3a3a3a" strokeWidth="0.8" fill="none" />
      </g>

      {/* Grid overlay */}
      <rect width="402" height="874" fill="url(#rdr-grid)" />

      {/* Radar precipitation — a line of storms */}
      <g opacity="0.92">
        <ellipse cx="60" cy="420" rx="90" ry="55" fill="url(#rdr-green)" />
        <ellipse cx="110" cy="450" rx="60" ry="40" fill="url(#rdr-red)" />
        <ellipse cx="130" cy="455" rx="22" ry="15" fill="url(#rdr-core)" />
        <ellipse cx="180" cy="350" rx="40" ry="30" fill="url(#rdr-green)" />
        <ellipse cx="260" cy="250" rx="70" ry="50" fill="url(#rdr-green)" />
        <ellipse cx="290" cy="280" rx="30" ry="22" fill="url(#rdr-red)" />
        <ellipse cx="50" cy="700" rx="50" ry="40" fill="url(#rdr-green)" />
      </g>

      {/* Alert polygons (flash flood watch — orange, semi-transparent) */}
      <polygon points="20,380 180,350 220,460 80,520" fill="#e8701e" opacity="0.12" stroke="#e8701e" strokeWidth="1.3" strokeDasharray="4 3" />

      {/* County lines */}
      <g opacity="0.25">
        <path d="M0 300 Q200 280 402 310" stroke="#8a8a8a" strokeWidth="0.6" strokeDasharray="3 4" fill="none" />
        <path d="M200 0 Q210 400 190 874" stroke="#8a8a8a" strokeWidth="0.6" strokeDasharray="3 4" fill="none" />
      </g>

      {/* Your location */}
      <g transform="translate(201, 500)">
        <circle r="22" fill="#2c5f8d" opacity="0.18" />
        <circle r="10" fill="#2c5f8d" opacity="0.3" />
        <circle r="5" fill="#4a9eff" stroke="#fff" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Storm-cell annotations (enthusiast)
// ─────────────────────────────────────────────────────────────
function StormCellOverlay() {
  const cells = [
    { x: 130, y: 455, vel: '32', dir: 55, label: 'A', tvs: true, vil: 58, top: 48 },
    { x: 290, y: 280, vel: '28', dir: 70, label: 'B', tvs: false, vil: 42, top: 39 },
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 402 874" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      {cells.map((c, i) => {
        const rad = c.dir * Math.PI / 180;
        const vx = Math.cos(rad) * 35, vy = Math.sin(rad) * 35;
        return (
          <g key={i}>
            {/* Cell marker — triangle for TVS, square for SCC */}
            {c.tvs ? (
              <polygon points={`${c.x},${c.y - 9} ${c.x - 8},${c.y + 6} ${c.x + 8},${c.y + 6}`}
                fill="none" stroke="#ffc800" strokeWidth="1.8" />
            ) : (
              <rect x={c.x - 7} y={c.y - 7} width="14" height="14" fill="none" stroke="#ffc800" strokeWidth="1.6" transform={`rotate(45 ${c.x} ${c.y})`} />
            )}
            {/* Motion vector */}
            <line x1={c.x} y1={c.y} x2={c.x + vx} y2={c.y + vy} stroke="#ffc800" strokeWidth="1.4" markerEnd="url(#cell-arrow)" />
            {/* Label box */}
            <g transform={`translate(${c.x + 14}, ${c.y - 32})`}>
              <rect x="0" y="0" width="78" height="36" fill="rgba(10,14,20,0.9)" stroke="#ffc800" strokeWidth="1" rx="3" />
              <text x="5" y="12" fontSize="9" fontFamily={R.mono} fill="#ffc800" fontWeight="700" letterSpacing="0.4">CELL {c.label}{c.tvs ? ' · TVS' : ''}</text>
              <text x="5" y="23" fontSize="8" fontFamily={R.mono} fill="#fff">{c.vel}mph · {c.dir}°</text>
              <text x="5" y="32" fontSize="8" fontFamily={R.mono} fill="#fff">VIL {c.vil} · TOP {c.top}kft</text>
            </g>
          </g>
        );
      })}
      <defs>
        <marker id="cell-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffc800" />
        </marker>
      </defs>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Narrative overlay (narrative style)
// ─────────────────────────────────────────────────────────────
function NarrativeOverlay() {
  return (
    <div style={{ position: 'absolute', left: 14, right: 14, top: 96, zIndex: 3 }}>
      <div style={{
        background: 'rgba(10,14,20,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '14px 16px',
        color: '#fff',
      }}>
        <div style={{ fontSize: 10.5, fontFamily: R.mono, letterSpacing: 1.4, textTransform: 'uppercase', color: '#9ab5d4', fontWeight: 600, marginBottom: 6 }}>
          ◇ What this shows
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.45, letterSpacing: -0.2 }}>
          A <span style={{ color: '#ff8c6b', fontWeight: 600 }}>line of storms 18 mi west</span> is moving east at 32 mph.
          It should reach Silver Spring around <span style={{ fontWeight: 600 }}>4:42 PM</span> with heavy rain for 45 min.
        </div>
        <div style={{ fontSize: 12, color: '#9ab5d4', marginTop: 8, fontFamily: R.mono, letterSpacing: 0.4 }}>
          confidence: high · blend of HRRR + MRMS
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar
// ─────────────────────────────────────────────────────────────
function TopBar({ style }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 54, zIndex: 4, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Pill>‹</Pill>
      <div style={{ flex: 1, padding: '8px 14px', background: 'rgba(10,14,20,0.82)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 10, fontFamily: R.mono, letterSpacing: 1.4, textTransform: 'uppercase', color: '#9ab5d4', fontWeight: 600 }}>Radar · {style === 'enthusiast' ? 'KLWX composite' : 'Sterling, VA'}</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
          Silver Spring, MD
          <span style={{ fontSize: 9, fontFamily: R.mono, color: '#ffc800', background: 'rgba(255,200,0,0.12)', border: '1px solid rgba(255,200,0,0.35)', padding: '1px 6px', borderRadius: 3, letterSpacing: 0.6 }}>WATCH</span>
        </div>
      </div>
      <Pill>⋯</Pill>
    </div>
  );
}

function Pill({ children }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 36,
      background: 'rgba(10,14,20,0.82)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 16, fontWeight: 500,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Layer rail
// ─────────────────────────────────────────────────────────────
function LayerRail({ style }) {
  const layers = style === 'enthusiast'
    ? [
        { id: 'refl', label: 'Refl', on: true },
        { id: 'vel', label: 'Vel', on: false },
        { id: 'sat', label: 'Sat', on: false },
        { id: 'ltg', label: 'Ltg', on: true },
        { id: 'cells', label: 'Cells', on: true },
        { id: 'trk', label: 'Trk', on: false },
      ]
    : [
        { id: 'refl', label: 'Rain', on: true },
        { id: 'sat', label: 'Clouds', on: false },
        { id: 'temp', label: 'Temp', on: false },
        { id: 'ltg', label: 'Lightning', on: true },
      ];

  return (
    <div style={{
      position: 'absolute', right: 12, top: 160, zIndex: 4,
      background: 'rgba(10,14,20,0.82)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
      padding: 5, display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      {layers.map(l => (
        <div key={l.id} style={{
          padding: '7px 10px', minWidth: 52, textAlign: 'center',
          fontSize: 10, fontFamily: R.mono, letterSpacing: 0.6, fontWeight: 600,
          color: l.on ? '#0d1218' : '#cfd7e0',
          background: l.on ? '#4a9eff' : 'transparent',
          borderRadius: 4,
        }}>{l.label.toUpperCase()}</div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Nowcast pill
// ─────────────────────────────────────────────────────────────
function NowcastPill({ style }) {
  if (style === 'narrative') return null; // narrative handles this in its overlay
  return (
    <div style={{
      position: 'absolute', left: 14, top: 105, zIndex: 4,
      background: 'rgba(10,14,20,0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(74,158,255,0.4)', borderRadius: 6,
      padding: '6px 11px', display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: 6, background: '#4a9eff', animation: 'sb-pulse 1.8s ease-in-out infinite' }} />
      <div style={{ fontSize: 12.5, fontWeight: 500 }}>Rain in 42 min</div>
      <div style={{ fontSize: 10.5, fontFamily: R.mono, color: '#9ab5d4', letterSpacing: 0.3 }}>· moderate · 45m</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom controls — timeline scrubber + play/speed
// ─────────────────────────────────────────────────────────────
function BottomControls({ style }) {
  const frames = 26; // 24 past + now + forecast start
  const nowIdx = 16;
  const curIdx = 19; // slightly into forecast
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 4,
      padding: '16px 14px 28px',
      background: 'linear-gradient(to top, rgba(13,18,24,0.95) 45%, rgba(13,18,24,0))',
    }}>
      {/* Timestamp + speed */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: R.mono, letterSpacing: 1.2, textTransform: 'uppercase', color: '#9ab5d4', fontWeight: 600 }}>
            {curIdx > nowIdx ? 'Forecast · HRRR' : 'Observed · MRMS'}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: R.mono, letterSpacing: -0.3, marginTop: 2 }}>
            4:18 PM <span style={{ fontSize: 12, color: '#9ab5d4', fontWeight: 400 }}>· +18 min</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <SmallPill>1×</SmallPill>
          <SmallPill active>▶</SmallPill>
          <SmallPill>2×</SmallPill>
        </div>
      </div>

      {/* Scrubber */}
      <div style={{ position: 'relative', height: 28, marginBottom: 6 }}>
        {/* Frame ticks */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 12, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
        {/* Past (filled) */}
        <div style={{ position: 'absolute', left: 0, top: 12, height: 4, width: `${(nowIdx / (frames - 1)) * 100}%`, background: 'rgba(74,158,255,0.4)', borderRadius: 4 }} />
        {/* Now marker */}
        <div style={{ position: 'absolute', left: `calc(${(nowIdx / (frames - 1)) * 100}% - 1px)`, top: 6, width: 2, height: 16, background: '#fff' }} />
        <div style={{ position: 'absolute', left: `calc(${(nowIdx / (frames - 1)) * 100}% - 12px)`, top: -4, fontSize: 9, fontFamily: R.mono, color: '#fff', fontWeight: 700, letterSpacing: 0.6 }}>NOW</div>
        {/* Current handle */}
        <div style={{ position: 'absolute', left: `calc(${(curIdx / (frames - 1)) * 100}% - 10px)`, top: 2, width: 20, height: 20, borderRadius: 20, background: '#4a9eff', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }} />
        {/* Frame density ticks */}
        {Array.from({ length: frames }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i / (frames - 1)) * 100}%`, top: 20,
            width: 1, height: 5, background: i === nowIdx ? '#fff' : i > nowIdx ? 'rgba(255,200,0,0.6)' : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>

      {/* Timeline labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: R.mono, color: '#9ab5d4', letterSpacing: 0.4, marginBottom: 14 }}>
        <span>−2h</span>
        <span>−1h</span>
        <span style={{ color: '#fff' }}>now</span>
        <span>+45m</span>
        <span style={{ color: '#ffc800' }}>+90m</span>
      </div>

      {/* Bottom action row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <BottomBtn icon="◎" label="Recenter" />
        <BottomBtn icon="⤢" label="Layers" />
        {style === 'enthusiast' && <BottomBtn icon="◇" label="KLWX" />}
        {style !== 'enthusiast' && <BottomBtn icon="☰" label="Legend" />}
        <BottomBtn icon="↗" label="Share" />
      </div>
    </div>
  );
}

function SmallPill({ children, active }) {
  return (
    <div style={{
      minWidth: 34, height: 30, padding: '0 10px', borderRadius: 6,
      background: active ? '#4a9eff' : 'rgba(255,255,255,0.08)',
      border: `1px solid ${active ? '#4a9eff' : 'rgba(255,255,255,0.12)'}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontFamily: R.mono, fontWeight: 600, color: '#fff',
    }}>{children}</div>
  );
}

function BottomBtn({ icon, label }) {
  return (
    <div style={{
      flex: 1, padding: '10px 10px', borderRadius: 8,
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      fontSize: 12, fontWeight: 500,
    }}>
      <span style={{ fontSize: 13, color: '#9ab5d4' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Storm cell detail sheet (tap a cell in Enthusiast style)
// ─────────────────────────────────────────────────────────────
function StormCellSheet() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: '#0d1218', fontFamily: R.font, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Dim background showing radar */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <RadarMap />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,18,24,0.3), rgba(13,18,24,0.85))' }} />

      {/* Sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#0a0e14', borderRadius: '16px 16px 0 0',
        border: '1px solid rgba(255,200,0,0.25)', borderBottom: 'none',
        padding: '12px 20px 28px',
      }}>
        {/* Grabber */}
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 4, margin: '0 auto 16px' }} />

        {/* Cell header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,13 2,13" fill="none" stroke="#ffc800" strokeWidth="1.8" /></svg>
          <div style={{ fontSize: 10.5, fontFamily: R.mono, letterSpacing: 1.4, textTransform: 'uppercase', color: '#ffc800', fontWeight: 700 }}>Cell A · TVS</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, fontFamily: R.mono, color: '#9ab5d4', letterSpacing: 0.6 }}>4:16 PM · KLWX</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4, marginBottom: 16 }}>Tornado vortex signature detected</div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
          <CellStat label="Speed" value="32" unit="mph" />
          <CellStat label="Bearing" value="55°" unit="ENE" />
          <CellStat label="VIL" value="58" unit="kg/m²" warn />
          <CellStat label="Echo top" value="48" unit="kft" />
          <CellStat label="Max dBZ" value="67" unit="" warn />
          <CellStat label="Hail" value="1.8" unit="in" warn />
        </div>

        {/* Forecast path */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10.5, fontFamily: R.mono, letterSpacing: 1.2, textTransform: 'uppercase', color: '#9ab5d4', fontWeight: 600, marginBottom: 8 }}>Forecast path</div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 70px', gap: 8, alignItems: 'center', fontSize: 12.5 }}>
            <div style={{ fontFamily: R.mono, color: '#9ab5d4', fontSize: 11 }}>+10 min</div>
            <div>Silver Spring N</div>
            <div style={{ fontFamily: R.mono, textAlign: 'right', color: '#ff8c6b' }}>4:28 PM</div>
            <div style={{ fontFamily: R.mono, color: '#9ab5d4', fontSize: 11 }}>+22 min</div>
            <div>Downtown Silver Spring</div>
            <div style={{ fontFamily: R.mono, textAlign: 'right', color: '#ff8c6b', fontWeight: 600 }}>4:40 PM</div>
            <div style={{ fontFamily: R.mono, color: '#9ab5d4', fontSize: 11 }}>+35 min</div>
            <div>Takoma Park</div>
            <div style={{ fontFamily: R.mono, textAlign: 'right' }}>4:53 PM</div>
          </div>
        </div>

        {/* Linked warning */}
        <div style={{ padding: 12, background: 'rgba(216,58,47,0.1)', border: '1px solid rgba(216,58,47,0.35)', borderRadius: 6, marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontFamily: R.mono, letterSpacing: 1.2, textTransform: 'uppercase', color: '#ff8c6b', fontWeight: 700, marginBottom: 3 }}>◇ Active Warning</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Tornado Warning · Montgomery County · until 5:00 PM</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <SheetBtn primary>What to do now</SheetBtn>
          <SheetBtn>Share path</SheetBtn>
        </div>
      </div>
    </div>
  );
}

function CellStat({ label, value, unit, warn }) {
  return (
    <div style={{ background: '#0a0e14', padding: '10px 12px' }}>
      <div style={{ fontSize: 9.5, fontFamily: R.mono, letterSpacing: 1, textTransform: 'uppercase', color: '#9ab5d4', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: R.mono, color: warn ? '#ff8c6b' : '#fff', letterSpacing: -0.3, marginTop: 2 }}>
        {value}<span style={{ fontSize: 10, color: '#9ab5d4', fontWeight: 400, marginLeft: 3 }}>{unit}</span>
      </div>
    </div>
  );
}

function SheetBtn({ children, primary }) {
  return (
    <div style={{
      flex: 1, padding: '13px 0', textAlign: 'center',
      background: primary ? '#d63a2f' : 'rgba(255,255,255,0.08)',
      border: `1px solid ${primary ? '#d63a2f' : 'rgba(255,255,255,0.12)'}`,
      borderRadius: 8, fontSize: 13.5, fontWeight: 600,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings · Radar style picker
// ─────────────────────────────────────────────────────────────
function SettingsRadar() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: R.paper, fontFamily: R.font, color: R.ink }}>
      {/* SubNav */}
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 22px 14px', borderBottom: `1px solid ${R.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 18, color: R.inkSoft, width: 20 }}>‹</div>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>Radar style</div>
        <div style={{ fontSize: 11, fontFamily: R.mono, color: R.inkMute, letterSpacing: 0.8, textTransform: 'uppercase' }}>Settings</div>
      </div>

      <div style={{ padding: '14px 22px 16px', fontSize: 12.5, color: R.inkSoft, lineHeight: 1.5, background: R.paperSoft, borderBottom: `1px solid ${R.line}` }}>
        Choose how the radar screen presents storms. All three share the same data, map, and timeline — the only difference is what's drawn on top.
      </div>

      <div style={{ padding: '16px 14px' }}>
        <RadarStyleOption
          id="clean"
          name="Clean"
          desc="Minimal chrome. The radar map is the hero. For most people."
          meta="Default · recommended"
          picked
        />
        <RadarStyleOption
          id="enthusiast"
          name="Enthusiast"
          desc="Storm cells with motion vectors, echo top, VIL, and TVS / mesocyclone markers. Station selector. Tap any cell for a deep readout."
          meta="For weather spotters and chasers"
        />
        <RadarStyleOption
          id="narrative"
          name="Narrative"
          desc="Natural-language overlay that interprets the radar — 'Rain reaches you at 4:42 PM, heavy for 45 min.' Best when you just want a verdict."
          meta="Explains the picture in words"
        />
      </div>

      <div style={{ padding: '8px 22px 4px', fontSize: 10.5, color: R.inkMute, fontFamily: R.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Shared across all styles</div>
      <div style={{ padding: '8px 22px 30px', fontSize: 12.5, color: R.inkSoft, lineHeight: 1.6 }}>
        Timeline −2h → +90m · Layer rail · Alert polygons · Minute-cast pill · Pinch/pan/rotate · Station selector in bottom sheet · Reduce-motion support
      </div>
    </div>
  );
}

function RadarStyleOption({ name, desc, meta, picked }) {
  return (
    <div style={{
      padding: 14, marginBottom: 10,
      background: '#fff', border: `1.5px solid ${picked ? R.ink : R.line}`, borderRadius: 8,
      display: 'flex', gap: 14,
    }}>
      {/* Mini preview */}
      <div style={{ width: 78, height: 108, borderRadius: 5, overflow: 'hidden', flexShrink: 0, background: '#0d1218', position: 'relative', border: `1px solid ${R.line}` }}>
        <svg width="100%" height="100%" viewBox="0 0 78 108" preserveAspectRatio="xMidYMid slice">
          <rect width="78" height="108" fill="#0d1218" />
          <ellipse cx="25" cy="50" rx="22" ry="14" fill="#3fa04a" opacity="0.7" />
          <ellipse cx="30" cy="55" rx="10" ry="7" fill="#d63a2f" opacity="0.8" />
          <ellipse cx="55" cy="30" rx="15" ry="10" fill="#3fa04a" opacity="0.6" />
          <circle cx="39" cy="62" r="2.5" fill="#4a9eff" stroke="#fff" strokeWidth="0.8" />
        </svg>
        {/* Overlay hint per style */}
        {name === 'Enthusiast' && (
          <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 78 108">
            <polygon points="30,50 26,58 34,58" fill="none" stroke="#ffc800" strokeWidth="1" />
            <rect x="36" y="42" width="18" height="10" fill="rgba(10,14,20,0.9)" stroke="#ffc800" strokeWidth="0.5" rx="1" />
          </svg>
        )}
        {name === 'Narrative' && (
          <div style={{ position: 'absolute', left: 3, top: 3, right: 3, background: 'rgba(10,14,20,0.85)', padding: '3px 5px', borderRadius: 2 }}>
            <div style={{ fontSize: 4.5, color: '#9ab5d4', fontFamily: R.mono, letterSpacing: 0.2 }}>4:42 PM · HEAVY</div>
          </div>
        )}
        {/* Timeline always */}
        <div style={{ position: 'absolute', left: 4, right: 4, bottom: 6, height: 2, background: 'rgba(74,158,255,0.4)', borderRadius: 2 }}>
          <div style={{ position: 'absolute', left: '60%', top: -2, width: 5, height: 5, borderRadius: 5, background: '#4a9eff', border: '1px solid #fff' }} />
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{name}</div>
          {picked && (
            <div style={{ width: 18, height: 18, borderRadius: 18, background: R.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</div>
          )}
        </div>
        <div style={{ fontSize: 12.5, color: R.inkSoft, lineHeight: 1.45, marginBottom: 6 }}>{desc}</div>
        <div style={{ fontSize: 10.5, fontFamily: R.mono, color: R.inkMute, letterSpacing: 0.5 }}>{meta}</div>
      </div>
    </div>
  );
}

Object.assign(window, { RadarScreen, StormCellSheet, SettingsRadar });
