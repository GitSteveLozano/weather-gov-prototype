import './AuroraScreen.css';

interface Props {
  onBack: () => void;
}

const KP_DATA = [2,3,3,4,5,6,6,5,4,3,3,2,3,4,4,3,2,2,3,3,2,2,3,3];

function AuroraStat({ label, val, sub }: { label: string; val: string; sub: string }) {
  return (
    <div className="aur-stat">
      <div className="aur-stat-label sb-mono">{label}</div>
      <div className="aur-stat-val sb-mono">{val}</div>
      <div className="aur-stat-sub">{sub}</div>
    </div>
  );
}

export function AuroraScreen({ onBack }: Props) {
  return (
    <div className="aur">
      {/* Sub-navigation */}
      <div className="aur-nav">
        <button className="aur-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="aur-nav-title">Aurora Forecast</div>
        <div className="aur-nav-crumb sb-mono">SWPC</div>
      </div>

      {/* Aurora sky visualization */}
      <div className="aur-sky">
        <div className="aur-sky-green" />
        <div className="aur-sky-purple" />
        <div className="aur-sky-teal" />
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="aur-star"
            style={{
              top: `${(i * 7.3) % 80}%`,
              left: `${(i * 13.7) % 100}%`,
              opacity: 0.3 + ((i * 7) % 7) / 10,
            }}
          />
        ))}
        {/* Horizon silhouette */}
        <svg className="aur-horizon" width="100%" height="50" viewBox="0 0 400 50" preserveAspectRatio="none">
          <path d="M0 50 L0 35 L40 30 L70 38 L110 25 L160 32 L200 22 L250 35 L300 28 L350 38 L400 32 L400 50 Z" fill="#050814" />
        </svg>
      </div>

      {/* Headline */}
      <div className="aur-info">
        <div className="aur-kicker sb-mono">Aurora forecast &middot; tonight</div>
        <div className="aur-title">Visible from your location &middot; low on horizon</div>
        <div className="aur-subtitle">Kp 6 expected at 11 PM. Look N &middot; clear skies &middot; no moon.</div>
      </div>

      {/* Stats grid */}
      <div className="aur-stats">
        <AuroraStat label="Kp index" val="6" sub="G2 storm" />
        <AuroraStat label="Best viewing" val="11 PM - 2 AM" sub="after moonset" />
        <AuroraStat label="Your latitude" val="38.99°N" sub="edge of visibility" />
        <AuroraStat label="Sky clarity" val="Clear" sub="5% cloud" />
      </div>

      {/* Kp chart */}
      <div className="aur-chart-section">
        <div className="aur-chart-label sb-mono">3-day Kp forecast</div>
        <div className="aur-chart-card">
          <div className="aur-kp-bars">
            {KP_DATA.map((kp, i) => (
              <div
                key={i}
                className="aur-kp-bar"
                style={{
                  height: `${(kp / 9) * 100}%`,
                  background: kp >= 5 ? '#6bd890' : kp >= 4 ? '#4ab5cf' : '#4466aa',
                }}
              />
            ))}
          </div>
          <div className="aur-chart-times sb-mono">
            <span>NOW</span><span>+24h</span><span>+48h</span><span>+72h</span>
          </div>
        </div>
      </div>

      {/* Alert enabled notice */}
      <div className="aur-notice">
        <div className="aur-notice-card">
          <b>Alert enabled.</b> We'll ping you if Kp climbs above 5 tonight.
        </div>
      </div>
    </div>
  );
}
