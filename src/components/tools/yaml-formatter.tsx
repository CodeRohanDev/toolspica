"use client";

import * as React from "react";
import * as yaml from "js-yaml";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function YamlFormatter() {
  const [input, setInput] = React.useState("name: Toolspica\nfree: true\ntools:\n  - pdf\n  - image\n  - video");
  const [error, setError] = React.useState<string | null>(null);

  const output = React.useMemo(() => {
    try {
      const parsed = yaml.load(input);
      setError(null);
      return yaml.dump(parsed, { indent: 2 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid YAML");
      return "";
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste YAML..." className="min-h-[200px] font-mono text-sm" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && (
        <>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <p className="text-sm font-medium text-muted-foreground">Formatted YAML</p>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
