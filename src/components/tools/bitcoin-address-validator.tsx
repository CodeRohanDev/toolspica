"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { validateBitcoinAddress, type AddressValidationResult } from "@/lib/bitcoin-address";

export function BitcoinAddressValidator() {
  const [address, setAddress] = React.useState("");
  const [result, setResult] = React.useState<AddressValidationResult | null>(null);

  React.useEffect(() => {
    if (!address.trim()) {
      setResult(null);
      return;
    }
    let cancelled = false;
    validateBitcoinAddress(address).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="btc-address" className="text-sm text-muted-foreground">
        Bitcoin address
      </Label>
      <Input
        id="btc-address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="1..., 3..., or bc1..."
        className="mt-1.5 font-mono"
      />

      {result && (
        <div
          className={`mt-4 flex items-start gap-2 rounded-lg p-3 text-sm ${
            result.valid ? "bg-brand-soft" : "bg-destructive/10 text-destructive"
          }`}
        >
          {result.valid ? (
            <Check className="mt-0.5 size-4 shrink-0" />
          ) : (
            <X className="mt-0.5 size-4 shrink-0" />
          )}
          <div>
            <p className="font-semibold">{result.valid ? "Valid address" : "Invalid address"}</p>
            <p className="mt-0.5">{result.valid ? result.format : result.reason}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Checks Base58Check checksums for Legacy (P2PKH) and P2SH addresses, and Bech32 checksums
        for native SegWit addresses — entirely in your browser, nothing is sent anywhere.
      </p>
    </div>
  );
}
