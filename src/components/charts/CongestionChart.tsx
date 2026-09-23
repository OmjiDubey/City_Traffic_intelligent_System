import React, { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { axisTick } from "./TrafficVolumeChart";

type Level = "smooth" | "moderate" | "heavy";

interface CongestionChartProps {
  data: {hour: string;value: number;}[];
  height?: number;
}

function levelOf(v: number): Level {
  return v >= 70 ? "heavy" : v >= 40 ? "moderate" : "smooth";
}

const colors: Record<Level, string> = { smooth: "#16A34A", moderate: "#F59E0B", heavy: "#DC2626" };

export function CongestionChart({ data, height = 170 }: CongestionChartProps) {
  const series = useMemo(
    () =>
    data.map((d, i) => {
      const row: Record<string, string | number | null> = { hour: d.hour, value: d.value, smooth: null, moderate: null, heavy: null };
      row[levelOf(d.value)] = d.value;
      const next = data[i + 1];
      if (next && levelOf(next.value) !== levelOf(d.value)) row[levelOf(next.value)] = d.value;
      return row;
    }),
    [data]
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={series} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#E9EEF4" />
          <XAxis dataKey="hour" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} interval={3} />
          <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={axisTick} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const v = Number(payload[0].payload.value);
              const lvl = levelOf(v);
              return (
                <div className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs shadow-card">
                  <p className="font-semibold text-ink">{label}</p>
                  <p className="text-muted">
                    Index {v} · <span style={{ color: colors[lvl] }} className="font-semibold capitalize">{lvl}</span>
                  </p>
                </div>);

            }} />
          
          {(Object.keys(colors) as Level[]).map((k) =>
          <Line key={k} dataKey={k} stroke={colors[k]} strokeWidth={2} dot={{ r: 2.5, fill: colors[k], strokeWidth: 0 }} connectNulls={false} isAnimationActive={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex items-center justify-center gap-5 text-xs text-muted">
        {(Object.keys(colors) as Level[]).map((k) =>
        <li key={k} className="flex items-center gap-1.5 capitalize">
            <span className="h-2 w-2 rounded-full" style={{ background: colors[k] }} aria-hidden="true" />
            {k}
          </li>
        )}
      </ul>
    </div>);

}