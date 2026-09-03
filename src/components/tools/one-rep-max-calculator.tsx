"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60, 50];

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function OneRepMaxCalculator() {
  const [weight, setWeight] = React.useState("");
  const [reps, setReps] = React.useState("");

  const w = parseFloat(weight);
  const r = parseFloat(reps);
  const valid = !Number.isNaN(w) && !Number.isNaN(r) && w > 0 && r >= 1 && r <= 15;

  const oneRepMax = valid ? round1(w * (1 + r / 30)) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="orm-weight" className="text-sm text-muted-foreground">
            Weight lifted
          </Label>
          <Input
            id="orm-weight"
            type="number"
            inputMode="decimal"
            min={0}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="100"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="orm-reps" className="text-sm text-muted-foreground">
            Reps performed (1-15)
          </Label>
          <Input
            id="orm-reps"
            type="number"
            inputMode="numeric"
            min={1}
            max={15}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="5"
            className="mt-1.5"
          />
        </div>
      </div>

      {oneRepMax !== null && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{oneRepMax}</p>
            <p className="mt-1 text-sm text-muted-foreground">estimated one-rep max</p>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {PERCENTAGES.map((pct) => (
              <div key={pct} className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground">{pct}%</p>
                <p className="text-sm font-semibold tabular-nums">
                  {round1(oneRepMax * (pct / 100))}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Estimated using the Epley formula. Most accurate for sets of 10 reps or fewer — accuracy
        decreases for higher-rep sets.
      </p>
    </div>
  );
}
