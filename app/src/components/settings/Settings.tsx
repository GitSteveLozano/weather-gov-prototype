import { SBWordmark } from '../shared/SBLogo';
import './Settings.css';

type ThemeMode = 'light' | 'system' | 'dark';

interface Props {
  onClose: () => void;
  theme: ThemeMode;
  onThemeChange: (t: ThemeMode) => void;
  density: string;
}

export function Settings({ onClose, theme, onThemeChange, density }: Props) {
  const depthLabel = density === 'simple' ? 'Glance' : density === 'full' ? 'Dive' : 'Scan';

  return (
    <div className="set-shell">
      <div className="set-nav">
        <button className="set-back" onClick={onClose}>‹</button>
        <div className="set-nav-title">Settings</div>
        <div className="set-nav-right sb-mono">SKYBUREAU</div>
      </div>

      <div className="set-scroll">
        <div className="set-intro">
          <SBWordmark size={14} />
          <p className="set-intro-text">Tune depth, alerts, display, and accessibility. Every setting has a clear default.</p>
        </div>

        <SetSection title="Core">
          <SetRow label="Depth" sub={`Default: ${depthLabel}`} value={depthLabel} />
          <SetRow label="Units" sub="°F · mph · inHg · in · mi · 12h" />
          <SetRow label="Locations" sub="Honolulu, HI" />
        </SetSection>

        <SetSection title="Alerts & notifications">
          <SetRow label="Alert categories" sub="Life-safety always on" />
          <SetRow label="Notification timing" sub="Quiet hours 10 PM – 6 AM" />
        </SetSection>

        <SetSection title="Appearance">
          <div className="set-row">
            <div className="set-row-content">
              <div className="set-row-label">Theme</div>
            </div>
            <div className="set-segment">
              {(['light', 'system', 'dark'] as ThemeMode[]).map(t => (
                <button
                  key={t}
                  className={`set-seg-opt${theme === t ? ' on' : ''}`}
                  onClick={() => onThemeChange(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <SetRow label="Accessibility" sub="Text size, contrast, motion, color-blind" />
        </SetSection>

        <SetSection title="Data & privacy">
          <SetRow label="Data sources" sub="NWS · Open-Meteo · USGS · SPC" />
          <SetRow label="Location privacy" value="Approximate" />
          <SetRow label="Clear cached data" />
        </SetSection>

        <div className="set-footer sb-mono">
          Skybureau v1.0 · Source data cached locally<br />
          <span style={{ opacity: 0.7 }}>a public-service weather project</span>
        </div>
      </div>
    </div>
  );
}

function SetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="set-section">
      <div className="set-section-title sb-mono">{title}</div>
      {children}
    </div>
  );
}

function SetRow({ label, sub, value }: { label: string; sub?: string; value?: string }) {
  return (
    <div className="set-row">
      <div className="set-row-content">
        <div className="set-row-label">{label}</div>
        {sub && <div className="set-row-sub">{sub}</div>}
      </div>
      {value && <div className="set-row-value sb-mono">{value}</div>}
      <div className="set-row-caret">›</div>
    </div>
  );
}
