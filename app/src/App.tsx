import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { HomeAtmos } from './components/home/HomeAtmos';
import { RadarTab } from './components/radar/RadarTab';
import type { RadarStyle } from './components/radar/RadarTab';
import { Settings } from './components/settings/Settings';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import type { DataDensity } from './types/weather';
import './index.css';

export type ThemeMode = 'light' | 'system' | 'dark';
export type HomeSkin = 'civic' | 'atmospheric';
export type DepthLevel = 'glance' | 'scan' | 'dive';

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
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => load('sb-theme', 'system'));
  const [skin, setSkin] = useState<HomeSkin>(() => load('sb-skin', 'civic'));
  const [depth, setDepth] = useState<DepthLevel>(() => load('sb-depth-level', 'scan'));
  const [radarStyle, setRadarStyle] = useState<RadarStyle>(() => load('sb-radar-style', 'clean'));

  const handleOnboardingComplete = useCallback((d: DataDensity) => {
    save('sb-onboarded', true);
    const dl = densityToDepth(d);
    save('sb-depth-level', dl);
    setDepth(dl);
    setOnboarded(true);
  }, []);

  const handleTheme = useCallback((t: ThemeMode) => {
    setTheme(t); save('sb-theme', t); applyTheme(t);
  }, []);

  const handleSkin = useCallback((s: HomeSkin) => {
    setSkin(s); save('sb-skin', s);
  }, []);

  const handleDepth = useCallback((d: DepthLevel) => {
    setDepth(d); save('sb-depth-level', d);
  }, []);

  const handleRadarStyle = useCallback((s: RadarStyle) => {
    setRadarStyle(s); save('sb-radar-style', s);
  }, []);

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', maxWidth: 430, margin: '0 auto', background: 'var(--paper)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mode === 'home' && skin === 'civic' && <HomeScreen data={data} depth={depth} onOpenSettings={() => setShowSettings(true)} />}
        {mode === 'home' && skin === 'atmospheric' && <HomeAtmos data={data} depth={depth} onOpenSettings={() => setShowSettings(true)} />}
        {mode === 'radar' && <RadarTab radarStyle={radarStyle} />}
      </div>
      <ModeBar active={mode} onChange={setMode} />
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          theme={theme} onThemeChange={handleTheme}
          skin={skin} onSkinChange={handleSkin}
          depth={depth} onDepthChange={handleDepth}
          radarStyle={radarStyle} onRadarStyleChange={handleRadarStyle}
        />
      )}
    </div>
  );
}
