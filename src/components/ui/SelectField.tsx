import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SelectFieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  hideLabel?: boolean;
  className?: string;
}

export function SelectField({ label, value, options, onChange, hideLabel = false, className }: SelectFieldProps) {
  const id = `sel-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={twMerge("flex min-w-0 flex-col gap-1", className)}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-xs font-medium text-muted"}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[30px] w-full appearance-none truncate rounded-md border border-line bg-surface pl-2.5 pr-7 text-xs text-ink transition-colors duration-150 hover:border-[#B8C6D6] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
          
          {options.map((o) =>
          <option key={o} value={o}>
              {o}
            </option>
          )}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
          aria-hidden="true" />
        
      </div>
    </div>);

}