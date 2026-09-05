"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 15;

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function SleepCycleCalculator() {
  const [mode, setMode] = React.useState<"wake" | "sleep">("wake");
  const [time, setTime] = React.useState("07:00");

  const [h, m] = time.split(":").map(Number);
  const base = new Date();
  base.setHours(h || 0, m || 0, 0, 0);

  const results: { label: string; time: Date }[] = [];
  if (mode === "wake") {
    // Given a wake-up time, suggest bedtimes counting back whole sleep cycles
    for (let cycles = 6; cycles >= 3; cycles--) {
      const bedtime = new Date(base.getTime() - (cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES) * 60000);
      results.push({ label: `${cycles} cycles (${(cycles * 1.5).toFixed(1)}h sleep)`, time: bedtime });
    }
  } else {
    // Given a bedtime, suggest wake-up times counting forward whole sleep cycles
    for (let cycles = 3; cycles <= 6; cycles++) {
      const wake = new Date(base.getTime() + (cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES) * 60000);
      results.push({ label: `${cycles} cycles (${(cycles * 1.5).toFixed(1)}h sleep)`, time: wake });
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("wake")}
          className={`rounded-md border px-3 py-1.5 text-sm ${mode === "wake" ? "bg-primary text-primary-foreground" : ""}`}
        >
          I need to wake up at...
        </button>
        <button
          onClick={() => setMode("sleep")}
          className={`rounded-md border px-3 py-1.5 text-sm ${mode === "sleep" ? "bg-primary text-primary-foreground" : ""}`}
        >
          I&apos;m going to bed at...
        </button>
      </div>

      <Label className="mt-4 block text-sm text-muted-foreground">
        {mode === "wake" ? "Wake-up time" : "Bedtime"}
      </Label>
      <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5" />

      <div className="mt-4 border-t pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          {mode === "wake" ? "Recommended bedtimes" : "Recommended wake-up times"}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {results.map((r) => (
            <div key={r.label} className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-lg font-semibold">{formatTime(r.time)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Based on ~90-minute sleep cycles plus {FALL_ASLEEP_MINUTES} minutes to fall asleep — waking
        up between cycles (rather than mid-cycle) tends to feel less groggy.
      </p>
    </div>
  );
}
