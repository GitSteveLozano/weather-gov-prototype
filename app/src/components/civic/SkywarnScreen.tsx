import './SkywarnScreen.css';

interface Props {
  onBack: () => void;
}

interface SpotterReport {
  time: string;
  distance: string;
  description: string;
  source: string;
}

const REPORTS: SpotterReport[] = [
  { time: '12:42 PM', distance: '2.1 mi N', description: '1.00" hail', source: 'Verified · Spotter K3RJB' },
  { time: '12:18 PM', distance: '4.3 mi NW', description: 'Wall cloud sighted', source: 'Verified · Spotter N4VGT' },
  { time: '11:55 AM', distance: '6.7 mi W', description: 'Wind damage, trees down', source: 'NWS-confirmed' },
  { time: '11:30 AM', distance: '1.8 mi S', description: 'Funnel cloud, brief', source: 'Unconfirmed · user report' },
];

const MAP_PINS: { x: number; y: number; kind: string }[] = [
  { x: 240, y: 60, kind: 'hail' },
  { x: 130, y: 50, kind: 'wall' },
  { x: 95, y: 115, kind: 'wind' },
  { x: 175, y: 148, kind: 'funnel' },
];

export function SkywarnScreen({ onBack }: Props) {
  return (
    <div className="skw sb-scroll">
      {/* Sub-navigation */}
      <div className="skw-nav">
        <button className="skw-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="skw-nav-title">SKYWARN Reports</div>
        <div className="skw-nav-crumb sb-mono">Live</div>
      </div>

      {/* Header */}
      <div className="skw-header">
        <div className="skw-kicker sb-mono">Community reports &middot; SKYWARN</div>
        <div className="skw-title">Live ground truth near you</div>
        <div className="skw-byline">
          From NWS-trained spotters and verified observers. Your reports go to the Baltimore/Washington forecast office.
        </div>
      </div>

      {/* Map */}
      <div className="skw-map">
        <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          {/* Street grid */}
          <g stroke="#b8b0a0" strokeWidth="1" fill="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={`h${i}`} d={`M0 ${i * 28} L400 ${i * 28 + 2}`} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <path key={`v${i}`} d={`M${i * 45} 0 L${i * 45 - 3} 200`} />
            ))}
          </g>
          {/* Your location */}
          <circle cx="200" cy="100" r="6" fill="var(--blue)" />
          <circle cx="200" cy="100" r="20" fill="none" stroke="var(--blue)" strokeWidth="1" strokeDasharray="3 2" />
          {/* Report pins */}
          {MAP_PINS.map((pin, i) => {
            const isWarning = pin.kind === 'funnel' || pin.kind === 'wall';
            return (
              <g key={i}>
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="8"
                  fill={isWarning ? 'var(--sev-warning)' : 'var(--sev-watch)'}
                />
                <text
                  x={pin.x}
                  y={pin.y + 3}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#fff"
                  fontWeight="700"
                  fontFamily="var(--mono)"
                >
                  &#9679;
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Reports list */}
      <div className="skw-reports">
        {REPORTS.map((report, i) => (
          <div key={i} className="skw-report">
            <div className="skw-report-time sb-mono">{report.time}</div>
            <div className="skw-report-body">
              <div className="skw-report-desc">{report.description}</div>
              <div className="skw-report-meta sb-mono">{report.distance} &middot; {report.source}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit CTA */}
      <div className="skw-cta-wrap">
        <div className="skw-cta">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M2 12h20" stroke="var(--paper)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="skw-cta-text">
            <div className="skw-cta-title">Submit a report</div>
            <div className="skw-cta-sub">Shared directly with your local NWS office</div>
          </div>
        </div>
        <div className="skw-spotter-count">
          350,000+ SKYWARN spotters nationwide feed into the same alerting system.
        </div>
      </div>
    </div>
  );
}
