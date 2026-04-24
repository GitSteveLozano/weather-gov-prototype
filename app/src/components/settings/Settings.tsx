import { useState } from 'react';
import { SBWordmark } from '../shared/SBLogo';
import type { ThemeMode, HomeSkin, DepthLevel } from '../../App';
import type { RadarStyle } from '../radar/RadarTab';
import './Settings.css';

interface Props {
  onClose: () => void;
  theme: ThemeMode; onThemeChange: (t: ThemeMode) => void;
  skin: HomeSkin; onSkinChange: (s: HomeSkin) => void;
  depth: DepthLevel; onDepthChange: (d: DepthLevel) => void;
  radarStyle: RadarStyle; onRadarStyleChange: (s: RadarStyle) => void;
}

type SubScreen = null | 'depth' | 'skin' | 'alerts' | 'radar' | 'units' | 'locations' | 'notifications' | 'datasources' | 'privacy';

export function Settings({ onClose, theme, onThemeChange, skin, onSkinChange, depth, onDepthChange, radarStyle, onRadarStyleChange }: Props) {
  const [sub, setSub] = useState<SubScreen>(null);

  // ── Sub: Depth ──
  if (sub === 'depth') return (
    <div className="st"><SubNav title="Default depth" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Controls how much data the home screen shows by default.</div>
        <RadioGroup value={depth} onChange={(v) => onDepthChange(v as DepthLevel)} options={[
          { id: 'glance', name: 'Glance', desc: 'Big number, one sentence, done. Read in 1 second.' },
          { id: 'scan', name: 'Scan', desc: 'Hourly, 7-day, conditions, radar preview. The default.' },
          { id: 'dive', name: 'Dive', desc: 'Models, pressure trends, AFD, everything. For weather nerds.' },
        ]} />
      </div>
    </div>
  );

  // ── Sub: Skin ──
  if (sub === 'skin') return (
    <div className="st"><SubNav title="Home screen style" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Same data, different visual treatment. Pick the one that feels right.</div>
        <RadioGroup value={skin} onChange={(v) => onSkinChange(v as HomeSkin)} options={[
          { id: 'civic', name: 'Civic Modern', desc: 'Typographic, editorial, big numbers. Newspaper clarity.' },
          { id: 'atmospheric', name: 'Atmospheric', desc: 'Sky gradients behind data. Emotive, beautiful.' },
          { id: 'cartographic', name: 'Cartographic', desc: 'Map is the hero. Radar-first for storm chasers.' },
          { id: 'data', name: 'Data-forward', desc: 'Dense dashboard. Bloomberg for weather.' },
        ]} />
      </div>
    </div>
  );

  // ── Sub: Radar ──
  if (sub === 'radar') return (
    <div className="st"><SubNav title="Radar style" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">All three share the same data, map, and timeline — the only difference is what's drawn on top.</div>
        <RadioGroup value={radarStyle} onChange={(v) => onRadarStyleChange(v as RadarStyle)} options={[
          { id: 'clean', name: 'Clean', desc: 'Minimal chrome. The radar map is the hero. For most people.' },
          { id: 'enthusiast', name: 'Enthusiast', desc: 'Storm cells with motion vectors, echo top, VIL, and TVS markers.' },
          { id: 'narrative', name: 'Narrative', desc: 'Natural-language overlay — "Rain reaches you at 4:42 PM."' },
        ]} />
      </div>
    </div>
  );

  // ── Sub: Alerts ──
  if (sub === 'alerts') return (
    <div className="st"><SubNav title="Alert categories" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Choose which NWS products you receive. Life-safety takeovers cannot be disabled.</div>
        <Section title="Life-safety · always on">
          <ToggleRow label="Tornado Emergency" sub="Full-screen takeover · overrides silent mode" locked on />
          <ToggleRow label="Flash Flood Emergency" sub="Full-screen takeover" locked on />
          <ToggleRow label="AMBER / Civil Emergency" sub="Delivered by system" locked on />
        </Section>
        <Section title="Severe convective">
          <ToggleRow label="Tornado Warning" sub="Confirmed or radar-indicated" on />
          <ToggleRow label="Severe Thunderstorm Warning" on />
          <ToggleRow label="Severe Thunderstorm Watch" on />
        </Section>
        <Section title="Flood">
          <ToggleRow label="Flash Flood Warning" on />
          <ToggleRow label="Flood Warning" on />
          <ToggleRow label="Flood Watch" on />
          <ToggleRow label="Coastal Flood Advisory" />
        </Section>
        <Section title="Winter">
          <ToggleRow label="Blizzard / Ice Storm Warning" on />
          <ToggleRow label="Winter Storm Warning" on />
          <ToggleRow label="Winter Weather Advisory" />
        </Section>
        <Section title="Heat & other">
          <ToggleRow label="Excessive Heat Warning" on />
          <ToggleRow label="Heat Advisory" />
          <ToggleRow label="Air Quality Alert" sub="Via AirNow" />
          <ToggleRow label="Red Flag Warning" sub="Fire weather" />
          <ToggleRow label="High Wind Warning" />
        </Section>
        <div className="st-footer sb-mono">◇ All alerts sourced from NWS CAP feed</div>
      </div>
    </div>
  );

  // ── Sub: Units ──
  if (sub === 'units') return (
    <div className="st"><SubNav title="Units" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <Section title="Temperature">
          <SegmentRow options={['°F', '°C']} selected={0} />
        </Section>
        <Section title="Wind speed">
          <SegmentRow options={['mph', 'km/h', 'knots', 'm/s']} selected={0} />
        </Section>
        <Section title="Pressure">
          <SegmentRow options={['inHg', 'mb', 'hPa']} selected={0} />
        </Section>
        <Section title="Precipitation">
          <SegmentRow options={['in', 'mm']} selected={0} />
        </Section>
        <Section title="Distance">
          <SegmentRow options={['mi', 'km']} selected={0} />
        </Section>
        <Section title="Time format">
          <SegmentRow options={['12h', '24h']} selected={0} />
        </Section>
        <div style={{ height: 30 }} />
      </div>
    </div>
  );

  // ── Sub: Locations ──
  if (sub === 'locations') return (
    <div className="st"><SubNav title="Saved locations" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Your home location and saved places. Tap to switch; long-press to reorder.</div>
        <LocationRow name="Honolulu, HI" sub="Home · 21.31°N 157.86°W" active />
        <LocationRow name="Silver Spring, MD" sub="38.99°N 77.03°W" />
        <LocationRow name="Kailua, HI" sub="21.40°N 157.74°W" />
        <div className="st-row st-row-tap" style={{ color: 'var(--blue)', fontWeight: 500 }}>
          <div className="st-row-content"><div className="st-row-label" style={{ color: 'var(--blue)' }}>+ Add location</div></div>
          <span className="st-caret" style={{ color: 'var(--blue)' }}>›</span>
        </div>
        <div className="st-footer sb-mono">Up to 8 saved locations</div>
      </div>
    </div>
  );

  // ── Sub: Notifications ──
  if (sub === 'notifications') return (
    <div className="st"><SubNav title="Notification timing" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <Section title="Daily brief">
          <ToggleRow label="Morning brief" sub="Personalized summary of your day" on />
          <TimePickRow label="Delivery time" value="6:45 AM" />
          <TapRow label="Weekdays only" value="Every day" />
          <TimePickRow label="Evening recap" value="8:30 PM" />
        </Section>
        <Section title="Quiet hours">
          <ToggleRow label="Silence non-critical alerts" sub="Life-safety always breaks through" on />
          <TimePickRow label="Start" value="10:00 PM" />
          <TimePickRow label="End" value="6:00 AM" />
        </Section>
        <Section title="Precipitation nowcast">
          <ToggleRow label="Rain starting" sub="Alert before rain arrives" on />
          <ToggleRow label="Rain ending" />
          <ToggleRow label="First flakes" on />
          <SegmentRow options={['15 min', '30 min', '60 min', '2 hr']} selected={2} label="Lead time" />
        </Section>
        <Section title="Routine windows">
          <RoutineRow label="Morning commute" time="7:30 – 8:30 AM" days="Mon–Fri" />
          <RoutineRow label="Evening commute" time="5:00 – 6:30 PM" days="Mon–Fri" />
          <RoutineRow label="Dog walk" time="7:00 – 7:45 PM" days="Daily" />
          <div className="st-row st-row-tap" style={{ color: 'var(--blue)', fontWeight: 500 }}>
            <div className="st-row-content"><div className="st-row-label" style={{ color: 'var(--blue)' }}>+ Add routine</div></div>
            <span className="st-caret" style={{ color: 'var(--blue)' }}>›</span>
          </div>
        </Section>
        <Section title="Delivery method">
          <ToggleRow label="Push notification" on />
          <ToggleRow label="Home-screen widget refresh" on />
          <ToggleRow label="Apple Watch haptic" on />
          <ToggleRow label="Email digest (weekly)" />
        </Section>
        <div style={{ height: 30 }} />
      </div>
    </div>
  );

  // ── Sub: Data sources ──
  if (sub === 'datasources') return (
    <div className="st"><SubNav title="Data sources" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Every data source used by Skybureau. All are public-service feeds; no commercial APIs required.</div>
        <DataSourceRow name="NWS Gridpoint Forecast" refresh="1 hr" usage="Home · Hourly · 10-day" />
        <DataSourceRow name="NWS CAP Alerts" refresh="2 min" usage="All alert surfaces" />
        <DataSourceRow name="MRMS Radar Tiles" refresh="2 min" usage="Radar preview + full" />
        <DataSourceRow name="HRRR (NOMADS)" refresh="1 hr" usage="Confidence bands · Minute-cast" />
        <DataSourceRow name="SPC Convective Outlook" refresh="3 hr" usage="Dive when watch active" />
        <DataSourceRow name="Open-Meteo" refresh="1 hr" usage="UV · Wind · AQI · Marine" />
        <DataSourceRow name="USGS Hydro" refresh="15 min" usage="Stream gauges" />
        <DataSourceRow name="SWPC Kp / Aurora" refresh="15 min" usage="Aurora specialty" />
        <DataSourceRow name="NDBC Buoy / CO-OPS Tides" refresh="6 min" usage="Marine specialty" />
        <DataSourceRow name="NOAA Aviation (METAR/TAF)" refresh="1 hr" usage="Aviation specialty" />
        <div className="st-callout">
          <strong>Caching.</strong> Every feed is cached locally for at least 2× its refresh interval. The app opens with cached data instantly and updates in the background.
        </div>
        <div style={{ height: 30 }} />
      </div>
    </div>
  );

  // ── Sub: Privacy ──
  if (sub === 'privacy') return (
    <div className="st"><SubNav title="Location privacy" onBack={() => setSub(null)} />
      <div className="st-scroll">
        <div className="st-hint">Control how your location is used. Skybureau never stores or shares your position.</div>
        <Section title="Precision">
          <RadioGroup value="approximate" onChange={() => {}} options={[
            { id: 'precise', name: 'Precise', desc: 'GPS coordinates sent to NWS API for exact grid point. Best forecast accuracy.' },
            { id: 'approximate', name: 'Approximate', desc: 'Rounded to nearest 0.1° (~7 mi). Slightly less precise forecast.' },
            { id: 'manual', name: 'Manual only', desc: 'No GPS. Enter your city or zip code manually.' },
          ]} />
        </Section>
        <Section title="How it works">
          <div className="st-info-block">
            <InfoRow icon="📍" text="Your coordinates are sent to api.weather.gov to look up your NWS grid point." />
            <InfoRow icon="🔒" text="Coordinates are never stored on any server. NWS does not track individual requests." />
            <InfoRow icon="📱" text="Location is cached on-device only, for faster loading on next open." />
            <InfoRow icon="🗑" text="Use 'Clear all data' to remove all cached location data from this device." />
          </div>
        </Section>
        <div style={{ height: 30 }} />
      </div>
    </div>
  );

  // ── Main index ──
  return (
    <div className="st">
      <div className="st-nav">
        <button className="st-back" onClick={onClose}>‹</button>
        <span className="st-title">Settings</span>
      </div>
      <div className="st-scroll sb-scroll">
        <div className="st-intro">
          <SBWordmark size={14} />
          <p className="st-intro-text">Tune depth, appearance, alerts, and data preferences. Every setting has a clear default.</p>
        </div>

        <Section title="Home screen">
          <TapRow label="Style" value={{ civic: 'Civic Modern', atmospheric: 'Atmospheric', cartographic: 'Cartographic', data: 'Data-forward' }[skin]} onClick={() => setSub('skin')} />
          <TapRow label="Default depth" value={depth.charAt(0).toUpperCase() + depth.slice(1)} onClick={() => setSub('depth')} />
          <TapRow label="Radar style" value={radarStyle.charAt(0).toUpperCase() + radarStyle.slice(1)} onClick={() => setSub('radar')} />
        </Section>

        <Section title="Core">
          <TapRow label="Units" sub="°F · mph · inHg · in · mi · 12h" onClick={() => setSub('units')} />
          <TapRow label="Locations" sub="3 saved · Home set to Honolulu" onClick={() => setSub('locations')} />
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
          <TapRow label="Notification timing" sub="Quiet hours 10 PM – 6 AM" onClick={() => setSub('notifications')} />
        </Section>

        <Section title="Data & privacy">
          <TapRow label="Data sources" sub="NWS · Open-Meteo · USGS · SPC" onClick={() => setSub('datasources')} />
          <TapRow label="Location privacy" value="Approximate" onClick={() => setSub('privacy')} />
          <TapRow label="Clear all data" onClick={() => { localStorage.clear(); window.location.reload(); }} />
        </Section>

        <div className="st-footer sb-mono">
          Skybureau v1.0 · Source data cached locally<br />
          <span style={{ opacity: 0.7 }}>a public-service weather project</span>
        </div>
      </div>
    </div>
  );
}

