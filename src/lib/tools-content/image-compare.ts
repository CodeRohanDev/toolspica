import type { ToolContent } from "./types";

export const imageCompareContent: ToolContent = {
  heroSubtitle: "Highlight Pixel Differences Between Two Images",
  overview: [
    "Spotting the exact difference between two nearly identical images by eye is slow and error-prone — a shifted element, a color change, a small added detail can be easy to miss when scanning back and forth manually between two versions.",
    "This tool compares two images pixel by pixel and highlights every location where they differ in bright red, overlaid on a dimmed grayscale version of the first image for context — making even small, subtle differences immediately obvious rather than requiring careful manual inspection.",
    "Both images must be exactly the same pixel dimensions to compare, since the comparison works position by position — if you're comparing a before/after pair that was resized differently, resize one to match the other first using the Image Resizer tool.",
    "This is useful for spotting exact changes between two design iterations, verifying that an image edit only affected the intended area, catching unintended differences introduced by a re-export or format conversion, and any visual regression or before/after comparison task.",
  ],
  howItWorks: [
    {
      title: "Upload two images of the same dimensions",
      description: "Image A and Image B for comparison.",
    },
    {
      title: "Differences are highlighted automatically",
      description: "Changed pixels appear in bright red over a dimmed original.",
    },
    {
      title: "Review the percentage and download",
      description: "See exactly what percentage of pixels differ.",
    },
  ],
  examples: [
    {
      label: "Comparing two design iterations",
      input: "design-v1.png and design-v2.png (same dimensions)",
      output: "A diff image with 2.3% of pixels highlighted in red, showing exactly what changed",
    },
  ],
  faqs: [
    {
      question: "Why do the images need to be exactly the same dimensions?",
      answer:
        "The comparison checks each pixel position directly against the corresponding position in the other image — if the dimensions don't match, there's no consistent way to align positions between the two images for a meaningful pixel-by-pixel comparison.",
    },
    {
      question: "What counts as a 'different' pixel?",
      answer:
        "A pixel is flagged as changed when the combined difference across its red, green, and blue channels exceeds a threshold — small compression artifacts or negligible color shifts below that threshold aren't flagged, focusing the highlight on genuinely visible differences.",
    },
    {
      question: "Why is the unchanged area shown dimmed and grayscale?",
      answer:
        "This provides visual context for where the changes are located within the overall image, while making the red-highlighted differences stand out as clearly as possible against a deliberately muted background.",
    },
    {
      question: "Can this compare images saved in different formats?",
      answer:
        "Yes — the comparison works on the decoded pixel data regardless of source format, so comparing a PNG against a JPEG version of the same image works, though re-encoding to JPEG can itself introduce small compression differences that show up as flagged pixels.",
    },
    {
      question: "Are the images uploaded anywhere to compare them?",
      answer:
        "No — the comparison runs entirely in your browser using canvas pixel data. Neither image is ever uploaded to a server.",
    },
  ],
};
