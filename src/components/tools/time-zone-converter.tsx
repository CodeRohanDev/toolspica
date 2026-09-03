"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIME_ZONES = [
  { id: "UTC", label: "UTC" },
  { id: "America/New_York", label: "New York (Eastern)" },
  { id: "America/Chicago", label: "Chicago (Central)" },
  { id: "America/Denver", label: "Denver (Mountain)" },
  { id: "America/Los_Angeles", label: "Los Angeles (Pacific)" },
  { id: "America/Anchorage", label: "Anchorage" },
  { id: "Pacific/Honolulu", label: "Honolulu" },
  { id: "America/Sao_Paulo", label: "São Paulo" },
  { id: "Europe/London", label: "London" },
  { id: "Europe/Paris", label: "Paris" },
  { id: "Europe/Berlin", label: "Berlin" },
  { id: "Europe/Moscow", label: "Moscow" },
  { id: "Africa/Cairo", label: "Cairo" },
  { id: "Africa/Johannesburg", label: "Johannesburg" },
  { id: "Asia/Dubai", label: "Dubai" },
  { id: "Asia/Karachi", label: "Karachi" },
  { id: "Asia/Kolkata", label: "India (Kolkata)" },
  { id: "Asia/Dhaka", label: "Dhaka" },
  { id: "Asia/Bangkok", label: "Bangkok" },
  { id: "Asia/Singapore", label: "Singapore" },
  { id: "Asia/Shanghai", label: "Shanghai" },
  { id: "Asia/Tokyo", label: "Tokyo" },
  { id: "Asia/Seoul", label: "Seoul" },
  { id: "Australia/Sydney", label: "Sydney" },
  { id: "Pacific/Auckland", label: "Auckland" },
];

function getOffsetMinutes(date: Date, timeZone: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  });
  const part = dtf.formatToParts(date).find((p) => p.type === "timeZoneName");
  const match = (part?.value ?? "GMT+0").match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;
  return sign * (hours * 60 + minutes);
}

export function TimeZoneConverter() {
  const [dateTime, setDateTime] = React.useState("");
  const [fromZone, setFromZone] = React.useState("America/New_York");
  const [toZone, setToZone] = React.useState("Asia/Kolkata");

  const result = React.useMemo(() => {
    if (!dateTime) return null;
    const [datePart, timePart] = dateTime.split("T");
    if (!datePart || !timePart) return null;
    const [y, mo, d] = datePart.split("-").map(Number);
    const [h, mi] = timePart.split(":").map(Number);

    const naiveUTCms = Date.UTC(y, mo - 1, d, h, mi);
    const naiveDate = new Date(naiveUTCms);
    const fromOffset = getOffsetMinutes(naiveDate, fromZone);
    const actualUTCms = naiveUTCms - fromOffset * 60_000;
    const actualDate = new Date(actualUTCms);

    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: toZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(actualDate);

    const toOffset = getOffsetMinutes(actualDate, toZone);
    const diffHours = (toOffset - fromOffset) / 60;

    return { formatted, diffHours };
  }, [dateTime, fromZone, toZone]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label htmlFor="tz-datetime" className="text-sm text-muted-foreground">
          Date and time
        </Label>
        <Input
          id="tz-datetime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="mt-1.5"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">From time zone</Label>
          <Select
            value={fromZone}
            onValueChange={(value) => value && setFromZone(value)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_ZONES.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">To time zone</Label>
          <Select
            value={toZone}
            onValueChange={(value) => value && setToZone(value)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_ZONES.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {result && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold">{result.formatted}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.diffHours >= 0 ? "+" : ""}
            {result.diffHours}h difference from the source time zone
          </p>
        </div>
      )}
    </div>
  );
}
