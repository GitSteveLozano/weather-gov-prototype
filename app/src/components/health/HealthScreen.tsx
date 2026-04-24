import type { WeatherData } from '../../types/weather';
import './HealthScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

const POLLEN_COLORS = ['#2b8a3e', '#8aac3e', '#d4a017', '#e8701e', '#d63a2f'];
const POLLEN_SCALES = ['Very low', 'Low', 'Moderate', 'High', 'Very high'];

interface PollenRowData {
  name: string;
  level: number;
}

function PollenRow({ name, level }: PollenRowData) {
  const scale = POLLEN_SCALES[level - 1] || 'None';
  const color = POLLEN_COLORS[level - 1] || '#9a9388';

  return (
    <div className="health-pollen-row">
      <div className="health-pollen-name">{name}</div>
      <div className="health-pollen-bars">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="health-pollen-bar"
            style={{ background: i < level ? color : undefined }}
          />
        ))}
      </div>
      <div className="health-pollen-scale">{scale}</div>
    </div>
  );
}

function getAqiStatus(aqi: number): { label: string; color: string } {
  if (aqi <= 50) return { label: 'Good', color: '#2b8a3e' };
  if (aqi <= 100) return { label: 'Moderate', color: '#d4a017' };
  if (aqi <= 150) return { label: 'Unhealthy (sens.)', color: '#e8701e' };
  return { label: 'Unhealthy', color: '#d63a2f' };
}

function getUvStatus(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: 'Low', color: '#2b8a3e' };
  if (uv <= 5) return { label: `Moderate · burn 45m`, color: '#d4a017' };
  if (uv <= 7) return { label: 'High · burn 25m', color: '#e8701e' };
  return { label: 'Very high · burn 15m', color: '#d63a2f' };
}

function getHeadline(aqi: number, uv: number): string {
  if (aqi > 100 || uv > 7) return 'Caution outdoors today';
  if (aqi > 50 || uv > 5) return 'Fair day to be outside';
  return 'Good day to be outside';
}

export function HealthScreen({ data, onBack }: Props) {
  const aqi = data.env.aqi ?? 38;
  const uv = data.env.uv ?? 4;
  const aqiStatus = getAqiStatus(aqi);
  const uvStatus = getUvStatus(uv);
  const headline = getHeadline(aqi, uv);

  return (
    <div className="health sb-scroll">
      {/* Sub-navigation header */}
      <div className="health-nav">
        <button className="health-back" onClick={onBack} aria-label="Back">
          &lsaquo;
        </button>
        <div className="health-nav-title">Health</div>
        <div className="health-nav-crumb">Outdoor</div>
      </div>

      {/* Masthead */}
      <div className="health-masthead">
        <div className="health-label">Breathing &amp; outdoor health</div>
        <div className="health-title">{headline}</div>
      </div>

      {/* AQI + UV pair cards */}
      <div className="health-pair">
        <div className="health-stat">
          <div className="health-stat-label">Air quality</div>
          <div className="health-stat-val">{aqi}</div>
          <div className="health-stat-sub" style={{ color: aqiStatus.color }}>
            &#9679; {aqiStatus.label}
          </div>
        </div>
        <div className="health-stat">
          <div className="health-stat-label">UV index</div>
          <div className="health-stat-val">{uv}</div>
          <div className="health-stat-sub" style={{ color: uvStatus.color }}>
            &#9679; {uvStatus.label}
          </div>
        </div>
      </div>

      {/* Pollen section */}
      <div className="health-sec">Pollen</div>
      <div className="health-pollen-wrap">
        <div className="health-pollen">
          <PollenRow name="Tree &middot; Oak, maple" level={4} />
          <PollenRow name="Grass" level={2} />
          <PollenRow name="Weed &middot; Ragweed" level={1} />
          <PollenRow name="Mold spores" level={2} />
        </div>
      </div>

      {/* Allergy tip card */}
      <div className="health-tip">
        <b>Tip for allergy sufferers:</b> Oak pollen peaks 6&ndash;10 AM. If
        you can, run outside after 11 or wait for Thursday&rsquo;s rain to
        clear the air.
      </div>

      {/* Footer */}
      <div className="health-footer">
        &loz; AirNow &middot; EPA &middot; Pollen.com
      </div>
    </div>
  );
}
