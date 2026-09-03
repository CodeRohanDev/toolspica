"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function RatioCalculator() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);
  const numD = parseFloat(d);

  const simplified = React.useMemo(() => {
    if (a === "" || b === "" || Number.isNaN(numA) || Number.isNaN(numB) || numB === 0) return null;
    const divisor = gcd(numA, numB);
    return { a: numA / divisor, b: numB / divisor };
  }, [a, b, numA, numB]);

  const solveForD = c !== "" && !Number.isNaN(numC) && a !== "" && b !== "" && numA !== 0;
  const solvedD = solveForD ? Math.round(((numC * numB) / numA) * 10000) / 10000 : null;

  const solveForC = d !== "" && !Number.isNaN(numD) && a !== "" && b !== "" && numB !== 0;
  const solvedC = !solveForD && solveForC ? Math.round(((numD * numA) / numB) * 10000) / 10000 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Simplify a ratio</p>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          inputMode="decimal"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="4"
          className="w-20"
        />
        <span className="text-lg text-muted-foreground">:</span>
        <Input
          type="number"
          inputMode="decimal"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="8"
          className="w-20"
        />
        {simplified && (
          <span className="ml-3 text-lg font-semibold tabular-nums">
            → {simplified.a} : {simplified.b}
          </span>
        )}
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground">
        Find a missing value — A : B = C : D
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Input value={a || ""} readOnly disabled className="w-16 text-center" placeholder="A" />
        <span className="text-lg text-muted-foreground">:</span>
        <Input value={b || ""} readOnly disabled className="w-16 text-center" placeholder="B" />
        <span className="mx-1 text-lg text-muted-foreground">=</span>
        <Input
          type="number"
          inputMode="decimal"
          value={c}
          onChange={(e) => {
            setC(e.target.value);
            if (e.target.value !== "") setD("");
          }}
          placeholder="C"
          className="w-16 text-center"
        />
        <span className="text-lg text-muted-foreground">:</span>
        <Input
          type="number"
          inputMode="decimal"
          value={d}
          onChange={(e) => {
            setD(e.target.value);
            if (e.target.value !== "") setC("");
          }}
          placeholder="D"
          className="w-16 text-center"
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Uses A and B from the ratio above. Fill in C to solve for D, or D to solve for C.
      </p>

      {(solvedD !== null || solvedC !== null) && (
        <div className="mt-4 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums">
            {a} : {b} = {c || solvedC} : {d || solvedD}
          </p>
        </div>
      )}
    </div>
  );
}
