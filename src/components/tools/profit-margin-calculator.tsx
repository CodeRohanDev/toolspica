"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function ProfitMarginCalculator() {
  const [revenue, setRevenue] = React.useState("");
  const [cost, setCost] = React.useState("");

  const numRevenue = parseFloat(revenue);
  const numCost = parseFloat(cost);

  const valid =
    revenue !== "" &&
    cost !== "" &&
    !Number.isNaN(numRevenue) &&
    !Number.isNaN(numCost) &&
    numRevenue > 0 &&
    numCost >= 0;

  let result: { profit: number; marginPercent: number; markupPercent: number | null } | null = null;
  if (valid) {
    const profit = numRevenue - numCost;
    const marginPercent = round2((profit / numRevenue) * 100);
    const markupPercent = numCost > 0 ? round2((profit / numCost) * 100) : null;
    result = { profit: round2(profit), marginPercent, markupPercent };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="margin-revenue" className="text-sm text-muted-foreground">
            Selling price / revenue
          </Label>
          <Input
            id="margin-revenue"
            type="number"
            inputMode="decimal"
            min={0}
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="100"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="margin-cost" className="text-sm text-muted-foreground">
            Cost
          </Label>
          <Input
            id="margin-cost"
            type="number"
            inputMode="decimal"
            min={0}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="60"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.marginPercent}%</p>
            <p className="mt-1 text-sm text-muted-foreground">gross profit margin</p>
          </div>
          <StatBar
            items={[
              { label: "profit", value: result.profit },
              {
                label: "markup",
                value: result.markupPercent === null ? "n/a" : `${result.markupPercent}%`,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
