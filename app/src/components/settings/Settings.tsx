import { useState } from 'react';
import { SBWordmark } from '../shared/SBLogo';
import type { ThemeMode, HomeSkin, DepthLevel } from '../../App';
import './Settings.css';

interface Props {
  onClose: () => void;
  theme: ThemeMode; onThemeChange: (t: ThemeMode) => void;
  skin: HomeSkin; onSkinChange: (s: HomeSkin) => void;
  depth: DepthLevel; onDepthChange: (d: DepthLevel) => void;
}

type SubScreen = null | 'depth' | 'skin' | 'alerts';

export function Settings({ onClose, theme, onThemeChange, skin, onSkinChange, depth, onDepthChange }: Props) {
  const [sub, setSub] = useState<SubScreen>(null);

  if (sub === 'depth') {
    return (
      <div className="st">
        <SubNav title="Default depth" onBack={() => setSub(null)} />
        <div className="st-scroll">
          <div className="st-hint">Controls how much data the home screen shows. You can always scroll for more.</div>
          <RadioGroup value={depth} onChange={(v) => onDepthChange(v as DepthLevel)} options={[
            { id: 'glance', name: 'Glance', desc: 'Big number, one sentence, done. Read in 1 second.' },
            { id: 'scan', name: 'Scan', desc: 'Hourly, 7-day, conditions, radar preview. The default.' },
            { id: 'dive', name: 'Dive', desc: 'Models, pressure trends, AFD, everything. For weather nerds.' },
          ]} />
        </div>
      </div>
    );
  }

  if (sub === 'skin') {
    return (
      <div className="st">
        <SubNav title="Home screen style" onBack={() => setSub(null)} />
        <div className="st-scroll">
          <div className="st-hint">Same data, different visual treatment. Pick the one that feels right.</div>
          <RadioGroup value={skin} onChange={(v) => onSkinChange(v as HomeSkin)} options={[
            { id: 'civic', name: 'Civic Modern', desc: 'Typographic, editorial, big numbers. Newspaper clarity.' },
            { id: 'atmospheric', name: 'Atmospheric', desc: 'Sky gradients behind data. Emotive, beautiful.' },
          ]} />
        </div>
      </div>
    );
  }

  if (sub === 'alerts') {
    return (
      <div className="st">
        <SubNav title="Alert categories" onBack={() => setSub(null)} />
        <div className="st-scroll">
          <div className="st-hint">Life-safety alerts (Tornado Emergency, Flash Flood Emergency) cannot be disabled.</div>
          <Section title="Life-safety · always on">
            <ToggleRow label="Tornado Emergency" sub="Full-screen takeover" locked on />
            <ToggleRow label="Flash Flood Emergency" sub="Full-screen takeover" locked on />
          </Section>
          <Section title="Severe">
            <ToggleRow label="Tornado Warning" on />
            <ToggleRow label="Severe Thunderstorm Warning" on />
            <ToggleRow label="Flash Flood Warning" on />
          </Section>
          <Section title="Advisory">
            <ToggleRow label="Wind Advisory" on />
            <ToggleRow label="Heat Advisory" />
            <ToggleRow label="Dense Fog Advisory" />
            <ToggleRow label="High Surf Advisory" on />
          </Section>
        </div>
      </div>
    );
  }

  // Main settings index
  return (
    <div className="st">
      <div className="st-nav">
        <button className="st-back" onClick={onClose}>‹</button>
        <span className="st-title">Settings</span>
      </div>
      <div className="st-scroll sb-scroll">
        <div className="st-intro">
          <SBWordmark size={14} />
          <p className="st-intro-text">Tune depth, appearance, alerts, and data preferences.</p>
        </div>

        <Section title="Home screen">
          <TapRow label="Style" value={skin === 'civic' ? 'Civic Modern' : 'Atmospheric'} onClick={() => setSub('skin')} />
          <TapRow label="Default depth" value={depth.charAt(0).toUpperCase() + depth.slice(1)} onClick={() => setSub('depth')} />
        </Section>

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

        <Section title="Alerts & notifications">
          <TapRow label="Alert categories" sub="Life-safety always on" onClick={() => setSub('alerts')} />
          <TapRow label="Notification timing" sub="Quiet hours 10 PM – 6 AM" />
        </Section>

        <Section title="Data & privacy">
          <TapRow label="Data sources" sub="NWS · Open-Meteo · USGS" />
          <TapRow label="Location privacy" value="Approximate" />
          <TapRow label="Clear all data" onClick={() => { localStorage.clear(); window.location.reload(); }} />
        </Section>

        <div className="st-footer sb-mono">Skybureau v1.0 · a public-service weather project</div>
      </div>
    </div>
  );
}

function SubNav({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="st-nav">
      <button className="st-back" onClick={onBack}>‹</button>
      <span className="st-title">{title}</span>
      <span className="st-nav-trail sb-mono">Settings</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="st-section"><div className="st-section-title sb-mono">{title}</div>{children}</div>;
}

function TapRow({ label, sub, value, onClick }: { label: string; sub?: string; value?: string; onClick?: () => void }) {
  return (
    <div className="st-row st-row-tap" onClick={onClick}>
      <div className="st-row-content"><div className="st-row-label">{label}</div>{sub && <div className="st-row-sub">{sub}</div>}</div>
      {value && <span className="st-row-value sb-mono">{value}</span>}
      <span className="st-caret">›</span>
    </div>
  );
}

function RadioGroup({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { id: string; name: string; desc: string }[] }) {
  return (
    <div className="st-radio-group">
      {options.map(o => (
        <button key={o.id} className={`st-radio${value === o.id ? ' sel' : ''}`} onClick={() => onChange(o.id)}>
          <div className={`st-radio-dot${value === o.id ? ' on' : ''}`} />
          <div className="st-radio-info">
            <div className="st-radio-name">{o.name}</div>
            <div className="st-radio-desc">{o.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ label, sub, on, locked }: { label: string; sub?: string; on?: boolean; locked?: boolean }) {
  const [isOn, setIsOn] = useState(on ?? false);
  return (
    <div className="st-row">
      <div className="st-row-content">
        <div className="st-row-label">
          {label}
          {locked && <span className="st-locked sb-mono">locked</span>}
        </div>
        {sub && <div className="st-row-sub">{sub}</div>}
      </div>
      <div className={`st-toggle${isOn ? ' on' : ''}${locked ? ' locked' : ''}`} onClick={() => !locked && setIsOn(!isOn)}>
        <div className="st-toggle-thumb" />
      </div>
    </div>
  );
}
