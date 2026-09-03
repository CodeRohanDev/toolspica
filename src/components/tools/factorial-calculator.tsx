"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

function factorial(n: bigint): bigint {
  let result = BigInt(1);
  for (let i = BigInt(2); i <= n; i++) result *= i;
  return result;
}

export function FactorialCalculator() {
  const [input, setInput] = React.useState("10");

  const n = /^\d+$/.test(input.trim()) ? BigInt(input.trim()) : null;
  const tooLarge = n !== null && n > BigInt(5000);
  const result = n !== null && !tooLarge ? factorial(n) : null;
  const resultStr = result !== null ? result.toString() : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="factorial-input" className="text-sm text-muted-foreground">
        n
      </Label>
      <Input
        id="factorial-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1.5 w-32 font-mono"
        placeholder="e.g. 10"
      />

      {n === null && input.trim() && (
        <p className="mt-3 text-sm text-destructive">Enter a non-negative whole number.</p>
      )}
      {tooLarge && (
        <p className="mt-3 text-sm text-destructive">
          Numbers above 5000 produce results too large to display usefully here.
        </p>
      )}

      {result !== null && (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {n?.toString()}! ({resultStr.length.toLocaleString()} digits)
            </p>
            <CopyButton value={resultStr} />
          </div>
          <p className="mt-1.5 max-h-40 overflow-auto break-all rounded-lg border bg-muted/40 p-3 font-mono text-sm">
            {resultStr}
          </p>
        </div>
      )}
    </div>
  );
}
