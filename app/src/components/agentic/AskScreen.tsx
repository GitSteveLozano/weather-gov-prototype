import { SBLogo } from '../shared/SBLogo';
import type { WeatherData } from '../../types/weather';
import './Agentic.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

export function AskScreen({ data, onBack }: Props) {
  const temp = data.periods[0]?.temperature ?? '—';
  const sunset = '7:08 PM';

  return (
    <div className="ag-screen ag-ask-screen">
      <div className="ag-subnav">
        <button className="ag-back" onClick={onBack}>‹</button>
        <span className="ag-subnav-title">Ask Skybureau</span>
        <span className="ag-beta sb-mono">Beta</span>
      </div>

      <div className="ag-chat sb-scroll">
        {/* User question */}
        <div className="ag-msg-user">
          <div className="ag-bubble-user">Can I go to the beach today?</div>
        </div>

        {/* AI answer */}
        <div className="ag-msg-ai">
          <div className="ag-ai-meta">
            <SBLogo size={14} />
            <span className="sb-mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: 0.5 }}>Skybureau</span>
          </div>
          <div className="ag-bubble-ai">
            <div><b style={{ color: '#2b8a3e' }}>Great beach day through 3 PM.</b> {temp}° now, light trade winds. UV is high — reapply sunscreen after 11 AM.</div>
            <div className="ag-answer-data">
              <div className="ag-answer-row"><span>Now</span><span className="sb-mono">{temp}° · {data.env.windMph ?? '—'}mph · UV {data.env.uv ?? '—'}</span></div>
              <div className="ag-answer-row"><span>2 PM</span><span className="sb-mono">{data.hourly[4]?.temperature ?? '—'}° · {data.hourly[4]?.shortForecast ?? '—'}</span></div>
              <div className="ag-answer-row" style={{ color: 'var(--sev-watch)' }}><span>5 PM</span><span className="sb-mono">{data.hourly[8]?.temperature ?? '—'}° · Showers possible</span></div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-mute)' }}>
              Sunset at {sunset}. Waves {data.env.wavesFt ?? '—'}ft with {data.env.wavePeriod ?? '—'}s period.
            </div>
          </div>
          <div className="ag-sources">
            <SrcChip>Hourly · HRRR</SrcChip>
            <SrcChip>Marine · HFO</SrcChip>
            <SrcChip>UV · AirNow</SrcChip>
          </div>
        </div>

        {/* Second question */}
        <div className="ag-msg-user">
          <div className="ag-bubble-user">What about surf conditions?</div>
        </div>
        <div className="ag-msg-ai">
          <div className="ag-bubble-ai">
            <b>South shore: {data.env.wavesFt ?? '3-4'}ft at {data.env.wavePeriod ?? '14'}s.</b> Moderate swell, good for intermediate surfers. Rip current risk is low today.
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="ag-suggestions sb-scroll">
        <div className="ag-suggestions-inner">
          {['UV burn time?', 'Rain this week?', 'Best surf spots?', 'Golden hour tonight?'].map((s, i) => (
            <span key={i} className="ag-suggestion-chip">{s}</span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="ag-input-bar">
        <div className="ag-input-field">Ask anything about weather…</div>
        <button className="ag-send-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3 7l5-5 5 5" stroke="var(--paper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

function SrcChip({ children }: { children: React.ReactNode }) {
  return <span className="ag-src-chip sb-mono">◇ {children}</span>;
}
