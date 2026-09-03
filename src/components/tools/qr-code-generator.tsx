"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { QrCanvas } from "@/components/tools/qr-canvas";
import { generateQrCode } from "@/lib/qrcode";

export function QrCodeGenerator() {
  const [text, setText] = React.useState("https://toolspica.cloud");

  const result = React.useMemo(() => {
    if (!text.trim()) return null;
    try {
      return generateQrCode(text);
    } catch {
      return null;
    }
  }, [text]);

  const tooLong = text.trim().length > 0 && result === null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a URL, text, or any message..."
        rows={4}
        className="resize-y text-sm"
      />

      {tooLong && (
        <p className="mt-3 text-sm text-destructive">
          Text is too long to encode — try a shorter message (roughly under 100 characters for
          mixed-case text).
        </p>
      )}

      {result && (
        <div className="mt-5 flex justify-center">
          <QrCanvas matrix={result.matrix} size={result.size} filename="qrcode" />
        </div>
      )}
    </div>
  );
}
