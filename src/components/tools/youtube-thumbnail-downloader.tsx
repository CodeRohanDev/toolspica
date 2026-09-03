"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

function extractId(url: string): string | null {
  const patterns = [/youtu\.be\/([a-zA-Z0-9_-]{11})/, /v=([a-zA-Z0-9_-]{11})/, /shorts\/([a-zA-Z0-9_-]{11})/, /^([a-zA-Z0-9_-]{11})$/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const SIZES = [
  { key: "maxresdefault", label: "Max resolution (1280×720)" },
  { key: "sddefault", label: "Standard (640×480)" },
  { key: "hqdefault", label: "High quality (480×360)" },
  { key: "mqdefault", label: "Medium quality (320×180)" },
];

export function YoutubeThumbnailDownloader() {
  const [url, setUrl] = React.useState("");
  const id = extractId(url.trim());

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste a YouTube video URL or ID..." />
      {url && !id && <p className="mt-2 text-sm text-destructive">Couldn&apos;t recognize a YouTube video ID in that input.</p>}
      {id && (
        <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
          {SIZES.map((s) => (
            <div key={s.key} className="overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://img.youtube.com/vi/${id}/${s.key}.jpg`} alt={s.label} className="w-full" />
              <div className="flex items-center justify-between p-2">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <a href={`https://img.youtube.com/vi/${id}/${s.key}.jpg`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary underline">Open full size</a>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">Links open YouTube&apos;s own public thumbnail image directly — right-click and &quot;Save image as&quot; to download.</p>
    </div>
  );
}
