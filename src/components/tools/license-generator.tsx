"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { LICENSE_GENERATORS } from "@/lib/license-templates";

export function LicenseGenerator() {
  const [license, setLicense] = React.useState("MIT");
  const [author, setAuthor] = React.useState("");
  const [year, setYear] = React.useState("2026");

  const output = LICENSE_GENERATORS[license](author || "[Your Name]", year || "[Year]");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {Object.keys(LICENSE_GENERATORS).map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            variant={license === name ? "default" : "outline"}
            onClick={() => setLicense(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="license-author" className="text-sm text-muted-foreground">
            Author / copyright holder
          </Label>
          <Input
            id="license-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Jane Doe"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="license-year" className="text-sm text-muted-foreground">
            Year
          </Label>
          <Input
            id="license-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">LICENSE</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={14}
          className="mt-2 resize-y bg-muted/40 font-mono text-xs"
        />
      </div>
    </div>
  );
}
