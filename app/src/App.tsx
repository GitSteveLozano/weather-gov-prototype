import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { usePreferences } from './hooks/usePreferences';
import { Onboarding } from './components/onboarding/Onboarding';
import { NowTab } from './components/now/NowTab';
import { RadarTab } from './components/radar/RadarTab';
import { TabBar } from './components/common/TabBar';
import './index.css';

export type TabId = 'now' | 'radar' | 'week' | 'forecast';

export default function App() {
  const { data } = useWeather();
  const { prefs, toggleInterest, setDensity, completeOnboarding, update } = usePreferences();
  const [activeTab, setActiveTab] = useState<TabId>('now');

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
        {activeTab === 'now' && <NowTab data={data} prefs={prefs} />}
        {activeTab === 'radar' && <RadarTab data={data} />}
        {activeTab === 'week' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
            Week tab — coming next
          </div>
        )}
        {activeTab === 'forecast' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
            Forecast tab — coming next
          </div>
        )}
      </div>
      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
