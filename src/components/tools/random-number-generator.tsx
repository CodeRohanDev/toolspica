"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

export function RandomNumberGenerator() {
  const [min, setMin] = React.useState("1");
  const [max, setMax] = React.useState("100");
  const [count, setCount] = React.useState("1");
  const [unique, setUnique] = React.useState(false);
  const [results, setResults] = React.useState<number[]>([]);
  const [error, setError] = React.useState("");

  function generate() {
    const lo = parseInt(min, 10);
    const hi = parseInt(max, 10);
    const n = Math.max(1, Math.min(100, parseInt(count, 10) || 1));

    if (Number.isNaN(lo) || Number.isNaN(hi) || lo > hi) {
      setError("Min must be less than or equal to max.");
      setResults([]);
      return;
    }
    const rangeSize = hi - lo + 1;
    if (unique && n > rangeSize) {
      setError(`Only ${rangeSize} unique numbers exist in this range.`);
      setResults([]);
      return;
    }
    setError("");

    if (!unique) {
      setResults(Array.from({ length: n }, () => lo + Math.floor(Math.random() * rangeSize)));
      return;
    }
    const picked = new Set<number>();
    while (picked.size < n) {
      picked.add(lo + Math.floor(Math.random() * rangeSize));
    }
    setResults([...picked]);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="rng-min" className="text-sm text-muted-foreground">
            Minimum
          </Label>
          <Input
            id="rng-min"
            type="number"
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rng-max" className="text-sm text-muted-foreground">
            Maximum
          </Label>
          <Input
            id="rng-max"
            type="number"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rng-count" className="text-sm text-muted-foreground">
            How many (1-100)
          </Label>
          <Input
            id="rng-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Switch id="rng-unique" checked={unique} onCheckedChange={setUnique} />
        <Label htmlFor="rng-unique" className="text-sm font-normal">
          No duplicates
        </Label>
      </div>

      <Button type="button" onClick={generate} className="mt-4">
        Generate
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {results.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Result{results.length > 1 ? "s" : ""}</p>
            <CopyButton value={results.join(", ")} />
          </div>
          {results.length === 1 ? (
            <p className="mt-3 text-center text-5xl font-semibold tabular-nums">{results[0]}</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {results.map((r, i) => (
                <span
                  key={i}
                  className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold tabular-nums"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
