"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WHEEL_COLORS = [
  "#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16", "#06b6d4",
];

const WHEEL_SIZE = 320;

export function WheelOfNamesSpinner() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [namesText, setNamesText] = React.useState("Alice\nBob\nCarol\nDavid\nEve\nFrank");
  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>(null);
  const animationRef = React.useRef<number>(0);

  const names = React.useMemo(
    () =>
      namesText
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean)
        .slice(0, 24),
    [namesText]
  );

  const drawWheel = React.useCallback(
    (angle: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const center = WHEEL_SIZE / 2;
      const radius = center - 8;
      canvas.width = WHEEL_SIZE;
      canvas.height = WHEEL_SIZE;
      ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);

      if (names.length === 0) return;
      const sliceAngle = (Math.PI * 2) / names.length;

      for (let i = 0; i < names.length; i++) {
        const start = angle + i * sliceAngle;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, start + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px sans-serif";
        const label = names[i].length > 12 ? names[i].slice(0, 11) + "…" : names[i];
        ctx.fillText(label, radius - 12, 5);
        ctx.restore();
      }

      // Center hub
      ctx.beginPath();
      ctx.arc(center, center, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#d4d4d8";
      ctx.stroke();
    },
    [names]
  );

  React.useEffect(() => {
    drawWheel(rotation);
  }, [drawWheel, rotation]);

  React.useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  function spin() {
    if (spinning || names.length < 2) return;
    setSpinning(true);
    setWinner(null);

    const startRotation = rotation;
    const extraSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const targetRotation = startRotation + extraSpins * Math.PI * 2;
    const duration = 4000;
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = startRotation + (targetRotation - startRotation) * eased;
      setRotation(current);

      if (t < 1) {
        animationRef.current = requestAnimationFrame(frame);
      } else {
        setSpinning(false);
        // Pointer is at angle 0 (3 o'clock). Determine which slice is under it.
        const sliceAngle = (Math.PI * 2) / names.length;
        const normalized = ((0 - current) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const index = Math.floor(normalized / sliceAngle) % names.length;
        setWinner(names[index]);
      }
    }
    animationRef.current = requestAnimationFrame(frame);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={namesText}
        onChange={(e) => setNamesText(e.target.value)}
        placeholder={"One name per line\nAlice\nBob\nCarol"}
        rows={5}
        className="resize-y text-sm"
        disabled={spinning}
      />
      <p className="mt-1.5 text-xs text-muted-foreground">
        {names.length} name{names.length === 1 ? "" : "s"} on the wheel (max 24)
      </p>

      <div className="relative mx-auto mt-4 w-fit">
        <canvas
          ref={canvasRef}
          style={{ width: WHEEL_SIZE, height: WHEEL_SIZE, maxWidth: "100%" }}
        />
        {/* Pointer at 3 o'clock */}
        <div
          className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-8 border-r-[16px] border-y-transparent border-r-foreground"
          aria-hidden
        />
      </div>

      <div className="mt-4 text-center">
        <Button type="button" onClick={spin} disabled={spinning || names.length < 2} size="lg">
          {spinning ? "Spinning..." : "Spin the wheel"}
        </Button>
        {names.length < 2 && (
          <p className="mt-2 text-sm text-muted-foreground">Add at least 2 names to spin.</p>
        )}
      </div>

      {winner && (
        <div className="mt-4 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Winner
          </p>
          <p className="mt-1 text-3xl font-bold">{winner}</p>
        </div>
      )}
    </div>
  );
}
