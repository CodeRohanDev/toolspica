"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = React.useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = React.useState(20);
  const [mortgageRate, setMortgageRate] = React.useState(6.5);
  const [years, setYears] = React.useState(7);
  const [propertyTaxRate, setPropertyTaxRate] = React.useState(1.1);
  const [maintenanceRate, setMaintenanceRate] = React.useState(1);
  const [homeAppreciation, setHomeAppreciation] = React.useState(3);
  const [monthlyRent, setMonthlyRent] = React.useState(2000);
  const [rentIncrease, setRentIncrease] = React.useState(3);
  const [investmentReturn, setInvestmentReturn] = React.useState(5);

  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = mortgageRate / 100 / 12;
  const termMonths = 30 * 12;
  const monthlyMortgage =
    monthlyRate === 0
      ? loanAmount / termMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);

  let buyingCost = downPayment;
  let homeValue = homePrice;
  let rentingCost = 0;
  let rent = monthlyRent;
  let investedDownPayment = downPayment;

  for (let y = 0; y < years; y++) {
    buyingCost += monthlyMortgage * 12;
    buyingCost += homeValue * (propertyTaxRate / 100);
    buyingCost += homeValue * (maintenanceRate / 100);
    homeValue *= 1 + homeAppreciation / 100;

    rentingCost += rent * 12;
    rent *= 1 + rentIncrease / 100;
    investedDownPayment *= 1 + investmentReturn / 100;
  }

  const netBuyingCost = buyingCost - homeValue;
  const netRentingCost = rentingCost - (investedDownPayment - downPayment);
  const cheaper = netBuyingCost < netRentingCost ? "Buying" : "Renting";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Buying</p>
      <div className="mt-1.5 grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Home price ($)</Label>
          <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Down payment (%)</Label>
          <Input type="number" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Mortgage rate (%)</Label>
          <Input type="number" step={0.1} value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Home appreciation (%/yr)</Label>
          <Input type="number" step={0.1} value={homeAppreciation} onChange={(e) => setHomeAppreciation(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Property tax (%/yr)</Label>
          <Input type="number" step={0.1} value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Maintenance (%/yr)</Label>
          <Input type="number" step={0.1} value={maintenanceRate} onChange={(e) => setMaintenanceRate(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">Renting</p>
      <div className="mt-1.5 grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Monthly rent ($)</Label>
          <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Rent increase (%/yr)</Label>
          <Input type="number" step={0.1} value={rentIncrease} onChange={(e) => setRentIncrease(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Investment return if renting (%/yr)</Label>
          <Input type="number" step={0.1} value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Time horizon (years)</Label>
          <Input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <StatBar
        items={[
          { label: "net cost of buying", value: `$${netBuyingCost.toFixed(0)}` },
          { label: "net cost of renting", value: `$${netRentingCost.toFixed(0)}` },
          { label: "cheaper option", value: cheaper },
        ]}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Assumes the down payment, if renting, is invested instead at the given return rate. Net
        cost of buying subtracts projected home equity/appreciation. Simplified model — ignores
        closing costs, PMI, and tax deductions.
      </p>
    </div>
  );
}
