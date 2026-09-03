"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const VALUES: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function numberToRoman(num: number): string {
  let remaining = num;
  let result = "";
  for (const [value, symbol] of VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function romanToNumber(roman: string): number | null {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const clean = roman.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(clean)) return null;

  let total = 0;
  for (let i = 0; i < clean.length; i++) {
    const current = map[clean[i]];
    const next = map[clean[i + 1]];
    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }
  if (numberToRoman(total) !== clean) return null;
  return total;
}

type Mode = "toRoman" | "toNumber";

export function RomanNumeralConverter() {
  const [mode, setMode] = React.useState<Mode>("toRoman");
  const [numberInput, setNumberInput] = React.useState("");
  const [romanInput, setRomanInput] = React.useState("");

  const num = parseInt(numberInput, 10);
  const romanResult =
    mode === "toRoman" && numberInput !== "" && !Number.isNaN(num) && num >= 1 && num <= 3999
      ? numberToRoman(num)
      : null;

  const numberResult = mode === "toNumber" && romanInput !== "" ? romanToNumber(romanInput) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "toRoman" ? "default" : "outline"}
          onClick={() => setMode("toRoman")}
        >
          Number → Roman
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "toNumber" ? "default" : "outline"}
          onClick={() => setMode("toNumber")}
        >
          Roman → Number
        </Button>
      </div>

      {mode === "toRoman" ? (
        <div className="mt-4">
          <Label htmlFor="roman-num-input" className="text-sm text-muted-foreground">
            Number (1-3999)
          </Label>
          <Input
            id="roman-num-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={3999}
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="1994"
            className="mt-1.5 max-w-xs"
          />
          {numberInput !== "" && !romanResult && (
            <p className="mt-2 text-sm text-destructive">
              Enter a whole number between 1 and 3999 (standard Roman numerals don&apos;t support 0 or negative numbers).
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <Label htmlFor="roman-text-input" className="text-sm text-muted-foreground">
            Roman numeral
          </Label>
          <Input
            id="roman-text-input"
            value={romanInput}
            onChange={(e) => setRomanInput(e.target.value)}
            placeholder="MCMXCIV"
            className="mt-1.5 max-w-xs uppercase"
          />
          {romanInput !== "" && numberResult === null && (
            <p className="mt-2 text-sm text-destructive">
              Not a valid Roman numeral.
            </p>
          )}
        </div>
      )}

      {(romanResult || numberResult !== null) && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">
            {mode === "toRoman" ? romanResult : numberResult}
          </p>
        </div>
      )}
    </div>
  );
}
