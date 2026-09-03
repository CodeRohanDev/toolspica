"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ZERO = BigInt(0);

function gcdTwo(a: bigint, b: bigint): bigint {
  a = a < ZERO ? -a : a;
  b = b < ZERO ? -b : b;
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcmTwo(a: bigint, b: bigint): bigint {
  if (a === ZERO || b === ZERO) return ZERO;
  return (a / gcdTwo(a, b)) * b;
}

export function GcdAndLcmCalculator() {
  const [input, setInput] = React.useState("24, 36, 60");

  const parts = input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allValid = parts.length >= 2 && parts.every((p) => /^\d+$/.test(p));
  const numbers = allValid ? parts.map((p) => BigInt(p)) : null;

  const gcd = numbers ? numbers.reduce((a, b) => gcdTwo(a, b)) : null;
  const lcm = numbers ? numbers.reduce((a, b) => lcmTwo(a, b)) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="gcd-input" className="text-sm text-muted-foreground">
        Numbers (comma-separated, at least 2)
      </Label>
      <Input
        id="gcd-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1.5 font-mono"
        placeholder="e.g. 24, 36, 60"
      />

      {!allValid && parts.length > 0 && (
        <p className="mt-3 text-sm text-destructive">
          Enter at least two non-negative whole numbers, separated by commas.
        </p>
      )}

      {gcd !== null && lcm !== null && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Greatest Common Divisor
            </p>
            <p className="mt-1 font-mono text-lg font-semibold">{gcd.toString()}</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Least Common Multiple
            </p>
            <p className="mt-1 font-mono text-lg font-semibold">{lcm.toString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
