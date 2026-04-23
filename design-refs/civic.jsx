// Civic data section — CPC outlooks, HeatRisk, Aurora, Flood inundation, SKYWARN
// Plus secondary-valuable: historical context, safety drawer, data provenance footer

const CV = SB_TOKENS;

// ─────────────────────────────────────────────────────────────
// 1. Seasonal Outlook — CPC 30/90-day
// ─────────────────────────────────────────────────────────────
function SeasonalOutlook() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CV.inkMute, fontWeight: 600 }}>Seasonal outlook</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4, textWrap: 'balance' }}>A warmer-than-normal May</div>
        <div style={{ fontSize: 13, color: CV.inkMute, marginTop: 4, lineHeight: 1.4 }}>
          Issued by the Climate Prediction Center · April 18, valid May 1–31
        </div>
      </div>

      {/* Lede brief */}
      <div style={{ padding: '18px 22px 10px' }}>
        <div style={{ fontSize: 16, lineHeight: 1.5, textWrap: 'pretty' }}>
          For your area, May is likely to run <b>warmer than the 30-year normal</b>, with a <b>62% probability</b> of above-average temperatures. Precipitation is expected to be near normal. La Niña is weakening, shifting the pattern toward climatology.
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 16, padding: '8px 22px 0', borderBottom: `1px solid ${CV.line}` }}>
        {['30-day', '90-day', '3-month'].map((t, i) => (
          <div key={t} style={{ padding: '10px 0 12px', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? CV.ink : CV.inkMute, borderBottom: i === 0 ? `2px solid ${CV.ink}` : 'none' }}>{t}</div>
        ))}
      </div>

      {/* Temp probability card */}
      <div style={{ padding: '18px 22px 10px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Temperature · probability</div>
        <ProbBar label="Above normal" value={62} color="#c44b3e" />
        <ProbBar label="Near normal" value={25} color={CV.inkMute} />
        <ProbBar label="Below normal" value={13} color="#3a6b9e" />
      </div>

      {/* Mini US heatmap */}
      <div style={{ padding: '4px 22px 16px' }}>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 8, padding: 12 }}>
          <UsProbMap />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', fontSize: 10, fontFamily: CV.mono, color: CV.inkMute, marginTop: 8, letterSpacing: 0.3 }}>
            <span>Much cooler</span><span>Near normal</span><span>Much warmer</span>
          </div>
          <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
            {['#2c5a8e','#6ba3cf','#e5ddce','#e8a87c','#c44b3e'].map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
          </div>
        </div>
      </div>

      {/* Precipitation */}
      <div style={{ padding: '0 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Precipitation · probability</div>
        <ProbBar label="Above normal" value={31} color="#2c7a3e" />
        <ProbBar label="Near normal" value={42} color={CV.inkMute} />
        <ProbBar label="Below normal" value={27} color="#b88a3e" />
      </div>

      {/* Context */}
      <div style={{ padding: '4px 22px 20px' }}>
        <div style={{ background: CV.blueSoft, border: `1px solid ${CV.blue}22`, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, color: CV.blue, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>Why this matters</div>
          <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 6, color: CV.inkSoft }}>
            Your last 3 Mays averaged <b>68.4°F</b>. The 30-year normal is <b>65.1°F</b>. If this outlook verifies, expect another warm month — plan cooling costs and outdoor work accordingly.
          </div>
        </div>
      </div>
    </div>
  );
}

function ProbBar({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
      <div style={{ width: 110, fontSize: 13 }}>{label}</div>
      <div style={{ flex: 1, height: 10, background: CV.paperSoft, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color }} />
      </div>
      <div style={{ width: 40, fontSize: 12, fontFamily: CV.mono, fontWeight: 600, textAlign: 'right' }}>{value}%</div>
    </div>
  );
}

function UsProbMap() {
  // stylized US outline with shaded probability regions
  return (
    <svg width="100%" height="130" viewBox="0 0 320 130">
      {/* crude US silhouette via polygons */}
      <path d="M30 60 L60 45 L100 40 L150 35 L220 40 L270 50 L290 65 L285 85 L260 100 L200 105 L150 100 L100 95 L60 90 L35 80 Z" fill="#e5ddce" stroke={CV.line} strokeWidth="1" />
      {/* west - much warmer */}
      <path d="M30 60 L80 45 L100 40 L110 80 L60 90 L35 80 Z" fill="#c44b3e" opacity="0.7" />
      {/* midwest - warmer */}
      <path d="M110 42 L170 38 L180 95 L110 95 Z" fill="#e8a87c" opacity="0.75" />
      {/* southeast - near normal */}
      <path d="M180 70 L240 75 L250 100 L200 105 L180 95 Z" fill="#e5ddce" opacity="0.8" />
      {/* northeast - warmer */}
      <path d="M220 40 L270 50 L280 75 L240 75 L220 55 Z" fill="#e8a87c" opacity="0.7" />
      {/* your location marker */}
      <circle cx="245" cy="68" r="5" fill={CV.ink} />
      <circle cx="245" cy="68" r="10" fill="none" stroke={CV.ink} strokeWidth="1.5" />
      <text x="255" y="66" fontSize="10" fontFamily={CV.mono} fill={CV.ink} fontWeight="600">You</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. HeatRisk — WPC
// ─────────────────────────────────────────────────────────────
function HeatRiskScreen() {
  const days = [
    ['Wed', 0, 'No risk'],
    ['Thu', 1, 'Minor'],
    ['Fri', 2, 'Moderate'],
    ['Sat', 3, 'Major'],
    ['Sun', 4, 'Extreme'],
    ['Mon', 3, 'Major'],
    ['Tue', 2, 'Moderate'],
  ];
  const colors = ['#c8d4e0', '#e8c96a', '#e8883e', '#c44b3e', '#6b2361'];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CV.inkMute, fontWeight: 600 }}>HeatRisk · next 7 days</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Dangerous heat Saturday</div>
        <div style={{ fontSize: 13, color: CV.inkMute, marginTop: 4, lineHeight: 1.4 }}>Cumulative heat stress peaks this weekend. Overnight recovery poor.</div>
      </div>

      {/* Today card */}
      <div style={{ padding: '16px 22px 10px' }}>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 10, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, background: colors[0], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 600, color: CV.ink, fontFamily: CV.mono }}>0</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>No risk today</div>
              <div style={{ fontSize: 13, color: CV.inkMute, marginTop: 2 }}>High 71° · low 52° · dewpoint 48°</div>
              <div style={{ fontSize: 12, color: CV.inkSoft, marginTop: 6, lineHeight: 1.4 }}>Cool night recovers the body fully. No action needed.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-day heat strip */}
      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>7-day heat trajectory</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {days.map(([d, lv, name], i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontFamily: CV.mono, color: CV.inkMute, marginBottom: 4 }}>{d}</div>
              <div style={{ height: 56, background: colors[lv], borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lv >= 3 ? '#fff' : CV.ink, fontFamily: CV.mono, fontWeight: 700, fontSize: 16 }}>{lv}</div>
              <div style={{ fontSize: 9.5, color: CV.inkMute, marginTop: 3, fontFamily: CV.mono, letterSpacing: 0.3 }}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Who's at risk */}
      <div style={{ padding: '10px 22px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Who should be careful Saturday</div>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 8 }}>
          {[
            ['Older adults (65+)', 'Reduced sweat response; overnight recovery inadequate'],
            ['People without A/C', 'Indoor temps stay >80° overnight'],
            ['Outdoor workers', 'Heat stroke risk after 11 AM'],
            ['Young children, pets', 'Hot car deaths peak at this heat level'],
          ].map(([who, why], i, arr) => (
            <div key={i} style={{ padding: '10px 14px', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${CV.line}` }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{who}</div>
              <div style={{ fontSize: 12, color: CV.inkMute, marginTop: 2, lineHeight: 1.35 }}>{why}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 22px 20px' }}>
        <div style={{ background: CV.blueSoft, border: `1px solid ${CV.blue}22`, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: 1.45, color: CV.inkSoft }}>
          <b>Find a cooling center</b> — 4 public facilities within 2 miles open Sat 10 AM – 8 PM. Tap for map.
        </div>
      </div>

      <DataProvenance source="WPC HeatRisk · NWS" issued="Apr 23, 11:42 AM" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Aurora — SWPC
// ─────────────────────────────────────────────────────────────
function AuroraScreen() {
  return (
    <div className="sb" style={{ width: '100%', height: '100%', background: '#050814', color: '#fff', fontFamily: CV.font, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />

      {/* Aurora sky viz */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, rgba(80, 220, 140, 0.5) 0%, rgba(40, 180, 220, 0.2) 30%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 110%, rgba(180, 100, 220, 0.25) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 130%, rgba(100, 200, 180, 0.25) 0%, transparent 40%)' }} />
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${(i * 7.3) % 80}%`, left: `${(i * 13.7) % 100}%`, width: 1.5, height: 1.5, borderRadius: 2, background: '#fff', opacity: 0.3 + ((i * 7) % 7) / 10 }} />
        ))}
        {/* Horizon silhouette */}
        <svg width="100%" height="50" viewBox="0 0 400 50" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <path d="M0 50 L0 35 L40 30 L70 38 L110 25 L160 32 L200 22 L250 35 L300 28 L350 38 L400 32 L400 50 Z" fill="#050814" />
        </svg>
      </div>

      <div style={{ padding: '16px 22px 8px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: '#8aa3c7', fontWeight: 600 }}>Aurora forecast · tonight</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, marginTop: 4, textWrap: 'balance' }}>Visible from your location · low on horizon</div>
        <div style={{ fontSize: 13, color: '#b8c6dc', marginTop: 6 }}>Kp 6 expected at 11 PM. Look N · clear skies · no moon.</div>
      </div>

      <div style={{ padding: '10px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <AuroraStat label="Kp index" val="6" sub="G2 storm" />
        <AuroraStat label="Best viewing" val="11 PM – 2 AM" sub="after moonset" />
        <AuroraStat label="Your latitude" val="38.99°N" sub="edge of visibility" />
        <AuroraStat label="Sky clarity" val="Clear" sub="5% cloud" />
      </div>

      {/* Kp chart */}
      <div style={{ padding: '10px 22px' }}>
        <div style={{ fontSize: 10.5, color: '#8aa3c7', fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>3-day Kp forecast</div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 10px 8px' }}>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 60 }}>
            {[2,3,3,4,5,6,6,5,4,3,3,2,3,4,4,3,2,2,3,3,2,2,3,3].map((kp, i) => (
              <div key={i} style={{ flex: 1, height: `${(kp/9)*100}%`, background: kp >= 5 ? '#6bd890' : kp >= 4 ? '#4ab5cf' : '#4466aa', borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, fontFamily: CV.mono, color: '#8aa3c7', marginTop: 4 }}>
            <span>NOW</span><span>+24h</span><span>+48h</span><span>+72h</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 22px 14px' }}>
        <div style={{ background: 'rgba(107, 216, 144, 0.12)', border: '1px solid rgba(107, 216, 144, 0.3)', borderRadius: 8, padding: '10px 12px', fontSize: 12.5, lineHeight: 1.4 }}>
          <b>Alert enabled.</b> We'll ping you if Kp climbs above 5 tonight.
        </div>
      </div>
    </div>
  );
}

function AuroraStat({ label, val, sub }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ fontSize: 9.5, color: '#8aa3c7', fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: CV.mono, marginTop: 3 }}>{val}</div>
      <div style={{ fontSize: 10.5, color: '#8aa3c7', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Flood inundation — street-level
// ─────────────────────────────────────────────────────────────
function FloodScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CV.inkMute, fontWeight: 600 }}>Flood inundation</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4, textWrap: 'balance' }}>Your street · <span style={{ color: CV.watch }}>at risk</span></div>
        <div style={{ fontSize: 13, color: CV.inkMute, marginTop: 4, lineHeight: 1.4 }}>If 3 inches of rain falls in the next 6 hours, Sligo Creek is projected to crest over Dale Dr.</div>
      </div>

      {/* Map with flood overlay */}
      <div style={{ position: 'relative', height: 240, background: '#e8e4dc' }}>
        <svg width="100%" height="240" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
          {/* street grid */}
          <g stroke="#b8b0a0" strokeWidth="1" fill="none">
            <path d="M0 40 L400 45" /><path d="M0 100 L400 110" /><path d="M0 160 L400 165" /><path d="M0 210 L400 215" />
            <path d="M60 0 L55 240" /><path d="M150 0 L145 240" /><path d="M240 0 L235 240" /><path d="M330 0 L325 240" />
          </g>
          {/* creek */}
          <path d="M0 120 Q80 130 140 115 T260 130 T400 120" stroke="#4a7eb3" strokeWidth="3" fill="none" />
          {/* flood zones */}
          <path d="M0 118 Q80 130 140 113 T260 132 T400 118 L400 140 Q260 150 140 135 T0 138 Z" fill={CV.watch} opacity="0.3" />
          <path d="M0 123 Q80 133 140 118 T260 136 T400 123 L400 132 Q260 142 140 126 T0 130 Z" fill={CV.warning} opacity="0.35" />
          {/* your home */}
          <g transform="translate(200, 95)">
            <circle r="10" fill={CV.ink} />
            <circle r="5" fill="#fff" />
          </g>
          <text x="215" y="96" fontSize="10" fontFamily={CV.mono} fontWeight="600" fill={CV.ink}>Home</text>
          {/* creek label */}
          <text x="300" y="115" fontSize="9" fontFamily={CV.mono} fill="#4a7eb3" fontWeight="600">Sligo Creek</text>
        </svg>
      </div>

      {/* Rainfall scenario slider */}
      <div style={{ padding: '16px 22px 10px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Rainfall scenario · drag to explore</div>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: CV.mono, color: CV.inkMute, marginBottom: 10 }}>
            <span>0"</span><span>1"</span><span>2"</span><span style={{ color: CV.watch, fontWeight: 700 }}>3"</span><span>4"</span><span>5"+</span>
          </div>
          <div style={{ height: 6, background: CV.paperSoft, borderRadius: 3, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: `linear-gradient(90deg, #2b8a3e 0%, ${CV.advisory} 50%, ${CV.watch} 100%)`, borderRadius: 3 }} />
            <div style={{ position: 'absolute', left: '60%', top: -5, width: 16, height: 16, borderRadius: 16, background: CV.ink, border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
          </div>
          <div style={{ fontSize: 12, color: CV.inkSoft, marginTop: 10 }}>
            <b>At 3 inches:</b> Creek rises 4.2 ft. Dale Dr. impassable. Basement flooding possible in 200 block.
          </div>
        </div>
      </div>

      {/* Current forecast */}
      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ background: CV.blueSoft, border: `1px solid ${CV.blue}22`, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, color: CV.blue, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>Tonight's forecast</div>
          <div style={{ fontSize: 14, lineHeight: 1.45, marginTop: 6 }}><b>2.4 inches expected</b> — below flood threshold. Monitoring rate of rise.</div>
        </div>
      </div>

      <DataProvenance source="National Water Prediction Service · NWM v3" issued="Apr 23, 11:15 AM" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. SKYWARN community reports
// ─────────────────────────────────────────────────────────────
function SkywarnScreen() {
  const reports = [
    ['12:42 PM', '2.1 mi N', '1.00" hail', 'Verified · Spotter K3RJB'],
    ['12:18 PM', '4.3 mi NW', 'Wall cloud sighted', 'Verified · Spotter N4VGT'],
    ['11:55 AM', '6.7 mi W', 'Wind damage, trees down', 'NWS-confirmed'],
    ['11:30 AM', '1.8 mi S', 'Funnel cloud, brief', 'Unconfirmed · user report'],
  ];
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CV.inkMute, fontWeight: 600 }}>Community reports · SKYWARN</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>Live ground truth near you</div>
        <div style={{ fontSize: 13, color: CV.inkMute, marginTop: 4, lineHeight: 1.4 }}>From NWS-trained spotters and verified observers. Your reports go to the Baltimore/Washington forecast office.</div>
      </div>

      {/* Map */}
      <div style={{ position: 'relative', height: 200, background: '#e8e4dc' }}>
        <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <g stroke="#b8b0a0" strokeWidth="1" fill="none">
            {[...Array(8)].map((_, i) => <path key={`h${i}`} d={`M0 ${i*28} L400 ${i*28+2}`} />)}
            {[...Array(10)].map((_, i) => <path key={`v${i}`} d={`M${i*45} 0 L${i*45-3} 200`} />)}
          </g>
          {/* your location */}
          <circle cx="200" cy="100" r="6" fill={CV.blue} />
          <circle cx="200" cy="100" r="20" fill="none" stroke={CV.blue} strokeWidth="1" strokeDasharray="3 2" />
          {/* report pins */}
          {[[240, 60, 'hail'], [130, 50, 'wall'], [95, 115, 'wind'], [175, 148, 'funnel']].map(([x, y, k], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill={k === 'funnel' || k === 'wall' ? CV.warning : CV.watch} />
              <text x={x} y={y + 3} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" fontFamily={CV.mono}>●</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Reports list */}
      <div style={{ padding: '14px 0 0' }}>
        {reports.map(([time, dist, desc, src], i) => (
          <div key={i} style={{ padding: '12px 22px', borderBottom: `1px solid ${CV.line}`, display: 'flex', gap: 12 }}>
            <div style={{ width: 56, fontSize: 11, fontFamily: CV.mono, color: CV.inkMute }}>{time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{desc}</div>
              <div style={{ fontSize: 11.5, color: CV.inkMute, marginTop: 2, fontFamily: CV.mono }}>{dist} · {src}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit CTA */}
      <div style={{ padding: '16px 22px 20px' }}>
        <div style={{ background: CV.ink, color: CV.paper, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke={CV.paper} strokeWidth="1.6" strokeLinecap="round"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Submit a report</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 1 }}>Shared directly with your local NWS office</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: CV.inkMute, marginTop: 10, textAlign: 'center', lineHeight: 1.4 }}>
          350,000+ SKYWARN spotters nationwide feed into the same alerting system.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECONDARY — Safety drawer (triggered by a warning)
// ─────────────────────────────────────────────────────────────
function SafetyDrawer() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ background: CV.warning, color: '#fff', padding: '16px 22px' }}>
        <div style={{ fontSize: 10.5, letterSpacing: 1.8, textTransform: 'uppercase', fontWeight: 700, opacity: 0.9 }}>● Red flag warning · active</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4, marginTop: 6 }}>Wildfire safety</div>
      </div>

      <div style={{ padding: '18px 22px 8px' }}>
        <div style={{ fontSize: 14, lineHeight: 1.5, textWrap: 'pretty' }}>
          Low humidity + 40mph gusts + dry fuels mean any spark can grow into a fast-moving fire. Here's what to do right now.
        </div>
      </div>

      {/* Right now */}
      <SafetyBlock title="Right now" items={[
        'No outdoor burning, grilling, or welding',
        'Park vehicles on paved surfaces only — catalytic converters ignite dry grass',
        'Avoid dragging trailer chains; sparks start fires',
        'Clear the 5-foot zone around your home of combustibles',
      ]} />

      <SafetyBlock title="If you see smoke" items={[
        'Call 911 immediately — don\'t wait',
        'Note location: nearest intersection, landmark, highway mile marker',
        'Move upwind and uphill if safe; never drive through smoke',
      ]} />

      <SafetyBlock title="Evacuation readiness" items={[
        'Keep a go-bag within reach: meds, documents, phone charger, water',
        'Back your car into the driveway, windows up',
        'Know two routes out of your neighborhood',
      ]} last />

      <div style={{ padding: '4px 22px 20px' }}>
        <div style={{ fontSize: 11, color: CV.inkMute, lineHeight: 1.5, textAlign: 'center' }}>
          Guidance from NWS /safety/wildfire · CAL FIRE · Ready.gov
        </div>
      </div>
    </div>
  );
}

function SafetyBlock({ title, items, last }) {
  return (
    <div style={{ padding: '10px 22px', borderBottom: last ? 'none' : `1px solid ${CV.line}` }}>
      <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.4 }}>
            <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 9, background: CV.paperSoft, border: `1px solid ${CV.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: CV.ink, marginTop: 1 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>{it}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECONDARY — Historical context screen ("Today vs. normal")
// ─────────────────────────────────────────────────────────────
function HistoricalScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '14px 22px', borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: CV.inkMute, fontWeight: 600 }}>Today in context · April 23</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4 }}>A warm, typical spring day</div>
      </div>

      <div style={{ padding: '18px 22px 10px' }}>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Today's forecast vs. normal</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ fontSize: 40, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1, fontFamily: CV.font }}>71°</div>
            <div style={{ fontSize: 13, color: '#2b8a3e' }}>+4° above normal</div>
          </div>
          <div style={{ fontSize: 12, color: CV.inkMute, marginTop: 6, fontFamily: CV.mono }}>30-year normal: 67° · record high: 91° (2012)</div>
        </div>
      </div>

      {/* Year of temps */}
      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Temperature · last 12 months vs. normal</div>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 8, padding: 14 }}>
          <svg width="100%" height="110" viewBox="0 0 320 110">
            {/* normal band */}
            <path d="M10 55 Q40 70 70 65 T130 50 T190 25 T250 35 T310 55" stroke={CV.inkMute} strokeWidth="1" strokeDasharray="3 3" fill="none" />
            {/* actual */}
            <path d="M10 58 Q40 68 70 60 T130 45 T190 20 T250 30 T310 48" stroke={CV.warning} strokeWidth="2" fill="none" />
            {[10, 70, 130, 190, 250, 310].map((x, i) => {
              const y = [58, 60, 45, 20, 30, 48][i];
              return <circle key={i} cx={x} cy={y} r="2.5" fill={CV.warning} />;
            })}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: CV.inkMute, fontFamily: CV.mono, marginTop: 4 }}>
            <span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span><span>JAN</span><span>MAR</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${CV.line}`, fontSize: 11, fontFamily: CV.mono, color: CV.inkSoft }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 2, background: CV.warning }} /> Actual</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 1, background: CV.inkMute, borderTop: '1px dashed' }} /> Normal</span>
          </div>
        </div>
      </div>

      {/* This day in history */}
      <div style={{ padding: '4px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>This day in local weather history</div>
        <div style={{ background: '#fff', border: `1px solid ${CV.line}`, borderRadius: 8 }}>
          {[
            ['1912', 'Coldest April 23 on record', '29°F · light snow flurries'],
            ['1967', '4 tornadoes touched down in the metro', 'EF2 in Silver Spring, 3 injured'],
            ['2012', 'Hottest April 23 on record', '91°F · heat index 97°'],
            ['2019', '4.8" rain in 3 hours', 'Sligo Creek crested +6 ft'],
          ].map(([yr, title, sub], i, arr) => (
            <div key={i} style={{ padding: '12px 14px', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${CV.line}`, display: 'flex', gap: 12 }}>
              <div style={{ width: 44, fontSize: 15, fontWeight: 700, fontFamily: CV.mono, color: CV.blue }}>{yr}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 12, color: CV.inkMute, marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataProvenance source="NWS COOP · station KDCA · 1892–present" issued="Updated daily" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECONDARY — Data provenance footer component + standalone screen
// ─────────────────────────────────────────────────────────────
function DataProvenance({ source, issued }) {
  return (
    <div style={{ padding: '14px 22px 24px', borderTop: `1px solid ${CV.line}`, marginTop: 8 }}>
      <div style={{ fontSize: 10, color: CV.inkMute, fontFamily: CV.mono, letterSpacing: 0.8, lineHeight: 1.5 }}>
        ◇ {source}<br />Issued {issued}
      </div>
    </div>
  );
}

function ProvenanceScreen() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: CV.paper, fontFamily: CV.font, color: CV.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${CV.line}` }}>
        <div style={{ fontSize: 16, color: CV.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>How this forecast was made</div>
      </div>

      <div style={{ padding: '18px 22px' }}>
        <div style={{ fontSize: 15, lineHeight: 1.5, color: CV.inkSoft, textWrap: 'pretty' }}>
          Your forecast is blended from three authoritative sources, weighted by skill at each forecast horizon.
        </div>
      </div>

      <div style={{ padding: '0 22px 14px' }}>
        {[
          ['Baltimore/Washington Forecast Office', 'The local NWS meteorologists who issue watches, warnings, and the written discussion for your area.', 'LWX · staffed 24/7'],
          ['High-Resolution Rapid Refresh (HRRR)', 'Updated hourly at 3km resolution. Drives 0–18 hour predictions — short-term rain, wind, severe storms.', 'NCEP · 18z cycle'],
          ['Global Forecast System (GFS)', 'The backbone 7-day model from NWS. 13km resolution, updated 4× daily.', 'NCEP · 12z cycle'],
          ['National Blend of Models (NBM)', 'Statistical blend that reduces individual model biases for the 7–10 day picture.', 'NWS v4.2 · 11z'],
        ].map(([name, desc, meta], i, arr) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${CV.line}` }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 13, color: CV.inkSoft, marginTop: 4, lineHeight: 1.45 }}>{desc}</div>
            <div style={{ fontSize: 11, color: CV.inkMute, marginTop: 6, fontFamily: CV.mono }}>◇ {meta}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 22px 20px' }}>
        <div style={{ background: CV.blueSoft, border: `1px solid ${CV.blue}22`, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: 1.45, color: CV.inkSoft }}>
          Skybureau is a public-service interface on top of National Weather Service data. All forecasts and alerts originate with NWS — we make them easier to read and act on.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SeasonalOutlook, HeatRiskScreen, AuroraScreen, FloodScreen, SkywarnScreen,
  SafetyDrawer, HistoricalScreen, ProvenanceScreen, DataProvenance,
});
