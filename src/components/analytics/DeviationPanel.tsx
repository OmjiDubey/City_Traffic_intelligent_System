import React, { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "../ui/Panel";
import { SelectField } from "../ui/SelectField";
import { StatusBadge } from "../ui/StatusBadge";
import { axisTick } from "../charts/TrafficVolumeChart";
import { dayOptions, dayRatioScale, deviationByLocation, deviationProfile, deviationRatioToday } from "../../data/traffic";
import { formatNumber } from "../../utils/format";
import type { Tone } from "../../utils/format";

const hourOptions = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

function compute(locIndex: number, day: string, hour: number) {
  const loc = deviationByLocation[locIndex];
  const peakRatio = loc.current / loc.expected;
  const hourShape = (deviationRatioToday[hour] - 1) / 0.51;
  const ratio = 1 + (peakRatio - 1) * hourShape * (dayRatioScale[day] ?? 1);
  const expected = Math.round(loc.expected * deviationProfile[hour]);
  const current = Math.round(expected * ratio);
  const baseline = Math.round(loc.baseline * deviationProfile[hour]);
  const deviation = expected ? (current - expected) / expected * 100 : 0;
  return { location: loc.location, expected, current, baseline, deviation };
}

function classify(dev: number): {tone: Tone;label: string;text: string;} {
  const abs = Math.abs(dev);
  if (abs >= 40) return { tone: "danger", label: dev > 0 ? "Unusual — well above normal" : "Unusual — well below normal", text: "text-danger-ink" };
  if (abs >= 15) return { tone: "warning", label: dev > 0 ? "Above usual range" : "Below usual range", text: "text-warning-ink" };
  return { tone: "neutral", label: "Within usual range", text: "text-ink" };
}

export function DeviationPanel() {
  const [locIndex, setLocIndex] = useState(0);
  const [day, setDay] = useState(dayOptions[0]);
  const [hour, setHour] = useState(9);

  const current = compute(locIndex, day, hour);
  const status = classify(current.deviation);

  const series = useMemo(
    () => hourOptions.map((h, i) => {const r = compute(locIndex, day, i);return { hour: h, Expected: r.expected, Current: r.current };}),
    [locIndex, day]
  );
  const ranking = useMemo(
    () => deviationByLocation.map((_, i) => compute(i, day, hour)).sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation)),
    [day, hour]
  );

  const sign = current.deviation > 0 ? "+" : "";

  return (
    <Panel
      title="Usual vs Unusual Congestion"
      subtitle="(Current traffic against expected pattern)"
      action={
      <div className="flex flex-wrap items-end gap-2">
          <SelectField label="Location" hideLabel value={deviationByLocation[locIndex].location} options={deviationByLocation.map((d) => d.location)} onChange={(v) => setLocIndex(deviationByLocation.findIndex((d) => d.location === v))} className="w-56" />
          <SelectField label="Day" hideLabel value={day} options={dayOptions} onChange={setDay} className="w-32" />
          <SelectField label="Time" hideLabel value={hourOptions[hour]} options={hourOptions} onChange={(v) => setHour(hourOptions.indexOf(v))} className="w-28" />
        </div>
      }>
      
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_23.75rem]">
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
            <Figure label="Expected" value={formatNumber(current.expected)} unit="veh/hr" />
            <Figure label="Current" value={formatNumber(current.current)} unit="veh/hr" strong />
            <Figure label="Historical baseline" value={formatNumber(current.baseline)} unit="veh/hr" />
            <div className="bg-surface p-4">
              <p className="text-xs text-muted">Deviation</p>
              <p className={`tabular mt-1 text-[1.75rem] font-bold leading-none ${status.text}`}>
                {sign}
                {Math.round(current.deviation)}%
              </p>
              <StatusBadge tone={status.tone} className="mt-2">
                {status.label}
              </StatusBadge>
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={205}>
              <LineChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E9EEF4" />
                <XAxis dataKey="hour" tick={axisTick} tickLine={false} axisLine={{ stroke: "#D9E2EC" }} interval={2} />
                <YAxis tick={axisTick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid #D9E2EC", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine x={hourOptions[hour]} stroke="#5B6B7F" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="Expected" stroke="#5B6B7F" strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="Current" stroke="#1976D2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="mb-2 text-sm font-semibold text-navy">
            All monitored locations at {hourOptions[hour]}, {day}
          </h3>
          <div className="overflow-hidden rounded-md border border-line">
            <table className="w-full text-sm">
              <thead className="bg-canvas text-left text-xs font-semibold text-muted">
                <tr>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2 text-right">Exp.</th>
                  <th className="px-3 py-2 text-right">Now</th>
                  <th className="px-3 py-2 text-right">Dev.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {ranking.map((r) => {
                  const c = classify(r.deviation);
                  const selected = r.location === current.location;
                  return (
                    <tr
                      key={r.location}
                      onClick={() => setLocIndex(deviationByLocation.findIndex((d) => d.location === r.location))}
                      className={`cursor-pointer transition-colors duration-150 ${selected ? "bg-primary-light" : "hover:bg-canvas"}`}
                      aria-selected={selected}>
                      
                      <td className="max-w-[150px] truncate px-3 py-2 text-ink">{r.location}</td>
                      <td className="tabular px-3 py-2 text-right text-muted">{formatNumber(r.expected)}</td>
                      <td className="tabular px-3 py-2 text-right text-ink">{formatNumber(r.current)}</td>
                      <td className={`tabular px-3 py-2 text-right font-semibold ${c.text}`}>
                        {r.deviation > 0 ? "+" : ""}
                        {Math.round(r.deviation)}%
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted">Amber from ±15%, red from ±40% deviation against the expected pattern for that day and hour.</p>
        </div>
      </div>
    </Panel>);

}

function Figure({ label, value, unit, strong = false }: {label: string;value: string;unit: string;strong?: boolean;}) {
  return (
    <div className="bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`tabular mt-1 text-[1.75rem] font-bold leading-none ${strong ? "text-primary" : "text-navy"}`}>{value}</p>
      <p className="mt-2 text-xs text-muted">{unit}</p>
    </div>);

}