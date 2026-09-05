"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// All volumes normalized to milliliters
const VOLUME_UNITS: Record<string, number> = {
  "cup": 236.588,
  "tablespoon": 14.7868,
  "teaspoon": 4.92892,
  "fluid ounce": 29.5735,
  "milliliter": 1,
  "liter": 1000,
};

// grams per cup, for common baking ingredients
const INGREDIENT_DENSITY: Record<string, number> = {
  "Water": 236.588,
  "All-purpose flour": 120,
  "Granulated sugar": 200,
  "Butter": 227,
  "Brown sugar (packed)": 220,
  "Milk": 244,
};

export function IngredientWeightConverter() {
  const [amount, setAmount] = React.useState(1);
  const [unit, setUnit] = React.useState("cup");
  const [ingredient, setIngredient] = React.useState("All-purpose flour");

  const ml = amount * VOLUME_UNITS[unit];
  const grams = (ml / VOLUME_UNITS.cup) * INGREDIENT_DENSITY[ingredient];
  const ounces = grams / 28.3495;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Amount</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Volume unit</Label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {Object.keys(VOLUME_UNITS).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <Label className="mt-3 block text-xs text-muted-foreground">Ingredient</Label>
      <select value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="mt-1.5 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
        {Object.keys(INGREDIENT_DENSITY).map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Weight in grams</p>
          <p className="text-xl font-semibold">{grams.toFixed(0)} g</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Weight in ounces</p>
          <p className="text-xl font-semibold">{ounces.toFixed(2)} oz</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {amount} {unit}{amount === 1 ? "" : "s"} of {ingredient.toLowerCase()} ≈ {grams.toFixed(0)}g. Weight
        conversions are approximate — actual weight varies with how ingredients are packed or sifted.
      </p>
    </div>
  );
}
