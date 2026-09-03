"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "ml", label: "Milliliters (ml)", toBase: 0.001 },
  { id: "l", label: "Liters (l)", toBase: 1 },
  { id: "m3", label: "Cubic meters (m³)", toBase: 1000 },
  { id: "us_gal", label: "US gallons (gal)", toBase: 3.785411784 },
  { id: "us_qt", label: "US quarts (qt)", toBase: 0.946352946 },
  { id: "us_pt", label: "US pints (pt)", toBase: 0.473176473 },
  { id: "us_cup", label: "US cups", toBase: 0.2365882365 },
  { id: "us_floz", label: "US fluid ounces (fl oz)", toBase: 0.0295735295625 },
  { id: "imp_gal", label: "Imperial gallons", toBase: 4.54609 },
];

export function VolumeConverter() {
  return <UnitConverter units={UNITS} defaultFromId="l" defaultToId="us_gal" decimals={4} />;
}
