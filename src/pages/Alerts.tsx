import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ActivityIcon, BellIcon, BellOffIcon, CheckCircle2Icon, OctagonAlertIcon, TriangleAlertIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { KpiCard } from "../components/ui/KpiCard";
import { Panel } from "../components/ui/Panel";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { EmptyState } from "../components/ui/EmptyState";
import { DetailPanel } from "../components/ui/DetailPanel";
import { AlertDetail } from "../components/alerts/AlertDetail";
import { useOperations } from "../contexts/OperationsContext";
import { alertStatusTone, severityTone } from "../utils/format";
import type { TrafficAlert } from "../types/traffic";

const severityFilters = ["All", "Critical", "High", "Medium", "Info"] as const;
type SeverityFilter = (typeof severityFilters)[number];
const RESOLVED_BASE = 14;

export function Alerts() {
  const { alerts } = useOperations();
  const [params, setParams] = useSearchParams();
  const [severity, setSeverity] = useState<SeverityFilter>("All");
  const [mobileOpen, setMobileOpen] = useState(Boolean(params.get("id")));

  const active = useMemo(() => alerts.filter((a) => a.status !== "Resolved" && (severity === "All" || a.severity === severity)), [alerts, severity]);
  const history = alerts.filter((a) => a.status === "Resolved");
  const allActive = alerts.filter((a) => a.status !== "Resolved");

  const selectedId = params.get("id") ?? active[0]?.id ?? history[0]?.id;
  const selected = alerts.find((a) => a.id === selectedId) ?? null;

  const select = (id: string) => {
    setParams({ id });
    setMobileOpen(true);
  };

  const Row = ({ a, resolved }: {a: TrafficAlert;resolved?: boolean;}) => {
    const isSel = a.id === selectedId;
    return (
      <tr onClick={() => select(a.id)} className={`cursor-pointer transition-colors duration-150 ${isSel ? "bg-primary-light" : "hover:bg-canvas"}`} aria-selected={isSel}>
        <td className="tabular px-4 py-2.5 text-muted">{a.time}</td>
        <td className="px-3 py-2.5">
          <span className="font-medium text-ink">{a.type}</span>
          {a.unusual && <span className="ml-2 text-xs text-muted">· unusual</span>}
        </td>
        <td className="max-w-[200px] truncate px-3 py-2.5 text-ink">{a.location}</td>
        <td className="px-3 py-2.5">
          <StatusBadge tone={resolved ? "neutral" : severityTone(a.severity)}>{a.severity}</StatusBadge>
        </td>
        <td className="px-3 py-2.5">
          <StatusBadge tone={alertStatusTone(a.status)}>{resolved ? `Resolved ${a.resolvedAt ?? ""}` : a.status}</StatusBadge>
        </td>
        <td className="px-4 py-2.5 text-right">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              select(a.id);
            }}
            className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            
            View
          </button>
        </td>
      </tr>);

  };

  const head =
  <thead className="border-y border-line bg-canvas text-left text-xs font-semibold text-muted">
      <tr>
        <th className="px-4 py-2">Time</th>
        <th className="px-3 py-2">Alert</th>
        <th className="px-3 py-2">Location</th>
        <th className="px-3 py-2">Severity</th>
        <th className="px-3 py-2">Status</th>
        <th className="px-4 py-2 text-right">Action</th>
      </tr>
    </thead>;


  return (
    <div className="space-y-5">
      <PageHeader title="Alerts" description="What requires attention now, and operational events that occurred recently." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <KpiCard icon={BellIcon} label="Active Alerts" value={allActive.length} note={`${allActive.filter((a) => a.status === "Acknowledged").length} acknowledged`} />
        <KpiCard icon={OctagonAlertIcon} tone="danger" label="Critical" value={allActive.filter((a) => a.severity === "Critical").length} note="immediate action" />
        <KpiCard icon={TriangleAlertIcon} tone="warning" label="High Priority" value={allActive.filter((a) => a.severity === "High").length} note="open or acknowledged" />
        <KpiCard icon={CheckCircle2Icon} tone="success" label="Resolved Today" value={RESOLVED_BASE - 4 + history.length} note="since 00:00" />
        <KpiCard icon={ActivityIcon} label="Unusual Events" value={alerts.filter((a) => a.unusual).length} note="deviation-based" />
      </div>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_26.25rem]">
        <div className="min-w-0 space-y-5">
          <Panel title="Active Alerts" subtitle={`(${active.length})`} action={<SegmentedControl label="Severity" options={severityFilters} value={severity} onChange={setSeverity} />} bodyClassName="px-0 pb-2">
            {active.length === 0 ?
            <EmptyState icon={BellOffIcon} title="No active alerts." description={severity === "All" ? "All alerts have been resolved." : `No active ${severity.toLowerCase()} alerts.`} /> :

            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  {head}
                  <tbody className="divide-y divide-line-soft">
                    {active.map((a) =>
                  <Row key={a.id} a={a} />
                  )}
                  </tbody>
                </table>
              </div>
            }
          </Panel>

          <Panel title="Alert History" subtitle="(Resolved today)" bodyClassName="px-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                {head}
                <tbody className="divide-y divide-line-soft">
                  {history.map((a) =>
                  <Row key={a.id} a={a} resolved />
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <DetailPanel title="Alert Details" mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)}>
          {selected ? <AlertDetail alert={selected} /> : <p className="p-6 text-center text-sm text-muted">Select an alert to see its details.</p>}
        </DetailPanel>
      </div>
    </div>);

}