import type { WeatherData, ForecastPeriod } from '../../types/weather';
import { forecastIcon } from '../../services/utils';
import './WeekTab.css';

interface Props {
  data: WeatherData;
}

interface DayPair {
  dayName: string;
  day: ForecastPeriod | null;
  night: ForecastPeriod | null;
  isToday: boolean;
}

const APRIL_NORMAL = 82;

const POLLEN_DATA = [
  { name: 'Grass', value: 72, label: 'High', color: '#a78bfa', opacity: 1 },
  { name: 'Tree', value: 38, label: 'Mod', color: '#a78bfa', opacity: 0.7 },
  { name: 'Weed', value: 18, label: 'Low', color: '#34d399', opacity: 1 },
  { name: 'Mold', value: 28, label: 'Low', color: '#34d399', opacity: 0.8 },
];

function pairDayNight(periods: ForecastPeriod[]): DayPair[] {
  const pairs: DayPair[] = [];
  let i = 0;

  while (i < periods.length && pairs.length < 7) {
    const p = periods[i];
    if (p.isDaytime) {
      const nightP = periods[i + 1] && !periods[i + 1].isDaytime ? periods[i + 1] : null;
      const dayLabel = pairs.length === 0 ? 'Today' : new Date(p.startTime).toLocaleDateString('en-US', { weekday: 'short' });
      pairs.push({ dayName: dayLabel, day: p, night: nightP, isToday: pairs.length === 0 });
      i += nightP ? 2 : 1;
    } else {
      // starts with a night period (e.g., "Tonight")
      const dayLabel = pairs.length === 0 ? 'Today' : new Date(p.startTime).toLocaleDateString('en-US', { weekday: 'short' });
      pairs.push({ dayName: dayLabel, day: null, night: p, isToday: pairs.length === 0 });
      i += 1;
    }
  }
  return pairs;
}

function climateChip(hi: number | null): { label: string; cls: string } {
  if (hi == null) return { label: 'avg', cls: 'week-avg' };
  const diff = hi - APRIL_NORMAL;
  if (diff > 0) return { label: `+${diff}°`, cls: 'week-above' };
  if (diff < 0) return { label: `${diff}°`, cls: 'week-below' };
  return { label: 'avg', cls: 'week-avg' };
}

export function WeekTab({ data }: Props) {
  const { periods } = data;
  const dayPairs = pairDayNight(periods);

  return (
    <div className="week-tab">
      <div className="week-inner">
        {/* 7-day forecast */}
        <div className="week-sec">7-DAY FORECAST &middot; CLIMATE CONTEXT</div>
        <div className="week-fc-card">
          {dayPairs.map((dp, i) => {
            const hi = dp.day?.temperature ?? null;
            const lo = dp.night?.temperature ?? null;
            const cond = dp.day?.shortForecast ?? dp.night?.shortForecast ?? '';
            const pop = dp.day?.probabilityOfPrecipitation?.value ?? dp.night?.probabilityOfPrecipitation?.value ?? 0;
            const chip = climateChip(hi);

            return (
              <div key={i} className={`week-fc-row${dp.isToday ? ' week-today' : ''}`}>
                <div className="week-fc-day">{dp.dayName}</div>
                <div className="week-fc-i">{forecastIcon(cond)}</div>
                <div className="week-fc-c">{cond}</div>
                <div className={`week-fc-norm ${chip.cls}`}>{chip.label}</div>
                <div className="week-fc-pct" style={{ color: pop >= 30 ? 'var(--accent)' : 'var(--dim)' }}>{pop}%</div>
                <div className="week-fc-bw">
                  <div className="week-fc-bf" style={{ width: `${pop}%` }} />
                </div>
                <div className="week-fc-temps">
                  <span className="week-fc-hi">{hi != null ? `${hi}°` : '—'}</span>
                  <span className="week-fc-lo">{lo != null ? `${lo}°` : '—'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pollen & allergens */}
        <div className="week-sec">POLLEN &amp; ALLERGENS</div>
        <div className="week-pollen-card">
          {POLLEN_DATA.map((p) => (
            <div key={p.name} className="week-poll-row">
              <span className="week-poll-name">{p.name}</span>
              <div className="week-poll-bar-w">
                <div
                  className="week-poll-bar"
                  style={{ width: `${p.value}%`, background: p.color, opacity: p.opacity }}
                />
              </div>
              <span className="week-poll-val" style={{ color: p.color, opacity: p.opacity }}>{p.value}</span>
              <span className="week-poll-lbl" style={{ color: p.color, opacity: p.opacity }}>{p.label}</span>
            </div>
          ))}
        </div>

        {/* Sun & Moon */}
        <div className="week-sec">SUN &amp; MOON</div>
        <div className="week-sun-moon">
          <div className="week-sm-card">
            <div className="week-sm-ico">&#127749;</div>
            <div className="week-sm-v">6:12 AM</div>
            <div className="week-sm-l">SUNRISE</div>
            <div className="week-sm-sub">Golden 5:44&ndash;6:12</div>
          </div>
          <div className="week-sm-card">
            <div className="week-sm-ico">&#127751;</div>
            <div className="week-sm-v">7:08 PM</div>
            <div className="week-sm-l">SUNSET</div>
            <div className="week-sm-sub">Golden 7:08&ndash;7:36</div>
          </div>
          <div className="week-sm-card">
            <div className="week-sm-ico">&#127764;</div>
            <div className="week-sm-v">Waxing</div>
            <div className="week-sm-l">MOON PHASE</div>
            <div className="week-sm-sub">67% illuminated</div>
          </div>
          <div className="week-sm-card">
            <div className="week-sm-ico">&#9728;&#65039;</div>
            <div className="week-sm-v">13h 26m</div>
            <div className="week-sm-l">DAYLIGHT</div>
            <div className="week-sm-sub">+2 min yesterday</div>
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>
    </div>
  );
}
