import { SBWordmark } from '../shared/SBLogo';
import './Settings.css';

type ThemeMode = 'light' | 'system' | 'dark';

interface Props {
  onClose: () => void;
  theme: ThemeMode;
  onThemeChange: (t: ThemeMode) => void;
}

export function Settings({ onClose, theme, onThemeChange }: Props) {
  return (
    <div className="st">
      <div className="st-nav">
        <button className="st-back" onClick={onClose}>‹</button>
        <span className="st-title">Settings</span>
      </div>
      <div className="st-scroll sb-scroll">
        <div className="st-intro">
          <SBWordmark size={14} />
          <p className="st-intro-text">Personalize your forecast experience.</p>
        </div>

        <Section title="Appearance">
          <div className="st-row">
            <div className="st-row-content"><div className="st-row-label">Theme</div></div>
            <div className="st-seg">
              {(['light', 'system', 'dark'] as ThemeMode[]).map(t => (
                <button key={t} className={`st-seg-opt${theme === t ? ' on' : ''}`} onClick={() => onThemeChange(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Core">
          <Row label="Depth" sub="Glance · Scan · Dive" />
          <Row label="Units" sub="°F · mph · inHg · in · mi" />
          <Row label="Locations" sub="Honolulu, HI" />
        </Section>

        <Section title="Alerts & notifications">
          <Row label="Alert categories" sub="Life-safety always on" />
          <Row label="Notification timing" sub="Quiet hours 10 PM – 6 AM" />
        </Section>

        <Section title="Data & privacy">
          <Row label="Data sources" sub="NWS · Open-Meteo · USGS" />
          <Row label="Location privacy" value="Approximate" />
        </Section>

        <div className="st-footer sb-mono">Skybureau v1.0 · a public-service weather project</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="st-section"><div className="st-section-title sb-mono">{title}</div>{children}</div>;
}

function Row({ label, sub, value }: { label: string; sub?: string; value?: string }) {
  return (
    <div className="st-row">
      <div className="st-row-content"><div className="st-row-label">{label}</div>{sub && <div className="st-row-sub">{sub}</div>}</div>
      {value && <span className="st-row-value sb-mono">{value}</span>}
      <span className="st-caret">›</span>
    </div>
  );
}
