import type { WeatherData } from '../../types/weather';
import './AirQualityScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

function aqiCategory(aqi: number): { label: string; short: string; color: string } {
  if (aqi <= 50) return { label: 'Good', short: 'Good', color: '#6a8e4e' };
  if (aqi <= 100) return { label: 'Moderate', short: 'Moderate', color: '#d4a017' };
  if (aqi <= 150) return { label: 'Unhealthy for sensitive groups', short: 'USG', color: '#e8701e' };
  if (aqi <= 200) return { label: 'Unhealthy', short: 'Unhealthy', color: '#d63a2f' };
  if (aqi <= 300) return { label: 'Very unhealthy', short: 'Very unhlthy', color: '#a81e5b' };
  return { label: 'Hazardous', short: 'Hazardous', color: '#6b2234' };
}

export function AirQualityScreen({ data, onBack }: Props) {
  const rawAqi = data.env.aqi;
  const rawPm25 = data.env.pm25;

  const AQI = rawAqi ?? 118;
  const pm25Val = rawPm25 ?? 42;
  const cat = aqiCategory(AQI);

  const pollutants = [
    { id: 'PM2.5', name: 'Fine particulate', value: pm25Val, unit: 'µg/m³', aqi: AQI, primary: true, note: rawPm25 != null ? `AQI ${AQI}` : 'Wildfire smoke transported from QC' },
    { id: 'O₃', name: 'Ozone (8-hr)', value: 54, unit: 'ppb', aqi: 58, primary: false, note: 'Moderate' },
    { id: 'NO₂', name: 'Nitrogen dioxide', value: 18, unit: 'ppb', aqi: 28, primary: false, note: 'Good' },
    { id: 'PM10', name: 'Coarse particulate', value: 28, unit: 'µg/m³', aqi: 32, primary: false, note: 'Good' },
    { id: 'SO₂', name: 'Sulfur dioxide', value: 3, unit: 'ppb', aqi: 4, primary: false, note: 'Good' },
    { id: 'CO', name: 'Carbon monoxide', value: 0.4, unit: 'ppm', aqi: 5, primary: false, note: 'Good' },
  ];

  const forecast = [
    { when: 'Today', aqi: AQI, cat: cat.short, color: cat.color },
    { when: 'Tomorrow', aqi: 98, cat: 'Moderate', color: '#d4a017' },
    { when: 'Thu', aqi: 76, cat: 'Moderate', color: '#d4a017' },
    { when: 'Fri', aqi: 48, cat: 'Good', color: '#6a8e4e' },
  ];

  const sensors = [
    { name: 'McMillan Reservoir', id: 'EPA · 11-001-0043', dist: '4.2 mi W', type: 'regulatory' as const },
    { name: 'Rockville monitor', id: 'EPA · 24-031-0080', dist: '8.1 mi N', type: 'regulatory' as const },
    { name: 'Silver Spring #214', id: 'PurpleAir · 162841', dist: '0.6 mi', type: 'low-cost' as const },
  ];

  const scaleSegments = [
    { color: '#6a8e4e', flex: 50 },
    { color: '#d4a017', flex: 50 },
    { color: '#e8701e', flex: 50 },
    { color: '#d63a2f', flex: 100 },
    { color: '#a81e5b', flex: 100 },
    { color: '#6b2234', flex: 150 },
  ];

  return (
    <div className="civ-aq sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-aq-nav">
        <button className="civ-aq-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-aq-nav-title">Air Quality</div>
        <div className="civ-aq-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-aq-header">
        <div className="civ-aq-kicker">Air Quality &middot; AirNow</div>
        <div className="civ-aq-title">{cat.label} today</div>
        <div className="civ-aq-byline">AQI {AQI} &middot; dominant pollutant PM2.5</div>
      </div>

      {/* Big AQI number */}
      <div className="civ-aq-hero">
        <div className="civ-aq-gauge" style={{ background: cat.color }}>
          <div className="civ-aq-gauge-label">AQI</div>
          <div className="civ-aq-gauge-val">{AQI}</div>
          <div className="civ-aq-gauge-cat">{cat.short}</div>
        </div>
        <div>
          <div className="civ-aq-category">{cat.label}</div>
          <div className="civ-aq-guidance">
            People with asthma, heart disease, children, and older adults should reduce prolonged outdoor exertion through evening.
          </div>
        </div>
      </div>

      {/* AQI scale strip */}
      <div className="civ-aq-scale">
        <div className="civ-aq-scale-bar">
          {scaleSegments.map((s, i) => (
            <div key={i} style={{ flex: s.flex, background: s.color }} />
          ))}
        </div>
        <div className="civ-aq-scale-track">
          <div className="civ-aq-scale-marker" style={{ left: `${(AQI / 500) * 100}%` }}>
            <div className="civ-aq-scale-tick" />
            <div className="civ-aq-scale-num">{AQI}</div>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>0</div>
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}>500</div>
        </div>
      </div>

      {/* Pollutant breakdown */}
      <div className="civ-aq-sec">Pollutants measured</div>
      <div className="civ-aq-pollutants">
        {pollutants.map((p) => (
          <div key={p.id} className="civ-aq-pollutant">
            <div className="civ-aq-poll-id" style={{ color: p.primary ? cat.color : undefined }}>{p.id}</div>
            <div style={{ flex: 1 }}>
              <div className="civ-aq-poll-name">
                {p.name}
                {p.primary && <span className="civ-aq-poll-primary" style={{ color: cat.color }}>PRIMARY</span>}
              </div>
              <div className="civ-aq-poll-detail">{p.value} {p.unit} &middot; {p.note}</div>
            </div>
            <div className="civ-aq-poll-aqi" style={{ color: p.primary ? cat.color : 'var(--ink-soft)' }}>{p.aqi}</div>
          </div>
        ))}
      </div>

      {/* 4-day forecast */}
      <div className="civ-aq-sec" style={{ paddingTop: 20 }}>4-day AQI forecast</div>
      <div className="civ-aq-forecast">
        {forecast.map((d) => (
          <div
            key={d.when}
            className="civ-aq-fday"
            style={{ background: d.color + '15', border: `1px solid ${d.color}40` }}
          >
            <div className="civ-aq-fday-when">{d.when}</div>
            <div className="civ-aq-fday-val" style={{ color: d.color }}>{d.aqi}</div>
            <div className="civ-aq-fday-cat">{d.cat}</div>
          </div>
        ))}
      </div>

      {/* Contributing sensors */}
      <div className="civ-aq-sec" style={{ paddingTop: 22 }}>Contributing sensors</div>
      <div className="civ-aq-sensors">
        {sensors.map((s, i) => (
          <div key={i} className="civ-aq-sensor">
            <div
              className="civ-aq-sensor-dot"
              style={{ background: s.type === 'regulatory' ? 'var(--blue)' : '#8a6a00' }}
            />
            <div style={{ flex: 1 }}>
              <div className="civ-aq-sensor-name">{s.name}</div>
              <div className="civ-aq-sensor-id">{s.id}</div>
            </div>
            <div className="civ-aq-sensor-dist">{s.dist}</div>
          </div>
        ))}
      </div>

      {/* Provenance */}
      <div className="civ-aq-prov">
        <div><span className="civ-aq-prov-diamond">&loz;</span> Source &middot; <span className="civ-aq-prov-val">EPA AirNow + PurpleAir (low-cost)</span></div>
        <div>Updated &middot; <span className="civ-aq-prov-val">1:45 PM &middot; hourly</span></div>
      </div>
    </div>
  );
}
