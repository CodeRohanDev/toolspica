import type { ToolContent } from "./types";

export const hexToHslContent: ToolContent = {
  heroSubtitle: "Convert HEX Color Codes to HSL Instantly",
  overview: [
    "HSL (Hue, Saturation, Lightness) represents color in a way that maps much more intuitively to how people actually think about adjusting a color — \"make it lighter,\" \"make it more vivid\" — than RGB or HEX do, since lightness and saturation are each isolated, independently adjustable values rather than blended across three channels.",
    "This tool converts any HEX color code into its exact HSL equivalent through a real color-space transformation — unlike the lossless HEX-to-RGB conversion, converting to HSL involves genuine trigonometric-style math based on the relative proportions of red, green, and blue, calculating hue as an angle around a color wheel (0-360°) and saturation and lightness as percentages.",
    "HSL is especially useful in CSS when you need to generate a set of related colors — a hover state that's slightly darker, a lighter tint for a background, or a full shade scale — since adjusting just the lightness value (keeping hue and saturation fixed) produces a visually consistent set of variations, something that's much harder to do by eye with raw HEX or RGB values.",
    "This is useful for building a CSS design system with consistent color variations, understanding a color's hue and intensity independent of its brightness, or converting a HEX value from a design tool into HSL for easier programmatic lightness adjustments.",
  ],
  howItWorks: [
    {
      title: "Enter a HEX color code",
      description: "With or without the #, in 6-character or 3-character shorthand form.",
    },
    {
      title: "View the HSL equivalent",
      description: "Hue in degrees, saturation and lightness as percentages.",
    },
    {
      title: "Copy the result",
      description: "Ready to paste directly into CSS.",
    },
  ],
  examples: [
    {
      label: "Converting HEX to HSL",
      input: "#4f46e5",
      output: "hsl(244, 75%, 59%)",
    },
  ],
  faqs: [
    {
      question: "Why is converting to HSL a 'real' color-space transformation, unlike HEX to RGB?",
      answer:
        "HEX and RGB are literally the same numbers written in different bases — no transformation needed. HSL represents color using a fundamentally different model (a color wheel with hue as an angle, plus saturation and lightness), requiring genuine trigonometric-style calculation from the RGB values to determine hue, saturation, and lightness correctly.",
    },
    {
      question: "What does the hue value (0-360°) actually mean?",
      answer:
        "Hue represents a position around a color wheel — 0° is red, 120° is green, 240° is blue, with every other color falling somewhere in between as you move around the full 360° circle. This is what makes HSL intuitive for color adjustments, since changing hue alone shifts a color around this wheel while keeping its saturation and lightness constant.",
    },
    {
      question: "Why is HSL useful for generating hover or active states in CSS?",
      answer:
        "Adjusting just the lightness value (like reducing it by 10%) while keeping hue and saturation fixed produces a visually consistent darker variant of the exact same color — much easier and more reliable than trying to manually pick a \"slightly darker\" HEX or RGB value by eye.",
    },
    {
      question: "Can converting to HSL and back to HEX lose precision?",
      answer:
        "A tiny amount, yes — HSL values are typically displayed as whole-number degrees and percentages, which involves rounding compared to the exact underlying RGB values. This rounding is negligible for virtually any practical use but means a HEX → HSL → HEX round trip can occasionally differ by 1 unit in a channel.",
    },
    {
      question: "Is HSL supported in all modern browsers?",
      answer:
        "Yes — hsl() and hsla() have been supported in every modern browser for years and are a standard, fully valid CSS color function, just as usable as HEX or RGB in any stylesheet.",
    },
  ],
};
