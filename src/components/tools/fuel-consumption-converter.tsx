"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UnitId = "mpg_us" | "mpg_uk" | "kml" | "l100km";

const UNITS: { id: UnitId; label: string }[] = [
  { id: "mpg_us", label: "Miles per gallon (US)" },
  { id: "mpg_uk", label: "Miles per gallon (UK)" },
  { id: "kml", label: "Kilometers per liter" },
  { id: "l100km", label: "Liters per 100 km" },
];

const MPG_US_PER_KML = 2.3521458;
const MPG_UK_PER_KML = 2.8248094;

function toKmL(value: number, unit: UnitId): number {
  switch (unit) {
    case "kml":
      return value;
    case "mpg_us":
      return value / MPG_US_PER_KML;
    case "mpg_uk":
      return value / MPG_UK_PER_KML;
    case "l100km":
      return 100 / value;
  }
}

function fromKmL(kml: number, unit: UnitId): number {
  switch (unit) {
    case "kml":
      return kml;
    case "mpg_us":
      return kml * MPG_US_PER_KML;
    case "mpg_uk":
      return kml * MPG_UK_PER_KML;
    case "l100km":
      return 100 / kml;
  }
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function FuelConsumptionConverter() {
  const [value, setValue] = React.useState("30");
  const [fromUnit, setFromUnit] = React.useState<UnitId>("mpg_us");

  const numValue = parseFloat(value);
  const valid = value !== "" && !Number.isNaN(numValue) && numValue > 0;
  const kml = valid ? toKmL(numValue, fromUnit) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="fc-value" className="text-sm text-muted-foreground">
            Fuel efficiency value
          </Label>
          <Input
            id="fc-value"
            type="number"
            inputMode="decimal"
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Unit</Label>
          <Select value={fromUnit} onValueChange={(v) => v && setFromUnit(v as UnitId)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {kml !== null && (
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {UNITS.filter((u) => u.id !== fromUnit).map((u) => (
            <div key={u.id} className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-xl font-semibold tabular-nums">{round2(fromKmL(kml, u.id))}</p>
              <p className="mt-1 text-xs text-muted-foreground">{u.label}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Note: liters per 100km is an inverse relationship to the other units — a lower L/100km
        value means better efficiency, unlike MPG or km/L where higher is better.
      </p>
    </div>
  );
}
