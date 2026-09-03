"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function addDays(date: Date, days: number) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = React.useState("");
  const [cycleLength, setCycleLength] = React.useState("28");

  const result = React.useMemo(() => {
    if (!lastPeriod) return null;
    const start = new Date(`${lastPeriod}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const cycle = parseInt(cycleLength, 10);
    if (Number.isNaN(cycle) || cycle < 15 || cycle > 45) return null;

    const nextPeriod = addDays(start, cycle);
    const ovulationDate = addDays(nextPeriod, -14);
    const fertileStart = addDays(ovulationDate, -5);
    const fertileEnd = addDays(ovulationDate, 1);

    return { nextPeriod, ovulationDate, fertileStart, fertileEnd };
  }, [lastPeriod, cycleLength]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ovu-last-period" className="text-sm text-muted-foreground">
            First day of last period
          </Label>
          <Input
            id="ovu-last-period"
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ovu-cycle-length" className="text-sm text-muted-foreground">
            Average cycle length (days)
          </Label>
          <Input
            id="ovu-cycle-length"
            type="number"
            inputMode="numeric"
            min={15}
            max={45}
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {lastPeriod && !result && (
        <p className="mt-4 text-sm text-destructive">
          Cycle length should be between 15 and 45 days.
        </p>
      )}

      {result && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Estimated ovulation
            </p>
            <p className="mt-1 text-lg font-semibold">{formatDate(result.ovulationDate)}</p>
          </div>
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Fertile window
            </p>
            <p className="mt-1 text-sm font-semibold">
              {formatDate(result.fertileStart)} – {formatDate(result.fertileEnd)}
            </p>
          </div>
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next period (estimated)
            </p>
            <p className="mt-1 text-lg font-semibold">{formatDate(result.nextPeriod)}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This is an estimate based on average cycle statistics, not a medical diagnosis. Actual
        ovulation timing varies by individual — consult a healthcare provider or use a dedicated
        fertility tracking method for family planning decisions.
      </p>
    </div>
  );
}
