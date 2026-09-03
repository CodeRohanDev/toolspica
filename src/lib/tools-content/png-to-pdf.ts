import type { ToolContent } from "./types";

export const pngToPdfContent: ToolContent = {
  heroSubtitle: "Turn Multiple PNG Images Into One Ordered PDF",
  overview: [
    "PNG is the default format for screenshots, exported diagrams, and graphics with sharp edges or transparency, and combining several of them into a single PDF is a common need — a set of screenshots documenting a bug report, a series of diagram exports for a technical document, or design mockups that need to go out as one file rather than a folder of loose images. This tool converts any number of PNG files into a single PDF, one image per page.",
    "Images are added by selecting one or multiple PNG files at once, then arranged into the right order using up/down controls next to each thumbnail in the list — the final PDF's page order exactly matches this list order, so you can fix any mis-ordering before generating rather than after.",
    "Each page is sized to match its source PNG's exact pixel dimensions, and the image data is embedded directly into the PDF using PNG's native compression rather than being decoded and converted to another format — this preserves image quality exactly, including PNG's lossless detail and any transparency information encoded in the file.",
    "Because PNG files (unlike JPG) commonly contain transparency, it's worth noting that a transparent PNG embedded this way keeps its alpha channel information in the PDF, but since each image becomes an opaque page background, transparent areas won't show through to a page behind them the way they might in a layered graphics document — each page is still a single flat image.",
  ],
  howItWorks: [
    { title: "Add your PNG images", description: "Click to select one or multiple PNG files." },
    { title: "Arrange the order", description: "Use the up/down arrows to set the page sequence you want." },
    { title: "Generate and download the PDF", description: "Each image becomes one full page in a single combined PDF." },
  ],
  examples: [
    { label: "Combining bug report screenshots", input: "5 PNG screenshots", output: "one 5-page PDF, one screenshot per page, in the arranged order" },
  ],
  faqs: [
    { question: "Does converting to PDF reduce my PNG's quality?", answer: "No — PNG data is embedded directly into the PDF using its native compression, preserving image quality and detail exactly as in the source file." },
    { question: "What happens to transparency in my PNG files?", answer: "Transparency information is preserved in the embedded image, but since each PNG becomes a full standalone page, there's nothing behind it for transparent areas to show through — each page functions as one flat, complete image." },
    { question: "What page size does each image get?", answer: "Each page is sized to exactly match that image's pixel dimensions, so there's no stretching or unwanted white space around the content." },
    { question: "Can I combine both PNG and JPG images in one file?", answer: "This tool only accepts PNG files — use the Scan to PDF tool instead if you need to combine mixed image formats into a single PDF." },
    { question: "Is anything uploaded to a server during conversion?", answer: "No — the entire process, from reading your PNG files to generating the final PDF, runs locally in your browser." },
  ],
};
