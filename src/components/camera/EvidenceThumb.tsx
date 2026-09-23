import React from "react";
import { twMerge } from "tailwind-merge";

interface EvidenceThumbProps {
  image: string;
  focusX?: number;
  focusY?: number;
  zoom?: number;
  label: string;
  className?: string;
}

/** A zoomed crop of a camera frame, used as an evidence thumbnail. */
export function EvidenceThumb({ image, focusX = 50, focusY = 70, zoom = 300, label, className }: EvidenceThumbProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={twMerge("block h-8 w-12 shrink-0 rounded-sm border border-line bg-[#0B1422] bg-no-repeat", className)}
      style={{ backgroundImage: `url(${image})`, backgroundSize: `${zoom}%`, backgroundPosition: `${focusX}% ${focusY}%` }} />);


}