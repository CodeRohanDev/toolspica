"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function CarLoanCalculator() {
  const [price, setPrice] = React.useState(30000);
  const [downPayment, setDownPayment] = React.useState(3000);
  const [tradeIn, setTradeIn] = React.useState(0);
  const [apr, setApr] = React.useState(6.5);
  const [termMonths, setTermMonths] = React.useState(60);

  const principal = Math.max(price - downPayment - tradeIn, 0);
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / termMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalPaid = monthlyPayment * termMonths;
  const totalInterest = totalPaid - principal;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Vehicle price ($)</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Down payment ($)</Label>
          <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Trade-in value ($)</Label>
          <Input type="number" value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">APR (%)</Label>
          <Input type="number" step={0.1} value={apr} onChange={(e) => setApr(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <Label className="mt-3 block text-sm text-muted-foreground">Loan term: {termMonths} months</Label>
      <input type="range" min={12} max={84} step={6} value={termMonths} onChange={(e) => setTermMonths(Number(e.target.value))} className="mt-2 w-full" />

      <StatBar
        items={[
          { label: "loan amount", value: `$${principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
          { label: "monthly payment", value: `$${monthlyPayment.toFixed(2)}` },
          { label: "total interest", value: `$${totalInterest.toFixed(0)}` },
        ]}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Estimate only — actual loan terms, fees, and taxes vary by lender and state.
      </p>
    </div>
  );
}
