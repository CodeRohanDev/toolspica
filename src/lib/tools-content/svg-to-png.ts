import type { ToolContent } from "./types";

export const svgToPngContent: ToolContent = {
  heroSubtitle: "Convert Vector SVG Files to Raster PNG Images",
  overview: [
    "SVG (Scalable Vector Graphics) files describe images mathematically — shapes, paths, and curves — which scales perfectly to any size, but plenty of tools and platforms only accept raster formats like PNG that store a fixed grid of pixels instead.",
    "This tool renders an SVG file to a PNG image at its natural pixel dimensions, converting the vector description into a standard raster bitmap that any image viewer, editor, or platform can display without needing SVG support specifically.",
    "PNG is used as the output format (rather than JPEG) since it preserves the transparency SVG files commonly rely on — an SVG icon or logo with a transparent background stays transparent in the resulting PNG rather than getting a solid color forced behind it.",
    "This is useful for converting an SVG logo or icon for use somewhere that doesn't accept vector formats, preparing an SVG for a platform that requires a raster image, embedding an SVG design into a raster-based image editing workflow, and general SVG-to-raster conversion.",
  ],
  howItWorks: [
    {
      title: "Upload an SVG file",
      description: "Rendered using your browser's native SVG support.",
    },
    {
      title: "Conversion happens automatically",
      description: "The SVG is rasterized to PNG at its natural pixel dimensions.",
    },
    {
      title: "Download the PNG",
      description: "With transparency preserved wherever the SVG had it.",
    },
  ],
  examples: [
    {
      label: "Converting a vector logo for a platform that needs PNG",
      input: "logo.svg",
      output: "logo.png with transparency preserved",
    },
  ],
  faqs: [
    {
      question: "Why does converting from vector to raster lose the ability to scale perfectly?",
      answer:
        "This is the fundamental trade-off between vector and raster formats — SVG describes shapes mathematically so it scales to any size without quality loss, while PNG stores a fixed grid of pixels that becomes blurry or pixelated if enlarged significantly beyond its original resolution.",
    },
    {
      question: "What pixel dimensions does the resulting PNG have?",
      answer:
        "The SVG's natural rendered dimensions, as defined by its own width/height or viewBox attributes. If you need a specific larger size, use the Image Resizer tool afterward, keeping in mind the underlying detail won't exceed what the original SVG could render at.",
    },
    {
      question: "Does transparency carry over correctly?",
      answer:
        "Yes — any transparent or partially transparent areas in the SVG remain transparent in the PNG output, since PNG (unlike JPEG) fully supports an alpha transparency channel.",
    },
    {
      question: "Can this convert an SVG with embedded fonts or external references?",
      answer:
        "It depends on what your browser can render — if the SVG references external resources (like a web font) that aren't available, those elements may render differently or not at all. Self-contained SVGs with inline styling convert most reliably.",
    },
    {
      question: "Is the SVG file uploaded anywhere to convert it?",
      answer:
        "No — rendering and conversion happen entirely in your browser using native SVG support and the Canvas API. The file is never uploaded to a server.",
    },
  ],
};
