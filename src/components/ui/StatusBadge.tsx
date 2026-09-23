import React from "react";
import { twMerge } from "tailwind-merge";
import type { Tone } from "../../utils/format";

const toneClasses: Record<Tone, string> = {
  success: "bg-success-bg text-success-ink",
  warning: "bg-warning-bg text-warning-ink",
  danger: "bg-danger-bg text-danger-ink",
  info: "bg-info-bg text-info-ink",
  primary: "bg-primary-light text-primary",
  neutral: "bg-[#EEF2F6] text-muted"
};

const dotClasses: Record<Tone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  primary: "bg-primary",
  neutral: "bg-muted"
};

interface StatusBadgeProps {
  tone: Tone;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ tone, children, dot = false, className }: StatusBadgeProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}>
      
      {dot && <span className={twMerge("h-1.5 w-1.5 rounded-full", dotClasses[tone])} aria-hidden="true" />}
      {children}
    </span>);

}