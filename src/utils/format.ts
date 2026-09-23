import type { AlertSeverity, AlertStatus, CameraStatus, ViolationStatus } from "../types/traffic";

export type Tone = "success" | "warning" | "danger" | "info" | "primary" | "neutral";

export function normalizePlate(value: string): string {
  return value.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export function looksLikePlate(value: string): boolean {
  return /^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{3,4}$/.test(normalizePlate(value));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export function cameraTone(status: CameraStatus): Tone {
  return status === "Online" ? "success" : status === "Degraded" ? "warning" : "danger";
}

export function violationTone(status: ViolationStatus): Tone {
  return status === "Verified" ? "success" : status === "Rejected" ? "neutral" : "warning";
}

export function severityTone(severity: AlertSeverity): Tone {
  if (severity === "Critical") return "danger";
  if (severity === "High") return "danger";
  if (severity === "Medium") return "warning";
  return "info";
}

export function alertStatusTone(status: AlertStatus): Tone {
  return status === "Resolved" ? "success" : status === "Acknowledged" ? "neutral" : "primary";
}

export function confidenceClass(value: number): string {
  if (value >= 90) return "text-success-ink";
  if (value >= 80) return "text-warning-ink";
  return "text-danger-ink";
}

export function nowTime(): string {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}