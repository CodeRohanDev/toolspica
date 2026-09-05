"use client";

import * as React from "react";
import { Document, Packer, Paragraph } from "docx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Download } from "lucide-react";

export function CoverLetterGenerator() {
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [keyPoints, setKeyPoints] = React.useState("");

  const points = keyPoints.split("\n").map((p) => p.trim()).filter(Boolean);

  const letter = !name.trim()
    ? ""
    : `Dear Hiring Manager,

I am writing to express my interest in the ${position || "[Position]"} role at ${company || "[Company]"}. ${points.length > 0 ? "I believe my background makes me a strong fit for this opportunity, specifically:" : ""}

${points.map((p) => `- ${p}`).join("\n")}

${points.length > 0 ? "\n" : ""}I would welcome the opportunity to discuss how my experience aligns with your team's needs. Thank you for considering my application.

Sincerely,
${name}`;

  async function downloadDocx() {
    if (!letter) return;
    const doc = new Document({
      sections: [{ children: letter.split("\n").map((line) => new Paragraph(line)) }],
    });
    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cover-letter.docx";
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Your name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Company</Label>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">Position</Label>
          <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Marketing Manager" className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">Key points (one per line)</Label>
          <Textarea
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder={"5 years of marketing experience\nLed a team of 8\nIncreased engagement by 40%"}
            rows={3}
            className="mt-1.5 resize-y"
          />
        </div>
      </div>

      {letter && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Cover letter</p>
            <div className="flex gap-2">
              <CopyButton value={letter} />
              <Button type="button" size="sm" variant="outline" onClick={downloadDocx}>
                <Download className="size-4" /> .docx
              </Button>
            </div>
          </div>
          <Textarea readOnly value={letter} rows={12} className="mt-2 resize-y bg-muted/40 text-sm" />
        </div>
      )}
    </div>
  );
}
