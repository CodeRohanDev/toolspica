import type { ToolContent } from "./types";

export const screenshotOcrContent: ToolContent = {
  heroSubtitle: "Copy Text Out of a Screenshot Instantly",
  overview: [
    "Screenshots capture text as pixels, not selectable characters — an error message, a chat conversation, a code snippet in a video call, a UI label you need to reference. Retyping any of that is tedious. This tool runs a real OCR engine (Tesseract, compiled to WebAssembly) directly in your browser to recognize the text in a screenshot and hand it back as plain, copyable text.",
    "Screenshots are generally an excellent case for OCR: they're typically clean, high-contrast, and use consistent digital fonts rather than the noise and distortion of a photographed page, which tends to produce very reliable recognition results compared to other OCR use cases.",
    "This handles PNG, JPG, and WebP screenshots — the common formats screenshot tools and browsers save to — decoding and analyzing the image entirely on your device.",
    "Nothing is uploaded during recognition; the only network activity is a one-time download of the English language model the engine needs, after which everything runs locally.",
  ],
  howItWorks: [
    { title: "Upload your screenshot", description: "PNG, JPG, or WebP all work." },
    { title: "Recognition runs locally", description: "Tesseract analyzes the image entirely in your browser." },
    { title: "Copy or download the text", description: "Get clean, plain text ready to paste anywhere." },
  ],
  examples: [
    { label: "Copying an error message", input: "screenshot of a terminal error", output: "the exact error text, ready to search or share" },
  ],
  faqs: [
    { question: "Is my screenshot uploaded anywhere?", answer: "No — recognition runs entirely in your browser via WebAssembly; the image never leaves your device." },
    { question: "Why is this more accurate than photo-based OCR?", answer: "Screenshots are clean, high-contrast, and use consistent digital fonts rather than the blur, glare, or skew common in photographed pages, which generally makes recognition significantly more reliable." },
    { question: "What image formats does this accept?", answer: "PNG, JPG, and WebP — the common formats screenshot tools and browsers save to." },
    { question: "Can this recognize text in any language?", answer: "This tool is set to English by default — use Multi-language OCR for screenshots with text in other languages." },
    { question: "Will formatting like bold or color be preserved?", answer: "No — the output is plain text only; visual formatting from the screenshot isn't carried over." },
  ],
};
