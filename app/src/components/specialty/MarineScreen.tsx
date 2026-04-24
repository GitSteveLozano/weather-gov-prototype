import type { WeatherData } from '../../types/weather';
import './MarineScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

export function MarineScreen({ data, onBack }: Props) {
  const { env } = data;

  const waveHeight = env.wavesFt != null ? `${env.wavesFt} ft` : '2.4 ft';
  const wavePeriod = env.wavePeriod != null ? `${env.wavePeriod}s` : '4s';
  const waveDir = env.waveDir ?? 'SE';
  const windVal = env.windMph != null ? `${env.windMph} kt` : '12 kt';
  const gustNote = env.gustMph != null ? `G${env.gustMph}` : 'G18';
  const windDir = env.windDir ?? 'WSW';
  const visibility = env.visibMi != null ? `${env.visibMi} mi` : '6 mi';

  const tidePoints: { label: string; height: number; type: 'low' | 'high' }[] = [
    { label: 'Low 6:12a', height: 20, type: 'low' },
    { label: 'High 12:45p', height: 90, type: 'high' },
    { label: 'Low 6:58p', height: 25, type: 'low' },
    { label: 'High 1:22a', height: 85, type: 'high' },
  ];

  return (
    <div className="mar sb-scroll">
      {/* Sub-navigation header */}
      <div className="mar-nav">
        <button className="mar-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="mar-nav-title">Marine</div>
        <div className="mar-nav-crumb">Specialty</div>
      </div>

      {/* Masthead */}
      <div className="mar-masthead">
        <div className="mar-label">Marine &middot; Chesapeake Bay</div>
        <div className="mar-title">Coastal Forecast</div>
      </div>

      {/* Tabs */}
      <div className="mar-tabs">
        <button className="mar-tab mar-tab--active">Coastal</button>
        <button className="mar-tab">Offshore</button>
        <button className="mar-tab">High seas</button>
      </div>

      {/* Stats grid */}
      <div className="mar-grid">
        <div className="mar-stat">
          <div className="mar-stat-label">Wave height</div>
          <div className="mar-stat-val">{waveHeight}</div>
          <div className="mar-stat-sub">{waveDir} {wavePeriod}</div>
        </div>
        <div className="mar-stat">
          <div className="mar-stat-label">Water temp</div>
          <div className="mar-stat-val">58&deg; F</div>
          <div className="mar-stat-sub">+1&deg; / 24h</div>
        </div>
        <div className="mar-stat">
          <div className="mar-stat-label">Wind</div>
          <div className="mar-stat-val">{windVal}</div>
          <div className="mar-stat-sub">{windDir}, {gustNote}</div>
        </div>
        <div className="mar-stat">
          <div className="mar-stat-label">Visibility</div>
          <div className="mar-stat-val">{visibility}</div>
          <div className="mar-stat-sub">Haze</div>
        </div>
      </div>

      {/* Tide section */}
      <div className="mar-sec">Tide &middot; Next 24h</div>
      <div className="mar-tide-wrap">
        <div className="mar-tide">
          <div className="mar-tide-bars">
            {tidePoints.map((t, i) => (
              <div
                key={i}
                className={`mar-tide-bar${t.type === 'low' ? ' mar-tide-bar--low' : ''}`}
                style={{ height: `${t.height}%` }}
              />
            ))}
          </div>
          <div className="mar-tide-labels">
            {tidePoints.map((t, i) => (
              <span key={i}>{t.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Marine forecast */}
      <div className="mar-sec">Marine forecast</div>
      <div className="mar-forecast-wrap">
        <div className="mar-forecast">
          Southwest winds 10 to 15 knots with gusts up to 20 knots. Chesapeake Bay waters 2 to 4 feet. Visibility 5 to 7 nautical miles in haze, lowering to 2 nautical miles in fog after midnight. Scattered showers possible late.
        </div>
      </div>

      {/* Small craft advisory banner */}
      <div
        className="mar-advisory"
        style={{
          background: 'var(--sev-advisory-bg)',
          color: '#5a3e08',
          border: '1px solid rgba(90, 62, 8, 0.13)',
        }}
      >
        <div className="mar-advisory-bar" style={{ background: 'var(--sev-advisory)' }} />
        <div className="mar-advisory-body">
          <div className="mar-advisory-level">Advisory</div>
          <div className="mar-advisory-title">Small Craft Advisory</div>
          <div className="mar-advisory-until">in effect until Thu 4 AM</div>
        </div>
        <div className="mar-advisory-caret">&rsaquo;</div>
      </div>

      {/* Footer */}
      <div className="mar-footer">
        &loz; National Weather Service &middot; Marine Forecast<br />
        Updated {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
      </div>
    </div>
  );
}
