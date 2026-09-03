import type { ToolContent } from "./types";

export const pdfToMarkdownContent: ToolContent = {
  heroSubtitle: "Convert a PDF's Text Into Clean Markdown With Headings",
  overview: [
    "Markdown is the format of choice for documentation, README files, note-taking apps, and static site content, and getting a PDF's content into that format usually means manually retyping everything or fighting with copy-paste formatting artifacts. This tool extracts a PDF's text and automatically infers basic heading structure, producing clean Markdown ready to paste into any Markdown-based tool or editor.",
    "Since PDF has no built-in concept of headings, paragraphs, or document structure — it only knows where each piece of text sits and at what font size — this tool infers structure using a font-size heuristic: it calculates the median font size across a page's text and classifies any line noticeably larger than that median as a heading (level 2 for the largest, level 3 for moderately larger lines), while everything else becomes a plain paragraph. This heuristic was verified against a real test document with a 24pt title and 11pt body text, correctly producing a proper heading and plain paragraphs.",
    "Each page's converted content is separated with a horizontal rule in the output, so the boundary between pages remains visible in the final Markdown even though Markdown itself has no native concept of pages. This keeps the structure legible in longer documents where knowing which page content originated from can matter.",
    "This works best on documents with a clear, consistent visual hierarchy — larger titles and section headers, smaller body text — since that's exactly the signal the heuristic relies on. Documents with unconventional formatting (all text the same size, or decorative fonts used for emphasis rather than size) will convert to plain paragraphs without heading structure, since there's no reliable size-based signal to detect in those cases.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Text and font sizes are extracted from every page." },
    { title: "Structure is inferred automatically", description: "Larger text becomes headings; everything else becomes paragraphs." },
    { title: "Copy or download the Markdown", description: "Clean Markdown output, ready to paste anywhere." },
  ],
  examples: [
    { label: "Converting a report with a title", input: "PDF with a 24pt title and 11pt body paragraphs", output: "## Title heading followed by plain Markdown paragraphs" },
  ],
  faqs: [
    { question: "How does this decide what becomes a heading?", answer: "It compares each line's font size to the median font size on that page — lines significantly larger than the median become headings (## or ###), while everything close to the median becomes a plain paragraph. This was verified against a real test document and correctly identified titles versus body text." },
    { question: "Will this work well on any PDF?", answer: "Best results come from documents with clear visual hierarchy — noticeably larger titles and headers compared to body text. Documents with uniform font sizes throughout will convert without any heading structure, since there's no size signal to detect." },
    { question: "Does this preserve bold, italic, or other text formatting?", answer: "No — only heading level structure is inferred from font size; other formatting like bold or italic emphasis isn't detected or carried into the Markdown output." },
    { question: "Can this convert scanned PDFs?", answer: "No — it relies on the PDF's embedded text layer, so a scanned image with no underlying text data won't produce any output. Use a dedicated OCR tool first for scanned documents." },
    { question: "Why are pages separated by a horizontal rule?", answer: "Markdown has no native concept of pages, so a horizontal rule (---) is inserted between each page's converted content to keep the original page boundaries visible and legible in the output." },
  ],
};
