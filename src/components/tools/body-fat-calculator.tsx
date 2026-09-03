"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Sex = "male" | "female";
type Unit = "metric" | "imperial";

function bodyFatCategory(sex: Sex, bf: number) {
  if (sex === "male") {
    if (bf < 6) return "Essential fat";
    if (bf < 14) return "Athletic";
    if (bf < 18) return "Fitness";
    if (bf < 25) return "Average";
    return "Above average";
  }
  if (bf < 14) return "Essential fat";
  if (bf < 21) return "Athletic";
  if (bf < 25) return "Fitness";
  if (bf < 32) return "Average";
  return "Above average";
}

export function BodyFatCalculator() {
  const [sex, setSex] = React.useState<Sex>("male");
  const [unit, setUnit] = React.useState<Unit>("metric");
  const [height, setHeight] = React.useState("");
  const [neck, setNeck] = React.useState("");
  const [waist, setWaist] = React.useState("");
  const [hip, setHip] = React.useState("");

  const h = parseFloat(height);
  const n = parseFloat(neck);
  const w = parseFloat(waist);
  const hp = parseFloat(hip);

  const needsHip = sex === "female";
  const valid =
    h > 0 &&
    n > 0 &&
    w > 0 &&
    w > n &&
    (!needsHip || (hp > 0 && w + hp > n)) &&
    (!Number.isNaN(h) && !Number.isNaN(n) && !Number.isNaN(w));

  let bodyFat: number | null = null;
  if (valid) {
    if (unit === "metric") {
      if (sex === "male") {
        bodyFat =
          495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bodyFat =
          495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
      }
    } else {
      if (sex === "male") {
        bodyFat = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
      } else {
        bodyFat = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
      }
    }
    bodyFat = Math.round(bodyFat * 10) / 10;
  }

  const unitLabel = unit === "metric" ? "cm" : "in";

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
          Metric (cm)
        </Button>
        <Button type="button" size="sm" variant={unit === "imperial" ? "default" : "outline"} onClick={() => setUnit("imperial")}>
          Imperial (in)
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div>
          <Label htmlFor="bf-height" className="text-sm text-muted-foreground">
            Height ({unitLabel})
          </Label>
          <Input
            id="bf-height"
            type="number"
            inputMode="decimal"
            min={0}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="bf-neck" className="text-sm text-muted-foreground">
            Neck ({unitLabel})
          </Label>
          <Input
            id="bf-neck"
            type="number"
            inputMode="decimal"
            min={0}
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="bf-waist" className="text-sm text-muted-foreground">
            Waist ({unitLabel})
          </Label>
          <Input
            id="bf-waist"
            type="number"
            inputMode="decimal"
            min={0}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="mt-1.5"
          />
        </div>
        {needsHip && (
          <div>
            <Label htmlFor="bf-hip" className="text-sm text-muted-foreground">
              Hip ({unitLabel})
            </Label>
            <Input
              id="bf-hip"
              type="number"
              inputMode="decimal"
              min={0}
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      {bodyFat !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{bodyFat}%</p>
          <p className="mt-1 text-sm text-muted-foreground">{bodyFatCategory(sex, bodyFat)}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Uses the U.S. Navy circumference method, an estimate with a typical margin of error of a
        few percentage points compared to clinical methods like DEXA scans.
      </p>
    </div>
  );
}
