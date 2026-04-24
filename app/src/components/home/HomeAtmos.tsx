import type { WeatherData } from '../../types/weather';
import type { DepthLevel } from '../../App';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import { SeverityChip, nwsToSeverity } from '../shared/SeverityChip';
import './HomeAtmos.css';

interface Props {
  data: WeatherData;
  depth: DepthLevel;
  onOpenSettings: () => void;
}

function formatHour(iso: string) {
  return new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

export function HomeAtmos({ data, depth, onOpenSettings }: Props) {
  const { periods, hourly, alerts, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return <div className="ha-loading"><div className="ha-spinner" /><span>Loading…</span></div>;
  }
  if (data.error && !p0) {
    return <div className="ha-loading"><span>⚠ {data.error}</span></div>;
  }

  const temp = p0?.temperature ?? '—';
  const hi = periods.find(p => p.isDaytime)?.temperature ?? temp;
  const lo = periods.find(p => !p.isDaytime)?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const summary = p0?.detailedForecast ?? '';
  const condKey = forecastToCondition(cond);
  const isDark = condKey === 'clear-night' || condKey === 'thunder' || condKey === 'rain';
  const fg = isDark ? '#f2ede3' : '#1a1613';
  const fgMute = isDark ? 'rgba(242,237,227,0.7)' : '#807567';
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
  const city = point?.city || 'Honolulu';

  const dayPairs: { day: typeof periods[0]; night?: typeof periods[0] }[] = [];
  for (let i = 0; i < periods.length - 1; i += 2) dayPairs.push({ day: periods[i], night: periods[i + 1] });

  return (
    <div className={`ha ha-sky-${condKey}`}>
      {/* Header */}
      <div className="ha-header" style={{ color: fg }}>
        <SBWordmark size={12} color={fg} />
        <div className="ha-header-right">
          <span className="sb-mono" style={{ fontSize: 11, color: fgMute, letterSpacing: 0.4 }}>{city.toUpperCase()}</span>
          <button className="ha-gear" onClick={onOpenSettings} aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={fgMute} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      {/* Alert banners */}
      {alerts.map((al, i) => {
        const a = al.properties;
        const sev = nwsToSeverity(a.severity);
        return (
          <div key={i} style={{ padding: '8px 22px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <SeverityChip level={sev} small>{a.event}</SeverityChip>
          </div>
        );
      })}

      {/* Giant hero */}
      <div className="ha-hero" style={{ color: fg }}>
        <div className="ha-cond-label sb-mono" style={{ color: fgMute }}>{cond.toUpperCase()}</div>
        <div className="ha-temp">{temp}<span className="ha-deg" style={{ opacity: 0.6 }}>°</span></div>
        <div className="ha-hl sb-mono" style={{ color: fgMute }}>H {hi}° · L {lo}°</div>
      </div>

      {/* Summary */}
      <div className="ha-summary" style={{ color: fg }}>{summary.slice(0, 180)}</div>

      {/* Glass hourly card */}
      {depth !== 'glance' && (
        <div className="ha-glass" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <div className="ha-glass-label sb-mono" style={{ color: fgMute }}>Hourly forecast</div>
          <div className="ha-hourly sb-scroll">
            <div className="ha-hourly-inner">
              {hourly.map((h, i) => (
                <div key={i} className="ha-hcell">
                  <div className="sb-mono" style={{ fontSize: 11, color: fgMute, marginBottom: 8 }}>{i === 0 ? 'Now' : formatHour(h.startTime)}</div>
                  <WxIcon kind={forecastToCondition(h.shortForecast)} size={22} color={fg} stroke={1.4} />
                  <div className="sb-mono" style={{ fontSize: 15, fontWeight: 500, marginTop: 8, color: fg }}>{h.temperature}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Glass 7-day card */}
      {depth !== 'glance' && (
        <div className="ha-glass" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <div className="ha-glass-label sb-mono" style={{ color: fgMute }}>7-day</div>
          {dayPairs.slice(0, 7).map((pair, i) => {
            const d = pair.day, n = pair.night;
            const dHi = d.temperature, dLo = n?.temperature ?? d.temperature;
            const dt = new Date(d.startTime);
            const dayLabel = i === 0 ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'short' });
            return (
              <div key={i} className="ha-drow" style={{ borderBottomColor: cardBorder, color: fg }}>
                <span style={{ width: 40, fontWeight: 500 }}>{dayLabel}</span>
                <WxIcon kind={forecastToCondition(d.shortForecast)} size={18} color={fg} stroke={1.4} />
                <span style={{ flex: 1 }} />
                <span className="sb-mono" style={{ fontSize: 12, color: fgMute }}>{dLo}°</span>
                <div className="ha-dbar" style={{ background: cardBorder }}>
                  <div className="ha-dbar-fill" />
                </div>
                <span className="sb-mono" style={{ fontSize: 13, fontWeight: 600, width: 22, textAlign: 'right' as const }}>{dHi}°</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Sunrise/Sunset */}
      {depth !== 'glance' && (
        <div className="ha-sun-row">
          <div className="ha-glass ha-sun-card" style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: fg }}>
            <div className="ha-glass-label sb-mono" style={{ color: fgMute }}>Sunrise</div>
            <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: -0.5 }}>{env.feelsF != null ? '6:12 AM' : '—'}</div>
          </div>
          <div className="ha-glass ha-sun-card" style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: fg }}>
            <div className="ha-glass-label sb-mono" style={{ color: fgMute }}>Sunset</div>
            <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: -0.5 }}>{env.feelsF != null ? '7:08 PM' : '—'}</div>
          </div>
        </div>
      )}

      <div style={{ height: 40 }} />
    </div>
  );
}
