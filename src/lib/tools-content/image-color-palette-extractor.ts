import type { ToolContent } from "./types";

export const imageColorPaletteExtractorContent: ToolContent = {
  heroSubtitle: "Extract the Dominant Colors from Any Image",
  overview: [
    "Matching a design's color scheme to a photo, a piece of brand artwork, or a mood board usually means eyeballing colors and guessing hex codes — a slow, imprecise process when the actual pixel values are sitting right there in the image. Pulling the genuinely dominant colors out algorithmically is both faster and more accurate than picking by eye.",
    "This tool analyzes every pixel in an uploaded image, groups similar colors together (quantizing into buckets rather than treating every slightly different shade as unique, which would just return noise), and returns the eight most frequently occurring colors as exact hex codes — each with a one-click copy button.",
    "Because this counts raw pixel frequency, a photo with a large plain background (like a product shot on white) will naturally return that background color as dominant, alongside the more visually interesting colors in the subject — this reflects the image accurately, but keep it in mind when picking colors for a design, since \"most frequent\" isn't always \"most visually important.\"",
  ],
  howItWorks: [
    { title: "Upload an image", description: "Choose any photo, illustration, or screenshot." },
    { title: "Review the extracted palette", description: "See the eight most dominant colors as hex codes." },
    { title: "Copy any color", description: "Click the copy icon next to any swatch to grab its hex code." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A photo of a sunset",
      output: "#ff8c42, #2d1b3d, #f4a261, #1a1a2e, #e76f51, ...",
    },
  ],
  faqs: [
    {
      question: "Why does a plain background color show up as the top result?",
      answer:
        "This tool counts raw pixel frequency across the whole image — a large plain background naturally occupies more pixels than a smaller subject, so it's accurately reflected as dominant, even if it's visually less interesting than other colors in the image.",
    },
    {
      question: "How many colors does this extract?",
      answer:
        "The eight most frequently occurring colors, grouped from similar shades so the result reflects meaningfully distinct colors rather than dozens of near-identical variations.",
    },
    {
      question: "Can I use this for very large images?",
      answer:
        "Large images are automatically downscaled for analysis (while keeping the color result accurate) to keep processing fast in your browser, since the original resolution isn't needed to determine dominant colors.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — color extraction happens entirely in your browser using canvas pixel data. Nothing is uploaded to a server.",
    },
  ],
};
