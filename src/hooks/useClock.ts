import { useEffect, useState } from "react";

export function useClock(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function formatClockDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

export function formatClockTime(d: Date): string {
  return d.toLocaleTimeString("en-GB", { hour12: false });
}