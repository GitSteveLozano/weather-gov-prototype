import type { WeatherData } from '../../types/weather';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import './HourlyDetail.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

function formatHour(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

function formatDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function HourlyDetail({ data, onBack }: Props) {
  const { hourly } = data;

  // Group hours by date
  const groups: { label: string; hours: typeof hourly }[] = [];
  let currentLabel = '';
  for (const h of hourly) {
    const dayLabel = formatDay(h.startTime);
    if (dayLabel !== currentLabel) {
      currentLabel = dayLabel;
      groups.push({ label: dayLabel, hours: [] });
    }
    groups[groups.length - 1].hours.push(h);
  }

  return (
    <div className="hd sb-scroll">
      {/* Sub-navigation */}
      <div className="hd-nav">
        <button className="hd-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="hd-nav-title">Hourly Forecast</div>
        <div className="hd-nav-crumb sb-mono">48h</div>
      </div>

      {/* Header */}
      <div className="hd-header">
        <div className="hd-kicker sb-mono">Hourly detail</div>
        <div className="hd-title">Next 48 hours</div>
        <div className="hd-byline">
          {data.point?.city || 'Your location'}, {data.point?.state || ''}
        </div>
      </div>

      {/* Hourly rows grouped by day */}
      {groups.map((group, gi) => (
        <div key={gi}>
          <div className="hd-day-label sb-mono">{group.label}</div>
          {group.hours.map((h, hi) => {
            const pop = h.probabilityOfPrecipitation?.value ?? 0;
            const isNow = gi === 0 && hi === 0;
            return (
              <div key={hi} className={`hd-row${isNow ? ' hd-row--now' : ''}`}>
                <div className="hd-time sb-mono">{isNow ? 'Now' : formatHour(h.startTime)}</div>
                <WxIcon kind={forecastToCondition(h.shortForecast)} size={24} color="var(--ink)" stroke={1.3} />
                <div className="hd-temp sb-mono">{h.temperature}°</div>
                <div className="hd-cond">{h.shortForecast}</div>
                <div className="hd-extras">
                  {pop > 0 && <span className="hd-pop sb-mono">{pop}%</span>}
                  <span className="hd-wind sb-mono">{h.windSpeed}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="hd-footer sb-mono">
        &loz; National Weather Service &middot; Hourly grid data
      </div>
    </div>
  );
}
