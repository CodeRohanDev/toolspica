import type { ToolContent } from "./types";

export const pdfOcrContent: ToolContent = {
  heroSubtitle: "Recognize Text From Scanned or Image-Only PDF Pages",
  overview: [
    "Every text-extraction tool on this site — PDF to Text, PDF to Markdown, PDF to CSV, and others — relies on a PDF's embedded text layer, but plenty of real-world PDFs don't have one: a photocopied document scanned to PDF, a photo of a page saved as PDF, or an old document that was never digitally typed in the first place. Those files are, as far as a computer is concerned, just pictures — this tool is the one built specifically to read text out of pictures like that.",
    "It uses a real, well-established optical character recognition engine (Tesseract, running as WebAssembly directly in your browser via the tesseract.js library) to analyze each rendered page image and recognize the English text it contains, character by character, the same underlying recognition technology used in many commercial and open-source OCR products.",
    "Each page of the uploaded PDF is first rendered to a high-resolution image, then passed through the OCR engine one page at a time, with live progress shown as recognition proceeds (which page is being processed, and a percentage complete for the current page) since this is genuinely more computationally intensive than simple text extraction and can take real time on longer documents.",
    "The recognition engine itself runs entirely on your device using WebAssembly — the only network activity involved is a one-time download of a small English language model file the first time you use the tool (needed for the recognition engine to know what English characters and words look like), after which the actual OCR processing of your document's content happens fully locally, with no image or text data ever leaving your browser.",
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
    { question: "Why do I need this instead of the regular PDF to Text tool?", answer: "PDF to Text reads a PDF's embedded text data, which scanned or photographed documents simply don't have — they're just pictures. This tool actually looks at the image and recognizes the characters visually, which is what's needed for image-only PDFs." },
    { question: "Is my document uploaded to a server for OCR processing?", answer: "No — recognition runs entirely on your device using WebAssembly. The only network activity is a one-time download of a small English language model file; your actual document content and its recognized text never leave your browser." },
    { question: "How accurate is the text recognition?", answer: "Accuracy depends heavily on scan quality — clean, high-resolution, well-lit scans of printed text typically recognize very accurately, while blurry, skewed, or handwritten content will produce more errors, which is an inherent limitation of OCR technology generally, not specific to this tool." },
    { question: "Does this support languages other than English?", answer: "Currently only English recognition is supported. Documents in other languages would need a different OCR tool configured with the appropriate language model." },
    { question: "Why does OCR take longer than the regular text extraction tools?", answer: "Optical character recognition is genuinely more computationally intensive than reading an existing text layer, since it has to analyze image pixels to identify characters — this is expected and scales with how many pages your document has." },
  ],
};
