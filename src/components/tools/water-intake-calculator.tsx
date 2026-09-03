"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round0(n: number) {
  return Math.round(n);
}

export function WaterIntakeCalculator() {
  const [weightKg, setWeightKg] = React.useState("");
  const [exerciseMinutes, setExerciseMinutes] = React.useState("0");

  const w = parseFloat(weightKg);
  const minutes = parseFloat(exerciseMinutes) || 0;

  const valid = !Number.isNaN(w) && w > 0;

  let result: { totalMl: number; glasses: number } | null = null;
  if (valid) {
    const baseline = w * 35;
    const exerciseAddition = (minutes / 30) * 350;
    const totalMl = round0(baseline + exerciseAddition);
    result = { totalMl, glasses: Math.round(totalMl / 250) };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="water-weight" className="text-sm text-muted-foreground">
            Body weight (kg)
          </Label>
          <Input
            id="water-weight"
            type="number"
            inputMode="decimal"
            min={0}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="70"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="water-exercise" className="text-sm text-muted-foreground">
            Exercise per day (minutes)
          </Label>
          <Input
            id="water-exercise"
            type="number"
            inputMode="numeric"
            min={0}
            value={exerciseMinutes}
            onChange={(e) => setExerciseMinutes(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">
              {(result.totalMl / 1000).toFixed(1)} L
            </p>
            <p className="mt-1 text-sm text-muted-foreground">recommended daily water intake</p>
          </div>
          <StatBar
            items={[
              { label: "milliliters", value: result.totalMl },
              { label: "~250ml glasses", value: result.glasses },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        A general estimate based on body weight and activity — actual needs vary with climate,
        health conditions, and individual factors. Consult a doctor for specific medical guidance.
      </p>
    </div>
  );
}
