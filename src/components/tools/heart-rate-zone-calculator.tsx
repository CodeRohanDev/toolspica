"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ZONES = [
  { name: "Zone 1 — Warm up", min: 0.5, max: 0.6 },
  { name: "Zone 2 — Fat burn", min: 0.6, max: 0.7 },
  { name: "Zone 3 — Aerobic", min: 0.7, max: 0.8 },
  { name: "Zone 4 — Threshold", min: 0.8, max: 0.9 },
  { name: "Zone 5 — Max effort", min: 0.9, max: 1.0 },
];

function round0(n: number) {
  return Math.round(n);
}

export function HeartRateZoneCalculator() {
  const [age, setAge] = React.useState("");
  const [restingHr, setRestingHr] = React.useState("");

  const numAge = parseFloat(age);
  const numResting = parseFloat(restingHr);
  const hasResting = restingHr !== "" && !Number.isNaN(numResting) && numResting > 0;

  const valid = age !== "" && !Number.isNaN(numAge) && numAge > 0 && numAge < 120;
  const maxHr = valid ? round0(220 - numAge) : null;

  const zones =
    maxHr !== null
      ? ZONES.map((zone) => {
          if (hasResting) {
            const reserve = maxHr - numResting;
            return {
              ...zone,
              lower: round0(reserve * zone.min + numResting),
              upper: round0(reserve * zone.max + numResting),
            };
          }
          return {
            ...zone,
            lower: round0(maxHr * zone.min),
            upper: round0(maxHr * zone.max),
          };
        })
      : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="hr-age" className="text-sm text-muted-foreground">
            Age
          </Label>
          <Input
            id="hr-age"
            type="number"
            inputMode="numeric"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="hr-resting" className="text-sm text-muted-foreground">
            Resting heart rate (optional, for Karvonen method)
          </Label>
          <Input
            id="hr-resting"
            type="number"
            inputMode="numeric"
            min={0}
            value={restingHr}
            onChange={(e) => setRestingHr(e.target.value)}
            placeholder="65"
            className="mt-1.5"
          />
        </div>
      </div>

      {maxHr !== null && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{maxHr} bpm</p>
            <p className="mt-1 text-sm text-muted-foreground">estimated maximum heart rate</p>
          </div>

          <div className="mt-4 space-y-2">
            {zones!.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              >
                <span>{zone.name}</span>
                <span className="font-semibold tabular-nums">
                  {zone.lower}–{zone.upper} bpm
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Estimated using the standard 220 − age formula for max heart rate
        {hasResting ? ", with the Karvonen (heart rate reserve) method for zones since a resting rate was provided" : ""}.
        Individual variation exists — consult a doctor before starting an intense training program.
      </p>
    </div>
  );
}
