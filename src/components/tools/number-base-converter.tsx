"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BASES = [
  { label: "Binary", base: 2, pattern: /^[01]*$/ },
  { label: "Octal", base: 8, pattern: /^[0-7]*$/ },
  { label: "Decimal", base: 10, pattern: /^[0-9]*$/ },
  { label: "Hexadecimal", base: 16, pattern: /^[0-9a-fA-F]*$/ },
];

export function NumberBaseConverter() {
  const [values, setValues] = React.useState({
    2: "",
    8: "",
    10: "",
    16: "",
  });

  function handleChange(base: number, raw: string) {
    const entry = BASES.find((b) => b.base === base)!;
    if (raw !== "" && !entry.pattern.test(raw)) return;

    if (raw === "") {
      setValues({ 2: "", 8: "", 10: "", 16: "" });
      return;
    }

    const decimal = parseInt(raw, base);
    if (Number.isNaN(decimal)) return;

    setValues({
      2: decimal.toString(2),
      8: decimal.toString(8),
      10: decimal.toString(10),
      16: decimal.toString(16).toUpperCase(),
    });
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {BASES.map(({ label, base }) => (
          <div key={base}>
            <Label htmlFor={`base-${base}`} className="text-sm text-muted-foreground">
              {label} (base {base})
            </Label>
            <Input
              id={`base-${base}`}
              value={values[base as keyof typeof values]}
              onChange={(e) => handleChange(base, e.target.value)}
              placeholder="0"
              className="mt-1.5 font-mono"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
