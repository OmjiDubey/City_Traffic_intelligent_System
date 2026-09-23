import React, { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../components/ui/PageHeader";
import { Panel } from "../components/ui/Panel";
import { SelectField } from "../components/ui/SelectField";

const toggles = [
{ key: "critical", label: "Sound for critical alerts", description: "Play an audible tone when a critical alert is raised." },
{ key: "camera", label: "Notify when a camera goes offline", description: "Show a notification if any camera stops streaming for 5 minutes." },
{ key: "overlays", label: "Show detection overlays by default", description: "Display bounding boxes and plates on live feeds." }] as
const;

export function Settings() {
  const [state, setState] = useState<Record<string, boolean>>({ critical: true, camera: true, overlays: true });
  const [refresh, setRefresh] = useState("Every 5 seconds");

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="Personal preferences for this control-room workstation." />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel title="Notifications & display">
          <ul className="divide-y divide-line-soft">
            {toggles.map((t) =>
            <li key={t.key} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{t.label}</p>
                  <p className="text-sm text-muted">{t.description}</p>
                </div>
                <button
                type="button"
                role="switch"
                aria-checked={state[t.key]}
                aria-label={t.label}
                onClick={() => setState((s) => ({ ...s, [t.key]: !s[t.key] }))}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${state[t.key] ? "bg-primary" : "bg-[#CBD5E1]"}`}>
                
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${state[t.key] ? "translate-x-[1.375rem]" : "translate-x-0.5"}`} />
                </button>
              </li>
            )}
          </ul>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
            <SelectField label="Dashboard refresh interval" value={refresh} options={["Every 5 seconds", "Every 15 seconds", "Every 60 seconds"]} onChange={setRefresh} className="w-60" />
            <button type="button" onClick={() => toast.success("Preferences saved for this workstation")} className="h-9 rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              Save preferences
            </button>
          </div>
        </Panel>
        <Panel title="System information">
          <dl className="divide-y divide-line-soft text-sm">
            {[
            ["Control room", "Lucknow Traffic Control Room"],
            ["Application version", "1.0.0"],
            ["ANPR model", "v4.2 (synced 05:31)"],
            ["Cameras registered", "18"],
            ["Operator", "Anil Srivastava"]].
            map(([k, v]) =>
            <div key={k} className="flex justify-between gap-3 py-2">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            )}
          </dl>
        </Panel>
      </div>
    </div>);

}