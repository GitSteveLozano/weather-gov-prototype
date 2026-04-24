import './SnowScreen.css';

interface Props {
  onBack: () => void;
}

interface ProbRow {
  threshold: string;
  pct: number;
}

const PROB_DATA: ProbRow[] = [
  { threshold: '2"+', pct: 92 },
  { threshold: '4"+', pct: 78 },
  { threshold: '6"+', pct: 45 },
  { threshold: '8"+', pct: 18 },
  { threshold: '12"+', pct: 4 },
];

export function SnowScreen({ onBack }: Props) {
  return (
    <div className="snow sb-scroll">
      {/* Sub-navigation header */}
      <div className="snow-nav">
        <button className="snow-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="snow-nav-title">Snow</div>
        <div className="snow-nav-crumb">Events</div>
      </div>

      {/* Masthead */}
      <div className="snow-masthead">
        <div className="snow-label">Snowfall forecast</div>
        <div className="snow-title">4&ndash;7 inches expected</div>
        <div className="snow-subtitle">Heaviest Thu 2 AM &ndash; 8 AM</div>
      </div>

      {/* Probability of accumulation */}
      <div className="snow-prob-wrap">
        <div className="snow-prob">
          <div className="snow-prob-header">
            Probability of snow accumulation
          </div>
          {PROB_DATA.map((row, i) => (
            <div key={i} className="snow-prob-row">
              <div className="snow-prob-threshold">{row.threshold}</div>
              <div className="snow-prob-track">
                <div
                  className="snow-prob-fill"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <div className="snow-prob-pct">{row.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="snow-grid">
        <div className="snow-stat">
          <div className="snow-stat-label">Snow-water eq.</div>
          <div className="snow-stat-val">0.65 in</div>
          <div className="snow-stat-sub">wet snow</div>
        </div>
        <div className="snow-stat">
          <div className="snow-stat-label">Ratio</div>
          <div className="snow-stat-val">10:1</div>
          <div className="snow-stat-sub">standard</div>
        </div>
        <div className="snow-stat">
          <div className="snow-stat-label">Surface temp</div>
          <div className="snow-stat-val">28&deg;F</div>
          <div className="snow-stat-sub">sticking</div>
        </div>
        <div className="snow-stat">
          <div className="snow-stat-label">Duration</div>
          <div className="snow-stat-val">~9 hrs</div>
          <div className="snow-stat-sub">steady</div>
        </div>
      </div>

      {/* Footer */}
      <div className="snow-footer">
        &loz; National Weather Service &middot; Snow Forecast
      </div>
    </div>
  );
}
