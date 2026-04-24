import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { HomeAtmos } from './components/home/HomeAtmos';
import { HomeCarto } from './components/home/HomeCarto';
import { HomeData } from './components/home/HomeData';
import { RadarTab } from './components/radar/RadarTab';
import type { RadarStyle } from './components/radar/RadarTab';
import { MoreScreen } from './components/more/MoreScreen';
import { Settings } from './components/settings/Settings';
import { BriefScreen } from './components/agentic/BriefScreen';
import { AskScreen } from './components/agentic/AskScreen';
import { MarineScreen } from './components/specialty/MarineScreen';
import { AviationScreen } from './components/specialty/AviationScreen';
import { FireScreen } from './components/specialty/FireScreen';
import { AlertDetail } from './components/alerts/AlertDetail';
import { AirQualityScreen } from './components/civic/AirQualityScreen';
import { ClimateScreen } from './components/civic/ClimateScreen';
import { DroughtScreen } from './components/civic/DroughtScreen';
import { EarthquakeScreen } from './components/civic/EarthquakeScreen';
import { RiverScreen } from './components/civic/RiverScreen';
import { WildfireScreen } from './components/civic/WildfireScreen';
import { TsunamiScreen } from './components/civic/TsunamiScreen';
import { HealthScreen } from './components/health/HealthScreen';
import { ScreenGuard } from './components/shared/ScreenGuard';
import { HurricaneScreen } from './components/events/HurricaneScreen';
import { LightningScreen } from './components/events/LightningScreen';
import { SnowScreen } from './components/events/SnowScreen';
import { MoonTideScreen } from './components/events/MoonTideScreen';
import { WindScreen } from './components/specialty/WindScreen';
import { HourlyDetail } from './components/forecast/HourlyDetail';
import { DailyDetail } from './components/forecast/DailyDetail';
import { MinuteCast } from './components/agentic/MinuteCast';
import { AuroraScreen } from './components/civic/AuroraScreen';
import { FloodInundationScreen } from './components/civic/FloodInundationScreen';
import { SkywarnScreen } from './components/civic/SkywarnScreen';
import { SafetyDrawer } from './components/alerts/SafetyDrawer';
import { EmergencyTakeover } from './components/alerts/EmergencyTakeover';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import type { DataDensity, Alert } from './types/weather';
import './index.css';

export type ThemeMode = 'light' | 'system' | 'dark';
export type HomeSkin = 'civic' | 'atmospheric' | 'cartographic' | 'data';
export type DepthLevel = 'glance' | 'scan' | 'dive';
export type SubScreen = null | 'settings' | 'brief' | 'ask' | 'marine' | 'aviation' | 'fire' | 'alert-detail' | 'air-quality' | 'climate' | 'drought' | 'earthquake' | 'river' | 'wildfire' | 'tsunami' | 'health' | 'hurricane' | 'lightning' | 'snow' | 'moon' | 'wind' | 'hourly' | 'daily' | 'minutecast' | 'aurora' | 'flood' | 'skywarn' | 'safety';

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key: string, value: unknown) { localStorage.setItem(key, JSON.stringify(value)); }

