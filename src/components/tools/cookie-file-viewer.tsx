"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface CookieEntry {
  domain: string;
  path: string;
  secure: string;
  expiry: string;
  name: string;
  value: string;
}

function parseNetscapeCookies(text: string): CookieEntry[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const parts = line.split("\t");
      if (parts.length < 7) return null;
      const [domain, , path, secure, expiry, name, value] = parts;
      return { domain, path, secure, expiry, name, value };
    })
    .filter((c): c is CookieEntry => c !== null);
}

export function CookieFileViewer() {
  const [input, setInput] = React.useState("");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const cookies = React.useMemo(() => parseNetscapeCookies(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload a cookie file
        <input type="file" accept=".txt" onChange={handleUpload} className="hidden" />
      </label>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Paste a Netscape-format cookies.txt file's content, or upload one above..."}
        rows={16}
        className="mt-3 resize-y font-mono text-xs"
      />

      {cookies.length > 0 ? (
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="p-2 text-left font-medium text-muted-foreground">Domain</th>
                <th className="p-2 text-left font-medium text-muted-foreground">Name</th>
                <th className="p-2 text-left font-medium text-muted-foreground">Value</th>
                <th className="p-2 text-left font-medium text-muted-foreground">Path</th>
                <th className="p-2 text-left font-medium text-muted-foreground">Secure</th>
                <th className="p-2 text-left font-medium text-muted-foreground">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((c, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-2 font-mono text-xs">{c.domain}</td>
                  <td className="p-2 font-mono text-xs font-medium">{c.name}</td>
                  <td className="max-w-[200px] truncate p-2 font-mono text-xs text-muted-foreground" title={c.value}>{c.value}</td>
                  <td className="p-2 font-mono text-xs text-muted-foreground">{c.path}</td>
                  <td className="p-2 text-xs text-muted-foreground">{c.secure === "TRUE" ? "Yes" : "No"}</td>
                  <td className="p-2 font-mono text-xs text-muted-foreground">
                    {c.expiry === "0" ? "Session" : new Date(Number(c.expiry) * 1000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        input.trim() && <p className="mt-3 text-sm text-destructive">No valid cookie entries found — expected tab-separated Netscape cookie file format.</p>
      )}
    </div>
  );
}
