"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function generateUuids(count: number): string[] {
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export function UuidGenerator() {
  const [count, setCount] = React.useState(5);
  const [uuids, setUuids] = React.useState<string[]>([]);

  function handleGenerate() {
    setUuids(generateUuids(Math.max(1, Math.min(count, 100))));
  }

  const output = uuids.join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="uuid-count" className="text-sm text-muted-foreground">
            How many (max 100)
          </Label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1.5 w-28"
          />
        </div>
        <Button type="button" size="sm" onClick={handleGenerate}>
          Generate UUID v4
        </Button>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {uuids.length > 0 ? `${uuids.length} UUID(s)` : "Result"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={8}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
