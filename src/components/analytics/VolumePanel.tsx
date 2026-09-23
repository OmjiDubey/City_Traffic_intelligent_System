import React from "react";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "../ui/Panel";
import { axisTick } from "../charts/TrafficVolumeChart";

export type RangePreset = "Today" | "Yesterday" | "Last 7 days" | "Custom";

interface VolumePanelProps {
  range: RangePreset;
  loading: boolean;
  hourly: {label: string;current: number;baseline: number;}[];
  daily: {label: string;current: number;baseline: number;}[];
  showBaseline: boolean;
  onToggleBaseline: (v: boolean) => void;
  className?: string;
}

const tooltipStyle = { borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 };

export function VolumePanel({ range, loading, hourly, daily, showBaseline, onToggleBaseline, className }: VolumePanelProps) {
  const isHourly = range === "Today" || range === "Yesterday";
  const data = isHourly ? hourly : daily;
  const currentLabel = range === "Yesterday" ? "Yesterday" : isHourly ? "Today" : "Daily total";

  return (
    <Panel
      className={className}
      title="Traffic Volume"
      subtitle={isHourly ? `(Hourly · ${range})` : `(Daily · ${range})`}
      action={
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
          type="checkbox"
          checked={showBaseline}
          onChange={(e) => onToggleBaseline(e.target.checked)}
          className="h-4 w-4 rounded border-line text-primary accent-[#1976D2]" />
        
          Show historical baseline
        </label>
      }>
      
      <div className="relative" aria-busy={loading}>
        {loading &&
        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-2 bg-surface p-2" aria-hidden="true">
            <div className="flex h-full items-end gap-1.5">
              {Array.from({ length: 24 }, (_, i) =>
            <div key={i} className="flex-1 animate-pulse rounded-sm bg-[#EEF2F6]" style={{ height: `${30 + i * 37 % 60}%` }} />
            )}
            </div>
          </div>
        }
        <ResponsiveContainer width="100%" height={270}>
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E9EEF4" />
            <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} interval={isHourly ? 1 : 0} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : String(v)} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [v.toLocaleString("en-IN"), name]} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#5B6B7F" }} />
            {isHourly ?
            <Area type="monotone" dataKey="current" name={currentLabel} stroke="#1976D2" strokeWidth={2} fill="#E8F2FC" fillOpacity={1} /> :

            <Bar dataKey="current" name={currentLabel} fill="#1976D2" radius={[2, 2, 0, 0]} maxBarSize={36} />
            }
            {showBaseline &&
            <Line type="monotone" dataKey="baseline" name="Historical baseline" stroke="#123B6D" strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
            }
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>);

}