import type { WeatherData } from '../../types/weather';
import './EarthquakeScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

function magColor(m: number): string {
  if (m >= 4) return '#d63a2f';
  if (m >= 3) return '#e8701e';
  if (m >= 2) return '#d4a017';
  return 'var(--ink-soft)';
}

const quakes = [
  { mag: 2.4, depth: 8.2, place: '3 km NE of Summit, NJ', ago: '14 min ago', dist: '198 mi NE', felt: false, reports: 0 },
  { mag: 1.8, depth: 4.1, place: '5 km W of Plum Point, MD', ago: '2 hr ago', dist: '38 mi SE', felt: true, reports: 12 },
  { mag: 3.1, depth: 12.4, place: '8 km NNW of Mineral, VA', ago: '1 day ago', dist: '108 mi SW', felt: true, reports: 143 },
  { mag: 2.2, depth: 6.8, place: '2 km S of Kings Park, NY', ago: '2 days ago', dist: '246 mi NE', felt: false, reports: 0 },
  { mag: 4.0, depth: 18.2, place: '12 km SE of New Madrid, MO', ago: '4 days ago', dist: '768 mi W', felt: false, reports: 2840 },
];

const mapQuakes = [
  { cx: 220, cy: 50, m: 2.4 },
  { cx: 170, cy: 110, m: 1.8 },
  { cx: 130, cy: 140, m: 3.1 },
  { cx: 240, cy: 70, m: 2.2 },
  { cx: 40, cy: 155, m: 4.0 },
];

export function EarthquakeScreen({ data, onBack }: Props) {
  const eqStatus = data.hazards.earthquake;
  const statusDetail = eqStatus?.detail ?? 'No significant seismic activity';

  return (
    <div className="civ-eq sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-eq-nav">
        <button className="civ-eq-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-eq-nav-title">Earthquakes</div>
        <div className="civ-eq-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-eq-header">
        <div className="civ-eq-kicker">Earthquakes &middot; USGS</div>
        <div className="civ-eq-title">
          {eqStatus && eqStatus.status !== 'ok'
            ? statusDetail
            : 'Recent seismic activity near you'}
        </div>
        <div className="civ-eq-byline">5 events within 800 mi &middot; past 7 days</div>
      </div>

      {/* Regional map */}
      <div className="civ-eq-map">
        <svg viewBox="0 0 320 200" width="100%" height="100%" style={{ display: 'block' }}>
          <rect width="320" height="200" fill="#ebe5d5" />
          {/* coastline sketch */}
          <path d="M40 60 L80 50 L120 55 L160 40 L200 50 L240 80 L260 120 L250 160 L220 180 L180 170 L140 180 L100 170 L60 150 L30 110 Z" fill="#d4cdb8" stroke="#a89e80" strokeWidth="0.8" />
          <path d="M120 55 L135 60 L140 75 L130 80 Z M200 50 L215 55 L220 68 L205 72 Z" fill="#b8b09a" stroke="#a89e80" strokeWidth="0.6" />
          {/* grid */}
          {[0, 1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="0" y1={50 + i * 40} x2="320" y2={50 + i * 40} stroke="#d4cdb8" strokeWidth="0.3" />
          ))}
          {/* quake markers */}
          {mapQuakes.map((q, i) => (
            <g key={i}>
              <circle cx={q.cx} cy={q.cy} r={q.m * 3 + 2} fill={magColor(q.m)} opacity="0.2" />
              <circle cx={q.cx} cy={q.cy} r={q.m * 1.5 + 2} fill={magColor(q.m)} stroke="#fff" strokeWidth="1" />
              <text x={q.cx} y={q.cy + 3} fontSize="8" fontFamily="var(--mono)" fontWeight="700" fill="#fff" textAnchor="middle">{q.m}</text>
            </g>
          ))}
          {/* user */}
          <g transform="translate(165,100)">
            <circle r="5" fill="#fff" stroke="var(--ink)" strokeWidth="1.5" />
            <circle r="2" fill="var(--ink)" />
          </g>
        </svg>
        <div className="civ-eq-map-label">PAST 7 DAYS &middot; M1.5+</div>
      </div>

      {/* Feed */}
      <div className="civ-eq-sec">Recent &middot; within 800 mi</div>
      <div className="civ-eq-feed">
        {quakes.map((q, i) => (
          <div key={i} className="civ-eq-quake">
            <div className="civ-eq-mag" style={{ background: magColor(q.mag) }}>{q.mag}</div>
            <div style={{ flex: 1 }}>
              <div className="civ-eq-place">{q.place}</div>
              <div className="civ-eq-meta">
                Depth {q.depth} km &middot; {q.dist} &middot; {q.ago}
              </div>
              {q.felt && (
                <div className="civ-eq-felt">
                  &#10003; {q.reports} &ldquo;Did You Feel It?&rdquo; reports
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Provenance */}
      <div className="civ-eq-prov">
        <div><span className="civ-eq-prov-diamond">&loz;</span> Source &middot; <span className="civ-eq-prov-val">USGS Earthquake Hazards Program</span></div>
        <div>Updated &middot; <span className="civ-eq-prov-val">Continuous &middot; 1-min latency</span></div>
      </div>
    </div>
  );
}
