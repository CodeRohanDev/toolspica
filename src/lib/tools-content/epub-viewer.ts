import type { ToolContent } from "./types";

export const epubViewerContent: ToolContent = {
  heroSubtitle: "Read an EPUB eBook Directly in Your Browser",
  overview: [
    "An EPUB file is a ZIP archive containing chapter-by-chapter HTML content and a manifest describing reading order — but without an actual e-reader app or browser extension installed, there's no easy way to just open one and read it.",
    "This tool reads an uploaded .epub file directly in your browser: it unpacks the archive, finds the book's package document to determine the correct chapter order, and renders each chapter so you can page through the book with Previous and Next controls.",
    "For safety, chapter content renders inside a fully sandboxed frame that blocks any embedded scripts from executing — so opening an EPUB from an unfamiliar source previews safely without risk to your browser session, the same protection this site's SVG Viewer uses for untrusted markup.",
  ],
  howItWorks: [
    { title: "Upload an .epub file", description: "Choose an EPUB eBook file from your device." },
    { title: "Read chapter by chapter", description: "The book's actual reading order is detected automatically." },
    { title: "Navigate with Previous/Next", description: "Page through the full book at your own pace." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A downloaded .epub eBook",
      output: "The book opens to Chapter 1, with Next/Previous controls to page through the rest.",
    },
  ],
  faqs: [
    {
      question: "Is it safe to open an EPUB from an untrusted source?",
      answer:
        "Yes — chapter content renders inside a fully sandboxed frame that blocks any embedded scripts from executing, so an EPUB from an unfamiliar source previews safely.",
    },
    {
      question: "Does this preserve the book's original formatting and images?",
      answer:
        "Text formatting from the chapter's HTML carries over. Images referenced within the same chapter file may not always resolve correctly, since this focuses on readable text content rather than full multimedia fidelity.",
    },
    {
      question: "Can I download or save my reading position?",
      answer:
        "No — this is a read-only viewer for the current session; there's no bookmark or progress-saving feature, so note your chapter number if you plan to continue reading later.",
    },
    {
      question: "Is my EPUB file uploaded to a server?",
      answer:
        "No — the file is unpacked and rendered entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
