import { useEffect, useRef, useState } from "react";
import { detectionPool, initialDetections } from "../data/detections";
import { nowTime } from "../utils/format";
import type { LiveDetection } from "../types/traffic";

/** Streams demo detections into a capped list while `live` is true. */
export function useLiveDetections(live: boolean, max = 8): LiveDetection[] {
  const [rows, setRows] = useState<LiveDetection[]>(initialDetections);
  const cursor = useRef(0);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      const next = detectionPool[cursor.current % detectionPool.length];
      cursor.current += 1;
      setRows((prev) => [{ ...next, id: `D-live-${Date.now()}`, time: nowTime() }, ...prev].slice(0, max));
    }, 3500);
    return () => window.clearInterval(id);
  }, [live, max]);

  return rows;
}