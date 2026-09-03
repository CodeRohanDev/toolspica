import type { ToolContent } from "./types";

export const hexToRgbContent: ToolContent = {
  heroSubtitle: "Convert HEX Color Codes to RGB Instantly",
  overview: [
    "HEX and RGB represent exactly the same color information in two different number formats — HEX uses base-16 (hexadecimal) notation compactly packed into a single string, while RGB expresses the same three color channels as separate base-10 numbers from 0 to 255. Converting between them is a lossless, exact mathematical operation, not an approximation.",
    "This tool takes any HEX color code — with or without the leading #, and supporting both 6-character (#4f46e5) and shorthand 3-character (#4fe) formats — and converts it to its exact RGB equivalent, showing the red, green, and blue channel values individually alongside the full rgb() CSS syntax.",
    "This conversion comes up constantly when moving a color value between contexts that expect different formats — a design tool exports HEX, but a canvas drawing operation or certain JavaScript color libraries expect RGB values as separate numbers rather than a single hex string.",
    "This is useful for web development requiring RGB format specifically, understanding a HEX color's individual red/green/blue intensity, or converting a color picked from a design tool into the exact numeric format your code needs.",
  ],
  howItWorks: [
    {
      title: "Enter a HEX color code",
      description: "With or without the #, in 6-character or 3-character shorthand form.",
    },
    {
      title: "View the RGB equivalent",
      description: "Both the full rgb() syntax and individual channel values.",
    },
    {
      title: "Copy the result",
      description: "Ready to paste directly into your code.",
    },
  ],
  examples: [
    {
      label: "Standard 6-character HEX",
      input: "#4f46e5",
      output: "rgb(79, 70, 229)",
    },
    {
      label: "Shorthand 3-character HEX",
      input: "#fff",
      output: "rgb(255, 255, 255)",
    },
  ],
  faqs: [
    {
      question: "How does the shorthand 3-character HEX format work?",
      answer:
        "Each of the three characters is doubled to form the full 6-character value — #fff expands to #ffffff, and #4fe expands to #44ffee — this is exactly how browsers themselves interpret shorthand HEX in CSS, and this tool follows the same expansion rule.",
    },
    {
      question: "Is this conversion exact, or does it round?",
      answer:
        "It's exact — HEX and RGB represent literally the same underlying values, just written in different number bases (hexadecimal versus decimal). Converting between them involves no rounding or approximation, unlike converting to HSL, which involves a genuine color-space transformation.",
    },
    {
      question: "Do I need to include the # symbol?",
      answer:
        "No — this tool accepts a HEX code with or without the leading # symbol, so you can paste a value copied from anywhere without needing to add or remove the symbol first.",
    },
    {
      question: "Why would I need RGB instead of just using HEX everywhere?",
      answer:
        "Some contexts specifically require RGB — JavaScript canvas operations, certain color manipulation libraries, and CSS functions like rgba() (for specifying opacity) all work with individual red/green/blue channel values rather than a packed HEX string.",
    },
    {
      question: "What's the valid range for each RGB channel?",
      answer:
        "Each of the red, green, and blue channels ranges from 0 to 255, representing the intensity of that color channel — 0 means none of that color, 255 means full intensity, matching the two-hex-digit (00 to ff) range each channel occupies within the full HEX code.",
    },
  ],
};
