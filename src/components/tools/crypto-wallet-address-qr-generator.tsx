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
import { QrCanvas } from "@/components/tools/qr-canvas";
import { generateQrCode } from "@/lib/qrcode";

const COINS = [
  { value: "bitcoin", label: "Bitcoin (BTC)", scheme: "bitcoin" },
  { value: "ethereum", label: "Ethereum (ETH)", scheme: "ethereum" },
  { value: "litecoin", label: "Litecoin (LTC)", scheme: "litecoin" },
  { value: "plain", label: "Plain address (no URI scheme)", scheme: null },
];

export function CryptoWalletAddressQrGenerator() {
  const [coin, setCoin] = React.useState("bitcoin");
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const scheme = COINS.find((c) => c.value === coin)?.scheme ?? null;
  const payload = React.useMemo(() => {
    const addr = address.trim();
    if (!addr) return "";
    if (!scheme) return addr;
    const amt = amount.trim();
    return amt ? `${scheme}:${addr}?amount=${amt}` : `${scheme}:${addr}`;
  }, [address, amount, scheme]);

  const result = React.useMemo(() => {
    if (!payload) return null;
    try {
      return generateQrCode(payload);
    } catch {
      return null;
    }
  }, [payload]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Coin</Label>
          <Select value={coin} onValueChange={(v) => v && setCoin(v)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COINS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {scheme && (
          <div>
            <Label htmlFor="wallet-amount" className="text-sm text-muted-foreground">
              Amount (optional)
            </Label>
            <Input
              id="wallet-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 0.01"
              className="mt-1.5 font-mono"
            />
          </div>
        )}
      </div>

      <Label htmlFor="wallet-address" className="mt-4 block text-sm text-muted-foreground">
        Wallet address
      </Label>
      <Input
        id="wallet-address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Paste your wallet address..."
        className="mt-1.5 font-mono"
      />

      {payload && !result && (
        <p className="mt-3 text-sm text-destructive">
          This address is too long to encode as a QR code.
        </p>
      )}

      {result && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <QrCanvas matrix={result.matrix} size={result.size} filename="wallet-address-qr" />
          <p className="max-w-xs break-all text-center font-mono text-xs text-muted-foreground">
            {payload}
          </p>
        </div>
      )}
    </div>
  );
}
