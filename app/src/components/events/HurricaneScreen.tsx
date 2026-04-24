import './HurricaneScreen.css';

interface Props {
  onBack: () => void;
}

export function HurricaneScreen({ onBack }: Props) {
  return (
    <div className="hurr sb-scroll">
      {/* Sub-navigation header */}
      <div className="hurr-nav">
        <button className="hurr-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="hurr-nav-title">Hurricane</div>
        <div className="hurr-nav-crumb">Events</div>
      </div>

      {/* Masthead */}
      <div className="hurr-masthead">
        <div className="hurr-label">Active tropical systems</div>
        <div className="hurr-title">Hurricane Iris</div>
        <div className="hurr-subtitle">
          Category 3 &middot; 125 mph sustained &middot; Cat 4 possible by Sun
        </div>
      </div>

      {/* Cone of uncertainty map */}
      <div className="hurr-map">
        <svg
          width="100%"
          height="280"
          viewBox="0 0 400 280"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Land masses */}
          <path
            d="M0 200 Q50 180 120 190 L140 150 Q180 140 210 160 L240 140 L400 130 L400 280 L0 280 Z"
            fill="#d5dcc8"
          />
          <path d="M280 80 L320 70 L340 95 L310 110 Z" fill="#d5dcc8" />

          {/* Track history (dashed) */}
          <path
            d="M350 230 Q310 210 280 195 Q240 180 210 170"
            stroke="var(--ink)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
          />
          {/* History dots */}
          {[
            [350, 230],
            [310, 210],
            [280, 195],
            [240, 180],
            [210, 170],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#fff"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
          ))}

          {/* Cone of uncertainty */}
          <path
            d="M210 170 Q180 150 140 130 L90 110 L60 85 L50 110 L90 135 L150 160 Z"
            fill="var(--sev-warning)"
            opacity="0.2"
            stroke="var(--sev-warning)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Forecast track */}
          <path
            d="M210 170 Q170 145 130 125 Q100 105 75 95"
            stroke="var(--sev-warning)"
            strokeWidth="2"
            fill="none"
          />

          {/* Forecast points with category labels */}
          {[
            { x: 170, y: 145, cat: '3' },
            { x: 130, y: 125, cat: '3' },
            { x: 100, y: 110, cat: '4' },
            { x: 75, y: 95, cat: '4' },
          ].map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="6"
                fill="#fff"
                stroke="var(--sev-warning)"
                strokeWidth="1.5"
              />
              <text
                x={pt.x}
                y={pt.y + 2}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="var(--sev-warning)"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {pt.cat}
              </text>
            </g>
          ))}

          {/* Current position pulsing */}
          <g transform="translate(210,170)">
            <circle r="18" fill="var(--sev-warning)" opacity="0.2">
              <animate
                attributeName="r"
                values="18;26;18"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="10" fill="var(--sev-warning)" />
            <text
              y="2"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#fff"
              style={{ fontFamily: 'var(--mono)' }}
            >
              3
            </text>
          </g>

          {/* Labels */}
          <text
            x="72"
            y="88"
            fontSize="9"
            fontWeight="600"
            fill="var(--ink)"
            style={{ fontFamily: 'var(--mono)' }}
          >
            5-day
          </text>
          <text
            x="220"
            y="167"
            fontSize="9"
            fontWeight="600"
            fill="var(--ink)"
            style={{ fontFamily: 'var(--mono)' }}
          >
            NOW
          </text>
        </svg>
      </div>

      {/* Key stats grid */}
      <div className="hurr-grid">
        <div className="hurr-stat">
          <div className="hurr-stat-label">Pressure</div>
          <div className="hurr-stat-val">948 mb</div>
          <div className="hurr-stat-sub">falling</div>
        </div>
        <div className="hurr-stat">
          <div className="hurr-stat-label">Movement</div>
          <div className="hurr-stat-val">WNW 12mph</div>
          <div className="hurr-stat-sub">steering flow</div>
        </div>
        <div className="hurr-stat">
          <div className="hurr-stat-label">Max winds</div>
          <div className="hurr-stat-val">125 mph</div>
          <div className="hurr-stat-sub">gusts 150</div>
        </div>
        <div className="hurr-stat">
          <div className="hurr-stat-label">Landfall</div>
          <div className="hurr-stat-val">Sun 2-8 AM</div>
          <div className="hurr-stat-sub">LA coast</div>
        </div>
      </div>

      {/* Warning banner */}
      <div className="hurr-warning">
        <div className="hurr-warning-bar" />
        <div className="hurr-warning-body">
          <div className="hurr-warning-level">Warning</div>
          <div className="hurr-warning-title">
            Hurricane Warning &middot; SE Louisiana
          </div>
          <div className="hurr-warning-until">landfall Sunday AM</div>
        </div>
        <div className="hurr-warning-caret">&rsaquo;</div>
      </div>

      {/* Footer */}
      <div className="hurr-footer">
        &loz; National Hurricane Center &middot; NWS
      </div>
    </div>
  );
}
