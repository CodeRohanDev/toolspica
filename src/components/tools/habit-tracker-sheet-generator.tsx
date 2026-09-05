"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function HabitTrackerSheetGenerator() {
  const [habitsRaw, setHabitsRaw] = React.useState("Drink water\nExercise\nRead\nSleep 8 hours");
  const [days, setDays] = React.useState(30);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const habits = habitsRaw.split("\n").map((h) => h.trim()).filter(Boolean);
  const dayList = Array.from({ length: days }, (_, i) => i + 1);

  function toggle(habit: string, day: number) {
    const key = `${habit}-${day}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function downloadCsv() {
    const rows = [["Habit", ...dayList.map((d) => `Day ${d}`)], ...habits.map((h) => [h, ...dayList.map((d) => (checked[`${h}-${d}`] ? "X" : ""))])];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "habit-tracker.csv";
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="text-sm text-muted-foreground">Habits (one per line)</label>
          <Textarea value={habitsRaw} onChange={(e) => setHabitsRaw(e.target.value)} rows={4} className="mt-1.5 resize-y" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Days</label>
          <input
            type="number"
            min={7}
            max={31}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-1.5 w-20 rounded-md border bg-transparent px-2.5 py-1.5 text-sm"
          />
        </div>
      </div>

      {habits.length > 0 && (
        <div className="mt-5 overflow-x-auto border-t pt-4">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 border bg-card p-1.5 text-left font-medium text-muted-foreground">Habit</th>
                {dayList.map((d) => (
                  <th key={d} className="border p-1 text-center text-xs font-medium text-muted-foreground">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => (
                <tr key={h}>
                  <td className="sticky left-0 border bg-card p-1.5 font-medium">{h}</td>
                  {dayList.map((d) => (
                    <td key={d} className="border p-0 text-center">
                      <button
                        type="button"
                        onClick={() => toggle(h, d)}
                        className={`size-7 ${checked[`${h}-${d}`] ? "bg-brand text-brand-foreground" : "hover:bg-muted"}`}
                      >
                        {checked[`${h}-${d}`] ? "✓" : ""}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={downloadCsv}>
        <Download className="size-4" /> Export CSV
      </Button>
    </div>
  );
}
