"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "w", label: "Watts (W)", toBase: 1 },
  { id: "kw", label: "Kilowatts (kW)", toBase: 1000 },
  { id: "mw", label: "Megawatts (MW)", toBase: 1000000 },
  { id: "hp", label: "Horsepower (hp)", toBase: 745.699872 },
  { id: "btuh", label: "BTU/hour", toBase: 0.29307107 },
];

export function PowerConverter() {
  return <UnitConverter units={UNITS} defaultFromId="kw" defaultToId="hp" decimals={4} />;
}
