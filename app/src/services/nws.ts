import type { NWSPoint, ForecastPeriod, Alert, EnvData, GaugeSite, Hazards } from '../types/weather';

const LAT = 21.3069;
const LON = -157.8583;
const NWS_HEADERS = { 'User-Agent': '(skybureau-prototype, contact@skybureau.app)' };

export const GAUGE_SITES: GaugeSite[] = [
  { id: '16247100', name: 'Manoa-Palolo Canal', short: 'Manoa Canal', lat: 21.295, lon: -157.826, flood: 5.0, action: 3.5, level: null, flow: null },
  { id: '16229000', name: 'Kalihi Stream', short: 'Kalihi Stream', lat: 21.37, lon: -157.875, flood: 8.0, action: 5.5, level: null, flow: null },
  { id: '16213000', name: 'Waikele Stream', short: 'Waikele Stream', lat: 21.385, lon: -158.01, flood: 12.0, action: 8.0, level: null, flow: null },
  { id: '16210500', name: 'Kaukonahua Stream at Waialua', short: 'Kaukonahua', lat: 21.565, lon: -158.12, flood: 28.0, action: 20.0, level: null, flow: null },
];

function degToCompass(d: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(d / 22.5) % 16];
}

export async function fetchWeather(): Promise<{
  point: NWSPoint;
  periods: ForecastPeriod[];
  hourly: ForecastPeriod[];
  alerts: Alert[];
}> {
  const [ptR, alR] = await Promise.all([
    fetch(`https://api.weather.gov/points/${LAT},${LON}`, { headers: NWS_HEADERS }),
    fetch('https://api.weather.gov/alerts/active?area=HI', { headers: NWS_HEADERS }),
  ]);
  const pt = await ptR.json();
  const al = await alR.json();
  const pr = pt.properties;

  const [fcR, , hrR] = await Promise.all([
    fetch(pr.forecast, { headers: NWS_HEADERS }),
    fetch(pr.forecastGridData, { headers: NWS_HEADERS }),
    fetch(pr.forecastHourly, { headers: NWS_HEADERS }),
  ]);
  const fc = await fcR.json();
  const hr = await hrR.json();

  return {
    point: {
      city: (pr.relativeLocation?.properties?.city || 'Honolulu').replace(/^Urban /, ''),
      state: pr.relativeLocation?.properties?.state || 'HI',
      office: pr.cwa,
      gridX: pr.gridX,
      gridY: pr.gridY,
      forecastUrl: pr.forecast,
      forecastGridDataUrl: pr.forecastGridData,
      forecastHourlyUrl: pr.forecastHourly,
    },
    periods: fc.properties.periods.slice(0, 14),
    hourly: hr.properties.periods.slice(0, 12),
    alerts: al.features || [],
  };
}

export async function fetchEnv(): Promise<EnvData> {
  const [wxR, marR, aqR] = await Promise.all([
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=uv_index,wind_speed_10m,wind_direction_10m,wind_gusts_10m,relative_humidity_2m,apparent_temperature,visibility,surface_pressure&timezone=Pacific/Honolulu&forecast_days=1`),
    fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&current=wave_height,wave_direction,wave_period,swell_wave_height&timezone=Pacific/Honolulu`),
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&current=us_aqi,pm2_5&timezone=Pacific/Honolulu`),
  ]);
  const [wx, mar, aq] = await Promise.all([wxR.json(), marR.json(), aqR.json()]);
  const c = wx.current || {};
  const m = mar.current || {};
  const a = aq.current || {};

  return {
    windMph: c.wind_speed_10m ? Math.round(c.wind_speed_10m * 0.621371) : null,
    gustMph: c.wind_gusts_10m ? Math.round(c.wind_gusts_10m * 0.621371) : null,
    windDir: c.wind_direction_10m != null ? degToCompass(c.wind_direction_10m) : null,
    windDeg: c.wind_direction_10m ?? null,
    uv: c.uv_index != null ? Math.round(c.uv_index) : null,
    humidity: c.relative_humidity_2m != null ? Math.round(c.relative_humidity_2m) : null,
    feelsF: c.apparent_temperature != null ? Math.round(c.apparent_temperature * 9 / 5 + 32) : null,
    pressure: c.surface_pressure != null ? Math.round(c.surface_pressure) : null,
    visibMi: c.visibility ? Math.round(c.visibility / 1609.34) : null,
    wavesFt: m.wave_height ? +(m.wave_height * 3.28084).toFixed(1) : null,
    waveDir: m.wave_direction != null ? degToCompass(m.wave_direction) : null,
    wavePeriod: m.wave_period ? Math.round(m.wave_period) : null,
    aqi: a.us_aqi != null ? Math.round(a.us_aqi) : null,
    pm25: a.pm2_5 != null ? +a.pm2_5.toFixed(1) : null,
  };
}

export async function fetchGauges(): Promise<GaugeSite[]> {
  const ids = GAUGE_SITES.map(g => g.id).join(',');
  const r = await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${ids}&parameterCd=00065,00060&siteStatus=active`);
  const d = await r.json();
  const ts = d.value.timeSeries;

  return GAUGE_SITES.map(gs => {
    const copy = { ...gs };
    const stage = ts.find((s: any) => s.sourceInfo.siteCode[0].value === gs.id && s.variable.variableCode[0].value === '00065');
    const flow = ts.find((s: any) => s.sourceInfo.siteCode[0].value === gs.id && s.variable.variableCode[0].value === '00060');
    if (stage) {
      const v = stage.values[0].value;
      copy.level = v.length ? parseFloat(v[v.length - 1].value) : null;
    }
    if (flow) {
      const v = flow.values[0].value;
      copy.flow = v.length ? parseFloat(v[v.length - 1].value) : null;
    }
    return copy;
  });
}

