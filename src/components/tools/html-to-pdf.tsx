"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const SAMPLE = `<h1>Sample document</h1>\n<p>Paste your own HTML on the left, then click <strong>Print / Save as PDF</strong> and choose "Save as PDF" as the destination in the print dialog.</p>`;

export function HtmlToPdf() {
  const [html, setHtml] = React.useState(SAMPLE);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  function updatePreview(next: string) {
    setHtml(next);
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;padding:24px;color:#111;line-height:1.5;}</style></head><body>${next}</body></html>`);
      doc.close();
    }
  }

  React.useEffect(() => {
    updatePreview(SAMPLE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function printPdf() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.focus();
    win.print();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">HTML source</label>
          <textarea
            value={html}
            onChange={(e) => updatePreview(e.target.value)}
            spellCheck={false}
            className="mt-1.5 h-80 w-full resize-y rounded-lg border bg-background p-3 font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Preview</label>
          <iframe ref={iframeRef} title="HTML preview" className="mt-1.5 h-80 w-full rounded-lg border bg-white" />
        </div>
      </div>

      <Button type="button" className="mt-4" onClick={printPdf}>
        <Printer className="size-4" /> Print / Save as PDF
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Opens your browser&apos;s print dialog rendering the HTML above — choose &quot;Save as
        PDF&quot; as the destination. Everything runs in your browser; nothing is uploaded anywhere.
      </p>
    </div>
  );
}
