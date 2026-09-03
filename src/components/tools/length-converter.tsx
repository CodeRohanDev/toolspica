"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "mm", label: "Millimeters (mm)", toBase: 0.001 },
  { id: "cm", label: "Centimeters (cm)", toBase: 0.01 },
  { id: "m", label: "Meters (m)", toBase: 1 },
  { id: "km", label: "Kilometers (km)", toBase: 1000 },
  { id: "in", label: "Inches (in)", toBase: 0.0254 },
  { id: "ft", label: "Feet (ft)", toBase: 0.3048 },
  { id: "yd", label: "Yards (yd)", toBase: 0.9144 },
  { id: "mi", label: "Miles (mi)", toBase: 1609.344 },
];

export function LengthConverter() {
  return <UnitConverter units={UNITS} defaultFromId="m" defaultToId="ft" decimals={4} />;
}
