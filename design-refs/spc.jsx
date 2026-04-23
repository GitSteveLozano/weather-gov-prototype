// SPC Convective Outlook — Dive-depth severe weather view
const SP = SB_TOKENS;

// Categorical risk colors (SPC-inspired scale, reworked)
const SPC_COLORS = {
  tstm: '#c7e8c7',      // general thunder
  marginal: '#7ec850',  // MRGL — 1
  slight: '#f7e054',    // SLGT — 2
  enhanced: '#e8883e',  // ENH  — 3
  moderate: '#c44b3e',  // MDT  — 4
  high: '#a81e5b',      // HIGH — 5
};

function SPCOutlook() {
  return (
    <div className="sb sb-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', background: SP.paper, fontFamily: SP.font, color: SP.ink }}>
      <div style={{ height: 54 }} />
      <div style={{ padding: '10px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${SP.line}` }}>
        <div style={{ fontSize: 16, color: SP.inkMute }}>‹</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Severe weather outlook</div>
        <div style={{ fontSize: 9, fontFamily: SP.mono, color: SP.inkMute, padding: '2px 6px', background: SP.paperSoft, borderRadius: 3, letterSpacing: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Dive</div>
      </div>

      <div style={{ padding: '14px 22px 8px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: SP.inkMute, fontWeight: 600 }}>Day 1 · today</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginTop: 4, textWrap: 'balance' }}>
          <span style={{ color: SPC_COLORS.enhanced }}>Enhanced risk</span> of severe storms
        </div>
        <div style={{ fontSize: 13, color: SP.inkMute, marginTop: 4, lineHeight: 1.4 }}>
          Your area included · tornadoes, wind, hail possible between 3–9 PM
        </div>
      </div>

      {/* Day tabs */}
      <div style={{ display: 'flex', gap: 20, padding: '8px 22px 0', borderBottom: `1px solid ${SP.line}` }}>
        {['Day 1', 'Day 2', 'Day 3', '4–8'].map((d, i) => (
          <div key={d} style={{ padding: '10px 0 12px', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? SP.ink : SP.inkMute, borderBottom: i === 0 ? `2px solid ${SP.ink}` : 'none' }}>{d}</div>
        ))}
      </div>

      {/* Categorical map */}
      <div style={{ padding: '14px 14px 8px' }}>
        <div style={{ background: '#fff', border: `1px solid ${SP.line}`, borderRadius: 10, overflow: 'hidden' }}>
          <svg width="100%" height="210" viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet">
            {/* US silhouette */}
            <path d="M30 70 L70 55 L130 45 L210 42 L290 50 L320 65 L330 95 L315 130 L280 150 L220 160 L150 155 L90 145 L50 125 L30 95 Z" fill="#f2ede3" stroke={SP.line} />
            {/* outlook zones - nested categorical */}
            <path d="M110 70 L210 65 L250 85 L260 120 L220 140 L150 140 L100 120 L90 90 Z" fill={SPC_COLORS.marginal} opacity="0.85" />
            <path d="M130 80 L200 78 L235 95 L240 120 L200 130 L150 128 L115 110 L110 95 Z" fill={SPC_COLORS.slight} opacity="0.9" />
            <path d="M150 90 L195 88 L220 105 L215 122 L180 125 L145 118 L135 105 Z" fill={SPC_COLORS.enhanced} opacity="0.95" />
            <path d="M165 100 L195 100 L205 115 L185 122 L160 118 L155 108 Z" fill={SPC_COLORS.moderate} />
            {/* Your location */}
            <g transform="translate(178, 110)">
              <circle r="11" fill="none" stroke={SP.ink} strokeWidth="1.5" />
              <circle r="4" fill={SP.ink} />
            </g>
            <text x="192" y="108" fontSize="10" fontFamily={SP.mono} fontWeight="700" fill={SP.ink}>You</text>
            {/* state lines */}
            <g stroke={SP.line} strokeWidth="0.6" fill="none">
              <path d="M100 45 L95 145" />
              <path d="M170 42 L175 155" />
              <path d="M240 48 L245 150" />
              <path d="M30 100 L320 100" />
            </g>
          </svg>
          {/* legend */}
          <div style={{ padding: '10px 12px', borderTop: `1px solid ${SP.line}` }}>
            <div style={{ display: 'flex', gap: 0, height: 8, borderRadius: 2, overflow: 'hidden' }}>
              {[SPC_COLORS.tstm, SPC_COLORS.marginal, SPC_COLORS.slight, SPC_COLORS.enhanced, SPC_COLORS.moderate, SPC_COLORS.high].map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, fontFamily: SP.mono, color: SP.inkMute, marginTop: 4, letterSpacing: 0.3 }}>
              <span>TSTM</span><span>MRGL</span><span>SLGT</span><span>ENH</span><span>MDT</span><span>HIGH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Probability breakdown */}
      <div style={{ padding: '10px 22px 8px' }}>
        <div style={{ fontSize: 10.5, color: SP.inkMute, fontFamily: SP.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Hazard probabilities · within 25mi of you</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <HazardRow label="Tornado" value={10} hatched color={SPC_COLORS.moderate} />
          <HazardRow label="Damaging wind" value={30} hatched color={SPC_COLORS.enhanced} />
          <HazardRow label="Large hail" value={30} hatched color={SPC_COLORS.slight} />
        </div>
        <div style={{ fontSize: 11, color: SP.inkMute, marginTop: 8, lineHeight: 1.4 }}>
          Hatched — significant threat (EF2+ tornado, 75mph+ wind, 2"+ hail).
        </div>
      </div>

      {/* Mesoscale discussion */}
      <div style={{ padding: '8px 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: SP.inkMute, fontFamily: SP.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Mesoscale discussion · MD 0318</div>
        <div style={{ background: '#fff', border: `1px solid ${SP.line}`, borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontFamily: SP.mono, color: '#fff', background: SPC_COLORS.enhanced, padding: '2px 7px', borderRadius: 3, fontWeight: 700, letterSpacing: 0.5 }}>WATCH LIKELY</div>
            <div style={{ fontSize: 11, color: SP.inkMute, fontFamily: SP.mono }}>Issued 1:18 PM</div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: SP.inkSoft, textWrap: 'pretty' }}>
            Discrete supercells expected to develop along the advancing cold front by 3 PM. Strong mid-level shear (50kt) and steep lapse rates support tornadic potential. Watch issuance likely within 1–2 hours.
          </div>
        </div>
      </div>

      {/* Timing strip */}
      <div style={{ padding: '0 22px 14px' }}>
        <div style={{ fontSize: 10.5, color: SP.inkMute, fontFamily: SP.mono, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Expected timing</div>
        <div style={{ background: '#fff', border: `1px solid ${SP.line}`, borderRadius: 8, padding: '14px 14px 10px' }}>
          <div style={{ display: 'flex', gap: 2, height: 28, borderRadius: 3, overflow: 'hidden' }}>
            {['none','none','none','tstm','marginal','slight','enhanced','moderate','enhanced','slight','marginal','tstm'].map((lv, i) => (
              <div key={i} style={{ flex: 1, background: lv === 'none' ? SP.paperSoft : SPC_COLORS[lv] }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: SP.inkMute, fontFamily: SP.mono, marginTop: 6, letterSpacing: 0.3 }}>
            <span>12P</span><span>3P</span><span>6P</span><span>9P</span><span>12A</span>
          </div>
          <div style={{ fontSize: 12.5, color: SP.inkSoft, marginTop: 10, lineHeight: 1.4 }}>
            <b>Peak threat 4–7 PM.</b> Storms diminish after 10 PM as the front passes.
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 22px 20px', borderTop: `1px solid ${SP.line}`, marginTop: 8 }}>
        <div style={{ fontSize: 10, color: SP.inkMute, fontFamily: SP.mono, letterSpacing: 0.8, lineHeight: 1.5 }}>
          ◇ Storm Prediction Center · NWS<br />Day 1 issued Apr 23, 12:30 CDT · next update 19:30 CDT
        </div>
      </div>
    </div>
  );
}

function HazardRow({ label, value, hatched, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 110, fontSize: 13 }}>{label}</div>
      <div style={{ flex: 1, height: 10, background: SP.paperSoft, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: `${value * 2}%`, height: '100%', background: color }} />
        {hatched && <div style={{ position: 'absolute', top: 0, right: `${100 - value * 2}%`, width: 4, height: '100%', background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6) 2px, transparent 2px, transparent 4px)' }} />}
      </div>
      <div style={{ width: 40, fontSize: 12, fontFamily: SP.mono, fontWeight: 600, textAlign: 'right' }}>{value}%</div>
    </div>
  );
}

Object.assign(window, { SPCOutlook });
