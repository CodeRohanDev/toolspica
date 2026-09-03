"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface Row {
  id: number;
  label: string;
  score: string;
  weight: string;
}

let nextId = 3;

function letterGrade(pct: number) {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

export function GradeCalculator() {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 1, label: "Homework", score: "", weight: "" },
    { id: 2, label: "Exam", score: "", weight: "" },
  ]);

  function addRow() {
    setRows((prev) => [...prev, { id: nextId++, label: `Item ${prev.length + 1}`, score: "", weight: "" }]);
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRow(id: number, field: keyof Row, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  const validRows = rows.filter((r) => r.score !== "" && r.weight !== "");
  const totalWeight = validRows.reduce((sum, r) => sum + (parseFloat(r.weight) || 0), 0);
  const weightedSum = validRows.reduce(
    (sum, r) => sum + (parseFloat(r.score) || 0) * (parseFloat(r.weight) || 0),
    0
  );
  const finalPct = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Item</Label>
              <Input
                value={row.label}
                onChange={(e) => updateRow(row.id, "label", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">Score %</Label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                value={row.score}
                onChange={(e) => updateRow(row.id, "score", e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">Weight %</Label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                value={row.weight}
                onChange={(e) => updateRow(row.id, "weight", e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeRow(row.id)}
              disabled={rows.length <= 1}
              aria-label="Remove item"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addRow} className="mt-3">
        <Plus className="size-3.5" /> Add item
      </Button>

      {finalPct !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">
            {finalPct}% <span className="text-lg font-normal text-muted-foreground">— {letterGrade(finalPct)}</span>
          </p>
          {totalWeight !== 100 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Weights sum to {totalWeight}% — normalized automatically.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
