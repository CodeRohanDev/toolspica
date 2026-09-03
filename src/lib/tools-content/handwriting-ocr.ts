import type { ToolContent } from "./types";

export const handwritingOcrContent: ToolContent = {
  heroSubtitle: "Recognize Neat Handwriting Using a Real OCR Engine",
  overview: [
    "Handwriting recognition is a genuinely harder problem than printed text recognition — the shapes of letters vary enormously between people, and most general-purpose OCR engines, including this one, are trained primarily on printed fonts. This tool uses that same engine (Tesseract, compiled to WebAssembly, running entirely in your browser) applied to handwritten content, with honest expectations about accuracy.",
    "Results vary significantly based on handwriting style: neat, clearly-separated print handwriting (each letter distinct, consistent size) recognizes reasonably well, while cursive, tightly-joined, or stylistically unusual handwriting produces substantially more errors, since there's no dedicated handwriting-trained model behind this tool.",
    "Everything happens locally in your browser via WebAssembly, so your handwritten notes — which may include personal or sensitive content — are never uploaded anywhere during recognition.",
    "For genuinely reliable handwriting recognition of cursive or highly varied handwriting, purpose-built commercial handwriting recognition services (trained on specifically handwritten datasets) will outperform this tool — this is an honest limitation worth knowing upfront rather than discovering through disappointing results.",
  ],
  howItWorks: [
    { title: "Upload a photo of handwriting", description: "Neat, clearly-separated print handwriting works best." },
    { title: "Recognition runs locally", description: "The same OCR engine used for printed text analyzes the image." },
    { title: "Copy or download the result", description: "Review carefully — handwriting accuracy varies significantly." },
  ],
  examples: [
    { label: "Reading a handwritten note", input: "photo of neat, printed handwriting", output: "recognized text, review recommended" },
  ],
  faqs: [
    { question: "How accurate is this on cursive handwriting?", answer: "Not very — this engine is trained primarily on printed fonts, not handwriting specifically, so cursive or tightly-joined script produces significantly more errors than neat, separated print writing." },
    { question: "Is my handwritten content uploaded anywhere?", answer: "No — recognition runs entirely in your browser via WebAssembly, with no upload of your image or its content." },
    { question: "What handwriting style works best?", answer: "Neat, clearly-separated print letters with consistent sizing — the closer it resembles printed text, the more reliable the recognition." },
    { question: "Should I trust this for important documents?", answer: "Always review the output carefully rather than trusting it blindly — handwriting OCR accuracy is genuinely lower than printed-text OCR, and errors are common." },
    { question: "Is there a better option for cursive handwriting?", answer: "Purpose-built commercial handwriting recognition services, trained specifically on handwritten datasets, will generally outperform a general OCR engine like this one on cursive content." },
  ],
};
