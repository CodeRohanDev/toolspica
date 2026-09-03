"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Mode = "price-from-markup" | "markup-from-price";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function MarkupCalculator() {
  const [mode, setMode] = React.useState<Mode>("price-from-markup");
  const [cost, setCost] = React.useState("");
  const [markupPercent, setMarkupPercent] = React.useState("");
  const [price, setPrice] = React.useState("");

  const numCost = parseFloat(cost);
  const numMarkup = parseFloat(markupPercent);
  const numPrice = parseFloat(price);

  let result: { price: number; markup: number; profit: number; margin: number } | null = null;

  if (mode === "price-from-markup") {
    const valid = cost !== "" && markupPercent !== "" && !Number.isNaN(numCost) && !Number.isNaN(numMarkup) && numCost >= 0;
    if (valid) {
      const profit = numCost * (numMarkup / 100);
      const sellingPrice = numCost + profit;
      result = {
        price: round2(sellingPrice),
        markup: round2(numMarkup),
        profit: round2(profit),
        margin: sellingPrice > 0 ? round2((profit / sellingPrice) * 100) : 0,
      };
    }
  } else {
    const valid = cost !== "" && price !== "" && !Number.isNaN(numCost) && !Number.isNaN(numPrice) && numCost > 0;
    if (valid) {
      const profit = numPrice - numCost;
      result = {
        price: round2(numPrice),
        markup: round2((profit / numCost) * 100),
        profit: round2(profit),
        margin: numPrice > 0 ? round2((profit / numPrice) * 100) : 0,
      };
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "price-from-markup" ? "default" : "outline"}
          onClick={() => setMode("price-from-markup")}
        >
          Cost + markup % → price
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "markup-from-price" ? "default" : "outline"}
          onClick={() => setMode("markup-from-price")}
        >
          Cost + price → markup %
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="markup-cost" className="text-sm text-muted-foreground">
            Cost
          </Label>
          <Input
            id="markup-cost"
            type="number"
            inputMode="decimal"
            min={0}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="60"
            className="mt-1.5"
          />
        </div>
        {mode === "price-from-markup" ? (
          <div>
            <Label htmlFor="markup-percent" className="text-sm text-muted-foreground">
              Markup %
            </Label>
            <Input
              id="markup-percent"
              type="number"
              inputMode="decimal"
              min={0}
              value={markupPercent}
              onChange={(e) => setMarkupPercent(e.target.value)}
              placeholder="50"
              className="mt-1.5"
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="markup-price" className="text-sm text-muted-foreground">
              Selling price
            </Label>
            <Input
              id="markup-price"
              type="number"
              inputMode="decimal"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="90"
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">
              {mode === "price-from-markup" ? result.price : `${result.markup}%`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "price-from-markup" ? "selling price" : "markup percentage"}
            </p>
          </div>
          <StatBar
            items={[
              { label: "profit", value: result.profit },
              { label: "margin", value: `${result.margin}%` },
            ]}
          />
        </>
      )}
    </div>
  );
}
