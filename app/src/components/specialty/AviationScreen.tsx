import './AviationScreen.css';

interface Props {
  onBack: () => void;
}

const CAT_COLORS: Record<string, string> = {
  vfr: '#2b8a3e',
  mvfr: '#1864ab',
  ifr: '#c92a2a',
  lifr: '#862e9c',
};

const FORECAST_CATS = ['vfr','vfr','vfr','vfr','vfr','mvfr','mvfr','ifr','ifr','mvfr','vfr','vfr'];

const WINDS_ALOFT = [
  { fl: '030', wind: '24015', temp: '+15', notes: '—' },
  { fl: '060', wind: '25025', temp: '+09', notes: '—' },
  { fl: '090', wind: '26035', temp: '+02', notes: '—' },
  { fl: '120', wind: '27048', temp: '-10', notes: '—' },
  { fl: '180', wind: '28065', temp: '-23', notes: '—' },
  { fl: '240', wind: '29082', temp: '-38', notes: '—' },
];

export function AviationScreen({ onBack }: Props) {
  return (
    <div className="avn sb-scroll">
      {/* Sub-navigation header */}
      <div className="avn-nav">
        <button className="avn-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="avn-nav-title">Aviation</div>
        <div className="avn-nav-crumb">Specialty</div>
      </div>

      {/* Station header */}
      <div className="avn-station">
        <div className="avn-icao">KDCA</div>
        <div className="avn-name">Reagan National</div>
        <div className="avn-spacer" />
        <div className="avn-cat" style={{ background: CAT_COLORS.vfr }}>VFR</div>
      </div>

      {/* METAR / TAF raw text */}
      <div className="avn-raw">
        <div className="avn-raw-label">METAR</div>
        KDCA 231747Z 24008KT 10SM FEW045 SCT250 19/09 A3012
        <div className="avn-raw-taf">
          <div className="avn-raw-label">TAF</div>
          KDCA 231720Z 2318/2424 23008KT P6SM FEW050<br />
          &nbsp;&nbsp;FM240200 15006KT P6SM OVC040<br />
          &nbsp;&nbsp;FM240900 18012G20KT 4SM -RA OVC015
        </div>
      </div>

      {/* Ceiling & visibility readout */}
      <div className="avn-sec">Current conditions</div>
      <div className="avn-readout">
        <div className="avn-readout-card">
          <div className="avn-readout-label">Ceiling</div>
          <div className="avn-readout-val">4500</div>
          <div className="avn-readout-sub">FEW at 4500 ft</div>
        </div>
        <div className="avn-readout-card">
          <div className="avn-readout-label">Visibility</div>
          <div className="avn-readout-val">10 SM</div>
          <div className="avn-readout-sub">Unrestricted</div>
        </div>
      </div>

      {/* Flight category strip */}
      <div className="avn-sec">Forecast conditions &middot; 24h</div>
      <div className="avn-strip">
        <div className="avn-strip-bars">
          {FORECAST_CATS.map((c, i) => (
            <div key={i} className="avn-strip-bar" style={{ background: CAT_COLORS[c] }} />
          ))}
        </div>
        <div className="avn-strip-times">
          <span>18Z</span><span>00Z</span><span>06Z</span><span>12Z</span><span>18Z</span>
        </div>
        <div className="avn-legend">
          {(['vfr', 'mvfr', 'ifr', 'lifr'] as const).map((cat) => (
            <div key={cat} className="avn-legend-item">
              <div className="avn-legend-dot" style={{ background: CAT_COLORS[cat] }} />
              <span>{cat.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Winds aloft */}
      <div className="avn-sec">Winds aloft &middot; FD</div>
      <div className="avn-winds-wrap">
        <div className="avn-winds">
          <div className="avn-winds-head">
            <span>FL</span><span>Wind</span><span>Temp</span><span>Notes</span>
          </div>
          {WINDS_ALOFT.map((row, i) => (
            <div key={i} className="avn-winds-row">
              <span className="avn-winds-fl">{row.fl}</span>
              <span>{row.wind}</span>
              <span>{row.temp}</span>
              <span className="avn-winds-note">{row.notes}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="avn-footer">
        &loz; Aviation Weather Center &middot; NWS<br />
        METAR 231747Z &middot; TAF 231720Z
      </div>
    </div>
  );
}
