import './MoreScreen.css';

interface Props {
  onNavigate: (screen: string) => void;
}

function RowIcon({ children }: { children: React.ReactNode }) {
  return <div className="more-row-icon">{children}</div>;
}

function Row({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub?: string; onClick?: () => void }) {
  return (
    <div className="more-row" role="button" tabIndex={0} onClick={onClick} onKeyDown={e => { if (e.key === 'Enter') onClick?.(); }}>
      <RowIcon>{icon}</RowIcon>
      <div className="more-row-body">
        <div className="more-row-title">{title}</div>
        {sub && <div className="more-row-sub">{sub}</div>}
      </div>
      <span className="more-row-caret">&#x203A;</span>
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="more-group-label">{children}</div>;
}

/* ── Inline SVG icons (18x18, stroke 1.6) ── */
const ICO = { w: 18, h: 18, sw: 1.6 };

  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.4 6.3L12 17l-5.6 3.3L7.8 14 3 9.6 9.4 9 12 3z" />
  </svg>
);
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8" />
  </svg>
);
const PinIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const AnchorIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <circle cx="12" cy="5" r="2" /><path d="M12 7v13M5 14c0 3.5 3.5 6 7 6s7-2.5 7-6M8 11h8" />
  </svg>
);
const PlaneIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M3 13l18-8-7 16-2-6-9-2z" />
  </svg>
);
const FlameIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M12 3c1 3 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 1-5 .5 1.5 1.5 2 3-4z" />
  </svg>
);
const WaveIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <path d="M3 12c3 0 3-3 6-3s3 3 6 3 3-3 6-3M3 17c3 0 3-3 6-3s3 3 6 3 3-3 6-3" />
  </svg>
);
const AuroraIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <path d="M4 20c2-10 4-13 8-13s6 3 8 13M8 20c1-6 2-8 4-8s3 2 4 8" />
  </svg>
);
const PollenIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw}>
    <circle cx="12" cy="12" r="3" /><circle cx="12" cy="4" r="1.5" /><circle cx="12" cy="20" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="20" cy="12" r="1.5" />
  </svg>
);
const DroughtIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M12 3c3 5 6 8 6 12a6 6 0 1 1-12 0c0-4 3-7 6-12z" /><path d="M9 20c0-2 .5-3 1.5-4" strokeLinecap="round" />
  </svg>
);
const QuakeIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round" strokeLinecap="round">
    <path d="M3 12h2l2-5 3 10 3-14 3 12 2-3h3" />
  </svg>
);
const RiverIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <path d="M3 8c3 0 3 2 6 2s3-2 6-2 3 2 6 2M3 14c3 0 3 2 6 2s3-2 6-2 3 2 6 2" />
  </svg>
);
const GearIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </svg>
);
const InfoIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw}>
    <circle cx="12" cy="12" r="9" /><path d="M12 8h0M12 11v5" strokeWidth={ICO.sw + 0.3} strokeLinecap="round" />
  </svg>
);
const QuestionIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3V14M12 17h0" />
  </svg>
);
const HeartIcon = () => (
  <svg width={ICO.w} height={ICO.h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICO.sw} strokeLinejoin="round">
    <path d="M12 20s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 9c0 6.5-7 11-7 11z" />
  </svg>
);

export function MoreScreen({ onNavigate }: Props) {
  return (
    <div className="more-root sb-scroll">
      {/* Page header */}
      <div className="more-header">
        <div className="more-title">More</div>
        <div className="more-subtitle">Specialty products, civic data, and everything else.</div>
      </div>

      {/* Featured: Brief + Ask two-up tiles */}
      <div className="more-featured">
        <div className="more-tile more-tile-dark" onClick={() => onNavigate('brief')}>
          <div className="more-tile-eyebrow">Morning brief</div>
          <div className="more-tile-name">Skybureau Brief</div>
          <div className="more-tile-desc">Personalized digest</div>
        </div>
        <div className="more-tile more-tile-light" onClick={() => onNavigate('ask')}>
          <div className="more-tile-eyebrow">Ask</div>
          <div className="more-tile-name">Ask Skybureau</div>
          <div className="more-tile-desc">Weather Q&amp;A</div>
        </div>
      </div>

      {/* Locations */}
      <GroupLabel>Locations</GroupLabel>
      <div>
        <Row icon={<PinIcon />} title="Saved locations" sub="Manage your saved places" />
      </div>

      {/* Specialty products */}
      <GroupLabel>Specialty products</GroupLabel>
      <div>
        <Row icon={<AnchorIcon />} title="Marine" sub="Coastal, offshore, high seas" onClick={() => onNavigate('marine')} />
        <Row icon={<PlaneIcon />} title="Aviation" sub="METAR, TAF, SIGMET" onClick={() => onNavigate('aviation')} />
        <Row icon={<FlameIcon />} title="Fire weather" sub="RH, wind, red-flag conditions" onClick={() => onNavigate('fire')} />
        <Row icon={<WaveIcon />} title="Hurricane" sub="Active tropical systems" />
        <Row icon={<AuroraIcon />} title="Aurora" sub="Kp forecast, cloud cover" />
      </div>

      {/* Civic data */}
      <GroupLabel>Civic data</GroupLabel>
      <div>
        <Row icon={<PollenIcon />} title="Air Quality" sub="AQI, pollutants, sensor map" />
        <Row icon={<DroughtIcon />} title="Drought" sub="U.S. Drought Monitor" />
        <Row icon={<QuakeIcon />} title="Earthquake" sub="USGS seismic data" />
        <Row icon={<RiverIcon />} title="River gauges" sub="AHPS hydrograph, nearest gauge" />
      </div>

      {/* Settings */}
      <GroupLabel>Settings</GroupLabel>
      <div>
        <Row icon={<GearIcon />} title="Settings" sub="Units, alerts, notifications, radar style" onClick={() => onNavigate('settings')} />
      </div>

      {/* About */}
      <GroupLabel>About</GroupLabel>
      <div>
        <Row icon={<InfoIcon />} title="Data sources" sub="NWS, MRMS, HRRR, ECMWF" />
        <Row icon={<QuestionIcon />} title="Help & feedback" />
        <Row icon={<HeartIcon />} title="What's new" sub="Latest updates" />
      </div>

      {/* Footer */}
      <div className="more-footer">
        skybureau<br />
        <span className="more-footer-sub">public-service weather data from NWS, NOAA, USGS</span>
      </div>
    </div>
  );
}
