"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EpochConverter() {
  const [now, setNow] = React.useState<number | null>(null);
  const [epoch, setEpoch] = React.useState("");

  React.useEffect(() => {
    const tick = () => setNow(Math.floor(Date.now() / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const converted = React.useMemo(() => {
    const num = Number(epoch);
    if (!epoch || Number.isNaN(num)) return null;
    const date = new Date(num * 1000);
    if (Number.isNaN(date.getTime())) return null;
    return date.toUTCString();
  }, [epoch]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="rounded-lg bg-muted/40 p-4 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Current Unix epoch time
        </p>
        <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-brand">
          {now ?? "—"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Seconds since January 1, 1970 00:00:00 UTC
        </p>
      </div>

      <div className="mt-5 border-t pt-4">
        <Label htmlFor="epoch-input" className="text-sm text-muted-foreground">
          Convert an epoch timestamp (seconds)
        </Label>
        <Input
          id="epoch-input"
          value={epoch}
          onChange={(e) => setEpoch(e.target.value)}
          placeholder="1735689600"
          className="mt-1.5 font-mono"
        />
        {converted && (
          <p className="mt-2 text-sm">
            <span className="text-muted-foreground">UTC date:</span> {converted}
          </p>
        )}
      </div>
    </div>
  );
}
