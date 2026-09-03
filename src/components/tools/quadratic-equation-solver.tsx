"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number): string {
  const rounded = Math.round(n * 1e9) / 1e9;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

interface QuadraticResult {
  discriminant: number;
  roots: { re: number; im: number }[];
}

function solve(a: number, b: number, c: number): QuadraticResult {
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    return {
      discriminant,
      roots: [
        { re: (-b + sqrtD) / (2 * a), im: 0 },
        { re: (-b - sqrtD) / (2 * a), im: 0 },
      ],
    };
  }
  if (discriminant === 0) {
    return { discriminant, roots: [{ re: -b / (2 * a), im: 0 }] };
  }
  const sqrtD = Math.sqrt(-discriminant);
  return {
    discriminant,
    roots: [
      { re: -b / (2 * a), im: sqrtD / (2 * a) },
      { re: -b / (2 * a), im: -sqrtD / (2 * a) },
    ],
  };
}

export function QuadraticEquationSolver() {
  const [a, setA] = React.useState("1");
  const [b, setB] = React.useState("-3");
  const [c, setC] = React.useState("2");

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);
  const valid = Number.isFinite(aNum) && Number.isFinite(bNum) && Number.isFinite(cNum) && aNum !== 0;
  const result = React.useMemo(() => (valid ? solve(aNum, bNum, cNum) : null), [valid, aNum, bNum, cNum]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm text-muted-foreground">
        ax² + bx + c = 0
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <div>
          <Label htmlFor="quad-a" className="text-xs text-muted-foreground">a</Label>
          <Input id="quad-a" value={a} onChange={(e) => setA(e.target.value)} className="mt-1 w-20 font-mono" />
        </div>
        <div>
          <Label htmlFor="quad-b" className="text-xs text-muted-foreground">b</Label>
          <Input id="quad-b" value={b} onChange={(e) => setB(e.target.value)} className="mt-1 w-20 font-mono" />
        </div>
        <div>
          <Label htmlFor="quad-c" className="text-xs text-muted-foreground">c</Label>
          <Input id="quad-c" value={c} onChange={(e) => setC(e.target.value)} className="mt-1 w-20 font-mono" />
        </div>
      </div>

      {!valid && (
        <p className="mt-3 text-sm text-destructive">
          Enter numeric coefficients, with a not equal to 0.
        </p>
      )}

      {result && (
        <div className="mt-5">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Discriminant (b² − 4ac)
            </p>
            <p className="mt-1 font-mono text-sm font-semibold">{fmt(result.discriminant)}</p>
          </div>
          <div className="mt-3 rounded-lg bg-brand-soft p-3 text-sm font-semibold">
            {result.roots.length === 2 && result.roots[0].im === 0 && (
              <>x = {fmt(result.roots[0].re)} or x = {fmt(result.roots[1].re)}</>
            )}
            {result.roots.length === 1 && <>x = {fmt(result.roots[0].re)} (repeated root)</>}
            {result.roots.length === 2 && result.roots[0].im !== 0 && (
              <>
                x = {fmt(result.roots[0].re)} + {fmt(Math.abs(result.roots[0].im))}i or x ={" "}
                {fmt(result.roots[1].re)} − {fmt(Math.abs(result.roots[1].im))}i
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
