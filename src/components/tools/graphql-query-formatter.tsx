"use client";

import * as React from "react";
import { parse, print } from "graphql";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

export function GraphqlQueryFormatter() {
  const [input, setInput] = React.useState("query GetUser($id: ID!) { user(id: $id) { name email posts { title } } }");
  const [error, setError] = React.useState<string | null>(null);

  const output = React.useMemo(() => {
    try {
      const ast = parse(input);
      setError(null);
      return print(ast);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid GraphQL query");
      return "";
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste a GraphQL query or mutation..." className="min-h-[200px] font-mono text-sm" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && (
        <>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <p className="text-sm font-medium text-muted-foreground">Formatted query</p>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
        </>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Uses the real graphql-js parser, so it validates syntax while reformatting — not just a text reindenter.</p>
    </div>
  );
}
