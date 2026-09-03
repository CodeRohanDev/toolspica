import type { ToolContent } from "./types";

export const pdfToPngContent: ToolContent = {
  heroSubtitle: "Turn Every PDF Page Into a Lossless PNG Image",
  overview: [
    "PNG is the right choice over JPG whenever a page's content includes sharp text, line art, diagrams, or anything where JPEG's lossy compression would introduce visible artifacts around edges — a technical diagram, a screenshot-style document, or a page you plan to zoom into significantly. This tool renders every page of a PDF to a PNG image, preserving crisp edges and exact pixel values with no compression-related quality loss.",
    "Each page is rendered at 2x scale using the same rendering engine that powers PDF viewing in browsers (Mozilla's pdf.js), producing a faithful reproduction of the page's vector text, images, and graphics — not an approximation. PNG's lossless compression is then applied to the rendered canvas, so the output file captures every pixel exactly as rendered, unlike JPG which discards some detail to achieve smaller file sizes.",
    "A single-page PDF downloads as one PNG file directly; multi-page PDFs bundle every page's PNG into a single ZIP file, sequentially named (page-1.png, page-2.png, and so on) so the order is always clear without needing to open each file to check.",
    "The trade-off for PNG's lossless quality is file size — PNG files are typically several times larger than an equivalent-quality JPG, especially for photographic content. For pages that are mostly photos rather than text or line art, the PDF to JPG tool will usually produce a much smaller, still visually excellent result.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page count is detected automatically." },
    { title: "Click convert", description: "Every page is rendered to a lossless PNG image." },
    { title: "Download your image(s)", description: "One PNG for a single page, or a ZIP of all pages for multi-page PDFs." },
  ],
  examples: [
    { label: "Converting a technical diagram page", input: "1-page PDF with a detailed diagram", output: "one PNG file with crisp, artifact-free lines" },
  ],
  faqs: [
    { question: "When should I use PNG instead of JPG for this conversion?", answer: "PNG is better for pages with sharp text, line art, or diagrams where you want zero compression artifacts — JPG is better for photo-heavy pages where a much smaller file size matters more than pixel-perfect fidelity." },
    { question: "Why are my PNG files so much larger than the JPG equivalent would be?", answer: "PNG uses lossless compression, preserving every pixel exactly, while JPG's lossy compression discards some visual detail to achieve much smaller files — this is the fundamental trade-off between the two formats." },
    { question: "Will text in the resulting PNGs be selectable?", answer: "No — once rendered to an image, the page becomes a fixed picture with no underlying text data, regardless of whether it's exported as PNG or JPG." },
    { question: "How do multi-page PDFs get downloaded?", answer: "As a single ZIP file containing one PNG per page, sequentially named so you can tell the page order immediately." },
    { question: "Can I convert just a few specific pages instead of the whole PDF?", answer: "Use PDF Extract Pages first to pull out the specific pages you want, then convert that smaller resulting PDF to PNG." },
  ],
};
