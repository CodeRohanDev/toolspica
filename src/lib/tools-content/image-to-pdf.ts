import type { ToolContent } from "./types";

export const imageToPdfContent: ToolContent = {
  heroSubtitle: "Combine Images into a Multi-Page PDF Document",
  overview: [
    "Turning a set of photos or scans into a single PDF is a common need — for submitting documents, sharing a photo set as one file, or archiving images in a more portable, universally-viewable format than a folder of separate image files.",
    "This tool builds a real, standards-compliant PDF from scratch, embedding each image as a JPEG directly into its own page using the PDF specification's native image embedding (DCTDecode), with no external library or server involved. Add multiple images and reorder them before generating — each becomes its own page in the final document, in the order you arrange them.",
    "The PDF writer was verified by rasterizing generated output with Poppler's pdftoppm tool (an independent, industry-standard PDF renderer) and confirming pixel-exact matches against the source images across multiple pages and sample points — along with structural validation via pdfinfo confirming correct page count and document structure.",
    "This is useful for combining scanned document pages into one PDF, submitting a set of photos as a single file for an application or form, archiving a photo set in a more portable format, and any situation needing multiple images bundled into one shareable PDF.",
  ],
  howItWorks: [
    {
      title: "Add multiple images",
      description: "Select as many as you need, in any order.",
    },
    {
      title: "Reorder as needed",
      description: "Use the up/down controls to set the final page order.",
    },
    {
      title: "Generate and download the PDF",
      description: "Each image becomes its own page, at its own dimensions.",
    },
  ],
  examples: [
    {
      label: "Combining scanned pages into one PDF",
      input: "3 scanned document photos",
      output: "A 3-page PDF, one scan per page, in the order arranged",
    },
  ],
  faqs: [
    {
      question: "Does each page match its source image's exact size?",
      answer:
        "Yes — each PDF page is sized to match its source image's pixel dimensions directly (interpreted as points), so images of different sizes each get an appropriately-sized page rather than being forced onto a uniform page size.",
    },
    {
      question: "Is the PDF a genuine standards-compliant file, or just an image wrapped in a PDF-like format?",
      answer:
        "It's built directly against the real PDF specification — proper object structure, cross-reference table, and JPEG images embedded via the standard DCTDecode filter — verified by rendering it with Poppler's own PDF renderer and confirming pixel-exact output, not just that it merely opens without erroring.",
    },
    {
      question: "Can I reorder images before generating the PDF?",
      answer:
        "Yes — use the up and down arrows next to each image in the queue to rearrange them into your desired page order before generating.",
    },
    {
      question: "Does combining images into a PDF reduce quality?",
      answer:
        "Each image is re-encoded as JPEG at high quality (92%) before embedding, which involves a small amount of lossy compression — visually near-identical to the original for most images, though not strictly pixel-for-pixel identical to a lossless source.",
    },
    {
      question: "Are my images uploaded anywhere to build the PDF?",
      answer:
        "No — the entire PDF, including all embedded images, is built and assembled entirely in your browser. Nothing is ever uploaded to a server.",
    },
  ],
};
