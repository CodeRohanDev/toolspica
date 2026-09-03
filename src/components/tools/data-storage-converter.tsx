"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "bit", label: "Bits", toBase: 0.125 },
  { id: "byte", label: "Bytes (B)", toBase: 1 },
  { id: "kb", label: "Kilobytes (KB)", toBase: 1024 },
  { id: "mb", label: "Megabytes (MB)", toBase: 1024 ** 2 },
  { id: "gb", label: "Gigabytes (GB)", toBase: 1024 ** 3 },
  { id: "tb", label: "Terabytes (TB)", toBase: 1024 ** 4 },
  { id: "pb", label: "Petabytes (PB)", toBase: 1024 ** 5 },
];

export function DataStorageConverter() {
  return <UnitConverter units={UNITS} defaultFromId="gb" defaultToId="mb" decimals={4} />;
}
