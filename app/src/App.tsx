import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { HomeAtmos } from './components/home/HomeAtmos';
import { HomeCarto } from './components/home/HomeCarto';
import { HomeData } from './components/home/HomeData';
import { RadarTab } from './components/radar/RadarTab';
import type { RadarStyle } from './components/radar/RadarTab';
import { Settings } from './components/settings/Settings';
import { BriefScreen } from './components/agentic/BriefScreen';
import { AskScreen } from './components/agentic/AskScreen';
import { MarineScreen } from './components/specialty/MarineScreen';
import { AviationScreen } from './components/specialty/AviationScreen';
import { FireScreen } from './components/specialty/FireScreen';
import { AlertDetail } from './components/alerts/AlertDetail';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import type { DataDensity, Alert } from './types/weather';
import './index.css';

export type ThemeMode = 'light' | 'system' | 'dark';
export type HomeSkin = 'civic' | 'atmospheric' | 'cartographic' | 'data';
export type DepthLevel = 'glance' | 'scan' | 'dive';
export type SubScreen = null | 'settings' | 'brief' | 'ask' | 'marine' | 'aviation' | 'fire' | 'alert-detail';

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
  if (sub === 'brief') return <BriefScreen data={data} onBack={() => setSub(null)} />;
  if (sub === 'ask') return <AskScreen data={data} onBack={() => setSub(null)} />;
  if (sub === 'marine') return <MarineScreen data={data} onBack={() => setSub(null)} />;
  if (sub === 'aviation') return <AviationScreen onBack={() => setSub(null)} />;
  if (sub === 'fire') return <FireScreen data={data} onBack={() => setSub(null)} />;
  if (sub === 'alert-detail' && selectedAlert) return <AlertDetail alert={selectedAlert} onBack={() => { setSub(null); setSelectedAlert(null); }} />;

  const homeProps = {
    data, depth,
    onOpenSettings: () => setSub('settings'),
    onOpenBrief: () => setSub('brief'),
    onOpenAsk: () => setSub('ask'),
    onOpenMarine: () => setSub('marine'),
    onOpenAviation: () => setSub('aviation'),
    onOpenFire: () => setSub('fire'),
    onOpenAlert: openAlert,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', maxWidth: 430, margin: '0 auto', background: 'var(--paper)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mode === 'home' && skin === 'civic' && <HomeScreen {...homeProps} />}
        {mode === 'home' && skin === 'atmospheric' && <HomeAtmos {...homeProps} />}
        {mode === 'home' && skin === 'cartographic' && <HomeCarto {...homeProps} />}
        {mode === 'home' && skin === 'data' && <HomeData {...homeProps} />}
        {mode === 'radar' && <RadarTab radarStyle={radarStyle} />}
      </div>
      <ModeBar active={mode} onChange={setMode} />
    </div>
  );
}
