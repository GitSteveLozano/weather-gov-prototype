import './TsunamiScreen.css';

interface Props {
  onBack: () => void;
}

export function TsunamiScreen({ onBack }: Props) {
  return (
    <div className="civ-ts sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-ts-nav">
        <button className="civ-ts-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-ts-nav-title">Tsunami</div>
        <div className="civ-ts-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-ts-header">
        <div className="civ-ts-kicker">Tsunami &middot; NTWC</div>
        <div className="civ-ts-title">No active tsunami threats</div>
        <div className="civ-ts-byline">All U.S. Pacific and Atlantic coasts &middot; no current advisories</div>
      </div>

      {/* Empty state */}
      <div className="civ-ts-empty">
        <div className="civ-ts-empty-icon">&loz;</div>
        <div className="civ-ts-empty-msg">
          Tsunami warnings are issued only for real threats. You will receive an alert if that changes.
        </div>
      </div>

      {/* Provenance */}
      <div className="civ-ts-prov">
        <div><span className="civ-ts-prov-diamond">&loz;</span> Source &middot; <span className="civ-ts-prov-val">NOAA/NWS &middot; National Tsunami Warning Center</span></div>
        <div>Updated &middot; <span className="civ-ts-prov-val">Continuous monitoring</span></div>
      </div>
    </div>
  );
}
