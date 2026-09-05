import type { ToolContent } from "./types";

export const colorPaletteGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Color Palettes from a Single Base Color",
  overview: [
    "Picking one color for a design is easy; picking a full set of colors that work together — for a website, a brand, a presentation — is where color theory actually earns its keep. Complementary, analogous, and triadic color relationships are well-established starting points used by professional designers precisely because they reliably produce combinations that look intentional rather than random.",
    "This tool takes a single base color and generates four palette types from it using real HSL color math: a complementary pair (the base color plus its exact opposite on the color wheel, for strong contrast), an analogous trio (colors sitting close together on the wheel, for a harmonious, low-contrast feel), a triadic set (three colors evenly spaced around the wheel, for vibrant balance), and a shade ramp (the same hue at five different lightness levels, useful for UI states like hover and active).",
    "Every swatch shows its exact hex code and includes a one-click copy button, so you can drop any generated color straight into CSS, a design tool, or a brand style guide without manually reading off and retyping values. Because the math is standard HSL color wheel geometry (not a curated or AI-guessed palette), the results are predictable and reproducible — the same base color always generates the same palette.",
  ],
  howItWorks: [
    { title: "Pick a base color", description: "Use the color picker or type a hex code directly." },
    { title: "Review the generated palettes", description: "See complementary, analogous, triadic, and shade variations." },
    { title: "Copy any swatch", description: "Click the copy icon next to any color to grab its hex code." },
  ],
  examples: [
    {
      label: "Base color #3b82f6 (blue)",
      input: "#3b82f6",
      output: "Complementary: #f6a53b — Analogous: #3b58f6, #3b82f6, #3bacf6 — Triadic: #3b82f6, #f63ba9, #a9f63b",
    },
  ],
  faqs: [
    {
      question: "What's the difference between complementary, analogous, and triadic?",
      answer:
        "Complementary uses two colors directly opposite each other on the color wheel for maximum contrast. Analogous uses colors next to each other for a smooth, harmonious feel. Triadic uses three colors evenly spaced around the wheel for vibrant, balanced variety.",
    },
    {
      question: "What are the shade swatches useful for?",
      answer:
        "The shade ramp gives you the same hue at different lightness levels — handy for UI design where you need a base color plus lighter/darker variants for hover states, disabled states, or backgrounds.",
    },
    {
      question: "Are these palettes guaranteed to be accessible (good contrast for text)?",
      answer:
        "Not automatically — this generates color harmony based on hue relationships, not contrast ratios. Check any color you plan to use for text against its background with a dedicated contrast checker before finalizing a design.",
    },
    {
      question: "Is my chosen color sent anywhere?",
      answer:
        "No — all color math runs entirely in your browser. Nothing is uploaded or stored.",
    },
  ],
};
