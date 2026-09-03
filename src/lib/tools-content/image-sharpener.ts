import type { ToolContent } from "./types";

export const imageSharpenerContent: ToolContent = {
  heroSubtitle: "Sharpen Blurry or Soft Images with Unsharp Masking",
  overview: [
    "A slightly soft or out-of-focus image can often be improved noticeably by sharpening — a technique that boosts contrast right at edges, making the boundaries between light and dark areas crisper and more defined without actually adding new detail that wasn't captured.",
    "This tool applies a standard 3×3 sharpening convolution kernel to every pixel, comparing each pixel to its immediate neighbors and amplifying local contrast differences. An adjustable strength slider blends between the original and fully sharpened result, letting you dial in exactly how aggressive the effect is.",
    "Sharpening works by mathematically emphasizing edges — it can't recover detail that was never captured (like recovering focus from a genuinely blurry photo), but it can make existing detail appear crisper and more defined, which is often enough to noticeably improve a slightly soft image.",
    "This is useful for crisping up photos that look slightly soft after resizing or compression, enhancing detail before printing or publishing an image, correcting minor focus softness, and general photo touch-up work.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Adjust sharpening strength",
      description: "From 0 (no effect) up to 2x (strong sharpening).",
    },
    {
      title: "Download the sharpened result",
      description: "Compare against the original to find the right amount.",
    },
  ],
  examples: [
    {
      label: "Crisping up a slightly soft photo",
      input: "A photo with mild softness, strength 0.5x",
      output: "The same photo with noticeably crisper edge definition",
    },
  ],
  faqs: [
    {
      question: "Can sharpening fix a genuinely out-of-focus photo?",
      answer:
        "Not really — sharpening enhances existing edge contrast, it doesn't recover detail that was never captured due to actual focus blur. It works best on images that are only mildly soft, not photos that are significantly out of focus.",
    },
    {
      question: "What happens if I sharpen too aggressively?",
      answer:
        "Over-sharpening introduces visible halos and noise around edges, and can make the image look artificially harsh or grainy rather than genuinely crisper. If the result starts looking unnatural, dial the strength back down.",
    },
    {
      question: "How does the sharpening algorithm actually work?",
      answer:
        "It uses a standard 3×3 convolution kernel that compares each pixel to its immediate neighbors, boosting the difference when a pixel differs noticeably from its surroundings (an edge) and leaving flat, uniform areas unaffected — a classic and well-established sharpening technique.",
    },
    {
      question: "Should I sharpen before or after resizing an image?",
      answer:
        "Generally sharpen after resizing, since resizing itself can slightly soften an image, and sharpening the final output size gives more predictable, appropriately-scaled results than sharpening first and then resizing.",
    },
    {
      question: "Is my image uploaded anywhere to sharpen it?",
      answer:
        "No — the sharpening filter runs entirely in your browser using pixel-level canvas processing. The image is never uploaded to a server.",
    },
  ],
};
