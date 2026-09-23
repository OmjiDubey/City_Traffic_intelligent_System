import React from "react";
import { twMerge } from "tailwind-merge";

interface PanelProps {
  title?: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  id?: string;
}

export function Panel({ title, subtitle, action, className, bodyClassName, children, id }: PanelProps) {
  return (
    <section id={id} className={twMerge("min-w-0 rounded-lg border border-line bg-surface shadow-card", className)}>
      {title &&
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pb-3 pt-3.5">
          <h2 className="text-base font-semibold text-navy">
            {title}
            {subtitle && <span className="ml-1.5 text-sm font-normal text-muted">{subtitle}</span>}
          </h2>
          {action}
        </header>
      }
      <div className={twMerge(title ? "px-4 pb-4" : "p-4", bodyClassName)}>{children}</div>
    </section>);

}