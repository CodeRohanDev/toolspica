import type { ToolContent } from "./types";

export const cropImageContent: ToolContent = {
  heroSubtitle: "Crop Any Image with a Draggable Selection",
  overview: [
    "Cropping is one of the most common image edits — removing distracting background, focusing attention on a subject, or fitting an image into a specific frame — and doing it well just needs a direct, visual way to select exactly the area you want to keep.",
    "This tool lets you drag directly on the image to draw a crop selection, with optional fixed aspect ratios (square, 4:3, 16:9) for when you need a specific proportion, or freeform selection for full manual control over the exact crop area.",
    "The selected region is cropped at full source resolution — since the crop rectangle you draw on the displayed preview is scaled back up to the image's actual pixel dimensions before cropping, the result isn't limited by how large the preview happens to be on your screen.",
    "This is useful for removing unwanted background or edges from a photo, cropping to a specific aspect ratio for social media or a profile picture, focusing an image on its main subject, and any everyday photo cropping task.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "It displays ready for you to select a crop area.",
    },
    {
      title: "Drag to draw a crop selection",
      description: "Optionally lock to a fixed aspect ratio.",
    },
    {
      title: "Apply crop and download",
      description: "The cropped result exports at full source resolution.",
    },
  ],
  examples: [
    {
      label: "Cropping a photo to a square profile picture",
      input: "A 4:3 photo, 1:1 aspect ratio selected",
      output: "A perfectly square crop centered on the selected area",
    },
  ],
  faqs: [
    {
      question: "Does the crop stay at full image quality?",
      answer:
        "Yes — the crop selection you draw is scaled up to the image's actual pixel dimensions before cropping, so the result is cropped from the full-resolution original, not a lower-resolution preview.",
    },
    {
      question: "What's the difference between freeform and a fixed aspect ratio?",
      answer:
        "Freeform lets you drag any rectangle regardless of proportions. A fixed aspect ratio (like 1:1 or 16:9) constrains your selection to that exact proportion as you drag, which is useful when you need the crop to fit a specific standard size, like a square profile picture.",
    },
    {
      question: "Can I adjust the crop area after drawing it?",
      answer:
        "You can redraw the selection by dragging again — the crop area updates live as you drag, so you can experiment with the position and size before clicking Apply crop.",
    },
    {
      question: "Why does my crop selection sometimes look larger or smaller than expected on screen?",
      answer:
        "The preview shown on screen may be scaled down from the image's actual pixel size for display purposes — the crop coordinates are automatically converted back to the image's real dimensions, so the exported result matches your intended selection at full resolution.",
    },
    {
      question: "Is the image uploaded anywhere to crop it?",
      answer:
        "No — cropping happens entirely in your browser using the Canvas API. The image never leaves your device.",
    },
  ],
};
