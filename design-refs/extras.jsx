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
        <div style={{ fontSize: 13, color: E.inkSoft, marginTop: 6, lineHeight: 1.5 }}>Tune depth, alerts, copy, and accessibility. Every setting has a clear default.</div>
      </div>

      <SettingsSection title="Core">
        <SetRow label="Depth" sub="Default: Scan · 3 others available" value="Scan" caret />
        <SetRow label="Units" sub="°F · mph · inHg · in · mi · 12h" caret />
        <SetRow label="Locations" sub="4 saved · Home set to Annapolis" caret />
      </SettingsSection>

      <SettingsSection title="Alerts & notifications">
        <SetRow label="Alert categories" sub="7 of 12 enabled · Life-safety always on" caret />
        <SetRow label="Notification timing" sub="Quiet hours 10 PM – 6 AM" caret />
        <SetRow label="Lock-screen live activity" value="On" caret />
      </SettingsSection>

      <SettingsSection title="Skybureau Brief">
        <SetRow label="Brief personalization" sub="Commute, wardrobe, routines" caret />
        <SetRow label="Ask Skybureau history" sub="Stored on-device · 47 questions" caret />
      </SettingsSection>

      <SettingsSection title="Accessibility">
        <SetRow label="Accessibility" sub="Text size, contrast, motion, color-blind" caret />
        <SetRow label="Read-aloud voice" value="Default" caret />
      </SettingsSection>

      <SettingsSection title="Specialty products">
        <SetToggle label="Marine" sub="Tides, waves, winds" />
        <SetToggle label="Aviation" sub="TAFs, METARs, PIREPs" />
        <SetToggle label="Fire weather" />
        <SetToggle label="Hydro / river" />
      </SettingsSection>

      <SettingsSection title="Data & privacy">
        <SetRow label="Data sources" sub="NWS · ECMWF · HRRR · USGS · SPC" caret />
        <SetRow label="Location privacy" value="Approximate" caret />
        <SetRow label="Export my data" caret />
      </SettingsSection>

      <div style={{ padding: '18px 22px 30px', fontSize: 11, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.3, textAlign: 'center' }}>
        Skybureau v1.0 · Source data cached locally<br/>
        <span style={{ opacity: 0.7 }}>a public-service weather project</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings detail — Alerts
