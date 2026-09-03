"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "mm2", label: "Square millimeters (mm²)", toBase: 0.000001 },
  { id: "cm2", label: "Square centimeters (cm²)", toBase: 0.0001 },
  { id: "m2", label: "Square meters (m²)", toBase: 1 },
  { id: "km2", label: "Square kilometers (km²)", toBase: 1000000 },
  { id: "in2", label: "Square inches (in²)", toBase: 0.00064516 },
  { id: "ft2", label: "Square feet (ft²)", toBase: 0.09290304 },
  { id: "yd2", label: "Square yards (yd²)", toBase: 0.83612736 },
  { id: "acre", label: "Acres", toBase: 4046.8564224 },
  { id: "hectare", label: "Hectares (ha)", toBase: 10000 },
];

export function AreaConverter() {
  return <UnitConverter units={UNITS} defaultFromId="m2" defaultToId="ft2" decimals={4} />;
}
