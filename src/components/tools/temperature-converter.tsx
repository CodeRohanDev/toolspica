"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "c" | "f" | "k";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function toCelsius(value: number, unit: Unit) {
  if (unit === "c") return value;
  if (unit === "f") return ((value - 32) * 5) / 9;
  return value - 273.15;
}

function fromCelsius(celsius: number, unit: Unit) {
  if (unit === "c") return celsius;
  if (unit === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

const UNIT_LABELS: Record<Unit, string> = { c: "Celsius (°C)", f: "Fahrenheit (°F)", k: "Kelvin (K)" };

export function TemperatureConverter() {
  const [value, setValue] = React.useState("0");
  const [unit, setUnit] = React.useState<Unit>("c");

  const numValue = parseFloat(value);
  const valid = value !== "" && !Number.isNaN(numValue) && (unit !== "k" || numValue >= 0);
  const celsius = valid ? toCelsius(numValue, unit) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="temp-value" className="text-sm text-muted-foreground">
            Temperature
          </Label>
          <Input
            id="temp-value"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Unit</Label>
          <div className="mt-1.5 flex gap-1.5">
            {(Object.keys(UNIT_LABELS) as Unit[]).map((u) => (
              <Button
                key={u}
                type="button"
                size="sm"
                variant={unit === u ? "default" : "outline"}
                onClick={() => setUnit(u)}
                className="flex-1"
              >
                {u.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {unit === "k" && numValue < 0 && (
        <p className="mt-3 text-sm text-destructive">Kelvin cannot be negative (0 K is absolute zero).</p>
      )}

      {celsius !== null && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {(Object.keys(UNIT_LABELS) as Unit[]).map((u) => (
            <div key={u} className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">
                {round2(fromCelsius(celsius, u))}
                {u === "k" ? " K" : `°${u.toUpperCase()}`}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{UNIT_LABELS[u]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
