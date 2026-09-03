"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

const STYLES: { name: string; map: (c: string) => string }[] = [
  { name: "Bold", map: mapper(0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Italic", map: mapper(0x1d434, 0x1d44e) },
  { name: "Bold Italic", map: mapper(0x1d468, 0x1d482) },
  { name: "Script", map: mapper(0x1d49c, 0x1d4b6) },
  { name: "Double-Struck", map: mapper(0x1d538, 0x1d552, 0x1d7d8) },
  { name: "Monospace", map: mapper(0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Fullwidth", map: mapper(0xff21, 0xff41, 0xff10) },
  { name: "Circled", map: mapper(0x24b6, 0x24d0, 0x2460, -1) },
  { name: "Bubble", map: mapper(0x1f150, 0x1f170) },
  { name: "Strikethrough", map: (c: string) => c + "̶" },
  { name: "Underline", map: (c: string) => c + "̲" },
];

function mapper(upperStart: number, lowerStart: number, digitStart?: number, digitOffset = 0) {
  return (c: string) => {
    if (c >= "A" && c <= "Z") return String.fromCodePoint(upperStart + (c.charCodeAt(0) - 65));
    if (c >= "a" && c <= "z") return String.fromCodePoint(lowerStart + (c.charCodeAt(0) - 97));
    if (digitStart && c >= "0" && c <= "9") return String.fromCodePoint(digitStart + (c.charCodeAt(0) - 48) + digitOffset);
    return c;
  };
}

export function FancyTextGenerator() {
  const [text, setText] = React.useState("Toolspica");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your text..." />
      <div className="mt-4 space-y-2 border-t pt-4">
        {STYLES.map((s) => {
          const out = text.split("").map(s.map).join("");
          return (
            <div key={s.name} className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{s.name}</p>
                <p className="truncate text-lg">{out}</p>
              </div>
              <CopyButton value={out} label="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
