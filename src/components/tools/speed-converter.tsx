"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "mps", label: "Meters/second (m/s)", toBase: 1 },
  { id: "kmh", label: "Kilometers/hour (km/h)", toBase: 0.2777777778 },
  { id: "mph", label: "Miles/hour (mph)", toBase: 0.44704 },
  { id: "knot", label: "Knots (kn)", toBase: 0.5144444444 },
  { id: "fts", label: "Feet/second (ft/s)", toBase: 0.3048 },
];

export function SpeedConverter() {
  return <UnitConverter units={UNITS} defaultFromId="kmh" defaultToId="mph" decimals={4} />;
}
