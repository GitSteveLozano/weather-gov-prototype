export function forecastIcon(txt: string): string {
  const t = (txt || '').toLowerCase();
  if (t.includes('thunder') || t.includes('storm')) return '⛈️';
  if (t.includes('rain') || t.includes('showers')) return t.includes('light') ? '🌦️' : '🌧️';
  if (t.includes('drizzle')) return '🌦️';
  if (t.includes('cloudy') && t.includes('partly')) return '⛅';
  if (t.includes('cloudy') && t.includes('mostly')) return '🌥️';
  if (t.includes('cloudy') || t.includes('overcast')) return '☁️';
  if (t.includes('fog') || t.includes('haze')) return '🌫️';
  if (t.includes('wind')) return '💨';
  if (t.includes('sunny') || t.includes('clear')) return t.includes('mostly') ? '🌤️' : '☀️';
  if (t.includes('night') || t.includes('tonight')) return '🌙';
  return '🌤️';
}

export function uvLabel(v: number | null): { text: string; color: string } {
  if (v == null) return { text: '—', color: 'var(--muted)' };
  if (v <= 2) return { text: 'Low', color: 'var(--ok)' };
  if (v <= 5) return { text: 'Moderate', color: 'var(--warn)' };
  if (v <= 7) return { text: 'High', color: 'var(--warn)' };
  return { text: 'Very High', color: 'var(--warn)' };
}

export function aqiLabel(v: number | null): { text: string; color: string } {
  if (v == null) return { text: '—', color: 'var(--muted)' };
  if (v <= 50) return { text: 'Good', color: 'var(--ok)' };
  if (v <= 100) return { text: 'Moderate', color: 'var(--warn)' };
  return { text: 'Unhealthy', color: 'var(--danger)' };
}

export function humidityLabel(v: number | null): { text: string; color: string } {
  if (v == null) return { text: '—', color: 'var(--muted)' };
  if (v < 40) return { text: 'Dry', color: 'var(--ok)' };
  if (v < 60) return { text: 'Comfortable', color: 'var(--ok)' };
  if (v < 75) return { text: 'Muggy', color: 'var(--warn)' };
  return { text: 'Oppressive', color: 'var(--danger)' };
}

export function formatHour(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

export function beaufortScale(mph: number): { scale: number; label: string } {
  if (mph < 1) return { scale: 0, label: 'Calm' };
  if (mph < 4) return { scale: 1, label: 'Light Air' };
  if (mph < 8) return { scale: 2, label: 'Light Breeze' };
  if (mph < 13) return { scale: 3, label: 'Gentle Breeze' };
  if (mph < 19) return { scale: 4, label: 'Moderate Breeze' };
  if (mph < 25) return { scale: 5, label: 'Fresh Breeze' };
  if (mph < 32) return { scale: 6, label: 'Strong Breeze' };
  return { scale: 7, label: 'Near Gale' };
}
