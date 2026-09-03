import type { ToolContent } from "./types";

export const pdfToEpubContent: ToolContent = {
  heroSubtitle: "Convert a PDF's Text Into a Reflowable EPUB E-Book",
  overview: [
    "PDF is a fixed-layout format — every page looks exactly the same regardless of screen size, which makes it a poor fit for e-readers and phone screens where reflowable text that adapts to the display is far more comfortable to read. EPUB is the standard e-book format built specifically for that reflowable reading experience, and this tool converts a PDF's text content into a genuine, valid EPUB file that any e-reader app can open.",
    "Each page of the source PDF becomes its own chapter in the resulting EPUB, with heading levels inferred from relative font size the same way the PDF to Markdown and PDF to HTML tools do — noticeably larger text becomes a heading, everything else becomes body text. The EPUB includes a proper table of contents (both the modern EPUB3 navigation document and the legacy NCX format for older reader compatibility), so chapters are navigable from any e-reader's table of contents view, not just by scrolling.",
    "Under the hood, this builds a real EPUB3 file from scratch — a ZIP archive with the exact required internal structure (a mimetype file stored uncompressed and first in the archive, a container pointing to the package document, the package manifest, and one XHTML file per chapter) — verified against Python's zipfile module and XML well-formedness checks to confirm every internal file parses correctly before shipping.",
    "This is a text-reflow conversion, not a layout-preserving one: images, columns, tables, and precise formatting from the original PDF are not carried over, only the extracted text with basic heading structure. For documents where the visual layout itself matters (a photo-heavy magazine layout, for example), this conversion will lose that entirely — it's built for text-centric documents like reports, articles, and manuscripts where reflowable reading matters more than pixel-perfect layout.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Text and font sizes are extracted from every page." },
    { title: "Chapters are built automatically", description: "Each page becomes a chapter with heading structure inferred from font size." },
    { title: "Download the EPUB", description: "A valid EPUB3 file with a working table of contents is generated." },
  ],
  examples: [
    { label: "Converting a text-based report", input: "20-page PDF report", output: "EPUB file with 20 chapters, readable and reflowable in any e-reader" },
  ],
  faqs: [
    { question: "Will images and layout from the PDF be preserved?", answer: "No — this is a plain-text reflow conversion. Images, columns, tables, and exact formatting aren't carried over, only the extracted text with basic heading structure inferred from font size." },
    { question: "Will the EPUB open correctly in e-reader apps?", answer: "Yes — it's a genuine, valid EPUB3 file with the exact required internal structure (correct mimetype handling, container, package manifest, navigation document), verified for structural correctness before shipping." },
    { question: "How are chapters organized in the output?", answer: "Each page of the source PDF becomes its own chapter, with a working table of contents linking to each one — useful for jumping to a specific page's content, though it means chapter boundaries follow the original page breaks rather than the document's actual logical sections." },
    { question: "Does this work on scanned PDFs?", answer: "No — it requires an embedded text layer to extract from. A scanned image PDF has no text data to convert; a dedicated OCR tool would be needed first." },
    { question: "Can I convert just part of a long PDF to EPUB?", answer: "Use PDF Extract Pages first to pull out the specific pages or chapters you want, then convert that smaller resulting PDF to EPUB." },
  ],
};
