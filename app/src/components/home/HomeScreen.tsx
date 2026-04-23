import type { WeatherData } from '../../types/weather';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import { SeverityChip, nwsToSeverity } from '../shared/SeverityChip';
import { uvLabel, aqiLabel, humidityLabel, formatHour } from '../../services/utils';
import './HomeScreen.css';

interface Props {
  data: WeatherData;
}

export function HomeScreen({ data }: Props) {
  const { periods, hourly, alerts, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return (
      <div className="home-loading">
        <div className="home-spinner" />
        <span>Loading forecast…</span>
      </div>
    );
  }

  if (data.error && !p0) {
    return <div className="home-loading"><span>⚠ {data.error}</span></div>;
  }

  const temp = p0?.temperature ?? '—';
  const hi = periods.find(p => p.isDaytime)?.temperature ?? temp;
  const lo = periods.find(p => !p.isDaytime)?.temperature ?? '—';
  const condition = p0?.shortForecast ?? '';
  const summary = p0?.detailedForecast ?? '';
  const city = point?.city || 'Honolulu';
  const state = point?.state || 'HI';
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

  const uv = uvLabel(env.uv);
  const aqi = aqiLabel(env.aqi);
  const hum = humidityLabel(env.humidity);

  // Pair day/night for 7-day
  const dayPairs: { day: typeof periods[0]; night?: typeof periods[0] }[] = [];
  for (let i = 0; i < periods.length - 1; i += 2) {
    dayPairs.push({ day: periods[i], night: periods[i + 1] });
  }

  // Temp range for 7-day bars
  const allTemps = dayPairs.flatMap(p => [p.day.temperature, p.night?.temperature ?? p.day.temperature]);
  const tempMin = Math.min(...allTemps) - 2;
  const tempMax = Math.max(...allTemps) + 2;
  const tempRange = tempMax - tempMin || 1;

  return (
    <div className="home">
      {/* Header */}
      <div className="home-header">
        <SBWordmark size={12} />
        <div className="home-header-time">{dateStr} · {timeStr}</div>
      </div>

      {/* Alert banners */}
      {alerts.map((al, i) => {
        const a = al.properties;
        const sev = nwsToSeverity(a.severity);
        return (
          <div key={i} className={`home-alert-banner home-alert-${sev}`}>
            <div className="home-alert-bar-left" />
            <SeverityChip level={sev} small />
            <div className="home-alert-content">
              <div className="home-alert-title">{a.event}</div>
              {a.headline && <div className="home-alert-sub">{a.headline.slice(0, 60)}</div>}
            </div>
            <span className="home-alert-chevron">›</span>
          </div>
        );
      })}

      {/* ── GLANCE ── */}
      <div className="home-glance">
        <div className="home-loc-masthead">
          <div className="home-loc-label">Forecast for</div>
          <div className="home-loc-name">{city}, <span className="home-loc-state">{state}</span></div>
        </div>

        <div className="home-hero">
          <div className="home-hero-left">
            <div className="home-temp">{temp}<span className="home-temp-deg">°</span></div>
            <div className="home-condition">{condition}</div>
            <div className="home-meta sb-mono">H {hi}° · L {lo}°{env.feelsF != null ? ` · Feels ${env.feelsF}°` : ''}</div>
          </div>
          <WxIcon kind={forecastToCondition(condition)} size={56} stroke={1.2} />
        </div>

        <div className="home-summary">{summary.slice(0, 200)}</div>
      </div>

      {/* ── SCAN: Hourly ── */}
      <div className="home-section-label sb-mono">
        <span>Next 12 hours</span>
        <div className="home-section-rule" />
      </div>
      <div className="home-hourly-scroll">
        <div className="home-hourly-inner">
          {hourly.map((h, i) => {
            const pop = h.probabilityOfPrecipitation?.value ?? 0;
            return (
              <div key={i} className="home-hourly-cell">
                <div className="home-hourly-time sb-mono">{i === 0 ? 'Now' : formatHour(h.startTime)}</div>
                <WxIcon kind={forecastToCondition(h.shortForecast)} size={22} stroke={1.4} />
                <div className="home-hourly-temp sb-mono">{h.temperature}°</div>
                {pop > 0 && <div className="home-hourly-pop sb-mono">{pop}%</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SCAN: 7-Day ── */}
      <div className="home-section-label sb-mono">
        <span>7-day outlook</span>
        <div className="home-section-rule" />
      </div>
      <div className="home-daily">
        {dayPairs.slice(0, 7).map((pair, i) => {
          const d = pair.day;
          const n = pair.night;
          const dHi = d.temperature;
          const dLo = n?.temperature ?? d.temperature;
          const pop = d.probabilityOfPrecipitation?.value ?? 0;
          const dt = new Date(d.startTime);
          const dayLabel = i === 0 ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'short' });
          const loPct = ((dLo - tempMin) / tempRange) * 100;
          const hiPct = ((dHi - tempMin) / tempRange) * 100;

          return (
            <div key={i} className="home-daily-row">
              <div className="home-daily-day">{dayLabel}</div>
              <WxIcon kind={forecastToCondition(d.shortForecast)} size={20} color="var(--ink-soft)" stroke={1.4} />
              <div className="home-daily-pop sb-mono" style={{ color: pop > 0 ? 'var(--sky-rain)' : 'transparent' }}>
                {pop > 0 ? `${pop}%` : '—'}
              </div>
              <div className="home-daily-lo sb-mono">{dLo}°</div>
              <div className="home-daily-bar">
                <div className="home-daily-bar-fill" style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} />
              </div>
              <div className="home-daily-hi sb-mono">{dHi}°</div>
            </div>
          );
        })}
      </div>

      {/* ── SCAN: Condition cards ── */}
      <div className="home-cards-grid">
        <MiniCard title="AIR QUALITY" value={env.aqi ?? '—'} unit="AQI" note={aqi.text} />
        <MiniCard title="UV INDEX" value={env.uv ?? '—'} note={uv.text} />
        <MiniCard title="WIND" value={env.windMph ?? '—'} unit="mph" note={env.windDir ?? '—'} />
        <MiniCard title="HUMIDITY" value={env.humidity ?? '—'} unit="%" note={hum.text} />
        <MiniCard title="PRESSURE" value={env.pressure ?? '—'} unit="mb" note="—" />
        <MiniCard title="VISIBILITY" value={env.visibMi ?? '—'} unit="mi" note={(env.visibMi ?? 0) >= 6 ? 'Clear' : 'Reduced'} />
      </div>

      {/* ── DIVE: Forecast Discussion ── */}
      {data.hazards.forecasterDiscussion && (
        <>
          <div className="home-section-label sb-mono">
            <span>Forecaster discussion</span>
            <div className="home-section-rule" />
          </div>
          <div className="home-dive-card">
            <div className="home-dive-header">
              <span className="home-dive-office sb-mono">NWS {point?.office || 'HFO'}</span>
              <span className="home-dive-issued sb-mono">
                {data.hazards.forecasterDiscussion.issued
                  ? new Date(data.hazards.forecasterDiscussion.issued).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                  : ''}
              </span>
            </div>
            <div className="home-dive-text">
              {data.hazards.forecasterDiscussion.text.slice(0, 500)}
              {data.hazards.forecasterDiscussion.text.length > 500 ? '…' : ''}
            </div>
          </div>
        </>
      )}

      {/* ── DIVE: Stream Gauges ── */}
      {data.gauges.some(g => g.level != null) && (
        <>
          <div className="home-section-label sb-mono">
            <span>Stream gauges</span>
            <div className="home-section-rule" />
          </div>
          <div className="home-dive-card">
            {data.gauges.filter(g => g.level != null).map((g, i) => {
              const isFlood = g.level! >= g.flood;
              const isAction = g.level! >= g.action;
              const statusColor = isFlood ? 'var(--sev-warning)' : isAction ? 'var(--sev-advisory)' : 'var(--blue)';
              const statusLabel = isFlood ? 'FLOOD' : isAction ? 'ELEVATED' : 'NORMAL';
              return (
                <div key={i} className="home-gauge-row">
                  <div className="home-gauge-dot" style={{ background: statusColor }} />
                  <div className="home-gauge-info">
                    <div className="home-gauge-name">{g.name}</div>
                    <div className="home-gauge-read sb-mono">{g.level!.toFixed(1)} ft · USGS {g.id}</div>
                  </div>
                  <div className="home-gauge-status sb-mono" style={{ color: statusColor }}>{statusLabel}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="home-footer sb-mono">
        <span>Issued {timeStr}</span>
        <span>{point?.office || 'HFO'}</span>
      </div>
    </div>
  );
}

function MiniCard({ title, value, unit, note }: { title: string; value: string | number; unit?: string; note: string }) {
  return (
    <div className="home-mini-card">
      <div className="home-mini-label sb-mono">{title}</div>
      <div className="home-mini-value">
        {value}
        {unit && <span className="home-mini-unit sb-mono">{unit}</span>}
      </div>
      <div className="home-mini-note">{note}</div>
    </div>
  );
}
