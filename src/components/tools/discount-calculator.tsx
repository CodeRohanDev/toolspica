"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function DiscountCalculator() {
  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [tax, setTax] = React.useState("");

  const numPrice = parseFloat(price);
  const numDiscount = parseFloat(discount);
  const numTax = tax === "" ? 0 : parseFloat(tax);

  const valid =
    price !== "" &&
    discount !== "" &&
    !Number.isNaN(numPrice) &&
    !Number.isNaN(numDiscount) &&
    !Number.isNaN(numTax) &&
    numPrice >= 0 &&
    numDiscount >= 0;

  let result: {
    amountSaved: number;
    priceAfterDiscount: number;
    taxAmount: number;
    finalPrice: number;
  } | null = null;

  if (valid) {
    const amountSaved = round2(numPrice * (numDiscount / 100));
    const priceAfterDiscount = round2(numPrice - amountSaved);
    const taxAmount = round2(priceAfterDiscount * (numTax / 100));
    const finalPrice = round2(priceAfterDiscount + taxAmount);
    result = { amountSaved, priceAfterDiscount, taxAmount, finalPrice };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="disc-price" className="text-sm text-muted-foreground">
            Original price
          </Label>
          <Input
            id="disc-price"
            type="number"
            inputMode="decimal"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="disc-percent" className="text-sm text-muted-foreground">
            Discount %
          </Label>
          <Input
            id="disc-percent"
            type="number"
            inputMode="decimal"
            min={0}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="disc-tax" className="text-sm text-muted-foreground">
            Sales tax % (optional)
          </Label>
          <Input
            id="disc-tax"
            type="number"
            inputMode="decimal"
            min={0}
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.finalPrice}</p>
            <p className="mt-1 text-sm text-muted-foreground">final price you pay</p>
          </div>
          <StatBar
            items={[
              { label: "amount saved", value: result.amountSaved },
              { label: "price after discount", value: result.priceAfterDiscount },
              { label: "tax added", value: result.taxAmount },
            ]}
          />
        </>
      )}
    </div>
  );
}
