"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Direction = "future" | "past";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function InflationCalculator() {
  const [amount, setAmount] = React.useState("");
  const [years, setYears] = React.useState("");
  const [rate, setRate] = React.useState("3");
  const [direction, setDirection] = React.useState<Direction>("future");

  const numAmount = parseFloat(amount);
  const numYears = parseFloat(years);
  const numRate = parseFloat(rate);

  const valid =
    amount !== "" &&
    years !== "" &&
    !Number.isNaN(numAmount) &&
    !Number.isNaN(numYears) &&
    !Number.isNaN(numRate) &&
    numAmount >= 0 &&
    numYears >= 0;

  let adjustedValue: number | null = null;
  if (valid) {
    const factor = Math.pow(1 + numRate / 100, numYears);
    adjustedValue = direction === "future" ? round2(numAmount * factor) : round2(numAmount / factor);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={direction === "future" ? "default" : "outline"}
          onClick={() => setDirection("future")}
        >
          Future value
        </Button>
        <Button
          type="button"
          size="sm"
          variant={direction === "past" ? "default" : "outline"}
          onClick={() => setDirection("past")}
        >
          Past equivalent value
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="inf-amount" className="text-sm text-muted-foreground">
            Amount
          </Label>
          <Input
            id="inf-amount"
            type="number"
            inputMode="decimal"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="inf-years" className="text-sm text-muted-foreground">
            Number of years
          </Label>
          <Input
            id="inf-years"
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
          <Label htmlFor="inf-rate" className="text-sm text-muted-foreground">
            Average annual inflation rate (%)
          </Label>
          <Input
            id="inf-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {adjustedValue !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{adjustedValue}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {direction === "future"
              ? `equivalent purchasing power ${years} years from now`
              : `what this amount was worth ${years} years ago`}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Uses a constant average inflation rate you provide — real inflation varies year to year
        and this is a directional estimate, not an official historical calculation.
      </p>
    </div>
  );
}
