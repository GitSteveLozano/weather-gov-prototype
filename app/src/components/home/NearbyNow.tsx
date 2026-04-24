import type { WeatherData } from '../../types/weather';
import './NearbyNow.css';

interface Props {
  data: WeatherData;
  onNavigate?: (screen: string) => void;
}

interface Chip {
  icon: string;
  label: string;
  value: string;
  color?: string;
  screen?: string;
}

function getChips(data: WeatherData): Chip[] {
  const chips: Chip[] = [];
  const { env, hazards, gauges } = data;

  // Tier 1: Always show
  chips.push({ icon: '🌙', label: 'Moon', value: 'Waxing · 67%', screen: 'climate' });

  // Tier 2: Conditional
  if (env.aqi != null && env.aqi >= 75) {
    chips.push({ icon: '💨', label: 'Air Quality', value: `AQI ${env.aqi} · ${env.aqi > 100 ? 'Unhealthy' : 'Moderate'}`, color: env.aqi > 100 ? '#d63a2f' : '#e8701e', screen: 'air-quality' });
  }

  if (env.uv != null && env.uv >= 6) {
    chips.push({ icon: '☀️', label: 'UV', value: `${env.uv} · ${env.uv >= 8 ? 'Very High' : 'High'}`, color: '#e8701e', screen: 'climate' });
  }

  const floodGauges = gauges.filter(g => g.level != null && g.level >= g.action);
  if (floodGauges.length > 0) {
    chips.push({ icon: '💧', label: 'Flood risk', value: `${floodGauges.length} gauge${floodGauges.length > 1 ? 's' : ''} elevated`, color: '#e8701e', screen: 'river' });
  }

  if (hazards.earthquake?.status !== 'ok') {
    chips.push({ icon: '🔴', label: 'Earthquake', value: hazards.earthquake?.detail || 'Recent activity', screen: 'earthquake' });
  }

  if (env.humidity != null && env.humidity < 30 && (env.windMph ?? 0) > 15) {
    chips.push({ icon: '🔥', label: 'Fire risk', value: `${env.humidity}% RH · ${env.windMph}mph`, color: '#d63a2f', screen: 'fire' });
  }

  if (hazards.surf?.status !== 'ok') {
    chips.push({ icon: '🌊', label: 'Surf', value: hazards.surf?.detail || 'Advisory', screen: 'marine' });
  }

  // Tier 3: Seasonal
  chips.push({ icon: '📊', label: 'Seasonal', value: 'Warmer May likely', screen: 'climate' });

  return chips;
}

export function NearbyNowStrip({ data, onNavigate }: Props) {
  const chips = getChips(data);
  if (chips.length === 0) return null;

  return (
    <div className="nn-strip sb-scroll">
      <div className="nn-inner">
        {chips.map((chip, i) => (
          <div
            key={i}
            className="nn-chip"
            onClick={() => chip.screen && onNavigate?.(chip.screen)}
          >
            <span className="nn-icon">{chip.icon}</span>
            <div className="nn-chip-body">
              <div className="nn-chip-label sb-mono">{chip.label}</div>
              <div className="nn-chip-value" style={chip.color ? { color: chip.color } : undefined}>{chip.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
