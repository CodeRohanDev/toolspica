"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";

const CURRENCIES = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "DOGE", label: "Dogecoin (DOGE)" },
  { value: "USDT", label: "Tether (USDT)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
];

export function CryptocurrencyPriceConverter() {
  const [amount, setAmount] = React.useState("1");
  const [from, setFrom] = React.useState("BTC");
  const [to, setTo] = React.useState("USD");
  const [rate, setRate] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRate = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${from}`);
      if (!res.ok) throw new Error("Couldn't fetch exchange rates.");
      const data = await res.json();
      const r = parseFloat(data.data.rates[to]);
      if (!Number.isFinite(r)) throw new Error(`No rate available for ${to}.`);
      setRate(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't fetch exchange rates.");
      setRate(null);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  React.useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const amountNum = parseFloat(amount);
  const converted = rate !== null && Number.isFinite(amountNum) ? amountNum * rate : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <Label htmlFor="crypto-amount" className="text-sm text-muted-foreground">
            Amount
          </Label>
          <Input
            id="crypto-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">From</Label>
          <Select value={from} onValueChange={(v) => v && setFrom(v)}>
            <SelectTrigger className="mt-1.5 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap currencies"
        >
          <ArrowLeftRight className="size-4" />
        </Button>
        <div>
          <Label className="text-sm text-muted-foreground">To</Label>
          <Select value={to} onValueChange={(v) => v && setTo(v)}>
            <SelectTrigger className="mt-1.5 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <p className="mt-4 text-sm text-muted-foreground">Fetching live rate...</p>}
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {converted !== null && !loading && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-bold">
            {converted.toLocaleString(undefined, { maximumFractionDigits: 8 })} {to}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            1 {from} = {rate?.toLocaleString(undefined, { maximumFractionDigits: 8 })} {to}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Live rates from Coinbase&apos;s public exchange rate API, fetched directly in your
        browser.
      </p>
    </div>
  );
}
