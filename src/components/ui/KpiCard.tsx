import React from "react";
import { ArrowDownIcon, ArrowUpIcon, BoxIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
type IconTone = "primary" | "danger" | "warning" | "success" | "info";
const tileClasses: Record<IconTone, string> = {
  primary: "bg-primary-light text-primary",
  danger: "bg-danger-bg text-danger",
  warning: "bg-warning-bg text-warning-ink",
  success: "bg-success-bg text-success",
  info: "bg-info-bg text-info"
};
interface KpiCardProps {
  icon: BoxIcon;
  label: string;
  value: React.ReactNode;
  tone?: IconTone;
  trend?: {
    value: string;
    direction: "up" | "down";
    tone: "good" | "bad" | "neutral";
  };
  note?: string;
}
export function KpiCard({
  icon: Icon,
  label,
  value,
  tone = "primary",
  trend,
  note
}: KpiCardProps) {
  const trendColor = trend?.tone === "good" ? "text-success-ink" : trend?.tone === "bad" ? "text-danger-ink" : "text-muted";
  return <div className="flex min-w-0 items-start gap-2.5 rounded-lg border border-line bg-surface p-2.5 shadow-card">
      <div className={twMerge("flex h-8 w-8 shrink-0 items-center justify-center rounded-md", tileClasses[tone])}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted">{label}</p>
        <p className="tabular mt-0.5 truncate text-lg font-bold leading-tight text-navy">{value}</p>
        {(trend || note) && <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            {trend && <span className={twMerge("inline-flex items-center gap-0.5 font-semibold", trendColor)}>
                {trend.direction === "up" ? <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {trend.value}
              </span>}
            {note && <span className="truncate">{note}</span>}
          </p>}
      </div>
    </div>;
}
