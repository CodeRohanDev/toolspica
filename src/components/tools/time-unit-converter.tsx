"use client";

import { UnitConverter } from "@/components/tools/unit-converter";

const UNITS = [
  { id: "ms", label: "Milliseconds (ms)", toBase: 0.001 },
  { id: "s", label: "Seconds (s)", toBase: 1 },
  { id: "min", label: "Minutes (min)", toBase: 60 },
  { id: "hr", label: "Hours (hr)", toBase: 3600 },
  { id: "day", label: "Days", toBase: 86400 },
  { id: "week", label: "Weeks", toBase: 604800 },
  { id: "month", label: "Months (avg)", toBase: 2629800 },
  { id: "year", label: "Years (365.25 days)", toBase: 31557600 },
];

export function TimeUnitConverter() {
  return <UnitConverter units={UNITS} defaultFromId="hr" defaultToId="min" decimals={4} />;
}
