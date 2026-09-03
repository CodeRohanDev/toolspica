"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function FreelanceRateCalculator() {
  const [desiredIncome, setDesiredIncome] = React.useState("");
  const [expenses, setExpenses] = React.useState("");
  const [weeksOff, setWeeksOff] = React.useState("4");
  const [billableHours, setBillableHours] = React.useState("25");
  const [taxRate, setTaxRate] = React.useState("25");

  const income = parseFloat(desiredIncome);
  const annualExpenses = parseFloat(expenses) || 0;
  const off = parseFloat(weeksOff) || 0;
  const hoursPerWeek = parseFloat(billableHours);
  const rate = parseFloat(taxRate) || 0;

  const valid =
    desiredIncome !== "" &&
    billableHours !== "" &&
    !Number.isNaN(income) &&
    !Number.isNaN(hoursPerWeek) &&
    income > 0 &&
    hoursPerWeek > 0 &&
    off < 52;

  let result: { hourlyRate: number; dayRate: number; grossNeeded: number } | null = null;
  if (valid) {
    const workWeeks = 52 - off;
    const totalBillableHours = workWeeks * hoursPerWeek;
    const grossNeeded = (income + annualExpenses) / (1 - rate / 100);
    const hourlyRate = grossNeeded / totalBillableHours;
    result = {
      hourlyRate: round2(hourlyRate),
      dayRate: round2(hourlyRate * 8),
      grossNeeded: round2(grossNeeded),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="fr-income" className="text-sm text-muted-foreground">
            Desired take-home income (yearly)
          </Label>
          <Input
            id="fr-income"
            type="number"
            inputMode="decimal"
            min={0}
            value={desiredIncome}
            onChange={(e) => setDesiredIncome(e.target.value)}
            placeholder="80000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fr-expenses" className="text-sm text-muted-foreground">
            Annual business expenses
          </Label>
          <Input
            id="fr-expenses"
            type="number"
            inputMode="decimal"
            min={0}
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="5000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fr-weeks-off" className="text-sm text-muted-foreground">
            Weeks off per year (vacation, sick, admin)
          </Label>
          <Input
            id="fr-weeks-off"
            type="number"
            inputMode="numeric"
            min={0}
            max={51}
            value={weeksOff}
            onChange={(e) => setWeeksOff(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fr-hours" className="text-sm text-muted-foreground">
            Billable hours per week
          </Label>
          <Input
            id="fr-hours"
            type="number"
            inputMode="decimal"
            min={1}
            max={80}
            value={billableHours}
            onChange={(e) => setBillableHours(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fr-tax" className="text-sm text-muted-foreground">
            Estimated tax rate (%)
          </Label>
          <Input
            id="fr-tax"
            type="number"
            inputMode="decimal"
            min={0}
            max={90}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.hourlyRate}</p>
            <p className="mt-1 text-sm text-muted-foreground">required hourly rate</p>
          </div>
          <StatBar
            items={[
              { label: "day rate (8h)", value: result.dayRate },
              { label: "gross revenue needed", value: result.grossNeeded },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This is a planning estimate — actual tax obligations for self-employed income vary by
        location and depend on much more than a single rate. Consult a tax professional for exact
        figures.
      </p>
    </div>
  );
}
