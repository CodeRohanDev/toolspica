import type { ToolContent } from "./types";

export const pdfToTextOcrContent: ToolContent = {
  heroSubtitle: "Recognize Text From Scanned or Image-Only PDF Pages",
  overview: [
    "Regular text-extraction tools rely on a PDF's embedded text layer, but scanned documents and photographed pages saved as PDF don't have one — they're just pictures as far as a computer is concerned. This tool is built specifically for that case, using a real OCR engine (Tesseract, compiled to WebAssembly) to read text directly from each page's rendered image.",
    "Every page is rendered to a high-resolution image, then passed through the OCR engine one page at a time, with live progress shown since this is genuinely more computationally intensive than simple text extraction and can take real time on longer documents.",
    "The recognition itself runs entirely on your device using WebAssembly — the only network activity is a one-time download of a small English language model, after which your document's content and its recognized text never leave your browser.",
    "This is the same underlying engine used by our PDF OCR tool under a different name, matching how this feature is commonly searched for — the result and behavior are identical either way.",
  ],
  howItWorks: [
    { title: "Upload your scanned PDF", description: "Works on image-only pages with no embedded text layer." },
    { title: "Pages are rendered and recognized", description: "Each page renders to an image, then the OCR engine reads its text." },
    { title: "Copy or download the recognized text", description: "Get the extracted text as plain text, ready to use." },
  ],
  examples: [
    { label: "Reading text from a scanned letter", input: "5-page scanned PDF with no text layer", output: "recognized plain text from all 5 pages" },
  ],
  faqs: [
    { question: "Why doesn't PDF to Text work on my scanned PDF?", answer: "Regular text extraction reads a PDF's embedded text data, which scanned or photographed pages simply don't have. This tool visually recognizes the characters instead." },
    { question: "Is my document uploaded anywhere?", answer: "No — recognition runs entirely on your device using WebAssembly; only a one-time language model download happens over the network." },
    { question: "How accurate is the recognition?", answer: "Depends heavily on scan quality — clean, high-resolution scans of printed text recognize accurately, while blurry or skewed scans produce more errors." },
    { question: "Does this support other languages?", answer: "This tool is set to English — for other languages, OCR the page images with Multi-language OCR instead." },
    { question: "Why does this take longer than regular text extraction?", answer: "Optical character recognition genuinely analyzes image pixels to identify characters, which is more computationally intensive and scales with page count." },
  ],
};
