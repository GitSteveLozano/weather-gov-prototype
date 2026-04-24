import type { WeatherData, Alert } from '../../types/weather';
import type { DepthLevel } from '../../App';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import { SeverityChip, nwsToSeverity } from '../shared/SeverityChip';
import { NearbyNowStrip } from './NearbyNow';
import './HomeScreen.css';

interface Props {
  data: WeatherData;
  depth: DepthLevel;
  onOpenSettings: () => void;
  onOpenBrief?: () => void;
  onOpenAsk?: () => void;
  onOpenMarine?: () => void;
  onOpenAviation?: () => void;
  onOpenFire?: () => void;
  onOpenAlert?: (alert: Alert) => void;
}

function formatHour(iso: string) {
  return new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

export function HomeScreen({ data, depth, onOpenSettings, onOpenBrief, onOpenAsk, onOpenMarine, onOpenAlert }: Props) {
  const { periods, hourly, alerts, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return <div className="hm-loading"><div className="hm-spinner" /><span className="sb-mono">Loading forecast…</span></div>;
  }
  if (data.error && !p0) {
    return <div className="hm-loading"><span>⚠ {data.error}</span></div>;
  }

  const temp = p0?.temperature ?? '—';
  const hi = periods.find(p => p.isDaytime)?.temperature ?? temp;
  const lo = periods.find(p => !p.isDaytime)?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const summary = p0?.detailedForecast ?? '';
  const city = point?.city || 'Honolulu';
  const state = point?.state || 'HI';
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() + ' · ' +
    now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() + ' · ' +
    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

  // Pair periods for 7-day
  const dayPairs: { day: typeof periods[0]; night?: typeof periods[0] }[] = [];
  for (let i = 0; i < periods.length - 1; i += 2) dayPairs.push({ day: periods[i], night: periods[i + 1] });
  const allTemps = dayPairs.flatMap(p => [p.day.temperature, p.night?.temperature ?? p.day.temperature]);
  const tMin = Math.min(...allTemps) - 2, tMax = Math.max(...allTemps) + 2, tRange = tMax - tMin || 1;

  return (
    <div className="hm sb-scroll">
      {/* ── Header ── */}
      <div className="hm-header">
        <SBWordmark size={12} />
        <div className="hm-header-right">
          <span className="hm-date sb-mono">{dateStr}</span>
          <button className="hm-gear" onClick={onOpenSettings} aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      {/* ── Location masthead ── */}
      <div className="hm-masthead">
        <div className="hm-mast-label sb-mono">Forecast for</div>
        <div className="hm-mast-city">{city}, <span className="hm-mast-state">{state}</span></div>
      </div>

      {/* ── Alert banners ── */}
      {alerts.map((al, i) => {
        const a = al.properties;
        const sev = nwsToSeverity(a.severity);
        const colors: Record<string, string> = { statement: 'var(--sev-statement)', advisory: 'var(--sev-advisory)', watch: 'var(--sev-watch)', warning: 'var(--sev-warning)', emergency: 'var(--sev-emergency)' };
        return (
          <div key={i} className="hm-alert" onClick={() => onOpenAlert?.(al)}>
            <div className="hm-alert-bar" style={{ background: colors[sev] }} />
            <div className="hm-alert-body">
              <SeverityChip level={sev} small />
              <span className="hm-alert-title">{a.event}</span>
            </div>
            <span className="hm-alert-caret">›</span>
          </div>
        );
      })}

      {/* ── Hero: big temp ── */}
      <div className="hm-hero">
        <div className="hm-hero-left">
          <div className="hm-temp">{temp}<span className="hm-deg">°</span></div>
          <div className="hm-cond">{cond}</div>
          <div className="hm-meta sb-mono">H {hi}° · L {lo}°{env.feelsF != null ? ` · Feels ${env.feelsF}°` : ''}</div>
        </div>
        <WxIcon kind={forecastToCondition(cond)} size={56} color="var(--ink)" stroke={1.2} />
      </div>

      {/* ── Summary ── */}
      <div className="hm-summary">{summary.slice(0, 220)}</div>

      {/* ── Scan depth: Hourly + 7-Day + Cards ── */}
      {depth !== 'glance' && (
        <>
          <SectionLabel text="Next 12 hours" />
          <div className="hm-hourly sb-scroll">
            <div className="hm-hourly-inner">
              {hourly.map((h, i) => {
                const pop = h.probabilityOfPrecipitation?.value ?? 0;
                return (
                  <div key={i} className="hm-hcell">
                    <div className="hm-htime sb-mono">{i === 0 ? 'Now' : formatHour(h.startTime)}</div>
                    <WxIcon kind={forecastToCondition(h.shortForecast)} size={22} color="var(--ink)" stroke={1.4} />
                    <div className="hm-htemp sb-mono">{h.temperature}°</div>
                    {pop > 0 && <div className="hm-hpop sb-mono" style={{ color: 'var(--sky-rain)' }}>{pop}%</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <SectionLabel text="7-day outlook" />
          <div className="hm-daily">
            {dayPairs.slice(0, 7).map((pair, i) => {
              const d = pair.day, n = pair.night;
              const dHi = d.temperature, dLo = n?.temperature ?? d.temperature;
              const pop = d.probabilityOfPrecipitation?.value ?? 0;
              const dt = new Date(d.startTime);
              const dayLabel = i === 0 ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'short' });
              const loPct = ((dLo - tMin) / tRange) * 100;
              const hiPct = ((dHi - tMin) / tRange) * 100;
              return (
                <div key={i} className="hm-drow">
                  <div className="hm-dday">{dayLabel}</div>
                  <WxIcon kind={forecastToCondition(d.shortForecast)} size={20} color="var(--ink-soft)" stroke={1.4} />
                  <div className="hm-dpop sb-mono">{pop > 0 ? `${pop}%` : ''}</div>
                  <div className="hm-dlo sb-mono">{dLo}°</div>
                  <div className="hm-dbar"><div className="hm-dbar-fill" style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} /></div>
                  <div className="hm-dhi sb-mono">{dHi}°</div>
                </div>
              );
            })}
          </div>

          <div className="hm-cards">
            <MiniCard label="AIR QUALITY" value={env.aqi ?? '—'} unit="AQI" note={env.aqi != null ? (env.aqi <= 50 ? 'Good' : 'Moderate') : '—'} />
            <MiniCard label="UV INDEX" value={env.uv ?? '—'} note={env.uv != null ? (env.uv <= 2 ? 'Low' : env.uv <= 5 ? 'Moderate' : 'High') : '—'} />
            <MiniCard label="WIND" value={env.windMph ?? '—'} unit="mph" note={env.windDir ?? '—'} />
            <MiniCard label="HUMIDITY" value={env.humidity ?? '—'} unit="%" note={env.humidity != null ? (env.humidity < 60 ? 'Comfortable' : 'Muggy') : '—'} />
            <MiniCard label="PRESSURE" value={env.pressure ?? '—'} unit="in" note="Steady" />
            <MiniCard label="VISIBILITY" value={env.visibMi ?? '—'} unit="mi" note={(env.visibMi ?? 0) >= 6 ? 'Clear' : 'Reduced'} />
          </div>
        </>
      )}

      {/* ── Dive depth: Forecast discussion ── */}
      {depth === 'dive' && data.hazards.forecasterDiscussion && (
        <>
          <SectionLabel text="Forecaster discussion" />
          <div className="hm-dive-card">
            <div className="hm-dive-head">
              <span className="hm-dive-office sb-mono">NWS {point?.office || 'HFO'}</span>
              <span className="hm-dive-issued sb-mono">
                {data.hazards.forecasterDiscussion.issued ? new Date(data.hazards.forecasterDiscussion.issued).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}
              </span>
            </div>
            <div className="hm-dive-text">{data.hazards.forecasterDiscussion.text.slice(0, 400)}{data.hazards.forecasterDiscussion.text.length > 400 ? '…' : ''}</div>
          </div>
        </>
      )}

      {/* ── Nearby & Now contextual chips (Scan + Dive) ── */}
      {depth !== 'glance' && (
        <>
          <SectionLabel text="Nearby & now" />
          <NearbyNowStrip data={data} onNavigate={(screen) => {
            if (screen === 'marine') onOpenMarine?.();
          }} />
        </>
      )}

      {/* ── Specialty products (Dive only) ── */}
      {depth === 'dive' && (
        <>
          <SectionLabel text="Specialty products" />
          <div className="hm-spec-grid">
            {onOpenMarine && <div className="hm-spec-card" onClick={onOpenMarine}><span className="hm-spec-ico">🌊</span><span className="hm-spec-name">Marine</span></div>}
            <div className="hm-spec-card"><span className="hm-spec-ico">✈️</span><span className="hm-spec-name">Aviation</span></div>
            <div className="hm-spec-card"><span className="hm-spec-ico">🔥</span><span className="hm-spec-name">Fire</span></div>
            <div className="hm-spec-card"><span className="hm-spec-ico">🌀</span><span className="hm-spec-name">Hurricane</span></div>
          </div>
        </>
      )}

      {/* ── AI entry points ── */}
      {onOpenBrief && (
        <div className="hm-brief-entry" onClick={onOpenBrief}>
          <div className="hm-brief-badge sb-mono"><span className="hm-brief-dot" />Morning brief</div>
          <div className="hm-brief-preview">Personalized weather digest for your day →</div>
        </div>
      )}
      {onOpenAsk && (
        <div className="hm-ask-entry" onClick={onOpenAsk}>
          <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="var(--paper)" strokeWidth="1.3"/></svg>
          <span className="hm-ask-text">Ask about today's weather…</span>
          <span className="hm-ask-ai sb-mono">AI</span>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="hm-footer sb-mono">
        <span>◇ National Weather Service · {point?.office || 'HFO'}</span>
        <span>Updated {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
      </div>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="hm-sec sb-mono"><span>{text}</span><div className="hm-sec-rule" /></div>
  );
}

function MiniCard({ label, value, unit, note }: { label: string; value: string | number; unit?: string; note: string }) {
  return (
    <div className="hm-card">
      <div className="hm-card-label sb-mono">{label}</div>
      <div className="hm-card-value">{value}{unit && <span className="hm-card-unit sb-mono">{unit}</span>}</div>
      <div className="hm-card-note">{note}</div>
    </div>
  );
}
