"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface ParsedUa {
  browser: string;
  browserVersion: string;
  os: string;
  device: string;
  engine: string;
}

function parseUserAgent(ua: string): ParsedUa {
  let browser = "Unknown";
  let browserVersion = "";
  let engine = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  if (/Edg\//.test(ua)) {
    browser = "Microsoft Edge";
    browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] ?? "";
  } else if (/OPR\//.test(ua)) {
    browser = "Opera";
    browserVersion = ua.match(/OPR\/([\d.]+)/)?.[1] ?? "";
  } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
    browser = "Chrome";
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "";
  } else if (/Firefox\//.test(ua)) {
    browser = "Firefox";
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] ?? "";
  } else if (/Version\/.*Safari\//.test(ua)) {
    browser = "Safari";
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] ?? "";
  }

  if (/Gecko\//.test(ua) || /Firefox\//.test(ua)) engine = "Gecko";
  else if (/AppleWebKit\//.test(ua)) engine = /Chrome\//.test(ua) || /Edg\//.test(ua) ? "Blink" : "WebKit";

  if (/Windows NT 10\.0/.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  if (/Mobi|Android(?!.*Tablet)/.test(ua) && !/iPad/.test(ua)) device = "Mobile";
  if (/iPad|Tablet/.test(ua)) device = "Tablet";

  return { browser, browserVersion, os, device, engine };
}

export function UserAgentDetector() {
  const [customUa, setCustomUa] = React.useState("");
  const [ownUa, setOwnUa] = React.useState("");

  React.useEffect(() => {
    setOwnUa(navigator.userAgent);
  }, []);

  const activeUa = customUa.trim() || ownUa;
  const parsed = React.useMemo(() => (activeUa ? parseUserAgent(activeUa) : null), [activeUa]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="rounded-lg border bg-muted/40 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your browser&apos;s user agent
          </p>
          {ownUa && <CopyButton value={ownUa} />}
        </div>
        <p className="mt-1.5 font-mono text-xs break-all">{ownUa || "Detecting..."}</p>
      </div>

      <div className="mt-4">
        <label htmlFor="custom-ua" className="text-sm text-muted-foreground">
          Or paste any user agent string to parse
        </label>
        <Textarea
          id="custom-ua"
          value={customUa}
          onChange={(e) => setCustomUa(e.target.value)}
          placeholder="Paste a user agent string here..."
          rows={3}
          className="mt-1.5 resize-y font-mono text-xs"
        />
        {customUa && (
          <Button type="button" variant="ghost" size="sm" className="mt-1.5" onClick={() => setCustomUa("")}>
            Clear and use my own
          </Button>
        )}
      </div>

      {parsed && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Browser", value: `${parsed.browser} ${parsed.browserVersion}`.trim() },
            { label: "Engine", value: parsed.engine },
            { label: "OS", value: parsed.os },
            { label: "Device", value: parsed.device },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
