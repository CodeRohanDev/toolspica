"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { parseCsv } from "@/lib/csv-parse";

export function ChartGeneratorFromCsv() {
  const [input, setInput] = React.useState("month,sales\nJan,120\nFeb,180\nMar,150\nApr,220");
  const [labelCol, setLabelCol] = React.useState(0);
  const [valueCol, setValueCol] = React.useState(1);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const rows = React.useMemo(() => parseCsv(input), [input]);
  const header = rows[0] ?? [];
  const body = rows.slice(1);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || body.length === 0) return;

    const width = 700;
    const height = 360;
    const padding = 50;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const values = body.map((r) => Number(r[valueCol]) || 0);
    const max = Math.max(...values, 1);
    const barWidth = (width - padding * 2) / values.length;

    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(padding, padding / 2);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding / 2, height - padding);
    ctx.stroke();

    values.forEach((v, i) => {
      const barHeight = ((height - padding * 1.5) * v) / max;
      const x = padding + i * barWidth + barWidth * 0.15;
      const y = height - padding - barHeight;
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(x, y, barWidth * 0.7, barHeight);

      ctx.fillStyle = "#334155";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(body[i][labelCol] ?? ""), x + barWidth * 0.35, height - padding + 16);
      ctx.fillText(String(v), x + barWidth * 0.35, y - 6);
    });
  }, [body, labelCol, valueCol]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="resize-y font-mono text-sm" />

      {header.length >= 2 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-sm text-muted-foreground">Label column</Label>
            <select value={labelCol} onChange={(e) => setLabelCol(Number(e.target.value))} className="mt-1.5 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm">
              {header.map((h, i) => (
                <option key={i} value={i}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Value column</Label>
            <select value={valueCol} onChange={(e) => setValueCol(Number(e.target.value))} className="mt-1.5 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm">
              {header.map((h, i) => (
                <option key={i} value={i}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mt-5 border-t pt-4">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
}
