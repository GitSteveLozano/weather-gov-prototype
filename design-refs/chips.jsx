/* global React, SB_TOKENS, WxIcon */
// Contextual chip system for Skybureau.
//
// A chip promotes a civic/context screen onto Home when it earns its place.
// Three tiers:
//  - Tier 1 · Baseline: always shown (moon, seasonal-next)
//  - Tier 2 · Conditional: shown only when trigger fires
//  - Tier 3 · Seasonal/Planning: rotate in by calendar
//
// Each chip carries its trigger logic as a comment so the rule set is auditable.

const CT = SB_TOKENS;

// Small leading glyphs for chips. Keep flat and calm.
const GlyphMoon = ({ phase = 0.87 }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" fill={CT.ink} opacity="0.15" />
    <path d={`M 8 1.5 A 6.5 6.5 0 0 1 8 14.5 A ${6.5 * (phase - 0.5) * 2} 6.5 0 0 ${phase > 0.5 ? 0 : 1} 8 1.5`}
          fill={CT.ink} />
  </svg>
);
const GlyphFlood = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 10c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5"
          stroke={CT.blue} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1 13c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5"
          stroke={CT.blue} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <path d="M6 2l2 5 2-5" stroke={CT.ink} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const GlyphAurora = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 13c1-7 2-9 4-9s3 2 4 9M5 13c.7-4 1.4-5 2-5s1.5 1 2 5"
          stroke="#6a8f6a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path d="M11 13c.6-5 1-7 2-7s1.5 2 2 7"
          stroke="#4f7a88" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
);
const GlyphPollen = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke={CT.ink} strokeWidth="1.3"/>
    <circle cx="8" cy="2.5" r="1.1" fill="#c9a227"/>
    <circle cx="8" cy="13.5" r="1.1" fill="#c9a227"/>
    <circle cx="2.5" cy="8" r="1.1" fill="#c9a227"/>
    <circle cx="13.5" cy="8" r="1.1" fill="#c9a227"/>
  </svg>
);
const GlyphFire = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2c.8 2.4 3 3.6 3 6.8a3 3 0 1 1-6 0C5 7 6 6 6 4.5 6.3 5.7 7 6 8 2z"
          stroke="#b8572c" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
  </svg>
);
const GlyphAQI = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8h3M8 5v6M14 8h-3M5 11h6M5 5h6"
          stroke="#e8701e" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const GlyphHeat = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="6.5" y="2" width="3" height="8" rx="1.5" stroke="#d63a2f" strokeWidth="1.3"/>
    <circle cx="8" cy="12" r="2.5" fill="#d63a2f"/>
    <line x1="8" y1="7" x2="8" y2="12" stroke="#d63a2f" strokeWidth="1.3"/>
  </svg>
);
const GlyphSmoke = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 10c3 0 2-2 5-2s2 2 5 2M2 13c3 0 2-2 5-2s2 2 5 2"
          stroke="#8a8278" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 3l2-1 2 1" stroke="#b8572c" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const GlyphAnomaly = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 13l3-4 3 2 5-7" stroke={CT.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M10 4h3v3" stroke={CT.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const GlyphDrought = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2c2 3.5 4 5.5 4 8.5a4 4 0 1 1-8 0C4 7.5 6 5.5 8 2z"
          stroke="#d4a017" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
    <path d="M6 10c0-1.5.4-2 1-2.5" stroke="#d4a017" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const GlyphQuake = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8h1.5l1.5-4 2 8 2-11 2 10 1.5-3H15"
          stroke={CT.ink} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
  </svg>
);
const GlyphSPC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 11l3-6 2 4 3-2"
          stroke="#e8701e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="4" r="1.5" fill="#e8701e"/>
  </svg>
);
const GlyphSeasonal = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.5 1.5M10.5 10.5L12 12M12 4l-1.5 1.5M5.5 10.5L4 12"
          stroke="#b8572c" strokeWidth="1.1" strokeLinecap="round"/>
    <circle cx="8" cy="8" r="2.5" stroke="#b8572c" strokeWidth="1.3"/>
  </svg>
);
const GlyphHurricane = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 4c-3 0-4 1.5-4 3s1 2 3 2M8 12c3 0 4-1.5 4-3s-1-2-3-2"
          stroke="#d63a2f" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <circle cx="8" cy="8" r="1.2" fill="#d63a2f"/>
  </svg>
);
const GlyphWinter = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12M3.5 3.5l9 9M12.5 3.5l-9 9"
          stroke="#4f7a88" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Chip primitive
