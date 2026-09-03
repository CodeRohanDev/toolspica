"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compileExpression } from "@/lib/math-expression";

const WIDTH = 640;
const HEIGHT = 420;

export function GraphingCalculator() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [expr, setExpr] = React.useState("x^2 - 2x - 3");
  const [xMin, setXMin] = React.useState("-10");
  const [xMax, setXMax] = React.useState("10");
  const [error, setError] = React.useState<string | null>(null);

  const xMinNum = parseFloat(xMin);
  const xMaxNum = parseFloat(xMax);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (!Number.isFinite(xMinNum) || !Number.isFinite(xMaxNum) || xMinNum >= xMaxNum) {
      setError("Enter a valid range where min is less than max.");
      return;
    }

    let f: (x: number) => number;
    try {
      f = compileExpression(expr);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't parse this expression.");
      return;
    }

    const xRange = xMaxNum - xMinNum;
    const points: { x: number; y: number }[] = [];
    let yMin = Infinity;
    let yMax = -Infinity;
    for (let i = 0; i <= WIDTH; i++) {
      const x = xMinNum + (i / WIDTH) * xRange;
      let y: number;
      try {
        y = f(x);
      } catch {
        y = NaN;
      }
      if (Number.isFinite(y)) {
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
      }
      points.push({ x, y });
    }
    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
      setError("This function has no finite values in the selected range.");
      return;
    }
    if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
    }
    const yPadding = (yMax - yMin) * 0.1;
    yMin -= yPadding;
    yMax += yPadding;

    const toPx = (x: number) => ((x - xMinNum) / xRange) * WIDTH;
    const toPy = (y: number) => HEIGHT - ((y - yMin) / (yMax - yMin)) * HEIGHT;

    // Axes
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    if (yMin <= 0 && yMax >= 0) {
      ctx.beginPath();
      ctx.moveTo(0, toPy(0));
      ctx.lineTo(WIDTH, toPy(0));
      ctx.stroke();
    }
    if (xMinNum <= 0 && xMaxNum >= 0) {
      ctx.beginPath();
      ctx.moveTo(toPx(0), 0);
      ctx.lineTo(toPx(0), HEIGHT);
      ctx.stroke();
    }

    // Curve
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let penDown = false;
    for (const p of points) {
      if (!Number.isFinite(p.y)) {
        penDown = false;
        continue;
      }
      const px = toPx(p.x);
      const py = toPy(p.y);
      if (!penDown) {
        ctx.moveTo(px, py);
        penDown = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  }, [expr, xMinNum, xMaxNum]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <Label htmlFor="graph-expr" className="text-sm text-muted-foreground">
            y =
          </Label>
          <Input
            id="graph-expr"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="mt-1.5 font-mono"
            placeholder="e.g. sin(x) or x^2 - 2x - 3"
          />
        </div>
        <div>
          <Label htmlFor="graph-xmin" className="text-sm text-muted-foreground">
            x min
          </Label>
          <Input
            id="graph-xmin"
            value={xMin}
            onChange={(e) => setXMin(e.target.value)}
            className="mt-1.5 w-24 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="graph-xmax" className="text-sm text-muted-foreground">
            x max
          </Label>
          <Input
            id="graph-xmax"
            value={xMax}
            onChange={(e) => setXMax(e.target.value)}
            className="mt-1.5 w-24 font-mono"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
        <canvas ref={canvasRef} style={{ width: WIDTH, height: HEIGHT, maxWidth: "100%" }} />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Supports +, −, ×, ÷, ^, parentheses, and functions like sin(), cos(), tan(), sqrt(), abs(),
        log(), ln(), exp().
      </p>
    </div>
  );
}
