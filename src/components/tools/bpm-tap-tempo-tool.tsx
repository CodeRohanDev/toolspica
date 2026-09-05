"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const MAX_GAP_MS = 2500;

export function BpmTapTempoTool() {
  const [taps, setTaps] = React.useState<number[]>([]);
  const [bpm, setBpm] = React.useState<number | null>(null);

  const handleTap = () => {
    const now = performance.now();
    setTaps((prev) => {
      const filtered = prev.length > 0 && now - prev[prev.length - 1] > MAX_GAP_MS ? [] : prev;
      const next = [...filtered, now].slice(-10);
      if (next.length >= 2) {
        const intervals = next.slice(1).map((t, i) => t - next[i]);
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        setBpm(60000 / avgInterval);
      }
      return next;
    });
  };

  const reset = () => {
    setTaps([]);
    setBpm(null);
  };

  return (
    <div className="rounded-xl border bg-card p-5 text-center sm:p-6">
      <p className="text-6xl font-bold tabular-nums">{bpm ? bpm.toFixed(1) : "—"}</p>
      <p className="mt-1 text-sm text-muted-foreground">BPM</p>

      <Button size="lg" className="mt-6 h-32 w-32 rounded-full text-lg" onClick={handleTap}>
        TAP
      </Button>

      <p className="mt-4 text-sm text-muted-foreground">
        {taps.length > 0 ? `${taps.length} tap${taps.length !== 1 ? "s" : ""} recorded` : "Tap along to the beat"}
      </p>
      <Button variant="outline" size="sm" className="mt-2" onClick={reset}>
        Reset
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Keeps your last 10 taps for a rolling average — pause for more than 2.5 seconds to start a
        fresh reading.
      </p>
    </div>
  );
}
