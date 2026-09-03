"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const MODES = { work: 25 * 60, short: 5 * 60, long: 15 * 60 } as const;

export function PomodoroTimer() {
  const [mode, setMode] = React.useState<keyof typeof MODES>("work");
  const [secondsLeft, setSecondsLeft] = React.useState(MODES.work);
  const [running, setRunning] = React.useState(false);
  const [cycles, setCycles] = React.useState(0);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setCycles((c) => c + 1);
          try { new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=").play(); } catch {}
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  function switchMode(m: keyof typeof MODES) {
    setMode(m);
    setSecondsLeft(MODES[m]);
    setRunning(false);
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      <div className="flex justify-center gap-2">
        {(["work", "short", "long"] as const).map((m) => (
          <Button key={m} type="button" size="sm" variant={mode === m ? "default" : "outline"} onClick={() => switchMode(m)}>
            {m === "work" ? "Focus 25m" : m === "short" ? "Short break 5m" : "Long break 15m"}
          </Button>
        ))}
      </div>
      <p className="mt-8 text-7xl font-bold tabular-nums">{mm}:{ss}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button type="button" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</Button>
        <Button type="button" variant="outline" onClick={() => switchMode(mode)}>Reset</Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{cycles} pomodoro{cycles !== 1 ? "s" : ""} completed this session</p>
    </div>
  );
}
