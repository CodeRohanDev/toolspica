"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function americanToDecimal(american: number): number {
  return american > 0 ? american / 100 + 1 : 100 / Math.abs(american) + 1;
}

function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) return (decimal - 1) * 100;
  return -100 / (decimal - 1);
}

function decimalToFractional(decimal: number): string {
  const value = decimal - 1;
  if (value <= 0) return "0/1";
  let denominator = 1;
  while (Math.abs(value * denominator - Math.round(value * denominator)) > 0.01 && denominator < 100) {
    denominator++;
  }
  const numerator = Math.round(value * denominator);
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, denominator) || 1;
  return `${numerator / divisor}/${denominator / divisor}`;
}

function decimalToImpliedProbability(decimal: number): number {
  return (1 / decimal) * 100;
}

export function BettingOddsConverter() {
  const [decimal, setDecimal] = React.useState(2.5);

  const american = decimalToAmerican(decimal);
  const fractional = decimalToFractional(decimal);
  const probability = decimalToImpliedProbability(decimal);

  const handleDecimalChange = (v: number) => setDecimal(v);
  const handleAmericanChange = (v: number) => setDecimal(americanToDecimal(v));

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Decimal odds</Label>
          <Input type="number" step={0.01} min={1.01} value={decimal.toFixed(2)} onChange={(e) => handleDecimalChange(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">American odds</Label>
          <Input type="number" value={Math.round(american)} onChange={(e) => handleAmericanChange(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Fractional odds</p>
          <p className="text-xl font-semibold">{fractional}</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Implied probability</p>
          <p className="text-xl font-semibold">{probability.toFixed(1)}%</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Implied probability doesn&apos;t account for the bookmaker&apos;s margin (vig), so probabilities
        across all outcomes will typically sum to slightly over 100%.
      </p>
    </div>
  );
}
