"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

interface Row {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function LoanAmortizationCalculator() {
  const [principal, setPrincipal] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [years, setYears] = React.useState("");

  const p = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const numYears = parseFloat(years);

  const valid =
    principal !== "" &&
    rate !== "" &&
    years !== "" &&
    !Number.isNaN(p) &&
    !Number.isNaN(annualRate) &&
    !Number.isNaN(numYears) &&
    p > 0 &&
    annualRate >= 0 &&
    numYears > 0;

  const schedule = React.useMemo(() => {
    if (!valid) return null;
    const months = Math.round(numYears * 12);
    const monthlyRate = annualRate / 12 / 100;
    let payment: number;
    if (monthlyRate === 0) {
      payment = p / months;
    } else {
      payment =
        (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const rows: Row[] = [];
    let balance = p;
    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      let principalPortion = payment - interest;
      if (month === months) principalPortion = balance;
      balance = round2(balance - principalPortion);
      rows.push({
        month,
        payment: round2(principalPortion + interest),
        principal: round2(principalPortion),
        interest: round2(interest),
        balance: Math.max(0, balance),
      });
    }

    const totalPayment = rows.reduce((sum, r) => sum + r.payment, 0);
    return {
      rows,
      monthlyPayment: round2(payment),
      totalPayment: round2(totalPayment),
      totalInterest: round2(totalPayment - p),
    };
  }, [valid, p, annualRate, numYears]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="amort-principal" className="text-sm text-muted-foreground">
            Loan amount
          </Label>
          <Input
            id="amort-principal"
            type="number"
            inputMode="decimal"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="20000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="amort-rate" className="text-sm text-muted-foreground">
            Annual interest rate (%)
          </Label>
          <Input
            id="amort-rate"
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
          <Label htmlFor="amort-years" className="text-sm text-muted-foreground">
            Loan term (years)
          </Label>
          <Input
            id="amort-years"
            type="number"
            inputMode="decimal"
            min={0}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="3"
            className="mt-1.5"
          />
        </div>
      </div>

      {schedule && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{schedule.monthlyPayment}</p>
            <p className="mt-1 text-sm text-muted-foreground">monthly payment</p>
          </div>
          <StatBar
            items={[
              { label: "total interest", value: schedule.totalInterest },
              { label: "total payment", value: schedule.totalPayment },
              { label: "number of payments", value: schedule.rows.length },
            ]}
          />

          <div className="mt-4 max-h-96 overflow-y-auto overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr>
                  <th className="px-3 py-2 font-medium text-muted-foreground">#</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Payment</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Principal</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Interest</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.rows.map((row) => (
                  <tr key={row.month} className="border-t">
                    <td className="px-3 py-1.5 tabular-nums">{row.month}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.payment}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.principal}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.interest}</td>
                    <td className="px-3 py-1.5 tabular-nums">{row.balance}</td>
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
