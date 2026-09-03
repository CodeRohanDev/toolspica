import type { ToolContent } from "./types";

export const imageSplitterContent: ToolContent = {
  heroSubtitle: "Split Any Image into a Grid of Equal Tiles",
  overview: [
    "Splitting an image into a grid of tiles has real practical uses — creating a puzzle, preparing tiles for a multi-panel print layout, generating an Instagram grid post that spans multiple squares, or breaking a large image into manageable pieces.",
    "This tool divides any image into a grid with your chosen number of rows and columns, generating each tile as a separate, evenly-sized image. All tiles are packaged together into a single downloadable ZIP file, so you don't need to save each one individually.",
    "Each tile is cropped precisely from the source image with no gaps or overlaps between adjacent pieces, so reassembling them (in an image editor, a physical print layout, or a social media grid) lines up exactly as expected.",
    "This is useful for creating an Instagram multi-post grid image, preparing tiles for a large-format print split across multiple pages, generating puzzle pieces from a photo, and any project needing an image divided into equal grid sections.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Set rows and columns",
      description: "Up to 10×10, generating that many equal tiles.",
    },
    {
      title: "Download all tiles as a ZIP",
      description: "Each tile numbered and ready to use.",
    },
  ],
  examples: [
    {
      label: "Splitting a photo into a 3×3 Instagram grid",
      input: "A square photo, 3 rows × 3 columns",
      output: "9 equal tiles, numbered 1 through 9, packaged in a ZIP file",
    },
  ],
  faqs: [
    {
      question: "Do the tiles overlap or have gaps between them?",
      answer:
        "No — each tile is cropped precisely from an equal division of the source image, so adjacent tiles line up exactly with no overlap or gap, which matters for reassembling them correctly.",
    },
    {
      question: "What order are the tiles numbered in?",
      answer:
        "Left to right, top to bottom, row by row — the same reading order used for arranging them back into a grid layout, whether that's a physical print or a social media post sequence.",
    },
    {
      question: "What if my image doesn't divide evenly into the grid size I choose?",
      answer:
        "Tile dimensions are calculated by dividing the image's pixel dimensions by the number of rows and columns, rounded down — for most practical grid sizes this produces clean, evenly-sized tiles with at most a few leftover pixels trimmed from one edge.",
    },
    {
      question: "Why is the download a ZIP file instead of individual downloads?",
      answer:
        "Downloading potentially dozens of individual tile files one at a time is tedious — bundling them into a single ZIP lets you download everything in one click and extract them together.",
    },
    {
      question: "Is my image uploaded anywhere to split it?",
      answer:
        "No — splitting happens entirely in your browser using the Canvas API, and the ZIP file is assembled locally too. The image is never uploaded to a server.",
    },
  ],
};
