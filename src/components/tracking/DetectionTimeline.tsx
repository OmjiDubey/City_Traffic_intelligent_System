import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { EvidenceThumb } from "../camera/EvidenceThumb";
import { confidenceClass } from "../../utils/format";
import type { TrackedVehicle } from "../../types/traffic";

interface DetectionTimelineProps {
  vehicle: TrackedVehicle;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function DetectionTimeline({ vehicle, selectedIndex, onSelect }: DetectionTimelineProps) {
  const b = vehicle.evidenceBox;
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[680px] text-xs">
        <thead className="bg-canvas text-left text-xs font-semibold text-muted">
          <tr>
            <th className="w-10 px-3 py-1">#</th>
            <th className="px-3 py-1">Time</th>
            <th className="px-3 py-1">Camera ID</th>
            <th className="px-3 py-1">Location</th>
            <th className="px-3 py-1">Type</th>
            <th className="px-3 py-1">Confidence</th>
            <th className="px-3 py-1">Image</th>
            <th className="w-8 px-2 py-1">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {vehicle.sightings.map((s, i) => {
            const selected = i === selectedIndex;
            return (
              <tr
                key={s.cameraId + s.time}
                onClick={() => onSelect(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(i))}
                tabIndex={0}
                aria-selected={selected}
                className={`cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:bg-primary-light ${
                selected ? "bg-primary-light" : "hover:bg-canvas"}`
                }>
                
                <td className={`tabular px-3 py-1.5 font-semibold ${selected ? "text-primary" : "text-muted"}`}>{i + 1}</td>
                <td className="tabular px-3 py-1.5 text-ink">{s.time}</td>
                <td className="px-3 py-1.5 font-medium text-ink">{s.cameraId}</td>
                <td className="px-3 py-1.5 text-ink">{s.location}</td>
                <td className="px-3 py-1.5 text-muted">{s.vehicleType}</td>
                <td className={`tabular px-3 py-1.5 font-medium ${confidenceClass(s.plateConfidence)}`}>{s.plateConfidence}%</td>
                <td className="px-3 py-1.5">
                  <EvidenceThumb image={vehicle.frameImage} focusX={b.x + b.w / 2} focusY={b.y + b.h / 2} zoom={220} label={`Sighting ${i + 1} thumbnail`} />
                </td>
                <td className="px-2 py-1.5 text-muted">
                  <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </td>
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}