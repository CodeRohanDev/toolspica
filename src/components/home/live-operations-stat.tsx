"use client";

import { Activity } from "lucide-react";
import { formatOperationsCount, useOperationsCount } from "@/hooks/use-operations-count";

export function LiveOperationsStat() {
  const count = useOperationsCount();

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border bg-card px-4 py-6 text-center">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Activity className="size-4" />
      </span>
      <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {count === null ? (
          <span className="inline-block h-8 w-16 animate-pulse rounded bg-muted align-middle" />
        ) : (
          formatOperationsCount(count)
        )}
      </p>
      <div>
        <p className="text-sm font-medium">Operations done</p>
        <p className="mt-0.5 text-xs text-muted-foreground">by everyone, so far</p>
      </div>
    </div>
  );
}
