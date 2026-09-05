import type { ToolContent } from "./types";

export const graphPaperGeneratorContent: ToolContent = {
  heroSubtitle: "Generate and Print Custom Graph Paper",
  overview: [
    "Graph paper, dot grids, and isometric paper are surprisingly hard to find exactly when needed — a math assignment, a hand-sketched wireframe, an isometric drawing, or a quick chart by hand — and buying a physical pad for a one-off need feels like overkill when a printable page would do.",
    "This tool generates four common grid styles as a full-page, print-ready image: a standard square grid, a bold graph-paper style with darker lines every fifth square (matching traditional engineering graph paper), a dot grid (popular for bullet journaling and light sketching), and an isometric grid (for 3D-style technical or artistic drawing).",
    "The output is sized to standard US Letter paper (8.5 × 11 inches) at a resolution suitable for clean printing, so downloading and printing the PNG directly gives a properly proportioned page without needing to adjust print scaling or margins.",
  ],
  howItWorks: [
    { title: "Pick a grid style", description: "Choose standard, bold graph, dot grid, or isometric." },
    { title: "Preview the result", description: "See the full-page grid pattern rendered live." },
    { title: "Download and print", description: "Save as a PNG sized for standard Letter paper, ready to print." },
  ],
  examples: [
    {
      label: "Bold graph paper",
      input: "Style: Graph (bold every 5)",
      output: "graph-paper.png — a Letter-sized grid with darker lines every 5th square.",
    },
  ],
  faqs: [
    {
      question: "What paper size is this designed for?",
      answer:
        "US Letter (8.5 × 11 inches) — the downloaded image is sized and proportioned to print cleanly at that size without needing to adjust your printer's scaling settings.",
    },
    {
      question: "What's isometric grid paper used for?",
      answer:
        "Isometric grids (lines at 30-degree angles rather than a plain square grid) are commonly used for hand-drawing 3D-looking technical illustrations, product sketches, and some board game or puzzle designs.",
    },
    {
      question: "Can I adjust the spacing between grid lines?",
      answer:
        "Each style uses a fixed spacing tuned to that style's typical use — the bold graph style, for example, matches traditional engineering graph paper's 5-square bold interval convention.",
    },
    {
      question: "Is anything uploaded when I generate a grid?",
      answer:
        "No — the grid is drawn entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
