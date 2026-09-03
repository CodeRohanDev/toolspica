import type { ToolContent } from "./types";

export const colorNameFinderContent: ToolContent = {
  heroSubtitle: "Find the Closest Named Color to Any HEX Code",
  overview: [
    "A HEX code like #4f46e5 is precise but not human-memorable — describing a color by name (\"indigo,\" \"crimson,\" \"forest green\") is far more intuitive in conversation or documentation, even though most exact colors don't correspond precisely to a named color. This tool finds the closest match from a curated set of well-known named colors to any HEX code you enter.",
    "The matching works by calculating the Euclidean distance between your color and every named color in RGB space — essentially measuring how visually \"far apart\" two colors are across their red, green, and blue channels combined, then returning whichever named color has the smallest distance. A distance of 0 means an exact match; larger distances mean the named color is only an approximate match.",
    "The named color set covers standard CSS/X11 color names plus commonly recognized additional names — a well-known, broadly recognizable reference set rather than an exhaustive list of thousands of paint or fashion color names, keeping the results genuinely familiar rather than obscure.",
    "This is useful for quickly describing a design color in conversation, adding a human-readable label to a color in documentation or a style guide, or just satisfying curiosity about which named color a specific HEX value is closest to.",
  ],
  howItWorks: [
    {
      title: "Enter a HEX color code",
      description: "With or without the #, in 6-character or 3-character shorthand form.",
    },
    {
      title: "View the closest matching named color",
      description: "Along with the distance, showing how close (or approximate) the match is.",
    },
  ],
  examples: [
    {
      label: "Near-exact match",
      input: "#ff0001",
      output: "Red (exact HEX: #ff0000, distance 1 — essentially an exact match)",
    },
  ],
  faqs: [
    {
      question: "How is 'closeness' between colors actually measured?",
      answer:
        "This tool calculates the Euclidean distance between the two colors' red, green, and blue values — treating each color as a point in 3D space and measuring the straight-line distance between them. A smaller distance means the colors look more similar; a distance of 0 means an exact match.",
    },
    {
      question: "Why doesn't my exact HEX code have a named match?",
      answer:
        "There are 16 million possible HEX colors but only a limited set of commonly recognized named colors, so most specific HEX values won't have an exact name — this tool finds the closest available match and shows the distance, so you can judge whether the match is close enough to be useful for your purpose.",
    },
    {
      question: "Is this the full list of CSS named colors?",
      answer:
        "It's a curated set covering the most widely recognized standard color names, not the complete CSS specification list of 140+ named colors — this keeps results limited to names people would actually recognize and use, rather than including obscure or rarely-used entries.",
    },
    {
      question: "Can I use the matched name directly in CSS?",
      answer:
        "If the color name shown is a standard CSS color keyword (most of the common ones are), yes — CSS accepts named colors directly, like `color: crimson;`, functioning identically to specifying the equivalent HEX value.",
    },
    {
      question: "Why might two very different-looking HEX codes match the same color name?",
      answer:
        "If two HEX colors are both closer to the same named color than to any other name in the reference set, they'll both match to it — this is expected when a color falls in a region without many nearby named colors, and doesn't mean the two HEX values are actually similar to each other.",
    },
  ],
};
