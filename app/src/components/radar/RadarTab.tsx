import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { WeatherData } from '../../types/weather';
import './RadarTab.css';

type LayerMode = 'precip' | 'wind' | 'hazards' | 'infra';

const LAYER_OPTIONS: { id: LayerMode; icon: string; label: string }[] = [
  { id: 'precip', icon: '🌧️', label: 'Precip' },
  { id: 'wind', icon: '💨', label: 'Wind' },
  { id: 'hazards', icon: '⚠️', label: 'Hazards' },
  { id: 'infra', icon: '🏗️', label: 'Infra' },
];

interface Props {
  data: WeatherData;
}

export function RadarTab({ data }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layersRef = useRef<Record<string, L.Layer | L.LayerGroup>>({});
  const radarAnimRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeLayer, setActiveLayer] = useState<LayerMode>('precip');

  const clearLayers = useCallback(() => {
    if (radarAnimRef.current) {
      clearInterval(radarAnimRef.current);
      radarAnimRef.current = null;
    }
    Object.values(layersRef.current).forEach(l => {
      try { mapInstance.current?.removeLayer(l); } catch { /* ok */ }
    });
    layersRef.current = {};
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: true, attributionControl: true }).setView([21.47, -157.97], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CARTO © OpenStreetMap', maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    setTimeout(() => map.invalidateSize(), 200);
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    setTimeout(() => map.invalidateSize(), 100);
  }, [activeLayer]);

  const drawPrecip = useCallback(() => {
    const map = mapInstance.current;
    if (!map) return;
    const frames = [
      'nexrad-n0q-m55m', 'nexrad-n0q-m50m', 'nexrad-n0q-m45m', 'nexrad-n0q-m40m',
      'nexrad-n0q-m35m', 'nexrad-n0q-m30m', 'nexrad-n0q-m25m', 'nexrad-n0q-m20m',
      'nexrad-n0q-m15m', 'nexrad-n0q-m10m', 'nexrad-n0q-m05m', 'nexrad-n0q',
    ];
    const opts: L.TileLayerOptions = { opacity: 0.65, tileSize: 256, maxNativeZoom: 8, maxZoom: 19 };
    const layers = frames.map(f =>
      L.tileLayer(`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/${f}/{z}/{x}/{y}.png`, opts)
    );
    let cur = 0;
    layers[cur].addTo(map);
    layersRef.current['radar'] = layers[cur];
    radarAnimRef.current = setInterval(() => {
      const prev = cur;
      cur = (cur + 1) % layers.length;
      map.removeLayer(layers[prev]);
      layers[cur].addTo(map);
      layersRef.current['radar'] = layers[cur];
    }, 600);
  }, []);

  const drawWarnings = useCallback(() => {
    const map = mapInstance.current;
    if (!map) return;
    const group = L.layerGroup();
    const sevColor: Record<string, string> = { Extreme: '#ef5350', Severe: '#f5a623', Moderate: '#fbbf24', Minor: '#4fc3f7' };
    (data.alerts || []).forEach(a => {
      const geo = a.geometry;
      if (!geo) return;
      const col = sevColor[a.properties.severity] || '#f5a623';
      const coords = geo.type === 'Polygon' ? [geo.coordinates] : geo.type === 'MultiPolygon' ? geo.coordinates : [];
      coords.forEach((ring: any) => {
        L.polygon(ring[0].map((c: number[]) => [c[1], c[0]]), {
          fillColor: col, fillOpacity: 0.25, color: col, weight: 2, opacity: 0.8, dashArray: '6,3',
        }).bindTooltip(`<b>⚠️ ${a.properties.event}</b>`).addTo(group);
      });
    });
    group.addTo(map);
    layersRef.current['warnings'] = group;
  }, [data.alerts]);

  const drawGauges = useCallback(() => {
    const map = mapInstance.current;
    if (!map) return;
    const group = L.layerGroup();
    data.gauges.forEach(g => {
      if (g.level == null) return;
      const col = g.level >= g.flood ? '#e52207' : g.level >= g.action ? '#f5a623' : '#4fc3f7';
      L.circleMarker([g.lat, g.lon], { radius: 9, fillColor: col, fillOpacity: 0.95, color: '#fff', weight: 2.5 })
        .bindTooltip(`<b>💧 ${g.short}</b><br/>${g.level.toFixed(2)}ft<br/>Flood: ${g.flood}ft`)
        .addTo(group);
    });
    group.addTo(map);
    layersRef.current['gauges'] = group;
  }, [data.gauges]);

  const drawInfra = useCallback(async () => {
    const map = mapInstance.current;
    if (!map) return;
    drawGauges();

    const shelterGroup = L.layerGroup();
    const shelters = [
      { name: 'Neal S. Blaisdell Center', lat: 21.2954, lon: -157.8518, cap: 2000 },
      { name: 'Farrington High School', lat: 21.3368, lon: -157.8718, cap: 800 },
      { name: 'Kailua District Park', lat: 21.3963, lon: -157.7397, cap: 500 },
      { name: 'Waipahu High School', lat: 21.3856, lon: -158.0094, cap: 600 },
      { name: 'Aiea District Park', lat: 21.3820, lon: -157.9310, cap: 400 },
    ];
    shelters.forEach(s => {
      const icon = L.divIcon({
        html: '<div style="background:#22d3ee;color:#000;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)">⌂</div>',
        className: '', iconSize: [24, 24], iconAnchor: [12, 12],
      });
      L.marker([s.lat, s.lon], { icon }).bindTooltip(`<b>⌂ ${s.name}</b><br/>Cap: ${s.cap}`).addTo(shelterGroup);
    });
    shelterGroup.addTo(map);
    layersRef.current['shelters'] = shelterGroup;

    try {
      const configs = [
        { query: '[out:json][timeout:10];node[amenity=hospital](21.2,-158.3,21.7,-157.6);out body;', icon: '🏥', color: '#ec4899' },
        { query: '[out:json][timeout:10];node[amenity=fire_station](21.2,-158.3,21.7,-157.6);out body;', icon: '🚒', color: '#f97316' },
      ];
      for (const cfg of configs) {
        const r = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST', body: cfg.query, signal: AbortSignal.timeout(12000),
        });
        const d = await r.json();
        const group = L.layerGroup();
        (d.elements || []).forEach((e: any) => {
          const lat = e.lat || e.center?.lat;
          const lon = e.lon || e.center?.lon;
          if (!lat || !lon) return;
          const icon = L.divIcon({
            html: `<div style="background:${cfg.color};color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)">${cfg.icon}</div>`,
            className: '', iconSize: [24, 24], iconAnchor: [12, 12],
          });
          L.marker([lat, lon], { icon }).bindTooltip(`<b>${cfg.icon} ${e.tags?.name || 'Unknown'}</b>`).addTo(group);
        });
        group.addTo(map);
        layersRef.current[cfg.icon] = group;
      }
    } catch { /* OSM optional */ }
  }, [data.gauges, drawGauges]);

  useEffect(() => {
    clearLayers();
    const map = mapInstance.current;
    if (!map) return;

    if (activeLayer === 'precip') {
      drawPrecip();
    } else if (activeLayer === 'wind') {
      L.tileLayer(
        'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-hsr/{z}/{x}/{y}.png',
        { opacity: 0.55, tileSize: 256, maxNativeZoom: 8, maxZoom: 13 }
      ).addTo(map);
    } else if (activeLayer === 'hazards') {
      drawWarnings();
      drawGauges();
    } else if (activeLayer === 'infra') {
      drawInfra();
    }
  }, [activeLayer, clearLayers, drawPrecip, drawWarnings, drawGauges, drawInfra]);

  return (
    <div className="radar-tab">
      <div className="radar-layer-strip">
        {LAYER_OPTIONS.map(l => (
          <button
            key={l.id}
            className={`radar-lb${activeLayer === l.id ? ' on' : ''}`}
            onClick={() => setActiveLayer(l.id)}
          >
            <span className="radar-lb-ico">{l.icon}</span>
            {l.label}
          </button>
        ))}
      </div>
      <div className="radar-map-area">
        <div ref={mapRef} className="radar-map" />
        <div className="radar-hud">
          <div className="radar-mode-box">
            <div className="radar-mode-label">LAYER</div>
            <div className="radar-mode-val">
              {activeLayer === 'precip' ? 'NEXRAD PRECIP' : activeLayer === 'wind' ? 'PRECIP RATE' : activeLayer === 'hazards' ? 'WARNINGS' : 'INFRASTRUCTURE'}
            </div>
          </div>
          <div className="radar-time-box">
            <span className="radar-live-dot" />
            <span className="radar-live-text">LIVE</span>
            <div className="radar-time-val">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
