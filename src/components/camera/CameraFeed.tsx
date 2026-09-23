import React, { useState } from "react";
import { Maximize2Icon, VideoOffIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { overlays } from "../../data/cameras";
import { formatClockTime, useClock } from "../../hooks/useClock";
import type { Camera } from "../../types/traffic";

interface CameraFeedProps {
  camera: Camera;
  showOverlays?: boolean;
  showTelemetry?: boolean;
  paused?: boolean;
  vehicleFilter?: string;
  onExpand?: () => void;
  className?: string;
}

export function CameraFeed({
  camera,
  showOverlays = false,
  showTelemetry = false,
  paused = false,
  vehicleFilter = "All types",
  onExpand,
  className
}: CameraFeedProps) {
  const now = useClock();
  const [videoFailed, setVideoFailed] = useState(false);
  const offline = camera.status === "Offline";
  const degraded = camera.status === "Degraded";
  const boxes = (overlays[camera.id] ?? []).filter((b) => vehicleFilter === "All types" || b.type === vehicleFilter);
  const seconds = now.getSeconds();
  const inFrame = offline ? 0 : (overlays[camera.id]?.length ?? 2) * 4 + seconds % 4;
  const fps = offline ? 0 : paused ? 0 : camera.fps - (seconds % 3 === 0 ? 1 : 0);

  const statusChip = offline ?
  { label: "OFFLINE", dot: "bg-danger" } :
  degraded ?
  { label: "WARNING", dot: "bg-warning" } :
  paused ?
  { label: "PAUSED", dot: "bg-[#94A3B8]" } :
  { label: "LIVE", dot: "bg-[#22C55E]" };

  return (
    <div className={twMerge("group relative aspect-video overflow-hidden rounded-md bg-[#0B1422]", className)}>
      {offline ?
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-[#CBD5E1]" role="status">
          <VideoOffIcon className="h-7 w-7" aria-hidden="true" />
          <p className="text-sm font-semibold text-white">Camera offline</p>
          <p className="text-xs">Last seen: {camera.lastActive}</p>
        </div> :
      camera.videoSrc && !videoFailed ?
      <video
        src={camera.videoSrc}
        poster={camera.image}
        autoPlay={!paused}
        muted
        loop
        playsInline
        onError={() => setVideoFailed(true)}
        className="absolute inset-0 h-full w-full object-cover" /> :


      <img
        src={camera.image}
        alt={`Live view from ${camera.id}, ${camera.location}`}
        className={twMerge("feed-drift absolute inset-0 h-full w-full object-cover", degraded && "saturate-50 contrast-90")}
        style={{ animationPlayState: paused ? "paused" : "running" }}
        draggable={false} />

      }

      {showOverlays && !offline &&
      boxes.map((b) =>
      <div
        key={b.trackId}
        className="box-track absolute border-2 border-[#22C55E]"
        style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, animationPlayState: paused ? "paused" : "running" }}>
        
            <span className="tabular absolute -top-[1.125rem] left-[-2px] whitespace-nowrap bg-[#16A34A] px-1 text-[0.625rem] font-semibold leading-4 text-white">
              {b.trackId} · {b.plate}
            </span>
          </div>
      )}

      <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-semibold text-white">
        <span className={twMerge("h-2 w-2 rounded-full", statusChip.dot)} aria-hidden="true" />
        {statusChip.label}
      </div>

      <div className="absolute right-2 top-2 flex items-center gap-1.5">
        {!offline && showTelemetry &&
        <span className="tabular rounded bg-black/65 px-1.5 py-0.5 text-[9px] text-white">{formatClockTime(now)}</span>
        }
        {onExpand &&
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="rounded bg-black/65 p-1 text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={`Expand ${camera.id}`}>
          
            <Maximize2Icon className="h-3.5 w-3.5" />
          </button>
        }
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-black/65 px-2 py-1 text-white">
        <p className="min-w-0 truncate text-[11px]">
          <span className="font-semibold">{camera.id}</span>
          <span className="ml-2 text-[#E2E8F0]">{camera.location}</span>
        </p>
        {showTelemetry && !offline &&
        <p className="tabular flex shrink-0 items-center gap-2 text-[0.6875rem] text-[#E2E8F0]">
            <span>{inFrame} veh</span>
            <span className={degraded ? "text-[#FCD34D]" : ""}>{fps} FPS</span>
          </p>
        }
      </div>
    </div>);

}