export interface NWSPoint {
  city: string;
  state: string;
  office: string;
  gridX: number;
  gridY: number;
  forecastUrl: string;
  forecastGridDataUrl: string;
  forecastHourlyUrl: string;
}

export interface ForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
  probabilityOfPrecipitation?: { value: number | null };
}

export interface Alert {
  id: string;
  properties: {
    event: string;
    severity: string;
    headline: string | null;
    description: string;
    expires: string | null;
    areaDesc: string;
  };
  geometry: any | null;
}

export interface EnvData {
  windMph: number | null;
  gustMph: number | null;
  windDir: string | null;
  windDeg: number | null;
  uv: number | null;
  humidity: number | null;
  feelsF: number | null;
  pressure: number | null;
  visibMi: number | null;
  wavesFt: number | null;
  waveDir: string | null;
  wavePeriod: number | null;
  aqi: number | null;
  pm25: number | null;
}

export interface GaugeSite {
  id: string;
  name: string;
  short: string;
  lat: number;
  lon: number;
  flood: number;
  action: number;
  level: number | null;
  flow: number | null;
}

export interface HazardStatus {
  status: 'ok' | 'advisory' | 'watch' | 'warning';
  detail: string;
}

export interface Hazards {
  earthquake: HazardStatus | null;
  surf: HazardStatus | null;
  tropical: HazardStatus | null;
  tsunami: HazardStatus | null;
  fire: HazardStatus | null;
  vog: HazardStatus | null;
  forecasterDiscussion: {
    text: string;
    issued: string;
    id: string;
  } | null;
}

export interface WeatherData {
  point: NWSPoint | null;
  periods: ForecastPeriod[];
  hourly: ForecastPeriod[];
  alerts: Alert[];
  env: EnvData;
  gauges: GaugeSite[];
  hazards: Hazards;
  loading: boolean;
  error: string | null;
}

export type UserInterest = 'ocean' | 'outdoor' | 'commute' | 'severe' | 'health' | 'data';
export type DataDensity = 'simple' | 'standard' | 'full';

export interface UserPreferences {
  interests: UserInterest[];
  density: DataDensity;
  locationGranted: boolean;
  notificationsGranted: boolean;
  onboardingComplete: boolean;
}
