import React from "react";
import { Link } from "react-router-dom";
import { CheckIcon, ClockIcon, RouteIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { LicensePlate } from "../ui/LicensePlate";
import { StatusBadge } from "../ui/StatusBadge";
import { useOperations } from "../../contexts/OperationsContext";
import { confidenceClass, violationTone } from "../../utils/format";
import type { Violation, ViolationStatus } from "../../types/traffic";

const reviewOptions: {status: ViolationStatus;icon: typeof CheckIcon;active: string;}[] = [
{ status: "Pending", icon: ClockIcon, active: "border-warning bg-warning-bg text-warning-ink" },
{ status: "Verified", icon: CheckIcon, active: "border-success bg-success-bg text-success-ink" },
{ status: "Rejected", icon: XIcon, active: "border-muted bg-[#EEF2F6] text-ink" }];


function zoneLabel(type: Violation["type"]): string {
  if (type === "Red-light violation") return "Stop line";
  if (type === "Wrong-way movement") return "Restricted direction";
  if (type === "Illegal parking") return "No-parking zone";
  if (type === "Lane violation") return "Lane boundary";
  return "Speed trap zone";
}

export function ViolationDetail({ violation }: {violation: Violation;}) {
  const { setViolationStatus } = useOperations();
  const v = violation;

  const review = (status: ViolationStatus) => {
    if (status === v.status) return;
    setViolationStatus(v.id, status);
    toast.success(`${v.id} marked ${status.toLowerCase()}`, { description: `${v.plate} · ${v.type}` });
  };

  const rows: [string, React.ReactNode][] = [
  ["Violation type", v.type],
  ["Camera", v.cameraId],
  ["Location", v.location],
  ["Timestamp", `${v.date}, ${v.time}`],
  ["Vehicle type", v.vehicleType],
  ["Detection confidence", <span className={confidenceClass(v.detectionConfidence)}>{v.detectionConfidence}%</span>],
  ["Violation confidence", <span className={confidenceClass(v.confidence)}>{v.confidence}%</span>]];


  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="tabular text-sm font-semibold text-muted">{v.id}</p>
        <StatusBadge tone={violationTone(v.status)} dot>
          {v.status}
        </StatusBadge>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-navy">Evidence</h3>
        <div className="relative aspect-video overflow-hidden rounded-md bg-[#0B1422]">
          <img src={v.image} alt={`Evidence frame from ${v.cameraId}`} className="h-full w-full object-cover" />
          <div className="absolute border-2 border-dashed border-[#FBBF24] bg-[#FBBF24]/10" style={{ left: `${v.zoneArea.x}%`, top: `${v.zoneArea.y}%`, width: `${v.zoneArea.w}%`, height: `${v.zoneArea.h}%` }}>
            <span className="absolute bottom-0.5 left-1 bg-black/70 px-1 text-[0.625rem] font-semibold text-[#FDE68A]">{zoneLabel(v.type)}</span>
          </div>
          <div className="absolute border-2 border-[#EF4444]" style={{ left: `${v.box.x}%`, top: `${v.box.y}%`, width: `${v.box.w}%`, height: `${v.box.h}%` }}>
            <span className="tabular absolute -top-[1.125rem] left-[-2px] whitespace-nowrap bg-[#DC2626] px-1 text-[0.625rem] font-semibold leading-4 text-white">{v.plate}</span>
          </div>
          <span className="tabular absolute right-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[0.6875rem] text-white">
            {v.cameraId} · {v.time}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-line bg-canvas px-3 py-2">
          <span className="text-xs text-muted">Recognised plate</span>
          <LicensePlate plate={v.plate} />
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold text-navy">Details</h3>
        <dl className="divide-y divide-line-soft text-sm">
          {rows.map(([k, val]) =>
          <div key={k} className="grid grid-cols-[9.375rem_minmax(0,1fr)] gap-2 py-1.5">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular font-medium text-ink">{val}</dd>
            </div>
          )}
        </dl>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-navy">Review</h3>
        <div role="radiogroup" aria-label="Review decision" className="grid grid-cols-3 gap-2">
          {reviewOptions.map((o) => {
            const active = v.status === o.status;
            return (
              <button
                key={o.status}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => review(o.status)}
                className={`flex h-9 items-center justify-center gap-1.5 rounded-md border text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                active ? o.active : "border-line bg-surface text-navy hover:bg-canvas"}`
                }>
                
                <o.icon className="h-4 w-4" aria-hidden="true" />
                {o.status}
              </button>);

          })}
        </div>
      </div>

      <Link
        to={`/vehicle-tracking?plate=${encodeURIComponent(v.plate)}`}
        className="flex h-9 items-center justify-center gap-2 rounded-md border border-primary text-sm font-semibold text-primary transition-colors duration-150 hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        
        <RouteIcon className="h-4 w-4" /> View vehicle journey
      </Link>
    </div>);

}