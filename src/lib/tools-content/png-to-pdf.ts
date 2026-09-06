import type { ToolContent } from "./types";

export const pngToPdfContent: ToolContent = {
  heroSubtitle: "Turn PNG, JPG, WEBP, or Any Image Into One Ordered PDF",
  overview: [
    "PNG is the default format for screenshots, exported diagrams, and graphics with sharp edges or transparency, and combining several of them into a single PDF is a common need — a set of screenshots documenting a bug report, a series of diagram exports for a technical document, or design mockups that need to go out as one file rather than a folder of loose images. This tool converts any number of images — PNG, JPG, WEBP, and more — into a single PDF, one image per page, without needing to sort files by format first.",
    "Images are added by selecting one or multiple files at once, then arranged into the right order using up/down controls next to each thumbnail in the list — the final PDF's page order exactly matches this list order, so you can fix any mis-ordering before generating rather than after.",
    "Each page is sized to match its source image's exact pixel dimensions. Because a PDF page is always opaque, any transparent areas in a PNG are filled with white before the page is built — a transparent PNG becomes a page with a plain white background wherever it was see-through, which is the expected, standard behavior for turning a transparent graphic into a printable page.",
    "Everything happens locally in your browser: images are read from disk, drawn onto pages, and the result is offered as a direct download, with no upload to any server at any point in the process.",
  ],
  howItWorks: [
    { title: "Add your images", description: "Click to select one or multiple image files — PNG, JPG, WEBP, and more all work." },
    { title: "Arrange the order", description: "Use the up/down arrows to set the page sequence you want." },
    { title: "Generate and download the PDF", description: "Each image becomes one full page in a single combined PDF." },
  ],
  examples: [
    { label: "Combining bug report screenshots", input: "5 PNG screenshots", output: "one 5-page PDF, one screenshot per page, in the arranged order" },
  ],
  faqs: [
    { question: "Does this only work with PNG files?", answer: "No — despite the name, it accepts any common image format, including JPG, WEBP, GIF, and BMP, alongside PNG. Just select your files; there's no need to check the exact format first." },
    { question: "What happens to transparency in my PNG files?", answer: "Since a PDF page can't be transparent, any see-through areas in a PNG are filled with white when the page is built. This is standard for turning a transparent graphic into a printable page, but it means the transparency itself isn't preserved in the PDF." },
    { question: "Does converting to PDF reduce my image's quality?", answer: "Images are re-encoded as high-quality JPEG when building each page, which is visually indistinguishable from the source for regular photos and screenshots, though it isn't strictly lossless." },
    { question: "What page size does each image get?", answer: "Each page is sized to exactly match that image's pixel dimensions, so there's no stretching or unwanted white space around the content." },
    { question: "Can I combine PNG, JPG, and other formats in one file?", answer: "Yes — add any mix of image formats in one session and they'll all be combined into a single PDF, one page per image, in the order you arrange them." },
    { question: "Is anything uploaded to a server during conversion?", answer: "No — the entire process, from reading your image files to generating the final PDF, runs locally in your browser." },
  ],
};
