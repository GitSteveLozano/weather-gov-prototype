import './Agentic.css';

interface Props {
  onBack: () => void;
}

interface TimelineEvent {
  time: string;
  description: string;
  emphasis?: boolean;
}

const PRECIP_MEAN = [0, 0, 0.05, 0.15, 0.3, 0.5, 0.75, 0.85, 0.9, 0.85, 0.7, 0.5, 0.35, 0.2, 0.1, 0.05];
const PRECIP_BAND = PRECIP_MEAN.map(m => [Math.max(0, m - 0.15), Math.min(1, m + 0.12)] as [number, number]);

const TIMELINE: TimelineEvent[] = [
  { time: '1:18 PM', description: 'Drizzle begins' },
  { time: '1:23 PM', description: 'Light rain, ~0.02 in/hr' },
  { time: '1:35 PM', description: 'Moderate, ~0.15 in/hr', emphasis: true },
  { time: '1:52 PM', description: 'Tapering' },
  { time: '2:12 PM', description: 'Dry, cloudy' },
];

function MinuteChart() {
  const W = 340;
  const H = 110;
  const P = 8;

  const xOf = (i: number) => P + (i / (PRECIP_MEAN.length - 1)) * (W - 2 * P);
  const yOf = (v: number) => P + (1 - v) * (H - 2 * P);

  const meanPath = PRECIP_MEAN.map((m, i) =>
    (i ? 'L' : 'M') + xOf(i).toFixed(1) + ',' + yOf(m).toFixed(1)
  ).join(' ');

  const bandTop = PRECIP_BAND.map((b, i) => `${xOf(i).toFixed(1)},${yOf(b[1]).toFixed(1)}`).join(' ');
  const bandBot = PRECIP_BAND.slice().reverse().map((b, i) =>
    `${xOf(PRECIP_BAND.length - 1 - i).toFixed(1)},${yOf(b[0]).toFixed(1)}`
  ).join(' ');

  const nowX = xOf(3);

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <polygon points={`${bandTop} ${bandBot}`} fill="var(--sky-rain)" opacity="0.18" />
      <path d={meanPath} fill="none" stroke="var(--sky-rain)" strokeWidth="2" strokeLinecap="round" />
      <line x1={nowX} y1={P} x2={nowX} y2={H - P} stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={nowX} cy={yOf(PRECIP_MEAN[3])} r="4" fill="var(--ink)" />
      <text x={nowX + 6} y={P + 10} fontSize="10" fontFamily="var(--mono)" fill="var(--ink)" fontWeight="600">14m</text>
    </svg>
  );
}

export function MinuteCast({ onBack }: Props) {
  return (
    <div className="mc sb-scroll">
      {/* Sub-navigation */}
      <div className="mc-nav">
        <button className="mc-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="mc-nav-title">Next 60 minutes</div>
      </div>

      {/* Headline */}
      <div className="mc-hero">
        <div className="mc-label sb-mono">Right now</div>
        <div className="mc-headline">
          Rain starts in <span className="mc-rain-accent">14 minutes</span>. Light at first, moderate by 1:35.
        </div>
      </div>

      {/* Precipitation chart with confidence bands */}
      <div className="mc-chart-wrap">
        <div className="mc-chart-card">
          <MinuteChart />
          <div className="mc-chart-times sb-mono">
            <span>NOW</span><span>+15</span><span>+30</span><span>+45</span><span>+60m</span>
          </div>
          <div className="mc-chart-legend">
            <span className="mc-legend-item">
              <span className="mc-legend-line" /> Likely
            </span>
            <span className="mc-legend-item">
              <span className="mc-legend-band" /> 80% confidence
            </span>
          </div>
        </div>
      </div>

      {/* Confidence explainer */}
      <div className="mc-confidence">
        <div className="mc-conf-card">
          <div className="mc-conf-icon">&loz;</div>
          <div className="mc-conf-body">
            <div className="mc-conf-label sb-mono">High confidence</div>
            <div className="mc-conf-text">
              Models agree within 3 minutes on start time. Radar shows a clean line 4 miles SW moving toward you at 22mph.
            </div>
          </div>
        </div>
      </div>

      {/* Intensity timeline */}
      <div className="mc-timeline">
        <div className="mc-tl-label sb-mono">Intensity</div>
        <div className="mc-tl-events">
          {TIMELINE.map((evt, i) => (
            <div key={i} className="mc-tl-event">
              <div className="mc-tl-time sb-mono">{evt.time}</div>
              <div className={`mc-tl-dot${evt.emphasis ? ' mc-tl-dot--emph' : ''}`} />
              <div className={`mc-tl-desc${evt.emphasis ? ' mc-tl-desc--emph' : ''}`}>{evt.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
