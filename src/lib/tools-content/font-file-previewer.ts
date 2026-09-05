import type { ToolContent } from "./types";

export const fontFilePreviewerContent: ToolContent = {
  heroSubtitle: "Preview a Font File Before Installing or Deploying It",
  overview: [
    "A downloaded font file — from a purchase, a free font site, or a client's brand assets — usually needs to be installed system-wide just to see what it actually looks like, a slower round-trip than necessary for a quick check of whether it's the right file.",
    "This tool loads a .ttf, .otf, .woff, or .woff2 font file directly in your browser using the same font-loading technology websites use, and renders your own text in it — with adjustable size — so you can preview it immediately without installing anything.",
    "Because the font file is loaded using the browser's native font-loading API, the preview reflects exactly how that font will render on the web — useful for confirming a web font file actually contains what you expect before deploying it to a live site.",
  ],
  howItWorks: [
    { title: "Upload a font file", description: "Choose a .ttf, .otf, .woff, or .woff2 file." },
    { title: "Type your preview text", description: "See your own text rendered in the actual font." },
    { title: "Adjust the size", description: "Check how the font looks at different sizes." },
  ],
  examples: [
    {
      label: "Checking a downloaded font",
      input: "brand-font.otf",
      output: "\"The quick brown fox...\" rendered live in that exact font file.",
    },
  ],
  faqs: [
    {
      question: "Does this install the font on my computer?",
      answer:
        "No — the font is loaded only for this browser tab's preview and isn't installed system-wide or made available to other applications.",
    },
    {
      question: "What font formats are supported?",
      answer:
        "TTF, OTF, WOFF, and WOFF2 — the standard formats used for both desktop font files and web font deployment.",
    },
    {
      question: "Can I preview multiple fonts to compare them?",
      answer:
        "Upload one at a time — uploading a new file replaces the current preview, so compare by switching between files rather than viewing several at once.",
    },
    {
      question: "Is my font file uploaded to a server?",
      answer:
        "No — the font is loaded and rendered entirely in your browser using the native FontFace API. Nothing is uploaded anywhere.",
    },
  ],
};
