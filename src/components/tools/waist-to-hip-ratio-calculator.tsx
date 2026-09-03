"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Sex = "male" | "female";

function getRiskCategory(sex: Sex, ratio: number) {
  if (sex === "male") {
    if (ratio < 0.9) return "Low risk";
    if (ratio < 1.0) return "Moderate risk";
    return "High risk";
  }
  if (ratio < 0.8) return "Low risk";
  if (ratio < 0.85) return "Moderate risk";
  return "High risk";
}

export function WaistToHipRatioCalculator() {
  const [sex, setSex] = React.useState<Sex>("male");
  const [waist, setWaist] = React.useState("");
  const [hip, setHip] = React.useState("");

  const w = parseFloat(waist);
  const h = parseFloat(hip);
  const valid = !Number.isNaN(w) && !Number.isNaN(h) && w > 0 && h > 0;

  const ratio = valid ? Math.round((w / h) * 100) / 100 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={sex === "male" ? "default" : "outline"} onClick={() => setSex("male")}>
          Male
        </Button>
        <Button type="button" size="sm" variant={sex === "female" ? "default" : "outline"} onClick={() => setSex("female")}>
          Female
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="whr-waist" className="text-sm text-muted-foreground">
            Waist circumference
          </Label>
          <Input
            id="whr-waist"
            type="number"
            inputMode="decimal"
            min={0}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="85"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="whr-hip" className="text-sm text-muted-foreground">
            Hip circumference
          </Label>
          <Input
            id="whr-hip"
            type="number"
            inputMode="decimal"
            min={0}
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            placeholder="100"
            className="mt-1.5"
          />
        </div>
      </div>

      {ratio !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{ratio}</p>
          <p className="mt-1 text-sm text-muted-foreground">{getRiskCategory(sex, ratio)}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Categories follow WHO reference thresholds for cardiovascular risk association. Use the
        same unit (cm or inches) for both measurements — the ratio itself is unit-independent.
      </p>
    </div>
  );
}
