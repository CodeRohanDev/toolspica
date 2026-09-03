"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "pa", label: "Pascals (Pa)", toBase: 1 },
  { id: "kpa", label: "Kilopascals (kPa)", toBase: 1000 },
  { id: "bar", label: "Bar", toBase: 100000 },
  { id: "psi", label: "PSI", toBase: 6894.757293168 },
  { id: "atm", label: "Atmospheres (atm)", toBase: 101325 },
  { id: "mmhg", label: "mmHg", toBase: 133.322387415 },
  { id: "torr", label: "Torr", toBase: 133.322368421 },
];

export function PressureConverter() {
  return <UnitConverter units={UNITS} defaultFromId="bar" defaultToId="psi" decimals={4} />;
}
