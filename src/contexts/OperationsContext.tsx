import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { alerts as initialAlerts } from "../data/alerts";
import { violations as initialViolations } from "../data/violations";
import { nowTime } from "../utils/format";
import type { AlertStatus, TrafficAlert, Violation, ViolationStatus } from "../types/traffic";

interface OperationsValue {
  violations: Violation[];
  alerts: TrafficAlert[];
  setViolationStatus: (id: string, status: ViolationStatus) => void;
  setAlertStatus: (id: string, status: AlertStatus) => void;
  openAlertCount: number;
}

const OperationsContext = createContext<OperationsValue | null>(null);

export function OperationsProvider({ children }: {children: React.ReactNode;}) {
  const [violations, setViolations] = useState<Violation[]>(initialViolations);
  const [alerts, setAlerts] = useState<TrafficAlert[]>(initialAlerts);

  const setViolationStatus = useCallback((id: string, status: ViolationStatus) => {
    setViolations((prev) => prev.map((v) => v.id === id ? { ...v, status } : v));
  }, []);

  const setAlertStatus = useCallback((id: string, status: AlertStatus) => {
    setAlerts((prev) =>
    prev.map((a) =>
    a.id === id ? { ...a, status, resolvedAt: status === "Resolved" ? nowTime().slice(0, 5) : a.resolvedAt } : a
    )
    );
  }, []);

  const value = useMemo(
    () => ({
      violations,
      alerts,
      setViolationStatus,
      setAlertStatus,
      openAlertCount: alerts.filter((a) => a.status !== "Resolved").length
    }),
    [violations, alerts, setViolationStatus, setAlertStatus]
  );

  return <OperationsContext.Provider value={value}>{children}</OperationsContext.Provider>;
}

export function useOperations(): OperationsValue {
  const ctx = useContext(OperationsContext);
  if (!ctx) throw new Error("useOperations must be used inside OperationsProvider");
  return ctx;
}