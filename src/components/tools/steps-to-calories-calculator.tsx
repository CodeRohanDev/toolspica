"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function round0(n: number) {
  return Math.round(n);
}

export function StepsToCaloriesCalculator() {
  const [steps, setSteps] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");

  const numSteps = parseFloat(steps);
  const w = parseFloat(weightKg);
  const valid = !Number.isNaN(numSteps) && !Number.isNaN(w) && numSteps > 0 && w > 0;

  const calories = valid ? round0(numSteps * w * 0.0005) : null;
  const distanceKm = valid ? Math.round(numSteps * 0.000762 * 10) / 10 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="steps-count" className="text-sm text-muted-foreground">
            Number of steps
          </Label>
          <Input
            id="steps-count"
            type="number"
            inputMode="numeric"
            min={0}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="10000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="steps-weight" className="text-sm text-muted-foreground">
            Body weight (kg)
          </Label>
          <Input
            id="steps-weight"
            type="number"
            inputMode="decimal"
            min={0}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="70"
            className="mt-1.5"
          />
        </div>
      </div>

      {calories !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{calories}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            calories burned (≈ {distanceKm} km walked)
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        A general estimate based on average step length and walking-pace calorie burn — actual
        calories vary with pace, terrain, and individual metabolism.
      </p>
    </div>
  );
}
