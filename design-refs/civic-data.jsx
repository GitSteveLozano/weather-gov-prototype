// Civic data screens — the "beyond the forecast" set.
// Air Quality, Wildfire & Smoke, Drought, River Hydrograph,
// Earthquake, Tsunami, Climate Normals.
// All pull from public government sources and show provenance.

const CD = SB_TOKENS;

// ─────────────────────────────────────────────────────────────
// Shared civic chrome — mirrors civic.jsx patterns
// ─────────────────────────────────────────────────────────────
function CDHeader({ kicker, title, byline }) {
  return (
    <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CD.line}` }}>
      <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CD.inkMute, fontWeight: 600 }}>{kicker}</div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4, textWrap: 'balance', lineHeight: 1.15 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: CD.inkMute, marginTop: 4, lineHeight: 1.4 }}>{byline}</div>
    </div>
  );
}

function CDProvenance({ source, updated, sensor }) {
  return (
    <div style={{
      margin: '16px 22px 26px', padding: '12px 14px',
      background: CD.paperSoft, border: `1px solid ${CD.line}`, borderRadius: 10,
      fontSize: 11.5, fontFamily: CD.mono, color: CD.inkMute,
      display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      <div><span style={{ color: CD.ink }}>◇</span> Source · <span style={{ color: CD.inkSoft }}>{source}</span></div>
      <div>Updated · <span style={{ color: CD.inkSoft }}>{updated}</span></div>
      {sensor && <div>Station · <span style={{ color: CD.inkSoft }}>{sensor}</span></div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. Air Quality — full AirNow breakdown
// ─────────────────────────────────────────────────────────────
function AirQualityScreen() {
  const AQI = 118;
  const category = 'Unhealthy for sensitive groups';
  const catColor = '#e8701e';
  const pollutants = [
    { id: 'PM2.5', name: 'Fine particulate', value: 42, unit: 'µg/m³', aqi: 118, primary: true, note: 'Wildfire smoke transported from QC' },
    { id: 'O₃',    name: 'Ozone (8-hr)',      value: 54, unit: 'ppb',   aqi: 58,  primary: false, note: 'Moderate' },
    { id: 'NO₂',   name: 'Nitrogen dioxide',   value: 18, unit: 'ppb',   aqi: 28,  primary: false, note: 'Good' },
    { id: 'PM10',  name: 'Coarse particulate', value: 28, unit: 'µg/m³', aqi: 32,  primary: false, note: 'Good' },
    { id: 'SO₂',   name: 'Sulfur dioxide',     value: 3,  unit: 'ppb',   aqi: 4,   primary: false, note: 'Good' },
    { id: 'CO',    name: 'Carbon monoxide',    value: 0.4,unit: 'ppm',   aqi: 5,   primary: false, note: 'Good' },
  ];
  const forecast = [
    { when: 'Today', aqi: 118, cat: 'USG', color: '#e8701e' },
    { when: 'Tomorrow', aqi: 98, cat: 'Moderate', color: '#d4a017' },
    { when: 'Thu', aqi: 76, cat: 'Moderate', color: '#d4a017' },
    { when: 'Fri', aqi: 48, cat: 'Good', color: '#6a8e4e' },
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="Air Quality · AirNow" title="Unhealthy for sensitive groups today"
        byline="AQI 118 · dominant pollutant PM2.5 · wildfire smoke transport" />

      {/* Big AQI number */}
      <div style={{ padding: '18px 22px 6px', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{
          width: 110, height: 110, borderRadius: 14,
          background: catColor, color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 10, fontFamily: CD.mono, letterSpacing: 1.5, opacity: 0.85 }}>AQI</div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1 }}>{AQI}</div>
          <div style={{ fontSize: 9, fontFamily: CD.mono, marginTop: 2, opacity: 0.9, letterSpacing: 0.5 }}>USG</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.25 }}>{category}</div>
          <div style={{ fontSize: 13, color: CD.inkSoft, marginTop: 6, lineHeight: 1.45 }}>
            People with asthma, heart disease, children, and older adults should reduce prolonged outdoor exertion through evening.
          </div>
        </div>
      </div>

      {/* AQI scale strip */}
      <div style={{ padding: '14px 22px 8px' }}>
        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden' }}>
          {[
            { c: '#6a8e4e', w: 50 }, { c: '#d4a017', w: 50 },
            { c: '#e8701e', w: 50 }, { c: '#d63a2f', w: 100 },
            { c: '#a81e5b', w: 100 }, { c: '#6b2234', w: 150 },
          ].map((s, i) => <div key={i} style={{ flex: s.w, background: s.c }} />)}
        </div>
        <div style={{ position: 'relative', height: 24, marginTop: 4, fontSize: 9.5, fontFamily: CD.mono, color: CD.inkMute }}>
          <div style={{ position: 'absolute', left: `${(AQI/500)*100}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div style={{ width: 1, height: 6, background: CD.ink, margin: '0 auto' }} />
            <div style={{ color: CD.ink, fontWeight: 600, marginTop: 1 }}>{AQI}</div>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>0</div>
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}>500</div>
        </div>
      </div>

      {/* Pollutant breakdown */}
      <div style={{ padding: '16px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Pollutants measured</div>
      <div style={{ padding: '0 22px' }}>
        {pollutants.map((p, i) => (
          <div key={p.id} style={{
            padding: '12px 0', borderBottom: i < pollutants.length - 1 ? `1px solid ${CD.line}` : 'none',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 52, fontSize: 13, fontWeight: 700, fontFamily: CD.mono, color: p.primary ? catColor : CD.ink }}>{p.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name} {p.primary && <span style={{ fontSize: 9.5, fontFamily: CD.mono, color: catColor, marginLeft: 5, letterSpacing: 0.8 }}>PRIMARY</span>}</div>
              <div style={{ fontSize: 11.5, color: CD.inkMute, fontFamily: CD.mono, marginTop: 2 }}>{p.value} {p.unit} · {p.note}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: CD.mono, color: p.primary ? catColor : CD.inkSoft, minWidth: 36, textAlign: 'right' }}>{p.aqi}</div>
          </div>
        ))}
      </div>

      {/* 4-day forecast */}
      <div style={{ padding: '20px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>4-day AQI forecast</div>
      <div style={{ padding: '0 22px', display: 'flex', gap: 10 }}>
        {forecast.map((d) => (
          <div key={d.when} style={{
            flex: 1, padding: '12px 8px', borderRadius: 10,
            background: d.color + '15', border: `1px solid ${d.color}40`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: CD.inkSoft, fontFamily: CD.mono }}>{d.when}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: d.color, marginTop: 6 }}>{d.aqi}</div>
            <div style={{ fontSize: 10, color: CD.inkMute, fontFamily: CD.mono, marginTop: 2 }}>{d.cat}</div>
          </div>
        ))}
      </div>

      {/* Source attribution */}
      <div style={{ padding: '22px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Contributing sensors</div>
      <div style={{ padding: '0 22px' }}>
        {[
          { name: 'McMillan Reservoir', id: 'EPA · 11-001-0043', dist: '4.2 mi W', type: 'regulatory' },
          { name: 'Rockville monitor',  id: 'EPA · 24-031-0080', dist: '8.1 mi N', type: 'regulatory' },
          { name: 'Silver Spring #214',  id: 'PurpleAir · 162841', dist: '0.6 mi', type: 'low-cost' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? `1px solid ${CD.line}` : 'none', display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: s.type === 'regulatory' ? CD.blue : '#8a6a00', marginTop: 4 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: CD.inkMute, fontFamily: CD.mono, marginTop: 1 }}>{s.id}</div>
            </div>
            <div style={{ fontSize: 11, color: CD.inkSoft, fontFamily: CD.mono }}>{s.dist}</div>
          </div>
        ))}
      </div>

      <CDProvenance source="EPA AirNow + PurpleAir (low-cost)" updated="1:45 PM · hourly" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Wildfire & Smoke — active fires + plume
