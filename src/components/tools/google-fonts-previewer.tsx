"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const POPULAR_FONTS = [
  "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Inter", "Merriweather",
  "Playfair Display", "Nunito", "Raleway", "Oswald", "Source Sans Pro", "Lora",
  "Work Sans", "Rubik", "Karla", "Fira Sans", "Space Grotesk",
];

export function GoogleFontsPreviewer() {
  const [family, setFamily] = React.useState("Inter");
  const [text, setText] = React.useState("The quick brown fox jumps over the lazy dog.");
  const [size, setSize] = React.useState(32);
  const [weight, setWeight] = React.useState("400");
  const [loadedFamily, setLoadedFamily] = React.useState<string | null>("Inter");

  function injectFontLink(trimmed: string) {
    const id = `gf-preview-${trimmed.replace(/\s+/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(trimmed)}:wght@100;300;400;500;600;700;900&display=swap`;
      document.head.appendChild(link);
    }
  }

  function loadAndPreview(fam: string) {
    const trimmed = fam.trim();
    if (!trimmed) return;
    injectFontLink(trimmed);
    setLoadedFamily(trimmed);
  }

  React.useEffect(() => {
    injectFontLink("Inter");
  }, []);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <Label className="text-sm text-muted-foreground">Google Font name</Label>
          <Input
            list="popular-fonts"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            placeholder="e.g. Roboto"
            className="mt-1.5"
          />
          <datalist id="popular-fonts">
            {POPULAR_FONTS.map((f) => (
              <option key={f} value={f} />
            ))}
          </datalist>
        </div>
        <Button type="button" className="mt-1.5 self-end" onClick={() => loadAndPreview(family)}>
          Load font
        </Button>
      </div>

      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-3 resize-y" />

      <div className="mt-3 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Size: {size}px
          <input type="range" min={12} max={96} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Weight
          <select value={weight} onChange={(e) => setWeight(e.target.value)} className="rounded-md border bg-transparent px-2 py-1 text-sm">
            {["100", "300", "400", "500", "600", "700", "900"].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loadedFamily && (
        <div className="mt-5 overflow-auto rounded-lg border p-6">
          <p style={{ fontFamily: `'${loadedFamily}', sans-serif`, fontSize: size, fontWeight: Number(weight) }}>
            {text || "Type something to preview"}
          </p>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Loads the font live from Google Fonts. If nothing renders, double-check the exact font
        name matches how it&apos;s listed on fonts.google.com.
      </p>
    </div>
  );
}
