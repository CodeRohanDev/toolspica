"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Mode = "percent-of" | "what-percent" | "percent-change";

const MODES: { id: Mode; label: string }[] = [
  { id: "percent-of", label: "X% of Y" },
  { id: "what-percent", label: "X is what % of Y" },
  { id: "percent-change", label: "% increase / decrease" },
];

const LABELS: Record<Mode, [string, string]> = {
  "percent-of": ["Percentage (%)", "Of value"],
  "what-percent": ["Part value", "Whole value"],
  "percent-change": ["From value", "To value"],
};

export function PercentageCalculator() {
  const [mode, setMode] = React.useState<Mode>("percent-of");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const valid = a !== "" && b !== "" && !Number.isNaN(numA) && !Number.isNaN(numB);

  let result: number | null = null;
  if (valid) {
    if (mode === "percent-of") {
      result = (numA / 100) * numB;
    } else if (mode === "what-percent" && numB !== 0) {
      result = (numA / numB) * 100;
    } else if (mode === "percent-change" && numA !== 0) {
      result = ((numB - numA) / numA) * 100;
    }
  }

  const [labelA, labelB] = LABELS[mode];

  function switchMode(next: Mode) {
    setMode(next);
    setA("");
    setB("");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.id}
            type="button"
            size="sm"
            variant={mode === m.id ? "default" : "outline"}
            onClick={() => switchMode(m.id)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="pct-a" className="text-sm text-muted-foreground">
            {labelA}
          </Label>
          <Input
            id="pct-a"
            type="number"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="pct-b" className="text-sm text-muted-foreground">
            {labelB}
          </Label>
          <Input
            id="pct-b"
            type="number"
            inputMode="decimal"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
      </div>

      {result !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          {mode === "percent-change" ? (
            <p className="text-3xl font-semibold tabular-nums">
              {result >= 0 ? "+" : ""}
              {result.toFixed(2)}%
              <span className="ml-2 text-lg font-normal text-muted-foreground">
                ({result >= 0 ? "increase" : "decrease"})
              </span>
            </p>
          ) : (
            <p className="text-3xl font-semibold tabular-nums">
              {Number.isInteger(result) ? result : result.toFixed(2)}
              {mode === "what-percent" ? "%" : ""}
            </p>
          )}
        </div>
      )}

      {mode === "what-percent" && b !== "" && numB === 0 && (
        <p className="mt-3 text-sm text-destructive">Whole value can&apos;t be zero.</p>
      )}
      {mode === "percent-change" && a !== "" && numA === 0 && (
        <p className="mt-3 text-sm text-destructive">From value can&apos;t be zero.</p>
      )}
    </div>
  );
}
