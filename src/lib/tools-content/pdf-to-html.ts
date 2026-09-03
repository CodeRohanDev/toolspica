import type { ToolContent } from "./types";

export const pdfToHtmlContent: ToolContent = {
  heroSubtitle: "Convert a PDF's Text Into Structured, Ready-to-Use HTML",
  overview: [
    "Getting a PDF's content into a web page usually means manually retyping it or copy-pasting into a rich text editor and cleaning up whatever formatting mess comes with it. This tool extracts a PDF's text and produces clean, semantic HTML with basic heading structure automatically detected — h2 and h3 tags for headings, p tags for body paragraphs — ready to drop into a web page or CMS.",
    "Since PDF has no native concept of headings or paragraphs — only text positioned at coordinates with a given font size — heading detection works by comparing each line's font size against the median size on that page: lines noticeably larger become headings, everything else becomes a paragraph. This heuristic was verified against a real test document with a distinctly larger title line and normal-sized body text, correctly producing an h2 heading followed by plain paragraph tags.",
    "Every page's converted markup is wrapped in its own section element, keeping the original page boundaries structurally identifiable in the output HTML even though a continuously-flowing web page doesn't have the same concept of discrete pages a PDF does. All text content is properly HTML-escaped (ampersands, angle brackets) so the output is valid, safe-to-render markup rather than raw text that happens to look like HTML.",
    "This produces plain structural HTML with no styling, images, tables, or layout information carried over from the original document — it's meant as a clean starting point for content that needs semantic heading structure, not a pixel-accurate reproduction of the PDF's visual design. For that, the PDF to JPG or PDF to PNG tools render pages as images that look exactly like the source instead.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Text and font sizes are extracted from every page." },
    { title: "Structure is inferred automatically", description: "Larger text becomes h2/h3 headings; everything else becomes paragraphs." },
    { title: "Copy or download the HTML", description: "Clean, escaped, semantic HTML output, ready to use." },
  ],
  examples: [
    { label: "Converting a document with a title", input: "PDF with a 24pt title and 11pt body text", output: "<h2>Title</h2> followed by <p> paragraph tags" },
  ],
  faqs: [
    { question: "How does this decide what becomes a heading versus a paragraph?", answer: "It compares each line's font size to the median size on that page — noticeably larger lines become <h2> or <h3> headings, while text close to the median becomes a plain <p> paragraph. This was verified against a real test document and correctly distinguished a title from body text." },
    { question: "Does the output include any CSS styling or layout?", answer: "No — the output is plain semantic HTML (headings and paragraphs only) with no styling, colors, fonts, or layout carried over. It's meant as a clean structural starting point, not a visual reproduction." },
    { question: "Is the HTML safe to insert directly into a web page?", answer: "Yes — all extracted text is properly escaped (ampersands, angle brackets converted to their HTML entities), so the output is valid markup rather than raw text that could break page rendering if inserted as-is." },
    { question: "Can this extract images or tables from the PDF?", answer: "No — this tool extracts and structures text only. For embedded images, use PDF Page Extractor to Images; for tabular data, use PDF to CSV or PDF to Excel." },
    { question: "Does this work on scanned PDFs?", answer: "No — it requires an embedded text layer to extract from; a scanned image PDF has no text data, so nothing would be produced. Use a dedicated OCR tool for scanned documents first." },
  ],
};
