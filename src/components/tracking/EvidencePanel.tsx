import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { LicensePlate } from "../ui/LicensePlate";
import { confidenceClass } from "../../utils/format";
import type { TrackedVehicle } from "../../types/traffic";

interface EvidencePanelProps {
  vehicle: TrackedVehicle;
  index: number;
  onChange: (index: number) => void;
}

export function EvidencePanel({ vehicle, index, onChange }: EvidencePanelProps) {
  const s = vehicle.sightings[index];
  const b = vehicle.evidenceBox;
  const total = vehicle.sightings.length;

  const download = () => {
    const record = {
      plate: vehicle.plate,
      ocrConfidence: s.plateConfidence,
      vehicleType: s.vehicleType,
      vehicleConfidence: s.vehicleConfidence,
      cameraId: s.cameraId,
      location: s.location,
      timestamp: `${vehicle.date}, ${s.time}`,
      frame: vehicle.frameImage
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `evidence_${vehicle.plate.replace(/\s/g, "")}_${s.cameraId}_${s.time.replace(/:/g, "")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Evidence record downloaded", { description: `${s.cameraId} · ${s.time}` });
  };

  const rows: [string, React.ReactNode][] = [
  ["License Plate", vehicle.plate],
  ["OCR Confidence", <span className={confidenceClass(s.plateConfidence)}>{s.plateConfidence}%</span>],
  ["Vehicle Type", s.vehicleType],
  ["Vehicle Confidence", <span className={confidenceClass(s.vehicleConfidence)}>{s.vehicleConfidence}%</span>],
  ["Camera ID", s.cameraId],
  ["Location", s.location],
  ["Timestamp", `${vehicle.date}, ${s.time}`]];


  return (
    <section className="flex min-w-0 flex-col rounded-lg border border-line bg-surface shadow-card" aria-label="Detection details">
      <header className="flex items-center justify-between gap-2 px-3 py-2">
        <h2 className="text-base font-semibold text-navy">Detection Details</h2>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onChange(Math.max(0, index - 1))} disabled={index === 0} className="rounded-md border border-line p-1.5 text-navy hover:bg-canvas disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Previous detection">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="tabular w-14 text-center text-sm text-muted" aria-live="polite">
            {index + 1} of {total}
          </span>
          <button type="button" onClick={() => onChange(Math.min(total - 1, index + 1))} disabled={index === total - 1} className="rounded-md border border-line p-1.5 text-navy hover:bg-canvas disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Next detection">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="space-y-3 px-4 pb-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#0B1422]">
          <img src={vehicle.frameImage} alt={`Original frame from ${s.cameraId}`} className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
            {s.cameraId} – {s.location.split(" – ")[0]}
          </span>
          <span className="tabular absolute right-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[0.6875rem] text-white">
            {vehicle.date.slice(0, 6)} {s.time}
          </span>
          <div className="absolute border-2 border-[#22C55E]" style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}>
            <span className="tabular absolute -top-[1.125rem] left-[-2px] whitespace-nowrap bg-[#16A34A] px-1 text-[0.625rem] font-semibold leading-4 text-white">{vehicle.plate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <figure>
            <div
              role="img"
              aria-label="Vehicle crop"
              className="aspect-[4/3] rounded-md border border-line bg-[#0B1422] bg-no-repeat"
              style={{ backgroundImage: `url(${vehicle.frameImage})`, backgroundSize: `${Math.round(10000 / (b.w * 1.15))}%`, backgroundPosition: `${b.x + b.w / 2}% ${b.y + b.h / 2}%` }} />
            
            <figcaption className="mt-1 text-center text-xs text-muted">Vehicle Crop</figcaption>
          </figure>
          <figure>
            <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-line bg-[#1F2937] p-2">
              <LicensePlate plate={vehicle.plate} size="lg" className="max-w-full scale-[0.8] sm:scale-90" />
            </div>
            <figcaption className="mt-1 text-center text-xs text-muted">License Plate Crop</figcaption>
          </figure>
        </div>

        <dl className="divide-y divide-line-soft border-t border-line text-sm">
          {rows.map(([k, v]) =>
          <div key={k} className="grid grid-cols-[8.75rem_minmax(0,1fr)] gap-2 py-1.5">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular truncate font-semibold text-ink">{v}</dd>
            </div>
          )}
        </dl>

        <button type="button" onClick={download} className="flex h-[30px] w-full items-center justify-center gap-2 rounded-md border border-primary text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <DownloadIcon className="h-4 w-4" /> Download Evidence
        </button>
      </div>
    </section>);

}