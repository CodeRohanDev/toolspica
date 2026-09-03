"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = React.useState("");
  const [variableCost, setVariableCost] = React.useState("");
  const [price, setPrice] = React.useState("");

  const fixed = parseFloat(fixedCosts);
  const variable = parseFloat(variableCost);
  const unitPrice = parseFloat(price);

  const contributionMargin = unitPrice - variable;

  const valid =
    fixedCosts !== "" &&
    variableCost !== "" &&
    price !== "" &&
    !Number.isNaN(fixed) &&
    !Number.isNaN(variable) &&
    !Number.isNaN(unitPrice) &&
    fixed >= 0 &&
    variable >= 0 &&
    contributionMargin > 0;

  let result: { breakEvenUnits: number; breakEvenRevenue: number; contributionMargin: number } | null = null;
  if (valid) {
    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    result = {
      breakEvenUnits,
      breakEvenRevenue: round2(breakEvenUnits * unitPrice),
      contributionMargin: round2(contributionMargin),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="be-fixed" className="text-sm text-muted-foreground">
            Fixed costs
          </Label>
          <Input
            id="be-fixed"
            type="number"
            inputMode="decimal"
            min={0}
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            placeholder="10000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="be-variable" className="text-sm text-muted-foreground">
            Variable cost per unit
          </Label>
          <Input
            id="be-variable"
            type="number"
            inputMode="decimal"
            min={0}
            value={variableCost}
            onChange={(e) => setVariableCost(e.target.value)}
            placeholder="15"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="be-price" className="text-sm text-muted-foreground">
            Price per unit
          </Label>
          <Input
            id="be-price"
            type="number"
            inputMode="decimal"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="mt-1.5"
          />
        </div>
      </div>

      {price !== "" && variableCost !== "" && contributionMargin <= 0 && (
        <p className="mt-4 text-sm text-destructive">
          Price per unit must be higher than variable cost per unit to ever break even.
        </p>
      )}

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.breakEvenUnits}</p>
            <p className="mt-1 text-sm text-muted-foreground">units to break even</p>
          </div>
          <StatBar
            items={[
              { label: "break-even revenue", value: result.breakEvenRevenue },
              { label: "contribution margin per unit", value: result.contributionMargin },
            ]}
          />
        </>
      )}
    </div>
  );
}
