import type { WeatherData } from '../../types/weather';
import type { DepthLevel } from '../../App';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import './HomeCarto.css';

interface Props {
  data: WeatherData;
  depth: DepthLevel;
  onOpenSettings: () => void;
  onOpenBrief?: () => void;
  onOpenAsk?: () => void;
}

function formatHour(iso: string) {
  return new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

export function HomeCarto({ data, depth, onOpenSettings: _onOpenSettings }: Props) {
  const { periods, hourly, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return <div className="hc-loading"><div className="hc-spinner" /><span className="sb-mono">Loading forecast…</span></div>;
  }
  if (data.error && !p0) {
    return <div className="hc-loading"><span>⚠ {data.error}</span></div>;
  }

  const temp = p0?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const summary = p0?.detailedForecast ?? '';
  const city = point?.city || 'Honolulu';
  const condKey = forecastToCondition(cond);

  return (
    <div className="hc sb-scroll">
      {/* Map hero — full bleed */}
      <div className="hc-map">
        <FakeMap city={city} />

        {/* Top controls: logo + layer chips */}
        <div className="hc-map-top">
          <SBWordmark size={11} color="var(--ink)" />
          <div className="hc-map-chips">
            <div className="hc-map-chip hc-map-chip--active">Radar</div>
            <div className="hc-map-chip hc-map-chip--muted">Temp</div>
            <div className="hc-map-chip hc-map-chip--muted">Alerts</div>
          </div>
        </div>

        {/* Timeline scrubber */}
        <div className="hc-scrubber">
          <div className="hc-scrubber-card">
            <div className="hc-scrubber-labels">
              <span>-1h</span><span>NOW</span><span>+1h</span><span>+2h</span>
            </div>
            <div className="hc-scrubber-track">
              <div className="hc-scrubber-thumb" />
              <div className="hc-scrubber-rain" />
            </div>
            <div className="hc-scrubber-note">
              Rain arriving <b>~8:20 PM</b>
            </div>
          </div>
        </div>

        {/* Temp pill over map */}
        <div className="hc-temp-pill">
          <div className="hc-temp-pill-inner">
            <WxIcon kind={condKey} size={30} color="var(--ink)" stroke={1.4} />
            <div>
              <div className="hc-pill-label">You</div>
              <div className="hc-pill-temp">
                {temp}° <span className="hc-pill-cond">{cond}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="hc-zoom">
          <button className="hc-zoom-btn" aria-label="Zoom in">+</button>
          <button className="hc-zoom-btn" aria-label="Zoom out">&minus;</button>
        </div>
      </div>

      {/* Summary text below map */}
      <div className="hc-summary">{summary.slice(0, 220)}</div>

      {/* Hourly compressed row */}
      {depth !== 'glance' && (
        <div className="hc-hourly-section">
          <div className="hc-hourly-header">
            <div className="hc-hourly-label sb-mono">Next 12 hours</div>
            <div className="hc-hourly-expand">Expand &rarr;</div>
          </div>
          <div className="hc-hourly-scroll sb-scroll">
            <div className="hc-hourly-inner">
              {hourly.slice(0, 10).map((h, i) => (
                <div key={i} className="hc-hcell">
                  <div className="hc-htime">{i === 0 ? 'Now' : formatHour(h.startTime)}</div>
                  <WxIcon kind={forecastToCondition(h.shortForecast)} size={20} color="var(--ink)" stroke={1.4} />
                  <div className="hc-htemp">{h.temperature}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More layers grid */}
      {depth !== 'glance' && (
        <div className="hc-layers">
          <div className="hc-layers-label">More layers</div>
          <div className="hc-layers-grid">
            <LayerChip icon="wind" label="Wind" detail={env.windMph != null ? `${env.windMph} mph ${env.windDir ?? ''}` : '— mph'} />
            <LayerChip icon="cloudy" label="Cloud cover" detail={env.humidity != null ? `${env.humidity}%` : '—'} />
            <LayerChip icon="thunder" label="Lightning" detail="None near" />
            <LayerChip icon="snow" label="Snow depth" detail="N/A" />
          </div>
        </div>
      )}
    </div>
  );
}

function LayerChip({ icon, label, detail }: { icon: string; label: string; detail: string }) {
  return (
    <div className="hc-layer-chip">
      <WxIcon kind={icon as any} size={20} color="var(--ink-soft)" stroke={1.4} />
      <div style={{ flex: 1 }}>
        <div className="hc-layer-name">{label}</div>
        <div className="hc-layer-detail">{detail}</div>
      </div>
    </div>
  );
}

function FakeMap({ city }: { city: string }) {
  // Generative SVG map adapted for Honolulu (island coastline + roads + radar blobs)
  const roads = [
    'M0 80 Q80 70 180 90 T400 70',
    'M0 180 Q120 200 240 180 T400 220',
    'M0 300 Q100 280 200 310 T400 290',
    'M80 0 Q100 100 70 220 T120 420',
    'M220 0 Q200 120 240 260 T200 420',
    'M320 0 Q340 140 310 280 T350 420',
  ];
  const minor = [
    'M0 40 L400 60', 'M0 140 L400 150', 'M0 240 L400 250', 'M0 340 L400 360',
    'M40 0 L50 420', 'M150 0 L170 420', 'M270 0 L280 420',
  ];
  return (
    <svg width="100%" height="420" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="hcRadar1" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#d63a2f" stopOpacity={0.85} />
          <stop offset="40%" stopColor="#e8701e" stopOpacity={0.65} />
          <stop offset="70%" stopColor="#d4a017" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#4a6b8a" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="hcRadar2" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#4a6b8a" stopOpacity={0.7} />
          <stop offset="60%" stopColor="#7ba2c0" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#7ba2c0" stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* base */}
      <rect width="400" height="420" fill="#e8ebe5" />
      {/* water */}
      <path d="M0 330 Q100 320 180 340 T400 340 L400 420 L0 420 Z" fill="#c8d5dd" />
      {/* parks */}
      <path d="M200 100 Q250 90 290 130 Q300 170 260 190 Q220 200 195 160 Z" fill="#d5dcc8" opacity={0.7} />
      <path d="M50 240 Q90 230 130 260 Q140 290 100 300 Q65 295 45 270 Z" fill="#d5dcc8" opacity={0.7} />
      {/* minor roads */}
      {minor.map((d, i) => <path key={`m${i}`} d={d} stroke="#fff" strokeWidth={0.8} fill="none" opacity={0.5} />)}
      {/* major roads */}
      {roads.map((d, i) => <path key={`rw${i}`} d={d} stroke="#fff" strokeWidth={2.2} fill="none" />)}
      {roads.map((d, i) => <path key={`ry${i}`} d={d} stroke="#c4a878" strokeWidth={1} fill="none" />)}

      {/* radar precipitation blobs */}
      <g opacity={0.85}>
        <ellipse cx={280} cy={160} rx={80} ry={60} fill="url(#hcRadar2)" />
        <ellipse cx={320} cy={200} rx={40} ry={35} fill="url(#hcRadar1)" />
        <ellipse cx={120} cy={60} rx={50} ry={35} fill="url(#hcRadar2)" />
      </g>

      {/* your location marker */}
      <g>
        <circle cx={180} cy={210} r={32} fill="var(--ink)" opacity={0.08}>
          <animate attributeName="r" values="32;44;32" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.08;0;0.08" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={180} cy={210} r={7} fill="#fff" />
        <circle cx={180} cy={210} r={5} fill="var(--blue)" />
      </g>

      {/* radar sweep */}
      <g style={{ transformOrigin: '180px 210px', animation: 'hc-sweep 6s linear infinite' }}>
        <path d="M180 210 L180 80 A130 130 0 0 1 295 160 Z" fill="var(--blue)" opacity={0.05} />
      </g>

      {/* labels */}
      <text x={190} y={226} fontFamily="var(--mono)" fontSize={10} fill="var(--ink)" fontWeight={600}>{city}</text>
      <text x={300} y={350} fontFamily="var(--mono)" fontSize={9} fill="var(--ink-mute)" fontWeight={500}>Coast</text>
      <text x={70} y={60} fontFamily="var(--mono)" fontSize={9} fill="var(--ink-mute)" fontWeight={500}>Upland</text>
    </svg>
  );
}
