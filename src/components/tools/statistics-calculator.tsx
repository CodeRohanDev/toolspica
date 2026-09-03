"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
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

function computeStats(numbers: number[]) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const mid = Math.floor(count / 2);
  const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  const frequency = new Map<number, number>();
  for (const n of numbers) frequency.set(n, (frequency.get(n) ?? 0) + 1);
  const maxFreq = Math.max(...frequency.values());
  const modes =
    maxFreq === 1 ? [] : [...frequency.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  return {
    count,
    sum: round4(sum),
    mean: round4(mean),
    median: round4(median),
    modes,
    min,
    max,
    range: round4(range),
  };
}

export function StatisticsCalculator() {
  const [text, setText] = React.useState("");

  const numbers = parseNumbers(text);
  const stats = numbers.length > 0 ? computeStats(numbers) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter numbers separated by commas, spaces, or new lines — e.g. 4, 8, 6, 5, 3, 8"
        rows={6}
        className="resize-y text-sm"
      />

      {stats && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">{stats.mean}</p>
              <p className="text-xs text-muted-foreground">mean</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">{stats.median}</p>
              <p className="text-xs text-muted-foreground">median</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">
                {stats.modes.length === 0 ? "none" : stats.modes.join(", ")}
              </p>
              <p className="text-xs text-muted-foreground">mode</p>
            </div>
          </div>
          <StatBar
            items={[
              { label: "count", value: stats.count },
              { label: "sum", value: stats.sum },
              { label: "min", value: stats.min },
              { label: "max", value: stats.max },
              { label: "range", value: stats.range },
            ]}
          />
        </>
      )}
    </div>
  );
}
