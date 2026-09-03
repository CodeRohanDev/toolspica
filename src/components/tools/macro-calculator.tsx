"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

const PRESETS = [
  { label: "Balanced", protein: 30, carbs: 40, fat: 30 },
  { label: "Low-carb", protein: 40, carbs: 20, fat: 40 },
  { label: "High-protein", protein: 40, carbs: 30, fat: 30 },
];

function round0(n: number) {
  return Math.round(n);
}

export function MacroCalculator() {
  const [calories, setCalories] = React.useState("");
  const [protein, setProtein] = React.useState("30");
  const [carbs, setCarbs] = React.useState("40");
  const [fat, setFat] = React.useState("30");

  const numCalories = parseFloat(calories);
  const p = parseFloat(protein) || 0;
  const c = parseFloat(carbs) || 0;
  const f = parseFloat(fat) || 0;
  const sum = p + c + f;

  const valid = calories !== "" && !Number.isNaN(numCalories) && numCalories > 0 && sum > 0;

  let result: { proteinG: number; carbsG: number; fatG: number } | null = null;
  if (valid) {
    const proteinCal = numCalories * (p / sum);
    const carbsCal = numCalories * (c / sum);
    const fatCal = numCalories * (f / sum);
    result = {
      proteinG: round0(proteinCal / 4),
      carbsG: round0(carbsCal / 4),
      fatG: round0(fatCal / 9),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label htmlFor="macro-calories" className="text-sm text-muted-foreground">
          Daily calorie target
        </Label>
        <Input
          id="macro-calories"
          type="number"
          inputMode="numeric"
          min={0}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="2200"
          className="mt-1.5 max-w-xs"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setProtein(String(preset.protein));
              setCarbs(String(preset.carbs));
              setFat(String(preset.fat));
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="macro-protein" className="text-sm text-muted-foreground">
            Protein %
          </Label>
          <Input
            id="macro-protein"
            type="number"
            inputMode="numeric"
            min={0}
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="macro-carbs" className="text-sm text-muted-foreground">
            Carbs %
          </Label>
          <Input
            id="macro-carbs"
            type="number"
            inputMode="numeric"
            min={0}
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="macro-fat" className="text-sm text-muted-foreground">
            Fat %
          </Label>
          <Input
            id="macro-fat"
            type="number"
            inputMode="numeric"
            min={0}
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {sum > 0 && sum !== 100 && (
        <p className="mt-2 text-xs text-muted-foreground">
          Percentages sum to {sum}% — proportions are normalized automatically.
        </p>
      )}

      {result && (
        <StatBar
          items={[
            { label: "protein (g)", value: result.proteinG },
            { label: "carbs (g)", value: result.carbsG },
            { label: "fat (g)", value: result.fatG },
          ]}
        />
      )}
    </div>
  );
}
