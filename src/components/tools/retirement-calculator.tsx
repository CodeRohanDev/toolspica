"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = React.useState("");
  const [retirementAge, setRetirementAge] = React.useState("");
  const [currentSavings, setCurrentSavings] = React.useState("");
  const [monthlyContribution, setMonthlyContribution] = React.useState("");
  const [annualReturn, setAnnualReturn] = React.useState("7");

  const age = parseFloat(currentAge);
  const retireAge = parseFloat(retirementAge);
  const savings = parseFloat(currentSavings) || 0;
  const contribution = parseFloat(monthlyContribution) || 0;
  const returnRate = parseFloat(annualReturn);

  const valid =
    currentAge !== "" &&
    retirementAge !== "" &&
    !Number.isNaN(age) &&
    !Number.isNaN(retireAge) &&
    !Number.isNaN(returnRate) &&
    retireAge > age &&
    age >= 0;

  let result: { futureValue: number; totalContributed: number; totalGrowth: number } | null = null;

  if (valid) {
    const months = Math.round((retireAge - age) * 12);
    const monthlyRate = returnRate / 100 / 12;

    let futureValue: number;
    if (monthlyRate === 0) {
      futureValue = savings + contribution * months;
    } else {
      futureValue =
        savings * Math.pow(1 + monthlyRate, months) +
        contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    const totalContributed = savings + contribution * months;
    result = {
      futureValue: round2(futureValue),
      totalContributed: round2(totalContributed),
      totalGrowth: round2(futureValue - totalContributed),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ret-current-age" className="text-sm text-muted-foreground">
            Current age
          </Label>
          <Input
            id="ret-current-age"
            type="number"
            inputMode="numeric"
            min={0}
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            placeholder="30"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ret-retire-age" className="text-sm text-muted-foreground">
            Retirement age
          </Label>
          <Input
            id="ret-retire-age"
            type="number"
            inputMode="numeric"
            min={0}
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            placeholder="65"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ret-savings" className="text-sm text-muted-foreground">
            Current savings
          </Label>
          <Input
            id="ret-savings"
            type="number"
            inputMode="decimal"
            min={0}
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            placeholder="10000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ret-contribution" className="text-sm text-muted-foreground">
            Monthly contribution
          </Label>
          <Input
            id="ret-contribution"
            type="number"
            inputMode="decimal"
            min={0}
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="500"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="ret-return" className="text-sm text-muted-foreground">
            Expected annual return (%)
          </Label>
          <Input
            id="ret-return"
            type="number"
            inputMode="decimal"
            min={0}
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {currentAge && retirementAge && !valid && (
        <p className="mt-4 text-sm text-destructive">
          Retirement age must be greater than your current age.
        </p>
      )}

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.futureValue}</p>
            <p className="mt-1 text-sm text-muted-foreground">projected balance at retirement</p>
          </div>
          <StatBar
            items={[
              { label: "total contributed", value: result.totalContributed },
              { label: "investment growth", value: result.totalGrowth },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This is a simplified projection assuming a constant rate of return with no adjustment for
        inflation, taxes, or fees. Actual investment returns vary and are never guaranteed —
        consult a financial advisor for retirement planning specific to your situation.
      </p>
    </div>
  );
}
