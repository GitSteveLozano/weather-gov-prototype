import { useState } from 'react';
import type { UserPreferences, UserInterest, DataDensity } from '../../types/weather';
import { SBLogo, SBWordmark } from '../shared/SBLogo';
import { WxIcon } from '../shared/WxIcon';
import './Onboarding.css';

interface Props {
  prefs: UserPreferences;
  toggleInterest: (i: UserInterest) => void;
  setDensity: (d: DataDensity) => void;
  completeOnboarding: () => void;
  update: (patch: Partial<UserPreferences>) => void;
}

const INTERESTS: { id: UserInterest; icon: string; name: string; desc: string }[] = [
  { id: 'ocean', icon: '🌊', name: 'Beach & Ocean', desc: 'Surf, tides, swell, rip current risk' },
  { id: 'outdoor', icon: '🏃', name: 'Outdoors', desc: 'UV, wind, air quality, pollen' },
  { id: 'commute', icon: '🚗', name: 'Commute', desc: 'Hourly timing, rain windows' },
  { id: 'severe', icon: '⛈️', name: 'Severe Weather', desc: 'Alerts, radar, warnings' },
  { id: 'health', icon: '🌿', name: 'Health & Wellness', desc: 'UV burn time, pollen, AQI' },
  { id: 'data', icon: '🔬', name: 'Full Data', desc: 'Models, AFD, aviation, marine' },
];

const DEPTH_OPTIONS: { id: DataDensity; name: string; desc: string; icon: React.ReactNode }[] = [
  { id: 'simple', name: 'Glance', desc: 'Just the essentials — temp, rain, alerts', icon: <WxIcon kind="clear-day" size={28} /> },
  { id: 'standard', name: 'Scan', desc: 'Hourly, 7-day, conditions, radar', icon: <WxIcon kind="partly-cloudy-day" size={28} /> },
  { id: 'full', name: 'Dive', desc: 'Models, AFD, marine, full data', icon: <WxIcon kind="rain" size={28} /> },
];

export function Onboarding({ prefs, toggleInterest, setDensity, completeOnboarding, update }: Props) {
  const [screen, setScreen] = useState(1);
  const [exiting, setExiting] = useState(false);

  function goTo(n: number) {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      setScreen(n);
    }, 280);
  }

  function handleFinish() {
    goTo(5);
    setTimeout(() => {
      completeOnboarding();
    }, 2000);
  }

  return (
    <div className="ob-shell">
      {/* Screen 1: Welcome */}
      {screen === 1 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <div className="ob-content">
            <div className="ob-welcome-top">
              <SBLogo size={44} />
            </div>
            <div className="ob-hero-section">
              <h1 className="ob-headline">Weather you<br />can trust,<br /><em>made simple.</em></h1>
              <div className="ob-features">
                <FeatureLine icon="clear-day" text="Official NWS forecasts, not third-party guesses" />
                <FeatureLine icon="rain" text="Alerts that matter — severity-coded, actionable" />
                <FeatureLine icon="wind" text="Glance, Scan, or Dive — your depth, your choice" />
              </div>
            </div>
            <div className="ob-actions">
              <button className="ob-btn-primary" onClick={() => goTo(2)}>Get started</button>
              <p className="ob-legal">Free forever · No ads · No data selling</p>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Location */}
      {screen === 2 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={0} total={3} />
          <div className="ob-perm-content">
            <div className="ob-perm-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h2 className="ob-perm-title">Your forecast,<br />your grid point</h2>
            <p className="ob-perm-body">NWS forecasts are issued on a 2.5km grid. We use your location to find the precise forecast for exactly where you are — not a nearby city.</p>
            <div className="ob-detail-box">
              <DetailRow text="Location is only used to fetch your forecast. Never stored." />
              <DetailRow text="Data comes directly from api.weather.gov." />
              <DetailRow text="You can enter a location manually instead." />
            </div>
          </div>
          <div className="ob-actions">
            <button className="ob-btn-primary" onClick={() => { update({ locationGranted: true }); goTo(3); }}>Allow location access</button>
            <button className="ob-btn-ghost" onClick={() => goTo(3)}>Enter manually</button>
          </div>
        </div>
      )}

      {/* Screen 3: Depth */}
      {screen === 3 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={1} total={3} />
          <div className="ob-perm-content">
            <h2 className="ob-perm-title" style={{ marginBottom: 4 }}>How much weather<br />do you want?</h2>
            <p className="ob-perm-body" style={{ marginBottom: 20 }}>You can always change this later.</p>
            <div className="ob-depth-options">
              {DEPTH_OPTIONS.map(d => (
                <button
                  key={d.id}
                  className={`ob-depth-card${prefs.density === d.id ? ' sel' : ''}`}
                  onClick={() => setDensity(d.id)}
                >
                  <div className="ob-depth-icon">{d.icon}</div>
                  <div className="ob-depth-info">
                    <div className="ob-depth-name">{d.name}</div>
                    <div className="ob-depth-desc">{d.desc}</div>
                  </div>
                  <div className={`ob-depth-radio${prefs.density === d.id ? ' on' : ''}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="ob-actions">
            <button className="ob-btn-primary" onClick={() => goTo(4)}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 4: Interests */}
      {screen === 4 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={2} total={3} />
          <div className="ob-interests-content">
            <h2 className="ob-int-title">What do you care about?</h2>
            <p className="ob-int-sub">We'll surface the most relevant data first.</p>
            <div className="ob-tiles-grid">
              {INTERESTS.map(i => (
                <button
                  key={i.id}
                  className={`ob-tile${prefs.interests.includes(i.id) ? ' sel' : ''}`}
                  onClick={() => toggleInterest(i.id)}
                >
                  <span className="ob-tile-ico">{i.icon}</span>
                  <div className="ob-tile-name">{i.name}</div>
                  <div className="ob-tile-desc">{i.desc}</div>
                  {prefs.interests.includes(i.id) && <div className="ob-tile-check">✓</div>}
                </button>
              ))}
            </div>
          </div>
          <div className="ob-actions">
            <p className="ob-sel-count sb-mono">
              {prefs.interests.length === 0 ? 'Select at least one' : `${prefs.interests.length} selected`}
            </p>
            <button
              className={`ob-btn-primary${prefs.interests.length === 0 ? ' disabled' : ''}`}
              disabled={prefs.interests.length === 0}
              onClick={handleFinish}
            >
              Build my forecast →
            </button>
          </div>
        </div>
      )}

      {/* Screen 5: Loading */}
      {screen === 5 && (
        <div className="ob-screen ob-enter">
          <div className="ob-loading">
            <SBWordmark size={16} />
            <div className="ob-load-spinner" />
            <h2 className="ob-load-title">Building your forecast</h2>
            <p className="ob-load-sub">Connecting to the National Weather Service…</p>
            <div className="ob-load-bar"><div className="ob-load-fill" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="ob-progress">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`ob-dot${i < current ? ' done' : ''}${i === current ? ' active' : ''}`} />
      ))}
    </div>
  );
}

function DetailRow({ text }: { text: string }) {
  return (
    <div className="ob-detail-row">
      <div className="ob-detail-dot" />
      <div className="ob-detail-text">{text}</div>
    </div>
  );
}

function FeatureLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="ob-feature-line">
      <div className="ob-feature-badge">
        <WxIcon kind={icon as any} size={18} stroke={1.4} />
      </div>
      <div className="ob-feature-text">{text}</div>
    </div>
  );
}
