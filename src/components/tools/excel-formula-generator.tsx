"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface FormulaField {
  key: string;
  label: string;
  placeholder: string;
}

interface FormulaTemplate {
  name: string;
  description: string;
  fields: FormulaField[];
  build: (v: Record<string, string>) => string;
}

const TEMPLATES: FormulaTemplate[] = [
  {
    name: "VLOOKUP",
    description: "Look up a value in the first column of a range and return a value from another column.",
    fields: [
      { key: "lookup", label: "Lookup value / cell", placeholder: "A2" },
      { key: "range", label: "Table range", placeholder: "Sheet2!A:D" },
      { key: "col", label: "Column index to return", placeholder: "3" },
    ],
    build: (v) => `=VLOOKUP(${v.lookup || "A2"}, ${v.range || "Sheet2!A:D"}, ${v.col || "3"}, FALSE)`,
  },
  {
    name: "IF",
    description: "Return one value if a condition is true, another if false.",
    fields: [
      { key: "condition", label: "Condition", placeholder: "A2>100" },
      { key: "trueVal", label: "Value if true", placeholder: "\"High\"" },
      { key: "falseVal", label: "Value if false", placeholder: "\"Low\"" },
    ],
    build: (v) => `=IF(${v.condition || "A2>100"}, ${v.trueVal || "\"High\""}, ${v.falseVal || "\"Low\""})`,
  },
  {
    name: "SUMIF",
    description: "Sum values in a range that meet a single condition.",
    fields: [
      { key: "range", label: "Range to check", placeholder: "A2:A100" },
      { key: "criteria", label: "Criteria", placeholder: "\">100\"" },
      { key: "sumRange", label: "Range to sum", placeholder: "B2:B100" },
    ],
    build: (v) => `=SUMIF(${v.range || "A2:A100"}, ${v.criteria || "\">100\""}, ${v.sumRange || "B2:B100"})`,
  },
  {
    name: "COUNTIF",
    description: "Count cells in a range that meet a condition.",
    fields: [
      { key: "range", label: "Range to check", placeholder: "A2:A100" },
      { key: "criteria", label: "Criteria", placeholder: "\"Yes\"" },
    ],
    build: (v) => `=COUNTIF(${v.range || "A2:A100"}, ${v.criteria || "\"Yes\""})`,
  },
  {
    name: "INDEX/MATCH",
    description: "A more flexible alternative to VLOOKUP — look up a value anywhere, not just left-to-right.",
    fields: [
      { key: "returnRange", label: "Range to return from", placeholder: "B:B" },
      { key: "lookup", label: "Lookup value / cell", placeholder: "A2" },
      { key: "lookupRange", label: "Range to search", placeholder: "C:C" },
    ],
    build: (v) => `=INDEX(${v.returnRange || "B:B"}, MATCH(${v.lookup || "A2"}, ${v.lookupRange || "C:C"}, 0))`,
  },
  {
    name: "CONCATENATE",
    description: "Join text from multiple cells into one, with an optional separator.",
    fields: [
      { key: "a", label: "First cell", placeholder: "A2" },
      { key: "sep", label: "Separator", placeholder: "\" \"" },
      { key: "b", label: "Second cell", placeholder: "B2" },
    ],
    build: (v) => `=CONCATENATE(${v.a || "A2"}, ${v.sep || "\" \""}, ${v.b || "B2"})`,
  },
];

export function ExcelFormulaGenerator() {
  const [templateIndex, setTemplateIndex] = React.useState(0);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const template = TEMPLATES[templateIndex];

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const formula = template.build(values);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((t, i) => (
          <Button key={t.name} type="button" size="sm" variant={i === templateIndex ? "default" : "outline"} onClick={() => { setTemplateIndex(i); setValues({}); }}>
            {t.name}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{template.description}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {template.fields.map((f) => (
          <div key={f.key}>
            <Label className="text-sm text-muted-foreground">{f.label}</Label>
            <Input
              value={values[f.key] ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="mt-1.5 font-mono"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Formula</p>
          <CopyButton value={formula} />
        </div>
        <p className="mt-2 rounded-md border bg-muted/40 p-3 font-mono text-sm">{formula}</p>
      </div>
    </div>
  );
}
