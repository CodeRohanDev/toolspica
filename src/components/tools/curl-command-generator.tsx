"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export function CurlCommandGenerator() {
  const [method, setMethod] = React.useState("GET");
  const [url, setUrl] = React.useState("");
  const [headers, setHeaders] = React.useState("Content-Type: application/json");
  const [body, setBody] = React.useState("");

  const command = React.useMemo(() => {
    if (!url) return "";
    const parts = [`curl -X ${method}`, `'${url}'`];
    headers
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean)
      .forEach((header) => parts.push(`-H '${header}'`));
    if (body.trim() && method !== "GET") {
      parts.push(`-d '${body.trim().replace(/'/g, "'\\''")}'`);
    }
    return parts.join(" \\\n  ");
  }, [method, url, headers, body]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        {METHODS.map((m) => (
          <Button
            key={m}
            type="button"
            size="sm"
            variant={method === m ? "default" : "outline"}
            onClick={() => setMethod(m)}
          >
            {m}
          </Button>
        ))}
      </div>

      <Label htmlFor="curl-url" className="mt-4 block text-sm text-muted-foreground">
        URL
      </Label>
      <Input
        id="curl-url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com/v1/users"
        className="mt-1.5 font-mono"
      />

      <Label htmlFor="curl-headers" className="mt-4 block text-sm text-muted-foreground">
        Headers (one per line, Key: Value)
      </Label>
      <Textarea
        id="curl-headers"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        rows={3}
        className="mt-1.5 resize-y font-mono text-sm"
      />

      {method !== "GET" && (
        <>
          <Label htmlFor="curl-body" className="mt-4 block text-sm text-muted-foreground">
            Request body (JSON or raw)
          </Label>
          <Textarea
            id="curl-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="mt-1.5 resize-y font-mono text-sm"
          />
        </>
      )}

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">curl command</p>
          <CopyButton value={command} />
        </div>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-muted/40 p-3 font-mono text-xs">
          {command || "Enter a URL above..."}
        </pre>
      </div>
    </div>
  );
}
