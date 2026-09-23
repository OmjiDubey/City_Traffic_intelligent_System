import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon, ChevronDownIcon, LogOutIcon, MenuIcon, SettingsIcon, TrafficConeIcon, XIcon } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { useOperations } from "../../contexts/OperationsContext";
import { formatClockDate, formatClockTime, useClock } from "../../hooks/useClock";

interface HeaderProps {
  mobileNavOpen: boolean;
  onToggleMobileNav: () => void;
}

export function Header({ mobileNavOpen, onToggleMobileNav }: HeaderProps) {
  const { openAlertCount } = useOperations();
  const now = useClock();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface pr-4 lg:pr-6">
      <div className="flex h-full shrink-0 items-center gap-2 pl-3 lg:w-[200px] lg:border-r lg:border-line lg:pl-5">
        <button
          type="button"
          onClick={onToggleMobileNav}
          className="rounded-md p-2 text-navy hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}>
          
          {mobileNavOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
        <Link to="/" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy text-white">
            <TrafficConeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[0.9375rem] font-bold text-navy">City Traffic</span>
            <span className="block text-xs font-medium text-muted">Intelligence System</span>
          </span>
        </Link>
      </div>

      <div className="hidden min-w-0 flex-1 md:block lg:pl-3">
        <GlobalSearch />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <span className="hidden items-center gap-2 text-sm font-medium text-success-ink xl:flex">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          System Operational
        </span>
        <div className="tabular hidden border-l border-line pl-4 text-right leading-tight xl:block">
          <p className="text-xs text-muted">{formatClockDate(now)}</p>
          <p className="text-sm font-semibold text-ink">{formatClockTime(now)}</p>
        </div>
        <Link
          to="/alerts"
          className="relative rounded-md p-2 text-navy hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Alerts, ${openAlertCount} active`}>
          
          <BellIcon className="h-5 w-5" />
          {openAlertCount > 0 &&
          <span className="tabular absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.625rem] font-bold text-white">
              {openAlertCount}
            </span>
          }
        </Link>
        <div className="relative border-l border-line pl-2 sm:pl-4" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md p-1 hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-haspopup="menu"
            aria-expanded={menuOpen}>
            
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">AS</span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-navy">Omji Dubey</span>
              <span className="block text-xs text-muted">Control Room Admin</span>
            </span>
            <ChevronDownIcon className="h-4 w-4 text-muted" aria-hidden="true" />
          </button>
          {menuOpen &&
          <div role="menu" className="absolute right-0 top-12 w-48 rounded-md border border-line bg-surface py-1 shadow-pop">
              <button
              role="menuitem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/settings");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-canvas">
              
                <SettingsIcon className="h-4 w-4 text-muted" /> Settings
              </button>
              <button
              role="menuitem"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/signed-out");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger-ink hover:bg-canvas">
              
                <LogOutIcon className="h-4 w-4" /> Logout
              </button>
            </div>
          }
        </div>
      </div>
    </header>);

}
