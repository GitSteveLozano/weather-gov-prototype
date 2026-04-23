// Alert banners, full-screen emergency takeover, drilldown (Glance/Scan/Dive)

const AT = SB_TOKENS;

// Top-of-screen alert banner (subtle)
function SBAlertBanner({ level = 'advisory', title, until, onTap }) {
  const map = {
    statement: { bg: '#e8e5de', fg: '#3a3428', bar: AT.statement },
    advisory: { bg: '#fbf0cc', fg: '#5a3e08', bar: AT.advisory },
    watch: { bg: '#fdd9b8', fg: '#6a2a08', bar: AT.watch },
    warning: { bg: '#f7c4bf', fg: '#5a1712', bar: AT.warning },
    emergency: { bg: '#efc1d4', fg: '#4a0a28', bar: AT.emergency },
  };
  const m = map[level] || map.advisory;
  return (
    <div onClick={onTap} style={{
      margin: '10px 14px', borderRadius: 8, background: m.bg, color: m.fg,
      display: 'flex', alignItems: 'stretch', overflow: 'hidden',
      border: `1px solid ${m.fg}22`,
      cursor: 'pointer',
    }}>
      <div style={{ width: 4, background: m.bar, flexShrink: 0 }} />
      <div style={{ padding: '9px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>
          {level === 'emergency' ? '! Emergency' : level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div>
        {until && <div style={{ fontSize: 11.5, fontFamily: AT.mono, opacity: 0.7 }}>{until}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 18, opacity: 0.5 }}>›</div>
    </div>
  );
}

// Full-screen emergency takeover — tornado-class
function SBEmergencyTakeover({ onDismiss }) {
  return (
    <div className="sb" style={{
      width: '100%', height: '100%', background: AT.emergency,
      color: '#fff', fontFamily: AT.font, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* animated emergency bars at top */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, height: 6, overflow: 'hidden' }}>
        <div style={{
          display: 'flex', animation: 'sb-drift 1.2s linear infinite',
          background: `repeating-linear-gradient(90deg, #fff 0 20px, transparent 20px 40px)`,
          height: 6, width: '120%',
        }} />
      </div>

      <div style={{ height: 80 }} />

      <div style={{ padding: '24px 22px 8px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 10px', background: '#fff', color: AT.emergency,
          borderRadius: 3, fontSize: 11, fontFamily: AT.mono, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
          animation: 'sb-pulse 1.4s ease-in-out infinite',
        }}>
          ! Tornado emergency
        </div>
      </div>

      <div style={{ padding: '12px 22px 0', flex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8, fontWeight: 600, marginBottom: 6 }}>
          Issued 1:04 PM · Until 1:45 PM
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.8, lineHeight: 1.1, textWrap: 'balance' }}>
          Confirmed tornado on the ground near Rockville, moving east at 35 mph.
        </div>

        <div style={{
          marginTop: 22, padding: 16, borderRadius: 10,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.85, fontWeight: 600, marginBottom: 8, fontFamily: AT.mono }}>
            Take action now
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.45, fontWeight: 500 }}>
            Move to an interior room on the lowest floor. Avoid windows. If in a mobile home or vehicle, leave immediately for substantial shelter.
          </div>
        </div>

        <div style={{ marginTop: 20, fontFamily: AT.mono, fontSize: 12, opacity: 0.75, lineHeight: 1.6 }}>
          AREAS: Montgomery Co, Howard Co<br/>
          SOURCE: Radar confirmed<br/>
          HAZARD: Damaging tornado, ≥EF-2<br/>
          IMPACT: Flying debris, destroyed homes
        </div>
      </div>

      <div style={{ padding: '16px 16px 24px', display: 'flex', gap: 10, flexDirection: 'column' }}>
        <button style={{
          width: '100%', padding: '16px', borderRadius: 10,
          background: '#fff', color: AT.emergency,
          border: 'none', fontFamily: AT.font, fontSize: 16, fontWeight: 700,
          letterSpacing: 0.3,
        }}>See shelter map</button>
        <button onClick={onDismiss} style={{
          width: '100%', padding: '14px', borderRadius: 10,
          background: 'transparent', color: '#fff',
          border: '1.5px solid rgba(255,255,255,0.5)',
          fontFamily: AT.font, fontSize: 14, fontWeight: 500,
        }}>I'm safe · Dismiss</button>
      </div>
    </div>
  );
}

