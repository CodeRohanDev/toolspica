"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

const CATEGORIES = ["Flights", "Lodging", "Food", "Local transport", "Activities", "Shopping", "Misc/buffer"];

export function TripBudgetCalculator() {
  const [days, setDays] = React.useState(7);
  const [travelers, setTravelers] = React.useState(2);
  const [costs, setCosts] = React.useState<Record<string, number>>({
    Flights: 600,
    Lodging: 150,
    Food: 60,
    "Local transport": 20,
    Activities: 40,
    Shopping: 30,
    "Misc/buffer": 25,
  });

  const perDayCategories = new Set(["Lodging", "Food", "Local transport", "Activities", "Shopping", "Misc/buffer"]);

  const total = CATEGORIES.reduce((sum, cat) => {
    const value = costs[cat] || 0;
    const multiplier = perDayCategories.has(cat) ? days * travelers : travelers;
    return sum + value * multiplier;
  }, 0);

  const perPerson = travelers > 0 ? total / travelers : 0;
  const perDay = days > 0 ? total / days : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Trip length (days)</Label>
          <Input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Travelers</Label>
          <Input type="number" min={1} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="flex items-center justify-between gap-3">
            <Label className="text-sm text-muted-foreground">
              {cat} {cat !== "Flights" && <span className="text-xs">(per person/day, $)</span>}
              {cat === "Flights" && <span className="text-xs">(per person, $)</span>}
            </Label>
            <Input
              type="number"
              value={costs[cat] || 0}
              onChange={(e) => setCosts({ ...costs, [cat]: Number(e.target.value) })}
              className="w-28"
            />
          </div>
        ))}
      </div>

      <StatBar
        items={[
          { label: "total budget", value: `$${total.toFixed(0)}` },
          { label: "per person", value: `$${perPerson.toFixed(0)}` },
          { label: "per day (all travelers)", value: `$${perDay.toFixed(0)}` },
        ]}
      />
    </div>
  );
}
