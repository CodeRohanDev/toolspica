"use client";

import { Activity } from "lucide-react";
import { formatOperationsCount, useOperationsCount } from "@/hooks/use-operations-count";
import { cn } from "@/lib/utils";

export function LiveOperationsBadge({ className }: { className?: string }) {
  const count = useOperationsCount();

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <Activity className="size-3.5 text-brand" />
      {count === null ? (
        <span className="inline-block h-3 w-10 animate-pulse rounded bg-muted-foreground/30" />
      ) : (
        <span className="text-foreground">{formatOperationsCount(count)}</span>
      )}
      <span>ops done</span>
    </div>
  );
}
