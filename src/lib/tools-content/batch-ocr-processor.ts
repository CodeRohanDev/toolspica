import type { ToolContent } from "./types";

export const batchOcrProcessorContent: ToolContent = {
  heroSubtitle: "Run OCR on Many Images at Once, Get One ZIP Back",
  overview: [
    "Digitizing a whole folder of scanned pages or photographed documents one at a time gets tedious fast. This tool runs OCR (Tesseract, compiled to WebAssembly, entirely in your browser) across every image you add, one after another, and bundles all the recognized text into a single ZIP download.",
    "Each image produces its own .txt file inside the ZIP, named to match the original image's filename, so it's immediately clear which recognized text corresponds to which source image once you extract the results.",
    "Processing happens sequentially rather than in parallel, with live progress shown for each image as it's recognized — this keeps memory usage manageable even for a large batch, at the cost of total time scaling directly with the number of images.",
    "Every image and its recognized text stays entirely on your device throughout — nothing is uploaded, which matters when processing a batch of potentially sensitive scanned documents.",
  ],
  howItWorks: [
    { title: "Add multiple images", description: "Select as many images as you need OCR'd." },
    { title: "Processing runs one at a time", description: "Each image is recognized locally, with live progress shown." },
    { title: "Download one ZIP of results", description: "A matching .txt file for every image, bundled together." },
  ],
  examples: [
    { label: "Digitizing a folder of scanned pages", input: "12 scanned page images", output: "one ZIP containing 12 matching .txt files" },
  ],
  faqs: [
    { question: "Is my batch of images uploaded anywhere?", answer: "No — every image is processed entirely on your device via WebAssembly; nothing is uploaded at any point." },
    { question: "How are the output files named?", answer: "Each recognized text file matches its source image's filename (with a .txt extension), so it's clear which text came from which image." },
    { question: "How long does a large batch take?", answer: "Images process one at a time, so total time scales directly with how many images you add — a progress indicator shows which image is currently being processed." },
    { question: "Can I use a different language for the batch?", answer: "This tool is set to English — for other languages, process images individually with Multi-language OCR instead." },
    { question: "What happens if one image fails to process?", answer: "The batch stops and reports an error rather than silently skipping a failed image, so you know exactly which image needs attention." },
  ],
};
