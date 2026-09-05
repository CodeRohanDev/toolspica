"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GAS_MARKS: { mark: number; celsius: number; fahrenheit: number }[] = [
  { mark: 1, celsius: 140, fahrenheit: 275 },
  { mark: 2, celsius: 150, fahrenheit: 300 },
  { mark: 3, celsius: 165, fahrenheit: 325 },
  { mark: 4, celsius: 180, fahrenheit: 350 },
  { mark: 5, celsius: 190, fahrenheit: 375 },
  { mark: 6, celsius: 200, fahrenheit: 400 },
  { mark: 7, celsius: 220, fahrenheit: 425 },
  { mark: 8, celsius: 230, fahrenheit: 450 },
  { mark: 9, celsius: 240, fahrenheit: 475 },
];

const OVEN_LABELS = ["Very cool", "Cool", "Warm", "Moderate", "Moderate", "Moderately hot", "Hot", "Hot", "Very hot"];

function nearestMarkIndex(celsius: number): number {
  let best = 0;
  let bestDiff = Infinity;
  GAS_MARKS.forEach((m, i) => {
    const diff = Math.abs(m.celsius - celsius);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  });
  return best;
}

export function OvenTemperatureConverter() {
  const [fahrenheit, setFahrenheit] = React.useState(350);

  const celsius = ((fahrenheit - 32) * 5) / 9;
  const markIndex = nearestMarkIndex(celsius);
  const mark = GAS_MARKS[markIndex];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Temperature (°F)</Label>
      <Input
        type="number"
        value={fahrenheit}
        onChange={(e) => setFahrenheit(Number(e.target.value))}
        className="mt-1.5"
      />

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Fahrenheit</p>
          <p className="text-xl font-semibold">{fahrenheit.toFixed(0)}°F</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Celsius</p>
          <p className="text-xl font-semibold">{celsius.toFixed(0)}°C</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Gas mark</p>
          <p className="text-xl font-semibold">{mark.mark}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Nearest UK gas mark {mark.mark} ({OVEN_LABELS[markIndex]}) ≈ {mark.celsius}°C / {mark.fahrenheit}°F.
      </p>

      <div className="mt-4 overflow-x-auto border-t pt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-2">Gas mark</th>
              <th className="pb-2">°F</th>
              <th className="pb-2">°C</th>
              <th className="pb-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {GAS_MARKS.map((m, i) => (
              <tr key={m.mark} className="border-t">
                <td className="py-1.5">{m.mark}</td>
                <td className="py-1.5">{m.fahrenheit}°F</td>
                <td className="py-1.5">{m.celsius}°C</td>
                <td className="py-1.5">{OVEN_LABELS[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
