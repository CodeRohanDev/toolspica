import type { ToolContent } from "./types";

export const memeGeneratorContent: ToolContent = {
  heroSubtitle: "Add Classic Top & Bottom Meme Text to Any Image",
  overview: [
    "The classic meme format — bold white text with a black outline, positioned across the top and bottom of an image — has become an instantly recognizable visual language of its own, and creating one shouldn't require opening a full image editor.",
    "This tool overlays your chosen top and bottom text onto any image using the traditional bold, outlined meme styling, automatically wrapping longer text across multiple lines so it fits within the image width rather than running off the edges or overlapping the picture.",
    "Text is automatically capitalized to match the classic meme convention, and sized proportionally to the image's width, so the same relative text size looks right whether you're working with a small image or a large one.",
    "This is useful for creating memes for social media or group chats, adding captions to reaction images, making quick visual jokes from any photo, and any lighthearted image captioning.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Enter top and bottom text",
      description: "Automatically capitalized and wrapped to fit.",
    },
    {
      title: "Download your meme",
      description: "Exported at full image resolution.",
    },
  ],
  examples: [
    {
      label: "Making a classic top/bottom meme",
      input: 'Top: "WHEN THE CODE FINALLY WORKS", Bottom: "ON THE FIRST TRY"',
      output: "The image with both captions in bold white outlined text",
    },
  ],
  faqs: [
    {
      question: "Why is the text automatically capitalized?",
      answer:
        "All-caps is the traditional meme text convention, instantly recognizable from the format's origins — this tool applies it automatically so your meme matches the classic style without you needing to type in caps yourself.",
    },
    {
      question: "What happens if my text is too long for one line?",
      answer:
        "It automatically wraps onto additional lines to fit within the image width, rather than running off the edges or shrinking to an illegibly small size.",
    },
    {
      question: "Can I leave either the top or bottom text empty?",
      answer:
        "Yes — leaving either field empty simply skips that caption, letting you create a meme with only top text, only bottom text, or both, depending on what your image and joke need.",
    },
    {
      question: "Can I change the font or text color?",
      answer:
        "No — this tool is built around the classic, instantly recognizable white-with-black-outline meme text style rather than customizable fonts or colors, keeping it fast and simple for the traditional meme format specifically.",
    },
    {
      question: "Is my image uploaded anywhere to create the meme?",
      answer:
        "No — the text is rendered entirely in your browser using the Canvas API. The image is never uploaded to a server.",
    },
  ],
};
