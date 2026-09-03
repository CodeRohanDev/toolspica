"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function EmiCalculator() {
  const [principal, setPrincipal] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [tenureYears, setTenureYears] = React.useState("");

  const p = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const years = parseFloat(tenureYears);

  const valid =
    principal !== "" &&
    rate !== "" &&
    tenureYears !== "" &&
    !Number.isNaN(p) &&
    !Number.isNaN(annualRate) &&
    !Number.isNaN(years) &&
    p > 0 &&
    annualRate >= 0 &&
    years > 0;

  let result: { emi: number; totalPayment: number; totalInterest: number } | null = null;
  if (valid) {
    const months = Math.round(years * 12);
    const monthlyRate = annualRate / 12 / 100;
    let emi: number;
    if (monthlyRate === 0) {
      emi = p / months;
    } else {
      emi =
        (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalPayment = emi * months;
    result = {
      emi: round2(emi),
      totalPayment: round2(totalPayment),
      totalInterest: round2(totalPayment - p),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="emi-principal" className="text-sm text-muted-foreground">
            Loan amount
          </Label>
          <Input
            id="emi-principal"
            type="number"
            inputMode="decimal"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="500000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="emi-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="emi-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="9"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="emi-tenure" className="text-sm text-muted-foreground">
            Loan tenure (years)
          </Label>
          <Input
            id="emi-tenure"
            type="number"
            inputMode="decimal"
            min={0}
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            placeholder="5"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.emi}</p>
            <p className="mt-1 text-sm text-muted-foreground">monthly EMI</p>
          </div>
          <StatBar
            items={[
              { label: "total interest payable", value: result.totalInterest },
              { label: "total payment", value: result.totalPayment },
            ]}
          />
        </>
      )}
    </div>
  );
}
