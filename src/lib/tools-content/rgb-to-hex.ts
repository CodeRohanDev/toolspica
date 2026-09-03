import type { ToolContent } from "./types";

export const rgbToHexContent: ToolContent = {
  heroSubtitle: "Convert RGB Values to a HEX Color Code Instantly",
  overview: [
    "RGB and HEX represent the same color information, just in different number formats — RGB expresses each color channel as a separate decimal number from 0 to 255, while HEX packs all three channels into a single compact hexadecimal string. Converting from RGB to HEX is the reverse of the more commonly needed HEX-to-RGB direction, useful whenever you have individual channel values that need combining into a single CSS-ready code.",
    "This tool takes red, green, and blue values (each 0-255) and converts them into the exact corresponding 6-character HEX code, with a live color swatch preview so you can visually confirm the result matches what you expect before using it.",
    "This conversion is common when a color comes from a source that outputs individual RGB channel values — a canvas pixel read operation, a color-picking library, or a design tool's RGB display mode — but you need the compact HEX format for a CSS stylesheet or design file.",
    "This is useful for converting a programmatically generated or measured RGB color into CSS-ready HEX, double-checking a color's HEX equivalent when you only have the individual channel numbers, or general color format conversion work.",
  ],
  howItWorks: [
    {
      title: "Enter red, green, and blue values",
      description: "Each from 0 to 255.",
    },
    {
      title: "View the HEX equivalent",
      description: "With a live swatch preview to confirm the color visually.",
    },
    {
      title: "Copy the HEX code",
      description: "Ready to paste directly into CSS or a design file.",
    },
  ],
  examples: [
    {
      label: "Converting RGB to HEX",
      input: "R: 79, G: 70, B: 229",
      output: "#4f46e5",
    },
  ],
  faqs: [
    {
      question: "What happens if I enter a value above 255?",
      answer:
        "255 is the maximum valid value for any RGB channel, representing full intensity — this tool flags an out-of-range value as invalid rather than silently clamping or wrapping it, since a value above 255 usually indicates a mistake in the source data.",
    },
    {
      question: "Is the RGB to HEX conversion exact?",
      answer:
        "Yes — RGB and HEX represent the identical underlying color values, just in decimal versus hexadecimal number format. Converting between them involves no rounding or approximation, since it's a direct base conversion of the same numbers.",
    },
    {
      question: "Why does each HEX pair correspond to one RGB channel?",
      answer:
        "Each pair of hexadecimal digits in a HEX code represents one channel's value in base-16 — since hexadecimal digits range from 00 to ff (0 to 255 in decimal), each two-digit pair maps exactly to the 0-255 range of an RGB channel, which is exactly why HEX codes are always 6 digits for a full RGB color.",
    },
    {
      question: "Can I use this for colors with transparency (alpha)?",
      answer:
        "This tool converts the three standard RGB channels only. For a color including transparency, CSS supports an 8-digit HEX format (with two additional digits for alpha) or the rgba()/hsla() functions, which aren't covered by this specific 6-digit HEX conversion.",
    },
    {
      question: "Why would I have RGB values without already knowing the HEX code?",
      answer:
        "Some sources naturally output RGB rather than HEX — reading a pixel's color from a canvas, certain color-picking APIs, or a design tool's RGB input mode — making this conversion a genuinely common need rather than a redundant reverse of HEX-to-RGB.",
    },
  ],
};
