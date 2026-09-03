import type { ToolContent } from "./types";

export const receiptOcrContent: ToolContent = {
  heroSubtitle: "Extract Text From a Receipt Photo, Total Auto-Detected",
  overview: [
    "Expense tracking and reimbursement often start with a pile of paper receipts that need their content captured digitally. This tool recognizes all text on a receipt photo using a real OCR engine (Tesseract, compiled to WebAssembly, running entirely in your browser) and additionally scans the result for a line matching a common \"Total\" pattern.",
    "The total-detection is a lightweight pattern match — it looks through the recognized text (starting from the bottom, where totals typically appear) for a line containing the word \"total\" followed by a number, and surfaces that number prominently above the full text.",
    "This is honestly framed as basic text extraction with a helpful heuristic, not full structured receipt parsing — it doesn't separate individual line items, tax breakdowns, or merchant details into distinct fields the way a dedicated receipt-parsing service would.",
    "Everything runs locally: your receipt content, which can include purchase details you'd rather not send to a third-party server, never leaves your browser during recognition.",
  ],
  howItWorks: [
    { title: "Upload a receipt photo", description: "Works on printed thermal or paper receipts." },
    { title: "Text is recognized locally", description: "The full receipt text is extracted via OCR." },
    { title: "Review the detected total", description: "A simple pattern match highlights the total line, if found." },
  ],
  examples: [
    { label: "Digitizing a store receipt", input: "photo of a printed receipt", output: "full text plus a detected total amount" },
  ],
  faqs: [
    { question: "Does this separate line items automatically?", answer: "No — this is basic text extraction with a simple total-detection heuristic, not full structured receipt parsing. Individual line items aren't separated into distinct fields." },
    { question: "How is the total detected?", answer: "A pattern match scans the recognized text (from the bottom up) for a line containing the word \"total\" followed by a number — it's a lightweight heuristic, not guaranteed to catch every receipt format." },
    { question: "Is my receipt content uploaded anywhere?", answer: "No — recognition runs entirely in your browser via WebAssembly." },
    { question: "What if the total isn't detected correctly?", answer: "Check the full extracted text below — the total may be phrased differently than the pattern expects (e.g. \"Amount Due\" instead of \"Total\"), in which case you'll need to read it from the full text manually." },
    { question: "Does this work on faded or crumpled receipts?", answer: "Recognition accuracy drops on faded thermal print or heavily creased receipts, since OCR generally relies on clear, high-contrast text." },
  ],
};
