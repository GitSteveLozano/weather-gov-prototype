import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RadarTab.css';

export function RadarTab() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: true }).setView([21.47, -157.97], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© CARTO © OpenStreetMap', maxZoom: 19,
    }).addTo(map);

    // Animated NEXRAD radar
    const frames = ['nexrad-n0q-m50m','nexrad-n0q-m40m','nexrad-n0q-m30m','nexrad-n0q-m20m','nexrad-n0q-m10m','nexrad-n0q'];
    const opts: L.TileLayerOptions = { opacity: 0.6, tileSize: 256, maxNativeZoom: 8, maxZoom: 19 };
    const layers = frames.map(f => L.tileLayer(`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/${f}/{z}/{x}/{y}.png`, opts));
    let cur = 0;
    layers[cur].addTo(map);
    const anim = setInterval(() => { const prev = cur; cur = (cur + 1) % layers.length; map.removeLayer(layers[prev]); layers[cur].addTo(map); }, 700);

    mapInstance.current = map;
    setTimeout(() => map.invalidateSize(), 200);
    return () => { clearInterval(anim); map.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div className="rd">
      <div ref={mapRef} className="rd-map" />
      <div className="rd-hud sb-mono">
        <span className="rd-live">● LIVE</span>
        <span>NEXRAD RADAR</span>
      </div>
    </div>
  );
}
