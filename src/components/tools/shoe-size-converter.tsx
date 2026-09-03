"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "men" | "women";

const MEN_CHART = [
  { us: 6, uk: 5.5, eu: 39 },
  { us: 6.5, uk: 6, eu: 39.5 },
  { us: 7, uk: 6.5, eu: 40 },
  { us: 7.5, uk: 7, eu: 40.5 },
  { us: 8, uk: 7.5, eu: 41 },
  { us: 8.5, uk: 8, eu: 42 },
  { us: 9, uk: 8.5, eu: 42.5 },
  { us: 9.5, uk: 9, eu: 43 },
  { us: 10, uk: 9.5, eu: 44 },
  { us: 10.5, uk: 10, eu: 44.5 },
  { us: 11, uk: 10.5, eu: 45 },
  { us: 11.5, uk: 11, eu: 45.5 },
  { us: 12, uk: 11.5, eu: 46 },
  { us: 13, uk: 12.5, eu: 47 },
  { us: 14, uk: 13.5, eu: 48 },
];

const WOMEN_CHART = [
  { us: 5, uk: 3, eu: 35.5 },
  { us: 5.5, uk: 3.5, eu: 36 },
  { us: 6, uk: 4, eu: 36.5 },
  { us: 6.5, uk: 4.5, eu: 37.5 },
  { us: 7, uk: 5, eu: 38 },
  { us: 7.5, uk: 5.5, eu: 38.5 },
  { us: 8, uk: 6, eu: 39 },
  { us: 8.5, uk: 6.5, eu: 39.5 },
  { us: 9, uk: 7, eu: 40.5 },
  { us: 9.5, uk: 7.5, eu: 41 },
  { us: 10, uk: 8, eu: 42 },
  { us: 11, uk: 9, eu: 43 },
];

export function ShoeSizeConverter() {
  const [category, setCategory] = React.useState<Category>("men");
  const chart = category === "men" ? MEN_CHART : WOMEN_CHART;
  const [usSize, setUsSize] = React.useState(String(chart[4].us));

  const row = chart.find((r) => String(r.us) === usSize) ?? chart[0];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={category === "men" ? "default" : "outline"}
          onClick={() => {
            setCategory("men");
            setUsSize(String(MEN_CHART[4].us));
          }}
        >
          Men
        </Button>
        <Button
          type="button"
          size="sm"
          variant={category === "women" ? "default" : "outline"}
          onClick={() => {
            setCategory("women");
            setUsSize(String(WOMEN_CHART[4].us));
          }}
        >
          Women
        </Button>
      </div>

      <div className="mt-4 max-w-xs">
        <Select value={usSize} onValueChange={(v) => v && setUsSize(v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {chart.map((r) => (
              <SelectItem key={r.us} value={String(r.us)}>
                US {r.us}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums">{row.us}</p>
          <p className="mt-1 text-xs text-muted-foreground">US</p>
        </div>
        <div className="rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums">{row.uk}</p>
          <p className="mt-1 text-xs text-muted-foreground">UK</p>
        </div>
        <div className="rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold tabular-nums">{row.eu}</p>
          <p className="mt-1 text-xs text-muted-foreground">EU</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Based on commonly published US/UK/EU size charts. Actual fit varies by brand and shoe
        style — always check a specific brand&apos;s own size chart when available.
      </p>
    </div>
  );
}
