"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD", "CHF", "CNY", "SGD", "AED", "ZAR"];

export function CurrencyConverter() {
  const [amount, setAmount] = React.useState("100");
  const [from, setFrom] = React.useState("USD");
  const [to, setTo] = React.useState("INR");
  const [rates, setRates] = React.useState<Record<string, number> | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [updatedAt, setUpdatedAt] = React.useState("");

  const fetchRates = React.useCallback(async (base: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithTimeout(`https://open.er-api.com/v6/latest/${base}`);
      const data = await res.json();
      if (data.result !== "success") throw new Error();
      setRates(data.rates);
      setUpdatedAt(data.time_last_update_utc ?? "");
    } catch {
      setError("Couldn't fetch exchange rates — try again in a moment.");
      setRates(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    Promise.resolve().then(() => fetchRates(from));
  }, [from, fetchRates]);

  const numericAmount = Number(amount) || 0;
  const rate = rates?.[to];
  const converted = rate ? numericAmount * rate : null;

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div>
          <Label className="text-sm text-muted-foreground">Amount</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5" />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {COMMON_CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <Button type="button" variant="outline" size="icon" onClick={swap} className="mb-1.5" aria-label="Swap currencies">
          <ArrowLeftRight className="size-4" />
        </Button>

        <div>
          <Label className="text-sm text-muted-foreground">Converted</Label>
          <p className="mt-1.5 flex h-9 items-center rounded-md border bg-muted/30 px-3 text-sm font-medium">
            {loading ? "..." : converted !== null ? converted.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—"}
          </p>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {COMMON_CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {rate && (
        <p className="mt-3 text-xs text-muted-foreground">
          1 {from} = {rate.toFixed(4)} {to} · rates updated {updatedAt}
        </p>
      )}
    </div>
  );
}
