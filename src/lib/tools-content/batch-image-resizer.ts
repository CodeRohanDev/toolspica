import type { ToolContent } from "./types";

export const batchImageResizerContent: ToolContent = {
  heroSubtitle: "Resize Many Images at Once & Download as a ZIP",
  overview: [
    "Resizing images one at a time gets tedious fast when you have a whole folder to process — a batch of product photos, a gallery of images for a website, or a set of screenshots that all need the same maximum dimensions applied.",
    "This tool lets you select multiple images at once, applies the same maximum width and height constraint to all of them (with an option to preserve each image's individual aspect ratio), and packages every resized result into a single downloadable ZIP file.",
    "Because each image keeps its own aspect ratio by default (when that option is enabled), a batch of differently-shaped photos all end up properly scaled to fit within your maximum dimensions without any of them being stretched or distorted.",
    "This is useful for preparing a whole folder of images for web upload with consistent maximum dimensions, resizing a batch of photos before archiving, standardizing image sizes across a product catalog, and any bulk image resizing task.",
  ],
  howItWorks: [
    {
      title: "Select multiple images",
      description: "Add as many as you need to the batch.",
    },
    {
      title: "Set maximum width and height",
      description: "Optionally preserve each image's own aspect ratio.",
    },
    {
      title: "Download all resized images as a ZIP",
      description: "One click processes and packages the entire batch.",
    },
  ],
  examples: [
    {
      label: "Resizing a folder of product photos for web upload",
      input: "20 photos of varying sizes, max 1200×1200px, aspect ratio preserved",
      output: "A ZIP file containing all 20 photos, each scaled to fit within 1200×1200px",
    },
  ],
  faqs: [
    {
      question: "What does 'preserve aspect ratio' actually do here?",
      answer:
        "With it enabled, each image is scaled down proportionally so both its width and height fit within your specified maximum, without distortion — a portrait photo and a landscape photo in the same batch each end up correctly proportioned, just at different final dimensions within the same max bounds.",
    },
    {
      question: "What happens with aspect ratio preservation turned off?",
      answer:
        "Each dimension is capped independently at your specified maximum — an image could be resized non-proportionally if its width or height individually exceeds the limit, which can distort images that aren't already close to your target aspect ratio.",
    },
    {
      question: "Is there a limit to how many images I can process at once?",
      answer:
        "No hard limit is enforced, but very large batches (many high-resolution images) take longer to process and use more of your browser's available memory, since everything happens locally rather than on a server.",
    },
    {
      question: "Can images smaller than the maximum dimensions get enlarged?",
      answer:
        "No — the resizing only ever scales down to fit within your maximum, never up, so smaller images in your batch are left at their original size rather than being artificially enlarged.",
    },
    {
      question: "Are my images uploaded anywhere during batch processing?",
      answer:
        "No — every image is resized locally in your browser, and the ZIP file is assembled locally too. Nothing is ever uploaded to a server.",
    },
  ],
};
