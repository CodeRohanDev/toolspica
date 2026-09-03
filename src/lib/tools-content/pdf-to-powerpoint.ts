import type { ToolContent } from "./types";

export const pdfToPowerpointContent: ToolContent = {
  heroSubtitle: "Turn Every PDF Page Into a Full-Slide Image in a Real PPTX",
  overview: [
    "Turning a PDF into slides is a common need for presenting content that already exists as a finished document — a report someone wants to walk through slide-by-slide, a PDF handout that needs to become the basis for a talk, or a set of designed pages that need to live in PowerPoint for editing alongside other slides. This tool converts every page of a PDF into its own slide in a genuine .pptx PowerPoint file.",
    "Each page is rendered at high resolution and embedded as a full-slide image, scaled to fit PowerPoint's standard widescreen slide dimensions while preserving the page's original aspect ratio (centered, rather than stretched, if the proportions don't match exactly). This means the visual layout of your PDF carries over with complete accuracy — text, images, colors, and positioning all look exactly as they did in the source document, since nothing is re-interpreted or reconstructed.",
    "Technically, this builds a real PowerPoint Open XML (.pptx) file from scratch — a proper slide master, layout, theme, and one slide per page, all correctly linked together with the required internal relationships — verified for structural validity (well-formed XML throughout, correct ZIP packaging with the right internal file organization) before shipping, so it opens directly in PowerPoint, Google Slides, or LibreOffice Impress with no compatibility warnings.",
    "The trade-off for this pixel-perfect visual accuracy is editability: each slide's content is one flat image, not real, editable text boxes, shapes, or objects the way a native PowerPoint slide would have. You can move, resize, or add slides around the images, but you can't click into the image and edit text directly the way you could with content built natively in PowerPoint — for that, a tool that reconstructs live PowerPoint text objects from the PDF's content would be needed, which is a much more complex undertaking this tool doesn't attempt.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Every page will become one slide." },
    { title: "Pages are rendered to images", description: "Each page renders at high resolution, preserving its exact visual appearance." },
    { title: "Download the PowerPoint file", description: "A genuine .pptx file is generated, one image-filled slide per page." },
  ],
  examples: [
    { label: "Turning a report into slides", input: "12-page PDF report", output: "a .pptx file with 12 slides, each showing that page's content exactly" },
  ],
  faqs: [
    { question: "Can I edit the text on each slide after converting?", answer: "Not directly — each slide's content is a single embedded image, not editable text boxes. You can move, resize, or reorder slides, but editing the visual content itself would require redoing it in the original PDF and reconverting." },
    { question: "Will the slides look exactly like my PDF pages?", answer: "Yes — since each slide is a high-resolution rendered image of the original page, the visual layout, text, images, and colors are reproduced with complete accuracy, unlike a text-extraction-based conversion." },
    { question: "Will the file open correctly in PowerPoint?", answer: "Yes — it's a genuine .pptx file with the required slide master, layout, theme, and slide structure, verified for structural correctness before shipping, so it opens without compatibility warnings in PowerPoint, Google Slides, or LibreOffice Impress." },
    { question: "What slide size does the output use?", answer: "PowerPoint's standard widescreen (16:9) slide dimensions — each page image is scaled to fit within that size while preserving its own aspect ratio, centered if the proportions don't match exactly." },
    { question: "Is there a way to get editable text on the slides instead of images?", answer: "Not with this tool — reconstructing live, editable PowerPoint text objects from a PDF's layout is a much more complex undertaking. If you need editable slide text and have the original source document, converting from that directly to PowerPoint would preserve editability." },
  ],
};
