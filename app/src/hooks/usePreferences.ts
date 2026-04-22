import { useState, useCallback } from 'react';
import type { UserPreferences, UserInterest, DataDensity } from '../types/weather';

const STORAGE_KEY = 'nws-prefs';

function loadPrefs(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    interests: [],
    density: 'standard',
    locationGranted: false,
    notificationsGranted: false,
    onboardingComplete: false,
  };
}

function savePrefs(prefs: UserPreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(loadPrefs);

  const update = useCallback((patch: Partial<UserPreferences>) => {
    setPrefs(prev => {
      const next = { ...prev, ...patch };
      savePrefs(next);
      return next;
    });
  }, []);

  const toggleInterest = useCallback((interest: UserInterest) => {
    setPrefs(prev => {
      const has = prev.interests.includes(interest);
      const interests = has
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      const next = { ...prev, interests };
      savePrefs(next);
      return next;
    });
  }, []);

  const setDensity = useCallback((density: DataDensity) => {
    update({ density });
  }, [update]);

  const completeOnboarding = useCallback(() => {
    update({ onboardingComplete: true });
  }, [update]);

  return { prefs, update, toggleInterest, setDensity, completeOnboarding };
}
