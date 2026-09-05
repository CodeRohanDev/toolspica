"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Approximate typical depreciation curve for a new vehicle
const YEAR_ONE_DROP = 0.2;
const SUBSEQUENT_YEAR_DROP = 0.12;

function valueAtYear(price: number, year: number): number {
  if (year <= 0) return price;
  let value = price * (1 - YEAR_ONE_DROP);
  for (let y = 2; y <= year; y++) {
    value *= 1 - SUBSEQUENT_YEAR_DROP;
  }
  return value;
}

export function CarDepreciationEstimator() {
  const [price, setPrice] = React.useState(35000);
  const [years, setYears] = React.useState(5);

  const schedule = Array.from({ length: years + 1 }, (_, y) => ({
    year: y,
    value: valueAtYear(price, y),
  }));

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Purchase price ($)</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Years to project</Label>
          <Input type="number" min={1} max={15} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto border-t pt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-2">Year</th>
              <th className="pb-2">Estimated value</th>
              <th className="pb-2">Total depreciation</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.year} className="border-t">
                <td className="py-1.5">{row.year === 0 ? "New" : row.year}</td>
                <td className="py-1.5 font-medium">${row.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td className="py-1.5 text-muted-foreground">
                  -${(price - row.value).toLocaleString(undefined, { maximumFractionDigits: 0 })} ({(((price - row.value) / price) * 100).toFixed(0)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Based on typical industry depreciation curves (~20% in year one, ~12%/year after). Actual
        resale value depends on make, model, mileage, and condition.
      </p>
    </div>
  );
}
