import React from "react";
import { twMerge } from "tailwind-merge";

interface LicensePlateProps {
  plate: string;
  size?: "sm" | "lg";
  className?: string;
}

/** Indian HSRP-style number plate rendering. */
export function LicensePlate({ plate, size = "sm", className }: LicensePlateProps) {
  const lg = size === "lg";
  return (
    <span
      className={twMerge(
        "inline-flex items-stretch overflow-hidden rounded border-2 border-[#1F2937] bg-white font-bold text-[#111827]",
        lg ? "h-14" : "h-7",
        className
      )}
      aria-label={`Plate ${plate}`}>
      
      <span
        className={twMerge(
          "flex flex-col items-center justify-center bg-[#1E4FA3] font-semibold text-white",
          lg ? "w-7 text-[0.5625rem]" : "w-4 text-[0.375rem]"
        )}
        aria-hidden="true">
        
        IND
      </span>
      <span className={twMerge("tabular flex items-center whitespace-nowrap tracking-wider", lg ? "px-4 text-2xl" : "px-2 text-xs")}>
        {plate}
      </span>
    </span>);

}