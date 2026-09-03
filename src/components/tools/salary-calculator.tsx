"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Period = "hourly" | "daily" | "weekly" | "monthly" | "annual";

const PERIODS: { id: Period; label: string }[] = [
  { id: "hourly", label: "Hourly" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual" },
];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function SalaryCalculator() {
  const [amount, setAmount] = React.useState("");
  const [period, setPeriod] = React.useState<Period>("annual");
  const [hoursPerWeek, setHoursPerWeek] = React.useState("40");
  const [daysPerWeek, setDaysPerWeek] = React.useState("5");

  const numAmount = parseFloat(amount);
  const hpw = parseFloat(hoursPerWeek) || 40;
  const dpw = parseFloat(daysPerWeek) || 5;
  const weeksPerYear = 52;

  const valid = amount !== "" && !Number.isNaN(numAmount) && numAmount >= 0 && hpw > 0 && dpw > 0;

  let annual = 0;
  if (valid) {
    if (period === "hourly") annual = numAmount * hpw * weeksPerYear;
    else if (period === "daily") annual = numAmount * dpw * weeksPerYear;
    else if (period === "weekly") annual = numAmount * weeksPerYear;
    else if (period === "monthly") annual = numAmount * 12;
    else annual = numAmount;
  }

  const results = valid
    ? {
        hourly: round2(annual / weeksPerYear / hpw),
        daily: round2(annual / weeksPerYear / dpw),
        weekly: round2(annual / weeksPerYear),
        monthly: round2(annual / 12),
        annual: round2(annual),
      }
    : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="salary-amount" className="text-sm text-muted-foreground">
            Amount
          </Label>
          <Input
            id="salary-amount"
            type="number"
            inputMode="decimal"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="60000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Pay period</Label>
          <Select
            value={period}
            onValueChange={(value) => value && setPeriod(value as Period)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salary-hours" className="text-sm text-muted-foreground">
            Hours per week
          </Label>
          <Input
            id="salary-hours"
            type="number"
            inputMode="decimal"
            min={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="salary-days" className="text-sm text-muted-foreground">
            Days per week
          </Label>
          <Input
            id="salary-days"
            type="number"
            inputMode="decimal"
            min={1}
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {results && (
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {PERIODS.map((p) => (
            <div key={p.id} className="rounded-lg bg-brand-soft p-3 text-center">
              <p className="text-lg font-semibold tabular-nums">{results[p.id]}</p>
              <p className="text-xs text-muted-foreground">{p.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
