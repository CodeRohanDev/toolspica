"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Mode = "add" | "remove";

const RATE_PRESETS = [5, 12, 18, 28];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function GstCalculator() {
  const [amount, setAmount] = React.useState("");
  const [rate, setRate] = React.useState("18");
  const [mode, setMode] = React.useState<Mode>("add");

  const numAmount = parseFloat(amount);
  const numRate = parseFloat(rate);
  const valid = amount !== "" && !Number.isNaN(numAmount) && numAmount >= 0 && !Number.isNaN(numRate);

  let result: { baseAmount: number; gstAmount: number; totalAmount: number; cgst: number; sgst: number } | null = null;

  if (valid) {
    let baseAmount: number;
    let gstAmount: number;
    if (mode === "add") {
      baseAmount = numAmount;
      gstAmount = round2(numAmount * (numRate / 100));
    } else {
      baseAmount = round2(numAmount / (1 + numRate / 100));
      gstAmount = round2(numAmount - baseAmount);
    }
    const totalAmount = round2(baseAmount + gstAmount);
    result = {
      baseAmount: round2(baseAmount),
      gstAmount,
      totalAmount,
      cgst: round2(gstAmount / 2),
      sgst: round2(gstAmount / 2),
    };
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
          Add GST
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "remove" ? "default" : "outline"}
          onClick={() => setMode("remove")}
        >
          Remove GST
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="gst-amount" className="text-sm text-muted-foreground">
            {mode === "add" ? "Amount (excluding GST)" : "Amount (including GST)"}
          </Label>
          <Input
            id="gst-amount"
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
          <Label htmlFor="gst-rate" className="text-sm text-muted-foreground">
            GST rate (%)
          </Label>
          <Input
            id="gst-rate"
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
            <p className="text-3xl font-semibold tabular-nums">{result.totalAmount}</p>
            <p className="mt-1 text-sm text-muted-foreground">total amount including GST</p>
          </div>
          <StatBar
            items={[
              { label: "base amount", value: result.baseAmount },
              { label: "GST amount", value: result.gstAmount },
              { label: "CGST", value: result.cgst },
              { label: "SGST", value: result.sgst },
            ]}
          />
        </>
      )}
    </div>
  );
}
