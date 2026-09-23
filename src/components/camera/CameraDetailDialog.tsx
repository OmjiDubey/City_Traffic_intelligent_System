import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsIcon, XIcon } from "lucide-react";
import { CameraFeed } from "./CameraFeed";
import { EvidenceThumb } from "./EvidenceThumb";
import { StatusBadge } from "../ui/StatusBadge";
import { overlays } from "../../data/cameras";
import { cameraTone, confidenceClass } from "../../utils/format";
import type { Camera, LiveDetection } from "../../types/traffic";

interface CameraDetailDialogProps {
  camera: Camera | null;
  detections: LiveDetection[];
  paused: boolean;
  vehicleFilter: string;
  onClose: () => void;
}

export function CameraDetailDialog({ camera, detections, paused, vehicleFilter, onClose }: CameraDetailDialogProps) {
  useEffect(() => {
    if (!camera) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [camera, onClose]);

  const camRows = camera ?
  [
  ...(overlays[camera.id] ?? []).map((o, i) => ({
    id: `ov-${o.trackId}`,
    time: `In frame`,
    plate: o.plate,
    vehicleType: o.type,
    confidence: 90 + i * 3 % 8,
    cameraId: camera.id
  })),
  ...detections.filter((d) => d.cameraId === camera.id)].
  filter((r) => vehicleFilter === "All types" || r.vehicleType === vehicleFilter) :
  [];

  const avgConfidence = camRows.length ?
  Math.round(camRows.reduce((s, r) => s + r.confidence, 0) / camRows.length) :
  0;

  const quality =
  camera?.status === "Offline" ? "No signal" : camera?.status === "Degraded" ? "Poor" : camera && camera.latencyMs < 180 ? "Excellent" : "Good";

  return (
    <AnimatePresence>
      {camera &&
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        onClick={onClose}>
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${camera.id} detail`}
          className="w-full max-w-6xl rounded-lg border border-line bg-surface shadow-pop"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}>
          
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <h2 className="truncate text-base font-semibold text-navy">
                  {camera.id} · {camera.location}
                </h2>
                <StatusBadge tone={cameraTone(camera.status)} dot>
                  {camera.status}
                </StatusBadge>
              </div>
              <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted hover:bg-canvas hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close camera detail">
              
                <XIcon className="h-5 w-5" />
              </button>
            </header>

            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_18.75rem]">
              <div className="min-w-0 space-y-4">
                <CameraFeed camera={camera} showOverlays showTelemetry paused={paused} vehicleFilter={vehicleFilter} />
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-navy">Recent detections at this camera</h3>
                  <div className="overflow-x-auto rounded-md border border-line">
                    <table className="w-full min-w-[480px] text-sm">
                      <thead className="bg-canvas text-left text-xs font-semibold text-muted">
                        <tr>
                          <th className="px-3 py-2">Time</th>
                          <th className="px-3 py-2">Plate</th>
                          <th className="px-3 py-2">Type</th>
                          <th className="px-3 py-2">Confidence</th>
                          <th className="px-3 py-2">Evidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line-soft">
                        {camRows.length === 0 ?
                      <tr>
                            <td colSpan={5} className="px-3 py-6 text-center text-muted">
                              {camera.status === "Offline" ? "No detections — camera offline." : "No detections for the selected vehicle type."}
                            </td>
                          </tr> :

                      camRows.map((r) =>
                      <tr key={r.id}>
                              <td className="tabular px-3 py-2 text-muted">{r.time}</td>
                              <td className="px-3 py-2">
                                <Link to={`/vehicle-tracking?plate=${encodeURIComponent(r.plate)}`} className="font-semibold text-primary hover:underline">
                                  {r.plate}
                                </Link>
                              </td>
                              <td className="px-3 py-2 text-ink">{r.vehicleType}</td>
                              <td className={`tabular px-3 py-2 font-medium ${confidenceClass(r.confidence)}`}>{r.confidence}%</td>
                              <td className="px-3 py-2">
                                <EvidenceThumb image={camera.image} label={`Evidence for ${r.plate}`} />
                              </td>
                            </tr>
                      )
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                  {[
                { k: "Vehicles in frame", v: camera.status === "Offline" ? "—" : String((overlays[camera.id]?.length ?? 2) * 4) },
                { k: "FPS", v: String(camera.fps) },
                { k: "Connection", v: quality },
                { k: "Avg. confidence", v: avgConfidence ? `${avgConfidence}%` : "—" }].
                map((s) =>
                <div key={s.k} className="bg-surface p-3">
                      <dt className="text-xs text-muted">{s.k}</dt>
                      <dd className="tabular mt-0.5 text-lg font-bold text-navy">{s.v}</dd>
                    </div>
                )}
                </dl>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-navy">Camera information</h3>
                  <dl className="divide-y divide-line-soft text-sm">
                    {[
                  ["Zone", camera.zone],
                  ["Camera type", camera.type],
                  ["Resolution", camera.resolution],
                  ["Latency", camera.latencyMs ? `${camera.latencyMs} ms` : "—"],
                  ["Uptime (30d)", `${camera.uptime}%`],
                  ["Coordinates", `${camera.lat.toFixed(4)}, ${camera.lng.toFixed(4)}`]].
                  map(([k, v]) =>
                  <div key={k} className="flex justify-between gap-3 py-2">
                        <dt className="text-muted">{k}</dt>
                        <dd className="tabular text-right font-medium text-ink">{v}</dd>
                      </div>
                  )}
                  </dl>
                </div>
                <Link
                to={`/cameras?id=${camera.id}`}
                className="flex h-9 items-center justify-center gap-2 rounded-md border border-primary text-sm font-semibold text-primary transition-colors duration-150 hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                
                  <SettingsIcon className="h-4 w-4" /> View camera health
                </Link>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}