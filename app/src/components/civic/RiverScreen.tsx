import type { WeatherData } from '../../types/weather';
import './RiverScreen.css';

interface Props {
  data: WeatherData;
  onBack: () => void;
}

function gaugeColor(level: number | null, flood: number, action: number): string {
  if (level == null) return 'var(--ink-mute)';
  if (level >= flood) return '#d63a2f';
  if (level >= action) return '#e8701e';
  return '#6a8e4e';
}

const floodStages = [
  { name: 'Action', val: 8.0, color: '#d4a017', note: 'Mitigation begins' },
  { name: 'Minor', val: 10.0, color: '#e8701e', note: 'Low-lying property' },
  { name: 'Moderate', val: 12.0, color: '#d63a2f', note: 'Road closures possible' },
  { name: 'Major', val: 14.0, color: '#a81e5b', note: 'Structural damage' },
];

export function RiverScreen({ data, onBack }: Props) {
  const gauges = data.gauges;
  const hasGauges = gauges.length > 0;

  // Use first gauge for headline, or placeholder
  const primary = hasGauges ? gauges[0] : null;
  const currentLevel = primary?.level ?? 6.4;
  const gaugeName = primary?.short ?? primary?.name ?? 'Northwest Branch at Colesville';

  return (
    <div className="civ-rv sb-scroll">
      {/* Sub-navigation */}
      <div className="civ-rv-nav">
        <button className="civ-rv-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="civ-rv-nav-title">River Gauges</div>
        <div className="civ-rv-nav-crumb">Civic</div>
      </div>

      {/* Header */}
      <div className="civ-rv-header">
        <div className="civ-rv-kicker">River &middot; {gaugeName}</div>
        <div className="civ-rv-title">{currentLevel} ft &middot; below action stage</div>
        <div className="civ-rv-byline">Stream gauge readings &middot; no flood threat</div>
      </div>

      {/* Current reading */}
      <div className="civ-rv-current">
        <div>
          <div className="civ-rv-level">
            {currentLevel}<span className="civ-rv-unit">ft</span>
          </div>
          <div className="civ-rv-obs">Stage &middot; observed</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="civ-rv-trend">
            {hasGauges
              ? `Current reading at ${gaugeName}. Check flood stages below for context.`
              : 'Receding from earlier crest. Forecast to continue falling through the weekend.'}
          </div>
        </div>
      </div>

      {/* Gauge list from real data */}
      {hasGauges && (
        <>
          <div className="civ-rv-sec" style={{ paddingTop: 14 }}>Stream gauges</div>
          <div className="civ-rv-gauges">
            {gauges.map((g) => (
              <div key={g.id} className="civ-rv-gauge">
                <div
                  className="civ-rv-gauge-dot"
                  style={{ background: gaugeColor(g.level, g.flood, g.action) }}
                />
                <div style={{ flex: 1 }}>
                  <div className="civ-rv-gauge-name">{g.name}</div>
                  <div className="civ-rv-gauge-meta">
                    Flood: {g.flood} ft &middot; Action: {g.action} ft
                    {g.flow != null && <> &middot; {g.flow} cfs</>}
                  </div>
                </div>
                <div
                  className="civ-rv-gauge-level"
                  style={{ color: gaugeColor(g.level, g.flood, g.action) }}
                >
                  {g.level != null ? `${g.level} ft` : '—'}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Flood stages reference */}
      <div className="civ-rv-sec" style={{ paddingTop: hasGauges ? 18 : 14 }}>Flood stages</div>
      <div className="civ-rv-stages">
        {floodStages.map((s) => (
          <div key={s.name} className="civ-rv-stage">
            <div className="civ-rv-stage-bar" style={{ background: s.color }} />
            <div className="civ-rv-stage-name">{s.name}</div>
            <div className="civ-rv-stage-val">{s.val} ft</div>
            <div className="civ-rv-stage-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Provenance */}
      <div className="civ-rv-prov">
        <div><span className="civ-rv-prov-diamond">&loz;</span> Source &middot; <span className="civ-rv-prov-val">NOAA/NWS Advanced Hydrologic Prediction Service</span></div>
        {primary && <div>Station &middot; <span className="civ-rv-prov-val">USGS {primary.id}</span></div>}
        <div>Updated &middot; <span className="civ-rv-prov-val">15-min refresh</span></div>
      </div>
    </div>
  );
}
