"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const DEFAULT_ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Kolkata", "Asia/Tokyo", "Australia/Sydney"];

export function WorldClock() {
  const [now, setNow] = React.useState<Date | null>(null);
  const [zones, setZones] = React.useState(DEFAULT_ZONES);
  const [newZone, setNewZone] = React.useState("");

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function addZone() {
    if (!newZone.trim()) return;
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: newZone.trim() });
      setZones((z) => [...z, newZone.trim()]);
      setNewZone("");
    } catch {
      alert("Unknown timezone. Use an IANA name like Europe/Paris.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {zones.map((z) => (
          <div key={z} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{z.split("/").pop()?.replace("_", " ")}</p>
              <p className="text-xs text-muted-foreground">{z}</p>
            </div>
            <p className="text-2xl font-bold tabular-nums">
              {now ? new Intl.DateTimeFormat("en-US", { timeZone: z, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now) : "--:--:--"}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 border-t pt-4">
        <input value={newZone} onChange={(e) => setNewZone(e.target.value)} placeholder="Add IANA timezone e.g. Europe/Paris" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
        <Button type="button" size="sm" onClick={addZone}>Add</Button>
      </div>
    </div>
  );
}
