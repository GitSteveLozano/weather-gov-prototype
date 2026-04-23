// Onboarding, location search, settings, specialty products

const E = SB_TOKENS;

// ─────────────────────────────────────────────────────────────
// Onboarding — 3-step flow, final card visible
// ─────────────────────────────────────────────────────────────
function OnboardingWelcome() {
  return (
    <div className="sb" style={{
      width: '100%', height: '100%', background: E.paper, fontFamily: E.font, color: E.ink,
      display: 'flex', flexDirection: 'column', padding: 0,
    }}>
      <div style={{ height: 54 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <SBLogo size={44} />
        <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1, lineHeight: 1.05, marginTop: 36, textWrap: 'balance' }}>
          Weather you can trust, made simple.
        </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.45, color: E.inkSoft, marginTop: 14, textWrap: 'pretty' }}>
          A modern take on public forecasts. Same science, less noise. Go as deep as you want.
        </div>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FeatureLine icon="clear-day" text="Honest, plain-language summaries" />
          <FeatureLine icon="rain" text="Life-safety alerts that cut through" />
          <FeatureLine icon="thunder" text="Radar, soundings, models when you want them" />
        </div>
      </div>
      <div style={{ padding: '16px 20px 28px' }}>
        <button style={{
          width: '100%', padding: '16px', borderRadius: 12, background: E.ink,
          color: E.paper, border: 'none', fontFamily: E.font, fontSize: 16, fontWeight: 600,
        }}>Get started</button>
        <div style={{ textAlign: 'center', fontSize: 12, color: E.inkMute, marginTop: 14, fontFamily: E.mono, letterSpacing: 0.5 }}>
          Free · No account required
        </div>
      </div>
    </div>
  );
}

function FeatureLine({ icon, text }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: E.paperSoft, border: `1px solid ${E.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WxIcon kind={icon} size={18} color={E.inkSoft} stroke={1.5} />
      </div>
      <div style={{ fontSize: 14, color: E.inkSoft }}>{text}</div>
    </div>
  );
}

function OnboardingPermission() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: E.paper, fontFamily: E.font, color: E.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, color: E.inkMute }}>‹ Back</div>
        <div style={{ fontSize: 11, fontFamily: E.mono, color: E.inkMute, letterSpacing: 1 }}>2 / 4</div>
        <div style={{ fontSize: 14, color: E.blue }}>Skip</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', gap: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: E.paperSoft, border: `1px solid ${E.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" stroke={E.ink} strokeWidth="1.6"/><circle cx="12" cy="9" r="2.5" stroke={E.ink} strokeWidth="1.6"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15, textWrap: 'balance' }}>
            Allow location access for alerts that matter to you.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: E.inkSoft, marginTop: 14 }}>
            We use your location only to send severe weather warnings and precise forecasts. It stays on your device.
          </div>
        </div>
        <div style={{ background: E.paperSoft, borderRadius: 10, padding: '12px 14px', border: `1px solid ${E.line}` }}>
          <div style={{ fontSize: 11, fontFamily: E.mono, color: E.inkMute, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Your privacy</div>
          <div style={{ fontSize: 13, color: E.inkSoft, marginTop: 4, lineHeight: 1.4 }}>
            No account. No ads. No third-party trackers. No selling. Ever.
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ width: '100%', padding: '15px', borderRadius: 12, background: E.ink, color: E.paper, border: 'none', fontSize: 15, fontWeight: 600 }}>Allow precise location</button>
        <button style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'transparent', color: E.inkSoft, border: `1px solid ${E.lineStrong}`, fontSize: 14, fontWeight: 500 }}>Enter manually</button>
      </div>
    </div>
  );
}

