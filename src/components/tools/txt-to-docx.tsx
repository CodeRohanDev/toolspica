"use client";

import * as React from "react";
import { Document, Packer, Paragraph } from "docx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function TxtToDocx() {
  const [text, setText] = React.useState("");

  async function download() {
    if (!text.trim()) return;
    const doc = new Document({
      sections: [
        {
          children: text.split("\n").map((line) => new Paragraph(line)),
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.docx";
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={12}
        className="resize-y"
      />
      <Button type="button" className="mt-4" onClick={download} disabled={!text.trim()}>
        <Download className="size-4" /> Download as .docx
      </Button>
    </div>
  );
}
