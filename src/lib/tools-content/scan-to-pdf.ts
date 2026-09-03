import type { ToolContent } from "./types";

export const scanToPdfContent: ToolContent = {
  heroSubtitle: "Turn Phone Photos of Documents Into a Clean PDF",
  overview: [
    "A phone camera is the most common \"scanner\" most people have access to, and turning a set of document photos into a proper PDF — rather than sending a folder of loose images — is a frequent need for forms, receipts, notes, or physical mail that needs to be shared digitally. This tool is built specifically for that workflow: it accepts photos directly from your camera or any image file already on your device, and produces a single combined PDF, one photo per page.",
    "Unlike the dedicated JPG to PDF and PNG to PDF tools, this one accepts any image format your browser can decode — JPG, PNG, HEIC from an iPhone, WebP, and others — because photos captured for scanning purposes rarely come in a single consistent format, especially across different phones and camera apps. On mobile, the upload button opens the camera directly (via the browser's native camera capture), so you can photograph a document and add it to the queue in one step.",
    "Every image, regardless of its original format, is normalized by drawing it onto a canvas with a white background and re-encoding it as a JPEG at high quality (92%) before being embedded into the PDF — this ensures reliable, consistent embedding across all the varied formats a phone might produce, and the white background fill prevents any transparency in the source (like a HEIC or PNG with alpha) from turning into an unexpected black or checkered area.",
    "As with the other image-to-PDF tools, pages can be reordered with up/down controls before generating, and everything runs locally in your browser — your photographed documents, which are often the exact kind of sensitive material (IDs, forms, signed papers) you wouldn't want passing through a third-party server, never leave your device.",
  ],
  howItWorks: [
    { title: "Take photos or add images", description: "Use your camera directly or pick existing image files, in any format." },
    { title: "Arrange the page order", description: "Use the up/down arrows to set the sequence pages should appear in." },
    { title: "Generate and download the PDF", description: "Each photo is normalized to JPEG and combined into one PDF." },
  ],
  examples: [
    { label: "Scanning a signed form", input: "3 phone photos of a paper form's pages", output: "one 3-page PDF, normalized and combined in order" },
  ],
  faqs: [
    { question: "What image formats can I use with this tool?", answer: "Any format your browser can decode — JPG, PNG, WebP, HEIC (from iPhone), and more — since every image is normalized to JPEG internally before being embedded, regardless of its original format." },
    { question: "Can I take photos directly instead of choosing existing files?", answer: "Yes — on mobile devices, the upload button opens your camera directly so you can photograph a document and add it to the page queue immediately." },
    { question: "Why does every image get converted to JPEG internally?", answer: "Normalizing every input to JPEG via a canvas re-draw ensures reliable, consistent embedding regardless of the wide variety of formats phone cameras and apps can produce, and it fills any transparency with white so nothing turns into an unexpected black or checkered background." },
    { question: "Will this reduce the quality of my photos noticeably?", answer: "Photos are re-encoded at 92% JPEG quality, which is visually very close to the original for typical document photos — some quality loss is inherent to normalizing to JPEG, but it's minor at this quality setting." },
    { question: "How is this different from the JPG to PDF or PNG to PDF tools?", answer: "Those tools accept only their specific named format; this one accepts any image format and normalizes everything consistently, which is more convenient when combining photos from different sources or devices." },
  ],
};
