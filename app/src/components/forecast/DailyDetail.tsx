import { useState } from 'react';
import type { WeatherData, ForecastPeriod } from '../../types/weather';
import { WxIcon, forecastToCondition } from '../shared/WxIcon';
import './DailyDetail.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

interface DayPair {
  day: ForecastPeriod;
  night?: ForecastPeriod;
}

export function DailyDetail({ data, onBack }: Props) {
  const { periods } = data;
  const [expanded, setExpanded] = useState<number | null>(null);

  // Pair periods into day/night
  const dayPairs: DayPair[] = [];
  for (let i = 0; i < periods.length - 1; i += 2) {
    dayPairs.push({ day: periods[i], night: periods[i + 1] });
  }

  // Compute temp range for bar visualization
  const allTemps = dayPairs.flatMap(p => [p.day.temperature, p.night?.temperature ?? p.day.temperature]);
  const tMin = Math.min(...allTemps) - 2;
  const tMax = Math.max(...allTemps) + 2;
  const tRange = tMax - tMin || 1;

  const toggleExpand = (i: number) => {
    setExpanded(expanded === i ? null : i);
  };

  return (
    <div className="dd sb-scroll">
      {/* Sub-navigation */}
      <div className="dd-nav">
        <button className="dd-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="dd-nav-title">10-Day Forecast</div>
        <div className="dd-nav-crumb sb-mono">Daily</div>
      </div>

      {/* Header */}
      <div className="dd-header">
        <div className="dd-kicker sb-mono">Extended outlook</div>
        <div className="dd-title">{dayPairs.length}-day forecast</div>
        <div className="dd-byline">
          {data.point?.city || 'Your location'}, {data.point?.state || ''}
        </div>
      </div>

      {/* Day rows */}
      {dayPairs.map((pair, i) => {
        const d = pair.day;
        const n = pair.night;
        const dt = new Date(d.startTime);
        const dayLabel = i === 0 ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'short' });
        const dateLabel = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const hi = d.temperature;
        const lo = n?.temperature ?? d.temperature;
        const pop = d.probabilityOfPrecipitation?.value ?? 0;
        const loPct = ((lo - tMin) / tRange) * 100;
        const hiPct = ((hi - tMin) / tRange) * 100;
        const isOpen = expanded === i;

        return (
          <div key={i} className={`dd-day${isOpen ? ' dd-day--open' : ''}`}>
            <div className="dd-day-row" onClick={() => toggleExpand(i)}>
              <div className="dd-day-label">
                <span className="dd-day-name">{dayLabel}</span>
                <span className="dd-day-date sb-mono">{dateLabel}</span>
              </div>
              <WxIcon kind={forecastToCondition(d.shortForecast)} size={22} color="var(--ink-soft)" stroke={1.4} />
              <div className="dd-pop sb-mono">{pop > 0 ? `${pop}%` : ''}</div>
              <div className="dd-lo sb-mono">{lo}°</div>
              <div className="dd-bar">
                <div className="dd-bar-fill" style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} />
              </div>
              <div className="dd-hi sb-mono">{hi}°</div>
              <div className={`dd-chevron${isOpen ? ' dd-chevron--open' : ''}`}>&#x203A;</div>
            </div>

            {isOpen && (
              <div className="dd-detail">
                {/* Day forecast */}
                <div className="dd-detail-section">
                  <div className="dd-detail-label sb-mono">Day</div>
                  <div className="dd-detail-text">{d.detailedForecast}</div>
                  <div className="dd-detail-stats">
                    <div className="dd-stat">
                      <span className="dd-stat-label sb-mono">Wind</span>
                      <span className="dd-stat-val">{d.windSpeed} {d.windDirection}</span>
                    </div>
                  </div>
                </div>

                {/* Night forecast */}
                {n && (
                  <div className="dd-detail-section dd-detail-night">
                    <div className="dd-detail-label sb-mono">Night &middot; {n.temperature}°</div>
                    <div className="dd-detail-text">{n.shortForecast}</div>
                    <div className="dd-detail-stats">
                      <div className="dd-stat">
                        <span className="dd-stat-label sb-mono">Wind</span>
                        <span className="dd-stat-val">{n.windSpeed} {n.windDirection}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      <div className="dd-footer sb-mono">
        &loz; National Weather Service &middot; Grid forecast
      </div>
    </div>
  );
}
