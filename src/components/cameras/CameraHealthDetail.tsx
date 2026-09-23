import React from "react";
import { useNavigate } from "react-router-dom";
import { MonitorPlayIcon } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { CameraFeed } from "../camera/CameraFeed";
import { cameraTone, formatNumber } from "../../utils/format";
import type { Camera } from "../../types/traffic";

export function CameraHealthDetail({ camera }: {camera: Camera;}) {
  const navigate = useNavigate();
  const c = camera;
  const offline = c.status === "Offline";

  const info: [string, string][] = [
  ["Camera ID", c.id],
  ["Location", c.location],
  ["Zone", c.zone],
  ["Camera type", c.type],
  ["Resolution", c.resolution],
  ["FPS", offline ? "—" : String(c.fps)],
  ["Last connection", c.lastActive],
  ["Installed", c.addedOn]];


  const perf: {label: string;value: string;warn?: boolean;}[] = [
  { label: "Vehicles today", value: formatNumber(c.vehiclesToday) },
  { label: "ANPR detections", value: formatNumber(c.anprToday) },
  { label: "Avg. OCR confidence", value: c.avgOcr ? `${c.avgOcr}%` : "—", warn: c.avgOcr > 0 && c.avgOcr < 90 },
  { label: "Violations detected", value: String(c.violationsToday) },
  { label: "Uptime (30 days)", value: `${c.uptime}%`, warn: c.uptime < 97 },
  { label: "Processing latency", value: c.latencyMs ? `${c.latencyMs} ms` : "—", warn: c.latencyMs > 400 }];


  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{c.location}</p>
        <StatusBadge tone={cameraTone(c.status)} dot>
          {c.status}
        </StatusBadge>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-navy">Preview</h3>
        <CameraFeed camera={c} showTelemetry />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-navy">Performance</h3>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
          {perf.map((p) =>
          <div key={p.label} className="bg-surface px-3 py-2.5">
              <dt className="text-xs text-muted">{p.label}</dt>
              <dd className={`tabular text-base font-bold ${p.warn ? "text-warning-ink" : "text-navy"}`}>{p.value}</dd>
            </div>
          )}
        </dl>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold text-navy">Camera information</h3>
        <dl className="divide-y divide-line-soft text-sm">
          {info.map(([k, v]) =>
          <div key={k} className="grid grid-cols-[8.125rem_minmax(0,1fr)] gap-2 py-1.5">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular font-medium text-ink">{v}</dd>
            </div>
          )}
        </dl>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/live-monitoring?camera=${c.id}`)}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        
        <MonitorPlayIcon className="h-4 w-4" /> Open in Live Monitoring
      </button>
    </div>);

}