import { SBWordmark, SBLogo } from '../shared/SBLogo';
import type { WeatherData } from '../../types/weather';
import './Agentic.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

export function BriefScreen({ data, onBack }: Props) {
  const p0 = data.periods[0];
  const temp = p0?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const wind = data.env.windMph ?? '—';
  const windDir = data.env.windDir ?? '';

  return (
    <div className="ag-screen">
      <div className="ag-header">
        <SBWordmark size={12} />
        <span className="ag-date sb-mono">WED · 6:45 AM</span>
      </div>

      <div className="ag-brief-badge sb-mono">
        <span className="ag-brief-dot" />
        Your morning brief
      </div>

      <div className="ag-brief-greeting">
        Good morning. <span className="ag-muted">Here's what matters today.</span>
      </div>

      <div className="ag-brief-summary">
        Start at <b>{temp}°</b> with {cond.toLowerCase()}. Wind {wind}mph {windDir}.
        {data.env.humidity && ` Humidity ${data.env.humidity}%.`}
        {' '}Check the hourly for rain timing.
      </div>

      <div className="ag-tags">
        {['📍 Honolulu', '☀️ UV aware', '🌊 Surf check', '💧 Rain sensitive'].map((t, i) => (
          <span key={i} className="ag-tag sb-mono">{t}</span>
        ))}
      </div>

      <div className="ag-divider" />

      <div className="ag-brief-cards">
        <BriefCard time="8:00 AM" title="Morning" detail={`${temp}° · ${cond}`} status="good" />
        <BriefCard time="12:00 PM" title="Midday" detail={`${data.hourly[4]?.temperature ?? '—'}° · UV high`} status="ok" />
        <BriefCard time="4:00 PM" title="Afternoon" detail={`${data.hourly[8]?.temperature ?? '—'}° · ${data.hourly[8]?.shortForecast ?? 'Cloudy'}`} status={((data.hourly[8]?.probabilityOfPrecipitation?.value ?? 0) > 30) ? 'warn' : 'ok'} />
      </div>

      <div className="ag-ask-bar" onClick={onBack}>
        <SBLogo size={14} />
        <span className="ag-ask-placeholder">Ask about today's weather…</span>
        <span className="ag-ask-badge sb-mono">AI</span>
      </div>
    </div>
  );
}

function BriefCard({ time, title, detail, status }: { time: string; title: string; detail: string; status: 'good' | 'ok' | 'warn' }) {
  const colors = { good: '#2b8a3e', ok: 'var(--ink-mute)', warn: 'var(--sev-watch)' };
  return (
    <div className="ag-brief-card">
      <div className="ag-bc-time sb-mono">{time}</div>
      <div className="ag-bc-body">
        <div className="ag-bc-title">{title}</div>
        <div className="ag-bc-detail">{detail}</div>
      </div>
      <div className="ag-bc-dot" style={{ color: colors[status] }}>●</div>
    </div>
  );
}
