import { useMemo } from 'react';
import type { WeatherData } from '../../types/weather';
import './ClimateScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

const APRIL_NORMAL_HONOLULU = 82;

const anomalyCards = [
  { label: 'AVG TEMP', val: '+3.4°F', sub: 'vs. 1991–2020', color: '#d63a2f' },
  { label: 'PRECIP', val: '−1.8″', sub: '52% of normal', color: '#d4a017' },
  { label: 'HOT DAYS', val: '6', sub: '≥80°F · normal 2', color: '#d63a2f' },
  { label: 'COOL NIGHTS', val: '3', sub: '≤40°F · normal 8', color: '#4a7eb3' },
  { label: 'FIRST LEAF', val: '11d early', sub: 'vs. 20-yr avg', color: '#6a8e4e' },
  { label: 'LAST FROST', val: 'Mar 28', sub: '14d early', color: '#6a8e4e' },
];

export function ClimateScreen({ data, onBack }: Props) {
  // Use current temp from forecast if available, fallback to hardcoded
  const currentTemp = data.periods.length > 0 ? data.periods[0].temperature : 85;
  const normal = APRIL_NORMAL_HONOLULU;
  const anomaly = currentTemp - normal;
  const anomalyStr = anomaly >= 0 ? `+${anomaly.toFixed(1)}` : anomaly.toFixed(1);

  // Generate month chart data deterministically
  const monthData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const normalVal = normal - 2 + Math.sin(i / 5) * 3;
      const actualVal = normalVal + 2 + Math.sin(i / 3.5) * 3;
      return { day: i + 1, normal: normalVal, actual: actualVal };
    });
  }, [normal]);

  const W = 340;
  const H = 140;
  const pad = 18;
  const allT = monthData.flatMap((d) => [d.normal, d.actual]);
  const lo = Math.floor(Math.min(...allT) - 2);
  const hi = Math.ceil(Math.max(...allT) + 2);
  const xPos = (i: number) => pad + (i / (monthData.length - 1)) * (W - pad * 2);
  const yPos = (v: number) => pad + (1 - (v - lo) / (hi - lo)) * (H - pad * 2);

  const normalPath = monthData
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(d.normal).toFixed(1)}`)
    .join(' ');
  const actualPath = monthData
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(d.actual).toFixed(1)}`)
    .join(' ');

  return (
    <div className="civ-cl sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-cl-nav">
        <button className="civ-cl-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-cl-nav-title">Climate Normals</div>
        <div className="civ-cl-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-cl-header">
        <div className="civ-cl-kicker">Climate &middot; Today vs. normal</div>
        <div className="civ-cl-title">
          {currentTemp}&deg;F today vs. {normal}&deg;F normal ({anomalyStr}&deg;F)
        </div>
        <div className="civ-cl-byline">
          30-year baseline: {normal}&deg;F for April in Honolulu &middot; 1991&ndash;2020 normals
        </div>
      </div>

      {/* Temperature anomaly chart */}
      <div className="civ-cl-sec">Temperature &middot; this month</div>
      <div className="civ-cl-chart">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="civ-cl-warm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d63a2f" stopOpacity="0.35" />
              <stop offset="1" stopColor="#d63a2f" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* baseline shading for above-normal days */}
          {monthData.map((d, i) => {
            if (d.actual <= d.normal) return null;
            const next = monthData[i + 1];
            if (!next) return null;
            return (
              <path
                key={i}
                d={`M${xPos(i)},${yPos(d.normal)} L${xPos(i)},${yPos(d.actual)} L${xPos(i + 1)},${yPos(next.actual)} L${xPos(i + 1)},${yPos(next.normal)} Z`}
                fill="url(#civ-cl-warm)"
              />
            );
          })}
          {/* grid lines */}
          {Array.from({ length: 4 }).map((_, i) => {
            const v = lo + (i * (hi - lo)) / 3;
            return (
              <line
                key={i}
                x1={pad}
                y1={yPos(v)}
                x2={W - pad}
                y2={yPos(v)}
                stroke="var(--line)"
                strokeDasharray="2 3"
              />
            );
          })}
          {/* normal line */}
          <path d={normalPath} fill="none" stroke="var(--ink-mute)" strokeWidth="1.3" strokeDasharray="3 3" />
          {/* actual line */}
          <path d={actualPath} fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
          {/* legend */}
          <g transform="translate(14, 14)">
            <line x1="0" y1="0" x2="14" y2="0" stroke="var(--ink)" strokeWidth="1.8" />
            <text x="18" y="3" fontSize="9" fontFamily="var(--mono)" fill="var(--ink-soft)">Observed</text>
            <line x1="78" y1="0" x2="92" y2="0" stroke="var(--ink-mute)" strokeWidth="1.3" strokeDasharray="3 3" />
            <text x="96" y="3" fontSize="9" fontFamily="var(--mono)" fill="var(--ink-soft)">1991&ndash;2020 normal</text>
          </g>
        </svg>
        <div className="civ-cl-chart-axis">
          <div style={{ flex: 1 }}>Apr 1</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Apr 15</div>
          <div style={{ flex: 0.5, textAlign: 'right' }}>Today</div>
        </div>
      </div>

      {/* Key anomalies grid */}
      <div className="civ-cl-sec">Anomalies this month</div>
      <div className="civ-cl-anomalies">
        {anomalyCards.map((s) => (
          <div key={s.label} className="civ-cl-anomaly">
            <div className="civ-cl-anom-label">{s.label}</div>
            <div className="civ-cl-anom-val" style={{ color: s.color }}>{s.val}</div>
            <div className="civ-cl-anom-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Long-term context */}
      <div className="civ-cl-context">
        <div className="civ-cl-sec" style={{ padding: 0, marginBottom: 8 }}>Long-term context</div>
        <div className="civ-cl-context-box">
          Aprils have warmed by <b style={{ color: 'var(--ink)' }}>+2.1&deg;F</b> per century since 1895.
          Growing season starts <b style={{ color: 'var(--ink)' }}>18 days earlier</b> than it did in the 1970s.
        </div>
      </div>

      {/* Provenance */}
      <div className="civ-cl-prov">
        <div><span className="civ-cl-prov-diamond">&loz;</span> Source &middot; <span className="civ-cl-prov-val">NOAA NCEI &middot; nClimGrid &middot; NWS Climate Normals (1991&ndash;2020)</span></div>
        <div>Updated &middot; <span className="civ-cl-prov-val">Daily</span></div>
      </div>
    </div>
  );
}
