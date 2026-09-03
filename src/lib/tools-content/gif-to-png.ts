import type { ToolContent } from "./types";

export const gifToPngContent: ToolContent = {
  heroSubtitle: "Extract a PNG Image from a GIF File",
  overview: [
    "GIF files are used both for animated images and simple static graphics, but plenty of tools and workflows expect a standard static image format instead — and PNG is the natural choice, since it preserves any transparency a GIF might have.",
    "This tool converts a GIF's first frame into a PNG image, using your browser's native GIF decoding. For a static (non-animated) GIF this captures the entire image; for an animated GIF, it captures the first frame only, since browsers render just the current animation frame onto a canvas at any given moment.",
    "PNG is used as the output format specifically because it preserves GIF's transparency support — a GIF with a transparent background stays transparent in the resulting PNG, unlike converting to JPEG which would force a solid background.",
    "This is useful for extracting a static image from an animated GIF, converting a simple graphic GIF to PNG for better tooling compatibility, pulling a single frame from a GIF for further editing, and general GIF-to-static-image conversion.",
  ],
  howItWorks: [
    {
      title: "Upload a GIF file",
      description: "Static or animated.",
    },
    {
      title: "The first frame is captured",
      description: "Rendered using your browser's native GIF decoding.",
    },
    {
      title: "Download as PNG",
      description: "With transparency preserved wherever the GIF had it.",
    },
  ],
  examples: [
    {
      label: "Extracting a static image from an animated GIF",
      input: "animation.gif",
      output: "animation.png, showing the first frame",
    },
  ],
  faqs: [
    {
      question: "Which frame of an animated GIF does this capture?",
      answer:
        "The first frame — this is a limitation of how browsers render GIFs onto a canvas, which only ever shows the currently displayed frame at any given moment, and that's the first frame at the point the image loads.",
    },
    {
      question: "Can this extract every frame of an animated GIF?",
      answer:
        "No, not currently — this captures only the first frame as a single static PNG. For extracting all frames individually, a dedicated GIF frame-splitting tool with its own GIF decoder would be needed.",
    },
    {
      question: "Does transparency carry over from the GIF?",
      answer:
        "Yes — GIF supports simple on/off transparency (no partial transparency), and any transparent pixels in the source GIF remain transparent in the resulting PNG.",
    },
    {
      question: "Why convert a GIF to PNG instead of just keeping the GIF?",
      answer:
        "PNG offers better color depth and compression for static images (GIF is limited to 256 colors total), and many tools and workflows expect a standard static format rather than a potentially-animated one, even when only a single frame is needed.",
    },
    {
      question: "Is the GIF file uploaded anywhere to convert it?",
      answer:
        "No — the conversion happens entirely in your browser using native GIF decoding and the Canvas API. The file is never uploaded to a server.",
    },
  ],
};
