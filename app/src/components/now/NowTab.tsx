import type { WeatherData, UserPreferences } from '../../types/weather';
import { forecastIcon, uvLabel, aqiLabel, humidityLabel, formatHour, beaufortScale } from '../../services/utils';
import './NowTab.css';

interface Props {
  data: WeatherData;
  prefs: UserPreferences;
}

export function NowTab({ data }: Props) {
  const { periods, hourly, alerts, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return (
      <div className="now-loading">
        <div className="now-spinner" />
        <span>Loading NWS data…</span>
      </div>
    );
  }

  if (data.error && !p0) {
    return (
      <div className="now-loading">
        <span>⚠️ {data.error}</span>
      </div>
    );
  }

  const temp = p0?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const detail = p0?.detailedForecast ?? '';
  const windMph = env.windMph;
  const bft = windMph != null ? beaufortScale(windMph) : null;
  const uv = uvLabel(env.uv);
  const aqi = aqiLabel(env.aqi);
  const hum = humidityLabel(env.humidity);
  const primaryAlert = alerts[0]?.properties;

  return (
    <div className="now-tab">
      {/* Alert banner */}
      {primaryAlert && (
        <div className={`now-alert-bar${primaryAlert.severity === 'Extreme' || primaryAlert.severity === 'Severe' ? ' severe' : ''}`}>
          <div className="now-alert-dot" />
          <div>
            <div className="now-alert-type">{primaryAlert.event.toUpperCase()}</div>
            <div className="now-alert-sub">{(primaryAlert.headline || '').slice(0, 60)}</div>
          </div>
          <div className="now-alert-arr">›</div>
        </div>
      )}

      <div className="now-inner">
        {/* Hero */}
        <div className="now-hero">
          <div className="now-sky" />
          <div className="now-sun" />
          <div className="now-hero-content">
            <div className="now-loc-row">
              <div className="now-loc-dot" />
              <span className="now-loc-name">{point?.city || 'Honolulu'}, Oahu</span>
              <span className="now-nws-tag">NWS</span>
            </div>
            <p className="now-summary">
              <strong>{cond}.</strong> {detail.slice(0, 120)}
            </p>
            <div className="now-temp-row">
              <div className="now-temp-num">{temp}<span className="now-temp-deg">°</span></div>
              <div className="now-temp-meta">
                <div className="now-cond">{cond}</div>
                <div className="now-hl">
                  {periods[0] && <span className="now-chip">H {periods.find(p => p.isDaytime)?.temperature ?? temp}°</span>}
                  {periods[1] && <span className="now-chip">L {periods.find(p => !p.isDaytime)?.temperature ?? '—'}°</span>}
                </div>
                <div className="now-feels">
                  {env.feelsF != null && `Feels ${env.feelsF}°`}
                  {env.humidity != null && ` · Dew pt ${Math.round(temp as number - (100 - env.humidity) / 5)}°`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wind card */}
        {windMph != null && (
          <>
            <div className="now-sec">WIND</div>
            <div className="now-wind-card">
              <div className="now-compass">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="30" fill="rgba(10,22,50,.6)" stroke="rgba(56,189,248,.15)" strokeWidth="1"/>
                  <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(56,189,248,.08)" strokeWidth="1"/>
                  <text x="32" y="8" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(56,189,248,.6)">N</text>
                  <text x="56" y="35" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(91,132,172,.4)">E</text>
                  <text x="32" y="60" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(91,132,172,.4)">S</text>
                  <text x="8" y="35" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(91,132,172,.4)">W</text>
                  <g transform={`translate(32,32) rotate(${env.windDeg ?? 45})`}>
                    <polygon points="0,-18 4,-6 0,-10 -4,-6" fill="#38bdf8" opacity=".9"/>
                    <polygon points="0,18 4,6 0,10 -4,6" fill="rgba(91,132,172,.3)"/>
                  </g>
                  <circle cx="32" cy="32" r="3" fill="#38bdf8"/>
                </svg>
              </div>
              <div className="now-wind-data">
                <div className="now-wind-main">{windMph} <span className="now-wind-unit">mph</span></div>
                <div className="now-wind-dir">{env.windDir ?? 'N/A'}</div>
                {env.gustMph && <div className="now-wind-gust">Gusts to {env.gustMph} mph</div>}
                {bft && <span className="now-beaufort">Beaufort {bft.scale} · {bft.label}</span>}
              </div>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="now-sec">CONDITIONS</div>
        <div className="now-stats-row">
          <div className="now-stat"><div className="now-stat-v">{env.humidity ?? '—'}<span className="now-stat-u">%</span></div><div className="now-stat-l">HUMIDITY</div><div className="now-stat-s" style={{ color: hum.color }}>{hum.text}</div></div>
          <div className="now-stat"><div className="now-stat-v">{env.visibMi ?? '—'}<span className="now-stat-u">mi</span></div><div className="now-stat-l">VISIBILITY</div><div className="now-stat-s" style={{ color: 'var(--ok)' }}>{(env.visibMi ?? 0) >= 6 ? 'Excellent' : 'Reduced'}</div></div>
          <div className="now-stat"><div className="now-stat-v">{env.uv ?? '—'}</div><div className="now-stat-l">UV INDEX</div><div className="now-stat-s" style={{ color: uv.color }}>{uv.text}</div></div>
          <div className="now-stat"><div className="now-stat-v">{env.aqi ?? '—'}</div><div className="now-stat-l">AQI</div><div className="now-stat-s" style={{ color: aqi.color }}>{aqi.text}</div></div>
        </div>

        {/* Hourly */}
        <div className="now-sec">HOURLY</div>
        <div className="now-hourly">
          {hourly.map((h, i) => {
            const pop = h.probabilityOfPrecipitation?.value ?? 0;
            return (
              <div key={i} className={`now-hr${i === 0 ? ' now' : ''}`}>
                <div className="now-hr-t">{i === 0 ? 'Now' : formatHour(h.startTime)}</div>
                <div className="now-hr-i">{forecastIcon(h.shortForecast)}</div>
                <div className="now-hr-v">{h.temperature}°</div>
                <div className="now-hr-p" style={{ color: pop >= 30 ? 'var(--accent)' : 'var(--dim)' }}>{pop}%</div>
                <div className="now-hr-bar"><div className="now-hr-fill" style={{ width: `${pop}%` }} /></div>
              </div>
            );
          })}
        </div>

        {/* Alert cards */}
        {alerts.length > 0 && (
          <>
            <div className="now-sec">ACTIVE ALERTS</div>
            {alerts.slice(0, 3).map((al, i) => {
              const a = al.properties;
              const isWarn = a.severity === 'Extreme' || a.severity === 'Severe';
              return (
                <div key={i} className={`now-alert-card${isWarn ? ' warn' : ''}`}>
                  <div className="now-ac-head">
                    <div className="now-ac-dot" style={isWarn ? { background: 'var(--danger)' } : undefined} />
                    <div className="now-ac-lbl" style={isWarn ? { color: 'var(--danger)' } : undefined}>{a.event.toUpperCase()}</div>
                  </div>
                  <div className="now-ac-text">{(a.description || a.headline || '').slice(0, 200)}</div>
                  {a.expires && <div className="now-ac-exp">EXPIRES {new Date(a.expires).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}</div>}
                </div>
              );
            })}
          </>
        )}

        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
