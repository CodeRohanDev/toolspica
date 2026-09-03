import type { ToolContent } from "./types";

export const transparentBackgroundMakerContent: ToolContent = {
  heroSubtitle: "Make a Solid-Color Background Transparent",
  overview: [
    "A product photo on a plain white background, a logo with a solid color backdrop, or a graphic with a flat-color fill — all of these can have that background made transparent with a straightforward color-matching technique, without needing full AI-powered subject detection.",
    "This tool works by color similarity: click anywhere in the image to pick the background color, then every pixel within your chosen tolerance of that color becomes transparent. A higher tolerance catches more shade variation (useful for backgrounds with slight lighting gradients), while a lower tolerance keeps the effect tightly limited to near-exact color matches.",
    "This is a chroma-key style approach, not AI-based subject detection — it works reliably for solid or near-solid color backgrounds but won't cleanly separate a complex photographic background from its subject, since it has no understanding of what's foreground versus background beyond color matching.",
    "This is useful for making a product photo's white or solid background transparent, removing a flat-color backdrop from a logo or graphic, preparing images for overlay onto other backgrounds, and any situation with a genuinely solid or near-solid background color to remove.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Works best with a solid or near-solid color background.",
    },
    {
      title: "Click the background to select its color",
      description: "Adjust tolerance to control how much shade variation is included.",
    },
    {
      title: "Download the transparent PNG",
      description: "The matched background color is now transparent.",
    },
  ],
  examples: [
    {
      label: "Removing a white background from a product photo",
      input: "A product shot on pure white, tolerance set to 40",
      output: "The same photo with the white background transparent, product intact",
    },
  ],
  faqs: [
    {
      question: "Will this work on a photo with a busy or natural background?",
      answer:
        "Not well — this tool matches by color similarity across the whole image, so it can't distinguish a complex photographic background (grass, sky, a room) from a foreground subject the way AI-based background removal can. It's specifically built for solid or near-solid color backgrounds.",
    },
    {
      question: "What does the tolerance setting actually control?",
      answer:
        "It sets how close a pixel's color needs to be to your selected background color to become transparent. Low tolerance only catches near-exact matches (good for a perfectly uniform background); higher tolerance catches more shade variation but risks also removing similarly-colored parts of your actual subject.",
    },
    {
      question: "Why did part of my subject become transparent too?",
      answer:
        "If your subject contains colors close to the background color you selected, a high tolerance can catch those areas as well. Try lowering the tolerance, or click a more precisely representative spot of the background color.",
    },
    {
      question: "Can I click multiple spots to select more than one background color?",
      answer:
        "No — each click replaces the previously selected color rather than adding to it. For a background with genuinely multiple distinct colors, this tool's single-color matching approach has real limits.",
    },
    {
      question: "Is my image uploaded anywhere during this process?",
      answer:
        "No — color detection and transparency processing both happen entirely in your browser using canvas pixel data. The image is never uploaded to a server.",
    },
  ],
};
