"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatBar } from "@/components/tools/stat-bar";

type Sex = "male" | "female";

const ACTIVITY_LEVELS = [
  { id: "1.2", label: "Sedentary (little or no exercise)" },
  { id: "1.375", label: "Lightly active (1-3 days/week)" },
  { id: "1.55", label: "Moderately active (3-5 days/week)" },
  { id: "1.725", label: "Very active (6-7 days/week)" },
  { id: "1.9", label: "Extremely active (physical job + training)" },
];

function round0(n: number) {
  return Math.round(n);
}

export function CalorieCalculator() {
  const [sex, setSex] = React.useState<Sex>("male");
  const [age, setAge] = React.useState("");
  const [heightCm, setHeightCm] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");
  const [activity, setActivity] = React.useState("1.55");

  const numAge = parseFloat(age);
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  const multiplier = parseFloat(activity);

  const valid = numAge > 0 && h > 0 && w > 0;

  let maintenance: number | null = null;
  if (valid) {
    const base = 10 * w + 6.25 * h - 5 * numAge;
    const bmr = sex === "male" ? base + 5 : base - 161;
    maintenance = round0(bmr * multiplier);
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="cal-age" className="text-sm text-muted-foreground">
            Age
          </Label>
          <Input
            id="cal-age"
            type="number"
            inputMode="numeric"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="cal-height" className="text-sm text-muted-foreground">
            Height (cm)
          </Label>
          <Input
            id="cal-height"
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
          <Label htmlFor="cal-weight" className="text-sm text-muted-foreground">
            Weight (kg)
          </Label>
          <Input
            id="cal-weight"
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

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Activity level</Label>
        <Select value={activity} onValueChange={(value) => value && setActivity(value)}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ACTIVITY_LEVELS.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {maintenance !== null && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{maintenance}</p>
            <p className="mt-1 text-sm text-muted-foreground">calories/day to maintain weight</p>
          </div>
          <StatBar
            items={[
              { label: "mild loss (-250/day)", value: maintenance - 250 },
              { label: "loss (-500/day)", value: maintenance - 500 },
              { label: "mild gain (+250/day)", value: maintenance + 250 },
              { label: "gain (+500/day)", value: maintenance + 500 },
            ]}
          />
        </>
      )}
    </div>
  );
}
