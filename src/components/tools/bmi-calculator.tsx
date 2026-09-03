"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "metric" | "imperial";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function BmiCalculator() {
  const [unit, setUnit] = React.useState<Unit>("metric");
  const [heightCm, setHeightCm] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");
  const [heightFt, setHeightFt] = React.useState("");
  const [heightIn, setHeightIn] = React.useState("");
  const [weightLb, setWeightLb] = React.useState("");

  let bmi: number | null = null;

  if (unit === "metric") {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (heightCm !== "" && weightKg !== "" && h > 0 && w > 0) {
      const meters = h / 100;
      bmi = w / (meters * meters);
    }
  } else {
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    const totalInches = ft * 12 + inches;
    const w = parseFloat(weightLb);
    if (totalInches > 0 && weightLb !== "" && w > 0) {
      bmi = (703 * w) / (totalInches * totalInches);
    }
  }

  const rounded = bmi !== null ? Math.round(bmi * 10) / 10 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={unit === "metric" ? "default" : "outline"}
          onClick={() => setUnit("metric")}
        >
          Metric (cm / kg)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={unit === "imperial" ? "default" : "outline"}
          onClick={() => setUnit("imperial")}
        >
          Imperial (ft, in / lb)
        </Button>
      </div>

      {unit === "metric" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="bmi-height-cm" className="text-sm text-muted-foreground">
              Height (cm)
            </Label>
            <Input
              id="bmi-height-cm"
              type="number"
              inputMode="decimal"
              min={0}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="170"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="bmi-weight-kg" className="text-sm text-muted-foreground">
              Weight (kg)
            </Label>
            <Input
              id="bmi-weight-kg"
              type="number"
              inputMode="decimal"
              min={0}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              placeholder="65"
              className="mt-1.5"
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="bmi-height-ft" className="text-sm text-muted-foreground">
              Height (ft)
            </Label>
            <Input
              id="bmi-height-ft"
              type="number"
              inputMode="decimal"
              min={0}
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              placeholder="5"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="bmi-height-in" className="text-sm text-muted-foreground">
              Height (in)
            </Label>
            <Input
              id="bmi-height-in"
              type="number"
              inputMode="decimal"
              min={0}
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              placeholder="7"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="bmi-weight-lb" className="text-sm text-muted-foreground">
              Weight (lb)
            </Label>
            <Input
              id="bmi-weight-lb"
              type="number"
              inputMode="decimal"
              min={0}
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              placeholder="145"
              className="mt-1.5"
            />
          </div>
        </div>
      )}

      {rounded !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{rounded}</p>
          <p className="mt-1 text-sm text-muted-foreground">{bmiCategory(rounded)}</p>
        </div>
      )}
    </div>
  );
}
