import React from "react";
import { Panel } from "../ui/Panel";
import { StatusBadge } from "../ui/StatusBadge";
import { congestionRanking } from "../../data/traffic";

const toneFor = { Heavy: "danger", Moderate: "warning", Normal: "success" } as const;
const barFor = { Heavy: "bg-danger", Moderate: "bg-warning", Normal: "bg-success" } as const;

export function CongestionRanking({ className }: {className?: string;}) {
  return (
    <Panel className={className} title="Congestion Analysis" subtitle="(Ranked, now)" bodyClassName="px-0 pb-1.5">
      <ol className="divide-y divide-line-soft border-t border-line">
        {congestionRanking.map((r, i) =>
        <li key={r.location} className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-x-2.5 px-3 py-1.5">
            <span className="tabular text-xs font-semibold text-muted">{i + 1}</span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-ink">{r.location}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#EEF2F6]">
                  <div className={`h-full rounded-full ${barFor[r.status]}`} style={{ width: `${r.level}%` }} />
                </div>
                <span className="tabular w-14 text-right text-[11px] text-muted">{r.duration === "—" ? "—" : r.duration}</span>
              </div>
            </div>
            <StatusBadge tone={toneFor[r.status]} className="w-[4.25rem] justify-center">
              {r.status} {r.level}
            </StatusBadge>
          </li>
        )}
      </ol>
      <p className="px-3 pt-1.5 text-[11px] text-muted">Level is the congestion index (0–100). Duration is time spent above the moderate threshold.</p>
    </Panel>);

}