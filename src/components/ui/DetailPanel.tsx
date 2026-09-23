import React, { useEffect } from "react";
import { XIcon } from "lucide-react";

interface DetailPanelProps {
  title: string;
  mobileOpen: boolean;
  onMobileClose: () => void;
  children: React.ReactNode;
  headerExtra?: React.ReactNode;
}

/**
 * Inline right-hand panel on xl screens; a slide-over sheet on smaller screens.
 */
export function DetailPanel({ title, mobileOpen, onMobileClose, children, headerExtra }: DetailPanelProps) {
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onMobileClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {mobileOpen &&
      <div className="fixed inset-0 z-40 bg-ink/30 xl:hidden" onClick={onMobileClose} aria-hidden="true" />
      }
      <aside
        aria-label={title}
        className={`${
        mobileOpen ? "fixed inset-y-0 right-0 z-50 flex w-full max-w-md" : "hidden"} min-w-0 flex-col border-line bg-surface xl:sticky xl:inset-auto xl:top-0 xl:z-auto xl:flex xl:max-h-[calc(100vh-6rem)] xl:w-auto xl:max-w-none xl:rounded-lg xl:border xl:shadow-card`
        }>
        
        <header className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
          <h2 className="text-base font-semibold text-navy">{title}</h2>
          <div className="flex items-center gap-2">
            {headerExtra}
            <button
              type="button"
              onClick={onMobileClose}
              className="rounded-md p-1.5 text-muted hover:bg-canvas hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:hidden"
              aria-label="Close details">
              
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>);

}