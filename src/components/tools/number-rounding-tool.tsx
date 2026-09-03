"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number): string {
  return Object.is(n, -0) ? "0" : String(n);
}

function roundToDecimals(n: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function roundToSignificantFigures(n: number, sig: number): number {
  if (n === 0) return 0;
  const magnitude = Math.floor(Math.log10(Math.abs(n))) + 1;
  const factor = 10 ** (sig - magnitude);
  return Math.round(n * factor) / factor;
}

function roundToNearestMultiple(n: number, multiple: number): number {
  if (multiple === 0) return n;
  return Math.round(n / multiple) * multiple;
}

export function NumberRoundingTool() {
  const [input, setInput] = React.useState("3.14159265");
  const [decimals, setDecimals] = React.useState("2");
  const [sigFigs, setSigFigs] = React.useState("3");
  const [multiple, setMultiple] = React.useState("5");

  const n = parseFloat(input);
  const valid = Number.isFinite(n);
  const decimalsNum = parseInt(decimals, 10) || 0;
  const sigFigsNum = parseInt(sigFigs, 10) || 1;
  const multipleNum = parseFloat(multiple) || 1;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="round-input" className="text-sm text-muted-foreground">
        Number
      </Label>
      <Input
        id="round-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1.5 w-48 font-mono"
      />

      {!valid && input.trim() && (
        <p className="mt-3 text-sm text-destructive">Enter a valid number.</p>
      )}

      {valid && (
        <div className="mt-5 space-y-4">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Round / floor / ceiling to nearest integer
            </p>
            <div className="mt-1.5 flex gap-4 font-mono text-sm">
              <span>round: {fmt(Math.round(n))}</span>
              <span>floor: {fmt(Math.floor(n))}</span>
              <span>ceil: {fmt(Math.ceil(n))}</span>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Round to decimal places
              </p>
              <Input
                type="number"
                value={decimals}
                onChange={(e) => setDecimals(e.target.value)}
                className="h-7 w-16 font-mono text-xs"
                min={0}
                max={15}
              />
            </div>
            <p className="mt-1.5 font-mono text-sm">{fmt(roundToDecimals(n, decimalsNum))}</p>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Round to significant figures
              </p>
              <Input
                type="number"
                value={sigFigs}
                onChange={(e) => setSigFigs(e.target.value)}
                className="h-7 w-16 font-mono text-xs"
                min={1}
                max={15}
              />
            </div>
            <p className="mt-1.5 font-mono text-sm">
              {fmt(roundToSignificantFigures(n, sigFigsNum))}
            </p>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Round to nearest multiple
              </p>
              <Input
                type="number"
                value={multiple}
                onChange={(e) => setMultiple(e.target.value)}
                className="h-7 w-16 font-mono text-xs"
              />
            </div>
            <p className="mt-1.5 font-mono text-sm">
              {fmt(roundToNearestMultiple(n, multipleNum))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
