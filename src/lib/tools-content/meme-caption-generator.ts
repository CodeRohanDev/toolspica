import type { ToolContent } from "./types";

export const memeCaptionGeneratorContent: ToolContent = {
  heroSubtitle: "Add Classic Top/Bottom Meme Text to Any Image",
  overview: [
    "The classic meme format — bold white text with a black outline, one line across the top and one across the bottom — is instantly recognizable precisely because it's been used consistently for over a decade, and it still requires either a dedicated meme app or fiddly manual text placement in a general image editor to recreate properly.",
    "This tool takes any uploaded image and lets you add top and bottom caption text in the classic meme style: bold, all-caps, white fill with a black outline for readability against any background, automatically sized to the image and wrapped across multiple lines if the text is too long to fit on one line.",
    "Text automatically wraps to fit the image width and scales its font size relative to the image dimensions, so the same tool produces well-proportioned captions whether the uploaded image is a small square screenshot or a large widescreen photo, without manual font-size tweaking.",
  ],
  howItWorks: [
    { title: "Upload an image", description: "Choose the image you want to turn into a meme." },
    { title: "Add top and bottom text", description: "Type your caption text — it updates live on the image." },
    { title: "Download the meme", description: "Save the finished image as a PNG." },
  ],
  examples: [
    {
      label: "Classic format",
      input: "Top: \"WHEN THE CODE\", Bottom: \"FINALLY WORKS\"",
      output: "meme.png — bold white outlined text across the top and bottom of the image.",
    },
  ],
  faqs: [
    {
      question: "Does the text auto-resize for different image sizes?",
      answer:
        "Yes — font size scales relative to the image's width, so captions look proportionally correct whether you upload a small screenshot or a large photo, without manual adjustment.",
    },
    {
      question: "What happens if my caption is too long for one line?",
      answer:
        "Text automatically wraps onto multiple lines to fit within the image width, keeping the classic centered meme-text look even for longer captions.",
    },
    {
      question: "Can I use just a top caption, or just a bottom one?",
      answer:
        "Yes — leave either field blank and only the other caption will render on the image.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — the caption is rendered entirely in your browser using canvas. Nothing is uploaded to a server.",
    },
  ],
};
