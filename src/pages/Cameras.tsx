import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CctvIcon, CircleAlertIcon, PlusCircleIcon, SearchIcon, VideoIcon, VideoOffIcon, WifiIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { KpiCard } from "../components/ui/KpiCard";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";
import { StatusBadge } from "../components/ui/StatusBadge";
import { EmptyState } from "../components/ui/EmptyState";
import { DetailPanel } from "../components/ui/DetailPanel";
import { CameraHealthDetail } from "../components/cameras/CameraHealthDetail";
import { cameras } from "../data/cameras";
import { cameraTone, formatNumber } from "../utils/format";

const statuses = ["All statuses", "Online", "Degraded", "Offline"];
const zones = ["All zones", "Central", "North", "South", "East", "West"];
const types = ["All types", "ANPR", "PTZ", "Fixed Bullet", "Dome"];

export function Cameras() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [zone, setZone] = useState("All zones");
  const [type, setType] = useState("All types");
  const [mobileOpen, setMobileOpen] = useState(Boolean(params.get("id")));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cameras.filter(
      (c) =>
      (!q || c.id.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)) && (
      status === "All statuses" || c.status === status) && (
      zone === "All zones" || c.zone === zone) && (
      type === "All types" || c.type === type)
    );
  }, [query, status, zone, type]);

  const selectedId = params.get("id") ?? filtered[0]?.id;
  const selected = cameras.find((c) => c.id === selectedId) ?? null;

  const select = (id: string) => {
    setParams({ id });
    setMobileOpen(true);
  };

  const count = (s: string) => cameras.filter((c) => c.status === s).length;

  return (
    <div className="space-y-5">
      <PageHeader title="Cameras" description="Camera inventory and health across the city network." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <KpiCard icon={CctvIcon} label="Total Cameras" value={cameras.length} note="across 5 zones" />
        <KpiCard icon={WifiIcon} tone="success" label="Online" value={count("Online")} note={`${Math.round(count("Online") / cameras.length * 100)}% of network`} />
        <KpiCard icon={VideoOffIcon} tone="danger" label="Offline" value={count("Offline")} note="field team notified" />
        <KpiCard icon={CircleAlertIcon} tone="warning" label="Degraded" value={count("Degraded")} note="low FPS or high latency" />
        <KpiCard icon={PlusCircleIcon} label="Recently Added" value={cameras.filter((c) => c.recentlyAdded).length} note="last 30 days" />
      </div>

      <Panel bodyClassName="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cam-search" className="text-xs font-medium text-muted">
              Search camera / location
            </label>
            <div className="relative">
              <input id="cam-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. CAM-05 or Charbagh" className="h-9 w-full rounded-md border border-line pl-3 pr-8 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <SearchIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </div>
          </div>
          <SelectField label="Status" value={status} options={statuses} onChange={setStatus} />
          <SelectField label="Zone" value={zone} options={zones} onChange={setZone} />
          <SelectField label="Camera type" value={type} options={types} onChange={setType} />
        </div>
      </Panel>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <Panel title="Camera Inventory" subtitle={`(${filtered.length} of ${cameras.length})`} bodyClassName="px-0 pb-2">
          {filtered.length === 0 ?
          <EmptyState icon={VideoIcon} title="No cameras match your search." description="Try a different camera ID, location, or filter." /> :

          <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="border-y border-line bg-canvas text-left text-xs font-semibold text-muted">
                  <tr>
                    <th className="px-4 py-2">Camera ID</th>
                    <th className="px-3 py-2">Location</th>
                    <th className="px-3 py-2">Zone</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Last Active</th>
                    <th className="px-3 py-2 text-right">Vehicles Today</th>
                    <th className="px-4 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filtered.map((c) => {
                  const isSel = c.id === selectedId;
                  return (
                    <tr key={c.id} onClick={() => select(c.id)} className={`cursor-pointer transition-colors duration-150 ${isSel ? "bg-primary-light" : "hover:bg-canvas"}`} aria-selected={isSel}>
                        <td className="px-4 py-2.5 font-semibold text-ink">
                          {c.id}
                          {c.recentlyAdded && <span className="ml-2 text-xs font-medium text-info-ink">New</span>}
                        </td>
                        <td className="max-w-[220px] truncate px-3 py-2.5 text-ink">{c.location}</td>
                        <td className="px-3 py-2.5 text-muted">{c.zone}</td>
                        <td className="px-3 py-2.5">
                          <StatusBadge tone={cameraTone(c.status)}>{c.status}</StatusBadge>
                        </td>
                        <td className="px-3 py-2.5 text-muted">{c.lastActive}</td>
                        <td className="tabular px-3 py-2.5 text-right text-ink">{formatNumber(c.vehiclesToday)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/live-monitoring?camera=${c.id}`);
                          }}
                          className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                          
                            View
                          </button>
                        </td>
                      </tr>);

                })}
                </tbody>
              </table>
            </div>
          }
        </Panel>

        <DetailPanel title={selected ? `${selected.id} Details` : "Camera Details"} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)}>
          {selected ? <CameraHealthDetail camera={selected} /> : <p className="p-6 text-center text-sm text-muted">Select a camera to see its health.</p>}
        </DetailPanel>
      </div>
    </div>);

}