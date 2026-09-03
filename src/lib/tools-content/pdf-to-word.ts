import type { ToolContent } from "./types";

export const pdfToWordContent: ToolContent = {
  heroSubtitle: "Extract a PDF's Text Into an Editable Word Document",
  overview: [
    "Turning a PDF back into something you can actually edit is one of the most commonly needed PDF conversions — a contract that needs a small change, a report someone wants to reformat, or text that just needs to end up back in a word processor. This tool extracts the PDF's text content and rebuilds it as a genuine, valid .docx Word file that opens directly in Microsoft Word, Google Docs, LibreOffice, or any other compatible word processor.",
    "Text is extracted line by line across every page, with basic heading detection applied using the same font-size heuristic as the PDF to Markdown and PDF to HTML tools — text noticeably larger than the surrounding body text becomes a bold, larger heading paragraph in the output document, while everything else becomes normal body text.",
    "The .docx file itself is built from scratch as a real Word Open XML document — the exact ZIP-and-XML structure Word itself produces — rather than through any conversion service, so the result opens natively with no compatibility warnings.",
    "This is an honest, plain-text conversion, not a layout-preserving one: the original document's exact fonts, columns, tables, and images are not reconstructed — only the text content, in reading order, with simple heading emphasis. For a document where visual fidelity to the original PDF matters more than editable text, this trade-off may not be the right fit; but for getting text back into an editable state quickly, it's a fast, fully private, no-upload way to do it.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Text and font sizes are extracted from every page." },
    { title: "Headings are detected automatically", description: "Larger text becomes bold headings; everything else becomes body paragraphs." },
    { title: "Download the Word document", description: "A genuine .docx file is generated, ready to open and edit." },
  ],
  examples: [
    { label: "Making a PDF report editable", input: "10-page PDF report", output: "a .docx file with the same text content, headings bolded, ready to edit in Word" },
  ],
  faqs: [
    { question: "Will the Word document look exactly like my original PDF?", answer: "No — this is a plain-text extraction, not a layout-preserving conversion. Columns, tables, images, and exact fonts from the original aren't reconstructed; only the text content with basic heading emphasis is carried over." },
    { question: "Does this work on scanned PDFs?", answer: "No — it reads the PDF's embedded text layer. A scanned image PDF has no text data to extract, so nothing meaningful would be produced. Use a dedicated OCR tool for scanned documents first." },
    { question: "Will the resulting file open correctly in Microsoft Word?", answer: "Yes — it's built as a genuine .docx file with the standard Word Open XML structure, so it opens natively in Word, Google Docs, LibreOffice, and any other compatible word processor without conversion warnings." },
    { question: "Are tables from the PDF converted into Word tables?", answer: "No — this tool extracts text as paragraphs only. For tabular data specifically, use PDF to CSV or PDF to Excel instead, which are built to reconstruct table structure." },
    { question: "Is my file uploaded to a server for this conversion?", answer: "No — text extraction and the .docx file construction both happen entirely in your browser; nothing is sent anywhere." },
  ],
};
