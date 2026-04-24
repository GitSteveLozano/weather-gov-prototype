import './WildfireScreen.css';

interface Props {
  onBack: () => void;
}

export function WildfireScreen({ onBack }: Props) {
  return (
    <div className="civ-wf sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-wf-nav">
        <button className="civ-wf-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-wf-nav-title">Wildfire &amp; Smoke</div>
        <div className="civ-wf-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-wf-header">
        <div className="civ-wf-kicker">Wildfire &amp; smoke</div>
        <div className="civ-wf-title">No active events</div>
        <div className="civ-wf-byline">No wildfires currently affecting your area</div>
      </div>

      {/* Empty state */}
      <div className="civ-wf-empty">
        <div className="civ-wf-empty-icon">&loz;</div>
        <div className="civ-wf-empty-msg">
          There are no active wildfires or smoke plumes impacting your location. We will alert you if conditions change.
        </div>
      </div>

      {/* Provenance */}
      <div className="civ-wf-prov">
        <div><span className="civ-wf-prov-diamond">&loz;</span> Source &middot; <span className="civ-wf-prov-val">NIFC &middot; NOAA HRRR-Smoke</span></div>
        <div>Updated &middot; <span className="civ-wf-prov-val">6-hr refresh</span></div>
      </div>
    </div>
  );
}
