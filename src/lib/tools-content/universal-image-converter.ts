import type { ToolContent } from "./types";

export const universalImageConverterContent: ToolContent = {
  heroSubtitle: "Convert Between PNG, JPEG & WebP in One Tool",
  overview: [
    "Rather than hunting for a specific converter for each format pair, this tool handles conversion between the three most common web image formats — PNG, JPEG, and WebP — in a single place, picking whichever output format your situation calls for.",
    "Each format has real trade-offs: PNG offers lossless quality and transparency but larger files; JPEG offers small file sizes for photos but no transparency and some quality loss; WebP generally combines the best of both, with smaller files than JPEG and optional transparency support, at the cost of slightly less universal compatibility with very old software.",
    "For JPEG output specifically, since it can't represent transparency, any transparent areas are filled with a background color you choose. PNG and WebP output both preserve transparency automatically.",
    "This is useful for converting any image to whichever format a specific platform or tool requires, reducing file size by switching from PNG to JPEG or WebP, adding transparency support by converting from JPEG to PNG or WebP, and general everyday format conversion.",
  ],
  howItWorks: [
    {
      title: "Upload any image",
      description: "PNG, JPEG, WebP, or most other common formats your browser can decode.",
    },
    {
      title: "Choose the output format",
      description: "PNG, JPEG, or WebP, with a quality slider for the lossy formats.",
    },
    {
      title: "Download the converted image",
      description: "With the file size shown before and after.",
    },
  ],
  examples: [
    {
      label: "Converting a PNG to WebP for a smaller file size",
      input: "graphic.png (850 KB)",
      output: "graphic.webp (180 KB), transparency preserved",
    },
  ],
  faqs: [
    {
      question: "Which format should I choose?",
      answer:
        "PNG for images needing perfect quality or transparency where file size isn't critical (logos, screenshots, graphics with sharp edges). JPEG for photos where small file size matters and transparency isn't needed. WebP as a strong modern default, offering smaller files than JPEG plus optional transparency, supported by all current browsers.",
    },
    {
      question: "Why does JPEG need a background color option?",
      answer:
        "JPEG has no concept of transparency at all — any transparent pixels in the source image have to be filled with something, and this lets you choose that fill color rather than leaving it to an unpredictable default.",
    },
    {
      question: "Does converting between formats lose quality?",
      answer:
        "Converting to PNG is lossless (no quality loss). Converting to JPEG or WebP involves lossy compression controlled by the quality slider — higher settings preserve more detail at the cost of larger file size.",
    },
    {
      question: "Can this convert from formats other than PNG, JPEG, and WebP?",
      answer:
        "Yes, for input — any image format your browser can natively decode and draw (which includes GIF, BMP, and others) can be used as the source; the three supported output formats are PNG, JPEG, and WebP specifically.",
    },
    {
      question: "Is my image uploaded anywhere during conversion?",
      answer:
        "No — everything happens locally in your browser using the Canvas API. The image is never uploaded to a server.",
    },
  ],
};
