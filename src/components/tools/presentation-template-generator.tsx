"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X, Download } from "lucide-react";

interface SlideDraft {
  title: string;
  bullets: string;
}

const THEMES = [
  { name: "Navy", bg: "1E3A5F", accent: "4F9DDE", text: "FFFFFF" },
  { name: "Light", bg: "FFFFFF", accent: "2563EB", text: "111827" },
  { name: "Forest", bg: "0F3D2E", accent: "4ADE80", text: "FFFFFF" },
  { name: "Warm", bg: "FEF3C7", accent: "B45309", text: "111827" },
];

export function PresentationTemplateGenerator() {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [slides, setSlides] = React.useState<SlideDraft[]>([{ title: "", bullets: "" }]);
  const [themeIndex, setThemeIndex] = React.useState(0);
  const [generating, setGenerating] = React.useState(false);
  const theme = THEMES[themeIndex];

  function updateSlide(index: number, field: keyof SlideDraft, value: string) {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSlide() {
    setSlides((prev) => [...prev, { title: "", bullets: "" }]);
  }

  function removeSlide(index: number) {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }

  async function download() {
    if (!title.trim()) return;
    setGenerating(true);
    try {
      const PptxGenJS = (await import("pptxgenjs")).default;
      const pptx = new PptxGenJS();

      const titleSlide = pptx.addSlide();
      titleSlide.background = { color: theme.bg };
      titleSlide.addText(title, {
        x: 0.5, y: 2.2, w: 9, h: 1.2,
        fontSize: 36, bold: true, color: theme.text, align: "center",
      });
      if (subtitle.trim()) {
        titleSlide.addText(subtitle, {
          x: 0.5, y: 3.3, w: 9, h: 0.6,
          fontSize: 18, color: theme.accent, align: "center",
        });
      }

      for (const slide of slides) {
        if (!slide.title.trim()) continue;
        const s = pptx.addSlide();
        s.background = { color: theme.bg };
        s.addText(slide.title, {
          x: 0.5, y: 0.4, w: 9, h: 0.8,
          fontSize: 28, bold: true, color: theme.accent,
        });
        const bulletLines = slide.bullets
          .split("\n")
          .map((b) => b.trim())
          .filter(Boolean);
        if (bulletLines.length > 0) {
          s.addText(
            bulletLines.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
            { x: 0.7, y: 1.5, w: 8.5, h: 4.5, fontSize: 18, color: theme.text }
          );
        }
      }

      await pptx.writeFile({ fileName: `${title.replace(/[^a-z0-9]/gi, "-") || "presentation"}.pptx` });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Presentation title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Subtitle (optional)</Label>
          <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-1.5" />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {THEMES.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setThemeIndex(i)}
            className={`size-8 rounded-full border-2 ${i === themeIndex ? "border-foreground" : "border-transparent"}`}
            style={{ backgroundColor: `#${t.bg}` }}
            aria-label={t.name}
          />
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {slides.map((slide, i) => (
          <div key={i} className="relative rounded-lg border p-3">
            {slides.length > 1 && (
              <button type="button" onClick={() => removeSlide(i)} className="absolute right-2 top-2 text-muted-foreground hover:text-destructive" aria-label="Remove slide">
                <X className="size-4" />
              </button>
            )}
            <Label className="text-xs text-muted-foreground">Slide {i + 1} title</Label>
            <Input value={slide.title} onChange={(e) => updateSlide(i, "title", e.target.value)} className="mt-1" />
            <Label className="mt-2 block text-xs text-muted-foreground">Bullet points (one per line)</Label>
            <Textarea value={slide.bullets} onChange={(e) => updateSlide(i, "bullets", e.target.value)} rows={3} className="mt-1 resize-y" />
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addSlide}>
          <Plus className="size-4" /> Add slide
        </Button>
        <Button type="button" onClick={download} disabled={!title.trim() || generating}>
          <Download className="size-4" />
          {generating ? "Building..." : "Download .pptx"}
        </Button>
      </div>
    </div>
  );
}
