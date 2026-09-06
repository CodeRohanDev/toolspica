"use client";

import * as React from "react";
import * as yaml from "js-yaml";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function JsonYamlConverter() {
  const [jsonInput, setJsonInput] = React.useState('{\n  "name": "Toolspica",\n  "free": true,\n  "tools": ["pdf", "image"]\n}');
  const [yamlInput, setYamlInput] = React.useState("name: Toolspica\nfree: true\ntools:\n  - pdf\n  - image");

  const { yamlOutput, jsonError } = React.useMemo(() => {
    try {
      return { yamlOutput: yaml.dump(JSON.parse(jsonInput), { indent: 2 }), jsonError: null as string | null };
    } catch (err) {
      return { yamlOutput: "", jsonError: err instanceof Error ? err.message : "Invalid JSON" };
    }
  }, [jsonInput]);

  const { jsonOutput, yamlError } = React.useMemo(() => {
    try {
      return { jsonOutput: JSON.stringify(yaml.load(yamlInput), null, 2), yamlError: null as string | null };
    } catch (err) {
      return { jsonOutput: "", yamlError: err instanceof Error ? err.message : "Invalid YAML" };
    }
  }, [yamlInput]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">JSON to YAML</p>
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste JSON..."
          className="mt-3 min-h-[200px] font-mono text-sm"
        />
        {jsonError && <p className="mt-3 text-sm text-destructive">{jsonError}</p>}
        {!jsonError && (
          <>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <p className="text-sm font-medium text-muted-foreground">YAML output</p>
              <CopyButton value={yamlOutput} label="Copy" />
            </div>
            <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{yamlOutput}</pre>
          </>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">YAML to JSON</p>
        <Textarea
          value={yamlInput}
          onChange={(e) => setYamlInput(e.target.value)}
          placeholder="Paste YAML..."
          className="mt-3 min-h-[200px] font-mono text-sm"
        />
        {yamlError && <p className="mt-3 text-sm text-destructive">{yamlError}</p>}
        {!yamlError && (
          <>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <p className="text-sm font-medium text-muted-foreground">JSON output</p>
              <CopyButton value={jsonOutput} label="Copy" />
            </div>
            <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{jsonOutput}</pre>
          </>
        )}
      </div>
    </div>
  );
}
