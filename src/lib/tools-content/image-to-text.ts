import type { ToolContent } from "./types";

export const imageToTextContent: ToolContent = {
  heroSubtitle: "Extract Text From Any Image Using Real OCR",
  overview: [
    "Copying text out of a photo, scan, or screenshot normally means retyping it by hand. This tool runs Tesseract, a genuine, widely-used optical character recognition engine, compiled to WebAssembly and executed entirely inside your browser — the same class of technology behind many commercial and open-source OCR products.",
    "Upload any image and the engine analyzes it pixel by pixel, recognizing printed characters and reconstructing them as plain, copyable text. This works on photographs of documents, scanned pages, screenshots, and most images containing clear printed text.",
    "Recognition accuracy depends heavily on image quality: clean, high-resolution, well-lit, high-contrast text recognizes very reliably, while blurry, skewed, low-resolution, or handwritten content produces more errors — an inherent limitation of OCR technology generally, not specific to this tool.",
    "The only network activity involved is a one-time download of a small English language model the first time you use the tool; the actual recognition of your image's content happens fully on your device, and nothing is ever uploaded.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Any photo, scan, or screenshot with visible text." },
    { title: "Recognition runs locally", description: "Tesseract analyzes the image entirely in your browser." },
    { title: "Copy or download the text", description: "Get clean, plain text ready to use anywhere." },
  ],
  examples: [
    { label: "Extracting text from a scanned page", input: "photo of a printed document", output: "clean, copyable plain text" },
  ],
  faqs: [
    { question: "Is my image uploaded to a server?", answer: "No — recognition runs entirely in your browser via WebAssembly. Only a small language model downloads once; your image never leaves your device." },
    { question: "Why did some words come out wrong?", answer: "OCR accuracy depends heavily on image quality — blurry, skewed, low-resolution, or unusual fonts all reduce accuracy. Clean, well-lit, high-contrast text recognizes most reliably." },
    { question: "Does this work on handwriting?", answer: "It's trained on printed text, so handwriting recognition is unreliable — use the dedicated Handwriting OCR tool if that's your specific need, though even that has real limits." },
    { question: "What languages are supported?", answer: "This tool is set to English by default — use Multi-language OCR if your image contains text in another language." },
    { question: "Is there a file size or resolution limit?", answer: "No hard limit, though very large images take longer to process since more pixels need to be analyzed." },
  ],
};
