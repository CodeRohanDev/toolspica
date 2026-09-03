"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [years, setYears] = React.useState("");

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const t = parseFloat(years);
  const valid =
    principal !== "" &&
    rate !== "" &&
    years !== "" &&
    !Number.isNaN(p) &&
    !Number.isNaN(r) &&
    !Number.isNaN(t) &&
    p >= 0 &&
    t >= 0;

  let result: { interest: number; total: number } | null = null;
  if (valid) {
    const interest = round2((p * r * t) / 100);
    result = { interest, total: round2(p + interest) };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="si-principal" className="text-sm text-muted-foreground">
            Principal amount
          </Label>
          <Input
            id="si-principal"
            type="number"
            inputMode="decimal"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="1000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="si-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="si-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="5"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="si-years" className="text-sm text-muted-foreground">
            Time (years)
          </Label>
          <Input
            id="si-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="3"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.total}</p>
            <p className="mt-1 text-sm text-muted-foreground">total after interest</p>
          </div>
          <StatBar items={[{ label: "interest earned", value: result.interest }]} />
        </>
      )}
    </div>
  );
}
