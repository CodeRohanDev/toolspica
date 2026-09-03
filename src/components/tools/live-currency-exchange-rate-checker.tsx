"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD", "CHF", "CNY", "SGD",
  "NZD", "MXN", "BRL", "ZAR", "SEK", "NOK", "HKD", "KRW", "AED", "PLN",
];

interface RatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export function LiveCurrencyExchangeRateChecker() {
  const [base, setBase] = React.useState("USD");
  const [amount, setAmount] = React.useState("1");
  const [data, setData] = React.useState<RatesResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRates = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const targets = CURRENCIES.filter((c) => c !== base).join(",");
      const res = await fetch(`https://api.frankfurter.dev/v1/latest?from=${base}&to=${targets}`);
      if (!res.ok) throw new Error("Couldn't fetch exchange rates.");
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't fetch exchange rates.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [base]);

  React.useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const amountNum = parseFloat(amount) || 1;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="fx-amount" className="text-sm text-muted-foreground">
            Amount
          </Label>
          <Input
            id="fx-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1.5 w-28 font-mono"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Base currency</Label>
          <Select value={base} onValueChange={(v) => v && setBase(v)}>
            <SelectTrigger className="mt-1.5 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <p className="mt-4 text-sm text-muted-foreground">Fetching live rates...</p>}
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {data && !loading && (
        <div className="mt-5">
          <p className="text-xs text-muted-foreground">
            Rates as of {data.date} (source: European Central Bank via Frankfurter)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.entries(data.rates)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([currency, rate]) => (
                <div key={currency} className="rounded-lg border bg-card p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {currency}
                  </p>
                  <p className="mt-1 font-mono text-sm font-semibold">
                    {(rate * amountNum).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
