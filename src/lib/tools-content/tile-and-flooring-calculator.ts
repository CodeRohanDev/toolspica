import type { ToolContent } from "./types";

export const tileAndFlooringCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate How Many Tiles You Need for Any Room",
  overview: [
    "Tiling a floor requires buying enough tiles to cover the whole room plus extra for cuts, breakage, and pattern matching — but figuring out that exact number by hand means converting tile dimensions from inches to feet, computing room area, and adding a waste percentage on top, which is easy to get wrong.",
    "This calculator takes your room's length and width along with your tile's length and width in inches, computes the room's total square footage and each tile's coverage area, and divides one by the other — after adding your chosen waste allowance — to give you the exact number of tiles to purchase.",
    "A waste allowance slider lets you adjust for your layout: 10% is standard for a straight-lay pattern, while diagonal layouts, herringbone patterns, or rooms with lots of corners and cutouts typically need 15-20% extra to account for cut pieces that can't be reused.",
  ],
  howItWorks: [
    { title: "Enter room dimensions", description: "Input the room's length and width in feet." },
    { title: "Enter tile size", description: "Input your tile's length and width in inches." },
    { title: "Adjust waste allowance", description: "Set the cut/breakage buffer based on your layout pattern." },
  ],
  examples: [
    {
      label: "15ft x 12ft room, 12x12 inch tiles, 10% waste",
      input: "Room: 15x12, Tile: 12x12 inches, Waste: 10%",
      output: "180 sq ft room → 198 tiles needed",
    },
  ],
  faqs: [
    {
      question: "How much waste allowance should I use?",
      answer: "10% works for a simple straight-lay pattern in a rectangular room. Use 15% for diagonal layouts or rooms with many corners, and up to 20% for complex patterns like herringbone.",
    },
    {
      question: "Does this account for grout lines?",
      answer: "No — grout line width has a negligible effect on tile count for most standard tile sizes. For very small mosaic tiles with wide grout lines, add a small extra margin.",
    },
    {
      question: "Should I buy tiles from the same batch?",
      answer: "Yes — tile color and shade can vary slightly between production batches (called 'dye lots'), so buy all your tiles, including the waste buffer, from the same batch when possible.",
    },
    {
      question: "Is this calculation done on a server?",
      answer: "No — everything is computed instantly in your browser with basic arithmetic. Your room and tile dimensions are never sent anywhere.",
    },
  ],
};
