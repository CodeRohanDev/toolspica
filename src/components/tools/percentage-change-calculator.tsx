"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number): string {
  const rounded = Math.round(n * 1e6) / 1e6;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

export function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = React.useState("80");
  const [newValue, setNewValue] = React.useState("100");

  const oldNum = parseFloat(oldValue);
  const newNum = parseFloat(newValue);
  const valid = Number.isFinite(oldNum) && Number.isFinite(newNum) && oldNum !== 0;

  const change = valid ? ((newNum - oldNum) / Math.abs(oldNum)) * 100 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="pct-old" className="text-sm text-muted-foreground">
            Original value
          </Label>
          <Input
            id="pct-old"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            className="mt-1.5 w-32 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="pct-new" className="text-sm text-muted-foreground">
            New value
          </Label>
          <Input
            id="pct-new"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="mt-1.5 w-32 font-mono"
          />
        </div>
      </div>

      {!valid && (oldValue.trim() || newValue.trim()) && (
        <p className="mt-3 text-sm text-destructive">
          Enter valid numbers, with the original value not equal to 0.
        </p>
      )}

      {change !== null && (
        <div
          className={`mt-5 rounded-lg p-4 text-center ${
            change >= 0 ? "bg-brand-soft" : "bg-destructive/10"
          }`}
        >
          <p className="text-3xl font-bold">
            {change >= 0 ? "+" : ""}
            {fmt(change)}%
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {change >= 0 ? "Increase" : "Decrease"} from {oldValue} to {newValue}
          </p>
        </div>
      )}
    </div>
  );
}
