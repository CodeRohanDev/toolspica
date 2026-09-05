"use client";

import * as React from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ResumeBuilder() {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [skills, setSkills] = React.useState("");

  async function download() {
    if (!name.trim()) return;

    function section(title: string, body: string) {
      if (!body.trim()) return [];
      return [
        new Paragraph({ text: title, heading: HeadingLevel.HEADING_2, spacing: { before: 200 } }),
        ...body.split("\n").filter(Boolean).map((line) => new Paragraph(line)),
      ];
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: name, bold: true, size: 32 })] }),
            new Paragraph({ text: contact, spacing: { after: 200 } }),
            ...section("Summary", summary),
            ...section("Experience", experience),
            ...section("Education", education),
            ...section("Skills", skills),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.docx";
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Contact info</Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="jane@email.com · 555-1234 · linkedin.com/in/jane" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Summary</Label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="mt-1.5 resize-y" />
      </div>
      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Experience (one entry per line)</Label>
        <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={4} className="mt-1.5 resize-y" />
      </div>
      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Education (one entry per line)</Label>
        <Textarea value={education} onChange={(e) => setEducation(e.target.value)} rows={2} className="mt-1.5 resize-y" />
      </div>
      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Skills (one per line, or comma-separated)</Label>
        <Textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={2} className="mt-1.5 resize-y" />
      </div>

      <Button type="button" className="mt-4" onClick={download} disabled={!name.trim()}>
        <Download className="size-4" /> Download as .docx
      </Button>
    </div>
  );
}
