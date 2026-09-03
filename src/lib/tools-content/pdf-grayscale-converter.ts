import type { ToolContent } from "./types";

export const pdfGrayscaleConverterContent: ToolContent = {
  heroSubtitle: "Convert a Full-Color PDF to Grayscale for Printing or Filing",
  overview: [
    "Color PDFs often need to become grayscale for practical reasons — printing on a black-and-white printer without wasting color toner, meeting a filing or submission requirement that specifies grayscale, or simply reducing visual clutter in a document where color isn't meaningfully carrying information. This tool converts every page of a PDF to grayscale, entirely in your browser.",
    "Each page is rendered to a bitmap image, then every pixel is desaturated using the standard luminance formula (0.299×red + 0.587×green + 0.114×blue) — the same weighted formula broadcast television and most professional image-editing software use to convert color to grayscale, since it accounts for how the human eye perceives different colors as varying in brightness (green appears brighter than blue at equal intensity, for example), producing a more natural-looking grayscale result than a simple average of the three color channels would.",
    "The desaturated page is then re-embedded as a compressed image in a freshly built PDF, replacing the original page content. This approach works uniformly regardless of whether the source page contains vector graphics, embedded photos, or a mix of both, since the conversion operates on the final rendered pixels rather than needing to understand or modify each individual page element separately.",
    "The direct consequence of rendering pages to images is that the output's text is no longer selectable or searchable — each page becomes a picture rather than staying as live vector text. This is the same trade-off shared by other tools in this category that rasterize pages (Compress, Redact, Flatten), and it's what makes a uniform, guaranteed color conversion possible across any kind of page content.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for grayscale conversion." },
    { title: "Convert to grayscale", description: "Every page is rendered and desaturated using the standard luminance formula." },
    { title: "Download the grayscale PDF", description: "A new PDF with every page converted to grayscale is produced." },
  ],
  examples: [
    { label: "Preparing a document for black-and-white printing", input: "colorful 10-page PDF presentation", output: "same 10 pages, fully desaturated to grayscale" },
  ],
  faqs: [
    { question: "Will my PDF's text still be selectable after converting to grayscale?", answer: "No — every page is rendered to an image and desaturated, so text becomes part of the picture rather than staying as selectable vector text. This is the trade-off that makes uniform grayscale conversion possible across any page content." },
    { question: "Why use a weighted formula instead of just averaging the color channels?", answer: "The standard luminance formula (0.299R + 0.587G + 0.114B) weights each color channel according to how brightly the human eye perceives it — green contributes more to perceived brightness than blue at the same intensity — producing a more natural, accurate-looking grayscale result than a flat average would." },
    { question: "Does this work on scanned PDFs?", answer: "Yes — since conversion operates on the rendered pixels of each page, it works identically whether the source is vector graphics, a scanned photo, or a mix of both." },
    { question: "Will file size change after converting to grayscale?", answer: "It typically decreases somewhat, since grayscale images generally compress a bit more efficiently than full-color ones, though the primary purpose of this tool is the color conversion itself, not compression — use PDF Compress separately for more aggressive size reduction." },
    { question: "Can I convert a password-protected PDF to grayscale?", answer: "Not directly — remove the password first with PDF Unlock, then convert the resulting file." },
  ],
};
