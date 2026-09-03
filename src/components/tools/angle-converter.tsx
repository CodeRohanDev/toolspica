"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "deg", label: "Degrees (°)", toBase: 1 },
  { id: "rad", label: "Radians (rad)", toBase: 57.29577951308232 },
  { id: "grad", label: "Gradians (grad)", toBase: 0.9 },
  { id: "arcmin", label: "Arcminutes (′)", toBase: 0.0166666667 },
  { id: "arcsec", label: "Arcseconds (″)", toBase: 0.0002777778 },
  { id: "turn", label: "Turns (full revolution)", toBase: 360 },
];

export function AngleConverter() {
  return <UnitConverter units={UNITS} defaultFromId="deg" defaultToId="rad" decimals={6} />;
}
