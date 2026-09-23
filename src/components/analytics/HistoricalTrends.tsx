import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "../ui/Panel";
import { SegmentedControl } from "../ui/SegmentedControl";
import { axisTick } from "../charts/TrafficVolumeChart";
import { hourlyVolume, weekComparison } from "../../data/traffic";

const modes = ["Today vs historical average", "This week vs previous week"] as const;
type Mode = (typeof modes)[number];

const tooltipStyle = { borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 };

export function HistoricalTrends() {
  const [mode, setMode] = useState<Mode>(modes[0]);
  const weekData = weekComparison.map((w) => ({ day: w.day, "This week": w.thisWeek || null, "Previous week": w.lastWeek }));

  return (
    <Panel title="Historical Trends" action={<SegmentedControl label="Comparison" options={modes} value={mode} onChange={setMode} />}>
      <ResponsiveContainer width="100%" height={210}>
        {mode === modes[0] ?
        <LineChart data={hourlyVolume} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E9EEF4" />
            <XAxis dataKey="hour" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} interval={2} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="today" name="Today" stroke="#1976D2" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="baseline" name="Historical average (Tuesdays, 8 wk)" stroke="#123B6D" strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
          </LineChart> :

        <BarChart data={weekData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E9EEF4" />
            <XAxis dataKey="day" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1000}k`} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#E8F2FC" }} formatter={(v: number) => v ? v.toLocaleString("en-IN") : "Not yet recorded"} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Previous week" fill="#B7D3F0" radius={[2, 2, 0, 0]} maxBarSize={28} />
            <Bar dataKey="This week" fill="#1976D2" radius={[2, 2, 0, 0]} maxBarSize={28} />
          </BarChart>
        }
      </ResponsiveContainer>
      {mode === modes[1] && <p className="mt-1 text-xs text-muted">Wednesday to Sunday of this week have not been recorded yet.</p>}
    </Panel>);

}