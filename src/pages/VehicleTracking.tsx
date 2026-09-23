import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CarFrontIcon, Loader2Icon, Maximize2Icon, Minimize2Icon, SearchXIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { VehicleSearchForm } from "../components/tracking/VehicleSearchForm";
import type { SearchValues } from "../components/tracking/VehicleSearchForm";
import { VehicleSummary } from "../components/tracking/VehicleSummary";
import { RouteMap } from "../components/tracking/RouteMap";
import { DetectionTimeline } from "../components/tracking/DetectionTimeline";
import { EvidencePanel } from "../components/tracking/EvidencePanel";
import { recentSearches, trackedVehicles } from "../data/vehicles";
import { normalizePlate } from "../utils/format";
import type { TrackedVehicle } from "../types/traffic";

type Status = "idle" | "loading" | "found" | "notfound";

const defaults: SearchValues = { plate: "", fromDate: "2026-09-23", toDate: "2026-09-23", fromTime: "00:00", toTime: "23:59" };
const VEHICLE_DATE = "2026-09-23";

export function VehicleTracking() {
  const [params, setParams] = useSearchParams();
  const [values, setValues] = useState<SearchValues>({ ...defaults, plate: params.get("plate")?.toUpperCase() ?? "" });
  const [status, setStatus] = useState<Status>("idle");
  const [vehicle, setVehicle] = useState<TrackedVehicle | null>(null);
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number>();

  const runSearch = useCallback((v: SearchValues) => {
    window.clearTimeout(timer.current);
    setStatus("loading");
    setVehicle(null);
    timer.current = window.setTimeout(() => {
      const match = trackedVehicles.find((t) => normalizePlate(t.plate) === normalizePlate(v.plate));
      const dateOk = v.fromDate <= VEHICLE_DATE && v.toDate >= VEHICLE_DATE;
      const timeOk = match ? v.fromTime <= match.lastSeen.slice(0, 5) && v.toTime >= match.firstSeen.slice(0, 5) : false;
      if (match && dateOk && timeOk) {
        setVehicle(match);
        setSelected(0);
        setStatus("found");
      } else {
        setStatus("notfound");
      }
    }, 700);
  }, []);

  useEffect(() => {
    const p = params.get("plate");
    if (p) runSearch({ ...defaults, plate: p.toUpperCase() });
    return () => window.clearTimeout(timer.current);
    // Run only on first mount for deep links.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => {
    if (!values.plate.trim()) return;
    setParams({ plate: values.plate.trim() });
    runSearch(values);
  };

  const onReset = () => {
    window.clearTimeout(timer.current);
    setValues(defaults);
    setVehicle(null);
    setStatus("idle");
    setParams({});
    inputRef.current?.focus();
  };

  const quickSearch = (plate: string) => {
    const v = { ...defaults, plate };
    setValues(v);
    setParams({ plate });
    runSearch(v);
  };

  return (
    <div className="space-y-3">
      <PageHeader title="Vehicle Tracking" description="Search a vehicle by license plate number to view its journey, camera sightings and route on map." />

      <VehicleSearchForm ref={inputRef} values={values} loading={status === "loading"} onChange={setValues} onSearch={onSearch} onReset={onReset} />

      {status === "found" && vehicle && <VehicleSummary vehicle={vehicle} />}
      {status === "loading" &&
      <div className="flex h-[6.5rem] items-center gap-4 rounded-lg border border-line bg-surface p-4 shadow-card" aria-busy="true">
          <div className="h-[4.5rem] w-[6.5rem] animate-pulse rounded-md bg-[#EEF2F6]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-[#EEF2F6]" />
            <div className="h-3 w-64 animate-pulse rounded bg-[#EEF2F6]" />
          </div>
        </div>
      }
      {status === "idle" &&
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-primary-light px-4 py-3 text-sm">
          <CarFrontIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="text-navy">Routes are only reconstructed for a vehicle you search for. Enter a plate number to begin.</p>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <span className="text-xs text-muted">Recent:</span>
            {recentSearches.map((p) =>
          <button key={p} type="button" onClick={() => quickSearch(p)} className="tabular rounded border border-line bg-surface px-2 py-1 text-xs font-semibold text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {p}
              </button>
          )}
          </div>
        </div>
      }
      {status === "notfound" &&
      <div className="rounded-lg border border-line bg-surface shadow-card">
          <EmptyState
          icon={SearchXIcon}
          title="No matching vehicle found for the selected plate number and time range."
          description={`No ANPR sightings of “${values.plate}” between ${values.fromDate} ${values.fromTime} and ${values.toDate} ${values.toTime}.`}
          action={
          <button type="button" onClick={() => inputRef.current?.focus()} className="h-[30px] rounded-md border border-primary px-3 text-xs font-semibold text-primary hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Modify search
              </button>
          } />
        
        </div>
      }

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="min-w-0 rounded-lg border border-line bg-surface p-4 shadow-card" aria-label="Vehicle route">
          <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-navy">Vehicle Route</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-[3px] w-6 rounded bg-primary" aria-hidden="true" /> Observed route
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-6 border-t-[3px] border-dashed border-[#5B8FD6]" aria-hidden="true" /> Inferred segment
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" /> Camera location
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true" /> Start
                <span className="ml-2 h-2.5 w-2.5 rounded-full bg-danger" aria-hidden="true" /> End
              </span>
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="rounded-md border border-line p-1.5 text-navy hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={expanded ? "Reduce map" : "Enlarge map"}>
                
                {expanded ? <Minimize2Icon className="h-4 w-4" /> : <Maximize2Icon className="h-4 w-4" />}
              </button>
            </div>
          </header>

          <div className="relative">
            <RouteMap vehicle={status === "found" ? vehicle : null} selectedIndex={selected} onSelect={setSelected} height={expanded ? 560 : 340} />
            {status === "loading" &&
            <div className="absolute inset-0 z-[1000] flex items-center justify-center rounded-md bg-surface/70">
                <span className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm font-medium text-navy shadow-card">
                  <Loader2Icon className="h-4 w-4 animate-spin text-primary" /> Reconstructing route…
                </span>
              </div>
            }
          </div>
          {status === "found" &&
          <p className="mt-2 text-xs text-muted">Solid segments are reconstructed from consecutive camera observations. Dashed segments are inferred where no camera observed the vehicle.</p>
          }

          <h2 className="mb-2 mt-5 text-base font-semibold text-navy">
            Detection Timeline {vehicle && status === "found" && <span className="text-sm font-normal text-muted">({vehicle.sightings.length} sightings)</span>}
          </h2>
          {status === "found" && vehicle ?
          <DetectionTimeline vehicle={vehicle} selectedIndex={selected} onSelect={setSelected} /> :

          <div className="rounded-md border border-dashed border-line">
              <p className="px-4 py-6 text-center text-sm text-muted">
                {status === "loading" ? "Loading camera sightings…" : "Camera sightings appear here after a successful search."}
              </p>
            </div>
          }
        </section>

        {status === "found" && vehicle ?
        <EvidencePanel vehicle={vehicle} index={selected} onChange={setSelected} /> :

        <section className="rounded-lg border border-line bg-surface shadow-card" aria-label="Detection details">
            <h2 className="px-4 pt-3.5 text-base font-semibold text-navy">Detection Details</h2>
            <p className="px-4 py-10 text-center text-sm text-muted">Select a sighting to review the original frame, crops and OCR result.</p>
          </section>
        }
      </div>
    </div>);

}