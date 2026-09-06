"use client";

import * as React from "react";

export function useObjectUrl(blob: Blob | File | null | undefined): string | null {
  const [url, setUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!blob) {
      Promise.resolve().then(() => setUrl(null));
      return;
    }
    const next = URL.createObjectURL(blob);
    Promise.resolve().then(() => setUrl(next));
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url;
}
