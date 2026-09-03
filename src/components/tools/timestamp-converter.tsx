"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function TimestampConverter() {
  const [timestamp, setTimestamp] = React.useState("");
  const [dateInput, setDateInput] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  function useNow() {
    setTimestamp(String(Math.floor(Date.now() / 1000)));
  }

  const fromTimestamp = React.useMemo(() => {
    const num = Number(timestamp);
    if (!timestamp || Number.isNaN(num)) return null;
    const ms = timestamp.length > 10 ? num : num * 1000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return null;
    return {
      local: date.toString(),
      utc: date.toUTCString(),
      iso: date.toISOString(),
    };
  }, [timestamp]);

  const fromDate = React.useMemo(() => {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return {
      seconds: Math.floor(date.getTime() / 1000),
      millis: date.getTime(),
    };
  }, [dateInput]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ts-input" className="text-sm text-muted-foreground">
              Unix timestamp (seconds or ms)
            </Label>
            {mounted && (
              <Button type="button" size="sm" variant="ghost" onClick={useNow}>
                Use now
              </Button>
            )}
          </div>
          <Input
            id="ts-input"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1735689600"
            className="mt-1.5 font-mono"
          />
          {fromTimestamp && (
            <div className="mt-3 space-y-1 text-sm">
              <p><span className="text-muted-foreground">Local:</span> {fromTimestamp.local}</p>
              <p><span className="text-muted-foreground">UTC:</span> {fromTimestamp.utc}</p>
              <p><span className="text-muted-foreground">ISO 8601:</span> {fromTimestamp.iso}</p>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="date-input" className="text-sm text-muted-foreground">
            Date & time
          </Label>
          <Input
            id="date-input"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="mt-1.5"
          />
          {fromDate && (
            <div className="mt-3 space-y-1 text-sm">
              <p><span className="text-muted-foreground">Seconds:</span> {fromDate.seconds}</p>
              <p><span className="text-muted-foreground">Milliseconds:</span> {fromDate.millis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
