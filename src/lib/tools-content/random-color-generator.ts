import type { ToolContent } from "./types";

export const randomColorGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random Colors for Inspiration or Testing",
  overview: [
    "Sometimes the fastest way to break out of a design rut, generate placeholder colors for a mockup, or find inspiration for a new palette is simply to look at genuinely random colors rather than deliberately chosen ones. This tool generates any number of random HEX colors at once, each independently and uniformly random across the full color space.",
    "Each generated color is drawn uniformly at random across all 16.7 million possible RGB combinations, using the browser's built-in random number generator — every possible color has an equal chance of appearing, with no bias toward more \"pleasant\" or muted tones the way a curated palette generator would apply.",
    "Generating multiple colors at once (up to 24) is useful for quickly scanning a batch for something usable, rather than regenerating one color repeatedly — each swatch includes its own copy button, so you can grab exactly the ones you want without needing to note them down separately.",
    "This is useful for design inspiration, generating placeholder colors for a mockup or test data, random color assignment in a data visualization, or simply satisfying curiosity by seeing what colors come up.",
  ],
  howItWorks: [
    {
      title: "Choose how many colors to generate",
      description: "Up to 24 at once.",
    },
    {
      title: "Click Generate",
      description: "A fresh, uniformly random set of colors appears instantly.",
    },
    {
      title: "Copy any color you want to keep",
      description: "Each swatch has its own copy button.",
    },
  ],
  examples: [
    {
      label: "Generating random colors",
      input: "Generate 6 colors",
      output: "6 independently random HEX colors, e.g. #a3f21c, #4d1e88, #f0c2a9...",
    },
  ],
  faqs: [
    {
      question: "Is this truly random, or does it favor certain colors?",
      answer:
        "Each color is drawn uniformly at random across the full RGB space, using the browser's built-in random number generator for each of the red, green, and blue channels independently — there's no bias toward muted, pastel, or \"designer-friendly\" tones, so results can include genuinely bold or unusual combinations.",
    },
    {
      question: "Why isn't this the same as a curated color palette generator?",
      answer:
        "A palette generator typically applies rules (like consistent saturation, complementary hues, or accessibility constraints) to produce a cohesive, usable set of colors. This tool generates purely random colors with no such constraints, which makes it better suited for inspiration, testing, or placeholder use than for a finished, polished palette.",
    },
    {
      question: "Does clicking Generate again give completely different colors?",
      answer:
        "Yes — every click produces a fresh, independently random set with no relationship to the previous result, so you can keep generating until something catches your eye.",
    },
    {
      question: "Can I generate more than 24 colors at once?",
      answer:
        "This tool caps at 24 to keep the results visually scannable in one view — for a larger batch, you can simply click Generate multiple times and copy the colors you want from each round.",
    },
    {
      question: "Is there any way two generated colors could be identical?",
      answer:
        "It's mathematically possible but extremely unlikely — with over 16.7 million possible colors, generating even 24 at once has a very low probability of producing an exact duplicate, similar to the birthday paradox but with a vastly larger pool of possibilities.",
    },
  ],
};
