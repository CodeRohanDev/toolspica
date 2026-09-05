"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function FuelEconomyCalculator() {
  const [distance, setDistance] = React.useState(300);
  const [fuelUsed, setFuelUsed] = React.useState(10);
  const [unit, setUnit] = React.useState<"miles-gallons" | "km-liters">("miles-gallons");
  const [fuelPrice, setFuelPrice] = React.useState(3.5);

  const mpg = fuelUsed > 0 ? distance / fuelUsed : 0;
  const l100km = fuelUsed > 0 ? (fuelUsed / distance) * 100 : 0;
  const costPerDistance = fuelUsed > 0 ? (fuelUsed * fuelPrice) / distance : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <button
          onClick={() => setUnit("miles-gallons")}
          className={`rounded-md border px-3 py-1.5 text-sm ${unit === "miles-gallons" ? "bg-primary text-primary-foreground" : ""}`}
        >
          Miles / Gallons
        </button>
        <button
          onClick={() => setUnit("km-liters")}
          className={`rounded-md border px-3 py-1.5 text-sm ${unit === "km-liters" ? "bg-primary text-primary-foreground" : ""}`}
        >
          Kilometers / Liters
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Distance traveled ({unit === "miles-gallons" ? "miles" : "km"})</Label>
          <Input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Fuel used ({unit === "miles-gallons" ? "gallons" : "liters"})</Label>
          <Input type="number" value={fuelUsed} onChange={(e) => setFuelUsed(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <Label className="mt-3 block text-xs text-muted-foreground">Fuel price (per {unit === "miles-gallons" ? "gallon" : "liter"})</Label>
      <Input type="number" step={0.01} value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className="mt-1" />

      <StatBar
        items={
          unit === "miles-gallons"
            ? [
                { label: "MPG", value: mpg.toFixed(1) },
                { label: "cost per mile", value: `$${costPerDistance.toFixed(3)}` },
              ]
            : [
                { label: "L/100km", value: l100km.toFixed(1) },
                { label: "cost per km", value: `$${costPerDistance.toFixed(3)}` },
              ]
        }
      />
    </div>
  );
}
