"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const PREFIXES = ["Nova", "Prime", "Peak", "Bright", "Swift", "Core", "True", "Bold", "Vivid", "Apex"];
const SUFFIXES = ["ify", "ly", "Hub", "Labs", "Works", "Co", "Base", "Wave", "Loop", "Forge"];

function generateNames(keyword: string, count: number) {
  const clean = keyword.trim().replace(/\s+/g, "");
  if (!clean) return [];
  const cap = clean.charAt(0).toUpperCase() + clean.slice(1);
  const names = new Set<string>();
  const pool: (() => string)[] = [
    () => `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]}${cap}`,
    () => `${cap}${SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]}`,
    () => `Get${cap}`,
    () => `${cap}ify`,
    () => `The${cap}Co`,
    () => `${cap}io`,
    () => `My${cap}`,
    () => `${cap}HQ`,
  ];
  let guard = 0;
  while (names.size < count && guard < count * 20) {
    names.add(pool[Math.floor(Math.random() * pool.length)]());
    guard++;
  }
  return [...names];
}

export function AiBusinessNameGenerator() {
  const [keyword, setKeyword] = React.useState("");
  const [names, setNames] = React.useState<string[]>([]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword describing your business, e.g. bakery, fitness, travel"
          className="flex-1"
        />
        <Button type="button" onClick={() => setNames(generateNames(keyword, 20))} disabled={!keyword.trim()}>
          Generate names
        </Button>
      </div>
      {names.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-4 sm:grid-cols-3">
          {names.map((n) => (
            <div key={n} className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
              <span className="text-sm font-medium">{n}</span>
              <CopyButton value={n} label="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
