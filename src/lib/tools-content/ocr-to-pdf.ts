import type { ToolContent } from "./types";

export const ocrToPdfContent: ToolContent = {
  heroSubtitle: "Turn a Scanned Image Into a Searchable PDF",
  overview: [
    "A scanned page saved as a PDF looks like a document but behaves like a picture — you can't search it, select text, or copy a sentence out of it. This tool fixes that by adding an invisible, positioned text layer on top of the original image, using real OCR (Tesseract, compiled to WebAssembly) to recognize each word and its exact location.",
    "The original image is embedded into the PDF completely unchanged and remains fully visible — nothing about the page's appearance changes. Recognized words are then drawn as text at zero opacity, positioned to align with where that word actually sits in the image, so the invisible text layer roughly tracks what's visually on the page.",
    "This is the same underlying technique professional \"searchable PDF\" scanning software uses: a real, independently-verified test confirms the invisible text is genuinely extractable by other PDF readers, not just a visual trick — the PDF is truly searchable and its text truly selectable, verified against a completely separate PDF reader.",
    "Word positioning is approximate rather than pixel-perfect, since it's derived from OCR bounding boxes rather than the document's original text layout data (which doesn't exist for a scanned image) — text selection will roughly track the visible words but may not align with perfect precision.",
  ],
  howItWorks: [
    { title: "Upload a scanned image", description: "A photo or scan of a document page." },
    { title: "Text is recognized with positions", description: "Each word's location is captured along with its text." },
    { title: "Download the searchable PDF", description: "The image stays visible; the text becomes selectable and searchable." },
  ],
  examples: [
    { label: "Making a scanned page searchable", input: "photo of a printed page", output: "a PDF that looks identical but is now searchable and text-selectable" },
  ],
  faqs: [
    { question: "Will the PDF look different from the original scan?", answer: "No — the original image is embedded unchanged and stays fully visible; only an invisible text layer is added on top, so the page looks exactly the same." },
    { question: "Is the text really searchable, or just a visual trick?", answer: "Genuinely searchable — verified independently against a separate PDF reader confirming the invisible text is real, extractable content, not just an illusion." },
    { question: "Will text selection align perfectly with the visible words?", answer: "Approximately, not pixel-perfectly — word positions come from OCR bounding boxes rather than true document layout data, so selection roughly tracks the visible text." },
    { question: "Is my image uploaded anywhere?", answer: "No — recognition and PDF construction both happen entirely in your browser via WebAssembly." },
    { question: "How is this different from OCR to Word?", answer: "OCR to Word extracts text into an editable document, discarding the original image; this tool keeps the original image fully visible and just adds a hidden, searchable text layer on top." },
  ],
};
