import { useState, useEffect, useCallback } from 'react';
import type { WeatherData } from '../types/weather';
import { fetchWeather, fetchEnv, fetchGauges, fetchHazards } from '../services/nws';

const REFRESH_INTERVAL = 10 * 60 * 1000;

const initialEnv = {
  windMph: null, gustMph: null, windDir: null, windDeg: null,
  uv: null, humidity: null, feelsF: null, pressure: null,
  visibMi: null, wavesFt: null, waveDir: null, wavePeriod: null,
  aqi: null, pm25: null,
};

const initialHazards = {
  earthquake: null, surf: null, tropical: null,
  tsunami: null, fire: null, vog: null,
  forecasterDiscussion: null,
};

export function useWeather() {
  const [data, setData] = useState<WeatherData>({
    point: null, periods: [], hourly: [], alerts: [],
    env: initialEnv, gauges: [], hazards: initialHazards,
    loading: true, error: null,
  });

  const load = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const weather = await fetchWeather();
      setData(prev => ({
        ...prev,
        point: weather.point,
        periods: weather.periods,
        hourly: weather.hourly,
        alerts: weather.alerts,
        loading: false,
      }));

      const [env, gauges] = await Promise.all([fetchEnv(), fetchGauges()]);
      setData(prev => ({ ...prev, env, gauges }));

      const hazards = await fetchHazards(env);
      setData(prev => ({ ...prev, hazards }));
    } catch (e) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to load weather data',
      }));
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [load]);

  return { data, refresh: load };
}
