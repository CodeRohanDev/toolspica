"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Baker's percentage: everything relative to flour weight = 100%
const PRESETS: Record<string, { flour: number; water: number; salt: number; yeast: number }> = {
  "Lean bread dough": { flour: 100, water: 65, salt: 2, yeast: 1 },
  "Pizza dough": { flour: 100, water: 62, salt: 2.5, yeast: 0.4 },
  "Enriched dough (buns/rolls)": { flour: 100, water: 55, salt: 1.8, yeast: 1.2 },
  "Sourdough (approx.)": { flour: 100, water: 75, salt: 2, yeast: 20 },
};

export function BakingRatioCalculator() {
  const [preset, setPreset] = React.useState("Lean bread dough");
  const [flourWeight, setFlourWeight] = React.useState(500);

  const ratio = PRESETS[preset];
  const water = (flourWeight * ratio.water) / 100;
  const salt = (flourWeight * ratio.salt) / 100;
  const yeastLabel = preset === "Sourdough (approx.)" ? "starter" : "yeast";
  const yeast = (flourWeight * ratio.yeast) / 100;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Dough type</Label>
      <select
        value={preset}
        onChange={(e) => setPreset(e.target.value)}
        className="mt-1.5 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm"
      >
        {Object.keys(PRESETS).map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <Label className="mt-3 block text-sm text-muted-foreground">Flour weight (g)</Label>
      <Input type="number" value={flourWeight} onChange={(e) => setFlourWeight(Number(e.target.value))} className="mt-1.5" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">Flour ({ratio.flour}%)</p>
          <p className="text-lg font-semibold">{flourWeight.toFixed(0)} g</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">Water ({ratio.water}%)</p>
          <p className="text-lg font-semibold">{water.toFixed(0)} g</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">Salt ({ratio.salt}%)</p>
          <p className="text-lg font-semibold">{salt.toFixed(1)} g</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground capitalize">{yeastLabel} ({ratio.yeast}%)</p>
          <p className="text-lg font-semibold">{yeast.toFixed(1)} g</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Uses baker&apos;s percentage — every ingredient is a percentage of total flour weight. Scale
        any recipe up or down by changing the flour weight.
      </p>
    </div>
  );
}
