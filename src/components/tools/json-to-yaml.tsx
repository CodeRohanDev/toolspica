"use client";

import * as React from "react";
import yaml from "js-yaml";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function JsonToYaml() {
  const [input, setInput] = React.useState('{\n  "name": "Toolspica",\n  "free": true,\n  "tools": ["pdf", "image"]\n}');
  const [error, setError] = React.useState<string | null>(null);

  const output = React.useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      setError(null);
      return yaml.dump(parsed, { indent: 2 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      return "";
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON..." className="min-h-[200px] font-mono text-sm" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && (
        <>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <p className="text-sm font-medium text-muted-foreground">YAML output</p>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