function OnboardingDepth() {
  const [pick, setPick] = React.useState('scan');
  const opts = [
    { id: 'glance', label: 'Glance', desc: 'Just tell me what to wear and bring.', sub: 'Simple. No jargon.' },
    { id: 'scan', label: 'Scan', desc: 'Balance: hourly, 7-day, conditions.', sub: 'Most popular.' },
    { id: 'dive', label: 'Dive', desc: 'Radar, models, soundings, METARs.', sub: 'For weather enthusiasts.' },
  ];
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: E.paper, fontFamily: E.font, color: E.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, color: E.inkMute }}>‹ Back</div>
        <div style={{ fontSize: 11, fontFamily: E.mono, color: E.inkMute, letterSpacing: 1 }}>3 / 4</div>
        <div style={{ width: 32 }} />
      </div>
      <div style={{ padding: '12px 28px 0' }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15, textWrap: 'balance' }}>
          How much weather do you want?
        </div>
        <div style={{ fontSize: 14, color: E.inkSoft, marginTop: 8 }}>
          You can always change this, and switch depths per screen.
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(o => {
          const active = pick === o.id;
          return (
            <div key={o.id} onClick={() => setPick(o.id)} style={{
              border: `1.5px solid ${active ? E.ink : E.line}`, borderRadius: 12,
              padding: '14px 16px', background: active ? '#fff' : E.paperSoft,
              cursor: 'pointer', transition: 'all .15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 18,
                  border: `1.5px solid ${active ? E.ink : E.lineStrong}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && <div style={{ width: 10, height: 10, borderRadius: 10, background: E.ink }} />}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{o.label}</div>
                <div style={{ flex: 1 }} />
                {o.sub === 'Most popular.' && <div style={{ fontSize: 10, color: E.blue, fontFamily: E.mono, letterSpacing: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>{o.sub}</div>}
              </div>
              <div style={{ fontSize: 13, color: E.inkSoft, marginTop: 6, marginLeft: 28 }}>{o.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '20px 20px 28px' }}>
        <button style={{ width: '100%', padding: '15px', borderRadius: 12, background: E.ink, color: E.paper, border: 'none', fontSize: 15, fontWeight: 600 }}>Continue</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Location search (with keyboard)
// ─────────────────────────────────────────────────────────────
function LocationSearch() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: E.paper, fontFamily: E.font, color: E.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 16px 14px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ flex: 1, background: E.paperSoft, borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${E.lineStrong}` }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={E.inkMute} strokeWidth="1.4"/><path d="M9.5 9.5L13 13" stroke={E.inkMute} strokeWidth="1.4" strokeLinecap="round"/></svg>
          <div style={{ fontSize: 14, color: E.ink }}>silver spring</div>
          <div style={{ width: 1, height: 16, background: E.ink, animation: 'sb-pulse 1s infinite' }} />
        </div>
        <div style={{ fontSize: 14, color: E.blue, fontWeight: 500 }}>Cancel</div>
      </div>

      <div style={{ padding: '10px 16px 6px', fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
        Results
      </div>
      <div style={{ padding: '0 16px', flex: 1 }}>
        {[
          ['Silver Spring', 'MD · United States', 'You are here', true],
          ['Silver Spring', 'NY · Adirondacks region', '452 mi'],
          ['Silver Spring Township', 'PA · Cumberland Co', '112 mi'],
          ['Silver Springs', 'FL · Marion Co', '830 mi'],
        ].map(([name, sub, meta, here], i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: i < 3 ? `1px solid ${E.line}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>
                <span style={{ background: '#fde68a', padding: '0 2px', borderRadius: 2 }}>Silver Spring</span>
                {name !== 'Silver Spring' && name.replace('Silver Spring', '')}
              </div>
              <div style={{ fontSize: 12, color: E.inkMute, marginTop: 2 }}>{sub}</div>
            </div>
            {here ? (
              <div style={{ fontSize: 10, color: E.blue, fontFamily: E.mono, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, padding: '3px 7px', background: E.blueSoft, borderRadius: 3 }}>● Here</div>
            ) : (
              <div style={{ fontSize: 11, color: E.inkMute, fontFamily: E.mono }}>{meta}</div>
            )}
          </div>
        ))}
      </div>

      {/* compressed keyboard sketch */}
      <div style={{ background: '#d1d3d9', padding: '8px 4px 30px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          ['q','w','e','r','t','y','u','i','o','p'],
          ['a','s','d','f','g','h','j','k','l'],
          ['z','x','c','v','b','n','m'],
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, justifyContent: 'center', padding: i === 1 ? '0 18px' : 0 }}>
            {row.map(k => (
              <div key={k} style={{ flex: 1, maxWidth: 36, height: 36, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 1px 0 rgba(0,0,0,0.25)' }}>{k}</div>
            ))}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 4, padding: '0 4px' }}>
          <div style={{ width: 50, height: 36, background: '#acb0b8', borderRadius: 6, fontSize: 11 }} />
          <div style={{ flex: 1, height: 36, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: E.inkSoft }}>space</div>
          <div style={{ width: 70, height: 36, background: E.blue, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>search</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings — full personalization
// ─────────────────────────────────────────────────────────────
function SettingsScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 18px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Personalize</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, marginTop: 4 }}>Make it yours</div>
      </div>

      <SettingsSection title="Depth">
        <SetRow label="Default depth" value="Scan" caret />
        <SetRow label="Per-screen override" sub="Different depths for hourly / radar / alerts" caret />
      </SettingsSection>

      <SettingsSection title="Units">
        <SetSegment label="Temperature" options={['°F', '°C']} pick={0} />
        <SetSegment label="Wind" options={['mph', 'km/h', 'knots', 'm/s']} pick={0} />
        <SetSegment label="Pressure" options={['inHg', 'mb', 'hPa']} pick={0} />
        <SetSegment label="Precipitation" options={['in', 'mm']} pick={0} />
        <SetSegment label="Distance" options={['mi', 'km']} pick={0} />
        <SetSegment label="Time" options={['12h', '24h']} pick={0} />
      </SettingsSection>

      <SettingsSection title="Alerts">
        <SetToggle label="Life-safety takeover" sub="Tornado, flash flood emergencies only" on />
        <SetToggle label="Severe thunderstorm" on />
        <SetToggle label="Winter weather" on />
        <SetToggle label="Flood watch/warning" on />
        <SetToggle label="Heat / cold advisories" />
        <SetToggle label="Marine warnings" />
        <SetToggle label="Quiet hours" sub="10pm – 6am, except life-safety" on />
      </SettingsSection>

      <SettingsSection title="Accessibility">
        <SetRow label="Text size" value="Default" caret />
        <SetToggle label="High contrast" />
        <SetToggle label="Read aloud summaries" />
        <SetToggle label="Reduce motion" />
        <SetRow label="Color-blind palette" value="Off" caret />
      </SettingsSection>

      <SettingsSection title="Specialty products">
        <SetToggle label="Marine" sub="Tides, waves, winds" />
        <SetToggle label="Aviation" sub="TAFs, METARs, PIREPs" />
        <SetToggle label="Fire weather" />
        <SetToggle label="Hydro / river" />
      </SettingsSection>

      <div style={{ padding: '12px 22px 30px', fontSize: 11, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.3, textAlign: 'center' }}>
        Skybureau v1.0 · Source data cached locally
      </div>
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div style={{ padding: '20px 0 0' }}>
      <div style={{ padding: '0 22px 8px', fontSize: 10.5, letterSpacing: 1.5, textTransform: 'uppercase', color: E.inkMute, fontFamily: E.mono, fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ background: '#fff', borderTop: `1px solid ${E.line}`, borderBottom: `1px solid ${E.line}` }}>
        {children}
      </div>
    </div>
  );
}

function SetRow({ label, sub, value, caret }) {
  return (
    <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${E.line}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: E.inkMute, marginTop: 1 }}>{sub}</div>}
      </div>
      {value && <div style={{ fontSize: 13, color: E.inkMute, fontFamily: E.mono }}>{value}</div>}
      {caret && <div style={{ fontSize: 14, color: E.inkMute }}>›</div>}
    </div>
  );
}

function SetToggle({ label, sub, on }) {
  return (
    <div style={{ padding: '11px 22px', display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${E.line}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: E.inkMute, marginTop: 1 }}>{sub}</div>}
      </div>
      <div style={{
        width: 40, height: 22, borderRadius: 22, background: on ? E.ink : '#d8d2c6',
        padding: 2, transition: 'background .15s',
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 18, background: '#fff',
          transform: `translateX(${on ? 18 : 0}px)`, transition: 'transform .15s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </div>
    </div>
  );
}

function SetSegment({ label, options, pick }) {
  return (
    <div style={{ padding: '10px 22px 12px', borderTop: `1px solid ${E.line}` }}>
      <div style={{ fontSize: 14, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', background: E.paperSoft, borderRadius: 8, padding: 2, border: `1px solid ${E.line}` }}>
        {options.map((o, i) => (
          <div key={i} style={{
            flex: 1, padding: '5px 0', textAlign: 'center', fontSize: 12,
            fontFamily: E.mono, fontWeight: 500,
            background: i === pick ? '#fff' : 'transparent',
            color: i === pick ? E.ink : E.inkMute,
            borderRadius: 6,
            boxShadow: i === pick ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
          }}>{o}</div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Specialty — Marine / Aviation / Fire
// ─────────────────────────────────────────────────────────────
function MarineScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 16px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Marine · Chesapeake Bay</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Annapolis Approach</div>
      </div>

      <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <BigStat label="Wave height" val="2.4 ft" sub="SE 4s" />
        <BigStat label="Water temp" val="58° F" sub="+1° / 24h" />
        <BigStat label="Wind" val="12 kt" sub="WSW, G18" />
        <BigStat label="Visibility" val="6 mi" sub="Haze" />
      </div>

      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Tide · Next 24h
        </div>
        <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 6, padding: 14 }}>
          <svg width="100%" height="80" viewBox="0 0 300 80">
            <path d="M0 40 Q37 10 75 40 T150 40 T225 40 T300 40" stroke={E.blue} strokeWidth="1.8" fill="none" />
            <path d="M0 40 Q37 10 75 40 T150 40 T225 40 T300 40 L300 80 L0 80 Z" fill={E.blueSoft} />
            <line x1="90" y1="0" x2="90" y2="80" stroke={E.ink} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="90" cy="28" r="3" fill={E.ink} />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontFamily: E.mono, color: E.inkMute, marginTop: 6 }}>
            <span>Low 6:12a</span><span>High 12:45p</span><span>Low 6:58p</span><span>High 1:22a</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 22px 8px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Small craft advisory</div>
      </div>
      <SBAlertBanner level="advisory" title="Small Craft Advisory" until="in effect until Thu 4 AM" />
    </div>
  );
}

function BigStat({ label, val, sub }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, marginTop: 4, fontFamily: E.mono }}>{val}</div>
      <div style={{ fontSize: 11, color: E.inkMute, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function AviationScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 16px 16px', borderBottom: `1px solid ${E.line}`, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, fontFamily: E.mono }}>KDCA</div>
        <div style={{ fontSize: 13, color: E.inkMute, fontFamily: E.mono }}>Reagan National</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 10, color: '#fff', background: '#2b8a3e', padding: '2px 7px', borderRadius: 3, fontFamily: E.mono, fontWeight: 700, letterSpacing: 0.5 }}>VFR</div>
      </div>

      <div style={{ padding: '14px 16px', fontFamily: E.mono, fontSize: 11.5, lineHeight: 1.7, color: E.inkSoft, background: '#fff', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 10, color: E.inkMute, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>METAR</div>
        KDCA 231747Z 24008KT 10SM FEW045 SCT250 19/09 A3012
        <div style={{ fontSize: 10, color: E.inkMute, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginTop: 10, marginBottom: 4 }}>TAF</div>
        KDCA 231720Z 2318/2424 23008KT P6SM FEW050<br/>
        &nbsp;&nbsp;FM240200 15006KT P6SM OVC040<br/>
        &nbsp;&nbsp;FM240900 18012G20KT 4SM -RA OVC015
      </div>

      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Forecast conditions · 24h</div>
        <div style={{ display: 'flex', gap: 2, height: 28, borderRadius: 4, overflow: 'hidden' }}>
          {['vfr','vfr','vfr','vfr','vfr','mvfr','mvfr','ifr','ifr','mvfr','vfr','vfr'].map((c, i) => {
            const cc = { vfr: '#2b8a3e', mvfr: '#1864ab', ifr: '#c92a2a', lifr: '#862e9c' }[c];
            return <div key={i} style={{ flex: 1, background: cc }} />;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: E.inkMute, fontFamily: E.mono, marginTop: 4, letterSpacing: 0.3 }}>
          <span>18Z</span><span>00Z</span><span>06Z</span><span>12Z</span><span>18Z</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10, fontSize: 10.5, fontFamily: E.mono, color: E.inkMute }}>
          <LegendDot c="#2b8a3e" l="VFR" />
          <LegendDot c="#1864ab" l="MVFR" />
          <LegendDot c="#c92a2a" l="IFR" />
          <LegendDot c="#862e9c" l="LIFR" />
        </div>
      </div>

      <div style={{ padding: '8px 16px 20px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Winds aloft · FD</div>
        <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 4, fontFamily: E.mono, fontSize: 11.5 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr', padding: '6px 12px', color: E.inkMute, fontSize: 9.5, letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: `1px solid ${E.line}` }}>
            <span>FL</span><span>Wind</span><span>Temp</span><span>Notes</span>
          </div>
          {[['030','24015','+15'],['060','25025','+09'],['090','26035','+02'],['120','27048','-10'],['180','28065','-23'],['240','29082','-38']].map(([fl,w,t],i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr', padding: '6px 12px', borderTop: i ? `1px solid ${E.line}` : 'none' }}>
              <span style={{ fontWeight: 600 }}>{fl}</span><span>{w}</span><span>{t}</span><span style={{ color: E.inkMute }}>—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendDot({ c, l }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
      <span>{l}</span>
    </div>
  );
}

function FireScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 16px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Fire weather · Montgomery Co</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Elevated risk</div>
      </div>

      <div style={{ padding: '16px 22px' }}>
        <div style={{ position: 'relative', height: 44, borderRadius: 4, background: 'linear-gradient(90deg, #2b8a3e, #d4a017, #e8701e, #d63a2f, #a81e5b)' }}>
          <div style={{ position: 'absolute', top: -6, bottom: -6, width: 3, borderRadius: 2, background: E.ink, left: '42%' }} />
          <div style={{ position: 'absolute', top: -24, left: '42%', transform: 'translateX(-50%)', fontFamily: E.mono, fontSize: 10.5, fontWeight: 700 }}>ELEVATED</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: E.inkMute, fontFamily: E.mono, marginTop: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          <span>Low</span><span>Moderate</span><span>Elevated</span><span>Critical</span><span>Extreme</span>
        </div>
      </div>

      <div style={{ padding: '0 22px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <BigStat label="RH" val="28%" sub="min today" />
        <BigStat label="Wind" val="14 mph" sub="G 24, WSW" />
        <BigStat label="ERC" val="62" sub="Energy release" />
        <BigStat label="Haines" val="5" sub="Moderate" />
      </div>

      <div style={{ padding: '0 22px 12px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Red flag criteria</div>
        <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 8 }}>
          <FlagRow label="RH ≤ 25%" met={false} detail="Min 28%" />
          <FlagRow label="Sustained wind ≥ 15 mph" met={false} detail="14 mph peak" />
          <FlagRow label="Dry fuels (10h FM ≤ 8%)" met={true} detail="7.2%" />
          <FlagRow label="No recent precipitation" met={true} detail="9 days" last />
        </div>
      </div>

      <SBAlertBanner level="watch" title="Fire Weather Watch" until="Thu 12 PM – 8 PM" />
    </div>
  );
}

function FlagRow({ label, met, detail, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: last ? 'none' : `1px solid ${E.line}` }}>
      <div style={{
        width: 18, height: 18, borderRadius: 18, border: `1.5px solid ${met ? E.warning : E.lineStrong}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: met ? E.warning : 'transparent',
        color: '#fff', fontSize: 11, fontWeight: 700,
      }}>{met && '✓'}</div>
      <div style={{ flex: 1, fontSize: 13.5 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: E.inkMute, fontFamily: E.mono }}>{detail}</div>
    </div>
  );
}

Object.assign(window, { OnboardingWelcome, OnboardingPermission, OnboardingDepth, LocationSearch, SettingsScreen, MarineScreen, AviationScreen, FireScreen });
