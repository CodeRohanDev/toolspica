"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "km" | "mi";

function formatPace(minutesPerUnit: number) {
  const mins = Math.floor(minutesPerUnit);
  const secs = Math.round((minutesPerUnit - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function PaceCalculator() {
  const [distance, setDistance] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("km");
  const [hours, setHours] = React.useState("0");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("0");

  const numDistance = parseFloat(distance);
  const h = parseFloat(hours) || 0;
  const m = parseFloat(minutes) || 0;
  const s = parseFloat(seconds) || 0;
  const totalMinutes = h * 60 + m + s / 60;

  const valid = distance !== "" && !Number.isNaN(numDistance) && numDistance > 0 && totalMinutes > 0;

  let result: { pace: string; speed: number } | null = null;
  if (valid) {
    const paceMinPerUnit = totalMinutes / numDistance;
    const speedUnitPerHour = numDistance / (totalMinutes / 60);
    result = { pace: formatPace(paceMinPerUnit), speed: Math.round(speedUnitPerHour * 100) / 100 };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={unit === "km" ? "default" : "outline"} onClick={() => setUnit("km")}>
          Kilometers
        </Button>
        <Button type="button" size="sm" variant={unit === "mi" ? "default" : "outline"} onClick={() => setUnit("mi")}>
          Miles
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="pace-distance" className="text-sm text-muted-foreground">
            Distance ({unit})
          </Label>
          <Input
            id="pace-distance"
            type="number"
            inputMode="decimal"
            min={0}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="5"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Time (h : m : s)</Label>
          <div className="mt-1.5 flex gap-1.5">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="0"
            />
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="25"
            />
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-2xl font-semibold tabular-nums">{result.pace} /{unit}</p>
            <p className="mt-1 text-sm text-muted-foreground">pace</p>
          </div>
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-2xl font-semibold tabular-nums">{result.speed} {unit}/h</p>
            <p className="mt-1 text-sm text-muted-foreground">average speed</p>
          </div>
        </div>
      )}
    </div>
  );
}
