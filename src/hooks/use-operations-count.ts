"use client";

import * as React from "react";
import { getPendingCount, onOperationTracked } from "@/lib/track-operation";

export function formatOperationsCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K+`;
  return `${n}+`;
}

/**
 * Server-confirmed count (CDN-cached ~30s via the route's Cache-Control
 * header) topped up with anything this tab has buffered but not flushed
 * yet, then bumped live as more operations happen in this session.
 */
export function useOperationsCount(): number | null {
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/track-operation")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data?.count === "number") {
          setCount(data.count + getPendingCount());
        }
      })
      .catch(() => {
        // Stay in the loading state rather than showing a wrong number.
      });

    const unsubscribe = onOperationTracked((delta) => {
      setCount((prev) => (prev === null ? prev : prev + delta));
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return count;
}
