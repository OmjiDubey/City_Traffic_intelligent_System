import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon, CalendarCheckIcon, CheckCircle2Icon, ClockIcon, FileSearchIcon, FileWarningIcon, SearchIcon, TriangleAlertIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { KpiCard } from "../components/ui/KpiCard";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";
import { StatusBadge } from "../components/ui/StatusBadge";
import { EmptyState } from "../components/ui/EmptyState";
import { DetailPanel } from "../components/ui/DetailPanel";
import { ViolationDetail } from "../components/violations/ViolationDetail";
import { useOperations } from "../contexts/OperationsContext";
import { violations as seedViolations } from "../data/violations";
import { confidenceClass, normalizePlate, violationTone } from "../utils/format";

const types = ["All types", "Red-light violation", "Wrong-way movement", "Illegal parking", "Lane violation", "Over-speeding"];
const statuses = ["All statuses", "Pending", "Verified", "Rejected"];
const dates = ["All dates", "23 Sep 2026", "22 Sep 2026"];
const confidences = ["Any confidence", "≥ 90%", "≥ 80%", "≥ 70%"];
const PENDING_BASE = 36;
const VERIFIED_BASE = 71;

type SortKey = "time" | "confidence";

export function Violations() {
  const { violations } = useOperations();
  const [params, setParams] = useSearchParams();
  const [date, setDate] = useState("All dates");
  const [type, setType] = useState("All types");
  const [location, setLocation] = useState("All locations");
  const [status, setStatus] = useState("All statuses");
  const [plate, setPlate] = useState("");
  const [minConf, setMinConf] = useState("Any confidence");
  const [sort, setSort] = useState<{key: SortKey;dir: "asc" | "desc";}>({ key: "time", dir: "desc" });
  const [mobileOpen, setMobileOpen] = useState(Boolean(params.get("id")));

  const locations = useMemo(() => ["All locations", ...Array.from(new Set(violations.map((v) => v.location)))], [violations]);

  const filtered = useMemo(() => {
    const min = minConf === "Any confidence" ? 0 : Number(minConf.replace(/\D/g, ""));
    const q = normalizePlate(plate);
    const rows = violations.filter(
      (v) =>
      (date === "All dates" || v.date === date) && (
      type === "All types" || v.type === type) && (
      location === "All locations" || v.location === location) && (
      status === "All statuses" || v.status === status) && (
      !q || normalizePlate(v.plate).includes(q)) &&
      v.confidence >= min
    );
    return [...rows].sort((a, b) => {
      const av = sort.key === "time" ? `${a.date === "23 Sep 2026" ? 1 : 0}${a.time}` : String(a.confidence).padStart(3, "0");
      const bv = sort.key === "time" ? `${b.date === "23 Sep 2026" ? 1 : 0}${b.time}` : String(b.confidence).padStart(3, "0");
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [violations, date, type, location, status, plate, minConf, sort]);

  const selectedId = params.get("id") ?? filtered[0]?.id;
  const selected = violations.find((v) => v.id === selectedId) ?? null;

  const seedPending = seedViolations.filter((v) => v.status === "Pending").length;
  const seedVerified = seedViolations.filter((v) => v.status === "Verified").length;
  const pending = PENDING_BASE - seedPending + violations.filter((v) => v.status === "Pending").length;
  const verified = VERIFIED_BASE - seedVerified + violations.filter((v) => v.status === "Verified").length;

  const select = (id: string) => {
    setParams({ id });
    setMobileOpen(true);
  };

  const toggleSort = (key: SortKey) =>
  setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" });

  const clearFilters = () => {
    setDate("All dates");
    setType("All types");
    setLocation("All locations");
    setStatus("All statuses");
    setPlate("");
    setMinConf("Any confidence");
  };

  const SortHeader = ({ k, label }: {k: SortKey;label: string;}) =>
  <button type="button" onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 font-semibold hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Sort by ${label}`}>
      {label}
      {sort.key === k && (sort.dir === "asc" ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />)}
    </button>;


  return (
    <div className="space-y-3">
      <PageHeader title="Violations" description="Review detected traffic violations and the evidence supporting them." />

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon={FileWarningIcon} label="Total Violations" value="842" note="last 7 days" />
        <KpiCard icon={ClockIcon} tone="warning" label="Pending Review" value={pending} note="awaiting an operator" />
        <KpiCard icon={CheckCircle2Icon} tone="success" label="Verified" value={verified} note="today" />
        <KpiCard icon={CalendarCheckIcon} tone="danger" label="Today" value="124" trend={{ value: "8%", direction: "up", tone: "bad" }} note="vs. yesterday" />
        <KpiCard icon={TriangleAlertIcon} label="Most Common" value={<span className="text-xl">Red-light</span>} note="41% of today's cases" />
      </div>

      <Panel bodyClassName="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          <SelectField label="Date" value={date} options={dates} onChange={setDate} />
          <SelectField label="Violation type" value={type} options={types} onChange={setType} />
          <SelectField label="Camera / location" value={location} options={locations} onChange={setLocation} />
          <SelectField label="Status" value={status} options={statuses} onChange={setStatus} />
          <div className="flex flex-col gap-1">
            <label htmlFor="vio-plate" className="text-xs font-medium text-muted">
              License plate
            </label>
            <div className="relative">
              <input id="vio-plate" value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="e.g. UP32 CD 7781" className="h-[30px] w-full rounded-md border border-line pl-3 pr-8 text-xs text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <SearchIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            </div>
          </div>
          <SelectField label="Confidence" value={minConf} options={confidences} onChange={setMinConf} />
        </div>
      </Panel>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_26.25rem]">
        <Panel title="Violation Records" subtitle={`(${filtered.length} shown)`} bodyClassName="px-0 pb-2">
          {filtered.length === 0 ?
          <EmptyState
            icon={FileSearchIcon}
            title="No violations found for the selected filters."
            action={
            <button type="button" onClick={clearFilters} className="h-[30px] rounded-md border border-primary px-4 text-xs font-semibold text-primary hover:bg-primary-light">
                  Clear filters
                </button>
            } /> :


          <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-xs">
                <thead className="border-y border-line bg-canvas text-left text-xs text-muted">
                  <tr>
                    <th className="px-4 py-2"><SortHeader k="time" label="Time" /></th>
                    <th className="px-3 py-2 font-semibold">Plate</th>
                    <th className="px-3 py-2 font-semibold">Violation</th>
                    <th className="px-3 py-2 font-semibold">Location</th>
                    <th className="px-3 py-2 font-semibold">Camera</th>
                    <th className="px-3 py-2"><SortHeader k="confidence" label="Confidence" /></th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-4 py-2 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filtered.map((v) => {
                  const isSel = v.id === selectedId;
                  return (
                    <tr key={v.id} onClick={() => select(v.id)} className={`cursor-pointer transition-colors duration-150 ${isSel ? "bg-primary-light" : "hover:bg-canvas"}`} aria-selected={isSel}>
                        <td className="tabular whitespace-nowrap px-4 py-1.5 text-muted">
                          {v.time}
                          {v.date !== "23 Sep 2026" && <span className="block text-xs">{v.date.slice(0, 6)}</span>}
                        </td>
                        <td className="tabular whitespace-nowrap px-3 py-1.5 font-semibold text-ink">{v.plate}</td>
                        <td className="whitespace-nowrap px-3 py-1.5 text-ink">{v.type}</td>
                        <td className="max-w-[180px] truncate px-3 py-1.5 text-ink">{v.location}</td>
                        <td className="px-3 py-1.5 text-muted">{v.cameraId}</td>
                        <td className={`tabular px-3 py-1.5 font-medium ${confidenceClass(v.confidence)}`}>{v.confidence}%</td>
                        <td className="px-3 py-1.5">
                          <StatusBadge tone={violationTone(v.status)}>{v.status}</StatusBadge>
                        </td>
                        <td className="px-4 py-1.5 text-right">
                          <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            select(v.id);
                          }}
                          className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                          
                            {v.status === "Pending" ? "Review" : "View"}
                          </button>
                        </td>
                      </tr>);

                })}
                </tbody>
              </table>
            </div>
          }
        </Panel>

        <DetailPanel title="Violation Details" mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)}>
          {selected ? <ViolationDetail violation={selected} /> : <p className="p-6 text-center text-sm text-muted">Select a violation to review its evidence.</p>}
        </DetailPanel>
      </div>
    </div>);

}