// Alerts list screen
function SBAlertsScreen() {
  const alerts = [
    { level: 'emergency', title: 'Tornado Emergency', meta: 'Montgomery Co · until 1:45 PM', body: 'Confirmed tornado moving east.' },
    { level: 'warning', title: 'Severe Thunderstorm Warning', meta: 'Howard, Frederick Co · until 2:30 PM', body: '60 mph winds, quarter-size hail possible.' },
    { level: 'watch', title: 'Flash Flood Watch', meta: 'Central MD · until 8 PM', body: '2–3" rain possible in 6 hours.' },
    { level: 'advisory', title: 'Dense Fog Advisory', meta: 'until 9 AM', body: 'Visibility under 1/4 mile at times.' },
    { level: 'statement', title: 'Special Weather Statement', meta: 'until Thu 6 AM', body: 'Strong winds possible along ridge tops.' },
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AT.paper, fontFamily: AT.font, color: AT.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '16px 22px 14px', borderBottom: `1px solid ${AT.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: AT.inkMute, fontWeight: 600 }}>Active alerts</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, marginTop: 4 }}>
          5 for your area
        </div>
        <div style={{ fontSize: 13, color: AT.inkMute, marginTop: 2 }}>Silver Spring, MD · 25mi radius</div>
      </div>

      {alerts.map((a, i) => {
        const colorMap = {
          emergency: AT.emergency, warning: AT.warning, watch: AT.watch, advisory: AT.advisory, statement: AT.statement,
        };
        return (
          <div key={i} style={{ padding: '14px 22px', borderBottom: `1px solid ${AT.line}`, display: 'flex', gap: 12 }}>
            <div style={{ width: 4, background: colorMap[a.level], borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <SBSeverityChip level={a.level} />
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8, letterSpacing: -0.3 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: AT.inkMute, fontFamily: AT.mono, marginTop: 2 }}>{a.meta}</div>
              <div style={{ fontSize: 13.5, color: AT.inkSoft, marginTop: 6, lineHeight: 1.4 }}>{a.body}</div>
              <div style={{ fontSize: 12, color: AT.blue, marginTop: 8, fontWeight: 500 }}>Read full bulletin →</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Depth drilldown — Glance, Scan, Dive (same data, 3 densities)
// ─────────────────────────────────────────────────────────────
function DepthGlance() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: AT.paper, fontFamily: AT.font, color: AT.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SBWordmark size={12} />
        <div style={{ fontSize: 10, fontFamily: AT.mono, letterSpacing: 1, color: AT.inkMute, textTransform: 'uppercase' }}>Glance</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', gap: 32 }}>
        <div style={{ textAlign: 'center' }}>
          <WxIcon kind="partly-cloudy-day" size={80} color={AT.ink} stroke={1.2} />
          <div style={{ fontSize: 120, fontWeight: 200, letterSpacing: -5, lineHeight: 0.9, marginTop: 12 }}>67°</div>
          <div style={{ fontSize: 17, color: AT.inkSoft, marginTop: 6 }}>Partly cloudy in Silver Spring</div>
        </div>
        <div style={{
          fontSize: 20, fontWeight: 400, lineHeight: 1.4, textAlign: 'center',
          textWrap: 'balance', color: AT.ink,
        }}>
          Grab a light jacket. Rain arrives around 8 tonight.
        </div>
      </div>
      <div style={{ padding: '0 22px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 0.5 }}>
          <span>Swipe up for more</span>
          <span style={{ fontSize: 16 }}>↑</span>
        </div>
      </div>
    </div>
  );
}

function DepthScan() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AT.paper, fontFamily: AT.font, color: AT.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '18px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SBWordmark size={12} />
        <div style={{ fontSize: 10, fontFamily: AT.mono, letterSpacing: 1, color: AT.inkMute, textTransform: 'uppercase' }}>Scan</div>
      </div>
      <div style={{ padding: '14px 22px 8px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 72, fontWeight: 300, letterSpacing: -3, lineHeight: 0.9 }}>67°</div>
          <div style={{ fontSize: 15, marginTop: 4, fontWeight: 500 }}>Partly cloudy</div>
          <div style={{ fontSize: 12, color: AT.inkMute, fontFamily: AT.mono, marginTop: 2 }}>H71° · L52° · Feels 65°</div>
        </div>
        <WxIcon kind="partly-cloudy-day" size={44} color={AT.ink} stroke={1.2} />
      </div>

      <div style={{ padding: '8px 22px 14px', fontSize: 14, lineHeight: 1.4, color: AT.inkSoft }}>
        Rain arrives around 8 tonight, heaviest 9–11pm.
      </div>

      {/* hourly strip */}
      <div className="sb-scroll" style={{ padding: '0 22px 16px', overflowX: 'auto', borderTop: `1px solid ${AT.line}`, paddingTop: 14 }}>
        <div style={{ display: 'flex', gap: 18, minWidth: 'max-content' }}>
          {SB_FAKE.hourly.slice(0, 8).map((h, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 32 }}>
              <div style={{ fontSize: 11, color: AT.inkMute, fontFamily: AT.mono, marginBottom: 8 }}>{h[0]}</div>
              <WxIcon kind={h[2]} size={22} color={AT.ink} stroke={1.4} />
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8, fontFamily: AT.mono }}>{h[1]}°</div>
              {h[3] > 0 && <div style={{ fontSize: 9.5, color: AT.skyRain, fontFamily: AT.mono, marginTop: 2 }}>{h[3]}%</div>}
            </div>
          ))}
        </div>
      </div>

      {/* key stats */}
      <div style={{ padding: '0 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <MiniScanCard label="Wind" val="8 mph WSW" />
        <MiniScanCard label="Humidity" val="54%" />
        <MiniScanCard label="UV" val="4 · Moderate" />
        <MiniScanCard label="Air quality" val="38 · Good" />
      </div>

      <div style={{ padding: '18px 22px 24px', textAlign: 'center', fontSize: 12, color: AT.blue, fontWeight: 500 }}>
        Tap any card to go deeper ↓
      </div>
    </div>
  );
}

function MiniScanCard({ label, val }) {
  return (
    <div style={{ background: AT.paperSoft, border: `1px solid ${AT.line}`, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>{val}</div>
    </div>
  );
}

function DepthDive() {
  // A deep view of "Wind" showing profile, gusts, models
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: AT.paper, fontFamily: AT.font, color: AT.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${AT.line}` }}>
        <div style={{ fontSize: 16, color: AT.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Wind</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 10, fontFamily: AT.mono, letterSpacing: 1, color: AT.inkMute, textTransform: 'uppercase' }}>Dive</div>
      </div>

      {/* Big compass rose */}
      <div style={{ padding: '14px 14px 0', display: 'flex', gap: 14 }}>
        <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="55" fill="none" stroke={AT.line} strokeWidth="1" />
            <circle cx="60" cy="60" r="42" fill="none" stroke={AT.line} strokeWidth="0.5" />
            {[0,45,90,135,180,225,270,315].map(a => {
              const x1 = 60 + Math.cos((a-90)*Math.PI/180) * 48;
              const y1 = 60 + Math.sin((a-90)*Math.PI/180) * 48;
              const x2 = 60 + Math.cos((a-90)*Math.PI/180) * 55;
              const y2 = 60 + Math.sin((a-90)*Math.PI/180) * 55;
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AT.inkMute} strokeWidth={a % 90 === 0 ? 1.2 : 0.5} />;
            })}
            <text x="60" y="16" textAnchor="middle" fontSize="10" fontFamily={AT.mono} fill={AT.inkMute}>N</text>
            <text x="110" y="64" textAnchor="middle" fontSize="10" fontFamily={AT.mono} fill={AT.inkMute}>E</text>
            <text x="60" y="112" textAnchor="middle" fontSize="10" fontFamily={AT.mono} fill={AT.inkMute}>S</text>
            <text x="12" y="64" textAnchor="middle" fontSize="10" fontFamily={AT.mono} fill={AT.inkMute}>W</text>
            {/* arrow pointing from WSW (coming from 247°) */}
            <g transform="translate(60,60) rotate(67)">
              <path d="M0,-40 L-8,-28 L0,-32 L8,-28 Z" fill={AT.blue} />
              <line x1="0" y1="-32" x2="0" y2="32" stroke={AT.blue} strokeWidth="2" />
            </g>
            <circle cx="60" cy="60" r="3" fill={AT.ink} />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Sustained</div>
          <div style={{ fontSize: 42, fontWeight: 300, letterSpacing: -1, lineHeight: 1 }}>8 <span style={{ fontSize: 18, color: AT.inkMute }}>mph</span></div>
          <div style={{ fontSize: 12, fontFamily: AT.mono, color: AT.inkMute, marginTop: 2 }}>from WSW · 247°</div>
          <div style={{ fontSize: 11, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginTop: 10 }}>Gusts</div>
          <div style={{ fontSize: 22, fontWeight: 500, fontFamily: AT.mono }}>14 <span style={{ fontSize: 12, color: AT.inkMute }}>mph</span></div>
        </div>
      </div>

      {/* Wind profile chart */}
      <div style={{ padding: '14px 14px 8px' }}>
        <div style={{ fontSize: 10.5, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          24-hour wind · sustained / gusts
        </div>
        <div style={{ background: '#fff', border: `1px solid ${AT.line}`, borderRadius: 4, padding: 10 }}>
          <SBLineChart data={[6,7,8,9,10,12,14,15,13,10,8,7]} width={348} height={60} color={AT.blue} yRange={[0, 25]} />
          <SBLineChart data={[10,12,14,16,18,22,24,23,20,16,12,10]} width={348} height={60} color={AT.warning} yRange={[0, 25]} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: AT.inkMute, fontFamily: AT.mono, marginTop: 4 }}>
            <span>1PM</span><span>6PM</span><span>12AM</span><span>6AM</span><span>12PM</span>
          </div>
        </div>
      </div>

      {/* pressure/soundings */}
      <div style={{ padding: '8px 14px' }}>
        <div style={{ fontSize: 10.5, color: AT.inkMute, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Upper-level winds · 12Z sounding
        </div>
        <div style={{ background: '#fff', border: `1px solid ${AT.line}`, borderRadius: 4, padding: '10px 12px' }}>
          {[
            ['SFC', '8 WSW', 'calm'],
            ['925mb', '18 SW', '~2500ft'],
            ['850mb', '28 SW', '~5000ft'],
            ['700mb', '42 WSW', '~10000ft'],
            ['500mb', '65 W', '~18000ft'],
            ['250mb', '110 W', '~34000ft · jet'],
          ].map(([lvl, w, note], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', fontFamily: AT.mono, fontSize: 11.5, padding: '4px 0', borderBottom: i < 5 ? `1px solid ${AT.line}` : 'none' }}>
              <span style={{ fontWeight: 600 }}>{lvl}</span>
              <span>{w}</span>
              <span style={{ color: AT.inkMute }}>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plain language explainer */}
      <div style={{ padding: '14px 14px 20px' }}>
        <div style={{ background: AT.blueSoft, border: `1px solid ${AT.blue}22`, borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 10.5, color: AT.blue, fontFamily: AT.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>What this means</div>
          <div style={{ fontSize: 13, lineHeight: 1.45, color: AT.inkSoft }}>
            Surface winds stay light, but strong flow at 700mb will shear and steer tonight's storms northeast. Expect gust fronts ahead of the rain line.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SBAlertBanner, SBEmergencyTakeover, SBAlertsScreen, DepthGlance, DepthScan, DepthDive });
