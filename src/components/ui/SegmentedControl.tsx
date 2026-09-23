import React from "react";

interface SegmentedControlProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex h-[30px] overflow-hidden rounded-md border border-line bg-surface">
      {options.map((o, i) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={`whitespace-nowrap px-2.5 text-xs transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
            i > 0 ? "border-l border-line" : ""} ${
            active ? "bg-primary-light font-semibold text-primary" : "font-medium text-muted hover:bg-canvas hover:text-navy"}`}>
            
            {o}
          </button>);

      })}
    </div>);

}