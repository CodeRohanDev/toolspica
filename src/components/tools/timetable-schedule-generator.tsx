"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function TimetableScheduleGenerator() {
  const [startHour, setStartHour] = React.useState(8);
  const [endHour, setEndHour] = React.useState(18);
  const hours = Array.from({ length: Math.max(1, endHour - startHour) }, (_, i) => startHour + i);
  const [cells, setCells] = React.useState<Record<string, string>>({});

  function key(day: string, hour: number) {
    return `${day}-${hour}`;
  }

  function update(day: string, hour: number, value: string) {
    setCells((prev) => ({ ...prev, [key(day, hour)]: value }));
  }

  function downloadCsv() {
    const rows = [["Time", ...DAYS], ...hours.map((h) => [`${h}:00`, ...DAYS.map((d) => cells[key(d, h)] ?? "")])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timetable.csv";
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Start hour
          <Input type="number" min={0} max={23} value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} className="w-20" />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          End hour
          <Input type="number" min={1} max={24} value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} className="w-20" />
        </label>
        <Button type="button" size="sm" variant="outline" onClick={downloadCsv} className="ml-auto">
          <Download className="size-4" /> Export CSV
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto border-t pt-4">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border p-1.5 text-left font-medium text-muted-foreground">Time</th>
              {DAYS.map((d) => (
                <th key={d} className="border p-1.5 text-left font-medium text-muted-foreground">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h}>
                <td className="border p-1.5 tabular-nums text-muted-foreground">{h}:00</td>
                {DAYS.map((d) => (
                  <td key={d} className="border p-0.5">
                    <input
                      type="text"
                      value={cells[key(d, h)] ?? ""}
                      onChange={(e) => update(d, h, e.target.value)}
                      className="w-full bg-transparent px-1.5 py-1 text-sm outline-none"
                      placeholder=""
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
