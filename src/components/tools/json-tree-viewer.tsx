"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { DataTreeNode } from "@/components/tools/data-tree-node";

export function JsonTreeViewer() {
  const [input, setInput] = React.useState('{\n  "name": "Alice",\n  "age": 30,\n  "tags": ["admin", "user"],\n  "active": true\n}');

  const { parsed, error } = React.useMemo(() => {
    try {
      return { parsed: JSON.parse(input) as unknown, error: "" };
    } catch (e) {
      return { parsed: undefined, error: e instanceof Error ? e.message : "Invalid JSON" };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="resize-y font-mono text-sm" />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {parsed !== undefined && (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-muted/30 p-3">
          <DataTreeNode label={null} value={parsed} depth={0} />
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Click any object or array to collapse or expand it. Strings, numbers, and booleans are
        color-coded.
      </p>
    </div>
  );
}
