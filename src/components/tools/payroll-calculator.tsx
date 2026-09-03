"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function PayrollCalculator() {
  const [grossPay, setGrossPay] = React.useState("");
  const [preTaxDeductions, setPreTaxDeductions] = React.useState("");
  const [taxRate, setTaxRate] = React.useState("");
  const [postTaxDeductions, setPostTaxDeductions] = React.useState("");

  const gross = parseFloat(grossPay);
  const preTax = parseFloat(preTaxDeductions) || 0;
  const rate = parseFloat(taxRate) || 0;
  const postTax = parseFloat(postTaxDeductions) || 0;

  const valid = grossPay !== "" && !Number.isNaN(gross) && gross >= 0;

  let result: { taxableIncome: number; taxWithheld: number; netPay: number } | null = null;
  if (valid) {
    const taxableIncome = Math.max(0, gross - preTax);
    const taxWithheld = round2(taxableIncome * (rate / 100));
    const netPay = round2(gross - preTax - taxWithheld - postTax);
    result = { taxableIncome: round2(taxableIncome), taxWithheld, netPay };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="payroll-gross" className="text-sm text-muted-foreground">
            Gross pay (this period)
          </Label>
          <Input
            id="payroll-gross"
            type="number"
            inputMode="decimal"
            min={0}
            value={grossPay}
            onChange={(e) => setGrossPay(e.target.value)}
            placeholder="4000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="payroll-pretax" className="text-sm text-muted-foreground">
            Pre-tax deductions (401k, insurance)
          </Label>
          <Input
            id="payroll-pretax"
            type="number"
            inputMode="decimal"
            min={0}
            value={preTaxDeductions}
            onChange={(e) => setPreTaxDeductions(e.target.value)}
            placeholder="200"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="payroll-tax-rate" className="text-sm text-muted-foreground">
            Combined tax withholding rate (%)
          </Label>
          <Input
            id="payroll-tax-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="22"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="payroll-posttax" className="text-sm text-muted-foreground">
            Post-tax deductions (garnishments, etc.)
          </Label>
          <Input
            id="payroll-posttax"
            type="number"
            inputMode="decimal"
            min={0}
            value={postTaxDeductions}
            onChange={(e) => setPostTaxDeductions(e.target.value)}
            placeholder="0"
            className="mt-1.5"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.netPay}</p>
            <p className="mt-1 text-sm text-muted-foreground">net pay (take-home)</p>
          </div>
          <StatBar
            items={[
              { label: "taxable income", value: result.taxableIncome },
              { label: "tax withheld", value: result.taxWithheld },
            ]}
          />
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This is a simplified estimate using a single combined tax rate you provide — real payroll
        withholding involves multiple separate taxes (federal, state, Social Security, Medicare)
        each with their own rules. Consult your payroll provider or an accountant for exact
        figures.
      </p>
    </div>
  );
}
