import type { ToolContent } from "./types";

export const photoFiltersContent: ToolContent = {
  heroSubtitle: "Apply Instagram-Style Filters to Any Photo",
  overview: [
    "A well-chosen filter can transform a photo's mood entirely — warming it up, giving it a vintage feel, or draining it to dramatic black and white — without needing to manually adjust individual color and contrast sliders to achieve the look.",
    "This tool offers nine one-click filter presets — Sepia, Vintage, Cool, Warm, Vivid, Fade, Noir, Invert, and the unfiltered Original — each combining hue, saturation, contrast, and brightness adjustments tuned to produce a distinct, recognizable style.",
    "Each filter applies instantly using the browser's built-in canvas filter pipeline, so you can quickly click through every preset and compare results side by side before settling on the one that fits your image best.",
    "This is useful for giving photos a consistent stylistic look before sharing, quickly experimenting with different moods for an image, adding a vintage or dramatic effect without manual color grading, and general creative photo editing.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Click through the filter presets",
      description: "Each one applies instantly for quick comparison.",
    },
    {
      title: "Download your favorite result",
      description: "Exported at full resolution with the filter baked in.",
    },
  ],
  examples: [
    {
      label: "Giving a photo a vintage look",
      input: "A modern photo, Vintage filter selected",
      output: "The photo with warm sepia toning, slightly reduced saturation, and boosted contrast",
    },
  ],
  faqs: [
    {
      question: "Can I adjust the intensity of a filter?",
      answer:
        "Not currently — each filter applies at a fixed intensity tuned to produce its characteristic look. If you need finer control over individual adjustments, this tool is built for quick one-click styling rather than granular manual color grading.",
    },
    {
      question: "What's the difference between Vintage and Sepia?",
      answer:
        "Sepia applies a strong warm monochrome tone reminiscent of old photographs. Vintage combines a lighter sepia tint with reduced saturation and slightly boosted contrast, aiming for a more subtle, faded-film aesthetic rather than full monochrome.",
    },
    {
      question: "Does Noir produce true black and white?",
      answer:
        "Yes — Noir combines full grayscale conversion with boosted contrast and slightly reduced brightness, aiming for a dramatic, high-contrast black-and-white look rather than a flat desaturation.",
    },
    {
      question: "Can I combine two filters together?",
      answer:
        "No — only one filter preset applies at a time. Selecting a different filter replaces the previous one rather than stacking on top of it.",
    },
    {
      question: "Is my image uploaded anywhere to apply a filter?",
      answer:
        "No — every filter runs entirely in your browser using the Canvas API's built-in filter pipeline. The image is never uploaded to a server.",
    },
  ],
};
