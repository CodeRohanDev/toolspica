"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function YesNoDecisionMaker() {
  const [result, setResult] = React.useState<string | null>(null);
  const [deciding, setDeciding] = React.useState(false);
  const [includeMaybe, setIncludeMaybe] = React.useState(false);

  function decide() {
    setDeciding(true);
    setResult(null);
    setTimeout(() => {
      const options = includeMaybe ? ["YES", "NO", "MAYBE"] : ["YES", "NO"];
      setResult(options[Math.floor(Math.random() * options.length)]);
      setDeciding(false);
    }, 500);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      <div className="mx-auto flex h-28 items-center justify-center">
        <span
          className={`text-5xl font-extrabold tracking-tight ${
            result === "YES"
              ? "text-green-600 dark:text-green-400"
              : result === "NO"
                ? "text-destructive"
                : "text-foreground"
          }`}
        >
          {deciding ? "…" : result ?? "?"}
        </span>
      </div>

      <Button type="button" onClick={decide} disabled={deciding} size="lg" className="mt-2">
        {deciding ? "Deciding..." : "Decide for me"}
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Switch id="include-maybe" checked={includeMaybe} onCheckedChange={setIncludeMaybe} />
        <Label htmlFor="include-maybe" className="text-sm font-normal">
          Include &ldquo;maybe&rdquo;
        </Label>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Each answer is a fresh 50/50 coin flip (or a three-way split with maybe enabled) — no
        memory, no bias, just a clean random decision.
      </p>
    </div>
  );
}
