"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarcodeCanvas } from "@/components/tools/barcode-canvas";
import { encodeEan13, encodeUpcA } from "@/lib/ean13";

type Format = "ean13" | "upca";

export function UpcEanGenerator() {
  const [format, setFormat] = React.useState<Format>("ean13");
  const [digits, setDigits] = React.useState("");

  const requiredLength = format === "ean13" ? 12 : 11;
  const cleanDigits = digits.replace(/\D/g, "");
  const valid = cleanDigits.length === requiredLength;

  const result = React.useMemo(() => {
    if (!valid) return null;
    try {
      return format === "ean13" ? encodeEan13(cleanDigits) : encodeUpcA(cleanDigits);
    } catch {
      return null;
    }
  }, [cleanDigits, valid, format]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={format === "ean13" ? "default" : "outline"}
          onClick={() => {
            setFormat("ean13");
            setDigits("");
          }}
        >
          EAN-13
        </Button>
        <Button
          type="button"
          size="sm"
          variant={format === "upca" ? "default" : "outline"}
          onClick={() => {
            setFormat("upca");
            setDigits("");
          }}
        >
          UPC-A
        </Button>
      </div>

      <div className="mt-4">
        <Label htmlFor="upc-digits" className="text-sm text-muted-foreground">
          {format === "ean13" ? "First 12 digits" : "First 11 digits"} (check digit calculated automatically)
        </Label>
        <Input
          id="upc-digits"
          value={digits}
          onChange={(e) => setDigits(e.target.value)}
          placeholder={format === "ean13" ? "400638133393" : "03600029145"}
          inputMode="numeric"
          className="mt-1.5 max-w-xs"
        />
        {digits.length > 0 && !valid && (
          <p className="mt-2 text-sm text-destructive">
            Enter exactly {requiredLength} digits — the final check digit is calculated for you.
          </p>
        )}
      </div>

      {result && (
        <div className="mt-5 flex justify-center">
          <BarcodeCanvas widths={result.widths} label={result.fullCode} filename={format} moduleWidth={3} />
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        The check digit (last digit) is calculated automatically using the standard EAN/UPC mod-10
        algorithm — you only need to enter the product digits.
      </p>
    </div>
  );
}
