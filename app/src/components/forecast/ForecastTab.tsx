import type { WeatherData } from '../../types/weather';
import './ForecastTab.css';

interface Props {
  data: WeatherData;
}

const MODEL_DATA = [
  { name: 'GFS', pct: 88, color: '#38bdf8', opacity: 1, label: 'Strong', labelColor: 'var(--ok)' },
  { name: 'NAM', pct: 82, color: '#38bdf8', opacity: 0.85, label: 'Strong', labelColor: 'var(--ok)' },
  { name: 'ECMWF', pct: 56, color: '#f59e0b', opacity: 1, label: 'Diverging', labelColor: 'var(--warn)' },
  { name: 'NBM', pct: 70, color: '#38bdf8', opacity: 0.7, label: 'Moderate', labelColor: 'rgba(56,189,248,.75)' },
  { name: 'HRRR', pct: 91, color: '#38bdf8', opacity: 1, label: 'Strong', labelColor: 'var(--ok)' },
];

const TAF_DATA = [
  { time: '12–18Z', cond: 'VFR · FEW030 SCT060 · NE @ 15kt', vis: 'P6SM', visColor: 'var(--ok)' },
  { time: '18–21Z', cond: "MVFR possible · Sct showers near Ko‘olau", vis: '3SM', visColor: 'var(--warn)' },
  { time: '21–06Z', cond: 'VFR return · BKN070 · Winds backing E', vis: 'P6SM', visColor: 'var(--ok)' },
];

function formatIssuedTime(iso: string | undefined): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZoneName: 'short',
    });
  } catch {
    return iso;
  }
}

