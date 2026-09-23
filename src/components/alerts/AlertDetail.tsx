import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCheckIcon, CheckIcon, FileWarningIcon, RouteIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "../ui/StatusBadge";
import { LicensePlate } from "../ui/LicensePlate";
import { CameraFeed } from "../camera/CameraFeed";
import { cameras } from "../../data/cameras";
import { useOperations } from "../../contexts/OperationsContext";
import { alertStatusTone, severityTone } from "../../utils/format";
import type { TrafficAlert } from "../../types/traffic";

export function AlertDetail({ alert }: {alert: TrafficAlert;}) {
  const navigate = useNavigate();
  const { setAlertStatus } = useOperations();
  const camera = cameras.find((c) => c.id === alert.source);
  const a = alert;

  const act = (status: "Acknowledged" | "Resolved") => {
    setAlertStatus(a.id, status);
    toast.success(status === "Resolved" ? `${a.id} resolved` : `${a.id} acknowledged`, { description: `${a.type} · ${a.location}` });
  };

  const rows: [string, React.ReactNode][] = [
  ["Alert type", a.type],
  ["Severity", <StatusBadge tone={severityTone(a.severity)}>{a.severity}</StatusBadge>],
  ["Timestamp", `23 Sep 2026, ${a.time}`],
  ["Location", a.location],
  ["Camera / source", a.source],
  ["Trigger condition", a.trigger]];

  if (a.resolvedAt) rows.push(["Resolved at", a.resolvedAt]);

  const secondaryBtn =
  "flex h-[30px] items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-xs font-semibold text-navy transition-colors duration-150 hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40";

  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="tabular text-xs font-semibold text-muted">{a.id}</p>
        <StatusBadge tone={alertStatusTone(a.status)} dot>
          {a.status}
        </StatusBadge>
      </div>
      <p className="text-xs leading-relaxed text-ink">{a.description}</p>

      <dl className="divide-y divide-line-soft border-y border-line text-xs">
        {rows.map(([k, v]) =>
        <div key={k} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2 py-1">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium text-ink">{v}</dd>
          </div>
        )}
      </dl>

      <div>
        <h3 className="mb-1.5 text-xs font-semibold text-navy">Related evidence</h3>
        {camera ?
        <CameraFeed camera={camera} showOverlays showTelemetry /> :

        <p className="rounded-md border border-dashed border-line px-3 py-3 text-center text-xs text-muted">System-generated event — no camera evidence.</p>
        }
        {a.plate &&
        <div className="mt-1.5 flex items-center justify-between rounded-md border border-line bg-canvas px-2.5 py-1.5">
            <span className="text-[11px] text-muted">Vehicle involved</span>
            <LicensePlate plate={a.plate} />
          </div>
        }
        {a.metrics &&
        <dl className="mt-1.5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
            {a.metrics.map((m) =>
          <div key={m.label} className="bg-surface px-2.5 py-1.5">
                <dt className="text-[11px] text-muted">{m.label}</dt>
                <dd className="tabular text-xs font-bold text-navy">{m.value}</dd>
              </div>
          )}
          </dl>
        }
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" disabled={a.status !== "Open"} onClick={() => act("Acknowledged")} className={secondaryBtn}>
          <CheckIcon className="h-3.5 w-3.5" /> Acknowledge
        </button>
        <button
          type="button"
          disabled={a.status === "Resolved"}
          onClick={() => act("Resolved")}
          className="flex h-[30px] items-center justify-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40">
          
          <CheckCheckIcon className="h-3.5 w-3.5" /> Mark resolved
        </button>
        <button type="button" disabled={!camera} onClick={() => camera && navigate(`/live-monitoring?camera=${camera.id}`)} className={secondaryBtn}>
          <VideoIcon className="h-3.5 w-3.5" /> View source
        </button>
        {a.violationId ?
        <button type="button" onClick={() => navigate(`/violations?id=${a.violationId}`)} className={secondaryBtn}>
            <FileWarningIcon className="h-3.5 w-3.5" /> View violation
          </button> :

        <button type="button" disabled={!a.plate} onClick={() => a.plate && navigate(`/vehicle-tracking?plate=${encodeURIComponent(a.plate)}`)} className={secondaryBtn} title={a.plate ? undefined : "No vehicle linked to this alert"}>
            <RouteIcon className="h-3.5 w-3.5" /> View vehicle
          </button>
        }
      </div>
    </div>);

}