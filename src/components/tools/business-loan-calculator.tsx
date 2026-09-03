"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function BusinessLoanCalculator() {
  const [principal, setPrincipal] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [termMonths, setTermMonths] = React.useState("");
  const [originationFee, setOriginationFee] = React.useState("0");

  const p = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const months = parseFloat(termMonths);
  const feePercent = parseFloat(originationFee) || 0;

  const valid =
    principal !== "" &&
    rate !== "" &&
    termMonths !== "" &&
    !Number.isNaN(p) &&
    !Number.isNaN(annualRate) &&
    !Number.isNaN(months) &&
    p > 0 &&
    annualRate >= 0 &&
    months > 0;

  let result: {
    monthlyPayment: number;
    totalInterest: number;
    totalRepayment: number;
    feeAmount: number;
    netFundsReceived: number;
  } | null = null;

  if (valid) {
    const monthlyRate = annualRate / 12 / 100;
    let payment: number;
    if (monthlyRate === 0) {
      payment = p / months;
    } else {
      payment =
        (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalRepayment = payment * months;
    const feeAmount = round2(p * (feePercent / 100));
    result = {
      monthlyPayment: round2(payment),
      totalInterest: round2(totalRepayment - p),
      totalRepayment: round2(totalRepayment),
      feeAmount,
      netFundsReceived: round2(p - feeAmount),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="biz-principal" className="text-sm text-muted-foreground">
            Loan amount
          </Label>
          <Input
            id="biz-principal"
            type="number"
            inputMode="decimal"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="50000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="biz-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="biz-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="9"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="biz-term" className="text-sm text-muted-foreground">
            Loan term (months)
          </Label>
          <Input
            id="biz-term"
            type="number"
            inputMode="numeric"
            min={0}
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            placeholder="36"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="biz-fee" className="text-sm text-muted-foreground">
            Origination fee (%)
          </Label>
          <Input
            id="biz-fee"
            type="number"
            inputMode="decimal"
            min={0}
            value={originationFee}
            onChange={(e) => setOriginationFee(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.monthlyPayment}</p>
            <p className="mt-1 text-sm text-muted-foreground">monthly payment</p>
          </div>
          <StatBar
            items={[
              { label: "total interest", value: result.totalInterest },
              { label: "total repayment", value: result.totalRepayment },
              { label: "origination fee", value: result.feeAmount },
              { label: "net funds received", value: result.netFundsReceived },
            ]}
          />
        </>
      )}
    </div>
  );
}
