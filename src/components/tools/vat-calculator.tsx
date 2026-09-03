"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Mode = "add" | "remove";

const RATE_PRESETS = [20, 5, 0];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function VatCalculator() {
  const [amount, setAmount] = React.useState("");
  const [rate, setRate] = React.useState("20");
  const [mode, setMode] = React.useState<Mode>("add");

  const numAmount = parseFloat(amount);
  const numRate = parseFloat(rate);
  const valid = amount !== "" && !Number.isNaN(numAmount) && numAmount >= 0 && !Number.isNaN(numRate);

  let result: { netAmount: number; vatAmount: number; grossAmount: number } | null = null;

  if (valid) {
    let netAmount: number;
    let vatAmount: number;
    if (mode === "add") {
      netAmount = numAmount;
      vatAmount = round2(numAmount * (numRate / 100));
    } else {
      netAmount = round2(numAmount / (1 + numRate / 100));
      vatAmount = round2(numAmount - netAmount);
    }
    result = { netAmount: round2(netAmount), vatAmount, grossAmount: round2(netAmount + vatAmount) };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "add" ? "default" : "outline"}
          onClick={() => setMode("add")}
        >
          Add VAT
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "remove" ? "default" : "outline"}
          onClick={() => setMode("remove")}
        >
          Remove VAT
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="vat-amount" className="text-sm text-muted-foreground">
            {mode === "add" ? "Amount (excluding VAT)" : "Amount (including VAT)"}
          </Label>
          <Input
            id="vat-amount"
            type="number"
            inputMode="decimal"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="vat-rate" className="text-sm text-muted-foreground">
            VAT rate (%)
          </Label>
          <Input
            id="vat-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1.5"
          />
          <div className="mt-1.5 flex gap-1.5">
            {RATE_PRESETS.map((r) => (
              <Button
                key={r}
                type="button"
                size="xs"
                variant={rate === String(r) ? "default" : "outline"}
                onClick={() => setRate(String(r))}
              >
                {r}%
              </Button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.grossAmount}</p>
            <p className="mt-1 text-sm text-muted-foreground">total amount including VAT</p>
          </div>
          <StatBar
            items={[
              { label: "net amount", value: result.netAmount },
              { label: "VAT amount", value: result.vatAmount },
            ]}
          />
        </>
      )}
    </div>
  );
}
