import type { ToolContent } from "./types";

export const jpgToPdfContent: ToolContent = {
  heroSubtitle: "Turn JPG, PNG, WEBP, or Any Image Into One Ordered PDF",
  overview: [
    "Combining several photos into a single shareable document — receipts for an expense report, pages of a signed form photographed with a phone, or a set of images someone specifically requested as \"one PDF\" rather than a folder of loose files — is a task that comes up constantly, and JPG is the most common photo format you'll be starting from. This tool takes any number of images — JPG, PNG, WEBP, GIF, BMP, and more — and produces one PDF with each image as its own full page, in whatever order you arrange them, so you never have to check the exact file type first.",
    "Images are added by clicking to select one or several files at once, and each one appears in a reorderable list with a small thumbnail preview, its filename, and file size — the up/down arrows next to each entry let you fix the order before generating, which matters since the final page order in the PDF exactly matches the list order.",
    "Each page is sized to match its source image's exact pixel dimensions (so a 1600×1200 photo becomes a page that's 1600×1200 PDF points). Images are re-encoded as high-quality JPEG when the PDF is built, which keeps every input format — including ones PDF can't embed natively, like WEBP — working the same way, at a quality level that's visually indistinguishable from the source for photos.",
    "Everything happens locally in your browser: images are read from disk, embedded into a PDF structure, and the result is offered as a direct download, with no upload to any server at any point in the process — appropriate for anything from casual photos to sensitive scanned documents.",
  ],
  howItWorks: [
    { title: "Add your images", description: "Click to select one or multiple image files — JPG, PNG, WEBP, and more all work." },
    { title: "Arrange the order", description: "Use the up/down arrows so pages will appear in the sequence you want." },
    { title: "Generate and download the PDF", description: "Each image becomes one full page in a single combined PDF." },
  ],
  examples: [
    { label: "Combining expense receipts", input: "4 photos of receipts (JPG or PNG)", output: "one 4-page PDF, one receipt per page, in the order arranged" },
  ],
  faqs: [
    { question: "Does this only work with JPG files?", answer: "No — despite the name, it accepts any common image format, including PNG, WEBP, GIF, and BMP, alongside JPG. Just select your files; there's no need to check the exact format first." },
    { question: "Does converting to PDF reduce my photo quality?", answer: "Images are re-encoded as high-quality JPEG when building the PDF, which is visually indistinguishable from the source for regular photos, though it isn't strictly lossless for already-compressed JPGs or for formats with transparency, like PNG." },
    { question: "What page size does each image get?", answer: "Each page is sized to exactly match that image's pixel dimensions, so there's no stretching, cropping, or extra white space — the photo fills its page completely." },
    { question: "Can I control what order the images appear in the PDF?", answer: "Yes — use the up/down arrows on each item in the list before generating; the final page order in the PDF matches the list order exactly." },
    { question: "Can I mix JPG, PNG, and other formats in the same PDF?", answer: "Yes — add any mix of image formats in one session and they'll all be combined into a single PDF, one page per image, in the order you arrange them." },
    { question: "Is there a limit to how many images I can combine?", answer: "No hard limit is enforced, though very large batches of high-resolution photos will take longer and use more browser memory since everything processes on your device." },
  ],
};
