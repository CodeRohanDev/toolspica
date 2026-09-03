"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { GITIGNORE_TEMPLATES } from "@/lib/gitignore-templates";

export function GitignoreGenerator() {
  const [selected, setSelected] = React.useState<string[]>(["Node"]);

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  const output = selected
    .map((name) => `# ${name}\n${GITIGNORE_TEMPLATES[name]}`)
    .join("\n\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">
        Select your stack (you can pick more than one)
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.keys(GITIGNORE_TEMPLATES).map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            variant={selected.includes(name) ? "default" : "outline"}
            onClick={() => toggle(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">.gitignore</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output || "Select at least one option above."}
          rows={12}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
