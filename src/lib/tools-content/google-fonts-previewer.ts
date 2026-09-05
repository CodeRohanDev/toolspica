import type { ToolContent } from "./types";

export const googleFontsPreviewerContent: ToolContent = {
  heroSubtitle: "Preview Any Google Font with Your Own Text",
  overview: [
    "Browsing Google Fonts' own site shows a font in its default sample text, which rarely tells you how it'll actually look with your real heading, your real paragraph, or your brand name — especially for fonts with unusual character shapes that only reveal themselves in specific letter combinations.",
    "This tool loads any Google Font by name directly from Google's font CDN and renders your own text in it, live, with adjustable size and weight — so you can see exactly how \"Acme Inc.\" or your actual headline looks in that specific typeface before committing to it anywhere.",
    "Because fonts are loaded live from Google's own servers the same way they'd load on a real website, this shows genuinely accurate rendering, not an approximation — if a font looks right here, it'll look the same way once embedded in your actual project using the same font name.",
  ],
  howItWorks: [
    { title: "Type a Google Font name", description: "Enter the exact name as listed on fonts.google.com." },
    { title: "Load and preview", description: "See your own text rendered live in that font." },
    { title: "Adjust size and weight", description: "Fine-tune to see how the font holds up at different sizes." },
  ],
  examples: [
    {
      label: "Previewing a heading font",
      input: "Font: Playfair Display, Text: \"Welcome to Acme\", Size: 48px",
      output: "\"Welcome to Acme\" rendered live in Playfair Display at 48px.",
    },
  ],
  faqs: [
    {
      question: "Why doesn't anything render after I type a font name?",
      answer:
        "The font name needs to exactly match how it's listed on fonts.google.com, including capitalization and spacing (e.g. \"Source Sans Pro\", not \"sourcesanspro\") — double-check the exact listing if nothing loads.",
    },
    {
      question: "Does this work for every font on Google Fonts?",
      answer:
        "It should work for any font actively published in the Google Fonts library, since it loads directly from Google's own font-serving CDN using the standard Google Fonts API.",
    },
    {
      question: "Can I preview multiple font weights?",
      answer:
        "Yes — pick from the weight selector (100 through 900) to see how the font looks at different weights, assuming that specific font has those weights available.",
    },
    {
      question: "Is my preview text or font choice sent anywhere?",
      answer:
        "No — only the font file itself is requested from Google's CDN to render the preview. Your text and choices aren't sent to this site's own servers.",
    },
  ],
};
