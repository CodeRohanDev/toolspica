import type { ToolContent } from "./types";

export const icoViewerContent: ToolContent = {
  heroSubtitle: "Inspect Every Resolution Bundled in an .ico File",
  overview: [
    "A single .ico file usually isn't one image — it's a container bundling multiple resolutions of the same icon (16×16, 32×32, 48×48, and often larger) so an operating system or browser can pick the size it actually needs. Opening one in a regular image viewer typically shows just one size, hiding what else is packed inside.",
    "This tool reads an .ico file's internal directory and lists every resolution it contains, along with its bit depth and file size — rendering a live preview for entries encoded as PNG (the modern standard for larger icon sizes) directly in your browser.",
    "Older, smaller icon sizes are frequently encoded using a legacy raw bitmap format from the original ICO specification rather than PNG — those entries are listed with their full size and bit-depth information, but aren't rendered as a visual preview, since decoding that legacy format correctly needs more specialized handling than this tool's PNG-based preview covers.",
  ],
  howItWorks: [
    { title: "Upload an .ico file", description: "Choose any Windows icon or favicon .ico file." },
    { title: "Review each resolution", description: "See every bundled size, bit depth, and file size." },
    { title: "View available previews", description: "PNG-encoded entries render a live image preview." },
  ],
  examples: [
    {
      label: "Multi-resolution favicon",
      input: "favicon.ico with 16x16, 32x32, and 256x256 entries",
      output: "Three entries listed, with the 256x256 (typically PNG-encoded) showing a live preview.",
    },
  ],
  faqs: [
    {
      question: "Why don't some entries show a visual preview?",
      answer:
        "Smaller legacy icon sizes are often encoded using the original ICO specification's raw bitmap format rather than PNG. This tool reliably previews PNG-encoded entries (common for larger sizes) and shows size/bit-depth metadata for the rest.",
    },
    {
      question: "How many resolutions can one .ico file contain?",
      answer:
        "There's no fixed limit in the format — a well-built favicon.ico commonly bundles 3-5 sizes (like 16×16, 32×32, and 48×48) so different contexts (browser tab, bookmark, desktop shortcut) get an appropriately sized icon.",
    },
    {
      question: "Can I extract just one resolution from the file?",
      answer:
        "For PNG-encoded entries, right-click the preview image and save it directly — that gives you just that one resolution as a standalone PNG file.",
    },
    {
      question: "Is my .ico file uploaded to a server?",
      answer:
        "No — the file is read and parsed entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
