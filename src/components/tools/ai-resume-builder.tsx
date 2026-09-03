"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadPdfBytes } from "@/lib/pdf/pdf-helpers";

export function AiResumeBuilder() {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  async function generate() {
    setProcessing(true);
    try {
      const doc = await PDFDocument.create();
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const regular = await doc.embedFont(StandardFonts.Helvetica);
      let page = doc.addPage([612, 792]);
      let y = 740;
      const margin = 54;
      const maxWidth = 612 - margin * 2;

      function newPageIfNeeded(needed: number) {
        if (y - needed < margin) {
          page = doc.addPage([612, 792]);
          y = 740;
        }
      }

      function wrapText(text: string, font: typeof regular, size: number) {
        const words = text.split(/\s+/);
        const lines: string[] = [];
        let line = "";
        for (const w of words) {
          const test = line ? `${line} ${w}` : w;
          if (font.widthOfTextAtSize(test, size) > maxWidth) {
            if (line) lines.push(line);
            line = w;
          } else line = test;
        }
        if (line) lines.push(line);
        return lines;
      }

      function drawParagraph(text: string, size = 10.5, font = regular, gap = 14) {
        for (const rawLine of text.split("\n")) {
          if (!rawLine.trim()) { y -= gap * 0.6; continue; }
          for (const line of wrapText(rawLine, font, size)) {
            newPageIfNeeded(gap);
            page.drawText(line, { x: margin, y, size, font, color: rgb(0.15, 0.15, 0.15) });
            y -= gap;
          }
        }
      }

      function drawHeading(text: string) {
        newPageIfNeeded(24);
        y -= 6;
        page.drawText(text.toUpperCase(), { x: margin, y, size: 12, font: bold, color: rgb(0.1, 0.1, 0.1) });
        y -= 4;
        page.drawLine({ start: { x: margin, y }, end: { x: 612 - margin, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
        y -= 16;
      }

      page.drawText(name || "Your Name", { x: margin, y, size: 22, font: bold, color: rgb(0.1, 0.1, 0.1) });
      y -= 26;
      if (title) { page.drawText(title, { x: margin, y, size: 13, font: regular, color: rgb(0.35, 0.35, 0.35) }); y -= 20; }
      if (contact) { page.drawText(contact, { x: margin, y, size: 10, font: regular, color: rgb(0.4, 0.4, 0.4) }); y -= 22; }

      if (summary.trim()) { drawHeading("Summary"); drawParagraph(summary); y -= 8; }
      if (experience.trim()) { drawHeading("Experience"); drawParagraph(experience); y -= 8; }
      if (education.trim()) { drawHeading("Education"); drawParagraph(education); y -= 8; }
      if (skills.trim()) { drawHeading("Skills"); drawParagraph(skills.split(",").map((s) => s.trim()).filter(Boolean).join(" · ")); }

      const bytes = await doc.save();
      downloadPdfBytes(bytes, `${(name || "resume").toLowerCase().replace(/\s+/g, "-")}-resume.pdf`);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title (e.g. Product Designer)" />
      </div>
      <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Email · Phone · City · LinkedIn" className="mt-3" />
      <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Professional summary (2-3 sentences)" className="mt-3 min-h-[70px]" />
      <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder={"Experience — one entry per line, e.g.\nSenior Designer, Acme Co. (2021-2024) — Led redesign of core product, increasing retention 18%."} className="mt-3 min-h-[110px]" />
      <Textarea value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Education — degree, school, year" className="mt-3 min-h-[60px]" />
      <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" className="mt-3" />
      <Button type="button" className="mt-4" onClick={generate} disabled={!name.trim() || processing}>
        <Download className="size-4" />
        {processing ? "Building..." : "Generate resume PDF"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">Uses a smart formatting algorithm to lay out a clean, single-column resume — not a generative AI model.</p>
    </div>
  );
}
