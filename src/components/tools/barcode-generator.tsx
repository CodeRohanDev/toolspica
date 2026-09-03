"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarcodeCanvas } from "@/components/tools/barcode-canvas";
import { encodeCode39, isCode39Supported } from "@/lib/barcode39";

export function BarcodeGenerator() {
  const [text, setText] = React.useState("CODE39-DEMO");

  const upper = text.toUpperCase();
  const supported = text.length > 0 && isCode39Supported(text);

  const widths = React.useMemo(() => {
    if (!supported) return null;
    try {
      return encodeCode39(text);
    } catch {
      return null;
    }
  }, [text, supported]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label htmlFor="barcode-text" className="text-sm text-muted-foreground">
          Text to encode (Code 39)
        </Label>
        <Input
          id="barcode-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ABC123"
          className="mt-1.5 max-w-sm uppercase"
        />
      </div>

      {text.length > 0 && !supported && (
        <p className="mt-3 text-sm text-destructive">
          Code 39 only supports letters, numbers, spaces, and $ / + % — remove any other
          characters.
        </p>
      )}

      {widths && (
        <div className="mt-5 flex justify-center">
          <BarcodeCanvas widths={widths} label={upper} filename="barcode" />
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Supported characters: 0-9, A-Z, space, and $ / + %. Code 39 is one of the most widely
        supported general-purpose barcode formats and is readable by virtually any barcode
        scanner.
      </p>
    </div>
  );
}
