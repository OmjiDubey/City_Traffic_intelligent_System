import React from "react";
import { CalendarClockIcon, CctvIcon, ClockIcon, RouteIcon, ScanLineIcon, TimerIcon, BoxIcon } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { TrackedVehicle } from "../../types/traffic";
export function VehicleSummary({
  vehicle


}: {vehicle: TrackedVehicle;}) {
  const cams = new Set(vehicle.sightings.map((s) => s.cameraId)).size;
  const b = vehicle.evidenceBox;
  const stats: {
    icon: BoxIcon;
    label: string;
    value: string;
    sub?: string;
  }[] = [{
    icon: CalendarClockIcon,
    label: "First Seen",
    value: vehicle.firstSeen,
    sub: vehicle.date
  }, {
    icon: ClockIcon,
    label: "Last Seen",
    value: vehicle.lastSeen,
    sub: vehicle.date
  }, {
    icon: ScanLineIcon,
    label: "Total Detections",
    value: String(vehicle.sightings.length)
  }, {
    icon: CctvIcon,
    label: "Cameras Visited",
    value: String(cams)
  }, {
    icon: TimerIcon,
    label: "Journey Duration",
    value: vehicle.duration
  }, {
    icon: RouteIcon,
    label: "Total Distance",
    value: `${vehicle.distanceKm} km`,
    sub: "(Estimated)"
  }];
  return <section aria-label="Vehicle summary" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 shadow-card 2xl:flex-row 2xl:items-center">
      <div className="flex items-center gap-4 2xl:w-[22.5rem] 2xl:shrink-0 2xl:border-r 2xl:border-line 2xl:pr-4">
        <span role="img" aria-label={`Vehicle image, ${vehicle.make}`} className="block h-[4.5rem] w-[6.5rem] shrink-0 rounded-md border border-line bg-no-repeat" style={{
        backgroundImage: `url(${vehicle.frameImage})`,
        backgroundSize: `${Math.round(10000 / (b.w * 1.1))}%`,
        backgroundPosition: `${b.x + b.w / 2}% ${b.y + b.h / 2}%`
      }} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="tabular text-xl font-bold text-navy">{vehicle.plate}</p>
            <StatusBadge tone={vehicle.status === "Tracked" ? "success" : "warning"} dot>
              {vehicle.status}
            </StatusBadge>
          </div>
          <p className="mt-0.5 text-sm text-ink">{vehicle.make}</p>
          <p className="text-sm text-muted">{vehicle.description}</p>
        </div>
      </div>
      <dl className="grid flex-1 grid-cols-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => <div key={s.label} className={`flex items-start gap-2.5 px-2 ${i > 0 ? "lg:border-l lg:border-line-soft lg:pl-4" : ""}`}>
            <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="truncate text-xs text-muted">{s.label}</dt>
              <dd className="tabular text-base font-bold text-navy">{s.value}</dd>
              {s.sub && <dd className="text-xs text-muted">{s.sub}</dd>}
            </div>
          </div>)}
      </dl>
    </section>;
}