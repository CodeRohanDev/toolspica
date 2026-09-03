"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

function parseNumbers(text: string): number[] {
  return text
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

function round4(n: number) {
  return Math.round(n * 10000) / 10000;
}

export function StandardDeviationCalculator() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<"population" | "sample">("sample");

  const numbers = parseNumbers(text);
  const count = numbers.length;

  let result: { mean: number; variance: number; stdDev: number } | null = null;
  if (count >= 2 || (count >= 1 && mode === "population")) {
    const mean = numbers.reduce((a, b) => a + b, 0) / count;
    const squaredDiffs = numbers.reduce((sum, n) => sum + (n - mean) ** 2, 0);
    const divisor = mode === "sample" ? count - 1 : count;
    const variance = squaredDiffs / divisor;
    result = { mean: round4(mean), variance: round4(variance), stdDev: round4(Math.sqrt(variance)) };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter numbers separated by commas, spaces, or new lines — e.g. 4, 8, 6, 5, 3, 8"
        rows={6}
        className="resize-y text-sm"
      />

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "sample" ? "default" : "outline"}
          onClick={() => setMode("sample")}
        >
          Sample
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "population" ? "default" : "outline"}
          onClick={() => setMode("population")}
        >
          Population
        </Button>
      </div>

      {count === 1 && mode === "sample" && (
        <p className="mt-3 text-sm text-destructive">
          Sample standard deviation needs at least 2 numbers.
        </p>
      )}

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.stdDev}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode} standard deviation
            </p>
          </div>
          <StatBar
            items={[
              { label: "mean", value: result.mean },
              { label: "variance", value: result.variance },
              { label: "count", value: count },
            ]}
          />
        </>
      )}
    </div>
  );
}
