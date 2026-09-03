"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Method = "straight" | "declining";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

interface Row {
  year: number;
  depreciation: number;
  bookValue: number;
}

export function DepreciationCalculator() {
  const [cost, setCost] = React.useState("");
  const [salvage, setSalvage] = React.useState("0");
  const [life, setLife] = React.useState("");
  const [method, setMethod] = React.useState<Method>("straight");

  const numCost = parseFloat(cost);
  const numSalvage = parseFloat(salvage) || 0;
  const numLife = parseInt(life, 10);

  const valid =
    cost !== "" &&
    life !== "" &&
    !Number.isNaN(numCost) &&
    !Number.isNaN(numLife) &&
    numCost > 0 &&
    numLife > 0 &&
    numSalvage < numCost;

  const schedule = React.useMemo(() => {
    if (!valid) return null;
    const rows: Row[] = [];
    let bookValue = numCost;

    if (method === "straight") {
      const annual = (numCost - numSalvage) / numLife;
      for (let year = 1; year <= numLife; year++) {
        bookValue = round2(Math.max(numSalvage, bookValue - annual));
        rows.push({ year, depreciation: round2(annual), bookValue });
      }
    } else {
      const rate = 2 / numLife;
      for (let year = 1; year <= numLife; year++) {
        let dep = bookValue * rate;
        if (bookValue - dep < numSalvage) dep = bookValue - numSalvage;
        bookValue = round2(bookValue - dep);
        rows.push({ year, depreciation: round2(dep), bookValue });
      }
    }

    const totalDepreciation = round2(rows.reduce((sum, r) => sum + r.depreciation, 0));
    return { rows, totalDepreciation };
  }, [valid, method, numCost, numSalvage, numLife]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={method === "straight" ? "default" : "outline"}
          onClick={() => setMethod("straight")}
        >
          Straight-line
        </Button>
        <Button
          type="button"
          size="sm"
          variant={method === "declining" ? "default" : "outline"}
          onClick={() => setMethod("declining")}
        >
          Double-declining balance
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="dep-cost" className="text-sm text-muted-foreground">
            Asset cost
          </Label>
          <Input
            id="dep-cost"
            type="number"
            inputMode="decimal"
            min={0}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="20000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="dep-salvage" className="text-sm text-muted-foreground">
            Salvage value
          </Label>
          <Input
            id="dep-salvage"
            type="number"
            inputMode="decimal"
            min={0}
            value={salvage}
            onChange={(e) => setSalvage(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="dep-life" className="text-sm text-muted-foreground">
            Useful life (years)
          </Label>
          <Input
            id="dep-life"
            type="number"
            inputMode="numeric"
            min={1}
            value={life}
            onChange={(e) => setLife(e.target.value)}
            placeholder="5"
            className="mt-1.5"
          />
        </div>
      </div>

      {schedule && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{schedule.totalDepreciation}</p>
            <p className="mt-1 text-sm text-muted-foreground">total depreciation over useful life</p>
          </div>
          <StatBar items={[{ label: "years", value: schedule.rows.length }]} />

          <div className="mt-4 max-h-80 overflow-y-auto overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Year</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Depreciation</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Book value</th>
                </tr>
              </thead>
              <tbody>
                {schedule.rows.map((row) => (
                  <tr key={row.year} className="border-t">
                    <td className="px-3 py-1.5 tabular-nums">{row.year}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.depreciation}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.bookValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
