"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "j", label: "Joules (J)", toBase: 1 },
  { id: "kj", label: "Kilojoules (kJ)", toBase: 1000 },
  { id: "cal", label: "Calories (cal)", toBase: 4.184 },
  { id: "kcal", label: "Kilocalories (kcal)", toBase: 4184 },
  { id: "wh", label: "Watt-hours (Wh)", toBase: 3600 },
  { id: "kwh", label: "Kilowatt-hours (kWh)", toBase: 3600000 },
  { id: "btu", label: "BTU", toBase: 1055.05585262 },
];

export function EnergyConverter() {
  return <UnitConverter units={UNITS} defaultFromId="kcal" defaultToId="kj" decimals={4} />;
}
