import './LightningScreen.css';

interface Props {
  onBack: () => void;
}

interface StrikeData {
  x: number;
  y: number;
  age: number;
}

const STRIKES: StrikeData[] = [
  { x: 140, y: 80, age: 1 },
  { x: 260, y: 110, age: 1 },
  { x: 290, y: 170, age: 2 },
  { x: 150, y: 200, age: 3 },
  { x: 130, y: 160, age: 4 },
  { x: 240, y: 60, age: 2 },
  { x: 320, y: 130, age: 5 },
  { x: 180, y: 100, age: 3 },
  { x: 310, y: 220, age: 4 },
  { x: 90, y: 180, age: 5 },
];

function getStrikeColor(age: number): string {
  if (age === 1) return '#fff';
  if (age === 2) return '#fef08a';
  if (age === 3) return '#fbbf24';
  if (age === 4) return '#f97316';
  return '#ef4444';
}

export function LightningScreen({ onBack }: Props) {
  return (
    <div className="ltg sb-scroll">
      {/* Sub-navigation header */}
      <div className="ltg-nav">
        <button className="ltg-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="ltg-nav-title">Lightning</div>
        <div className="ltg-nav-crumb">Events</div>
      </div>

      {/* Masthead */}
      <div className="ltg-masthead">
        <div className="ltg-label">Lightning &middot; live</div>
        <div className="ltg-title">
          Nearest strike{' '}
          <span className="ltg-title-accent">3.2 mi</span>
        </div>
        <div className="ltg-subtitle">
          62 strikes in last 10 min within 25 mi
        </div>
      </div>

      {/* Strike map */}
      <div className="ltg-map">
        <svg
          width="100%"
          height="300"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Concentric range rings */}
          {[40, 80, 120, 160].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="150"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          ))}

          {/* Center point (user location) */}
          <circle cx="200" cy="150" r="5" fill="var(--blue)" />

          {/* Lightning strikes */}
          {STRIKES.map((s, i) => {
            const col = getStrikeColor(s.age);
            return (
              <g key={i}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={s.age === 1 ? 6 : 3}
                  fill={col}
                  opacity={s.age === 1 ? 1 : 0.7}
                />
                {s.age === 1 && (
                  <circle cx={s.x} cy={s.y} r="10" fill={col} opacity="0.3">
                    <animate
                      attributeName="r"
                      values="6;16"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Range label */}
          <text
            x="200"
            y="270"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(255,255,255,0.6)"
            style={{ fontFamily: 'var(--mono)' }}
          >
            25 MI
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="ltg-legend">
        <span className="ltg-legend-item">
          <span className="ltg-legend-dot" style={{ background: '#fff' }} />
          Now
        </span>
        <span className="ltg-legend-item">
          <span className="ltg-legend-dot" style={{ background: '#fbbf24' }} />
          5m ago
        </span>
        <span className="ltg-legend-item">
          <span className="ltg-legend-dot" style={{ background: '#ef4444' }} />
          10m+
        </span>
      </div>

      {/* Stats grid */}
      <div className="ltg-grid">
        <div className="ltg-stat">
          <div className="ltg-stat-label">Strikes</div>
          <div className="ltg-stat-val">62</div>
          <div className="ltg-stat-sub">10 min</div>
        </div>
        <div className="ltg-stat">
          <div className="ltg-stat-label">Rate</div>
          <div className="ltg-stat-val">6/min</div>
          <div className="ltg-stat-sub">increasing</div>
        </div>
        <div className="ltg-stat">
          <div className="ltg-stat-label">Nearest</div>
          <div className="ltg-stat-val">3.2 mi</div>
          <div className="ltg-stat-sub">NNW</div>
        </div>
      </div>

      {/* Footer */}
      <div className="ltg-footer">
        &loz; Vaisala NLDN &middot; Lightning Data
      </div>
    </div>
  );
}
