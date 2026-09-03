"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Sex = "male" | "female";

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function IdealWeightCalculator() {
  const [sex, setSex] = React.useState<Sex>("male");
  const [heightCm, setHeightCm] = React.useState("");

  const h = parseFloat(heightCm);
  const valid = !Number.isNaN(h) && h > 0;

  let result: { devineKg: number; robinsonKg: number; hamwiKg: number } | null = null;
  if (valid) {
    const totalInches = h / 2.54;
    const inchesOver5ft = Math.max(0, totalInches - 60);

    const devineKg =
      sex === "male" ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
    const robinsonKg =
      sex === "male" ? 52 + 1.9 * inchesOver5ft : 49 + 1.7 * inchesOver5ft;
    const hamwiKg =
      sex === "male" ? 48 + 2.7 * inchesOver5ft : 45.5 + 2.2 * inchesOver5ft;

    result = { devineKg: round1(devineKg), robinsonKg: round1(robinsonKg), hamwiKg: round1(hamwiKg) };
  }

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

      <div className="mt-4">
        <Label htmlFor="ideal-height" className="text-sm text-muted-foreground">
          Height (cm)
        </Label>
        <Input
          id="ideal-height"
          type="number"
          inputMode="decimal"
          min={0}
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          placeholder="175"
          className="mt-1.5 max-w-xs"
        />
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.devineKg} kg</p>
            <p className="mt-1 text-sm text-muted-foreground">ideal weight (Devine formula)</p>
          </div>
          <StatBar
            items={[
              { label: "Robinson formula", value: `${result.robinsonKg} kg` },
              { label: "Hamwi formula", value: `${result.hamwiKg} kg` },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        These are population-average formulas from medical literature, not individualized targets
        — they don't account for muscle mass, frame size, or body composition.
      </p>
    </div>
  );
}
