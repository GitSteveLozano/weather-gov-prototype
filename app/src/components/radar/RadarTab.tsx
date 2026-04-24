import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RadarTab.css';

export type RadarStyle = 'clean' | 'enthusiast' | 'narrative';

interface Props {
  radarStyle?: RadarStyle;
  onBack?: () => void;
}

export function RadarTab({ radarStyle = 'clean', onBack }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([21.47, -157.97], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

    const frames = ['nexrad-n0q-m50m', 'nexrad-n0q-m40m', 'nexrad-n0q-m30m', 'nexrad-n0q-m20m', 'nexrad-n0q-m10m', 'nexrad-n0q'];
    const opts: L.TileLayerOptions = { opacity: 0.65, tileSize: 256, maxNativeZoom: 8, maxZoom: 19 };
    const layers = frames.map(f => L.tileLayer(`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/${f}/{z}/{x}/{y}.png`, opts));
    let cur = 0;
    layers[cur].addTo(map);
    animRef.current = setInterval(() => {
      const prev = cur; cur = (cur + 1) % layers.length;
      map.removeLayer(layers[prev]); layers[cur].addTo(map);
    }, 700);

    mapInstance.current = map;
    setTimeout(() => map.invalidateSize(), 200);
    return () => { if (animRef.current) clearInterval(animRef.current); map.remove(); mapInstance.current = null; };
  }, []);

  const togglePlay = () => {
    if (playing && animRef.current) { clearInterval(animRef.current); animRef.current = null; }
    setPlaying(!playing);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <div className="rd">
      <div ref={mapRef} className="rd-map" />

      {/* Top gradient */}
      <div className="rd-top-fade" />

      {/* Top bar */}
      <div className="rd-topbar">
        {onBack && <button className="rd-pill" onClick={onBack}>‹</button>}
        <div className="rd-topbar-info">
          <div className="rd-topbar-label sb-mono">
            Radar · {radarStyle === 'enthusiast' ? 'PHMO composite' : 'Honolulu'}
          </div>
          <div className="rd-topbar-city">Honolulu, HI</div>
        </div>
      </div>

      {/* Nowcast pill */}
      {radarStyle !== 'narrative' && (
        <div className="rd-nowcast">
          <div className="rd-nowcast-dot" />
          <span className="rd-nowcast-text">Rain possible in 45 min</span>
          <span className="rd-nowcast-meta sb-mono">· light · 20m</span>
        </div>
      )}

      {/* Narrative overlay */}
      {radarStyle === 'narrative' && (
        <div className="rd-narrative">
          <div className="rd-narrative-label sb-mono">◇ What this shows</div>
          <div className="rd-narrative-text">
            <span style={{ color: '#ff8c6b', fontWeight: 600 }}>Light showers 12 mi northeast</span> moving
            southwest. Expected to reach your area around <span style={{ fontWeight: 600 }}>
            {now.getHours() + 1}:{now.getMinutes().toString().padStart(2, '0')} PM</span> with
            brief rain for about 20 minutes.
          </div>
          <div className="rd-narrative-conf sb-mono">confidence: moderate · blend of HRRR + MRMS</div>
        </div>
      )}

      {/* Layer rail */}
      <div className="rd-layers">
        {(radarStyle === 'enthusiast'
          ? [{ id: 'refl', label: 'Refl', on: true }, { id: 'vel', label: 'Vel' }, { id: 'ltg', label: 'Ltg', on: true }, { id: 'cells', label: 'Cells', on: true }]
          : [{ id: 'rain', label: 'Rain', on: true }, { id: 'clouds', label: 'Clouds' }, { id: 'ltg', label: 'Ltg' }]
        ).map(l => (
          <div key={l.id} className={`rd-layer-btn sb-mono${l.on ? ' on' : ''}`}>{l.label.toUpperCase()}</div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="rd-bottom">
        <div className="rd-bottom-head">
          <div>
            <div className="rd-ts-label sb-mono">Observed · MRMS</div>
            <div className="rd-ts-time sb-mono">{timeStr}</div>
          </div>
          <div className="rd-speed-row">
            <button className="rd-speed-btn sb-mono">1×</button>
            <button className={`rd-speed-btn sb-mono${playing ? ' active' : ''}`} onClick={togglePlay}>{playing ? '⏸' : '▶'}</button>
            <button className="rd-speed-btn sb-mono">2×</button>
          </div>
        </div>

        {/* Scrubber */}
        <div className="rd-scrubber">
          <div className="rd-scrub-track" />
          <div className="rd-scrub-past" />
          <div className="rd-scrub-now"><span className="rd-scrub-now-label sb-mono">NOW</span></div>
          <div className="rd-scrub-handle" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`rd-scrub-tick${i > 12 ? ' forecast' : ''}`} style={{ left: `${(i / 19) * 100}%` }} />
          ))}
        </div>
        <div className="rd-scrub-labels sb-mono">
          <span>−2h</span><span>−1h</span><span style={{ color: '#fff' }}>now</span><span>+45m</span><span style={{ color: '#ffc800' }}>+90m</span>
        </div>

        {/* Action row */}
        <div className="rd-actions">
          <div className="rd-action-btn"><span className="rd-action-icon">◎</span>Recenter</div>
          <div className="rd-action-btn"><span className="rd-action-icon">☰</span>Legend</div>
          <div className="rd-action-btn"><span className="rd-action-icon">↗</span>Share</div>
        </div>
      </div>
    </div>
  );
}
