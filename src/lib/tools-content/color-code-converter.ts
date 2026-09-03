import type { ToolContent } from "./types";

export const colorCodeConverterContent: ToolContent = {
  overview: [
    "Colors in web development get represented in several different notations depending on context and personal preference, and developers regularly need to convert between them: HEX (like `#4f46e5`), the compact hexadecimal format most common in CSS and design tools; RGB (like `rgb(79, 70, 229)`), which specifies red, green, and blue intensity directly as numbers from 0-255, useful when you need to reason about or programmatically adjust individual color channels; and HSL (like `hsl(243, 75%, 59%)`), which represents color as hue, saturation, and lightness — a model that maps much more intuitively to how humans think about adjusting a color (\"make it lighter,\" \"make it more saturated\") than RGB does.",
    "This tool takes a HEX color as input — either typed directly or picked visually using the built-in color picker — and instantly shows the exact same color expressed in all three formats side by side, each with its own copy button. This is especially useful when moving a color value between different parts of a codebase or design tool that expect different formats: a design tool might export HEX, while a CSS custom property you're maintaining uses HSL for easier programmatic lightness adjustments, or a canvas/JavaScript color manipulation library expects RGB values.",
    "The conversion math is exact, not approximated: HEX and RGB represent literally the same underlying values just written differently (HEX is simply RGB written in base-16 instead of base-10), so that conversion is lossless. Converting to HSL involves an actual color-space transformation, calculating hue from the relative proportions of red, green, and blue, and lightness and saturation from their range — but it's still a precise, well-defined mathematical conversion with no approximation or rounding error beyond standard floating-point precision.",
    "The tool also supports shorthand 3-character HEX codes (like `#fff` for white), automatically expanding them to their full 6-character equivalent before converting, matching how browsers themselves interpret shorthand HEX values in CSS.",
  ],
  howItWorks: [
    {
      title: "Enter or pick a color",
      description: "Type a HEX code or use the color picker to choose visually.",
    },
    {
      title: "See all three formats",
      description: "HEX, RGB, and HSL values for the exact same color appear instantly.",
    },
    {
      title: "Copy whichever you need",
      description: "Each format has its own copy button for quick use in your code.",
    },
  ],
  examples: [
    {
      label: "Converting a HEX color",
      input: "#4f46e5",
      output: "rgb(79, 70, 229) · hsl(243, 75%, 60%)",
    },
  ],
  faqs: [
    {
      question: "Is converting between HEX and RGB an exact, lossless conversion?",
      answer:
        "Yes — HEX is just RGB written in hexadecimal instead of decimal notation. `#4f46e5` and `rgb(79, 70, 229)` represent the exact same color with zero loss of precision in either direction.",
    },
    {
      question: "Why would I use HSL instead of RGB or HEX?",
      answer:
        "HSL maps much more intuitively to how people actually think about adjusting color — increasing the lightness value brightens a color while keeping its hue and saturation constant, which is far more predictable than trying to figure out how to brighten a color by adjusting RGB's red, green, and blue values together.",
    },
    {
      question: "Does this support shorthand 3-character HEX codes like #fff?",
      answer:
        "Yes — a shorthand code like `#fff` is automatically expanded to its full form (`#ffffff`) before converting, exactly matching how browsers interpret shorthand HEX values in CSS.",
    },
    {
      question: "Does this support alpha/transparency values?",
      answer:
        "Not currently — this tool converts fully opaque colors between HEX, RGB, and HSL. For colors with transparency, you'd need to separately track and apply an alpha value in your RGBA or HSLA notation.",
    },
    {
      question: "Why does the HSL lightness value sometimes look surprising?",
      answer:
        "HSL lightness is calculated as the average of the highest and lowest of the red, green, and blue values (after normalizing to 0-1), which doesn't always match human perception of brightness — some colors with the same lightness value can appear visually brighter or darker than others due to how the eye perceives different hues.",
    },
  ],
};
