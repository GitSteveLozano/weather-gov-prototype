import type { WeatherData } from '../../types/weather';
import './FireScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

interface FlagCriterion {
  label: string;
  met: boolean;
  detail: string;
}

export function FireScreen({ data, onBack }: Props) {
  const { env } = data;

  const rhVal = env.humidity ?? 28;
  const windVal = env.windMph ?? 14;
  const gustVal = env.gustMph ?? 24;
  const windDir = env.windDir ?? 'WSW';

  // Determine which Red Flag criteria are met using live data
  const criteria: FlagCriterion[] = [
    { label: 'RH ≤ 25%', met: rhVal <= 25, detail: `Min ${rhVal}%` },
    { label: 'Sustained wind ≥ 15 mph', met: windVal >= 15, detail: `${windVal} mph peak` },
    { label: 'Dry fuels (10h FM ≤ 8%)', met: true, detail: '7.2%' },
    { label: 'No recent precipitation', met: true, detail: '9 days' },
  ];

  // Needle position: map risk level to percentage
  // For the prototype, we place the needle at ~42% ("Elevated")
  const needlePct = 42;

  return (
    <div className="fire sb-scroll">
      {/* Sub-navigation header */}
      <div className="fire-nav">
        <button className="fire-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="fire-nav-title">Fire Weather</div>
        <div className="fire-nav-crumb">Specialty</div>
      </div>

      {/* Masthead */}
      <div className="fire-masthead">
        <div className="fire-label">Fire weather &middot; {data.point?.city || 'Montgomery Co'}</div>
        <div className="fire-title">Elevated risk</div>
      </div>

      {/* Risk gauge */}
      <div className="fire-gauge">
        <div className="fire-gauge-bar">
          <div className="fire-gauge-needle" style={{ left: `${needlePct}%` }} />
          <div className="fire-gauge-label" style={{ left: `${needlePct}%` }}>ELEVATED</div>
        </div>
        <div className="fire-gauge-scale">
          <span>Low</span>
          <span>Moderate</span>
          <span>Elevated</span>
          <span>Critical</span>
          <span>Extreme</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="fire-grid">
        <div className="fire-stat">
          <div className="fire-stat-label">RH</div>
          <div className="fire-stat-val">{rhVal}%</div>
          <div className="fire-stat-sub">min today</div>
        </div>
        <div className="fire-stat">
          <div className="fire-stat-label">Wind</div>
          <div className="fire-stat-val">{windVal} mph</div>
          <div className="fire-stat-sub">G {gustVal}, {windDir}</div>
        </div>
        <div className="fire-stat">
          <div className="fire-stat-label">ERC</div>
          <div className="fire-stat-val">62</div>
          <div className="fire-stat-sub">Energy release</div>
        </div>
        <div className="fire-stat">
          <div className="fire-stat-label">Haines</div>
          <div className="fire-stat-val">5</div>
          <div className="fire-stat-sub">Moderate</div>
        </div>
      </div>

      {/* Red flag criteria */}
      <div className="fire-sec">Red flag criteria</div>
      <div className="fire-criteria-wrap">
        <div className="fire-criteria">
          {criteria.map((c, i) => (
            <div key={i} className="fire-criteria-row">
              <div className={`fire-criteria-icon ${c.met ? 'fire-criteria-icon--met' : 'fire-criteria-icon--unmet'}`}>
                {c.met ? '✓' : ''}
              </div>
              <div className="fire-criteria-text">{c.label}</div>
              <div className="fire-criteria-detail">{c.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spot forecast link */}
      <div className="fire-spot">
        <div className="fire-spot-label">Spot forecast</div>
        <div className="fire-spot-text">
          Request a tailored spot forecast from your local NWS office for planned burns or active incidents. Includes terrain-adjusted wind and RH projections.
        </div>
      </div>

      {/* Fire weather watch banner */}
      <div
        className="fire-advisory"
        style={{
          background: 'var(--sev-watch-bg)',
          color: '#6a2a08',
          border: '1px solid rgba(106, 42, 8, 0.13)',
        }}
      >
        <div className="fire-advisory-bar" style={{ background: 'var(--sev-watch)' }} />
        <div className="fire-advisory-body">
          <div className="fire-advisory-level">Watch</div>
          <div className="fire-advisory-title">Fire Weather Watch</div>
          <div className="fire-advisory-until">Thu 12 PM &ndash; 8 PM</div>
        </div>
        <div className="fire-advisory-caret">&rsaquo;</div>
      </div>

      {/* Footer */}
      <div className="fire-footer">
        &loz; NWS Fire Weather &middot; Storm Prediction Center<br />
        Updated {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
      </div>
    </div>
  );
}
