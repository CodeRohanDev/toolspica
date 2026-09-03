"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FREQUENCIES = [
  { id: "1", label: "Annually" },
  { id: "2", label: "Semi-annually" },
  { id: "4", label: "Quarterly" },
  { id: "12", label: "Monthly" },
  { id: "365", label: "Daily" },
];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [years, setYears] = React.useState("");
  const [frequency, setFrequency] = React.useState("12");

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const t = parseFloat(years);
  const n = parseInt(frequency, 10);
  const valid =
    principal !== "" &&
    rate !== "" &&
    years !== "" &&
    !Number.isNaN(p) &&
    !Number.isNaN(r) &&
    !Number.isNaN(t) &&
    p >= 0 &&
    t >= 0;

  let result: { total: number; interest: number } | null = null;
  if (valid) {
    const total = round2(p * Math.pow(1 + r / 100 / n, n * t));
    result = { total, interest: round2(total - p) };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ci-principal" className="text-sm text-muted-foreground">
            Principal amount
          </Label>
          <Input
            id="ci-principal"
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
          <Label htmlFor="ci-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="ci-rate"
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
          <Label htmlFor="ci-years" className="text-sm text-muted-foreground">
            Time (years)
          </Label>
          <Input
            id="ci-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="10"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Compounding frequency</Label>
          <Select
            value={frequency}
            onValueChange={(value) => value && setFrequency(value)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FREQUENCIES.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.total}</p>
            <p className="mt-1 text-sm text-muted-foreground">final balance</p>
          </div>
          <StatBar items={[{ label: "interest earned", value: result.interest }]} />
        </>
      )}
    </div>
  );
}
