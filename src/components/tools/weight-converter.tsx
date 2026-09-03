"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "mg", label: "Milligrams (mg)", toBase: 0.000001 },
  { id: "g", label: "Grams (g)", toBase: 0.001 },
  { id: "kg", label: "Kilograms (kg)", toBase: 1 },
  { id: "t", label: "Metric tons (t)", toBase: 1000 },
  { id: "oz", label: "Ounces (oz)", toBase: 0.0283495231 },
  { id: "lb", label: "Pounds (lb)", toBase: 0.45359237 },
  { id: "st", label: "Stone (st)", toBase: 6.35029318 },
];

export function WeightConverter() {
  return <UnitConverter units={UNITS} defaultFromId="kg" defaultToId="lb" decimals={4} />;
}
