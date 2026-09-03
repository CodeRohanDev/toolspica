"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

function randomInRange(min: number, max: number, allowDecimal: boolean) {
  const value = Math.random() * (max - min) + min;
  return allowDecimal ? Math.round(value * 100) / 100 : Math.round(value);
}

export function RandomNumberRangeCalculator() {
  const [min, setMin] = React.useState("1");
  const [max, setMax] = React.useState("100");
  const [count, setCount] = React.useState("1");
  const [allowDuplicates, setAllowDuplicates] = React.useState(true);
  const [allowDecimal, setAllowDecimal] = React.useState(false);
  const [results, setResults] = React.useState<number[]>([]);
  const [error, setError] = React.useState("");

  function generate() {
    const numMin = parseFloat(min);
    const numMax = parseFloat(max);
    const numCount = Math.max(1, parseInt(count, 10) || 1);

    if (Number.isNaN(numMin) || Number.isNaN(numMax) || numMin >= numMax) {
      setError("Min must be less than max.");
      setResults([]);
      return;
    }

    const rangeSize = allowDecimal ? Infinity : Math.floor(numMax) - Math.ceil(numMin) + 1;
    if (!allowDuplicates && !allowDecimal && numCount > rangeSize) {
      setError("Not enough unique whole numbers in this range for that count.");
      setResults([]);
      return;
    }

    setError("");
    if (allowDuplicates) {
      setResults(
        Array.from({ length: numCount }, () => randomInRange(numMin, numMax, allowDecimal))
      );
      return;
    }

    const values = new Set<number>();
    while (values.size < numCount) {
      values.add(randomInRange(numMin, numMax, allowDecimal));
    }
    setResults(Array.from(values));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="rand-min" className="text-sm text-muted-foreground">
            Min
          </Label>
          <Input
            id="rand-min"
            type="number"
            inputMode="decimal"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rand-max" className="text-sm text-muted-foreground">
            Max
          </Label>
          <Input
            id="rand-max"
            type="number"
            inputMode="decimal"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rand-count" className="text-sm text-muted-foreground">
            How many numbers
          </Label>
          <Input
            id="rand-count"
            type="number"
            inputMode="numeric"
            min={1}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="rand-duplicates"
            checked={allowDuplicates}
            onCheckedChange={setAllowDuplicates}
          />
          <Label htmlFor="rand-duplicates" className="text-sm font-normal">
            Allow duplicates
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rand-decimal" checked={allowDecimal} onCheckedChange={setAllowDecimal} />
          <Label htmlFor="rand-decimal" className="text-sm font-normal">
            Allow decimals
          </Label>
        </div>
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
        </div>
      )}
    </div>
  );
}
