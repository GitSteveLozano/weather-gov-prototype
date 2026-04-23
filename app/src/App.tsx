import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { usePreferences } from './hooks/usePreferences';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { RadarTab } from './components/radar/RadarTab';
import { Settings } from './components/settings/Settings';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import './index.css';

type ThemeMode = 'light' | 'system' | 'dark';

function applyTheme(mode: ThemeMode) {
  if (mode === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
}

export default function App() {
  const { data } = useWeather();
  const { prefs, toggleInterest, setDensity, completeOnboarding, update } = usePreferences();
  const [activeMode, setActiveMode] = useState<ModeId>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>('system');

  const handleThemeChange = useCallback((t: ThemeMode) => {
    setThemeState(t);
    applyTheme(t);
  }, []);

  if (!prefs.onboardingComplete) {
    return (
      <Onboarding
        prefs={prefs}
        toggleInterest={toggleInterest}
        setDensity={setDensity}
        completeOnboarding={completeOnboarding}
        update={update}
      />
    );
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        {activeMode === 'home' && <HomeScreen data={data} onOpenSettings={() => setShowSettings(true)} />}
        {activeMode === 'radar' && <RadarTab data={data} />}
      </div>
      <ModeBar active={activeMode} onChange={setActiveMode} alertCount={data.alerts.length} />
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          theme={theme}
          onThemeChange={handleThemeChange}
          density={prefs.density}
        />
      )}
    </div>
  );
}
