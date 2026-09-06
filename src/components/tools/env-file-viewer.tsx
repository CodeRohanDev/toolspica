"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";

interface EnvEntry {
  key: string;
  value: string;
  comment: boolean;
}

function parseEnv(text: string): EnvEntry[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("#")) return { key: line, value: "", comment: true };
      const eq = line.indexOf("=");
      if (eq === -1) return { key: line, value: "", comment: false };
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      return { key, value, comment: false };
    });
}

export function EnvFileViewer() {
  const [input, setInput] = React.useState("");
  const [reveal, setReveal] = React.useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const entries = React.useMemo(() => parseEnv(input), [input]);
  const varCount = entries.filter((e) => !e.comment).length;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <input type="file" accept=".env,.txt" onChange={handleUpload} className="text-sm" />
        <Button type="button" size="sm" variant="outline" onClick={() => setReveal((r) => !r)}>
          {reveal ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          {reveal ? "Hide values" : "Reveal values"}
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Paste .env content, or upload a file above...\nAPI_KEY=abc123\nDEBUG=true"}
        rows={16}
        className="mt-3 resize-y font-mono text-sm"
      />

      {varCount > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-2 text-sm text-muted-foreground">{varCount} variable{varCount === 1 ? "" : "s"}</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {entries.map((entry, i) =>
                  entry.comment ? (
                    <tr key={i} className="border-b last:border-b-0">
                      <td colSpan={3} className="px-3 py-1.5 font-mono text-xs text-muted-foreground">{entry.key}</td>
                    </tr>
                  ) : (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="px-3 py-1.5 font-mono font-medium">{entry.key}</td>
                      <td className="px-3 py-1.5 font-mono text-muted-foreground">
                        {reveal ? entry.value : "•".repeat(Math.min(entry.value.length, 12)) || "—"}
                      </td>
                      <td className="w-8 px-2 py-1.5">
                        <CopyButton value={entry.value} label="" />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
