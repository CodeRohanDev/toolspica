"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { QrCanvas } from "@/components/tools/qr-canvas";
import { generateQrCode } from "@/lib/qrcode";

export function BulkQrCodeGenerator() {
  const [lines, setLines] = React.useState("");

  const entries = lines
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const results = entries.map((text, i) => {
    try {
      return { text, index: i, result: generateQrCode(text) };
    } catch {
      return { text, index: i, result: null };
    }
  });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={lines}
        onChange={(e) => setLines(e.target.value)}
        placeholder={"One value per line — URLs, text, or codes:\nhttps://example.com/1\nhttps://example.com/2\nhttps://example.com/3"}
        rows={6}
        className="resize-y"
      />

      {results.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-3 md:grid-cols-4">
          {results.map(({ text, index, result }) =>
            result ? (
              <div key={index} className="flex flex-col items-center gap-2 rounded-lg border p-3">
                <QrCanvas matrix={result.matrix} size={result.size} moduleSize={4} filename={`qrcode-${index + 1}`} />
                <p className="max-w-full truncate text-xs text-muted-foreground" title={text}>
                  {text}
                </p>
              </div>
            ) : (
              <div key={index} className="flex items-center justify-center rounded-lg border border-dashed p-3 text-center text-xs text-destructive">
                Too long to encode: {text}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
