import React, { useEffect, useMemo, useState } from "react";
import { ActivityIcon, CarIcon, ClockIcon, GaugeIcon, TrafficConeIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { KpiCard } from "../components/ui/KpiCard";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { VolumePanel } from "../components/analytics/VolumePanel";
import type { RangePreset } from "../components/analytics/VolumePanel";
import { CongestionRanking } from "../components/analytics/CongestionRanking";
import { DeviationPanel } from "../components/analytics/DeviationPanel";
import { TrafficFlowPanel } from "../components/analytics/TrafficFlowPanel";
import { HistoricalTrends } from "../components/analytics/HistoricalTrends";
import { dailyVolume, hourlyVolume, locationShare } from "../data/traffic";
import { formatNumber } from "../utils/format";

const ranges: readonly RangePreset[] = ["Today", "Yesterday", "Last 7 days", "Custom"];

export function TrafficAnalytics() {
  const [range, setRange] = useState<RangePreset>("Today");
  const [location, setLocation] = useState("All locations");
  const [from, setFrom] = useState("2026-09-19");
  const [to, setTo] = useState("2026-09-23");
  const [showBaseline, setShowBaseline] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(id);
  }, [range, location, from, to]);

  const share = locationShare[location] ?? 1;

  const hourly = useMemo(
    () =>
    hourlyVolume.map((h) => ({
      label: h.hour,
      current: Math.round((range === "Yesterday" ? h.yesterday : h.today) * share),
      baseline: Math.round(h.baseline * share)
    })),
    [range, share]
  );

  const daily = useMemo(() => {
    const rows = dailyVolume.map((d, i) => ({ label: d.day, current: Math.round(d.total * share), baseline: Math.round(d.baseline * share), date: `2026-09-${17 + i}` }));
    if (range === "Custom") return rows.filter((r) => r.date >= from && r.date <= to);
    return rows;
  }, [range, share, from, to]);

  const total =
  range === "Today" || range === "Yesterday" ?
  hourly.reduce((s, h) => s + h.current, 0) :
  daily.reduce((s, d) => s + d.current, 0);
  const baseTotal =
  range === "Today" || range === "Yesterday" ?
  hourly.reduce((s, h) => s + h.baseline, 0) :
  daily.reduce((s, d) => s + d.baseline, 0);
  const change = baseTotal ? (total - baseTotal) / baseTotal * 100 : 0;

  return (
    <div className="space-y-3">
      <PageHeader title="Traffic Analytics" description="Traffic volume, movement conditions, congestion and deviations from normal patterns." />

      <Panel bodyClassName="p-2.5">
        <div className="flex flex-wrap items-end gap-2.5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted">Period</span>
            <SegmentedControl label="Period" options={ranges} value={range} onChange={setRange} />
          </div>
          {range === "Custom" &&
          <div className="flex items-end gap-2">
              <label className="flex flex-col gap-1 text-xs font-medium text-muted">
                From
                <input type="date" value={from} max={to} min="2026-09-17" onChange={(e) => setFrom(e.target.value)} className="h-[30px] rounded-md border border-line px-2.5 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-muted">
                To
                <input type="date" value={to} min={from} max="2026-09-23" onChange={(e) => setTo(e.target.value)} className="h-[30px] rounded-md border border-line px-2.5 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </label>
            </div>
          }
          <SelectField label="Camera / location" value={location} options={Object.keys(locationShare)} onChange={setLocation} className="w-full sm:w-64" />
          {range === "Custom" && <p className="pb-2 text-xs text-muted">Demo data covers 17–23 Sep 2026.</p>}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <KpiCard icon={CarIcon} label="Total Traffic Volume" value={formatNumber(total)} note={range} />
        <KpiCard icon={GaugeIcon} label="Average Speed" value="23.4 km/h" trend={{ value: "1.8 km/h", direction: "down", tone: "bad" }} note="vs. baseline" />
        <KpiCard icon={ClockIcon} label="Average Travel Time" value="18.6 min" trend={{ value: "2.1 min", direction: "up", tone: "bad" }} note="per 5 km corridor" />
        <KpiCard icon={TrafficConeIcon} tone="warning" label="Congested Locations" value="5" note="2 heavy · 3 moderate" />
        <KpiCard
          icon={ActivityIcon}
          label="Change vs Baseline"
          value={`${change > 0 ? "+" : ""}${change.toFixed(1)}%`}
          trend={{ value: Math.abs(change) >= 5 ? "Above normal" : "Normal", direction: change >= 0 ? "up" : "down", tone: Math.abs(change) >= 5 ? "bad" : "neutral" }} />
        
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <VolumePanel className="xl:col-span-8" range={range} loading={loading} hourly={hourly} daily={daily} showBaseline={showBaseline} onToggleBaseline={setShowBaseline} />
        <CongestionRanking className="xl:col-span-4" />
      </div>

      <DeviationPanel />
      <TrafficFlowPanel />
      <HistoricalTrends />
    </div>);

}