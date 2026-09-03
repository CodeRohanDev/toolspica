import type { ToolContent } from "./types";

export const jpgToPdfContent: ToolContent = {
  heroSubtitle: "Turn Multiple JPG Photos Into One Ordered PDF",
  overview: [
    "Combining several photos into a single shareable document — receipts for an expense report, pages of a signed form photographed with a phone, or a set of images someone specifically requested as \"one PDF\" rather than a folder of loose files — is a task that comes up constantly, and JPG is the most common photo format you'll be starting from. This tool takes any number of JPG images and produces one PDF with each image as its own full page, in whatever order you arrange them.",
    "Images are added by clicking to select one or several files at once, and each one appears in a reorderable list with a small thumbnail preview, its filename, and file size — the up/down arrows next to each entry let you fix the order before generating, which matters since the final page order in the PDF exactly matches the list order.",
    "Each page is sized to match its source image's exact pixel dimensions (so a 1600×1200 photo becomes a page that's 1600×1200 PDF points), and the JPEG data is embedded directly into the PDF without being decoded and re-encoded — this preserves the original image quality exactly and keeps file size close to the sum of the input images rather than inflating it.",
    "Everything happens locally in your browser: images are read from disk, embedded into a PDF structure, and the result is offered as a direct download, with no upload to any server at any point in the process — appropriate for anything from casual photos to sensitive scanned documents.",
  ],
  howItWorks: [
    { title: "Add your JPG images", description: "Click to select one or multiple JPG files." },
    { title: "Arrange the order", description: "Use the up/down arrows so pages will appear in the sequence you want." },
    { title: "Generate and download the PDF", description: "Each image becomes one full page in a single combined PDF." },
  ],
  examples: [
    { label: "Combining expense receipts", input: "4 JPG photos of receipts", output: "one 4-page PDF, one receipt per page, in the order arranged" },
  ],
  faqs: [
    { question: "Does converting to PDF reduce my photo quality?", answer: "No — the original JPEG data is embedded directly into the PDF without being re-encoded, so image quality is exactly preserved from the source files." },
    { question: "What page size does each image get?", answer: "Each page is sized to exactly match that image's pixel dimensions, so there's no stretching, cropping, or extra white space — the photo fills its page completely." },
    { question: "Can I control what order the images appear in the PDF?", answer: "Yes — use the up/down arrows on each item in the list before generating; the final page order in the PDF matches the list order exactly." },
    { question: "Can I mix JPG and PNG images in one PDF?", answer: "This tool only accepts JPG files — use the PNG to PDF tool for PNG images, or Scan to PDF, which accepts any image format and normalizes them all together." },
    { question: "Is there a limit to how many images I can combine?", answer: "No hard limit is enforced, though very large batches of high-resolution photos will take longer and use more browser memory since everything processes on your device." },
  ],
};
