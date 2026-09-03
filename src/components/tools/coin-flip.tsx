"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function CoinFlip() {
  const [result, setResult] = React.useState<"Heads" | "Tails" | null>(null);
  const [flipping, setFlipping] = React.useState(false);
  const [stats, setStats] = React.useState({ heads: 0, tails: 0 });

  function flip() {
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      setFlipping(false);
      setStats((prev) => ({
        heads: prev.heads + (outcome === "Heads" ? 1 : 0),
        tails: prev.tails + (outcome === "Tails" ? 1 : 0),
      }));
    }, 600);
  }

  const total = stats.heads + stats.tails;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      <div
        className={`mx-auto flex size-32 items-center justify-center rounded-full border-4 bg-brand-soft text-2xl font-bold transition-transform duration-500 ${
          flipping ? "animate-spin" : ""
        }`}
      >
        {flipping ? "…" : result ?? "?"}
      </div>

      <Button type="button" onClick={flip} disabled={flipping} className="mt-5" size="lg">
        {flipping ? "Flipping..." : "Flip the coin"}
      </Button>

      {total > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          This session: {stats.heads} heads · {stats.tails} tails ({total} flip
          {total === 1 ? "" : "s"})
        </p>
      )}
    </div>
  );
}
