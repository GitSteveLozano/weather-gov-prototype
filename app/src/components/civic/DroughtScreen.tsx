import './DroughtScreen.css';

interface Props {
  onBack: () => void;
}

const levels = [
  { id: 'None', color: '#efe9dd', label: 'None' },
  { id: 'D0', color: '#f6e8a8', label: 'Abnormally dry' },
  { id: 'D1', color: '#e5b85a', label: 'Moderate' },
  { id: 'D2', color: '#d4843a', label: 'Severe' },
  { id: 'D3', color: '#b84a2a', label: 'Extreme' },
  { id: 'D4', color: '#7a1e1a', label: 'Exceptional' },
];

const weeks = [
  { w: '12 wk ago', level: 'None' },
  { w: '9 wk', level: 'None' },
  { w: '6 wk', level: 'D0' },
  { w: '3 wk', level: 'D0' },
  { w: 'Last', level: 'D0' },
  { w: 'Now', level: 'D1' },
];

const indicators = [
  { label: 'PRECIP · 90 DAY', value: '11.2″', note: '−3.8″ vs. normal' },
  { label: 'PRECIP · 30 DAY', value: '1.9″', note: '−1.6″ vs. normal' },
  { label: 'STREAMFLOW', value: '18th %', note: 'Potomac at Little Falls' },
  { label: 'SOIL MOIST.', value: '34%', note: 'Top 40cm · dry' },
  { label: 'GROUNDWATER', value: 'Normal', note: 'Slow to respond' },
  { label: 'SPI-3', value: '−1.2', note: 'Moderately dry' },
];

const current = 'D1';

export function DroughtScreen({ onBack }: Props) {
  return (
    <div className="civ-dr sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-dr-nav">
        <button className="civ-dr-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-dr-nav-title">Drought</div>
        <div className="civ-dr-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-dr-header">
        <div className="civ-dr-kicker">Drought &middot; U.S. Drought Monitor</div>
        <div className="civ-dr-title">Moderate drought &middot; worsening</div>
        <div className="civ-dr-byline">Montgomery County, MD &middot; D1 as of Apr 16 &middot; first week at D1 since 2023</div>
      </div>

      {/* Big status */}
      <div className="civ-dr-hero">
        <div className="civ-dr-badge" style={{ background: '#e5b85a', color: '#3a2200' }}>
          <div className="civ-dr-badge-level">D1</div>
          <div className="civ-dr-badge-label">MODERATE</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="civ-dr-summary">
            <b style={{ color: 'var(--ink)' }}>11.2&quot;</b> of precipitation in the last 90 days &mdash;{' '}
            <b style={{ color: '#b84a2a' }}>3.8&quot; below normal</b>. Streamflow at the Potomac River gauge is at the 18th percentile.
          </div>
        </div>
      </div>

      {/* Scale strip */}
      <div className="civ-dr-scale">
        <div className="civ-dr-scale-bar">
          {levels.map((l) => (
            <div key={l.id} className="civ-dr-scale-seg" style={{ background: l.color }}>
              {l.id === current && <div className="civ-dr-scale-active" />}
            </div>
          ))}
        </div>
        <div className="civ-dr-scale-labels">
          {levels.map((l) => (
            <div
              key={l.id}
              className="civ-dr-scale-lbl"
              style={{ fontWeight: l.id === current ? 700 : 400, color: l.id === current ? 'var(--ink)' : undefined }}
            >
              {l.id}
            </div>
          ))}
        </div>
      </div>

      {/* 12-week timeline */}
      <div className="civ-dr-sec">12-week trend</div>
      <div className="civ-dr-timeline">
        {weeks.map((w, i) => {
          const lv = levels.find((l) => l.id === w.level)!;
          return (
            <div key={i} className="civ-dr-week">
              <div className="civ-dr-week-bar" style={{ background: lv.color }}>
                <div
                  className="civ-dr-week-lbl"
                  style={{ color: w.level === 'None' ? 'var(--ink-mute)' : '#3a2200' }}
                >
                  {w.level}
                </div>
              </div>
              <div className="civ-dr-week-name">{w.w}</div>
            </div>
          );
        })}
      </div>

      {/* Indicators grid */}
      <div className="civ-dr-sec" style={{ paddingTop: 14 }}>Indicators</div>
      <div className="civ-dr-indicators">
        {indicators.map((s) => (
          <div key={s.label} className="civ-dr-indicator">
            <div className="civ-dr-ind-label">{s.label}</div>
            <div className="civ-dr-ind-val">{s.value}</div>
            <div className="civ-dr-ind-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* What this means */}
      <div className="civ-dr-context">
        <div className="civ-dr-sec" style={{ padding: 0, marginBottom: 8 }}>What this means for you</div>
        <div className="civ-dr-context-box">
          Lawns and new plantings should be watered. No mandatory water restrictions are in effect, but voluntary conservation is encouraged by WSSC. Fire danger is elevated during dry afternoons with low humidity.
        </div>
      </div>

      {/* Provenance */}
      <div className="civ-dr-prov">
        <div><span className="civ-dr-prov-diamond">&loz;</span> Source &middot; <span className="civ-dr-prov-val">NOAA/NDMC U.S. Drought Monitor</span></div>
        <div>Updated &middot; <span className="civ-dr-prov-val">Thursdays at 8:30 AM ET &middot; next Apr 24</span></div>
      </div>
    </div>
  );
}
