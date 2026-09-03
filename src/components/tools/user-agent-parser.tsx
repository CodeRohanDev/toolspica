"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

function parseUA(ua: string) {
  const browser =
    /Edg\//.test(ua) ? "Microsoft Edge" :
    /OPR\//.test(ua) ? "Opera" :
    /Chrome\//.test(ua) ? "Chrome" :
    /Firefox\//.test(ua) ? "Firefox" :
    /Safari\//.test(ua) && !/Chrome/.test(ua) ? "Safari" : "Unknown";
  const os =
    /Windows NT 10/.test(ua) ? "Windows 10/11" :
    /Windows/.test(ua) ? "Windows" :
    /Mac OS X/.test(ua) ? "macOS" :
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad/.test(ua) ? "iOS" :
    /Linux/.test(ua) ? "Linux" : "Unknown";
  const device = /Mobile|Android|iPhone/.test(ua) ? "Mobile" : /iPad|Tablet/.test(ua) ? "Tablet" : "Desktop";
  const engine = /Gecko\/\d/.test(ua) ? "Gecko" : /WebKit/.test(ua) ? "WebKit/Blink" : "Unknown";
  const versionMatch = ua.match(/(Chrome|Firefox|Version|Edg)\/([\d.]+)/);
  return { browser, os, device, engine, version: versionMatch?.[2] ?? "Unknown" };
}

export function UserAgentParser() {
  const [ua, setUa] = React.useState(typeof navigator !== "undefined" ? navigator.userAgent : "");
  const result = React.useMemo(() => parseUA(ua), [ua]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={ua} onChange={(e) => setUa(e.target.value)} placeholder="Paste a User-Agent string..." className="min-h-[80px] font-mono text-sm" />
      <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4">
        {[["Browser", result.browser], ["Version", result.version], ["OS", result.os], ["Device", result.device]].map(([label, value]) => (
          <div key={label} className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
