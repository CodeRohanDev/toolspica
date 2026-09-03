"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function SavingsGoalCalculator() {
  const [goal, setGoal] = React.useState("");
  const [current, setCurrent] = React.useState("0");
  const [years, setYears] = React.useState("");
  const [annualReturn, setAnnualReturn] = React.useState("5");

  const numGoal = parseFloat(goal);
  const numCurrent = parseFloat(current) || 0;
  const numYears = parseFloat(years);
  const returnRate = parseFloat(annualReturn) || 0;

  const valid =
    goal !== "" &&
    years !== "" &&
    !Number.isNaN(numGoal) &&
    !Number.isNaN(numYears) &&
    numGoal > 0 &&
    numYears > 0;

  let result: { monthlyContribution: number; totalContributed: number; growthFromReturns: number } | null = null;

  if (valid) {
    const months = Math.round(numYears * 12);
    const monthlyRate = returnRate / 12 / 100;
    const futureValueOfCurrent = numCurrent * Math.pow(1 + monthlyRate, months);
    const remainingNeeded = numGoal - futureValueOfCurrent;

    let monthlyContribution: number;
    if (remainingNeeded <= 0) {
      monthlyContribution = 0;
    } else if (monthlyRate === 0) {
      monthlyContribution = remainingNeeded / months;
    } else {
      monthlyContribution =
        remainingNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    }

    const totalContributed = round2(numCurrent + monthlyContribution * months);
    result = {
      monthlyContribution: round2(Math.max(0, monthlyContribution)),
      totalContributed,
      growthFromReturns: round2(numGoal - totalContributed),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="goal-target" className="text-sm text-muted-foreground">
            Savings goal
          </Label>
          <Input
            id="goal-target"
            type="number"
            inputMode="decimal"
            min={0}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="20000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="goal-current" className="text-sm text-muted-foreground">
            Current savings
          </Label>
          <Input
            id="goal-current"
            type="number"
            inputMode="decimal"
            min={0}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="goal-years" className="text-sm text-muted-foreground">
            Time to reach goal (years)
          </Label>
          <Input
            id="goal-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="3"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="goal-return" className="text-sm text-muted-foreground">
            Expected annual return (%)
          </Label>
          <Input
            id="goal-return"
            type="number"
            inputMode="decimal"
            min={0}
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.monthlyContribution}</p>
            <p className="mt-1 text-sm text-muted-foreground">required monthly contribution</p>
          </div>
          <StatBar
            items={[
              { label: "total you contribute", value: result.totalContributed },
              { label: "growth from returns", value: result.growthFromReturns },
            ]}
          />
        </>
      )}
    </div>
  );
}
