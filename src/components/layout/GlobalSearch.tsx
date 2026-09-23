import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFrontIcon, CctvIcon, SearchIcon } from "lucide-react";
import { cameras } from "../../data/cameras";
import { looksLikePlate } from "../../utils/format";

interface Result {
  key: string;
  label: string;
  hint: string;
  kind: "camera" | "plate";
  to: string;
}

export function GlobalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const list: Result[] = [];
    if (looksLikePlate(query)) {
      list.push({
        key: "plate",
        label: query.trim().toUpperCase(),
        hint: "Track vehicle",
        kind: "plate",
        to: `/vehicle-tracking?plate=${encodeURIComponent(query.trim())}`
      });
    }
    cameras.
    filter((c) => c.id.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)).
    slice(0, 6).
    forEach((c) =>
    list.push({ key: c.id, label: `${c.id} · ${c.location}`, hint: c.status, kind: "camera", to: `/cameras?id=${c.id}` })
    );
    return list;
  }, [query]);

  const choose = (r: Result) => {
    navigate(r.to);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <label htmlFor="global-search" className="sr-only">
        Search cameras, locations or plate number
      </label>
      <input
        ref={inputRef}
        id="global-search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        placeholder="Search cameras, locations or plate number…"
        className="h-[30px] w-full rounded-md border border-line bg-surface pl-3.5 pr-10 text-xs text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="global-search-results"
        autoComplete="off" />
      
      <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      {open && query.trim() &&
      <ul
        id="global-search-results"
        role="listbox"
        className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-md border border-line bg-surface py-1 shadow-pop">
        
          {results.length === 0 ?
        <li className="px-3 py-2.5 text-xs text-muted">No cameras or locations match “{query}”.</li> :

        results.map((r, i) =>
        <li key={r.key} role="option" aria-selected={i === active}>
                <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => choose(r)}
            onMouseEnter={() => setActive(i)}
            className={`flex w-full items-center gap-3 px-3 py-2 text-left text-xs ${i === active ? "bg-primary-light" : ""}`}>
            
                  {r.kind === "plate" ?
            <CarFrontIcon className="h-4 w-4 text-primary" aria-hidden="true" /> :

            <CctvIcon className="h-4 w-4 text-muted" aria-hidden="true" />
            }
                  <span className="flex-1 truncate text-ink">{r.label}</span>
                  <span className="text-xs text-muted">{r.hint}</span>
                </button>
              </li>
        )
        }
        </ul>
      }
    </div>);

}
