import type { WeatherData } from '../../types/weather';
import './WindScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

interface BeaufortLevel {
  num: number;
  label: string;
  maxMph: number;
}

const BEAUFORT: BeaufortLevel[] = [
  { num: 0, label: 'Calm', maxMph: 1 },
  { num: 1, label: 'Light air', maxMph: 3 },
  { num: 2, label: 'Light breeze', maxMph: 7 },
  { num: 3, label: 'Gentle breeze', maxMph: 12 },
  { num: 4, label: 'Moderate', maxMph: 18 },
  { num: 5, label: 'Fresh breeze', maxMph: 24 },
  { num: 6, label: 'Strong breeze', maxMph: 31 },
  { num: 7, label: 'Near gale', maxMph: 38 },
  { num: 8, label: 'Gale', maxMph: 46 },
  { num: 9, label: 'Strong gale', maxMph: 54 },
  { num: 10, label: 'Storm', maxMph: 63 },
  { num: 11, label: 'Violent storm', maxMph: 72 },
  { num: 12, label: 'Hurricane', maxMph: 999 },
];

function getBeaufortNum(mph: number): number {
  for (let i = 0; i < BEAUFORT.length; i++) {
    if (mph <= BEAUFORT[i].maxMph) return i;
  }
  return 12;
}

function dirToDeg(dir: string): number {
  const map: Record<string, number> = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
    E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
  };
  return map[dir] ?? 0;
}

interface HourlyWind {
  time: string;
  speed: number;
  dir: string;
}

function extractHourlyWind(data: WeatherData): HourlyWind[] {
  if (data.hourly && data.hourly.length > 0) {
    return data.hourly.slice(0, 12).map((h) => {
      const speedMatch = h.windSpeed.match(/(\d+)/);
      const speed = speedMatch ? parseInt(speedMatch[1], 10) : 0;
      const hour = new Date(h.startTime);
      const timeStr = hour.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }).replace(' ', '').toLowerCase();
      return { time: timeStr, speed, dir: h.windDirection };
    });
  }
  // Static fallback
  return [
    { time: 'Now', speed: 8, dir: 'WSW' },
    { time: '2p', speed: 10, dir: 'WSW' },
    { time: '3p', speed: 12, dir: 'SW' },
    { time: '4p', speed: 14, dir: 'SW' },
    { time: '5p', speed: 12, dir: 'SSW' },
    { time: '6p', speed: 10, dir: 'SSW' },
    { time: '7p', speed: 8, dir: 'S' },
    { time: '8p', speed: 6, dir: 'S' },
    { time: '9p', speed: 5, dir: 'SSE' },
    { time: '10p', speed: 4, dir: 'SE' },
    { time: '11p', speed: 4, dir: 'SE' },
    { time: '12a', speed: 3, dir: 'E' },
  ];
}

