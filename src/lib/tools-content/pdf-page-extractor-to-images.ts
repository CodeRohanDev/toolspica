import type { ToolContent } from "./types";

export const pdfPageExtractorToImagesContent: ToolContent = {
  heroSubtitle: "Pull the Original Embedded Photos Out of a PDF — Not a Page Render",
  overview: [
    "This tool solves a different problem than PDF to JPG or PDF to PNG, even though the names sound similar: those tools rasterize whole pages into new images, capturing exactly how a page looks including any surrounding text or layout. This tool instead reaches inside the PDF's internal structure and pulls out the original image files that were embedded in it in the first place — the actual photo someone inserted into the document, at its original resolution and compression, not a re-rendered screenshot of the page around it.",
    "Every page is scanned for embedded image objects (technically called XObjects in the PDF specification), and each one found is handled according to how it's stored internally: images embedded as JPEG data (the overwhelmingly common case for photos in PDFs) are extracted byte-for-byte identical to how they were originally embedded — verified against a real test file to confirm the extracted bytes match the source image exactly, down to the MD5 checksum. Plain uncompressed RGB or grayscale images are converted to PNG format for you to use directly.",
    "Some image encodings aren't supported yet — indexed-color palettes, CMYK color images, and a few other advanced PDF image encodings are detected but skipped rather than silently producing garbled output, and the tool reports exactly how many images it had to skip alongside how many it successfully extracted, so you always know the complete picture rather than being left to wonder if something was missed.",
    "Extracted images are offered as a single download: one direct file if only one image was found, or a ZIP archive bundling every extracted image if there are several — which is common, since a single PDF page often contains multiple embedded images (a photo plus a logo, for example, both stored as separate objects even though they appear on the same page).",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Every page is scanned for embedded image objects." },
    { title: "Images are extracted automatically", description: "JPEGs come out byte-identical; plain RGB/grayscale images convert to PNG." },
    { title: "Download the image(s)", description: "One file directly, or a ZIP if multiple images were found." },
  ],
  examples: [
    { label: "Pulling a photo out of a report", input: "PDF with one embedded JPEG photo on page 3", output: "the original JPEG file, byte-identical to how it was embedded" },
  ],
  faqs: [
    { question: "How is this different from PDF to JPG or PDF to PNG?", answer: "Those tools rasterize entire pages into new images, capturing how the page looks visually. This tool extracts the actual original image files embedded inside the PDF's structure — the source photo itself, not a screenshot of the page it appears on." },
    { question: "Will the extracted JPEG be identical to the original photo?", answer: "Yes — JPEG-encoded images are extracted byte-for-byte from the PDF's internal data, verified against a real test file to match the source exactly, including an identical checksum. Nothing is re-compressed or re-rendered." },
    { question: "What image types aren't supported?", answer: "Indexed-color palette images, CMYK color images, and a few other advanced PDF image encodings are detected but skipped rather than producing incorrect output — the tool reports how many images were skipped alongside how many succeeded." },
    { question: "What if my PDF has no embedded images at all?", answer: "You'll see a message that no extractable embedded images were found — this happens when a PDF only contains vector text and drawings, or when its content is entirely made of page-rendered content rather than separately embedded image objects." },
    { question: "Why would I get a ZIP file instead of a single image?", answer: "When more than one embedded image is found across the document's pages, all extracted images are bundled into one ZIP download so you get everything in a single file rather than one download per image." },
  ],
};
