"use client";

import * as React from "react";
import JSZip from "jszip";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Shape {
  x: number; // percent
  y: number;
  w: number;
  h: number;
  text: string;
  isTitle: boolean;
}

interface Slide {
  shapes: Shape[];
}

async function loadPresentation(file: File): Promise<{ slides: Slide[]; aspect: number }> {
  const zip = await JSZip.loadAsync(file);
  const parser = new DOMParser();

  const presXml = await zip.file("ppt/presentation.xml")?.async("string");
  if (!presXml) throw new Error("Missing ppt/presentation.xml — is this a valid .pptx file?");
  const presDoc = parser.parseFromString(presXml, "application/xml");
  const sldSz = presDoc.getElementsByTagNameNS("*", "sldSz")[0];
  const slideW = Number(sldSz?.getAttribute("cx")) || 9144000;
  const slideH = Number(sldSz?.getAttribute("cy")) || 6858000;

  const slideFiles = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => Number(a.match(/(\d+)/)![1]) - Number(b.match(/(\d+)/)![1]));

  if (slideFiles.length === 0) throw new Error("No slides found in this file.");

  const slides: Slide[] = [];
  for (const path of slideFiles) {
    const xml = await zip.file(path)!.async("string");
    const doc = parser.parseFromString(xml, "application/xml");
    const shapes: Shape[] = [];

    for (const sp of Array.from(doc.getElementsByTagNameNS("*", "sp"))) {
      const off = sp.getElementsByTagNameNS("*", "off")[0];
      const ext = sp.getElementsByTagNameNS("*", "ext")[0];
      const nameEl = sp.getElementsByTagNameNS("*", "nvSpPr")[0]?.getElementsByTagNameNS("*", "cNvPr")[0];
      const placeholderType = sp.getElementsByTagNameNS("*", "ph")[0]?.getAttribute("type") ?? "";
      const isTitle = /title/i.test(nameEl?.getAttribute("name") ?? "") || /title/i.test(placeholderType);

      const textRuns = Array.from(sp.getElementsByTagNameNS("*", "t")).map((t) => t.textContent ?? "");
      const text = textRuns.join(" ").trim();
      if (!text) continue;

      const x = off ? (Number(off.getAttribute("x")) / slideW) * 100 : 5;
      const y = off ? (Number(off.getAttribute("y")) / slideH) * 100 : 5;
      const w = ext ? (Number(ext.getAttribute("cx")) / slideW) * 100 : 90;
      const h = ext ? (Number(ext.getAttribute("cy")) / slideH) * 100 : 20;

      shapes.push({ x, y, w, h, text, isTitle });
    }

    slides.push({ shapes });
  }

  return { slides, aspect: slideW / slideH };
}

export function PowerpointViewer() {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [aspect, setAspect] = React.useState(16 / 9);
  const [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const result = await loadPresentation(file);
      setSlides(result.slides);
      setAspect(result.aspect);
      setIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't open this file.");
      setSlides([]);
    }
  }

  const slide = slides[index];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload a PowerPoint file (.pptx)
        <input type="file" accept=".pptx" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {slide && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Slide {index + 1} of {slides.length}</p>
          </div>

          <div
            className="relative mx-auto mt-3 w-full max-w-2xl overflow-hidden rounded-lg border bg-white"
            style={{ aspectRatio: aspect }}
          >
            {slide.shapes.map((shape, i) => (
              <div
                key={i}
                className="absolute overflow-hidden p-1 text-black"
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: `${shape.w}%`,
                  height: `${shape.h}%`,
                  fontSize: shape.isTitle ? "1.1em" : "0.7em",
                  fontWeight: shape.isTitle ? 700 : 400,
                }}
              >
                {shape.text}
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))} disabled={index === slides.length - 1}>
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows an approximate layout of each slide&apos;s text boxes based on their actual position
        and size in the file — this is a structural preview, not a pixel-perfect renderer, so
        fonts, images, and precise styling won&apos;t match PowerPoint exactly.
      </p>
    </div>
  );
}