function applyTheme(mode: ThemeMode) {
  if (mode === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', mode);
}

function densityToDepth(d: DataDensity): DepthLevel {
  return d === 'simple' ? 'glance' : d === 'full' ? 'dive' : 'scan';
}

export default function App() {
  const { data } = useWeather();
  const [onboarded, setOnboarded] = useState(() => load('sb-onboarded', false));
  const [mode, setMode] = useState<ModeId>('home');
  const [sub, setSub] = useState<SubScreen>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => load('sb-theme', 'system'));
  const [skin, setSkin] = useState<HomeSkin>(() => load('sb-skin', 'civic'));
  const [depth, setDepth] = useState<DepthLevel>(() => load('sb-depth-level', 'scan'));
  const [radarStyle, setRadarStyle] = useState<RadarStyle>(() => load('sb-radar-style', 'clean'));
  const [emergencyDismissed, setEmergencyDismissed] = useState(false);

  const handleOnboardingComplete = useCallback((d: DataDensity) => {
    save('sb-onboarded', true);
    setDepth(densityToDepth(d)); save('sb-depth-level', densityToDepth(d));
    setOnboarded(true);
  }, []);

  const handleTheme = useCallback((t: ThemeMode) => { setTheme(t); save('sb-theme', t); applyTheme(t); }, []);
  const handleSkin = useCallback((s: HomeSkin) => { setSkin(s); save('sb-skin', s); }, []);
  const handleDepth = useCallback((d: DepthLevel) => { setDepth(d); save('sb-depth-level', d); }, []);
  const handleRadarStyle = useCallback((s: RadarStyle) => { setRadarStyle(s); save('sb-radar-style', s); }, []);

  const openAlert = useCallback((alert: Alert) => { setSelectedAlert(alert); setSub('alert-detail'); }, []);

  if (!onboarded) return <Onboarding onComplete={handleOnboardingComplete} />;

  // Sub-screens (full-screen overlays)
  if (sub === 'settings') return (
    <Settings onClose={() => setSub(null)} theme={theme} onThemeChange={handleTheme}
      skin={skin} onSkinChange={handleSkin} depth={depth} onDepthChange={handleDepth}
      radarStyle={radarStyle} onRadarStyleChange={handleRadarStyle} />
  );
  if (sub === 'brief') return <ScreenGuard name="brief"><BriefScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'ask') return <ScreenGuard name="ask"><AskScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'marine') return <ScreenGuard name="marine"><MarineScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'aviation') return <ScreenGuard name="aviation"><AviationScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'fire') return <ScreenGuard name="fire"><FireScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'alert-detail' && selectedAlert) return <ScreenGuard name="alert-detail"><AlertDetail alert={selectedAlert} onBack={() => { setSub(null); setSelectedAlert(null); }} /></ScreenGuard>;
  if (sub === 'air-quality') return <ScreenGuard name="air-quality"><AirQualityScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'climate') return <ScreenGuard name="climate"><ClimateScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'drought') return <ScreenGuard name="drought"><DroughtScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'earthquake') return <ScreenGuard name="earthquake"><EarthquakeScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'river') return <ScreenGuard name="river"><RiverScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'wildfire') return <ScreenGuard name="wildfire"><WildfireScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'tsunami') return <ScreenGuard name="tsunami"><TsunamiScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'health') return <ScreenGuard name="health"><HealthScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'hurricane') return <ScreenGuard name="hurricane"><HurricaneScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'lightning') return <ScreenGuard name="lightning"><LightningScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'snow') return <ScreenGuard name="snow"><SnowScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'moon') return <ScreenGuard name="moon"><MoonTideScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'wind') return <ScreenGuard name="wind"><WindScreen data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'hourly') return <ScreenGuard name="hourly"><HourlyDetail data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'daily') return <ScreenGuard name="daily"><DailyDetail data={data} onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'minutecast') return <ScreenGuard name="minutecast"><MinuteCast onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'aurora') return <ScreenGuard name="aurora"><AuroraScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'flood') return <ScreenGuard name="flood"><FloodInundationScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'skywarn') return <ScreenGuard name="skywarn"><SkywarnScreen onBack={() => setSub(null)} /></ScreenGuard>;
  if (sub === 'safety') return <ScreenGuard name="safety"><SafetyDrawer alertEvent="Wind Advisory" onBack={() => setSub(null)} /></ScreenGuard>;

  const handleNavigate = useCallback((screen: string) => {
    setSub(screen as any);
  }, []);

  const homeProps = {
    data, depth,
    onOpenSettings: () => setSub('settings'),
    onNavigate: handleNavigate,
    onOpenBrief: () => setSub('brief'),
    onOpenAsk: () => setSub('ask'),
    onOpenMarine: () => setSub('marine'),
    onOpenAviation: () => setSub('aviation'),
    onOpenFire: () => setSub('fire'),
    onOpenAlert: openAlert,
  };

  return (
    <div className="app-root" data-mode={mode}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        {mode === 'home' && skin === 'civic' && <HomeScreen {...homeProps} />}
        {mode === 'home' && skin === 'atmospheric' && <HomeAtmos {...homeProps} />}
        {mode === 'home' && skin === 'cartographic' && <HomeCarto {...homeProps} />}
        {mode === 'home' && skin === 'data' && <HomeData {...homeProps} />}
        {mode === 'radar' && <RadarTab radarStyle={radarStyle} />}
        {mode === 'more' && <MoreScreen onNavigate={(screen) => setSub(screen as SubScreen)} />}
      </div>
      <ModeBar active={mode} onChange={setMode} />
      {/* Emergency takeover — renders over everything for Extreme alerts */}
      {!emergencyDismissed && data.alerts.some(a => a.properties.severity === 'Extreme') && (
        <EmergencyTakeover
          alert={data.alerts.find(a => a.properties.severity === 'Extreme')!}
          onDismiss={() => setEmergencyDismissed(true)}
        />
      )}
    </div>
  );
}