export function ForecastTab({ data }: Props) {
  const { env, hazards } = data;
  const disc = hazards.forecasterDiscussion;
  const discText = disc?.text ?? 'No discussion available at this time.';
  const issuedStr = disc ? `Issued ${formatIssuedTime(disc.issued)}` : '';

  const wavesFt = env.wavesFt;
  const wavePeriod = env.wavePeriod;
  const windMph = env.windMph;

  return (
    <div className="afd-tab">
      <div className="afd-scroll">
        {/* Area Forecast Discussion */}
        <div className="afd-sec">FORECASTER DISCUSSION</div>
        <div className="afd-card">
          <div className="afd-masthead">
            <div>
              <div className="afd-office">NWS HONOLULU &middot; HFO</div>
              <div className="afd-iss">{issuedStr}</div>
            </div>
            <div className="afd-badge">OFFICIAL</div>
          </div>
          <div className="afd-body">
            <div className="afd-text">{discText}</div>
          </div>
          <div className="afd-footer">
            <div className="afd-fc-name">
              Forecaster: <strong>NWS Honolulu</strong>
            </div>
            <div className="afd-full-link">FULL TEXT &rsaquo;</div>
          </div>
        </div>

        {/* Model Agreement */}
        <div className="afd-sec">MODEL AGREEMENT &mdash; 72 HRS</div>
        <div className="afd-model-card">
          <div className="afd-model-desc">
            How closely major models agree on the Thursday&ndash;Friday forecast. Wider spread = more uncertainty.
          </div>
          {MODEL_DATA.map((m) => (
            <div key={m.name} className="afd-model-row">
              <span className="afd-model-name">{m.name}</span>
              <div className="afd-model-bar-w">
                <div
                  className="afd-model-bar"
                  style={{ width: `${m.pct}%`, background: m.color, opacity: m.opacity }}
                />
              </div>
              <span className="afd-model-agree" style={{ color: m.labelColor }}>{m.label}</span>
            </div>
          ))}
          <div className="afd-model-legend">
            <div className="afd-ml-item">
              <div className="afd-ml-dot" style={{ background: 'var(--ok)' }} />
              Strong agreement
            </div>
            <div className="afd-ml-item">
              <div className="afd-ml-dot" style={{ background: 'var(--warn)' }} />
              Diverging
            </div>
            <div className="afd-ml-item">
              <div className="afd-ml-dot" style={{ background: 'var(--danger)' }} />
              Low confidence
            </div>
          </div>
        </div>

        {/* Marine Zone Forecast */}
        <div className="afd-sec">MARINE ZONE FORECAST</div>
        <div className="afd-marine-card">
          <div className="afd-marine-h">
            <div>
              <div className="afd-marine-zone">Oahu Coastal Waters</div>
              <div className="afd-marine-iss">NWS HFO &middot; Valid through Wed 6 AM HST</div>
            </div>
            <span style={{ fontSize: 18 }}>&#128674;</span>
          </div>
          <div className="afd-marine-body">
            <div className="afd-marine-text">
              Northeast winds 15 to 20 knots with occasional gusts to 25 knots.
              Seas 4 to 6 feet. Isolated showers. Small craft should exercise caution.
              Trades ease slightly overnight.
            </div>
            <div className="afd-marine-grid">
              <div className="afd-mg-cell">
                <div className="afd-mg-v">
                  {windMph != null ? `${Math.round(windMph * 0.868976)}` : '15–20'}
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}> kt</span>
                </div>
                <div className="afd-mg-l">WIND</div>
              </div>
              <div className="afd-mg-cell">
                <div className="afd-mg-v">
                  {wavesFt != null ? `${wavesFt}` : '4–6'}
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}> ft</span>
                  {wavePeriod != null && (
                    <span style={{ fontSize: 9, color: 'var(--dim)' }}> /{wavePeriod}s</span>
                  )}
                </div>
                <div className="afd-mg-l">SEAS</div>
              </div>
              <div className="afd-mg-cell">
                <div className="afd-mg-v">
                  <span style={{ fontSize: 14 }}>&#128993;</span>
                  <span style={{ fontSize: 10, color: 'var(--warn)' }}> Caution</span>
                </div>
                <div className="afd-mg-l">ADVISORY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tropical Outlook */}
        <div className="afd-sec">TROPICAL OUTLOOK &middot; CPHC</div>
        <div className="afd-trop-card">
          <div className="afd-trop-h">
            <div className="afd-trop-ok-dot" />
            <div className="afd-trop-title">No Active Tropical Cyclones</div>
            <div className="afd-trop-source">CPHC &middot; UPDATED 8 AM</div>
          </div>
          <div className="afd-trop-body">
            <div className="afd-trop-text">
              The Central Pacific Hurricane Center is monitoring one area of disturbed weather
              northeast of the Hawaiian Islands. No development is expected over the next 5 days.
              Season outlook remains near-normal for the Central Pacific basin.
            </div>
            <div className="afd-trop-5day">
              <div className="afd-trop-5d-l">5-DAY FORMATION PROBABILITY</div>
              <div className="afd-trop-pct-row">
                <div className="afd-tpc">
                  <div className="afd-tpc-v">2%</div>
                  <div className="afd-tpc-l">2-day</div>
                </div>
                <div className="afd-tpc">
                  <div className="afd-tpc-v" style={{ color: 'rgba(52,211,153,.65)' }}>8%</div>
                  <div className="afd-tpc-l">5-day</div>
                </div>
                <div className="afd-tpc">
                  <div className="afd-tpc-v" style={{ color: 'var(--muted)' }}>Near-</div>
                  <div className="afd-tpc-l">Season</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aviation TAF */}
        <div className="afd-sec">AVIATION &middot; TAF</div>
        <div className="afd-avn-card">
          <div className="afd-avn-h">
            <div className="afd-avn-lbl">TERMINAL AERODROME FORECAST</div>
            <div className="afd-avn-ap">PHNL &middot; HNL</div>
          </div>
          {TAF_DATA.map((row) => (
            <div key={row.time} className="afd-avn-row">
              <span className="afd-avn-time">{row.time}</span>
              <span className="afd-avn-cond">{row.cond}</span>
              <span className="afd-avn-vis" style={{ color: row.visColor }}>{row.vis}</span>
            </div>
          ))}
          <div className="afd-avn-foot">
            VFR = Visual Flight Rules &nbsp;&middot;&nbsp; MVFR = Marginal VFR
          </div>
        </div>

        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}
