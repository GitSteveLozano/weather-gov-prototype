import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { usePreferences } from './hooks/usePreferences';
import { Onboarding } from './components/onboarding/Onboarding';
import { HomeScreen } from './components/home/HomeScreen';
import { RadarTab } from './components/radar/RadarTab';
import { ModeBar } from './components/common/ModeBar';
import type { ModeId } from './components/common/ModeBar';
import './index.css';

export default function App() {
  const { data } = useWeather();
  const { prefs, toggleInterest, setDensity, completeOnboarding, update } = usePreferences();
  const [activeMode, setActiveMode] = useState<ModeId>('home');

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
        {activeMode === 'home' && <HomeScreen data={data} />}
        {activeMode === 'radar' && <RadarTab data={data} />}
      </div>
      <ModeBar active={activeMode} onChange={setActiveMode} alertCount={data.alerts.length} />
    </div>
  );
}
