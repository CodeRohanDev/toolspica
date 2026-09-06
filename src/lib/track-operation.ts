"use client";

// Buffers operation counts in this tab and flushes them in one batched
// request, instead of firing a network call per tool operation. See
// src/app/api/track-operation/route.ts for the server side.

let pending = 0;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const FLUSH_DELAY_MS = 4000;
const FLUSH_AT_COUNT = 20;

type Listener = (delta: number) => void;
const listeners = new Set<Listener>();

/** Any not-yet-flushed operations from this tab's session — add to a freshly-fetched server count for an accurate initial display. */
export function getPendingCount() {
  return pending;
}

/** Fires with +1 every time trackOperation() is called while subscribed — lets a live counter tick up instantly instead of waiting for the next server fetch. */
export function onOperationTracked(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function flush() {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (pending <= 0) return;

  const amount = pending;
  pending = 0;

  const body = JSON.stringify({ amount });
  const sent =
    typeof navigator !== "undefined" && "sendBeacon" in navigator
      ? navigator.sendBeacon(
          "/api/track-operation",
          new Blob([body], { type: "application/json" })
        )
      : false;

  if (!sent) {
    fetch("/api/track-operation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Best-effort — a dropped operation count isn't worth retry logic.
    });
  }
}

/** Call this once whenever a tool finishes producing a result (a merge, a resize, a conversion, etc). */
export function trackOperation() {
  pending += 1;
  listeners.forEach((listener) => listener(1));

  if (pending >= FLUSH_AT_COUNT) {
    flush();
    return;
  }

  if (!flushTimer) {
    flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}
