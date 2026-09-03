"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "tsp", label: "Teaspoons (tsp)", toBase: 4.92892159375 },
  { id: "tbsp", label: "Tablespoons (tbsp)", toBase: 14.78676478125 },
  { id: "floz", label: "Fluid ounces (fl oz)", toBase: 29.5735295625 },
  { id: "cup", label: "Cups", toBase: 236.5882365 },
  { id: "pint", label: "Pints", toBase: 473.176473 },
  { id: "quart", label: "Quarts", toBase: 946.352946 },
  { id: "gallon", label: "Gallons", toBase: 3785.411784 },
  { id: "ml", label: "Milliliters (ml)", toBase: 1 },
  { id: "liter", label: "Liters (l)", toBase: 1000 },
];

export function CookingMeasurementConverter() {
  return <UnitConverter units={UNITS} defaultFromId="cup" defaultToId="ml" decimals={2} />;
}