export async function fetchHazards(envData: EnvData): Promise<Hazards> {
  const hazards: Hazards = {
    earthquake: null,
    surf: null,
    tropical: null,
    tsunami: null,
    fire: null,
    vog: null,
    forecasterDiscussion: null,
  };

  try {
    const eqR = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=18.5&maxlatitude=22.5&minlongitude=-160.5&maxlongitude=-154.5&minmagnitude=2.5&orderby=time&limit=10&starttime=${new Date(Date.now() - 86400000).toISOString().split('.')[0]}`);
    const eq = await eqR.json();
    const eqFeats = eq.features || [];
    const maxMag = eqFeats.length ? Math.max(...eqFeats.map((f: any) => f.properties.mag)) : 0;
    hazards.earthquake = {
      status: eqFeats.length ? 'advisory' : 'ok',
      detail: eqFeats.length ? `${eqFeats.length} event${eqFeats.length > 1 ? 's' : ''} · M${maxMag.toFixed(1)}` : 'No activity 24hr',
    };
  } catch { hazards.earthquake = { status: 'ok', detail: 'Unable to fetch' }; }

  try {
    const surfR = await fetch('https://api.weather.gov/alerts/active?area=HI&event=High+Surf+Advisory,High+Surf+Warning,Rip+Current+Statement', { headers: NWS_HEADERS });
    const surfD = await surfR.json();
    const surfAlerts = surfD.features || [];
    hazards.surf = {
      status: surfAlerts.length ? 'warning' : 'ok',
      detail: surfAlerts.length ? surfAlerts[0].properties.event : envData.wavesFt ? `${envData.wavesFt}ft` : 'No advisories',
    };
  } catch { hazards.surf = { status: 'ok', detail: 'Unable to fetch' }; }

  try {
    const tropR = await fetch('https://api.weather.gov/alerts/active?area=HI&event=Hurricane+Warning,Hurricane+Watch,Tropical+Storm+Warning,Tropical+Storm+Watch', { headers: NWS_HEADERS });
    const trop = await tropR.json();
    hazards.tropical = {
      status: (trop.features || []).length ? 'warning' : 'ok',
      detail: (trop.features || []).length ? trop.features[0].properties.event : 'No threats',
    };
  } catch { hazards.tropical = { status: 'ok', detail: 'Unable to fetch' }; }

  try {
    const tsuR = await fetch('https://api.weather.gov/alerts/active?area=HI&event=Tsunami+Warning,Tsunami+Watch,Tsunami+Advisory', { headers: NWS_HEADERS });
    const tsu = await tsuR.json();
    hazards.tsunami = {
      status: (tsu.features || []).length ? 'warning' : 'ok',
      detail: (tsu.features || []).length ? tsu.features[0].properties.event : 'No warnings',
    };
  } catch { hazards.tsunami = { status: 'ok', detail: 'Unable to fetch' }; }

  const humidity = envData.humidity || 70;
  const windMph = envData.windMph || 10;
  hazards.fire = {
    status: (humidity < 30 && windMph > 20) ? 'warning' : (humidity < 40 && windMph > 15) ? 'advisory' : 'ok',
    detail: `${humidity}% RH · ${windMph}mph wind`,
  };

  const aqiVal = envData.aqi || 0;
  const windDir = envData.windDir || '';
  const southWind = ['S', 'SSW', 'SW', 'WSW', 'SSE', 'SE'].includes(windDir);
  hazards.vog = {
    status: (aqiVal > 100 || (southWind && aqiVal > 50)) ? 'advisory' : 'ok',
    detail: `AQI: ${aqiVal} · ${windDir}`,
  };

  try {
    const discR = await fetch('https://api.weather.gov/products?office=HFO&type=AFD&limit=1', { headers: NWS_HEADERS });
    const discD = await discR.json();
    const latest = discD['@graph']?.[0];
    if (latest) {
      const prodR = await fetch(`https://api.weather.gov/products/${latest.id}`, { headers: NWS_HEADERS });
      const prod = await prodR.json();
      hazards.forecasterDiscussion = {
        text: (prod.productText || '').slice(0, 800),
        issued: latest.issuanceTime,
        id: latest.id,
      };
    }
  } catch { /* AFD optional */ }

  return hazards;
}
