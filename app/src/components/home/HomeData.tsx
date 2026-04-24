import type { WeatherData } from '../../types/weather';
import type { DepthLevel } from '../../App';
import { SBWordmark } from '../shared/SBLogo';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import './HomeData.css';

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

export function HomeData({ data, depth }: Props) {
  const { periods, hourly, env, point } = data;
  const p0 = periods[0];

  if (data.loading && !p0) {
    return <div className="hd-loading"><div className="hd-spinner" /><span className="sb-mono">Loading forecast…</span></div>;
  }
  if (data.error && !p0) {
    return <div className="hd-loading"><span>⚠ {data.error}</span></div>;
  }

  const temp = p0?.temperature ?? '—';
  const cond = p0?.shortForecast ?? '';
  const city = point?.city || 'Honolulu';
  const state = point?.state || 'HI';
  const lat = point ? `${(point.gridX / 1).toFixed(1)}` : '21.3';
  const lon = point ? `${(point.gridY / 1).toFixed(1)}` : '157.8';

  const now = new Date();
  const zulu = now.toISOString().slice(11, 16).replace(':', '');
  const obsTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Temperature series for chart
  const tempSeries = hourly.map(h => h.temperature);
  const popSeries = hourly.map(h => h.probabilityOfPrecipitation?.value ?? 0);

  // Pair periods for 7-day
  const dayPairs: { day: typeof periods[0]; night?: typeof periods[0] }[] = [];
  for (let i = 0; i < periods.length - 1; i += 2) dayPairs.push({ day: periods[i], night: periods[i + 1] });

  // Model consensus (simulated — static display data)
  const models: [string, number, number][] = [
    ['GFS', 0.42, 85],
    ['NAM', 0.38, 78],
    ['HRRR', 0.51, 90],
    ['ECMWF', 0.35, 72],
    ['NBM ensemble', 0.41, 82],
  ];

  return (
    <div className="hd sb-scroll">
      {/* Dense header */}
      <div className="hd-header">
        <SBWordmark size={11} />
        <div className="hd-header-meta">
          <span>ZULU {zulu}</span>
          <span>{point?.office || 'PHFO'}</span>
          <span className="hd-live">● LIVE</span>
        </div>
      </div>

      {/* Station line */}
      <div className="hd-station">
        {city.toUpperCase()}, {state} · {lat}°N {lon}°W · OBS {obsTime.toUpperCase()}
      </div>

      {/* Top row: big temp + 4 key stats */}
      <div className="hd-top-grid">
        <div className="hd-temp-card">
          <div className="hd-temp-label">Temperature</div>
          <div className="hd-temp-big">
            {temp}<span className="hd-temp-unit">°F</span>
          </div>
          <div className="hd-temp-feels">
            Feels {env.feelsF ?? '—'}° · {cond}
          </div>
        </div>
        <div className="hd-stats-grid">
          <TightStat label="DEW" val={env.humidity != null ? `${Math.round((env.humidity ?? 0) * 0.7)}°` : '—'} />
          <TightStat label="RH" val={env.humidity != null ? `${env.humidity}%` : '—'} />
          <TightStat label="WIND" val={env.windMph != null ? `${env.windMph}` : '—'} sub={env.windDir ?? ''} />
          <TightStat label="PRES" val={env.pressure != null ? `${env.pressure}` : '—'} sub="▲" />
        </div>
      </div>

      {/* METAR line (simulated) */}
      <div className="hd-metar">
        METAR {point?.office || 'PHFO'} {now.getDate().toString().padStart(2, '0')}{zulu}Z {env.windMph ?? '00'}KT 10SM {cond.toUpperCase().slice(0, 8)} {temp}/{env.feelsF ?? '--'} A{((env.pressure ?? 30.12) * 100).toFixed(0).slice(0, 4)}
      </div>

      {/* Hourly chart */}
      {depth !== 'glance' && (
        <div className="hd-chart-card">
          <div className="hd-chart-header">
            <div className="hd-chart-title">Hourly · Temp + POP</div>
            <div className="hd-chart-range">12h</div>
          </div>
          <div className="hd-chart-area">
            <SBLineChart data={tempSeries} width={348} height={80} />
            <div className="hd-chart-pop-row">
              {popSeries.map((p, i) => (
                <div key={i} className="hd-chart-pop-bar" style={{ height: `${p}%` }} />
              ))}
            </div>
          </div>
          <div className="hd-chart-times">
            {hourly.map((h, i) => (
              <span key={i}>{i === 0 ? 'Now' : formatHour(h.startTime)}</span>
            ))}
          </div>
        </div>
      )}

      {/* Model consensus row */}
      {depth !== 'glance' && (
        <div className="hd-models">
          <div className="hd-models-title">Model consensus · 24h precip (in)</div>
          <div className="hd-models-table">
            {models.map(([m, v, conf], i) => (
              <div key={i} className="hd-model-row">
                <div className="hd-model-name">{m}</div>
                <div className="hd-model-val">{v.toFixed(2)}&quot;</div>
                <div className="hd-model-bar">
                  <div className="hd-model-bar-fill" style={{ width: `${conf}%` }} />
                </div>
                <div className="hd-model-conf">{conf}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-day condensed table */}
      {depth !== 'glance' && (
        <div className="hd-daily">
          <div className="hd-daily-title">7-day</div>
          <div className="hd-daily-table">
            <div className="hd-daily-thead">
              <span>DAY</span><span></span><span>HI/LO</span><span>POP</span><span>WIND</span>
            </div>
            {dayPairs.slice(0, 7).map((pair, i) => {
              const d = pair.day;
              const n = pair.night;
              const dHi = d.temperature;
              const dLo = n?.temperature ?? d.temperature;
              const pop = d.probabilityOfPrecipitation?.value ?? 0;
              const dt = new Date(d.startTime);
              const dayLabel = i === 0 ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'short' });
              const windStr = d.windSpeed || '—';
              return (
                <div key={i} className="hd-daily-row">
                  <span className="hd-daily-day">{dayLabel}</span>
                  <WxIcon kind={forecastToCondition(d.shortForecast)} size={16} color="var(--ink)" stroke={1.4} />
                  <span className="hd-daily-hilo"><b>{dHi}</b>/<span>{dLo}</span></span>
                  <span className={pop > 50 ? 'hd-daily-pop-high' : 'hd-daily-pop-low'}>{pop}%</span>
                  <span className="hd-daily-wind">{windStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TightStat({ label, val, sub }: { label: string; val: string; sub?: string }) {
  return (
    <div className="hd-tight">
      <div className="hd-tight-label">{label}</div>
      <div className="hd-tight-val">
        {val} {sub && <span className="hd-tight-sub">{sub}</span>}
      </div>
    </div>
  );
}

function SBLineChart({ data, width, height }: { data: number[]; width: number; height: number }) {
  if (!data.length) return null;
  const pad = 4;
  const lo = Math.min(...data) - 2;
  const hi = Math.max(...data) + 2;
  const rng = hi - lo || 1;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (v - lo) / rng) * (height - pad * 2);
    return [x, y] as const;
  });
  const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaD = pathD + ` L${points[points.length - 1][0]},${height} L${points[0][0]},${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <path d={areaD} fill="rgba(26,22,19,0.04)" />
      <path d={pathD} fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
