"use client";

import * as React from "react";
import * as yaml from "js-yaml";
import { Textarea } from "@/components/ui/textarea";
import { DataTreeNode } from "@/components/tools/data-tree-node";

export function YamlTreeViewer() {
  const [input, setInput] = React.useState("name: Alice\nage: 30\ntags:\n  - admin\n  - user\nactive: true");

  const { parsed, error } = React.useMemo(() => {
    try {
      return { parsed: yaml.load(input) as unknown, error: "" };
    } catch (e) {
      return { parsed: undefined, error: e instanceof Error ? e.message : "Invalid YAML" };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="resize-y font-mono text-sm" />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {parsed !== undefined && parsed !== null && (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-muted/30 p-3">
          <DataTreeNode label={null} value={parsed} depth={0} />
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Click any object or list to collapse or expand it. Useful for exploring config files like
        docker-compose.yml or GitHub Actions workflows.
      </p>
    </div>
  );
}