// ─────────────────────────────────────────────────────────────
function Chip({ glyph, label, value, accent, size = 'sm' }) {
  const padY = size === 'sm' ? 9 : 11;
  const padX = size === 'sm' ? 11 : 13;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: `${padY}px ${padX}px`,
      background: CT.paperSoft, border: `1px solid ${CT.line}`,
      borderRadius: 999, cursor: 'pointer', flexShrink: 0,
      minHeight: size === 'sm' ? 36 : 42,
    }}>
      <div style={{ flexShrink: 0, display: 'flex' }}>{glyph}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, lineHeight: 1 }}>
        <div style={{ fontSize: 10, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>
          {label}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: accent || CT.ink, fontFamily: CT.mono, letterSpacing: -0.1 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// Grid-style tile (larger, used on Dive)
function ContextTile({ glyph, label, value, meta, accent }) {
  return (
    <div style={{
      background: CT.paperSoft, border: `1px solid ${CT.line}`, borderRadius: 10,
      padding: '12px 12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4,
      minHeight: 78,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {glyph}
        <div style={{ fontSize: 10, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>
          {label}
        </div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: accent || CT.ink, letterSpacing: -0.2, marginTop: 2 }}>
        {value}
      </div>
      {meta && (
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute, marginTop: 'auto', paddingTop: 4 }}>
          {meta}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NearbyNow — horizontal strip for DepthScan.
// Scenario: rainy day, pollen moderate, moderate drought,
// user is near an NWR river gauge. All these happen to qualify.
// ─────────────────────────────────────────────────────────────
function NearbyNowStrip() {
  const chips = [
    // Tier 1 · baseline
    { key: 'moon', glyph: <GlyphMoon />, label: 'Moon · tonight', value: 'Waxing gibbous · 87%' },
    // Tier 2 · conditional (rain forecast in 6h → flood chip qualifies)
    { key: 'flood', glyph: <GlyphFlood />, label: 'Flood risk · your street', value: 'Elevated', accent: '#b8572c' },
    // Tier 2 · pollen season + moderate
    { key: 'pollen', glyph: <GlyphPollen />, label: 'Pollen', value: 'Mod · oak, grass' },
    // Tier 2 · drought D1
    { key: 'drought', glyph: <GlyphDrought />, label: 'Drought', value: 'D1 · Moderate', accent: '#d4a017' },
    // Tier 3 · seasonal (last week of month)
    { key: 'seasonal', glyph: <GlyphSeasonal />, label: 'Seasonal · next 30d', value: 'Warmer · wetter' },
  ];
  return (
    <div style={{ padding: '4px 0 8px' }}>
      <div style={{ padding: '0 22px 8px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>
          Nearby &amp; now
        </div>
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute }}>
          {chips.length} · <span style={{ color: CT.blue, fontWeight: 600 }}>see all →</span>
        </div>
      </div>
      <div className="sb-scroll" style={{ overflowX: 'auto', padding: '2px 22px 4px' }}>
        <div style={{ display: 'flex', gap: 8, minWidth: 'max-content' }}>
          {chips.map(c => (
            <Chip key={c.key} glyph={c.glyph} label={c.label} value={c.value} accent={c.accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ContextToday — dense grid for DepthDive.
// Shows everything qualifying right now, grouped.
// ─────────────────────────────────────────────────────────────
function ContextTodayGrid() {
  return (
    <div style={{ padding: '18px 14px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>
          Context today · 9 active
        </div>
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.blue, fontWeight: 600, cursor: 'pointer' }}>
          Settings →
        </div>
      </div>

      {/* Group 1: Baseline (always) */}
      <div style={{ fontSize: 9.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>
        BASELINE
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        <ContextTile glyph={<GlyphMoon />} label="Moon" value="Waxing gibbous" meta="87% · sets 4:12 AM" />
        <ContextTile glyph={<GlyphSeasonal />} label="Seasonal" value="Warmer, wetter" meta="CPC · next 30d" />
      </div>

      {/* Group 2: Conditional (triggered now) */}
      <div style={{ fontSize: 9.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>
        TRIGGERED NOW
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        <ContextTile glyph={<GlyphFlood />} label="Flood risk" value="Elevated" meta="Your street · rain in 6h" accent="#b8572c" />
        <ContextTile glyph={<GlyphPollen />} label="Pollen" value="Moderate" meta="Oak 6.2 · grass 4.1" />
        <ContextTile glyph={<GlyphDrought />} label="Drought" value="D1 Moderate" meta="Since Aug · 40% of normal" accent="#d4a017" />
        <ContextTile glyph={<GlyphAnomaly />} label="vs. normal" value="+3.4°F" meta="Today vs. 30-yr avg" />
        <ContextTile glyph={<GlyphSPC />} label="Severe risk" value="Slight (SLGT)" meta="SPC · this afternoon" accent="#e8701e" />
        <ContextTile glyph={<GlyphAQI />} label="Air quality" value="82 Moderate" meta="PM2.5 · sensitive groups" accent="#e8701e" />
      </div>

      {/* Group 3: Pinned by user */}
      <div style={{ fontSize: 9.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>
        PINNED
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <ContextTile glyph={<GlyphQuake />} label="Earthquakes" value="None recent" meta="M4+ · last 48h · within 300mi" />
      </div>

      {/* Hidden explanation */}
      <div style={{
        marginTop: 18, padding: '12px 14px', background: '#fff', border: `1px dashed ${CT.line}`, borderRadius: 8,
      }}>
        <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
          Hidden right now
        </div>
        <div style={{ fontSize: 12, color: CT.inkSoft, lineHeight: 1.5 }}>
          Aurora (Kp 2, below visible), Fire danger (RH 54%, low),
          Heat risk (low), Smoke (no plume), Hurricane (off-season for region).
          Long-press any chip to ask "why am I seeing this?"
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChipLogicDoc — canvas-only artboard documenting the rules
// ─────────────────────────────────────────────────────────────
function ChipLogicDoc() {
  const row = (tier, tone, glyph, label, rule, ex) => ({ tier, tone, glyph, label, rule, ex });
  const rules = [
    // Baseline
    row('Baseline', '#2d2a24', <GlyphMoon />, 'Moon', 'Always shown', 'phase · rise/set'),
    row('Baseline', '#2d2a24', <GlyphSeasonal />, 'Seasonal · next 30d', 'Always shown', 'CPC outlook'),
    // Conditional
    row('Conditional', '#b8572c', <GlyphFlood />, 'Flood risk · your street', 'Rain forecast ≥ 0.25" in 24h AND address in any flood tier', 'Elevated · Low'),
    row('Conditional', '#b8572c', <GlyphAurora />, 'Aurora', 'Latitude ≥ 40°N AND Kp ≥ 4 AND nighttime', 'Visible · Strong Kp 6'),
    row('Conditional', '#b8572c', <GlyphPollen />, 'Pollen', 'In pollen season for climate zone AND count ≥ low-mod', 'Mod · oak, grass'),
    row('Conditional', '#b8572c', <GlyphFire />, 'Fire danger', 'RH < 30% OR red-flag watch active OR fire-prone region', 'Very high'),
    row('Conditional', '#b8572c', <GlyphAQI />, 'Air quality', 'AQI ≥ 75 (mod+) OR user pinned', '118 USG'),
    row('Conditional', '#b8572c', <GlyphHeat />, 'Heat / cold stress', 'HeatRisk ≥ moderate OR wind chill < 20°F', 'Major heat risk'),
    row('Conditional', '#b8572c', <GlyphSmoke />, 'Smoke', 'HRRR-Smoke plume AQI impact at address ≥ 75', 'Thick · PM2.5 215'),
    row('Conditional', '#b8572c', <GlyphAnomaly />, 'Today vs. normal', '|Today anomaly| ≥ ±5°F from 30-yr normal', '+12°F · coldest in 8y'),
    row('Conditional', '#b8572c', <GlyphDrought />, 'Drought', 'D1+ at location', 'D2 Severe'),
    row('Conditional', '#b8572c', <GlyphQuake />, 'Earthquakes', 'M4+ within 300mi in past 48h', 'M4.2 · 180mi SW'),
    row('Conditional', '#b8572c', <GlyphSPC />, 'SPC outlook', 'Categorical risk ≥ MRGL for user\'s area', 'Moderate (MDT)'),
    // Seasonal/Planning
    row('Planning', '#4f7a88', <GlyphHurricane />, 'Hurricane center', 'Jun 1 – Nov 30 AND user in coastal / affected region', 'Active: Hurricane Ida'),
    row('Planning', '#4f7a88', <GlyphWinter />, 'Winter', 'Nov – Mar AND user in snow climate', '3 ft snowpack · opens'),
  ];

  const byTier = {
    Baseline: rules.filter(r => r.tier === 'Baseline'),
    Conditional: rules.filter(r => r.tier === 'Conditional'),
    Planning: rules.filter(r => r.tier === 'Planning'),
  };

  const tierDesc = {
    Baseline: 'Always shown. Safe curiosity-level info everyone wants.',
    Conditional: 'Only shown when the trigger fires. Keeps the surface calm.',
    Planning: 'Calendar-driven. Surfaces during a season or region match.',
  };

  return (
    <div style={{
      width: '100%', height: '100%', background: CT.paper, padding: '40px 48px 32px',
      fontFamily: CT.font, color: CT.ink, boxSizing: 'border-box', overflow: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontFamily: CT.mono, color: CT.inkMute, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          Context chips · promotion logic
        </div>
        <div style={{ fontSize: 11, fontFamily: CT.mono, color: CT.inkMute }}>
          shown on Home · DepthScan (strip) · DepthDive (grid)
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6, marginTop: 4 }}>
        Chips are earned, not defaulted.
      </div>
      <div style={{ fontSize: 14, color: CT.inkSoft, marginTop: 6, maxWidth: 920, lineHeight: 1.5 }}>
        The everyday user opens Skybureau and sees a calm surface. A chip only appears when its trigger fires —
        a dead "Aurora · not visible" chip is noise. Every chip deep-links to its full civic-data screen.
        More remains the canonical door for anything not surfaced today.
      </div>

      {/* Three tier columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 24, marginTop: 28 }}>
        {['Baseline', 'Conditional', 'Planning'].map(tier => {
          const items = byTier[tier];
          const tone = items[0].tone;
          return (
            <div key={tier}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: tone }} />
                <div style={{ fontSize: 11, fontFamily: CT.mono, letterSpacing: 1.4, textTransform: 'uppercase', fontWeight: 700 }}>
                  {tier === 'Baseline' ? 'Tier 1 · Baseline' : tier === 'Conditional' ? 'Tier 2 · Conditional' : 'Tier 3 · Planning'}
                </div>
              </div>
              <div style={{ fontSize: 12, color: CT.inkSoft, marginBottom: 14, lineHeight: 1.45 }}>
                {tierDesc[tier]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, padding: '10px 12px',
                    background: '#fff', border: `1px solid ${CT.line}`, borderRadius: 8,
                  }}>
                    <div style={{ flexShrink: 0, paddingTop: 1 }}>{r.glyph}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: -0.1 }}>{r.label}</div>
                      <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: CT.inkMute, marginTop: 2, lineHeight: 1.4 }}>
                        {r.rule}
                      </div>
                      <div style={{ fontSize: 10.5, fontFamily: CT.mono, color: r.tone, marginTop: 3, fontWeight: 600 }}>
                        e.g. {r.ex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote rules */}
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          ['Empty-state rule', 'If fewer than 2 conditional chips qualify, the strip collapses to baseline + "More →". No padding, no fake chips.'],
          ['User override', 'Settings → Context chips lets the user pin specific chips so they show regardless of triggers. Defaults are thoughtful, overrides are respected.'],
          ['Why am I seeing this?', 'Long-press any chip opens an inline explanation: the trigger that fired, the data source, and a "hide" shortcut.'],
        ].map(([h, body]) => (
          <div key={h} style={{
            padding: '14px 16px', background: '#fff', border: `1px solid ${CT.line}`, borderRadius: 10,
          }}>
            <div style={{ fontSize: 11, fontFamily: CT.mono, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 700, color: CT.ink }}>
              {h}
            </div>
            <div style={{ fontSize: 12.5, color: CT.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
              {body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { NearbyNowStrip, ContextTodayGrid, ChipLogicDoc });
