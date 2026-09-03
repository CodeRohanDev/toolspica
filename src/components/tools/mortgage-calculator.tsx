"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = React.useState("");
  const [downPayment, setDownPayment] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [termYears, setTermYears] = React.useState("30");
  const [propertyTax, setPropertyTax] = React.useState("");
  const [insurance, setInsurance] = React.useState("");

  const price = parseFloat(homePrice);
  const down = parseFloat(downPayment) || 0;
  const annualRate = parseFloat(rate);
  const years = parseFloat(termYears);
  const annualTax = parseFloat(propertyTax) || 0;
  const annualInsurance = parseFloat(insurance) || 0;

  const principal = price - down;

  const valid =
    homePrice !== "" &&
    rate !== "" &&
    termYears !== "" &&
    !Number.isNaN(price) &&
    !Number.isNaN(annualRate) &&
    !Number.isNaN(years) &&
    principal > 0 &&
    years > 0;

  let result: {
    principalAndInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    totalMonthlyPayment: number;
    totalInterest: number;
  } | null = null;

  if (valid) {
    const months = Math.round(years * 12);
    const monthlyRate = annualRate / 12 / 100;
    let pAndI: number;
    if (monthlyRate === 0) {
      pAndI = principal / months;
    } else {
      pAndI =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    const totalMonthlyPayment = pAndI + monthlyTax + monthlyInsurance;
    const totalInterest = pAndI * months - principal;

    result = {
      principalAndInterest: round2(pAndI),
      monthlyTax: round2(monthlyTax),
      monthlyInsurance: round2(monthlyInsurance),
      totalMonthlyPayment: round2(totalMonthlyPayment),
      totalInterest: round2(totalInterest),
    };
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="mort-price" className="text-sm text-muted-foreground">
            Home price
          </Label>
          <Input
            id="mort-price"
            type="number"
            inputMode="decimal"
            min={0}
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            placeholder="350000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="mort-down" className="text-sm text-muted-foreground">
            Down payment
          </Label>
          <Input
            id="mort-down"
            type="number"
            inputMode="decimal"
            min={0}
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="70000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="mort-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="mort-rate"
            type="number"
            inputMode="decimal"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="6.5"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="mort-term" className="text-sm text-muted-foreground">
            Loan term (years)
          </Label>
          <Input
            id="mort-term"
            type="number"
            inputMode="decimal"
            min={0}
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="mort-tax" className="text-sm text-muted-foreground">
            Annual property tax (optional)
          </Label>
          <Input
            id="mort-tax"
            type="number"
            inputMode="decimal"
            min={0}
            value={propertyTax}
            onChange={(e) => setPropertyTax(e.target.value)}
            placeholder="3500"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="mort-insurance" className="text-sm text-muted-foreground">
            Annual home insurance (optional)
          </Label>
          <Input
            id="mort-insurance"
            type="number"
            inputMode="decimal"
            min={0}
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="1200"
            className="mt-1.5"
          />
        </div>
      </div>

      {homePrice && down >= price && (
        <p className="mt-4 text-sm text-destructive">
          Down payment must be less than the home price.
        </p>
      )}

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{result.totalMonthlyPayment}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              total monthly payment (principal, interest, tax & insurance)
            </p>
          </div>
          <StatBar
            items={[
              { label: "principal & interest", value: result.principalAndInterest },
              { label: "monthly tax", value: result.monthlyTax },
              { label: "monthly insurance", value: result.monthlyInsurance },
              { label: "total interest over loan", value: result.totalInterest },
            ]}
          />
        </>
      )}
    </div>
  );
}
