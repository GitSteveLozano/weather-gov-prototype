import './FloodInundationScreen.css';

interface Props {
  onBack: () => void;
}

export function FloodInundationScreen({ onBack }: Props) {
  return (
    <div className="fld sb-scroll">
      {/* Sub-navigation */}
      <div className="fld-nav">
        <button className="fld-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="fld-nav-title">Flood Inundation</div>
        <div className="fld-nav-crumb sb-mono">Civic</div>
      </div>

      {/* Header */}
      <div className="fld-header">
        <div className="fld-kicker sb-mono">Flood inundation</div>
        <div className="fld-title">
          Your street &middot; <span className="fld-at-risk">at risk</span>
        </div>
        <div className="fld-byline">
          If 3 inches of rain falls in the next 6 hours, Sligo Creek is projected to crest over Dale Dr.
        </div>
      </div>

      {/* SVG flood map */}
      <div className="fld-map">
        <svg width="100%" height="240" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
          {/* Street grid */}
          <g stroke="#b8b0a0" strokeWidth="1" fill="none">
            <path d="M0 40 L400 45" />
            <path d="M0 100 L400 110" />
            <path d="M0 160 L400 165" />
            <path d="M0 210 L400 215" />
            <path d="M60 0 L55 240" />
            <path d="M150 0 L145 240" />
            <path d="M240 0 L235 240" />
            <path d="M330 0 L325 240" />
          </g>
          {/* Creek */}
          <path d="M0 120 Q80 130 140 115 T260 130 T400 120" stroke="#4a7eb3" strokeWidth="3" fill="none" />
          {/* Flood zones */}
          <path d="M0 118 Q80 130 140 113 T260 132 T400 118 L400 140 Q260 150 140 135 T0 138 Z" fill="var(--sev-watch)" opacity="0.3" />
          <path d="M0 123 Q80 133 140 118 T260 136 T400 123 L400 132 Q260 142 140 126 T0 130 Z" fill="var(--sev-warning)" opacity="0.35" />
          {/* Home marker */}
          <g transform="translate(200, 95)">
            <circle r="10" fill="var(--ink)" />
            <circle r="5" fill="#fff" />
          </g>
          <text x="215" y="96" fontSize="10" fontFamily="var(--mono)" fontWeight="600" fill="var(--ink)">Home</text>
          {/* Creek label */}
          <text x="300" y="115" fontSize="9" fontFamily="var(--mono)" fill="#4a7eb3" fontWeight="600">Sligo Creek</text>
        </svg>
      </div>

      {/* Rainfall scenario slider */}
      <div className="fld-scenario">
        <div className="fld-scenario-label sb-mono">Rainfall scenario &middot; drag to explore</div>
        <div className="fld-scenario-card">
          <div className="fld-scale sb-mono">
            <span>0&quot;</span><span>1&quot;</span><span>2&quot;</span>
            <span className="fld-scale-active">3&quot;</span>
            <span>4&quot;</span><span>5&quot;+</span>
          </div>
          <div className="fld-slider-track">
            <div className="fld-slider-fill" />
            <div className="fld-slider-thumb" />
          </div>
          <div className="fld-scenario-desc">
            <b>At 3 inches:</b> Creek rises 4.2 ft. Dale Dr. impassable. Basement flooding possible in 200 block.
          </div>
        </div>
      </div>

      {/* Current forecast */}
      <div className="fld-forecast">
        <div className="fld-forecast-card">
          <div className="fld-forecast-label sb-mono">Tonight's forecast</div>
          <div className="fld-forecast-text">
            <b>2.4 inches expected</b> &mdash; below flood threshold. Monitoring rate of rise.
          </div>
        </div>
      </div>

      {/* Provenance */}
      <div className="fld-prov sb-mono">
        &loz; National Water Prediction Service &middot; NWM v3<br />
        Updated continuously
      </div>
    </div>
  );
}
