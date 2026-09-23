import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-full w-full flex-col bg-canvas">
      <Header mobileNavOpen={mobileOpen} onToggleMobileNav={() => setMobileOpen((o) => !o)} />
      <div className="flex min-h-0 flex-1">
        {mobileOpen &&
        <div className="fixed inset-0 top-12 z-30 bg-ink/30 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
        }
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          mobileOpen={mobileOpen}
          onNavigate={() => setMobileOpen(false)} />
        
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[105rem] flex-1 px-3 py-3 sm:px-4 sm:py-3.5 lg:px-5 lg:py-4">
            <Outlet />
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2 text-[11px] text-muted sm:px-6">
            <span>
              <span className="font-medium text-navy">Lucknow Traffic Control Room</span> · Integrated Traffic Management
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              All systems nominal
            </span>
          </footer>
        </main>
      </div>
    </div>);

}