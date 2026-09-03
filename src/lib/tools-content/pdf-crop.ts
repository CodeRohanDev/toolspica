import type { ToolContent } from "./types";

export const pdfCropContent: ToolContent = {
  heroSubtitle: "Trim Excess Margins From Every Page With Adjustable Sliders",
  overview: [
    "PDFs with oversized margins are a common annoyance — a scanned page with wide blank borders, a document exported at a larger page size than its actual content needs, or a printout captured with extra white space around the edges. Trimming this manually usually isn't possible without design software; this tool lets you crop uniform margins off every page using simple percentage-based sliders for each side.",
    "Independent sliders for the top, bottom, left, and right margins let you trim different amounts from each side — useful when a scan is off-center and one edge has noticeably more excess space than another. Margins are set as a percentage of each page's dimensions rather than a fixed measurement, so the same settings scale sensibly whether your document is Letter, A4, or any other page size.",
    "Technically, this works by setting each page's crop box — a standard PDF property that defines the visible and printable region of a page — rather than by deleting or redrawing any content. This is the correct, non-destructive way to crop a PDF: the full original page content remains present in the file, just outside the crop box boundary, which means the operation is fast and completely reversible by resetting the crop box in a more advanced PDF editor if ever needed.",
    "Because the underlying content isn't touched, cropping doesn't reduce file size meaningfully and doesn't affect text selectability or image quality within the visible area — it purely changes what portion of each page is shown and printed.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for cropping." },
    { title: "Adjust margin sliders", description: "Set how much to trim from the top, bottom, left, and right as a percentage." },
    { title: "Crop and download", description: "Every page's crop box is updated to the new, smaller visible area." },
  ],
  examples: [
    { label: "Trimming wide scan margins", input: "scanned page with large white borders, 15% margins on all sides", output: "same page with 15% trimmed off each edge" },
  ],
  faqs: [
    { question: "Does cropping delete the content outside the crop box?", answer: "No — it sets the page's crop box, a standard PDF property defining the visible/printable region, without deleting any underlying content. This is non-destructive by design." },
    { question: "Will cropping reduce the PDF's file size?", answer: "Only marginally — since the full page content remains in the file (just outside the visible area), file size stays roughly the same regardless of how much is cropped." },
    { question: "Can I crop different amounts from each side?", answer: "Yes — the top, bottom, left, and right margins each have independent sliders, so you can trim more from one side than another for off-center scans." },
    { question: "Is the crop percentage based on the page size or a fixed measurement?", answer: "It's a percentage of that page's own width or height, so the same slider setting works proportionally across pages of different sizes within the same document." },
    { question: "Can I undo a crop after downloading?", answer: "Not with this tool — but since the crop box is non-destructive at the PDF format level, the original content remains recoverable using a PDF editor capable of resetting the crop box, even though this tool doesn't offer that." },
  ],
};
