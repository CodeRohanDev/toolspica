"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = React.useState("");
  const [annualReturn, setAnnualReturn] = React.useState("12");
  const [years, setYears] = React.useState("");

  const monthly = parseFloat(monthlyInvestment);
  const returnRate = parseFloat(annualReturn);
  const numYears = parseFloat(years);

  const valid =
    monthlyInvestment !== "" &&
    years !== "" &&
    !Number.isNaN(monthly) &&
    !Number.isNaN(returnRate) &&
    !Number.isNaN(numYears) &&
    monthly > 0 &&
    numYears > 0;

  let result: { investedAmount: number; estimatedReturns: number; futureValue: number } | null = null;

  if (valid) {
    const months = Math.round(numYears * 12);
    const monthlyRate = returnRate / 12 / 100;

    let futureValue: number;
    if (monthlyRate === 0) {
      futureValue = monthly * months;
    } else {
      futureValue =
        monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }

    const investedAmount = monthly * months;
    result = {
      investedAmount: round2(investedAmount),
      estimatedReturns: round2(futureValue - investedAmount),
      futureValue: round2(futureValue),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="sip-monthly" className="text-sm text-muted-foreground">
            Monthly investment
          </Label>
          <Input
            id="sip-monthly"
            type="number"
            inputMode="decimal"
            min={0}
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            placeholder="5000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sip-return" className="text-sm text-muted-foreground">
            Expected annual return (%)
          </Label>
          <Input
            id="sip-return"
            type="number"
            inputMode="decimal"
            min={0}
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sip-years" className="text-sm text-muted-foreground">
            Investment period (years)
          </Label>
          <Input
            id="sip-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="10"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.futureValue}</p>
            <p className="mt-1 text-sm text-muted-foreground">projected maturity value</p>
          </div>
          <StatBar
            items={[
              { label: "invested amount", value: result.investedAmount },
              { label: "estimated returns", value: result.estimatedReturns },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Projected value assumes a constant rate of return, which real mutual fund investments
        never deliver exactly — actual SIP returns fluctuate with the market and are never
        guaranteed.
      </p>
    </div>
  );
}
