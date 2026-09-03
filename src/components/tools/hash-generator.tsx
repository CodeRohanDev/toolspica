"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { md5Text } from "@/lib/md5";

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function computeHash(text: string, algorithm: (typeof ALGORITHMS)[number]) {
  if (algorithm === "MD5") return md5Text(text);
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function HashGenerator() {
  const [text, setText] = React.useState("");
  const [hashes, setHashes] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let cancelled = false;
    if (!text) {
      setHashes({});
      return;
    }
    Promise.all(ALGORITHMS.map((algo) => computeHash(text, algo))).then((results) => {
      if (cancelled) return;
      const map: Record<string, string> = {};
      ALGORITHMS.forEach((algo, i) => (map[algo] = results[i]));
      setHashes(map);
    });
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Text to hash</p>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to generate hashes..."
        rows={4}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-5 space-y-3 border-t pt-4">
        {ALGORITHMS.map((algo) => (
          <div key={algo}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {algo}
              </p>
              <CopyButton value={hashes[algo] ?? ""} />
            </div>
            <p className="mt-1 break-all rounded-lg bg-muted/40 p-2.5 font-mono text-xs">
              {hashes[algo] ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
