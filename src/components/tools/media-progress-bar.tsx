"use client";

interface MediaProgressBarProps {
  progress: number;
  label?: string;
}

export function MediaProgressBar({ progress, label }: MediaProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(progress * 100)));
  return (
    <div className="mt-3">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{label ?? `Processing... ${pct}%`}</p>
    </div>
  );
}
