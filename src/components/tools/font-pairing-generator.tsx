"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

const PAIRINGS = [
  { heading: "Playfair Display", body: "Source Sans Pro", vibe: "Editorial / Elegant" },
  { heading: "Poppins", body: "Inter", vibe: "Modern / SaaS" },
  { heading: "Merriweather", body: "Lato", vibe: "Blog / Readable" },
  { heading: "Montserrat", body: "Merriweather", vibe: "Contrast / Classic" },
  { heading: "Oswald", body: "Open Sans", vibe: "Bold / Magazine" },
  { heading: "Lora", body: "Nunito Sans", vibe: "Warm / Editorial" },
  { heading: "Raleway", body: "Roboto", vibe: "Clean / Corporate" },
  { heading: "Abril Fatface", body: "Karla", vibe: "Fashion / Statement" },
  { heading: "Space Grotesk", body: "IBM Plex Sans", vibe: "Tech / Developer" },
  { heading: "Bitter", body: "Work Sans", vibe: "Serious / Trustworthy" },
];

function loadFont(family: string) {
  const id = `gf-${family.replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;600;700&display=swap`;
  document.head.appendChild(link);
}

export function FontPairingGenerator() {
  const [index, setIndex] = React.useState(0);
  const pairing = PAIRINGS[index];

  React.useEffect(() => {
    loadFont(pairing.heading);
    loadFont(pairing.body);
  }, [pairing]);

  function shuffle() {
    setIndex((i) => (i + 1) % PAIRINGS.length);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{pairing.vibe}</p>
        <Button type="button" size="sm" variant="outline" onClick={shuffle}>
          <Shuffle className="size-4" /> Shuffle pairing
        </Button>
      </div>

      <div className="mt-5 rounded-lg border p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Heading — {pairing.heading}</p>
        <p className="mt-2 text-3xl font-bold" style={{ fontFamily: `'${pairing.heading}', serif` }}>
          The quick brown fox jumps
        </p>

        <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">Body — {pairing.body}</p>
        <p className="mt-2 text-base leading-relaxed" style={{ fontFamily: `'${pairing.body}', sans-serif` }}>
          Over the lazy dog. This is how your paragraph text will look set in this typeface,
          paired against the heading font above for contrast and hierarchy.
        </p>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Both fonts are loaded live from Google Fonts. Use the CSS font names shown above in your
        own stylesheet or Google Fonts embed.
      </p>
    </div>
  );
}
