import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, BellIcon, CarIcon, TrafficConeIcon, TriangleAlertIcon, VideoIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { KpiCard } from "../components/ui/KpiCard";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";
import { StatusBadge } from "../components/ui/StatusBadge";
import { CameraFeed } from "../components/camera/CameraFeed";
import { TrafficVolumeChart } from "../components/charts/TrafficVolumeChart";
import { CongestionChart } from "../components/charts/CongestionChart";
import { cameras } from "../data/cameras";
import { congestionTrend, hourlyVolume, locationShare } from "../data/traffic";
import { useOperations } from "../contexts/OperationsContext";
import { alertStatusTone, severityTone, violationTone } from "../utils/format";

const dashboardFeeds = ["CAM-01", "CAM-02", "CAM-03", "CAM-05", "CAM-06", "CAM-04"];

export function Dashboard() {
  const navigate = useNavigate();
  const { violations, alerts, openAlertCount } = useOperations();
  const [volumeLocation, setVolumeLocation] = useState("All locations");

  const online = cameras.filter((c) => c.status !== "Offline").length;
  const volumeData = useMemo(
    () => hourlyVolume.map((h) => ({ hour: h.hour, value: Math.round(h.today * (locationShare[volumeLocation] ?? 1)) })),
    [volumeLocation]
  );
  const activeAlerts = alerts.filter((a) => a.status !== "Resolved").slice(0, 5);
  const feeds = dashboardFeeds.map((id) => cameras.find((c) => c.id === id)!);

  return (
    <div className="space-y-5">
      <PageHeader title="Welcome, Anil" description="Here's the current status of the Lucknow city traffic network." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <KpiCard icon={CarIcon} label="Total Vehicles (Today)" value="48,320" trend={{ value: "12%", direction: "up", tone: "neutral" }} note="vs. yesterday" />
        <KpiCard icon={VideoIcon} label="Active Cameras" value={`${online} / ${cameras.length}`} note={`${cameras.length - online} offline`} />
        <KpiCard icon={TriangleAlertIcon} tone="danger" label="Violations (Today)" value="124" trend={{ value: "8%", direction: "up", tone: "bad" }} note="vs. yesterday" />
        <KpiCard icon={TrafficConeIcon} label="Congestion Points" value="5" trend={{ value: "2", direction: "up", tone: "bad" }} note="vs. yesterday" />
        <KpiCard icon={BellIcon} tone="danger" label="Active Alerts" value={openAlertCount} note="require attention" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <Panel
          className="xl:col-span-7"
          title="Live Camera Feeds"
          action={
          <Link to="/live-monitoring" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all cameras <ArrowRightIcon className="h-4 w-4" />
            </Link>
          }>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {feeds.map((cam) =>
            <button
              key={cam.id}
              type="button"
              onClick={() => navigate(`/live-monitoring?camera=${cam.id}`)}
              className="block rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Open ${cam.id} ${cam.location} in Live Monitoring`}>
              
                <CameraFeed camera={cam} showTelemetry />
              </button>
            )}
          </div>
        </Panel>

        <div className="flex flex-col gap-5 xl:col-span-5">
          <Panel
            title="Traffic Volume"
            subtitle="(Last 24 hours)"
            action={
            <SelectField
              label="Traffic volume location"
              hideLabel
              value={volumeLocation}
              options={Object.keys(locationShare)}
              onChange={setVolumeLocation}
              className="w-48" />

            }>
            
            <TrafficVolumeChart data={volumeData} height={170} />
          </Panel>
          <Panel title="Congestion Trend" subtitle="(Last 24 hours, city index)">
            <CongestionChart data={congestionTrend} height={145} />
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel
          title="Recent Violations"
          action={
          <Link to="/violations" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          }
          bodyClassName="px-0 pb-2">
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-y border-line bg-canvas text-left text-xs font-semibold text-muted">
                <tr>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Plate Number</th>
                  <th className="px-4 py-2">Violation</th>
                  <th className="px-4 py-2">Camera</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {violations.slice(0, 5).map((v) =>
                <tr
                  key={v.id}
                  onClick={() => navigate(`/violations?id=${v.id}`)}
                  className="cursor-pointer transition-colors duration-150 hover:bg-canvas">
                  
                    <td className="tabular px-4 py-2.5 text-muted">{v.time.slice(0, 5)}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink">{v.plate}</td>
                    <td className="px-4 py-2.5 text-ink">{v.type}</td>
                    <td className="px-4 py-2.5 text-muted">{v.cameraId}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge tone={violationTone(v.status)}>{v.status}</StatusBadge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Active Alerts"
          action={
          <Link to="/alerts" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          }
          bodyClassName="px-0 pb-2">
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-y border-line bg-canvas text-left text-xs font-semibold text-muted">
                <tr>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Alert Type</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Severity</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {activeAlerts.map((a) =>
                <tr
                  key={a.id}
                  onClick={() => navigate(`/alerts?id=${a.id}`)}
                  className="cursor-pointer transition-colors duration-150 hover:bg-canvas">
                  
                    <td className="tabular px-4 py-2.5 text-muted">{a.time}</td>
                    <td className="px-4 py-2.5 font-medium text-ink">{a.type}</td>
                    <td className="max-w-[180px] truncate px-4 py-2.5 text-ink">{a.location}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge tone={severityTone(a.severity)}>{a.severity}</StatusBadge>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge tone={alertStatusTone(a.status)}>{a.status}</StatusBadge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>);

}