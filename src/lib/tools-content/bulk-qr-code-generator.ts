import type { ToolContent } from "./types";

export const bulkQrCodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Multiple QR Codes at Once from a List",
  overview: [
    "Generating QR codes one at a time works fine for a single link, but breaks down fast when you need a batch — a QR code per product in a catalog, per table at an event, per employee badge, or per item in an inventory system. Doing that through a single-code generator means dozens of repetitive copy-paste-download cycles.",
    "This tool takes a plain list of values — one per line, whether URLs, plain text, or short codes — and generates a QR code for every single line in one pass, displayed together in a grid with the original text shown underneath each code for easy reference. There's no artificial limit on how many lines you paste in beyond what your browser can comfortably render at once.",
    "Each QR code is generated independently using the same from-scratch, dependency-free encoder used across this site's QR tools, so results are consistent and instant with no per-code delay or server round-trip. If a specific line is too long to encode (QR codes have a data capacity limit that depends on the code version), that entry is flagged clearly instead of silently failing or breaking the rest of the batch.",
  ],
  howItWorks: [
    { title: "Paste your list", description: "One URL, code, or text value per line." },
    { title: "Review the generated grid", description: "Each line gets its own QR code, shown with the original text beneath it." },
    { title: "Download individually", description: "Save any QR code you need directly from its own download button." },
  ],
  examples: [
    {
      label: "Three product URLs",
      input: "https://shop.com/item1\nhttps://shop.com/item2\nhttps://shop.com/item3",
      output: "Three separate QR codes generated at once, each linking to its respective product page.",
    },
  ],
  faqs: [
    {
      question: "Is there a limit on how many QR codes I can generate at once?",
      answer:
        "No hard limit is imposed by this tool, though pasting in a very large list (hundreds of lines) may take a moment to render as every code is generated in your browser at once.",
    },
    {
      question: "What happens if one of my lines is too long to encode?",
      answer:
        "That specific entry is clearly flagged as too long to encode, while every other line in your list still generates normally — one problematic line won't break the rest of the batch.",
    },
    {
      question: "Can I download all the QR codes at once as a batch?",
      answer:
        "Each QR code has its own individual download button — there's no single \"download all as zip\" option currently, so codes are saved one at a time from the grid.",
    },
    {
      question: "Is my list of values sent to a server?",
      answer:
        "No — every QR code is generated entirely in your browser from the text you paste. Nothing is uploaded or stored.",
    },
  ],
};
