"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import type { LegalDocFields } from "@/lib/legal-templates";

export function LegalDocGenerator({
  generate,
}: {
  generate: (fields: LegalDocFields) => string;
}) {
  const [fields, setFields] = React.useState<LegalDocFields>({
    companyName: "",
    website: "",
    email: "",
    effectiveDate: "",
  });

  const output = generate(fields);

  function update<K extends keyof LegalDocFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Company / site name</Label>
          <Input
            value={fields.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="Acme Inc."
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Website</Label>
          <Input
            value={fields.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="acme.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Contact email</Label>
          <Input
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="hello@acme.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Effective date</Label>
          <Input
            value={fields.effectiveDate}
            onChange={(e) => update("effectiveDate", e.target.value)}
            placeholder="January 1, 2026"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Generated document</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={18}
          className="mt-2 resize-y bg-muted/40 font-mono text-xs"
        />
      </div>
    </div>
  );
}
