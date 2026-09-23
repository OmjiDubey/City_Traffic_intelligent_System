import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, Polyline, ScaleControl, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import { cameras } from "../../data/cameras";
import type { TrackedVehicle } from "../../types/traffic";

interface RouteMapProps {
  vehicle: TrackedVehicle | null;
  selectedIndex: number;
  onSelect: (index: number) => void;
  height: number;
}

const LUCKNOW: [number, number] = [26.846, 80.95];

function pinIcon(n: number, total: number, selected: boolean, time: string, place: string) {
  const color = n === 1 ? "#16A34A" : n === total ? "#DC2626" : "#1976D2";
  const size = selected ? 30 : 24;
  const ring = selected ? `box-shadow:0 0 0 4px ${color}33, 0 1px 3px rgba(0,0,0,.35);` : "box-shadow:0 1px 3px rgba(0,0,0,.35);";
  const tag = n === 1 ? "Start" : n === total ? "End" : "";
  return L.divIcon({
    className: "leaflet-div-icon-clean",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px">
        <div style="width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #fff;${ring}color:#fff;font:700 ${selected ? 13 : 12}px Inter,sans-serif;display:flex;align-items:center;justify-content:center">${n}</div>
        <div style="position:absolute;left:${size + 4}px;top:50%;transform:translateY(-50%);background:#fff;border:1px solid ${selected ? color : "#D9E2EC"};border-radius:4px;padding:2px 6px;white-space:nowrap;font:600 11px/1.25 Inter,sans-serif;color:#172B4D;box-shadow:0 1px 2px rgba(18,59,109,.12)">
          ${time.slice(0, 5)}<span style="display:block;font-weight:500;color:#5B6B7F">${place}</span>
        </div>
        ${tag ? `<div style="position:absolute;top:${size + 3}px;left:50%;transform:translateX(-50%);background:${color};color:#fff;border-radius:4px;padding:1px 6px;font:600 10px Inter,sans-serif">${tag}</div>` : ""}
      </div>`
  });
}

function arrowIcon(angle: number) {
  return L.divIcon({
    className: "leaflet-div-icon-clean",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    html: `<svg width="14" height="14" viewBox="0 0 14 14" style="transform:rotate(${angle}deg)"><path d="M3 2 L11 7 L3 12 Z" fill="#123B6D" stroke="#fff" stroke-width="1.2"/></svg>`
  });
}

function FitToRoute({ vehicle }: {vehicle: TrackedVehicle | null;}) {
  const map = useMap();
  useEffect(() => {
    if (!vehicle) {
      map.setView(LUCKNOW, 12);
      return;
    }
    const pts = vehicle.sightings.map((s) => [s.lat, s.lng] as [number, number]);
    map.fitBounds(L.latLngBounds(pts), { padding: [60, 90] });
  }, [vehicle, map]);
  return null;
}

function PanToSelected({ vehicle, index }: {vehicle: TrackedVehicle | null;index: number;}) {
  const map = useMap();
  useEffect(() => {
    const s = vehicle?.sightings[index];
    if (s && !map.getBounds().pad(-0.15).contains([s.lat, s.lng])) map.panTo([s.lat, s.lng], { animate: true, duration: 0.3 });
  }, [vehicle, index, map]);
  return null;
}

function InvalidateOnResize({ height }: {height: number;}) {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(id);
  }, [height, map]);
  return null;
}

export function RouteMap({ vehicle, selectedIndex, onSelect, height }: RouteMapProps) {
  const segments = useMemo(() => {
    if (!vehicle) return [];
    return vehicle.segments.map((seg, i) => {
      const a = vehicle.sightings[i];
      const b = vehicle.sightings[i + 1];
      const path: [number, number][] = [[a.lat, a.lng], ...seg.via, [b.lat, b.lng]];
      const mid = Math.floor((path.length - 1) / 2);
      const p1 = path[mid];
      const p2 = path[mid + 1];
      const arrowAt: [number, number] = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      const angle = -Math.atan2(p2[0] - p1[0], (p2[1] - p1[1]) * Math.cos(p1[0] * Math.PI / 180)) * 180 / Math.PI;
      return { path, inferred: seg.inferred, arrowAt, angle };
    });
  }, [vehicle]);

  const visitedIds = new Set(vehicle?.sightings.map((s) => s.cameraId));

  return (
    <div className="relative z-0 overflow-hidden rounded-md border border-line" style={{ height }}>
      <MapContainer center={LUCKNOW} zoom={12} zoomControl={false} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        <ZoomControl position="bottomright" />
        <ScaleControl position="bottomleft" imperial={false} />
        <FitToRoute vehicle={vehicle} />
        <PanToSelected vehicle={vehicle} index={selectedIndex} />
        <InvalidateOnResize height={height} />

        {cameras.
        filter((c) => !visitedIds.has(c.id)).
        map((c) =>
        <CircleMarker
          key={c.id}
          center={[c.lat, c.lng]}
          radius={5}
          pathOptions={{ color: "#fff", weight: 1.5, fillColor: c.status === "Offline" ? "#94A3B8" : "#1976D2", fillOpacity: vehicle ? 0.55 : 0.9 }}>
          
              <Tooltip direction="top" offset={[0, -4]}>
                {c.id} · {c.location} ({c.status})
              </Tooltip>
            </CircleMarker>
        )}

        {segments.map((s, i) =>
        <React.Fragment key={i}>
            <Polyline positions={s.path} pathOptions={{ color: "#FFFFFF", weight: 9, opacity: 0.9 }} />
            <Polyline
            positions={s.path}
            pathOptions={{ color: s.inferred ? "#5B8FD6" : "#1976D2", weight: 5, dashArray: s.inferred ? "8 8" : undefined, lineCap: s.inferred ? "butt" : "round" }}>
            
              <Tooltip sticky>{s.inferred ? "Inferred segment — not directly observed" : "Observed / reconstructed route"}</Tooltip>
            </Polyline>
            <Marker position={s.arrowAt} icon={arrowIcon(s.angle)} interactive={false} />
          </React.Fragment>
        )}

        {vehicle?.sightings.map((s, i) =>
        <Marker
          key={s.cameraId + s.time}
          position={[s.lat, s.lng]}
          icon={pinIcon(i + 1, vehicle.sightings.length, i === selectedIndex, s.time, s.location.split(" – ")[0])}
          zIndexOffset={i === selectedIndex ? 1000 : i === 0 || i === vehicle.sightings.length - 1 ? 500 : 0}
          eventHandlers={{ click: () => onSelect(i) }}
          keyboard
          title={`Sighting ${i + 1}: ${s.cameraId}, ${s.location} at ${s.time}`} />

        )}
      </MapContainer>
    </div>);

}