"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Sex = "male" | "female";
type Unit = "metric" | "imperial";

function round0(n: number) {
  return Math.round(n);
}

export function BmrCalculator() {
  const [sex, setSex] = React.useState<Sex>("male");
  const [unit, setUnit] = React.useState<Unit>("metric");
  const [age, setAge] = React.useState("");
  const [heightCm, setHeightCm] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");
  const [heightFt, setHeightFt] = React.useState("");
  const [heightIn, setHeightIn] = React.useState("");
  const [weightLb, setWeightLb] = React.useState("");

  const numAge = parseFloat(age);

  let heightCmValue: number | null = null;
  let weightKgValue: number | null = null;

  if (unit === "metric") {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 0) heightCmValue = h;
    if (w > 0) weightKgValue = w;
  } else {
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    const totalIn = ft * 12 + inches;
    if (totalIn > 0) heightCmValue = totalIn * 2.54;
    const lb = parseFloat(weightLb);
    if (lb > 0) weightKgValue = lb * 0.453592;
  }

  const valid = !Number.isNaN(numAge) && numAge > 0 && heightCmValue !== null && weightKgValue !== null;

  let bmr: number | null = null;
  if (valid && heightCmValue !== null && weightKgValue !== null) {
    const base = 10 * weightKgValue + 6.25 * heightCmValue - 5 * numAge;
    bmr = round0(sex === "male" ? base + 5 : base - 161);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={sex === "male" ? "default" : "outline"} onClick={() => setSex("male")}>
          Male
        </Button>
        <Button type="button" size="sm" variant={sex === "female" ? "default" : "outline"} onClick={() => setSex("female")}>
          Female
        </Button>
        <Button type="button" size="sm" variant={unit === "metric" ? "default" : "outline"} onClick={() => setUnit("metric")}>
          Metric
        </Button>
        <Button type="button" size="sm" variant={unit === "imperial" ? "default" : "outline"} onClick={() => setUnit("imperial")}>
          Imperial
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="bmr-age" className="text-sm text-muted-foreground">
            Age
          </Label>
          <Input
            id="bmr-age"
            type="number"
            inputMode="numeric"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="mt-1.5"
          />
        </div>
        {unit === "metric" ? (
          <>
            <div>
              <Label htmlFor="bmr-height-cm" className="text-sm text-muted-foreground">
                Height (cm)
              </Label>
              <Input
                id="bmr-height-cm"
                type="number"
                inputMode="decimal"
                min={0}
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="175"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="bmr-weight-kg" className="text-sm text-muted-foreground">
                Weight (kg)
              </Label>
              <Input
                id="bmr-weight-kg"
                type="number"
                inputMode="decimal"
                min={0}
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="70"
                className="mt-1.5"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="bmr-height-ft" className="text-sm text-muted-foreground">
                Height (ft/in)
              </Label>
              <div className="mt-1.5 flex gap-1.5">
                <Input
                  id="bmr-height-ft"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="5"
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="9"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bmr-weight-lb" className="text-sm text-muted-foreground">
                Weight (lb)
              </Label>
              <Input
                id="bmr-weight-lb"
                type="number"
                inputMode="decimal"
                min={0}
                value={weightLb}
                onChange={(e) => setWeightLb(e.target.value)}
                placeholder="155"
                className="mt-1.5"
              />
            </div>
          </>
        )}
      </div>

      {bmr !== null && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{bmr}</p>
            <p className="mt-1 text-sm text-muted-foreground">calories/day at complete rest (BMR)</p>
          </div>
          <StatBar
            items={[
              { label: "sedentary (×1.2)", value: round0(bmr * 1.2) },
              { label: "moderately active (×1.55)", value: round0(bmr * 1.55) },
              { label: "very active (×1.9)", value: round0(bmr * 1.9) },
            ]}
          />
        </>
      )}
    </div>
  );
}
