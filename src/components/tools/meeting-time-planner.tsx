"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

const COMMON_ZONES = [
  "UTC", "America/New_York", "America/Los_Angeles", "America/Chicago", "Europe/London",
  "Europe/Paris", "Europe/Berlin", "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore",
  "Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney",
];

function getHourInZone(baseUtcHour: number, timeZone: string, referenceDate: Date): string {
  const date = new Date(referenceDate);
  date.setUTCHours(baseUtcHour, 0, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

export function MeetingTimePlanner() {
  const [zones, setZones] = React.useState<string[]>(["America/New_York", "Europe/London", "Asia/Kolkata"]);
  const [newZone, setNewZone] = React.useState("");
  const referenceDate = React.useMemo(() => new Date(), []);

  function addZone() {
    const trimmed = newZone.trim();
    if (!trimmed || zones.includes(trimmed)) return;
    try {
      Intl.DateTimeFormat("en-US", { timeZone: trimmed });
      setZones((prev) => [...prev, trimmed]);
      setNewZone("");
    } catch {
      // invalid IANA zone name, ignore
    }
  }

  function removeZone(zone: string) {
    setZones((prev) => prev.filter((z) => z !== zone));
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {zones.map((zone) => (
          <span key={zone} className="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-sm">
            {zone.replace(/_/g, " ")}
            <button type="button" onClick={() => removeZone(zone)} aria-label={`Remove ${zone}`}>
              <X className="size-3.5 text-muted-foreground hover:text-destructive" />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <Input
          list="tz-options"
          value={newZone}
          onChange={(e) => setNewZone(e.target.value)}
          placeholder="Add a time zone, e.g. Asia/Tokyo"
          className="max-w-xs"
        />
        <datalist id="tz-options">
          {COMMON_ZONES.map((z) => (
            <option key={z} value={z} />
          ))}
        </datalist>
        <Button type="button" size="sm" variant="outline" onClick={addZone}>
          <Plus className="size-4" /> Add
        </Button>
      </div>

      <div className="mt-5 overflow-x-auto border-t pt-4">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-1.5 text-left font-medium text-muted-foreground">UTC hour</th>
              {zones.map((z) => (
                <th key={z} className="p-1.5 text-left font-medium text-muted-foreground">
                  {z.split("/").pop()?.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h} className="border-t">
                <td className="p-1.5 tabular-nums text-muted-foreground">{h.toString().padStart(2, "0")}:00</td>
                {zones.map((z) => (
                  <td key={z} className="p-1.5 tabular-nums">
                    {getHourInZone(h, z, referenceDate)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Use full IANA time zone names (e.g. Europe/London, Asia/Kolkata) — these account for
        daylight saving time automatically.
      </p>
    </div>
  );
}
