import { useState } from 'react';
import type { UserPreferences, UserInterest, DataDensity } from '../../types/weather';
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

const DENSITIES: { id: DataDensity; name: string; sub: string }[] = [
  { id: 'simple', name: 'Simple', sub: 'Need-to-know' },
  { id: 'standard', name: 'Standard', sub: 'Balanced' },
  { id: 'full', name: 'Full', sub: 'All the data' },
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
          <div className="ob-bg">
            <div className="ob-orb ob-orb1" />
            <div className="ob-orb ob-orb2" />
          </div>
          <div className="ob-content ob-welcome">
            <div className="ob-mark">
              <div className="ob-mark-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity=".6"/>
                  <path d="M4 11 C4 7 7 4 11 4 C15 4 18 7 18 11" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M7 14 L11 8 L15 14" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="ob-mark-text">weather.gov</div>
                <div className="ob-mark-sub">NATIONAL WEATHER SERVICE</div>
              </div>
            </div>
            <div className="ob-hero-section">
              <h1 className="ob-headline">The forecast,<br /><em>straight from</em><br />the source.</h1>
              <p className="ob-subtext">Official NWS forecasts, alerts, and data — designed for how you actually live. No ads. No data selling. Free, always.</p>
            </div>
            <div className="ob-actions">
              <button className="ob-btn-primary" onClick={() => goTo(2)}>Get Started →</button>
              <p className="ob-legal">No account needed · Free forever</p>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Location */}
      {screen === 2 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={1} />
          <div className="ob-perm-content">
            <div className="ob-perm-icon">📍</div>
            <h2 className="ob-perm-title">Know your exact forecast</h2>
            <p className="ob-perm-body">NWS forecasts are issued on a 2.5km grid. We use your location to find the precise forecast for exactly where you are.</p>
            <div className="ob-detail-box">
              <DetailRow text="Your location is only used to fetch your forecast. Never stored or shared." />
              <DetailRow text="Data comes directly from api.weather.gov — the same source every weather app uses." />
              <DetailRow text="You can always enter a location manually instead." />
            </div>
          </div>
          <div className="ob-actions">
            <button className="ob-btn-primary" onClick={() => { update({ locationGranted: true }); goTo(3); }}>Allow Location</button>
            <button className="ob-btn-ghost" onClick={() => goTo(3)}>Enter location manually</button>
          </div>
        </div>
      )}

      {/* Screen 3: Notifications */}
      {screen === 3 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={2} />
          <div className="ob-perm-content">
            <div className="ob-perm-icon ob-perm-icon-purple">🔔</div>
            <h2 className="ob-perm-title">Stay ahead of it</h2>
            <p className="ob-perm-body" style={{ marginBottom: 18 }}>Get alerted for rain near you, severe warnings, and the conditions you care about.</p>
            <div className="ob-notif-stack">
              <NotifPreview icon="🌧️" app="NWS WEATHER" title="Rain starting in 8 minutes" body="Light showers moving in from the northeast." time="now" />
              <NotifPreview icon="⚠️" app="NWS WEATHER · OFFICIAL" title="Flash Flood Watch issued" body="For Oahu windward. Heavy rain possible Thursday." time="2m" />
              <NotifPreview icon="☀️" app="NWS WEATHER" title="Good morning · UV peaks at 11 AM" body="Best outdoor window: 7–10 AM." time="8h" style={{ opacity: 0.55 }} />
            </div>
          </div>
          <div className="ob-actions">
            <button className="ob-btn-primary" onClick={() => { update({ notificationsGranted: true }); goTo(4); }}>Enable Notifications</button>
            <button className="ob-btn-ghost" onClick={() => goTo(4)}>Maybe later</button>
          </div>
        </div>
      )}

      {/* Screen 4: Interests */}
      {screen === 4 && (
        <div className={`ob-screen${exiting ? ' ob-exit' : ' ob-enter'}`}>
          <ProgressDots current={3} />
          <div className="ob-interests-content">
            <h2 className="ob-int-title">What matters most to you?</h2>
            <p className="ob-int-sub">We'll put the most relevant info first. Select all that apply.</p>
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
            <div className="ob-density">
              <div className="ob-density-label">DATA DENSITY</div>
              <div className="ob-density-track">
                {DENSITIES.map(d => (
                  <button
                    key={d.id}
                    className={`ob-density-opt${prefs.density === d.id ? ' on' : ''}`}
                    onClick={() => setDensity(d.id)}
                  >
                    <div className="ob-density-name">{d.name}</div>
                    <div className="ob-density-sub">{d.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="ob-actions">
            <p className="ob-sel-count">
              {prefs.interests.length === 0 ? 'Select at least one interest' : `${prefs.interests.length} interest${prefs.interests.length > 1 ? 's' : ''} selected`}
            </p>
            <button
              className={`ob-btn-primary${prefs.interests.length === 0 ? ' disabled' : ''}`}
              disabled={prefs.interests.length === 0}
              onClick={handleFinish}
            >
              Build My Forecast →
            </button>
          </div>
        </div>
      )}

      {/* Screen 5: Loading */}
      {screen === 5 && (
        <div className={`ob-screen ob-enter`}>
          <div className="ob-loading">
            <div className="ob-load-icon">🌤️</div>
            <h2 className="ob-load-title">Setting up your forecast</h2>
            <p className="ob-load-sub">Connecting to the National Weather Service for your exact location.</p>
            <div className="ob-load-bar"><div className="ob-load-fill" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="ob-progress">
      {[0, 1, 2, 3].map(i => (
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

function NotifPreview({ icon, app, title, body, time, style }: {
  icon: string; app: string; title: string; body: string; time: string; style?: React.CSSProperties;
}) {
  return (
    <div className="ob-notif" style={style}>
      <div className="ob-notif-ico">{icon}</div>
      <div style={{ flex: 1 }}>
        <div className="ob-notif-app">{app}</div>
        <div className="ob-notif-title">{title}</div>
        <div className="ob-notif-body">{body}</div>
      </div>
      <div className="ob-notif-time">{time}</div>
    </div>
  );
}
