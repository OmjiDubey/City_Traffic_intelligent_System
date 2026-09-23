import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { OperationsProvider } from "./contexts/OperationsContext";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { LiveMonitoring } from "./pages/LiveMonitoring";
import { TrafficAnalytics } from "./pages/TrafficAnalytics";
import { VehicleTracking } from "./pages/VehicleTracking";
import { Violations } from "./pages/Violations";
import { Alerts } from "./pages/Alerts";
import { Cameras } from "./pages/Cameras";
import { Settings } from "./pages/Settings";
import { SignedOut } from "./pages/SignedOut";

export function App() {
  return (
    <OperationsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signed-out" element={<SignedOut />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-monitoring" element={<LiveMonitoring />} />
            <Route path="/traffic-analytics" element={<TrafficAnalytics />} />
            <Route path="/vehicle-tracking" element={<VehicleTracking />} />
            <Route path="/violations" element={<Violations />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: "Inter, sans-serif" } }} />
    </OperationsProvider>);

}