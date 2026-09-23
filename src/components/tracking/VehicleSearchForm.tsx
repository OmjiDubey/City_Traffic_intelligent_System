import React, { forwardRef } from "react";
import { ArrowRightIcon, Loader2Icon, RotateCcwIcon, SearchIcon, XCircleIcon } from "lucide-react";

export interface SearchValues {
  plate: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
}

interface VehicleSearchFormProps {
  values: SearchValues;
  loading: boolean;
  onChange: (values: SearchValues) => void;
  onSearch: () => void;
  onReset: () => void;
}

const times = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).concat("23:59");
const inputBase =
"h-[30px] w-full rounded-md border border-line bg-surface text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const VehicleSearchForm = forwardRef<HTMLInputElement, VehicleSearchFormProps>(function VehicleSearchForm(
{ values, loading, onChange, onSearch, onReset },
ref)
{
  const set = (patch: Partial<SearchValues>) => onChange({ ...values, ...patch });

  return (
    <section className="rounded-lg border border-line bg-surface p-4 shadow-card sm:p-5" aria-labelledby="search-vehicle-title">
      <h2 id="search-vehicle-title" className="text-lg font-semibold text-navy">
        Search Vehicle
      </h2>
      <form
        className="mt-3 grid grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-[minmax(13.75rem,1.3fr)_minmax(16.25rem,1.2fr)_minmax(13.75rem,1fr)_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}>
        
        <div>
          <label htmlFor="plate" className="text-xs font-medium text-muted">
            License Plate Number
          </label>
          <div className="relative mt-1">
            <input
              ref={ref}
              id="plate"
              value={values.plate}
              onChange={(e) => set({ plate: e.target.value.toUpperCase() })}
              placeholder="Enter plate number"
              className={`${inputBase} tabular pl-3 pr-9 font-semibold tracking-wide`}
              autoComplete="off"
              required />
            
            {values.plate &&
            <button
              type="button"
              onClick={() => set({ plate: "" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Clear plate number">
              
                <XCircleIcon className="h-4 w-4" />
              </button>
            }
          </div>
          <p className="mt-1 text-xs text-muted">e.g. UP32 AB 4521, DL8C XY 9012</p>
        </div>

        <fieldset>
          <legend className="text-xs font-medium text-muted">Date Range</legend>
          <div className="mt-1 flex items-center gap-2">
            <input type="date" aria-label="From date" value={values.fromDate} max={values.toDate} onChange={(e) => set({ fromDate: e.target.value })} className={`${inputBase} px-2.5`} />
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <input type="date" aria-label="To date" value={values.toDate} min={values.fromDate} onChange={(e) => set({ toDate: e.target.value })} className={`${inputBase} px-2.5`} />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-medium text-muted">Time Range</legend>
          <div className="mt-1 flex items-center gap-2">
            <select aria-label="From time" value={values.fromTime} onChange={(e) => set({ fromTime: e.target.value })} className={`${inputBase} tabular px-2.5`}>
              {times.map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <select aria-label="To time" value={values.toTime} onChange={(e) => set({ toTime: e.target.value })} className={`${inputBase} tabular px-2.5`}>
              {times.map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
          </div>
        </fieldset>

        <div className="flex gap-3 md:col-span-2 xl:col-span-1 xl:mt-5">
          <button
            type="submit"
            disabled={loading}
            className="flex h-[30px] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 text-xs font-semibold text-white transition-colors duration-150 hover:bg-primary-hover disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 xl:w-36 xl:flex-none">
            
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
            {loading ? "Searching" : "Search"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex h-[30px] flex-1 items-center justify-center gap-2 rounded-md border border-primary bg-surface px-5 text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:w-28 xl:flex-none">
            
            <RotateCcwIcon className="h-4 w-4" />
            Reset
          </button>
        </div>
      </form>
    </section>);

});