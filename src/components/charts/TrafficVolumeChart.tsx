import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TrafficVolumeChartProps {
  data: {hour: string;value: number;}[];
  height?: number;
}

export const axisTick = { fill: "#5B6B7F", fontSize: 10 };

export function TrafficVolumeChart({ data, height = 200 }: TrafficVolumeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E9EEF4" />
        <XAxis dataKey="hour" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} interval={3} />
        <YAxis tick={axisTick} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "#E8F2FC" }}
          contentStyle={{ borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 }}
          formatter={(v: number) => [v.toLocaleString("en-IN"), "Vehicles"]} />
        
        <Bar dataKey="value" fill="#1976D2" radius={[2, 2, 0, 0]} maxBarSize={14} />
      </BarChart>
    </ResponsiveContainer>);

}