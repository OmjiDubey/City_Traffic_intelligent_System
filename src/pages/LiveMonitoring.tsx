import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, VideoOffIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";
import { EmptyState } from "../components/ui/EmptyState";
import { CameraFeed } from "../components/camera/CameraFeed";
import { CameraDetailDialog } from "../components/camera/CameraDetailDialog";
import { EvidenceThumb } from "../components/camera/EvidenceThumb";
import { cameras } from "../data/cameras";
import { useLiveDetections } from "../hooks/useLiveDetections";
import { confidenceClass } from "../utils/format";

const PAGE_SIZE = 6;
const zones = ["All zones", "Central", "North", "South", "East", "West"];
const statuses = ["All statuses", "Online", "Degraded", "Offline"];
const vehicleTypes = ["All types", "Car", "SUV", "Bike", "Auto", "Bus", "Truck"];

export function LiveMonitoring() {
  const [params, setParams] = useSearchParams();
  const [zone, setZone] = useState("All zones");
  const [status, setStatus] = useState("All statuses");
  const [vehicleType, setVehicleType] = useState("All types");
  const [live, setLive] = useState(true);
  const [page, setPage] = useState(0);
  const detections = useLiveDetections(live);

  const selectedId = params.get("camera");
  const selected = cameras.find((c) => c.id === selectedId) ?? null;

  const filtered = useMemo(
    () =>
    cameras.filter(
      (c) => (zone === "All zones" || c.zone === zone) && (status === "All statuses" || c.status === status)
    ),
    [zone, status]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => setPage(0), [zone, status]);

  const openCamera = (id: string) => setParams(id === "All cameras" ? {} : { camera: id });
  const closeCamera = useCallback(() => setParams({}), [setParams]);

  const visibleDetections = detections.filter((d) => vehicleType === "All types" || d.vehicleType === vehicleType);

  return (
    <div className="space-y-3">
      <PageHeader title="Live Monitoring" description="What the traffic cameras are seeing right now." />

      <Panel bodyClassName="p-2.5">
        <div className="flex flex-wrap items-end gap-2.5">
          <SelectField label="Camera" value={selectedId ?? "All cameras"} options={["All cameras", ...cameras.map((c) => c.id)]} onChange={openCamera} className="w-full sm:w-40" />
          <SelectField label="Zone" value={zone} options={zones} onChange={setZone} className="w-full sm:w-40" />
          <SelectField label="Camera status" value={status} options={statuses} onChange={setStatus} className="w-full sm:w-40" />
          <SelectField label="Vehicle type" value={vehicleType} options={vehicleTypes} onChange={setVehicleType} className="w-full sm:w-40" />
          <div className="ml-auto flex items-center gap-3">
            <span className={`flex items-center gap-2 text-sm font-medium ${live ? "text-success-ink" : "text-muted"}`} aria-live="polite">
              <span className={`h-2 w-2 rounded-full ${live ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
              {live ? "Live" : "Paused"}
            </span>
            <button
              type="button"
              onClick={() => setLive((l) => !l)}
              className="flex h-[30px] items-center gap-2 rounded-md border border-line bg-surface px-3 text-xs font-medium text-navy transition-colors duration-150 hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              
              {live ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
              {live ? "Pause feeds" : "Resume feeds"}
            </button>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_22.5rem]">
        <Panel
          title="Camera Workspace"
          subtitle={`${filtered.length} cameras`}
          action={
          pageCount > 1 &&
          <div className="flex items-center gap-2 text-sm text-muted">
                <span className="tabular">
                  {page * PAGE_SIZE + 1}–{Math.min(filtered.length, (page + 1) * PAGE_SIZE)} of {filtered.length}
                </span>
                <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-md border border-line p-1.5 text-navy hover:bg-canvas disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous cameras">
              
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
              className="rounded-md border border-line p-1.5 text-navy hover:bg-canvas disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next cameras">
              
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>

          }>
          
          {visible.length === 0 ?
          <EmptyState icon={VideoOffIcon} title="No cameras match these filters." description="Change the zone or status filter to see more feeds." /> :

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {visible.map((cam) =>
            <div
              key={cam.id}
              role="button"
              tabIndex={0}
              onClick={() => openCamera(cam.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openCamera(cam.id))}
              className="cursor-pointer rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Open ${cam.id} detail`}>
              
                  <CameraFeed camera={cam} showOverlays showTelemetry paused={!live} vehicleFilter={vehicleType} onExpand={() => openCamera(cam.id)} />
                  <div className="tabular mt-1.5 flex justify-between px-0.5 text-xs text-muted">
                    <span>{cam.zone} zone · {cam.type}</span>
                    <span className={cam.status === "Online" ? "text-success-ink" : cam.status === "Degraded" ? "text-warning-ink" : "text-danger-ink"}>
                      {cam.status === "Offline" ? "Disconnected" : cam.status === "Degraded" ? `Unstable · ${cam.latencyMs} ms` : `Connected · ${cam.latencyMs} ms`}
                    </span>
                  </div>
                </div>
            )}
            </div>
          }
        </Panel>

        <Panel
          title="Recent Detections"
          action={<span className="text-xs text-muted">{live ? "Updating live" : "Paused"}</span>}
          bodyClassName="px-0 pb-2">
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-y border-line bg-canvas text-left text-xs font-semibold text-muted">
                <tr>
                  <th className="px-4 py-1">Time</th>
                  <th className="px-2 py-1">Plate / Type</th>
                  <th className="px-2 py-1">Conf.</th>
                  <th className="px-4 py-1 text-right">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                <AnimatePresence initial={false}>
                  {visibleDetections.map((d) => {
                    const cam = cameras.find((c) => c.id === d.cameraId);
                    return (
                      <motion.tr
                        key={d.id}
                        layout="position"
                        initial={{ opacity: 0, backgroundColor: "#E8F2FC" }}
                        animate={{ opacity: 1, backgroundColor: "rgba(255,255,255,0)" }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
                        
                        <td className="tabular px-4 py-1.5 align-top text-muted">
                          {d.time}
                          <span className="block text-xs">{d.cameraId}</span>
                        </td>
                        <td className="px-2 py-1.5 align-top">
                          <Link to={`/vehicle-tracking?plate=${encodeURIComponent(d.plate)}`} className="whitespace-nowrap font-semibold text-primary hover:underline">
                            {d.plate}
                          </Link>
                          <span className="block text-xs text-muted">{d.vehicleType}</span>
                        </td>
                        <td className={`tabular px-2 py-1.5 align-top font-medium ${confidenceClass(d.confidence)}`}>{d.confidence}%</td>
                        <td className="px-4 py-1.5">
                          <EvidenceThumb image={cam?.image ?? ""} label={`Evidence for ${d.plate}`} className="ml-auto h-9 w-14" />
                        </td>
                      </motion.tr>);

                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {visibleDetections.length === 0 &&
            <p className="px-4 py-6 text-center text-sm text-muted">No recent detections for this vehicle type.</p>
            }
          </div>
        </Panel>
      </div>

      <CameraDetailDialog camera={selected} detections={detections} paused={!live} vehicleFilter={vehicleType} onClose={closeCamera} />
    </div>);

}