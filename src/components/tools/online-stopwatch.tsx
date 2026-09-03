"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function OnlineStopwatch() {
  const [ms, setMs] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [laps, setLaps] = React.useState<number[]>([]);
  const startRef = React.useRef(0);

  React.useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - ms;
    const id = setInterval(() => setMs(Date.now() - startRef.current), 31);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function format(total: number) {
    const h = Math.floor(total / 3600000);
    const m = Math.floor((total % 3600000) / 60000);
    const s = Math.floor((total % 60000) / 1000);
    const cs = Math.floor((total % 1000) / 10);
    return `${h > 0 ? String(h).padStart(2, "0") + ":" : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      <p className="text-6xl font-bold tabular-nums">{format(ms)}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button type="button" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</Button>
        <Button type="button" variant="outline" onClick={() => running && setLaps((l) => [ms, ...l])} disabled={!running}>Lap</Button>
        <Button type="button" variant="ghost" onClick={() => { setRunning(false); setMs(0); setLaps([]); }}>Reset</Button>
      </div>
      {laps.length > 0 && (
        <ul className="mx-auto mt-5 max-w-xs space-y-1 border-t pt-4 text-left text-sm">
          {laps.map((l, i) => (
            <li key={i} className="flex justify-between">
              <span className="text-muted-foreground">Lap {laps.length - i}</span>
              <span className="tabular-nums">{format(l)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
