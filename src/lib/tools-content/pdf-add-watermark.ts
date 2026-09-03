import type { ToolContent } from "./types";

export const pdfAddWatermarkContent: ToolContent = {
  heroSubtitle: "Stamp Text Across Every Page — Draft, Confidential, or Custom",
  overview: [
    "Watermarking is a quick way to signal a document's status — marking a draft as not-yet-final, labeling something confidential before it's shared internally, or stamping a sample copy so it's clear it isn't the paid or final version. Doing this by hand in a design tool for every page of a multi-page document is slow; this tool applies your chosen text as a semi-transparent overlay across every page in one pass.",
    "You control the watermark text itself, its opacity (so it can sit subtly in the background or stand out boldly), its font size, and its rotation angle — the default 45° diagonal is the classic \"CONFIDENTIAL\" stamp look, but a 0° angle gives a plain horizontal banner instead. The text is centered on each page using its actual measured width at the chosen font size, so it stays visually centered regardless of how long the watermark text is.",
    "Technically, the watermark is drawn as real vector text using a bold Helvetica font embedded directly into the PDF, not as a rasterized image — this keeps file size small and means the watermark stays crisp at any zoom level. Because it's drawn on top of the existing page content in a single pass, the underlying content (text, images) is completely unchanged; only the watermark layer is added.",
    "This applies the same watermark uniformly to every page of the document — there's no per-page customization, since the point of a watermark is a consistent, unmistakable stamp across the whole document. If you need different treatment for different pages, run the tool multiple times on page ranges extracted with the PDF Extract Pages tool first.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for watermarking." },
    { title: "Set text, opacity, size, and angle", description: "Adjust the sliders and text field until the preview settings look right." },
    { title: "Apply and download", description: "Every page gets the watermark stamped on, and the file downloads." },
  ],
  examples: [
    { label: "Marking a draft", input: "\"DRAFT\" text, 30% opacity, 45° angle", output: "every page shows a diagonal, semi-transparent DRAFT stamp" },
  ],
  faqs: [
    { question: "Is the watermark a real text layer or an image?", answer: "It's real vector text drawn with an embedded bold Helvetica font, not a rasterized image — this keeps the file size small and the watermark sharp at any zoom level." },
    { question: "Can I remove or edit a watermark added this way later?", answer: "Not with this tool — once applied and saved, the watermark becomes part of the page content like any other drawn text. Keep a copy of your original file if you might need an unwatermarked version later." },
    { question: "Can I apply different watermarks to different pages?", answer: "Not in a single pass — this tool applies one watermark uniformly to every page. For different treatments per section, extract page ranges first with PDF Extract Pages and watermark each separately." },
    { question: "Does the watermark cover up or replace the original content?", answer: "No — it's drawn on top as a semi-transparent overlay, so the underlying text and images remain fully intact and visible underneath." },
    { question: "What opacity should I use so text underneath stays readable?", answer: "Around 15-30% keeps the original content clearly readable while still making the watermark unmistakable — higher values are better for cover pages or images where readability of the base content matters less." },
  ],
};
