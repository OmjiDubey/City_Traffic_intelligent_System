import React from "react";
import { CalendarDaysIcon } from "lucide-react";
import { formatClockDate, formatClockTime, useClock } from "../../hooks/useClock";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  showClock?: boolean;
}

export function PageHeader({ title, description, actions, showClock = true }: PageHeaderProps) {
  const now = useClock();
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-navy">{title}</h1>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actions}
        {showClock &&
        <div className="tabular flex items-center gap-2 text-sm text-muted">
            <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
            <span>{formatClockDate(now)}</span>
            <span className="font-semibold text-ink">{formatClockTime(now)}</span>
          </div>
        }
      </div>
    </div>);

}