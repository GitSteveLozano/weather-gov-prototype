import './MoonTideScreen.css';

interface Props {
  onBack: () => void;
}

export function MoonTideScreen({ onBack }: Props) {
  return (
    <div className="moon sb-scroll">
      {/* Sub-navigation header */}
      <div className="moon-nav">
        <button className="moon-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="moon-nav-title">Moon &amp; Tide</div>
        <div className="moon-nav-crumb">Sky</div>
      </div>

      {/* Masthead */}
      <div className="moon-masthead">
        <div className="moon-label">Sky &middot; Moon &amp; sun</div>
        <div className="moon-title">Waxing Gibbous</div>
        <div className="moon-subtitle">
          72% illuminated &middot; Full in 4 days
        </div>
      </div>

      {/* Moon phase visualization */}
      <div className="moon-viz">
        <div className="moon-sphere">
          <div className="moon-sphere-dark" />
          <div className="moon-sphere-lit" />
          <div className="moon-sphere-shadow" />
        </div>
      </div>

      {/* Moon/Sun stats */}
      <div className="moon-grid">
        <div className="moon-stat">
          <div className="moon-stat-label">Moonrise</div>
          <div className="moon-stat-val">4:12 PM</div>
          <div className="moon-stat-sub">ESE</div>
        </div>
        <div className="moon-stat">
          <div className="moon-stat-label">Moonset</div>
          <div className="moon-stat-val">3:48 AM</div>
          <div className="moon-stat-sub">WSW</div>
        </div>
        <div className="moon-stat">
          <div className="moon-stat-label">Sunrise</div>
          <div className="moon-stat-val">6:22 AM</div>
          <div className="moon-stat-sub">golden ends 7:01</div>
        </div>
        <div className="moon-stat">
          <div className="moon-stat-label">Sunset</div>
          <div className="moon-stat-val">7:48 PM</div>
          <div className="moon-stat-sub">golden from 7:12</div>
        </div>
      </div>

      {/* Tide section */}
      <div className="moon-sec">Tide &middot; Chesapeake</div>
      <div className="moon-tide-wrap">
        <div className="moon-tide">
          <svg width="100%" height="70" viewBox="0 0 300 70">
            <path
              d="M0 35 Q37 10 75 35 T150 35 T225 35 T300 35 L300 70 L0 70 Z"
              fill="var(--blue-soft)"
            />
            <path
              d="M0 35 Q37 10 75 35 T150 35 T225 35 T300 35"
              stroke="var(--blue)"
              strokeWidth="1.8"
              fill="none"
            />
          </svg>
          <div className="moon-tide-labels">
            <span>L 6:12a</span>
            <span>H 12:45p</span>
            <span>L 6:58p</span>
            <span>H 1:22a</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="moon-footer">
        &loz; USNO &middot; NOAA Tides &amp; Currents
      </div>
    </div>
  );
}