// ── Shared components ──

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
        <div className="st-row-label">{label}{locked && <span className="st-locked sb-mono">locked</span>}</div>
        {sub && <div className="st-row-sub">{sub}</div>}
      </div>
      <div className={`st-toggle${isOn ? ' on' : ''}${locked ? ' locked' : ''}`} onClick={() => !locked && setIsOn(!isOn)}>
        <div className="st-toggle-thumb" />
      </div>
    </div>
  );
}

function SegmentRow({ options, selected, label }: { options: string[]; selected: number; label?: string }) {
  const [pick, setPick] = useState(selected);
  return (
    <div className="st-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
      {label && <div className="st-row-label">{label}</div>}
      <div className="st-seg" style={{ width: '100%' }}>
        {options.map((o, i) => (
          <button key={o} className={`st-seg-opt${pick === i ? ' on' : ''}`} onClick={() => setPick(i)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function TimePickRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="st-row">
      <div className="st-row-content"><div className="st-row-label">{label}</div></div>
      <div className="st-time-pill sb-mono">{value}</div>
    </div>
  );
}

function RoutineRow({ label, time, days }: { label: string; time: string; days: string }) {
  return (
    <div className="st-row st-row-tap">
      <div className="st-row-content">
        <div className="st-row-label">{label}</div>
        <div className="st-row-sub sb-mono">{time} · {days}</div>
      </div>
      <span className="st-caret">›</span>
    </div>
  );
}

function LocationRow({ name, sub, active }: { name: string; sub: string; active?: boolean }) {
  return (
    <div className="st-row st-row-tap">
      <div className="st-row-content">
        <div className="st-row-label">{name}{active && <span className="st-active-badge sb-mono">Home</span>}</div>
        <div className="st-row-sub sb-mono">{sub}</div>
      </div>
      <span className="st-caret">›</span>
    </div>
  );
}

function DataSourceRow({ name, refresh, usage }: { name: string; refresh: string; usage: string }) {
  return (
    <div className="st-row">
      <div className="st-row-content">
        <div className="st-row-label">{name}</div>
        <div className="st-row-sub">{usage}</div>
      </div>
      <span className="st-row-value sb-mono">{refresh}</span>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="st-info-row">
      <span className="st-info-icon">{icon}</span>
      <span className="st-info-text">{text}</span>
    </div>
  );
}