// ─────────────────────────────────────────────────────────────
function SettingsAlerts() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <SubNav title="Alert categories" />
      <div style={{ padding: '10px 22px 16px', fontSize: 12.5, color: E.inkSoft, lineHeight: 1.5, background: E.paperSoft, borderBottom: `1px solid ${E.line}` }}>
        Choose which NWS products you want to receive. Life-safety takeovers (Tornado Emergency, Flash Flood Emergency) cannot be disabled.
      </div>

      <SettingsSection title="Life-safety · always on">
        <SetToggleLocked label="Tornado Emergency" sub="Full-screen takeover · audible even in silent mode" />
        <SetToggleLocked label="Flash Flood Emergency" sub="Full-screen takeover" />
        <SetToggleLocked label="AMBER / Civil Emergency" sub="Delivered by system" />
      </SettingsSection>

      <SettingsSection title="Severe convective">
        <SetToggle label="Tornado Warning" sub="Confirmed or radar-indicated" on />
        <SetToggle label="Severe Thunderstorm Warning" on />
        <SetToggle label="Severe Thunderstorm Watch" sub="Conditions favorable within the watch area" on />
        <SetToggle label="Special Marine Warning" />
      </SettingsSection>

      <SettingsSection title="Flood">
        <SetToggle label="Flash Flood Warning" on />
        <SetToggle label="Flood Warning" on />
        <SetToggle label="Flood Watch" on />
        <SetToggle label="Coastal Flood Advisory" />
      </SettingsSection>

      <SettingsSection title="Winter">
        <SetToggle label="Blizzard / Ice Storm Warning" on />
        <SetToggle label="Winter Storm Warning" on />
        <SetToggle label="Winter Weather Advisory" />
        <SetToggle label="Wind Chill Advisory" />
      </SettingsSection>

      <SettingsSection title="Heat & other">
        <SetToggle label="Excessive Heat Warning" on />
        <SetToggle label="Heat Advisory" />
        <SetToggle label="Air Quality Alert" sub="Via AirNow" />
        <SetToggle label="Red Flag Warning" sub="Fire weather" />
        <SetToggle label="High Wind Warning" />
      </SettingsSection>

      <div style={{ padding: '16px 22px 30px', fontSize: 11, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.3, textAlign: 'center' }}>
        ◇ All alerts sourced from NWS CAP feed
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings detail — Notification timing
// ─────────────────────────────────────────────────────────────
function SettingsNotifications() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <SubNav title="Notification timing" />

      <SettingsSection title="Daily brief">
        <SetToggle label="Morning brief" sub="A read-aloud summary of your day" on />
        <TimeRow label="Delivery time" value="6:45 AM" />
        <SetRow label="Weekdays only" value="Every day" caret />
        <TimeRow label="Evening recap" value="8:30 PM" mute />
      </SettingsSection>

      <SettingsSection title="Quiet hours">
        <SetToggle label="Silence non-critical alerts" sub="Life-safety always breaks through" on />
        <TimeRow label="Start" value="10:00 PM" />
        <TimeRow label="End" value="6:00 AM" />
      </SettingsSection>

      <SettingsSection title="Precipitation nowcast">
        <SetToggle label="Rain starting" sub="60 min before" on />
        <SetToggle label="Rain ending" />
        <SetToggle label="First flakes" on />
        <SetSegment label="Lead time" options={['15 min', '30 min', '60 min', '2 hr']} pick={2} />
      </SettingsSection>

      <SettingsSection title="Routine windows">
        <RoutineRow label="Morning commute" time="7:30 – 8:30 AM" days="Mon–Fri" />
        <RoutineRow label="Evening commute" time="5:00 – 6:30 PM" days="Mon–Fri" />
        <RoutineRow label="Dog walk" time="7:00 – 7:45 PM" days="Daily" last />
        <SetRow label="Add routine" caret accent />
      </SettingsSection>

      <SettingsSection title="Delivery method">
        <SetToggle label="Push notification" on />
        <SetToggle label="Home-screen widget refresh" on />
        <SetToggle label="Apple Watch haptic" on />
        <SetToggle label="Email digest (weekly)" />
      </SettingsSection>

      <div style={{ height: 30 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings detail — Brief personalization
// ─────────────────────────────────────────────────────────────
function SettingsBrief() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <SubNav title="Brief personalization" />
      <div style={{ padding: '10px 22px 16px', fontSize: 12.5, color: E.inkSoft, lineHeight: 1.5, background: E.paperSoft, borderBottom: `1px solid ${E.line}` }}>
        The morning brief is written for you. These inputs shape what gets mentioned and how thresholds are set.
      </div>

      <SettingsSection title="What to cover">
        <SetToggle label="Today's headline" on />
        <SetToggle label="Commute windows" on />
        <SetToggle label="Wardrobe suggestion" on />
        <SetToggle label="Pollen & air quality" on />
        <SetToggle label="UV and sun times" />
        <SetToggle label="Tomorrow preview" on />
      </SettingsSection>

      <SettingsSection title="Commute">
        <SetRow label="Home → Work" sub="Annapolis → Baltimore · 34 mi" caret />
        <SetSegment label="Mode" options={['Drive', 'Transit', 'Bike', 'Walk']} pick={0} />
        <SetToggle label="Flag if delay likely > 10 min" on />
      </SettingsSection>

      <SettingsSection title="Wardrobe thresholds">
        <SliderRow label="Cold threshold" value="48° F" mark={48} min={20} max={70} />
        <SliderRow label="Warm threshold" value="78° F" mark={78} min={60} max={95} />
        <SliderRow label="Rain-gear threshold" value="30% chance" mark={30} min={0} max={100} suffix="%" />
        <SetToggle label="I run warm" sub="Suggest lighter layers" />
      </SettingsSection>

      <SettingsSection title="Sensitivities">
        <SetToggle label="Pollen" sub="Tree · Grass · Weed" on />
        <SetToggle label="Air quality (AQI)" on />
        <SetToggle label="Migraine pressure drops" sub="Flag when Δ ≥ 6 mb / 3 hr" />
        <SetToggle label="Humidity" />
      </SettingsSection>

      <SettingsSection title="Tone">
        <SetSegment label="Reading level" options={['Concise', 'Standard', 'Detailed']} pick={1} />
        <SetSegment label="Voice" options={['Neutral', 'Warm', 'Technical']} pick={1} />
        <SetToggle label="Include a closing suggestion" sub="e.g. 'Bring the umbrella.'" on />
      </SettingsSection>

      <div style={{ height: 30 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings detail — Accessibility
// ─────────────────────────────────────────────────────────────
function SettingsAccessibility() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <SubNav title="Accessibility" />

      <SettingsSection title="Text">
        <SliderRow label="Text size" value="Default" mark={3} min={1} max={6} stops />
        <SetToggle label="Bold weight" />
        <SetToggle label="Increase line spacing" />
      </SettingsSection>

      <SettingsSection title="Color & contrast">
        <SetToggle label="High contrast" sub="Stronger separators, darker text" />
        <SetToggle label="Reduce transparency" />
        <div style={{ padding: '12px 22px', borderTop: `1px solid ${E.line}` }}>
          <div style={{ fontSize: 14, marginBottom: 8 }}>Color-blind palette</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <PaletteOption label="Off" swatches={[E.advisory, E.watch, E.warning, E.emergency]} picked />
            <PaletteOption label="Deuteranopia" swatches={['#fbd148', '#d98c17', '#6b6bff', '#9b27c4']} />
            <PaletteOption label="Protanopia" swatches={['#f5c430', '#c98400', '#4b7bff', '#b42aa5']} />
            <PaletteOption label="Tritanopia" swatches={['#e6c84b', '#d87024', '#c62f3b', '#7a1a8f']} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Motion">
        <SetToggle label="Reduce motion" sub="Radar animates at 1× · no ambient sky motion" />
        <SetToggle label="Prefer static radar frames" />
      </SettingsSection>

      <SettingsSection title="Audio">
        <SetToggle label="Read aloud summaries" sub="Morning brief and alerts" />
        <SetSegment label="Speaking rate" options={['0.8×', '1.0×', '1.2×', '1.5×']} pick={1} />
        <SetToggle label="Haptics on alerts" on />
      </SettingsSection>

      <SettingsSection title="Screen reader">
        <SetToggle label="Verbose data labels" sub="Read units and trends explicitly" on />
        <SetToggle label="Describe radar frames" sub="Spatial narration for VoiceOver" />
      </SettingsSection>

      <div style={{ height: 30 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings helpers
// ─────────────────────────────────────────────────────────────
function SubNav({ title }) {
  return (
    <>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 22px 14px', borderBottom: `1px solid ${E.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 18, color: E.inkSoft, width: 20 }}>‹</div>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>{title}</div>
        <div style={{ fontSize: 11, fontFamily: E.mono, color: E.inkMute, letterSpacing: 0.8, textTransform: 'uppercase' }}>Settings</div>
      </div>
    </>
  );
}

function SetToggleLocked({ label, sub }) {
  return (
    <div style={{ padding: '11px 22px', display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${E.line}`, background: E.paperSoft }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          {label}
          <span style={{ fontSize: 10, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.6, textTransform: 'uppercase', border: `1px solid ${E.line}`, padding: '1px 5px', borderRadius: 3 }}>locked</span>
        </div>
        {sub && <div style={{ fontSize: 11.5, color: E.inkMute, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{
        width: 40, height: 22, borderRadius: 22, background: E.emergency,
        padding: 2, opacity: 0.85,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 18, background: '#fff',
          transform: `translateX(18px)`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </div>
    </div>
  );
}

function TimeRow({ label, value, mute }) {
  return (
    <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', borderTop: `1px solid ${E.line}`, opacity: mute ? 0.5 : 1 }}>
      <div style={{ flex: 1, fontSize: 14 }}>{label}</div>
      <div style={{ fontSize: 13, fontFamily: E.mono, color: E.ink, padding: '4px 10px', background: E.paperSoft, borderRadius: 5, border: `1px solid ${E.line}` }}>{value}</div>
    </div>
  );
}

function RoutineRow({ label, time, days, last }) {
  return (
    <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', borderTop: `1px solid ${E.line}`, gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14 }}>{label}</div>
        <div style={{ fontSize: 11.5, color: E.inkMute, fontFamily: E.mono, marginTop: 2 }}>{time} · {days}</div>
      </div>
      <div style={{ fontSize: 14, color: E.inkMute }}>›</div>
    </div>
  );
}

function SliderRow({ label, value, mark, min, max, suffix, stops }) {
  const pct = ((mark - min) / (max - min)) * 100;
  return (
    <div style={{ padding: '12px 22px 14px', borderTop: `1px solid ${E.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ flex: 1, fontSize: 14 }}>{label}</div>
        <div style={{ fontSize: 12.5, fontFamily: E.mono, color: E.inkSoft }}>{value}</div>
      </div>
      <div style={{ position: 'relative', height: 4, background: E.line, borderRadius: 4 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: E.ink, borderRadius: 4 }} />
        <div style={{ position: 'absolute', left: `calc(${pct}% - 9px)`, top: -7, width: 18, height: 18, borderRadius: 18, background: '#fff', border: `1.5px solid ${E.ink}`, boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }} />
        {stops && [1,2,3,4,5,6].map(i => (
          <div key={i} style={{ position: 'absolute', left: `${((i-1)/5)*100}%`, top: -2, width: 1, height: 8, background: E.lineStrong }} />
        ))}
      </div>
      {!stops && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10.5, color: E.inkMute, fontFamily: E.mono }}>
          <span>{min}{suffix || ''}</span>
          <span>{max}{suffix || ''}</span>
        </div>
      )}
    </div>
  );
}

function PaletteOption({ label, swatches, picked }) {
  return (
    <div style={{ padding: 10, border: `1px solid ${picked ? E.ink : E.line}`, borderRadius: 6, background: picked ? '#fff' : 'transparent' }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
        {swatches.map((s, i) => <div key={i} style={{ flex: 1, height: 14, background: s, borderRadius: 2 }} />)}
      </div>
      <div style={{ fontSize: 12, fontWeight: picked ? 600 : 400 }}>{label}</div>
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

function SetRow({ label, sub, value, caret, accent }) {
  return (
    <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${E.line}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: accent ? E.blue : E.ink, fontWeight: accent ? 500 : 400 }}>{accent && '+ '}{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: E.inkMute, marginTop: 2, lineHeight: 1.35 }}>{sub}</div>}
      </div>
      {value && <div style={{ fontSize: 13, color: E.inkSoft, fontFamily: E.mono }}>{value}</div>}
      {caret && <div style={{ fontSize: 16, color: E.inkMute, marginLeft: 4 }}>›</div>}
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
  return <MarineCoastal />;
}

function MarineCoastal() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 10px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Marine · Chesapeake Bay</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Annapolis Approach</div>
      </div>
      <MarineTabs active="coastal" />

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

function MarineTabs({ active }) {
  return (
    <div style={{ display: 'flex', gap: 22, padding: '4px 22px 0', borderBottom: `1px solid ${E.line}` }}>
      {[['coastal', 'Coastal'], ['offshore', 'Offshore'], ['high-seas', 'High seas']].map(([id, label]) => (
        <div key={id} style={{
          padding: '10px 0 12px', fontSize: 13,
          fontWeight: active === id ? 600 : 400,
          color: active === id ? E.ink : E.inkMute,
          borderBottom: active === id ? `2px solid ${E.ink}` : 'none',
        }}>{label}</div>
      ))}
    </div>
  );
}

function MarineOffshore() {
  // OPC high-seas / offshore — the open-ocean forecast zones
  const zones = [
    ['ANZ905', 'Hudson Canyon to Baltimore Canyon', '6–10 ft · SW 25kt G30', 'watch'],
    ['ANZ910', 'Baltimore Canyon to Cape Charles', '5–8 ft · WSW 20kt G28', 'advisory'],
    ['ANZ915', 'Cape Charles to Currituck Beach', '4–6 ft · W 18kt G25', 'statement'],
    ['ANZ920', 'Currituck Beach to 250nm', '6–9 ft · NW 22kt', 'advisory'],
  ];
  const colorFor = (lv) => ({ statement: E.statement, advisory: E.advisory, watch: E.watch, warning: E.warning }[lv]);
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 10px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Marine · Offshore</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Mid-Atlantic waters</div>
        <div style={{ fontSize: 12, color: E.inkMute, marginTop: 3 }}>Ocean Prediction Center · NWS</div>
      </div>
      <MarineTabs active="offshore" />

      {/* Zones map */}
      <div style={{ position: 'relative', height: 200, background: '#c7d5e0', overflow: 'hidden' }}>
        <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          {/* coastline */}
          <path d="M0 40 L60 55 L100 80 L120 110 L110 140 L130 170 L150 200 L0 200 Z" fill="#d5dcc8" />
          <text x="20" y="80" fontSize="9" fontFamily={E.mono} fill={E.inkMute}>US COAST</text>
          {/* zones */}
          <g>
            <rect x="90" y="10" width="100" height="50" fill={E.watch} opacity="0.35" stroke={E.watch} strokeWidth="1" />
            <text x="140" y="38" textAnchor="middle" fontSize="10" fontFamily={E.mono} fontWeight="700" fill={E.ink}>ANZ905</text>
            <rect x="90" y="60" width="100" height="45" fill={E.advisory} opacity="0.3" stroke={E.advisory} strokeWidth="1" />
            <text x="140" y="85" textAnchor="middle" fontSize="10" fontFamily={E.mono} fontWeight="700" fill={E.ink}>ANZ910</text>
            <rect x="90" y="105" width="100" height="40" fill={E.statement} opacity="0.3" stroke={E.statement} strokeWidth="1" />
            <text x="140" y="127" textAnchor="middle" fontSize="10" fontFamily={E.mono} fontWeight="700" fill={E.ink}>ANZ915</text>
            <rect x="190" y="10" width="200" height="135" fill={E.advisory} opacity="0.22" stroke={E.advisory} strokeWidth="1" />
            <text x="290" y="80" textAnchor="middle" fontSize="10" fontFamily={E.mono} fontWeight="700" fill={E.ink}>ANZ920 · to 250nm</text>
          </g>
          {/* wind barb examples */}
          {[[110, 35], [250, 50], [180, 115], [320, 90]].map(([x, y], i) => (
            <g key={i} stroke={E.ink} strokeWidth="1.2" fill="none">
              <line x1={x} y1={y} x2={x + 14} y2={y - 6} />
              <line x1={x + 14} y1={y - 6} x2={x + 11} y2={y - 12} />
              <line x1={x + 10} y1={y - 4} x2={x + 7} y2={y - 10} />
            </g>
          ))}
        </svg>
      </div>

      {/* Synopsis */}
      <div style={{ padding: '14px 22px 10px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Synopsis · OPC</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: E.inkSoft, textWrap: 'pretty' }}>
          Cold front sweeps offshore Wed night, producing SW gales to 35kt over outer waters through Thu AM. Seas build to 10ft. Front slows 200nm east Fri with gradual improvement.
        </div>
      </div>

      {/* Zone list */}
      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Zone forecasts</div>
        <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 8 }}>
          {zones.map(([id, name, cond, lv], i) => (
            <div key={i} style={{ padding: '12px 14px', borderBottom: i === zones.length - 1 ? 'none' : `1px solid ${E.line}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 4, alignSelf: 'stretch', background: colorFor(lv), borderRadius: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: E.mono, fontSize: 11, color: E.inkMute }}>{id}</span>
                  <span>{name}</span>
                </div>
                <div style={{ fontSize: 12, color: E.inkSoft, marginTop: 3, fontFamily: E.mono }}>{cond}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High seas warning sample */}
      <SBAlertBanner level="watch" title="Gale Warning · ANZ905" until="Wed 10 PM – Thu 10 AM" />

      <div style={{ padding: '12px 22px 20px' }}>
        <div style={{ fontSize: 10, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.8, lineHeight: 1.5 }}>
          ◇ Ocean Prediction Center · NWS<br />Issued Apr 23, 09:00 UTC · next issuance 21:00 UTC
        </div>
      </div>
    </div>
  );
}

function MarineHighSeas() {
  // Full basin-level high-seas forecast (OPC's signature product)
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: E.paper, fontFamily: E.font, color: E.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px 10px', borderBottom: `1px solid ${E.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: E.inkMute, fontWeight: 600 }}>Marine · High seas</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>North Atlantic basin</div>
        <div style={{ fontSize: 12, color: E.inkMute, marginTop: 3 }}>For commercial shipping and offshore passages</div>
      </div>
      <MarineTabs active="high-seas" />

      {/* Basin map */}
      <div style={{ position: 'relative', height: 220, background: '#0d2235' }}>
        <svg width="100%" height="220" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
          {/* landmasses */}
          <path d="M0 70 L50 60 L80 80 L70 120 L50 160 L30 180 L0 180 Z" fill="#1a3a2a" />
          <path d="M340 60 L400 55 L400 100 L370 110 L350 90 Z" fill="#1a3a2a" />
          <path d="M320 40 L360 35 L370 55 L335 60 Z" fill="#1a3a2a" />
          {/* isobars */}
          <g stroke="#5a7a9a" strokeWidth="0.8" fill="none" opacity="0.6">
            <path d="M80 100 Q150 70 220 90 T380 100" />
            <path d="M100 140 Q170 110 240 125 T400 130" />
            <path d="M60 160 Q130 140 200 150 T380 160" />
          </g>
          {/* Low pressure center */}
          <g transform="translate(200, 110)">
            <circle r="10" fill="#c44b3e" opacity="0.8" />
            <text y="4" textAnchor="middle" fontSize="11" fill="#fff" fontFamily={E.mono} fontWeight="700">L</text>
            <text y="22" textAnchor="middle" fontSize="9" fill="#fff" fontFamily={E.mono}>982mb</text>
          </g>
          {/* High */}
          <g transform="translate(310, 170)">
            <circle r="10" fill="#3a6b9e" opacity="0.7" />
            <text y="4" textAnchor="middle" fontSize="11" fill="#fff" fontFamily={E.mono} fontWeight="700">H</text>
            <text y="22" textAnchor="middle" fontSize="9" fill="#fff" fontFamily={E.mono}>1028mb</text>
          </g>
          {/* storm force box */}
          <g>
            <rect x="150" y="80" width="100" height="60" fill={E.warning} opacity="0.25" stroke={E.warning} strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="200" y="75" textAnchor="middle" fontSize="9" fontFamily={E.mono} fontWeight="700" fill={E.warning}>STORM · 50KT</text>
          </g>
          {/* labels */}
          <text x="350" y="200" fontSize="9" fontFamily={E.mono} fill="#7a95af">ATLANTIC</text>
        </svg>
      </div>

      {/* Warnings */}
      <div style={{ padding: '14px 22px 8px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Active warnings · AMZ basin</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['warning', 'Storm Warning', '40N-48N 40W-55W · 50kt seas 22ft'],
            ['watch', 'Gale Warning', '36N-42N 65W-75W · 35kt seas 14ft'],
            ['advisory', 'Heavy Freezing Spray', 'N of 50N · rapid vessel icing'],
          ].map(([lv, name, extent], i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 3, height: 32, background: { warning: E.warning, watch: E.watch, advisory: E.advisory }[lv], borderRadius: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 11.5, color: E.inkMute, fontFamily: E.mono, marginTop: 2 }}>{extent}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ship routing insight */}
      <div style={{ padding: '10px 22px 14px' }}>
        <div style={{ background: E.blueSoft, border: `1px solid ${E.blue}22`, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, color: E.blue, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>Routing note</div>
          <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 6, color: E.inkSoft }}>
            Westbound vessels: consider southerly route via 35N to avoid storm center. ETA impact +8–12 hours vs. great circle.
          </div>
        </div>
      </div>

      {/* Sea state grid */}
      <div style={{ padding: '0 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Significant wave height · basin</div>
        <div style={{ background: '#fff', border: `1px solid ${E.line}`, borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'end', gap: 2, height: 50 }}>
            {[6,8,10,14,18,22,20,16,12,10,8,7,8,10,12].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${(h/22)*100}%`, background: h >= 18 ? E.warning : h >= 12 ? E.watch : h >= 8 ? E.advisory : E.blue, borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: E.inkMute, fontFamily: E.mono, marginTop: 4 }}>
            <span>20°W</span><span>40°W</span><span>60°W</span><span>80°W</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '6px 22px 20px' }}>
        <div style={{ fontSize: 10, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.8, lineHeight: 1.5 }}>
          ◇ Ocean Prediction Center · NWS · High Seas Forecast<br />Valid 24h from 09:00 UTC · updated 4× daily
        </div>
      </div>
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

Object.assign(window, { OnboardingWelcome, OnboardingPermission, OnboardingDepth, LocationSearch, SettingsScreen, SettingsAlerts, SettingsNotifications, SettingsBrief, SettingsAccessibility, MarineScreen, MarineCoastal, MarineOffshore, MarineHighSeas, AviationScreen, FireScreen, MoreScreen, LocationSwitcher });

// ─────────────────────────────────────────────────────────────
// MoreScreen — the "More" tab. The hub for everything not on
// Home / Radar / Alerts. This is the canonical entry point for:
//   · Skybureau Brief (AI) + Ask Skybureau
//   · Specialty products (Marine / Aviation / Fire)
//   · Saved locations
//   · Settings (and all its sub-screens)
//   · About / data sources / privacy
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// LocationSwitcher — bottom-sheet on Home. Tapping the city
// name in the Home header opens this. Saved locations with
// live conditions, a search field, and a Manage link to the
// full CRUD screen under More.
// ─────────────────────────────────────────────────────────────
function LocationSwitcher() {
  const current = 'home';
  const locs = [
    { id: 'home', name: 'Silver Spring, MD',     sub: 'Current location',  temp: 64, cond: 'partly-cloudy-day', alert: null },
    { id: 'beth', name: 'Bethesda, MD',          sub: '7 mi SW',           temp: 65, cond: 'partly-cloudy-day', alert: null },
    { id: 'oc',   name: 'Ocean City, MD',        sub: 'Beach house',       temp: 58, cond: 'fog',               alert: 'advisory' },
    { id: 'dc',   name: 'Washington, DC',        sub: 'Office',            temp: 66, cond: 'partly-cloudy-day', alert: null },
    { id: 'lwk',  name: 'Lewes, DE',             sub: "Parents'",          temp: 57, cond: 'overcast',          alert: null },
    { id: 'mtc',  name: 'Mountain Lake, VA',     sub: 'Weekend',           temp: 48, cond: 'rain',              alert: 'watch' },
  ];
  const alertColor = (l) => l === 'warning' ? '#d63a2f' : l === 'watch' ? '#e8701e' : l === 'advisory' ? '#d4a017' : null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      {/* backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,14,0.35)' }} />
      {/* sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: E.paper, borderTopLeftRadius: 22, borderTopRightRadius: 22,
        boxShadow: '0 -8px 30px rgba(0,0,0,0.12)',
        maxHeight: '78%', display: 'flex', flexDirection: 'column',
      }}>
        {/* grabber */}
        <div style={{ padding: '8px 0 4px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 34, height: 4, borderRadius: 2, background: E.line }} />
        </div>
        {/* header */}
        <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.4 }}>Locations</div>
          <div style={{ fontSize: 13, color: E.blue, fontWeight: 500 }}>Manage</div>
        </div>
        {/* search */}
        <div style={{ padding: '0 20px 10px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
            background: E.paperSoft, borderRadius: 10, border: `1px solid ${E.line}`,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={E.inkMute} strokeWidth="2"/>
              <path d="M17 17l4 4" stroke={E.inkMute} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 13.5, color: E.inkMute }}>Search cities, ZIP, coordinates</div>
          </div>
        </div>
        {/* list */}
        <div className="sb-scroll" style={{ flex: 1, overflowY: 'auto', padding: '2px 0 12px' }}>
          {locs.map((l, i) => {
            const ac = alertColor(l.alert);
            const on = l.id === current;
            return (
              <div key={l.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 20px',
                borderLeft: on ? `3px solid ${E.ink}` : '3px solid transparent',
                background: on ? E.paperSoft : 'transparent',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>{l.name}</div>
                    {ac && <div style={{ width: 7, height: 7, borderRadius: 4, background: ac, flexShrink: 0 }} />}
                  </div>
                  <div style={{ fontSize: 11.5, color: E.inkMute, fontFamily: E.mono, marginTop: 2 }}>
                    {l.sub}{l.alert ? ` · ${l.alert}` : ''}
                  </div>
                </div>
                <WxIcon kind={l.cond} size={22} color={E.inkSoft} />
                <div style={{ fontSize: 22, fontWeight: 300, fontFamily: E.mono, minWidth: 38, textAlign: 'right', letterSpacing: -0.5 }}>{l.temp}°</div>
              </div>
            );
          })}
          {/* add */}
          <div style={{ padding: '14px 20px 4px' }}>
            <div style={{
              padding: '12px 14px', border: `1px dashed ${E.line}`, borderRadius: 10,
              color: E.blue, fontSize: 13.5, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ fontSize: 18, lineHeight: 1 }}>+</div>
              Add a location
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreScreen() {
  const Row = ({ icon, title, sub, trail, first, hazard }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 20px', borderTop: first ? 'none' : `1px solid ${E.line}`,
      cursor: 'default',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: hazard ? `${hazard}18` : E.paperSoft,
        border: `1px solid ${hazard ? hazard + '40' : E.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hazard || E.ink, flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: E.ink, lineHeight: 1.2 }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: E.inkMute, lineHeight: 1.3, marginTop: 2 }}>{sub}</div>}
      </div>
      {trail && <div style={{ fontSize: 11.5, color: E.inkMute, fontFamily: E.mono, letterSpacing: 0.3 }}>{trail}</div>}
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0, marginLeft: 4 }}>
        <path d="M1 1l5 5-5 5" stroke={E.inkMute} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const GroupLabel = ({ children }) => (
    <div style={{
      padding: '22px 20px 6px', fontSize: 10, fontFamily: E.mono,
      color: E.inkMute, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600,
    }}>{children}</div>
  );

  return (
    <div className="sb sb-scroll" style={{
      width: '100%', height: '100%', overflowY: 'auto', background: E.paper,
      fontFamily: E.font, color: E.ink, paddingBottom: 96,
    }}>
      <div style={{ height: 54 }} />

      {/* Page header */}
      <div style={{ padding: '12px 20px 8px' }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.8 }}>More</div>
        <div style={{ fontSize: 13, color: E.inkSoft, marginTop: 4 }}>
          Specialty products, civic data, and everything else.
        </div>
      </div>

      {/* Featured: Brief + Ask as a two-up tile */}
      <div style={{ padding: '10px 20px 2px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{
          background: E.ink, color: E.paper, borderRadius: 14, padding: '16px 14px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 10, fontFamily: E.mono, letterSpacing: 1.2, opacity: 0.6, textTransform: 'uppercase' }}>Today · 6:45 AM</div>
          <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6, letterSpacing: -0.3 }}>Skybureau Brief</div>
          <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 3, lineHeight: 1.4 }}>Your morning briefing, ready.</div>
          <div style={{ position: 'absolute', bottom: 10, right: 12, opacity: 0.5 }}>
            <Star />
          </div>
        </div>
        <div style={{
          background: E.paperSoft, border: `1px solid ${E.line}`, borderRadius: 14, padding: '16px 14px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 10, fontFamily: E.mono, letterSpacing: 1.2, color: E.inkMute, textTransform: 'uppercase' }}>Ask ✦</div>
          <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6, letterSpacing: -0.3 }}>Ask Skybureau</div>
          <div style={{ fontSize: 11.5, color: E.inkSoft, marginTop: 3, lineHeight: 1.4 }}>Questions in plain language.</div>
          <div style={{ position: 'absolute', bottom: 10, right: 12, opacity: 0.5 }}>
            <Spark />
          </div>
        </div>
      </div>

      {/* Locations — elevated above specialty/civic since it's high-frequency */}
      <GroupLabel>Locations</GroupLabel>
      <div style={{ background: E.paper }}>
        <Row first icon={<Pin />} title="Saved locations" sub="Home · Bethesda · Ocean City +2" trail="5" />
        <Row icon={<Clock />} title="Alert history" sub="Past 30 days" trail="12" />
      </div>

      {/* Specialty */}
      <GroupLabel>Specialty products</GroupLabel>
      <div style={{ background: E.paper }}>
        <Row first icon={<Anchor />} title="Marine" sub="Coastal, offshore, high seas" trail="On" hazard={E.blue} />
        <Row icon={<Plane />} title="Aviation" sub="METAR, TAF, SIGMET, winds aloft" trail="Off" />
        <Row icon={<Flame />} title="Fire weather" sub="RH, wind, Haines, red-flag conditions" trail="Off" hazard="#b8572c" />
        <Row icon={<Snowflake />} title="Winter" sub="Snow depth, road temps, forecast SWE" trail="Off" />
        <Row icon={<Wave />} title="Hurricane center" sub="Active tropical systems" trail="Season" />
        <Row icon={<Aurora />} title="Aurora" sub="Kp forecast, cloud cover check" trail="Off" />
        <Row icon={<Pollen />} title="Health & air" sub="Pollen, AQI, heat risk, migraine pressure" trail="On" />
        <Row icon={<Binoculars />} title="SKYWARN spotter" sub="Report to your local NWS office" />
      </div>

      {/* Civic data */}
      <GroupLabel>Civic data</GroupLabel>
      <div style={{ background: E.paper }}>
        <Row first icon={<Pollen />} title="Air quality" sub="AQI, pollutants, sensor map" trail="118 USG" hazard="#e8701e" />
        <Row icon={<Flame />} title="Wildfire & smoke" sub="Active fires, HRRR-Smoke plume" trail="3 fires" hazard="#b8572c" />
        <Row icon={<Drought />} title="Drought monitor" sub="U.S. Drought Monitor · weekly" trail="D1" hazard="#d4a017" />
        <Row icon={<River />} title="River & flood" sub="AHPS hydrograph · nearest gauge" trail="6.4 ft" hazard={E.blue} />
        <Row icon={<Quake />} title="Earthquakes" sub="USGS · within 800 mi" trail="5 recent" />
        <Row icon={<Tsunami />} title="Tsunami" sub="NTWC advisories for saved locations" trail="1 active" hazard="#d63a2f" />
        <Row icon={<Climate />} title="Climate · today vs. normal" sub="30-year baseline, monthly anomaly" trail="+3.4°F" />
      </div>

      {/* Settings */}
      <GroupLabel>Settings</GroupLabel>
      <div style={{ background: E.paper }}>
        <Row first icon={<Gear />} title="Settings" sub="Units, alerts, notifications, radar style, accessibility, privacy" />
      </div>

      {/* About */}
      <GroupLabel>About</GroupLabel>
      <div style={{ background: E.paper }}>
        <Row first icon={<Info />} title="Data sources" sub="NWS, MRMS, HRRR, ECMWF" />
        <Row icon={<Doc />} title="How to read a forecast" sub="A short guide" />
        <Row icon={<Question />} title="Help & contact" />
        <Row icon={<Heart />} title="What's new" sub="v2.4 · Radar style picker" />
      </div>

      {/* Footer provenance */}
      <div style={{
        padding: '32px 20px 20px', textAlign: 'center',
        fontSize: 10.5, fontFamily: E.mono, color: E.inkMute, letterSpacing: 0.5,
      }}>
        skybureau · v2.4.1 <br />
        <span style={{ color: E.inkSoft }}>public-service weather data from NWS, NOAA, USGS</span>
      </div>
    </div>
  );
}

// Tiny icon components for the More list
const ICO = { w: 18, h: 18, sw: 1.6 };
const Star = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.4 6.3L12 17l-5.6 3.3L7.8 14 3 9.6 9.4 9 12 3z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/></svg>;
const Spark = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Bell = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/><path d="M10 21h4" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Anchor = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M12 7v13M5 14c0 3.5 3.5 6 7 6s7-2.5 7-6M8 11h8" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Plane = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M3 13l18-8-7 16-2-6-9-2z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/></svg>;
const Flame = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 1-5 .5 1.5 1.5 2 3-4z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/></svg>;
const Snowflake = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4M12 6l-2 2M12 6l2 2M12 18l-2-2M12 18l2-2M6 12l2 2M6 12l2-2M18 12l-2 2M18 12l-2-2" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Wave = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M3 12c3 0 3-3 6-3s3 3 6 3 3-3 6-3M3 17c3 0 3-3 6-3s3 3 6 3 3-3 6-3" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Aurora = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M4 20c2-10 4-13 8-13s6 3 8 13M8 20c1-6 2-8 4-8s3 2 4 8" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Pollen = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="12" cy="20" r="1.5" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="4" cy="12" r="1.5" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="20" cy="12" r="1.5" stroke="currentColor" strokeWidth={ICO.sw}/></svg>;
const Binoculars = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="6" cy="16" r="3.5" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="18" cy="16" r="3.5" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M9 15h6M8 13V6h3v7M13 13V6h3v7" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/></svg>;
const Pin = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth={ICO.sw}/></svg>;
const Search = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M17 17l4 4" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Gear = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const BellSlash = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M6 16V11a6 6 0 0 1 10.5-4M18 11v5l1.5 2h-15" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round" strokeLinecap="round"/><path d="M4 4l16 16" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Radar = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={ICO.sw}/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={ICO.sw} opacity="0.5"/><path d="M12 12l6-6" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const BriefIcon = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Access = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.8" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M5 9l3.5 1.5V20M19 9l-3.5 1.5V20M8.5 14h7" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Lock = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth={ICO.sw}/></svg>;
const Info = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M12 8h0M12 11v5" stroke="currentColor" strokeWidth={ICO.sw+0.3} strokeLinecap="round"/></svg>;
const Doc = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6V3z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/><path d="M15 3v4h4M9 13h6M9 17h4" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Question = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3V14M12 17h0" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Heart = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 9c0 6.5-7 11-7 11z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/></svg>;
const Drought = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M12 3c3 5 6 8 6 12a6 6 0 1 1-12 0c0-4 3-7 6-12z" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round"/><path d="M9 20c0-2 .5-3 1.5-4" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const River = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M3 8c3 0 3 2 6 2s3-2 6-2 3 2 6 2M3 14c3 0 3 2 6 2s3-2 6-2 3 2 6 2" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/></svg>;
const Quake = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M3 12h2l2-5 3 10 3-14 3 12 2-3h3" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round" strokeLinecap="round"/></svg>;
const Tsunami = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M3 16c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/><path d="M3 20c3 0 3-2 6-2s3 2 6 2 3-2 6-2" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round"/><path d="M8 13l2-3 2 2 2-4 2 3" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round" strokeLinecap="round"/></svg>;
const Climate = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><path d="M4 20h16M4 20V6M4 14l4-4 4 3 4-6 4 4" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round" strokeLinecap="round"/></svg>;
const Clock = () => <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={ICO.sw}/><path d="M12 7v5l3.5 2.5" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round" strokeLinejoin="round"/></svg>;
