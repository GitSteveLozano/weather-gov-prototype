import { useState } from 'react';
import { SBLogo } from '../shared/SBLogo';
import { WxIcon } from '../shared/WxIcon';
import type { DataDensity } from '../../types/weather';
import './Onboarding.css';

interface Props {
  onComplete: (depth: DataDensity) => void;
}

export function Onboarding({ onComplete }: Props) {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [depth, setDepth] = useState<DataDensity>('standard');

  return (
    <div className="ob">
      {screen === 1 && (
        <div className="ob-page" key="w1">
          <div style={{ marginTop: 56 }}>
            <SBLogo size={44} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="ob-h1">Weather you can trust, made simple.</h1>
            <p className="ob-sub">Official forecasts from the National Weather Service — designed for real life. Free, private, no ads.</p>
            <div className="ob-features">
              <Feature icon="clear-day" text="NWS forecasts — the source, not a reseller" />
              <Feature icon="rain" text="Alerts that tell you what to do, not just what's happening" />
              <Feature icon="wind" text="Glance, Scan, or Dive — pick your depth" />
            </div>
          </div>
          <div className="ob-bottom">
            <button className="ob-btn" onClick={() => setScreen(2)}>Get started</button>
            <p className="ob-legal sb-mono">Free · No account required</p>
          </div>
        </div>
      )}

      {screen === 2 && (
        <div className="ob-page" key="w2">
          <div className="ob-nav">
            <button className="ob-back" onClick={() => setScreen(1)}>‹</button>
            <span className="ob-step sb-mono">1 of 2</span>
          </div>
          <div className="ob-center">
            <div className="ob-icon-box">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h2 className="ob-h2">Your forecast, your grid point</h2>
            <p className="ob-body">NWS forecasts are issued on a 2.5km grid. Location lets us find the exact forecast for where you are — not a nearby city.</p>
            <div className="ob-privacy-box">
              <PrivacyRow text="Used only to fetch your forecast. Never stored or shared." />
              <PrivacyRow text="Data comes directly from api.weather.gov." />
              <PrivacyRow text="You can enter a location manually instead." />
            </div>
          </div>
          <div className="ob-bottom">
            <button className="ob-btn" onClick={() => setScreen(3)}>Allow precise location</button>
            <button className="ob-btn-ghost" onClick={() => setScreen(3)}>Enter manually</button>
          </div>
        </div>
      )}

      {screen === 3 && (
        <div className="ob-page" key="w3">
          <div className="ob-nav">
            <button className="ob-back" onClick={() => setScreen(2)}>‹</button>
            <span className="ob-step sb-mono">2 of 2</span>
          </div>
          <div className="ob-center">
            <h2 className="ob-h2">How much weather do you want?</h2>
            <p className="ob-body" style={{ marginBottom: 24 }}>You can always change this later in settings.</p>
            <div className="ob-depth-list">
              <DepthOption id="simple" name="Glance" desc="Big number, one sentence, done." selected={depth === 'simple'} onClick={() => setDepth('simple')} />
              <DepthOption id="standard" name="Scan" desc="Hourly, 7-day, radar preview, conditions." selected={depth === 'standard'} onClick={() => setDepth('standard')} badge="Most popular" />
              <DepthOption id="full" name="Dive" desc="Models, pressure trends, AFD, everything." selected={depth === 'full'} onClick={() => setDepth('full')} />
            </div>
          </div>
          <div className="ob-bottom">
            <button className="ob-btn" onClick={() => onComplete(depth)}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="ob-feat">
      <div className="ob-feat-badge"><WxIcon kind={icon as any} size={18} stroke={1.4} /></div>
      <span className="ob-feat-text">{text}</span>
    </div>
  );
}

function PrivacyRow({ text }: { text: string }) {
  return (
    <div className="ob-priv-row">
      <div className="ob-priv-dot" />
      <span>{text}</span>
    </div>
  );
}

function DepthOption({ name, desc, selected, onClick, badge }: {
  id: string; name: string; desc: string; selected: boolean; onClick: () => void; badge?: string;
}) {
  return (
    <button className={`ob-depth${selected ? ' sel' : ''}`} onClick={onClick}>
      <div className={`ob-depth-radio${selected ? ' on' : ''}`} />
      <div className="ob-depth-info">
        <div className="ob-depth-name">{name}{badge && <span className="ob-depth-badge sb-mono">{badge}</span>}</div>
        <div className="ob-depth-desc">{desc}</div>
      </div>
    </button>
  );
}
