import type { WeatherData } from '../../types/weather';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import { SeverityChip, nwsToSeverity } from '../shared/SeverityChip';
import { uvLabel, aqiLabel, humidityLabel, formatHour } from '../../services/utils';
import './HomeScreen.css';

interface Props {
  data: WeatherData;
  onOpenSettings?: () => void;
}

export function HomeScreen({ data, onOpenSettings }: Props) {
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
        <div className="home-header-right">
          <span className="home-header-time">{dateStr} · {timeStr}</span>
          {onOpenSettings && (
            <button className="home-settings-btn" onClick={onOpenSettings} aria-label="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          )}
        </div>
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

      {/* ── Safety Tips (contextual, when alert active) ── */}
      <SafetyTips alerts={alerts} />

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

      {/* ── DIVE: Today in Context ── */}
      <TodayInContext temp={typeof temp === 'number' ? temp : null} />

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

      {/* ── DIVE: Hazard Status Grid ── */}
      <div className="home-section-label sb-mono">
        <span>Hazard status</span>
        <div className="home-section-rule" />
      </div>
      <div className="home-hazard-grid">
        <HazardCard label="EARTHQUAKE" hazard={data.hazards.earthquake} />
        <HazardCard label="SURF" hazard={data.hazards.surf} />
        <HazardCard label="TROPICAL" hazard={data.hazards.tropical} />
        <HazardCard label="TSUNAMI" hazard={data.hazards.tsunami} />
        <HazardCard label="FIRE" hazard={data.hazards.fire} />
        <HazardCard label="VOG" hazard={data.hazards.vog} />
      </div>

      {/* Data Provenance Footer */}
      <div className="home-footer-provenance">
        <div className="home-footer-provenance-line">
          ◇ NWS {point?.office || 'HFO'} · {point?.city || 'Honolulu'} station<br />
          Issued {timeStr}
        </div>
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

function TodayInContext({ temp }: { temp: number | null }) {
  const APRIL_NORMAL = 82;
  if (temp == null) return null;
  const diff = temp - APRIL_NORMAL;
  const diffLabel = diff > 0 ? `+${diff}° above normal` : diff < 0 ? `${diff}° below normal` : 'At normal';
  const diffClass = diff > 0 ? 'home-context-diff--above' : diff < 0 ? 'home-context-diff--below' : 'home-context-diff--normal';

  return (
    <>
      <div className="home-section-label sb-mono">
        <span>Today in context</span>
        <div className="home-section-rule" />
      </div>
      <div className="home-context-card">
        <div className="home-context-label">Today&apos;s forecast vs. normal</div>
        <div className="home-context-row">
          <div className="home-context-temp">{temp}°</div>
          <div className={`home-context-diff ${diffClass}`}>{diffLabel}</div>
        </div>
        <div className="home-context-normal">30-year April normal: {APRIL_NORMAL}° · Honolulu</div>
      </div>
    </>
  );
}

const SAFETY_TIPS: Record<string, { title: string; tips: string[] }> = {
  'Wind Advisory': {
    title: 'Wind safety',
    tips: [
      'Secure loose outdoor objects — patio furniture, trash bins, signs',
      'Stay away from trees and power lines; falling branches are a top injury risk',
      'Use caution driving high-profile vehicles and on bridges',
    ],
  },
  'High Wind Warning': {
    title: 'High wind safety',
    tips: [
      'Avoid being outdoors — seek shelter in a sturdy building',
      'Stay away from windows; flying debris can shatter glass',
      'If driving, pull over and wait for gusts to pass; do not park under trees',
    ],
  },
  'Flood Watch': {
    title: 'Flood preparedness',
    tips: [
      'Move valuables and important documents to higher ground',
      'Avoid walking or driving through flood waters — 6 inches can knock you down',
      'Identify your evacuation route before conditions worsen',
    ],
  },
  'Flash Flood Warning': {
    title: 'Flash flood safety',
    tips: [
      'Move to higher ground immediately — do not wait for instructions',
      'Never drive through flooded roadways — turn around, don\'t drown',
      'Stay off bridges over fast-moving water',
    ],
  },
  'High Surf Advisory': {
    title: 'Surf safety',
    tips: [
      'Stay off rocks, jetties, and seawalls — waves can sweep you in without warning',
      'Swim only at lifeguarded beaches; obey all posted signs',
      'Keep a safe distance from the shoreline; rip currents are likely',
    ],
  },
  'Heat Advisory': {
    title: 'Heat safety',
    tips: [
      'Stay hydrated — drink water before you feel thirsty',
      'Limit outdoor activity to early morning or evening hours',
      'Never leave children or pets in a parked vehicle',
    ],
  },
  'Thunderstorm': {
    title: 'Thunderstorm safety',
    tips: [
      'Move indoors when you hear thunder — if you can hear it, you can be struck',
      'Avoid open fields, hilltops, and isolated trees',
      'Wait 30 minutes after the last thunder before going back outside',
    ],
  },
};

function matchSafetyTips(eventName: string): { title: string; tips: string[] } | null {
  if (SAFETY_TIPS[eventName]) return SAFETY_TIPS[eventName];
  const lower = eventName.toLowerCase();
  if (lower.includes('wind')) return SAFETY_TIPS['Wind Advisory'];
  if (lower.includes('flood')) return SAFETY_TIPS['Flood Watch'];
  if (lower.includes('surf') || lower.includes('rip current')) return SAFETY_TIPS['High Surf Advisory'];
  if (lower.includes('heat') || lower.includes('excessive')) return SAFETY_TIPS['Heat Advisory'];
  if (lower.includes('thunderstorm') || lower.includes('severe')) return SAFETY_TIPS['Thunderstorm'];
  return null;
}

function SafetyTips({ alerts }: { alerts: import('../../types/weather').Alert[] }) {
  if (alerts.length === 0) return null;
  const firstEvent = alerts[0].properties.event;
  const tips = matchSafetyTips(firstEvent);
  if (!tips) return null;

  return (
    <div className="home-safety-card">
      <div className="home-safety-label">{tips.title}</div>
      <div className="home-safety-title">{firstEvent} — what to do</div>
      <div className="home-safety-list">
        {tips.tips.map((tip, i) => (
          <div key={i} className="home-safety-item">
            <div className="home-safety-num">{i + 1}</div>
            <div className="home-safety-text">{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function hazardStatusColor(status: string): string {
  switch (status) {
    case 'warning': return 'var(--sev-warning)';
    case 'watch': return 'var(--sev-watch)';
    case 'advisory': return 'var(--sev-advisory)';
    default: return 'var(--blue)';
  }
}

function hazardStatusLabel(status: string): string {
  switch (status) {
    case 'warning': return 'WARNING';
    case 'watch': return 'WATCH';
    case 'advisory': return 'ADVISORY';
    default: return 'OK';
  }
}

function HazardCard({ label, hazard }: { label: string; hazard: import('../../types/weather').HazardStatus | null }) {
  const status = hazard?.status ?? 'ok';
  const detail = hazard?.detail ?? '—';
  const color = hazardStatusColor(status);

  return (
    <div className="home-hazard-card">
      <div className="home-hazard-label">{label}</div>
      <div className="home-hazard-status" style={{ color }}>{hazardStatusLabel(status)}</div>
      <div className="home-hazard-detail">{detail}</div>
    </div>
  );
}
