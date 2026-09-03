import type { ToolContent } from "./types";

export const pdfToTextContent: ToolContent = {
  heroSubtitle: "Pull All Text Out of a PDF Into Plain, Copyable Text",
  overview: [
    "Getting text out of a PDF for pasting into an email, a document, a translation tool, or a script is more annoying than it should be — selecting text manually across many pages is slow, and some PDF viewers make bulk selection difficult. This tool extracts every bit of embedded text from a PDF in one pass and presents it as plain text you can copy or download, no manual selection required.",
    "It works by reading each page's text content directly from the PDF's internal structure — the same underlying data a PDF viewer uses to make text selectable and searchable — rather than trying to recognize text visually. Text from each page is joined together with clear paragraph breaks between pages, giving you one continuous plain-text document representing the whole file.",
    "Because this reads the PDF's actual embedded text layer, it only works on PDFs that have real text content — documents created digitally (from Word, Google Docs, LaTeX, or similar) almost always qualify. A PDF that's actually a scanned image of a page, with no underlying text layer, will produce no output here, since there's no text data to extract; a dedicated OCR tool would be needed to recognize text from the image pixels themselves.",
    "The result strips all formatting — fonts, bold, italics, headings, and layout are not preserved, since the goal is clean, portable plain text rather than a formatted document. For output that keeps some structure (headings distinguished from body text), the PDF to Markdown or PDF to HTML tools are better suited.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file is read and its text content extracted." },
    { title: "Review the extracted text", description: "All pages' text appears as one continuous plain-text block." },
    { title: "Copy or download", description: "Copy directly or download as a .txt file." },
  ],
  examples: [
    { label: "Extracting text from a report", input: "12-page digitally-created PDF report", output: "plain text of all 12 pages, ready to paste anywhere" },
  ],
  faqs: [
    { question: "Why did I get no text from my PDF?", answer: "This tool reads embedded text data — if your PDF is actually a scanned image of pages (common with photocopies or phone-scanned documents), there's no underlying text to extract. Use a dedicated OCR tool for image-based PDFs instead." },
    { question: "Does this preserve formatting like bold or headings?", answer: "No — the output is plain text with all formatting stripped, since the goal is clean, portable text. Use PDF to Markdown or PDF to HTML if you want basic heading structure preserved." },
    { question: "Will the extracted text be in the correct reading order?", answer: "Generally yes for standard single-column documents — text is extracted following the PDF's internal content order, which normally matches visual reading order for straightforward layouts, though complex multi-column layouts can occasionally interleave text unexpectedly." },
    { question: "Can I extract text from a password-protected PDF?", answer: "Not directly — remove the password first using PDF Unlock, then extract text from the resulting file." },
    { question: "Does any of my document content get uploaded anywhere?", answer: "No — text extraction runs entirely in your browser using the PDF's own data; nothing is sent to a server." },
  ],
};
