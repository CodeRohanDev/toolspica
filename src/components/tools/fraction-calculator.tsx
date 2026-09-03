"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Op = "+" | "-" | "×" | "÷";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function simplify(num: number, den: number) {
  if (den === 0) return null;
  const sign = den < 0 ? -1 : 1;
  num *= sign;
  den *= sign;
  const divisor = gcd(num, den);
  return { num: num / divisor, den: den / divisor };
}

export function FractionCalculator() {
  const [num1, setNum1] = React.useState("");
  const [den1, setDen1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [den2, setDen2] = React.useState("");
  const [op, setOp] = React.useState<Op>("+");

  const n1 = parseInt(num1, 10);
  const d1 = parseInt(den1, 10);
  const n2 = parseInt(num2, 10);
  const d2 = parseInt(den2, 10);

  const valid =
    !Number.isNaN(n1) && !Number.isNaN(d1) && !Number.isNaN(n2) && !Number.isNaN(d2) && d1 !== 0 && d2 !== 0;

  let result: { num: number; den: number } | null = null;
  let error = "";

  if (valid) {
    if (op === "+") result = simplify(n1 * d2 + n2 * d1, d1 * d2);
    else if (op === "-") result = simplify(n1 * d2 - n2 * d1, d1 * d2);
    else if (op === "×") result = simplify(n1 * n2, d1 * d2);
    else {
      if (n2 === 0) error = "Cannot divide by a fraction equal to zero.";
      else result = simplify(n1 * d2, d1 * n2);
    }
  }

  const decimal = result ? Math.round((result.num / result.den) * 10000) / 10000 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Input
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            type="number"
            inputMode="numeric"
            className="w-16 text-center"
            placeholder="1"
          />
          <div className="h-px w-16 bg-foreground" />
          <Input
            value={den1}
            onChange={(e) => setDen1(e.target.value)}
            type="number"
            inputMode="numeric"
            className="w-16 text-center"
            placeholder="2"
          />
        </div>

        <div className="flex gap-1 pb-6">
          {(["+", "-", "×", "÷"] as Op[]).map((o) => (
            <Button
              key={o}
              type="button"
              size="icon-sm"
              variant={op === o ? "default" : "outline"}
              onClick={() => setOp(o)}
            >
              {o}
            </Button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          <Input
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            type="number"
            inputMode="numeric"
            className="w-16 text-center"
            placeholder="1"
          />
          <div className="h-px w-16 bg-foreground" />
          <Input
            value={den2}
            onChange={(e) => setDen2(e.target.value)}
            type="number"
            inputMode="numeric"
            className="w-16 text-center"
            placeholder="3"
          />
        </div>

        <p className="pb-6 text-2xl text-muted-foreground">=</p>

        <div className="flex flex-col items-center gap-1 pb-1">
          {result ? (
            <>
              <p className="text-2xl font-semibold tabular-nums">{result.num}</p>
              {result.den !== 1 && (
                <>
                  <div className="h-px w-full bg-foreground" />
                  <p className="text-2xl font-semibold tabular-nums">{result.den}</p>
                </>
              )}
            </>
          ) : (
            <p className="text-2xl text-muted-foreground">?</p>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}

      {decimal !== null && (
        <p className="mt-4 text-center text-sm text-muted-foreground">= {decimal} as a decimal</p>
      )}
    </div>
  );
}
