import type { ToolContent } from "./types";

export const imageWatermarkContent: ToolContent = {
  heroSubtitle: "Add a Text Watermark to Any Image",
  overview: [
    "A watermark discourages unauthorized use of your images and marks ownership clearly — a common need for photographers, designers, and anyone sharing original work publicly where copies could otherwise circulate without attribution.",
    "This tool overlays customizable text onto any image, with control over position (each corner or center), size, and opacity. A dark outline around the text keeps it readable regardless of what's behind it — light or dark background alike.",
    "Because the watermark is drawn directly into the pixel data rather than as a removable overlay layer, the exported image has the watermark permanently baked in — it can't be stripped by simply opening the file in another program the way a separate overlay layer could.",
    "This is useful for marking photography portfolios before public sharing, adding a copyright notice or website name to images, branding screenshots or graphics before distribution, and any situation needing a visible ownership mark on shared images.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Enter your watermark text",
      description: "Choose position, size, and opacity.",
    },
    {
      title: "Download the watermarked image",
      description: "The watermark is permanently part of the exported pixels.",
    },
  ],
  examples: [
    {
      label: "Adding a copyright watermark to a photo",
      input: 'Text: "© Jane Doe 2026", Position: bottom right, Opacity: 60%',
      output: "The photo with a semi-transparent copyright notice in the bottom-right corner",
    },
  ],
  faqs: [
    {
      question: "Can a watermark be completely removed from an image?",
      answer:
        "Since the watermark is drawn directly into the image's pixels, it can't be stripped as a separate layer the way a removable overlay could. That said, no visible watermark is ever fully unremovable by determined editing — the goal is deterring casual reuse and marking ownership clearly, not absolute protection.",
    },
    {
      question: "What opacity should I use?",
      answer:
        "40-70% is a common range — visible enough to clearly mark the image, but not so opaque it obscures the content underneath. Lower opacity works better for a subtle, less intrusive mark; higher opacity if the priority is making the watermark impossible to miss.",
    },
    {
      question: "Why does the watermark have a dark outline?",
      answer:
        "The outline keeps the text readable regardless of what's behind it in the image — plain white text alone can disappear against a light sky or white background, while the outline maintains contrast against any backdrop.",
    },
    {
      question: "Can I add a logo image as a watermark instead of text?",
      answer:
        "This tool is built specifically for text watermarks. For a logo or image-based watermark, overlaying a transparent PNG logo would need a different compositing approach not currently offered here.",
    },
    {
      question: "Is my image uploaded anywhere to add the watermark?",
      answer:
        "No — the watermark is drawn entirely in your browser using the Canvas API. The image is never uploaded to a server.",
    },
  ],
};
