"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EfficiencyUnit = "mpg" | "l100km" | "kml";

const UNITS: { id: EfficiencyUnit; label: string; distanceLabel: string; priceLabel: string }[] = [
  { id: "mpg", label: "Miles per gallon (MPG)", distanceLabel: "Distance (miles)", priceLabel: "Price per gallon" },
  { id: "l100km", label: "Liters per 100 km", distanceLabel: "Distance (km)", priceLabel: "Price per liter" },
  { id: "kml", label: "Kilometers per liter", distanceLabel: "Distance (km)", priceLabel: "Price per liter" },
];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function FuelCostCalculator() {
  const [unit, setUnit] = React.useState<EfficiencyUnit>("mpg");
  const [distance, setDistance] = React.useState("");
  const [efficiency, setEfficiency] = React.useState("");
  const [price, setPrice] = React.useState("");

  const d = parseFloat(distance);
  const e = parseFloat(efficiency);
  const p = parseFloat(price);
  const valid =
    distance !== "" &&
    efficiency !== "" &&
    price !== "" &&
    !Number.isNaN(d) &&
    !Number.isNaN(e) &&
    !Number.isNaN(p) &&
    d >= 0 &&
    e > 0 &&
    p >= 0;

  let result: { fuelNeeded: number; cost: number; fuelUnit: string } | null = null;
  if (valid) {
    if (unit === "mpg") {
      const gallons = d / e;
      result = { fuelNeeded: round2(gallons), cost: round2(gallons * p), fuelUnit: "gallons" };
    } else if (unit === "l100km") {
      const liters = d * (e / 100);
      result = { fuelNeeded: round2(liters), cost: round2(liters * p), fuelUnit: "liters" };
    } else {
      const liters = d / e;
      result = { fuelNeeded: round2(liters), cost: round2(liters * p), fuelUnit: "liters" };
    }
  }

  const current = UNITS.find((u) => u.id === unit)!;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label className="text-sm text-muted-foreground">Fuel efficiency unit</Label>
        <Select value={unit} onValueChange={(value) => value && setUnit(value as EfficiencyUnit)}>
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="fuel-distance" className="text-sm text-muted-foreground">
            {current.distanceLabel}
          </Label>
          <Input
            id="fuel-distance"
            type="number"
            inputMode="decimal"
            min={0}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fuel-efficiency" className="text-sm text-muted-foreground">
            {current.label}
          </Label>
          <Input
            id="fuel-efficiency"
            type="number"
            inputMode="decimal"
            min={0}
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fuel-price" className="text-sm text-muted-foreground">
            {current.priceLabel}
          </Label>
          <Input
            id="fuel-price"
            type="number"
            inputMode="decimal"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.cost}</p>
            <p className="mt-1 text-sm text-muted-foreground">total fuel cost</p>
          </div>
          <StatBar
            items={[{ label: `${result.fuelUnit} needed`, value: result.fuelNeeded }]}
          />
        </>
      )}
    </div>
  );
}
