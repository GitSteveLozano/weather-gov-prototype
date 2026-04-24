import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { RadarTab } from './components/radar/RadarTab';
import { Settings } from './components/settings/Settings';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import type { DataDensity } from './types/weather';
import './index.css';

type ThemeMode = 'light' | 'system' | 'dark';

function applyTheme(mode: ThemeMode) {
  if (mode === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', mode);
}

function isOnboarded() {
  try { return JSON.parse(localStorage.getItem('sb-onboarded') || 'false'); } catch { return false; }
}

export default function App() {
  const { data } = useWeather();
  const [onboarded, setOnboarded] = useState(isOnboarded);
  const [mode, setMode] = useState<ModeId>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');

  const handleOnboardingComplete = useCallback((depth: DataDensity) => {
    localStorage.setItem('sb-onboarded', 'true');
    localStorage.setItem('sb-depth', depth);
    setOnboarded(true);
  }, []);

  const handleTheme = useCallback((t: ThemeMode) => {
    setTheme(t);
    applyTheme(t);
  }, []);

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', maxWidth: 430, margin: '0 auto', background: 'var(--paper)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mode === 'home' && <HomeScreen data={data} onOpenSettings={() => setShowSettings(true)} />}
        {mode === 'radar' && <RadarTab />}
      </div>
      <ModeBar active={mode} onChange={setMode} />
      {showSettings && <Settings onClose={() => setShowSettings(false)} theme={theme} onThemeChange={handleTheme} />}
    </div>
  );
}
