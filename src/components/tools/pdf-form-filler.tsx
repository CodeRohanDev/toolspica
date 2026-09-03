"use client";

import * as React from "react";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

type FieldInfo =
  | { type: "text"; name: string }
  | { type: "checkbox"; name: string }
  | { type: "dropdown"; name: string; options: string[] }
  | { type: "radio"; name: string; options: string[] };

export function PdfFormFiller() {
  const [file, setFile] = React.useState<File | null>(null);
  const [doc, setDoc] = React.useState<PDFDocument | null>(null);
  const [fields, setFields] = React.useState<FieldInfo[]>([]);
  const [values, setValues] = React.useState<Record<string, string | boolean>>({});
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    try {
      const bytes = await picked.arrayBuffer();
      const loaded = await PDFDocument.load(bytes);
      setDoc(loaded);
      const form = loaded.getForm();
      const infos: FieldInfo[] = [];
      for (const field of form.getFields()) {
        const name = field.getName();
        if (field instanceof PDFTextField) infos.push({ type: "text", name });
        else if (field instanceof PDFCheckBox) infos.push({ type: "checkbox", name });
        else if (field instanceof PDFDropdown) infos.push({ type: "dropdown", name, options: field.getOptions() });
        else if (field instanceof PDFRadioGroup) infos.push({ type: "radio", name, options: field.getOptions() });
      }
      setFields(infos);
    } catch {
      setError("Couldn't read this PDF — it may be corrupted or password-protected.");
    }
  }

  async function apply() {
    if (!file || !doc) return;
    setProcessing(true);
    setError(null);
    try {
      const form = doc.getForm();
      for (const f of fields) {
        const value = values[f.name];
        if (value === undefined) continue;
        if (f.type === "text") form.getTextField(f.name).setText(String(value));
        else if (f.type === "checkbox") {
          const cb = form.getCheckBox(f.name);
          if (value) cb.check();
          else cb.uncheck();
        } else if (f.type === "dropdown") form.getDropdown(f.name).select(String(value));
        else if (f.type === "radio") form.getRadioGroup(f.name).select(String(value));
      }
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-filled.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't fill this form.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {file && doc && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {fields.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">This PDF has no fillable form fields.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <Label htmlFor={`field-${f.name}`} className="text-sm text-muted-foreground">
                    {f.name}
                  </Label>
                  {f.type === "text" && (
                    <Input
                      id={`field-${f.name}`}
                      className="mt-1.5"
                      value={String(values[f.name] ?? "")}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    />
                  )}
                  {f.type === "checkbox" && (
                    <div className="mt-1.5">
                      <Switch
                        checked={Boolean(values[f.name])}
                        onCheckedChange={(checked) => setValues((v) => ({ ...v, [f.name]: checked }))}
                      />
                    </div>
                  )}
                  {(f.type === "dropdown" || f.type === "radio") && (
                    <Select
                      value={String(values[f.name] ?? "")}
                      onValueChange={(val) => val && setValues((v) => ({ ...v, [f.name]: val }))}
                    >
                      <SelectTrigger className="mt-1.5 w-full">
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button type="button" className="mt-4" onClick={apply} disabled={processing || fields.length === 0}>
            <Download className="size-4" />
            {processing ? "Saving..." : "Save filled form and download"}
          </Button>
        </>
      )}
    </div>
  );
}
