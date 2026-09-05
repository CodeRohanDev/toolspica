"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

interface Segment {
  id: number;
  departure: string;
  arrival: string;
}

function parseMinutes(datetimeLocal: string): number | null {
  if (!datetimeLocal) return null;
  const t = new Date(datetimeLocal).getTime();
  if (Number.isNaN(t)) return null;
  return t / 60000;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

let nextId = 3;

export function FlightTimeAndLayoverCalculator() {
  const [segments, setSegments] = React.useState<Segment[]>([
    { id: 1, departure: "", arrival: "" },
    { id: 2, departure: "", arrival: "" },
  ]);

  const updateSegment = (id: number, field: "departure" | "arrival", value: string) => {
    setSegments((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSegment = () => setSegments((prev) => [...prev, { id: nextId++, departure: "", arrival: "" }]);
  const removeSegment = (id: number) => setSegments((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));

  let totalFlightMinutes = 0;
  let totalLayoverMinutes = 0;
  const rows: { label: string; minutes: number; type: "flight" | "layover" }[] = [];

  segments.forEach((seg, i) => {
    const dep = parseMinutes(seg.departure);
    const arr = parseMinutes(seg.arrival);
    if (dep !== null && arr !== null && arr > dep) {
      const flightMin = arr - dep;
      totalFlightMinutes += flightMin;
      rows.push({ label: `Flight ${i + 1}`, minutes: flightMin, type: "flight" });

      const next = segments[i + 1];
      if (next) {
        const nextDep = parseMinutes(next.departure);
        if (nextDep !== null && nextDep > arr) {
          const layoverMin = nextDep - arr;
          totalLayoverMinutes += layoverMin;
          rows.push({ label: `Layover after flight ${i + 1}`, minutes: layoverMin, type: "layover" });
        }
      }
    }
  });

  const totalTrip = totalFlightMinutes + totalLayoverMinutes;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Enter each flight&apos;s departure and arrival (local time)</p>
      <div className="mt-2 space-y-3">
        {segments.map((seg, i) => (
          <div key={seg.id} className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Flight {i + 1}</p>
              {segments.length > 1 && (
                <button onClick={() => removeSegment(seg.id)} className="text-xs text-muted-foreground hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Departure</Label>
                <Input type="datetime-local" value={seg.departure} onChange={(e) => updateSegment(seg.id, "departure", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Arrival</Label>
                <Input type="datetime-local" value={seg.arrival} onChange={(e) => updateSegment(seg.id, "arrival", e.target.value)} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-3" onClick={addSegment}>
        + Add connecting flight
      </Button>

      {rows.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <ul className="space-y-1 text-sm">
            {rows.map((r, i) => (
              <li key={i} className="flex justify-between">
                <span className={r.type === "layover" ? "text-muted-foreground" : ""}>{r.label}</span>
                <span>{formatDuration(r.minutes)}</span>
              </li>
            ))}
          </ul>
          <StatBar
            items={[
              { label: "total flight time", value: formatDuration(totalFlightMinutes) },
              { label: "total layover time", value: formatDuration(totalLayoverMinutes) },
              { label: "total trip time", value: formatDuration(totalTrip) },
            ]}
          />
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Times are treated as entered (local to each airport) — enter departure/arrival exactly as
        shown on your boarding pass or itinerary.
      </p>
    </div>
  );
}
