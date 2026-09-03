"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function RoiCalculator() {
  const [investment, setInvestment] = React.useState("");
  const [finalValue, setFinalValue] = React.useState("");
  const [years, setYears] = React.useState("");

  const numInvestment = parseFloat(investment);
  const numFinalValue = parseFloat(finalValue);
  const numYears = parseFloat(years);

  const valid =
    investment !== "" &&
    finalValue !== "" &&
    !Number.isNaN(numInvestment) &&
    !Number.isNaN(numFinalValue) &&
    numInvestment > 0;

  let result: { netGain: number; roiPercent: number; annualizedPercent: number | null } | null = null;
  if (valid) {
    const netGain = numFinalValue - numInvestment;
    const roiPercent = round2((netGain / numInvestment) * 100);
    let annualizedPercent: number | null = null;
    if (years !== "" && !Number.isNaN(numYears) && numYears > 0 && numFinalValue > 0) {
      annualizedPercent = round2(
        (Math.pow(numFinalValue / numInvestment, 1 / numYears) - 1) * 100
      );
    }
    result = { netGain: round2(netGain), roiPercent, annualizedPercent };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="roi-investment" className="text-sm text-muted-foreground">
            Initial investment
          </Label>
          <Input
            id="roi-investment"
            type="number"
            inputMode="decimal"
            min={0}
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="10000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="roi-final" className="text-sm text-muted-foreground">
            Final value
          </Label>
          <Input
            id="roi-final"
            type="number"
            inputMode="decimal"
            min={0}
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            placeholder="14000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="roi-years" className="text-sm text-muted-foreground">
            Time period (years, optional)
          </Label>
          <Input
            id="roi-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="2"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.roiPercent}%</p>
            <p className="mt-1 text-sm text-muted-foreground">total ROI</p>
          </div>
          <StatBar
            items={[
              { label: "net gain", value: result.netGain },
              {
                label: "annualized ROI",
                value: result.annualizedPercent === null ? "n/a" : `${result.annualizedPercent}%`,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