// ─────────────────────────────────────────────────────────────
function WildfireScreen() {
  const fires = [
    { name: 'Pinetop Fire',  size: '4,820 ac', contained: 35, state: 'Québec', dist: '612 mi N', impact: 'Primary smoke source' },
    { name: 'Chibougamau',   size: '18,400 ac', contained: 12, state: 'Québec', dist: '740 mi N', impact: 'Secondary plume' },
    { name: 'Lake George',   size: '240 ac',   contained: 85, state: 'NY',     dist: '328 mi NE',impact: 'Local only' },
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="Wildfire & smoke" title="Smoke aloft from Canadian fires"
        byline="Surface impact: moderate · 3 active fires affecting your airshed" />

      {/* Smoke plume map */}
      <div style={{ position: 'relative', margin: '18px 22px', height: 220, borderRadius: 12, overflow: 'hidden', background: '#3a3220', border: `1px solid ${CD.lineStrong}` }}>
        <svg viewBox="0 0 300 220" width="100%" height="100%" style={{ display: 'block' }}>
          <defs>
            <radialGradient id="smoke1" cx="60%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#a88560" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#a88560" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="smoke2" cx="40%" cy="60%" r="45%">
              <stop offset="0%" stopColor="#c4a07a" stopOpacity="0.65"/>
              <stop offset="100%" stopColor="#c4a07a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* faint base terrain */}
          <rect width="300" height="220" fill="#2a241a"/>
          {/* state outlines */}
          <path d="M60 40 L120 35 L180 50 L240 40 L270 70 L260 120 L240 160 L180 170 L100 180 L60 170 L40 140 L50 90 Z" fill="none" stroke="#5a4e3a" strokeWidth="0.7"/>
          <path d="M100 180 L140 190 L170 200 L160 210" fill="none" stroke="#5a4e3a" strokeWidth="0.7"/>
          {/* smoke plumes */}
          <rect width="300" height="220" fill="url(#smoke1)"/>
          <rect width="300" height="220" fill="url(#smoke2)"/>
          {/* fire points */}
          <circle cx="220" cy="30" r="4" fill="#d63a2f"/>
          <circle cx="220" cy="30" r="10" fill="#d63a2f" opacity="0.3"/>
          <circle cx="250" cy="45" r="3" fill="#d63a2f"/>
          <circle cx="250" cy="45" r="8" fill="#d63a2f" opacity="0.3"/>
          <circle cx="245" cy="85" r="2.5" fill="#e8701e"/>
          {/* wind arrows showing transport */}
          {[[210,45],[180,70],[150,95],[120,120]].map(([x,y],i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(220)`} opacity="0.55">
              <path d="M0 0 L14 0 M10 -3 L14 0 L10 3" stroke="#d4c7a3" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            </g>
          ))}
          {/* user location */}
          <g transform="translate(140,140)">
            <circle r="6" fill="#fff"/>
            <circle r="3" fill={CD.ink}/>
          </g>
          <text x="148" y="143" fontSize="9" fill="#fff" fontFamily={CD.mono} fontWeight="600">You</text>
        </svg>
        <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 10, fontFamily: CD.mono, color: '#d4c7a3', letterSpacing: 1, fontWeight: 600 }}>NOAA HRRR-SMOKE · NEAR-SURFACE</div>
        <div style={{ position: 'absolute', bottom: 10, right: 12, display: 'flex', gap: 6, fontSize: 9.5, fontFamily: CD.mono }}>
          <div style={{ padding: '3px 7px', background: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 4 }}>Now</div>
          <div style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.12)', color: '#d4c7a3', borderRadius: 4 }}>+6h</div>
          <div style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.12)', color: '#d4c7a3', borderRadius: 4 }}>+12h</div>
          <div style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.12)', color: '#d4c7a3', borderRadius: 4 }}>+24h</div>
        </div>
      </div>

      {/* Impact card */}
      <div style={{ padding: '0 22px 8px' }}>
        <div style={{
          padding: '14px 16px', background: '#fff', border: `1px solid ${CD.line}`, borderRadius: 10,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: '#e8701e18', color: '#e8701e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, fontWeight: 700, fontFamily: CD.mono }}>PM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>Your PM2.5 is 42 µg/m³ — up from 12 yesterday</div>
            <div style={{ fontSize: 12, color: CD.inkSoft, marginTop: 4, lineHeight: 1.4 }}>
              Pattern will improve Thursday as a front clears the plume eastward. Consider limiting outdoor exertion.
            </div>
            <div style={{ fontSize: 12, color: CD.blue, marginTop: 8, fontWeight: 500 }}>Open Air Quality →</div>
          </div>
        </div>
      </div>

      {/* Active fires */}
      <div style={{ padding: '18px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Active fires affecting your airshed</div>
      <div style={{ padding: '0 22px' }}>
        {fires.map((f, i) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: i < fires.length - 1 ? `1px solid ${CD.line}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
              <div style={{ fontSize: 10.5, color: CD.inkMute, fontFamily: CD.mono, padding: '2px 6px', background: CD.paperSoft, borderRadius: 3 }}>{f.state}</div>
            </div>
            <div style={{ fontSize: 12, color: CD.inkSoft, fontFamily: CD.mono, marginBottom: 8 }}>
              {f.size} · {f.dist} · {f.contained}% contained
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: CD.paperSoft, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${f.contained}%`, height: '100%', background: f.contained > 70 ? '#6a8e4e' : f.contained > 30 ? '#d4a017' : '#d63a2f' }}/>
              </div>
              <div style={{ fontSize: 11, color: CD.inkMute, fontFamily: CD.mono }}>{f.impact}</div>
            </div>
          </div>
        ))}
      </div>

      <CDProvenance source="NIFC · NOAA HRRR-Smoke · PurpleAir" updated="2:10 PM · 6-hr refresh" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Drought — USDM weekly monitor
// ─────────────────────────────────────────────────────────────
function DroughtScreen() {
  const levels = [
    { id: 'None', color: '#efe9dd', label: 'None' },
    { id: 'D0',   color: '#f6e8a8', label: 'Abnormally dry' },
    { id: 'D1',   color: '#e5b85a', label: 'Moderate' },
    { id: 'D2',   color: '#d4843a', label: 'Severe' },
    { id: 'D3',   color: '#b84a2a', label: 'Extreme' },
    { id: 'D4',   color: '#7a1e1a', label: 'Exceptional' },
  ];
  const current = 'D1';
  const weeks = [
    { w: '12 wk ago', level: 'None' }, { w: '9 wk',  level: 'None' },
    { w: '6 wk',  level: 'D0' },   { w: '3 wk',  level: 'D0' },
    { w: 'Last',  level: 'D0' },   { w: 'Now',   level: 'D1' },
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="Drought · U.S. Drought Monitor" title="Moderate drought · worsening"
        byline="Montgomery County, MD · D1 as of Apr 16 · first week at D1 since 2023" />

      {/* Big status */}
      <div style={{ padding: '18px 22px 8px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 82, height: 82, borderRadius: 12, background: '#e5b85a', color: '#3a2200', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>D1</div>
          <div style={{ fontSize: 9, fontFamily: CD.mono, letterSpacing: 1, marginTop: 1 }}>MODERATE</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: CD.inkSoft, lineHeight: 1.45 }}>
            <b style={{ color: CD.ink }}>11.2"</b> of precipitation in the last 90 days — <b style={{ color: '#b84a2a' }}>3.8" below normal</b>. Streamflow at the Potomac River gauge is at the 18th percentile.
          </div>
        </div>
      </div>

      {/* Scale strip */}
      <div style={{ padding: '14px 22px 10px' }}>
        <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', border: `1px solid ${CD.line}` }}>
          {levels.map(l => (
            <div key={l.id} style={{ flex: 1, background: l.color, position: 'relative' }}>
              {l.id === current && (
                <div style={{ position: 'absolute', inset: -2, border: `2px solid ${CD.ink}`, borderRadius: 4 }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: 5, fontSize: 10, fontFamily: CD.mono, color: CD.inkMute }}>
          {levels.map(l => <div key={l.id} style={{ flex: 1, textAlign: 'center', fontWeight: l.id === current ? 700 : 400, color: l.id === current ? CD.ink : CD.inkMute }}>{l.id}</div>)}
        </div>
      </div>

      {/* 12-week timeline */}
      <div style={{ padding: '12px 22px 6px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>12-week trend</div>
      <div style={{ padding: '0 22px 10px', display: 'flex', gap: 4 }}>
        {weeks.map((w, i) => {
          const lv = levels.find(l => l.id === w.level);
          return (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: 40, background: lv.color, border: `1px solid ${CD.line}`, borderRadius: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: w.level === 'None' ? CD.inkMute : '#3a2200', fontFamily: CD.mono }}>{w.level}</div>
              </div>
              <div style={{ fontSize: 9.5, color: CD.inkMute, marginTop: 4, fontFamily: CD.mono }}>{w.w}</div>
            </div>
          );
        })}
      </div>

      {/* Deficit stats */}
      <div style={{ padding: '14px 22px 4px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Indicators</div>
      <div style={{ padding: '0 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'PRECIP · 90 DAY', value: '11.2″', note: '−3.8″ vs. normal' },
          { label: 'PRECIP · 30 DAY', value: '1.9″', note: '−1.6″ vs. normal' },
          { label: 'STREAMFLOW', value: '18th %', note: 'Potomac at Little Falls' },
          { label: 'SOIL MOIST.', value: '34%', note: 'Top 40cm · dry' },
          { label: 'GROUNDWATER', value: 'Normal', note: 'Slow to respond' },
          { label: 'SPI-3', value: '−1.2', note: 'Moderately dry' },
        ].map((s) => (
          <div key={s.label} style={{ padding: '11px 13px', background: '#fff', border: `1px solid ${CD.line}`, borderRadius: 9 }}>
            <div style={{ fontSize: 9.5, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 3, fontFamily: CD.mono }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: CD.inkSoft, marginTop: 2 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* What this means */}
      <div style={{ padding: '18px 22px 8px' }}>
        <div style={{ fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>What this means for you</div>
        <div style={{ padding: '12px 14px', background: CD.paperSoft, borderRadius: 8, fontSize: 13, color: CD.inkSoft, lineHeight: 1.5 }}>
          Lawns and new plantings should be watered. No mandatory water restrictions are in effect, but voluntary conservation is encouraged by WSSC. Fire danger is elevated during dry afternoons with low humidity.
        </div>
      </div>

      <CDProvenance source="NOAA/NDMC U.S. Drought Monitor" updated="Thursdays at 8:30 AM ET · next Apr 24" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. River Hydrograph — AHPS gauges
// ─────────────────────────────────────────────────────────────
function RiverScreen() {
  const stages = { action: 8, minor: 10, moderate: 12, major: 14 };
  const current = 6.4;
  // 14-day hydrograph data
  const data = [5.2, 5.4, 5.8, 6.1, 5.9, 5.7, 6.0, 6.4, 7.1, 8.2, 9.0, 8.6, 7.8, 7.0, 6.4];
  const forecast = [6.4, 6.2, 6.0, 5.9, 5.7, 5.5];
  const W = 340, H = 140, pad = 14;
  const all = [...data, ...forecast];
  const lo = 0, hi = 16;
  const x = (i) => pad + (i / (all.length - 1)) * (W - pad * 2);
  const y = (v) => pad + (1 - (v - lo) / (hi - lo)) * (H - pad * 2);
  const obsPath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const fcstPath = forecast.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(data.length - 1 + i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="River · Northwest Branch at Colesville" title="6.4 ft · below action stage"
        byline="Crest 9.0 ft on Apr 16 · receding · no flood threat" />

      {/* Current */}
      <div style={{ padding: '18px 22px 8px', display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <div>
          <div style={{ fontSize: 54, fontWeight: 300, letterSpacing: -2, fontFamily: CD.mono, lineHeight: 1 }}>{current}<span style={{ fontSize: 20, color: CD.inkMute, marginLeft: 4 }}>ft</span></div>
          <div style={{ fontSize: 12, color: CD.inkMute, fontFamily: CD.mono, marginTop: 4 }}>Stage · observed 1:30 PM</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: CD.inkSoft, lineHeight: 1.45 }}>
            Receding from Wednesday's crest. Forecast to continue falling through the weekend.
          </div>
        </div>
      </div>

      {/* Hydrograph */}
      <div style={{ padding: '10px 22px 6px' }}>
        <div style={{ fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>14-day hydrograph</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          {/* flood stage bands */}
          {[
            { t: hi, b: stages.major, c: '#a81e5b15', label: 'Major' },
            { t: stages.major, b: stages.moderate, c: '#d63a2f15', label: 'Moderate' },
            { t: stages.moderate, b: stages.minor, c: '#e8701e15', label: 'Minor' },
            { t: stages.minor, b: stages.action, c: '#d4a01720', label: 'Action' },
          ].map((band, i) => (
            <g key={i}>
              <rect x={pad} y={y(band.t)} width={W - pad * 2} height={y(band.b) - y(band.t)} fill={band.c}/>
              <text x={W - pad - 3} y={y(band.t) + 10} fontSize="8.5" fontFamily={CD.mono} fill={CD.inkMute} textAnchor="end">{band.label}</text>
            </g>
          ))}
          {/* grid lines for stages */}
          {Object.entries(stages).map(([name, val], i) => (
            <line key={name} x1={pad} y1={y(val)} x2={W - pad} y2={y(val)} stroke={CD.line} strokeDasharray="2 3"/>
          ))}
          {/* y axis ticks */}
          {[0,4,8,12,16].map(v => (
            <g key={v}>
              <text x={4} y={y(v) + 3} fontSize="9" fontFamily={CD.mono} fill={CD.inkMute}>{v}ft</text>
            </g>
          ))}
          {/* observed */}
          <path d={obsPath} fill="none" stroke={CD.ink} strokeWidth="1.8" strokeLinejoin="round"/>
          {/* forecast */}
          <path d={fcstPath} fill="none" stroke={CD.blue} strokeWidth="1.8" strokeDasharray="4 3" strokeLinejoin="round"/>
          {/* vertical "now" line */}
          <line x1={x(data.length - 1)} y1={pad} x2={x(data.length - 1)} y2={H - pad} stroke={CD.ink} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
          <text x={x(data.length - 1)} y={H - 2} fontSize="8.5" fontFamily={CD.mono} fill={CD.inkMute} textAnchor="middle">now</text>
          {/* legend */}
          <g transform="translate(14, 16)">
            <line x1="0" y1="0" x2="14" y2="0" stroke={CD.ink} strokeWidth="1.8"/>
            <text x="18" y="3" fontSize="9" fontFamily={CD.mono} fill={CD.inkSoft}>Observed</text>
            <line x1="78" y1="0" x2="92" y2="0" stroke={CD.blue} strokeWidth="1.8" strokeDasharray="4 3"/>
            <text x="96" y="3" fontSize="9" fontFamily={CD.mono} fill={CD.inkSoft}>Forecast</text>
          </g>
        </svg>
      </div>

      {/* Flood stage table */}
      <div style={{ padding: '14px 22px 6px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Flood stages</div>
      <div style={{ padding: '0 22px' }}>
        {[
          { name: 'Action',   val: 8.0,  color: '#d4a017', note: 'Mitigation begins' },
          { name: 'Minor',    val: 10.0, color: '#e8701e', note: 'Low-lying property' },
          { name: 'Moderate', val: 12.0, color: '#d63a2f', note: 'Road closures possible' },
          { name: 'Major',    val: 14.0, color: '#a81e5b', note: 'Structural damage' },
        ].map((s, i) => (
          <div key={s.name} style={{ padding: '9px 0', borderBottom: i < 3 ? `1px solid ${CD.line}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 18, background: s.color, borderRadius: 2 }} />
            <div style={{ fontSize: 13, fontWeight: 500, width: 80 }}>{s.name}</div>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: CD.mono, width: 48 }}>{s.val} ft</div>
            <div style={{ fontSize: 11.5, color: CD.inkSoft, flex: 1 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <CDProvenance source="NOAA/NWS Advanced Hydrologic Prediction Service" sensor="USGS 01651000 · Colesville, MD" updated="1:30 PM · 15-min refresh" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. Earthquake — USGS recent
// ─────────────────────────────────────────────────────────────
function EarthquakeScreen() {
  const quakes = [
    { mag: 2.4, depth: 8.2,  place: '3 km NE of Summit, NJ',      ago: '14 min ago',  dist: '198 mi NE',  felt: false },
    { mag: 1.8, depth: 4.1,  place: '5 km W of Plum Point, MD',   ago: '2 hr ago',   dist: '38 mi SE',   felt: true,  reports: 12 },
    { mag: 3.1, depth: 12.4, place: '8 km NNW of Mineral, VA',    ago: '1 day ago',  dist: '108 mi SW',  felt: true,  reports: 143 },
    { mag: 2.2, depth: 6.8,  place: '2 km S of Kings Park, NY',   ago: '2 days ago', dist: '246 mi NE',  felt: false },
    { mag: 4.0, depth: 18.2, place: '12 km SE of New Madrid, MO', ago: '4 days ago', dist: '768 mi W',   felt: false, reports: 2840 },
  ];
  const MagColor = (m) => m >= 4 ? '#d63a2f' : m >= 3 ? '#e8701e' : m >= 2 ? '#d4a017' : CD.inkSoft;
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="Earthquakes · USGS" title="M1.8 felt near Plum Point, MD"
        byline="Closest felt quake today · 38 mi SE · 2 hours ago" />

      {/* Regional map */}
      <div style={{ margin: '18px 22px 10px', height: 200, borderRadius: 12, overflow: 'hidden', background: '#f1efe9', border: `1px solid ${CD.line}`, position: 'relative' }}>
        <svg viewBox="0 0 320 200" width="100%" height="100%" style={{ display: 'block' }}>
          {/* faint base */}
          <rect width="320" height="200" fill="#ebe5d5"/>
          {/* coastline sketch */}
          <path d="M40 60 L80 50 L120 55 L160 40 L200 50 L240 80 L260 120 L250 160 L220 180 L180 170 L140 180 L100 170 L60 150 L30 110 Z" fill="#d4cdb8" stroke="#a89e80" strokeWidth="0.8"/>
          <path d="M120 55 L135 60 L140 75 L130 80 Z M200 50 L215 55 L220 68 L205 72 Z" fill="#b8b09a" stroke="#a89e80" strokeWidth="0.6"/>
          {/* grid */}
          {[0,1,2,3].map(i => <line key={'h'+i} x1="0" y1={50+i*40} x2="320" y2={50+i*40} stroke="#d4cdb8" strokeWidth="0.3"/>)}
          {/* quake markers */}
          {[
            { cx: 220, cy: 50, m: 2.4 }, { cx: 170, cy: 110, m: 1.8 },
            { cx: 130, cy: 140, m: 3.1 }, { cx: 240, cy: 70, m: 2.2 },
            { cx: 40, cy: 155, m: 4.0 },
          ].map((q, i) => (
            <g key={i}>
              <circle cx={q.cx} cy={q.cy} r={q.m * 3 + 2} fill={MagColor(q.m)} opacity="0.2"/>
              <circle cx={q.cx} cy={q.cy} r={q.m * 1.5 + 2} fill={MagColor(q.m)} stroke="#fff" strokeWidth="1"/>
              <text x={q.cx} y={q.cy + 3} fontSize="8" fontFamily={CD.mono} fontWeight="700" fill="#fff" textAnchor="middle">{q.m}</text>
            </g>
          ))}
          {/* user */}
          <g transform="translate(165,100)">
            <circle r="5" fill="#fff" stroke={CD.ink} strokeWidth="1.5"/>
            <circle r="2" fill={CD.ink}/>
          </g>
        </svg>
        <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 10, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1, fontWeight: 600 }}>PAST 7 DAYS · M1.5+</div>
      </div>

      {/* Feed */}
      <div style={{ padding: '8px 22px 4px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Recent · within 800 mi</div>
      <div style={{ padding: '0 22px' }}>
        {quakes.map((q, i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: i < quakes.length - 1 ? `1px solid ${CD.line}` : 'none', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: MagColor(q.mag),
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, fontFamily: CD.mono, flexShrink: 0,
            }}>{q.mag}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.3 }}>{q.place}</div>
              <div style={{ fontSize: 11.5, color: CD.inkMute, fontFamily: CD.mono, marginTop: 3 }}>
                Depth {q.depth} km · {q.dist} · {q.ago}
              </div>
              {q.felt && (
                <div style={{ fontSize: 10.5, color: CD.blue, fontFamily: CD.mono, marginTop: 4, fontWeight: 600 }}>
                  ✓ {q.reports} "Did You Feel It?" reports
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CDProvenance source="USGS Earthquake Hazards Program" updated="Continuous · 1-min latency" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. Tsunami advisory — calm/active states
// ─────────────────────────────────────────────────────────────
function TsunamiScreen() {
  const active = true; // show active state for design
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: active ? '#1a1613' : CD.paper, fontFamily: CD.font, color: active ? CD.paper : CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />

      {active ? (
        <>
          {/* Active advisory header */}
          <div style={{ padding: '18px 22px 10px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px', border: `1px solid ${CD.advisory}`, borderRadius: 4, background: `${CD.advisory}18` }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: CD.advisory, animation: 'sb-pulse 2s infinite' }}/>
              <div style={{ fontSize: 10, fontFamily: CD.mono, letterSpacing: 1.5, fontWeight: 700, color: CD.advisory }}>TSUNAMI ADVISORY · ACTIVE</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 14, textWrap: 'balance', lineHeight: 1.15 }}>
              Strong currents and dangerous waves for U.S. Pacific coast beaches
            </div>
            <div style={{ fontSize: 13, color: 'rgba(242,237,227,0.65)', marginTop: 8, lineHeight: 1.4 }}>
              Issued by NTWC at 7:14 PM PDT · Source: M7.4 earthquake off Kamchatka, Russia
            </div>
          </div>

          {/* Your location status */}
          <div style={{ margin: '14px 22px', padding: 16, background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 12 }}>
            <div style={{ fontSize: 10, fontFamily: CD.mono, letterSpacing: 1.5, color: 'rgba(242,237,227,0.55)', fontWeight: 600 }}>YOUR LOCATION</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Silver Spring, MD — 2,630 mi inland</div>
            <div style={{ fontSize: 13, color: 'rgba(242,237,227,0.65)', marginTop: 8, lineHeight: 1.45 }}>
              <b style={{ color: '#7a9e5e' }}>No threat.</b> This advisory is informational for your location. You have saved a location in Oregon — see coastal impact below.
            </div>
          </div>

          {/* Coastal saved-location impact */}
          <div style={{ padding: '4px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: 'rgba(242,237,227,0.55)', letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Saved locations at risk</div>
          <div style={{ padding: '0 22px' }}>
            <div style={{ padding: 14, background: 'rgba(228,112,30,0.1)', border: `1px solid ${CD.watch}55`, borderRadius: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: CD.watch }}/>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Cannon Beach, OR</div>
              </div>
              <div style={{ fontSize: 12.5, color: 'rgba(242,237,227,0.7)', marginTop: 8, lineHeight: 1.45 }}>
                First wave expected <b style={{ color: CD.paper }}>9:48 PM PDT</b> (in 2h 14m). Projected amplitude 1.2–2.4 ft. Strong currents, dangerous rip tides. <b style={{ color: CD.paper }}>Stay off the beach.</b>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <div style={{ padding: '6px 10px', background: CD.warning, color: '#fff', fontSize: 12, fontWeight: 600, borderRadius: 6 }}>What to do →</div>
                <div style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.1)', fontSize: 12, fontWeight: 500, borderRadius: 6 }}>Full advisory</div>
              </div>
            </div>
          </div>

          {/* Wave arrival timeline */}
          <div style={{ padding: '18px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: 'rgba(242,237,227,0.55)', letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Pacific coast arrival</div>
          <div style={{ padding: '0 22px' }}>
            {[
              { loc: 'Hilo, HI',      t: '8:22 PM', amp: '3.1 ft', pri: true },
              { loc: 'Crescent City, CA', t: '9:14 PM', amp: '2.4 ft', pri: true },
              { loc: 'Cannon Beach, OR', t: '9:48 PM', amp: '1.8 ft', pri: true },
              { loc: 'Port Angeles, WA', t: '10:22 PM', amp: '0.9 ft' },
              { loc: 'San Diego, CA', t: '10:58 PM', amp: '1.1 ft' },
            ].map((w, i, arr) => (
              <div key={i} style={{ padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid rgba(242,237,227,0.08)` : 'none', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 500, flex: 1, opacity: w.pri ? 1 : 0.75 }}>{w.loc}</div>
                <div style={{ fontSize: 12, fontFamily: CD.mono, color: 'rgba(242,237,227,0.65)', width: 80, textAlign: 'right' }}>{w.t}</div>
                <div style={{ fontSize: 13, fontFamily: CD.mono, fontWeight: 700, color: w.pri ? CD.watch : 'rgba(242,237,227,0.7)', width: 60, textAlign: 'right' }}>{w.amp}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '22px 22px 8px', fontSize: 11, fontFamily: CD.mono, color: 'rgba(242,237,227,0.4)', letterSpacing: 0.5 }}>
            ◇ Source · National Tsunami Warning Center (NTWC) / Pacific Tsunami Warning Center<br/>
            Issued 7:14 PM PDT · refreshed every 10 min
          </div>
        </>
      ) : (
        <>
          <CDHeader kicker="Tsunami · NTWC" title="No active tsunami threats"
            byline="All U.S. Pacific and Atlantic coasts · last seismic event: M5.2, no threat" />
          <div style={{ padding: '28px 22px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, color: CD.inkMute, marginBottom: 12 }}>◇</div>
            <div style={{ fontSize: 14, color: CD.inkSoft, lineHeight: 1.5 }}>
              Tsunami warnings are issued only for real threats. Skybureau will push an alert to your lock screen if that changes.
            </div>
          </div>
          <CDProvenance source="NOAA/NWS · National Tsunami Warning Center" updated="Continuous monitoring" />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. Climate normals — today vs. 30-year avg
// ─────────────────────────────────────────────────────────────
function ClimateScreen() {
  const monthData = Array.from({ length: 30 }, (_, i) => {
    // synthetic: current month running 3-5°F warmer
    const normal = 62 + Math.sin(i / 5) * 3;
    const actual = normal + 2 + Math.sin(i / 3.5) * 3 + (Math.random() - 0.5) * 2;
    return { day: i + 1, normal, actual };
  });
  const W = 340, H = 140, pad = 18;
  const allT = monthData.flatMap(d => [d.normal, d.actual]);
  const lo = Math.floor(Math.min(...allT) - 2);
  const hi = Math.ceil(Math.max(...allT) + 2);
  const x = (i) => pad + (i / (monthData.length - 1)) * (W - pad * 2);
  const y = (v) => pad + (1 - (v - lo) / (hi - lo)) * (H - pad * 2);
  const normalPath = monthData.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.normal).toFixed(1)}`).join(' ');
  const actualPath = monthData.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.actual).toFixed(1)}`).join(' ');
  const anomalyPath = monthData.map((d, i) => {
    const yv = d.actual > d.normal ? y(d.actual) : y(d.normal);
    return `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${yv.toFixed(1)}`;
  }).join(' ');
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CD.paper, fontFamily: CD.font, color: CD.ink, paddingBottom: 90 }}>
      <div style={{ height: 54 }} />
      <CDHeader kicker="Climate · Today vs. normal" title="April is running 3.4°F warmer than normal"
        byline="30-day anomaly · 23 of 30 days above the 1991–2020 baseline" />

      {/* Temperature anomaly chart */}
      <div style={{ padding: '18px 22px 8px' }}>
        <div style={{ fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Temperature · this month</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d63a2f" stopOpacity="0.35"/>
              <stop offset="1" stopColor="#d63a2f" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          {/* baseline shading */}
          {monthData.map((d, i) => {
            if (d.actual <= d.normal) return null;
            const next = monthData[i + 1];
            if (!next) return null;
            return (
              <path key={i}
                d={`M${x(i)},${y(d.normal)} L${x(i)},${y(d.actual)} L${x(i+1)},${y(next.actual)} L${x(i+1)},${y(next.normal)} Z`}
                fill="url(#warm)"/>
            );
          })}
          {/* grid lines */}
          {Array.from({length: 4}).map((_, i) => {
            const v = lo + (i * (hi - lo) / 3);
            return <line key={i} x1={pad} y1={y(v)} x2={W-pad} y2={y(v)} stroke={CD.line} strokeDasharray="2 3"/>;
          })}
          {/* normal line */}
          <path d={normalPath} fill="none" stroke={CD.inkMute} strokeWidth="1.3" strokeDasharray="3 3"/>
          {/* actual line */}
          <path d={actualPath} fill="none" stroke={CD.ink} strokeWidth="1.8" strokeLinejoin="round"/>
          {/* legend */}
          <g transform="translate(14, 14)">
            <line x1="0" y1="0" x2="14" y2="0" stroke={CD.ink} strokeWidth="1.8"/>
            <text x="18" y="3" fontSize="9" fontFamily={CD.mono} fill={CD.inkSoft}>Observed</text>
            <line x1="78" y1="0" x2="92" y2="0" stroke={CD.inkMute} strokeWidth="1.3" strokeDasharray="3 3"/>
            <text x="96" y="3" fontSize="9" fontFamily={CD.mono} fill={CD.inkSoft}>1991–2020 normal</text>
          </g>
        </svg>
        <div style={{ display: 'flex', fontSize: 9.5, fontFamily: CD.mono, color: CD.inkMute, marginTop: 4 }}>
          <div style={{ flex: 1 }}>Apr 1</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Apr 15</div>
          <div style={{ flex: 0.5, textAlign: 'right' }}>Today</div>
        </div>
      </div>

      {/* Key anomalies grid */}
      <div style={{ padding: '18px 22px 4px', fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase' }}>Anomalies this month</div>
      <div style={{ padding: '0 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'AVG TEMP', val: '+3.4°F', sub: 'vs. 1991–2020', color: '#d63a2f' },
          { label: 'PRECIP',  val: '−1.8″',  sub: '52% of normal', color: '#d4a017' },
          { label: 'HOT DAYS', val: '6',     sub: '≥80°F · normal 2', color: '#d63a2f' },
          { label: 'COOL NIGHTS', val: '3',  sub: '≤40°F · normal 8', color: '#4a7eb3' },
          { label: 'FIRST LEAF', val: '11d early', sub: 'vs. 20-yr avg', color: '#6a8e4e' },
          { label: 'LAST FROST', val: 'Mar 28', sub: '14d early', color: '#6a8e4e' },
        ].map((s) => (
          <div key={s.label} style={{ padding: '11px 13px', background: '#fff', border: `1px solid ${CD.line}`, borderRadius: 9 }}>
            <div style={{ fontSize: 9.5, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 3, color: s.color, fontFamily: CD.mono }}>{s.val}</div>
            <div style={{ fontSize: 10.5, color: CD.inkSoft, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Long-term context */}
      <div style={{ padding: '20px 22px 4px' }}>
        <div style={{ fontSize: 11, fontFamily: CD.mono, color: CD.inkMute, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Long-term context</div>
        <div style={{ padding: '14px 16px', background: CD.paperSoft, borderRadius: 8, fontSize: 13, color: CD.inkSoft, lineHeight: 1.5 }}>
          Aprils in Montgomery County have warmed by <b style={{ color: CD.ink }}>+2.1°F</b> per century since 1895. Growing season starts <b style={{ color: CD.ink }}>18 days earlier</b> than it did in the 1970s.
        </div>
      </div>

      <CDProvenance source="NOAA NCEI · nClimGrid · NWS Climate Normals (1991–2020)" updated="Daily · station LWX (KDCA)" />
    </div>
  );
}

Object.assign(window, {
  AirQualityScreen, WildfireScreen, DroughtScreen, RiverScreen,
  EarthquakeScreen, TsunamiScreen, ClimateScreen,
});