export function WindScreen({ data, onBack }: Props) {
  const windMph = data.env.windMph ?? 8;
  const gustMph = data.env.gustMph ?? 15;
  const windDir = data.env.windDir ?? 'WSW';
  const windDeg = data.env.windDeg ?? dirToDeg(windDir);
  const beaufortNum = getBeaufortNum(windMph);
  const hourlyWind = extractHourlyWind(data);

  // Compass rose constants
  const CX = 100;
  const CY = 100;
  const R = 80;

  // Wind arrow direction: meteorological convention - arrow points FROM the wind direction
  // So if wind is from WSW (247.5 deg), arrow should point from WSW toward center
  const arrowAngleRad = ((windDeg + 180) * Math.PI) / 180;
  const arrowX = CX + Math.sin(arrowAngleRad) * (R - 20);
  const arrowY = CY - Math.cos(arrowAngleRad) * (R - 20);
  const tailX = CX - Math.sin(arrowAngleRad) * (R - 20);
  const tailY = CY + Math.cos(arrowAngleRad) * (R - 20);

  // Beaufort colors: gentle gradient from green to red
  const beaufortColors = [
    '#c8d4e0', '#b8d8be', '#8ac68a', '#5ab85a', '#4a9e4a',
    '#d4a017', '#e89040', '#e8701e', '#d63a2f', '#c02020',
    '#a01020', '#800820', '#600020',
  ];

  return (
    <div className="wind sb-scroll">
      {/* Sub-navigation header */}
      <div className="wind-nav">
        <button className="wind-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="wind-nav-title">Wind</div>
        <div className="wind-nav-crumb">Specialty</div>
      </div>

      {/* Hero: current wind speed + direction */}
      <div className="wind-hero">
        <div className="wind-hero-left">
          <div className="wind-hero-label">Current wind</div>
          <div className="wind-hero-speed">
            {windMph}
            <span className="wind-hero-speed-unit">mph</span>
          </div>
          <div className="wind-hero-dir">
            {windDir} &middot; {windDeg}&deg;
          </div>
        </div>
        {/* Compass rose SVG */}
        <div className="wind-compass" style={{ padding: 0 }}>
          <svg width="120" height="120" viewBox="0 0 200 200">
            {/* Outer ring */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r={R / 2}
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            {/* Cardinal direction labels */}
            {[
              { label: 'N', angle: 0 },
              { label: 'E', angle: 90 },
              { label: 'S', angle: 180 },
              { label: 'W', angle: 270 },
            ].map((d) => {
              const labelR = R + 14;
              const rad = (d.angle * Math.PI) / 180;
              const lx = CX + Math.sin(rad) * labelR;
              const ly = CY - Math.cos(rad) * labelR;
              return (
                <text
                  key={d.label}
                  x={lx}
                  y={ly + 3}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--ink-mute)"
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {d.label}
                </text>
              );
            })}
            {/* Tick marks */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = i * 22.5;
              const isMajor = angle % 90 === 0;
              const rad = (angle * Math.PI) / 180;
              const r1 = R - (isMajor ? 8 : 4);
              const r2 = R;
              return (
                <line
                  key={i}
                  x1={CX + Math.sin(rad) * r1}
                  y1={CY - Math.cos(rad) * r1}
                  x2={CX + Math.sin(rad) * r2}
                  y2={CY - Math.cos(rad) * r2}
                  stroke="var(--ink-mute)"
                  strokeWidth={isMajor ? 1.5 : 0.8}
                />
              );
            })}
            {/* Wind direction arrow */}
            <line
              x1={tailX}
              y1={tailY}
              x2={arrowX}
              y2={arrowY}
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            {(() => {
              const headLen = 12;
              const headAngle = 25 * (Math.PI / 180);
              const dx = arrowX - tailX;
              const dy = arrowY - tailY;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / len;
              const uy = dy / len;
              const lx = arrowX - headLen * (ux * Math.cos(headAngle) - uy * Math.sin(headAngle));
              const ly = arrowY - headLen * (uy * Math.cos(headAngle) + ux * Math.sin(headAngle));
              const rx = arrowX - headLen * (ux * Math.cos(headAngle) + uy * Math.sin(headAngle));
              const ry = arrowY - headLen * (uy * Math.cos(headAngle) - ux * Math.sin(headAngle));
              return (
                <polygon
                  points={`${arrowX},${arrowY} ${lx},${ly} ${rx},${ry}`}
                  fill="var(--ink)"
                />
              );
            })()}
            {/* Center dot */}
            <circle cx={CX} cy={CY} r="3" fill="var(--ink)" />
          </svg>
        </div>
      </div>

      {/* Stats grid */}
      <div className="wind-grid">
        <div className="wind-stat">
          <div className="wind-stat-label">Gusts</div>
          <div className="wind-stat-val">{gustMph} mph</div>
          <div className="wind-stat-sub">moderate</div>
        </div>
        <div className="wind-stat">
          <div className="wind-stat-label">Direction</div>
          <div className="wind-stat-val">{windDir}</div>
          <div className="wind-stat-sub">{windDeg}&deg; true</div>
        </div>
      </div>

      {/* Beaufort scale indicator */}
      <div className="wind-sec">Beaufort scale</div>
      <div className="wind-beaufort-wrap">
        <div className="wind-beaufort">
          <div className="wind-beaufort-header">
            Force {beaufortNum} &middot; {BEAUFORT[beaufortNum].label}
          </div>
          {BEAUFORT.slice(0, 9).map((b) => {
            const isActive = b.num === beaufortNum;
            const fillPct = isActive
              ? 100
              : b.num < beaufortNum
                ? 100
                : 0;
            return (
              <div key={b.num} className="wind-beaufort-row">
                <div
                  className={`wind-beaufort-num${isActive ? ' wind-beaufort-active' : ''}`}
                >
                  {b.num}
                </div>
                <div className="wind-beaufort-track">
                  <div
                    className="wind-beaufort-fill"
                    style={{
                      width: `${fillPct}%`,
                      background: beaufortColors[b.num],
                    }}
                  />
                </div>
                <div
                  className={`wind-beaufort-label${isActive ? ' wind-beaufort-active' : ''}`}
                >
                  {b.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 24-hour wind forecast strip */}
      <div className="wind-sec">Wind forecast</div>
      <div className="wind-hourly-wrap">
        <div className="wind-hourly">
          <div className="wind-hourly-strip">
            {hourlyWind.map((h, i) => {
              const deg = dirToDeg(h.dir);
              return (
                <div key={i} className="wind-hourly-item">
                  <div className="wind-hourly-time">{h.time}</div>
                  <div className="wind-hourly-val">{h.speed}</div>
                  <div className="wind-hourly-dir">{h.dir}</div>
                  <div className="wind-hourly-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <g transform={`rotate(${deg + 180}, 8, 8)`}>
                        <line
                          x1="8"
                          y1="13"
                          x2="8"
                          y2="3"
                          stroke="var(--ink-soft)"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                        <polyline
                          points="5,6 8,3 11,6"
                          fill="none"
                          stroke="var(--ink-soft)"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="wind-footer">
        &loz; National Weather Service &middot; Wind Forecast
      </div>
    </div>
  );
}
