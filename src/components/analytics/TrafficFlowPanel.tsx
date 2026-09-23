import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "../ui/Panel";
import { axisTick } from "../charts/TrafficVolumeChart";
import { cameras } from "../../data/cameras";
import { directionalFlow, vehicleMix } from "../../data/traffic";
import { formatNumber } from "../../utils/format";

export function TrafficFlowPanel() {
  const topCameras = [...cameras].
  sort((a, b) => b.vehiclesToday - a.vehiclesToday).
  slice(0, 8).
  map((c) => ({ id: c.id, location: c.location, vehicles: c.vehiclesToday }));

  return (
    <Panel title="Traffic Flow" subtitle="(Today)">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0">
          <h3 className="mb-3 text-sm font-semibold text-navy">Vehicle type distribution</h3>
          <ul className="space-y-2.5">
            {vehicleMix.map((v) =>
            <li key={v.type} className="grid grid-cols-[3rem_minmax(0,1fr)_5.5rem] items-center gap-3 text-sm">
                <span className="text-ink">{v.type}</span>
                <div className="h-2 overflow-hidden rounded-full bg-[#EEF2F6]">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${v.share / 38 * 100}%` }} />
                </div>
                <span className="tabular text-right text-muted">
                  {v.share}% <span className="text-xs">({formatNumber(v.count)})</span>
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className="mb-1 text-sm font-semibold text-navy">Camera-wise traffic</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCameras} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="#E9EEF4" />
              <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="id" tick={axisTick} tickLine={false} axisLine={false} width={56} />
              <Tooltip
                cursor={{ fill: "#E8F2FC" }}
                contentStyle={{ borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 }}
                formatter={(v: number) => [formatNumber(v), "Vehicles"]}
                labelFormatter={(id: string) => topCameras.find((c) => c.id === id)?.location ?? id} />
              
              <Bar dataKey="vehicles" fill="#1976D2" radius={[0, 2, 2, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0">
          <h3 className="mb-3 text-sm font-semibold text-navy">Directional flow (veh/hr, now)</h3>
          <div className="overflow-hidden rounded-md border border-line">
            <table className="w-full text-sm">
              <thead className="bg-canvas text-left text-xs font-semibold text-muted">
                <tr>
                  <th className="px-3 py-2">Corridor</th>
                  <th className="px-3 py-2 text-right">Inbound</th>
                  <th className="px-3 py-2 text-right">Outbound</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {directionalFlow.map((d) =>
                <tr key={d.corridor}>
                    <td className="px-3 py-2">
                      <span className="block truncate text-ink">{d.corridor}</span>
                      <span className="text-xs text-muted">Peak: {d.peakDir}</span>
                    </td>
                    <td className="tabular px-3 py-2 text-right text-ink">{formatNumber(d.nb)}</td>
                    <td className="tabular px-3 py-2 text-right text-ink">{formatNumber(d.sb)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Panel>);

}