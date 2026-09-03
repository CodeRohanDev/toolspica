"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

const PRESETS = [10, 15, 18, 20, 25];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function TipCalculator() {
  const [bill, setBill] = React.useState("");
  const [tipPercent, setTipPercent] = React.useState("18");
  const [people, setPeople] = React.useState("1");

  const numBill = parseFloat(bill);
  const numTip = parseFloat(tipPercent);
  const numPeople = Math.max(1, parseInt(people, 10) || 1);

  const valid = bill !== "" && !Number.isNaN(numBill) && numBill >= 0 && !Number.isNaN(numTip);

  let result: {
    tipAmount: number;
    total: number;
    perPersonTotal: number;
    perPersonTip: number;
  } | null = null;

  if (valid) {
    const tipAmount = round2(numBill * (numTip / 100));
    const total = round2(numBill + tipAmount);
    result = {
      tipAmount,
      total,
      perPersonTotal: round2(total / numPeople),
      perPersonTip: round2(tipAmount / numPeople),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="tip-bill" className="text-sm text-muted-foreground">
            Bill amount
          </Label>
          <Input
            id="tip-bill"
            type="number"
            inputMode="decimal"
            min={0}
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="tip-people" className="text-sm text-muted-foreground">
            Number of people
          </Label>
          <Input
            id="tip-people"
            type="number"
            inputMode="numeric"
            min={1}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="1"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Tip percentage</Label>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Button
              key={p}
              type="button"
              size="sm"
              variant={tipPercent === String(p) ? "default" : "outline"}
              onClick={() => setTipPercent(String(p))}
            >
              {p}%
            </Button>
          ))}
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-20"
            placeholder="Custom"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.total}</p>
            <p className="mt-1 text-sm text-muted-foreground">total bill including tip</p>
          </div>
          <StatBar
            items={[
              { label: "tip amount", value: result.tipAmount },
              { label: "per person total", value: result.perPersonTotal },
              { label: "per person tip", value: result.perPersonTip },
            ]}
          />
        </>
      )}
    </div>
  );
}
