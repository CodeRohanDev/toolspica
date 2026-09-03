"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Mode = "progressive" | "flat";

const BRACKETS = [
  { upTo: 11000, rate: 10 },
  { upTo: 44725, rate: 12 },
  { upTo: 95375, rate: 22 },
  { upTo: 182100, rate: 24 },
  { upTo: Infinity, rate: 32 },
];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function calculateProgressiveTax(income: number) {
  let tax = 0;
  let lower = 0;
  let marginalRate = BRACKETS[0].rate;
  for (const bracket of BRACKETS) {
    if (income <= lower) break;
    const taxableInBracket = Math.min(income, bracket.upTo) - lower;
    tax += taxableInBracket * (bracket.rate / 100);
    marginalRate = bracket.rate;
    if (income <= bracket.upTo) break;
    lower = bracket.upTo;
  }
  return { tax, marginalRate };
}

export function TaxCalculator() {
  const [income, setIncome] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("progressive");
  const [flatRate, setFlatRate] = React.useState("20");

  const numIncome = parseFloat(income);
  const valid = income !== "" && !Number.isNaN(numIncome) && numIncome >= 0;

  let result: { tax: number; effectiveRate: number; marginalRate: number; takeHome: number } | null = null;
  if (valid) {
    let tax: number;
    let marginalRate: number;
    if (mode === "progressive") {
      const calc = calculateProgressiveTax(numIncome);
      tax = calc.tax;
      marginalRate = calc.marginalRate;
    } else {
      const rate = parseFloat(flatRate) || 0;
      tax = numIncome * (rate / 100);
      marginalRate = rate;
    }
    result = {
      tax: round2(tax),
      effectiveRate: numIncome > 0 ? round2((tax / numIncome) * 100) : 0,
      marginalRate,
      takeHome: round2(numIncome - tax),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "progressive" ? "default" : "outline"}
          onClick={() => setMode("progressive")}
        >
          Progressive brackets
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "flat" ? "default" : "outline"}
          onClick={() => setMode("flat")}
        >
          Flat rate
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="tax-income" className="text-sm text-muted-foreground">
            Taxable income
          </Label>
          <Input
            id="tax-income"
            type="number"
            inputMode="decimal"
            min={0}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="60000"
            className="mt-1.5"
          />
        </div>
        {mode === "flat" && (
          <div>
            <Label htmlFor="tax-flat-rate" className="text-sm text-muted-foreground">
              Flat tax rate (%)
            </Label>
            <Input
              id="tax-flat-rate"
              type="number"
              inputMode="decimal"
              min={0}
              value={flatRate}
              onChange={(e) => setFlatRate(e.target.value)}
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.tax}</p>
            <p className="mt-1 text-sm text-muted-foreground">estimated tax owed</p>
          </div>
          <StatBar
            items={[
              { label: "effective rate", value: `${result.effectiveRate}%` },
              { label: "marginal rate", value: `${result.marginalRate}%` },
              { label: "take-home", value: result.takeHome },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        {mode === "progressive"
          ? "The progressive brackets shown are a simplified illustrative example, not official tax law for any specific country or year."
          : "Flat rate mode applies a single percentage to the full income you enter."}{" "}
        This is an estimate for general reference only — always check your local tax authority
        or a qualified tax professional for an accurate calculation.
      </p>
    </div>
  );
}
