"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).toString();
  } catch {
    return null;
  }
}

export function WebsiteScreenshotTool() {
  const [input, setInput] = React.useState("");
  const [targetUrl, setTargetUrl] = React.useState<string | null>(null);
  const [cacheBust, setCacheBust] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  function capture() {
    const normalized = normalizeUrl(input);
    setTargetUrl(normalized);
    setLoaded(false);
    setCacheBust((n) => n + 1);
  }

  const screenshotSrc = targetUrl
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1280&h=800&_=${cacheBust}`
    : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="screenshot-url" className="text-sm text-muted-foreground">
        Website URL
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="screenshot-url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && capture()}
        />
        <Button type="button" onClick={capture}>
          Capture
        </Button>
      </div>

      {input && !normalizeUrl(input) && (
        <p className="mt-2 text-sm text-destructive">Enter a valid website URL.</p>
      )}

      {screenshotSrc && (
        <div className="mt-5">
          <div className="overflow-hidden rounded-lg border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotSrc}
              alt={`Screenshot of ${targetUrl}`}
              className="w-full"
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              {loaded
                ? "If this looks like a placeholder, the screenshot is still rendering — try refreshing in a few seconds."
                : "Loading screenshot..."}
            </p>
            <Button type="button" variant="outline" size="sm" onClick={() => setCacheBust((n) => n + 1)}>
              <RefreshCw className="size-3.5" /> Refresh
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
