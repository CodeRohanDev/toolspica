import type { ToolContent } from "./types";

export const paintCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate How Many Gallons of Paint You Need",
  overview: [
    "Buying too little paint means a second trip to the store mid-project and the risk of a slightly different batch tint; buying too much wastes money on a product that's hard to return once opened. Getting the gallon count right up front depends on the room's wall area, how many coats you're applying, and how much of that area is actually openings — doors and windows — that don't need paint at all.",
    "This calculator takes your room's length, width, and ceiling height, subtracts the area taken up by doors and windows, and multiplies by your number of coats to get total paintable square footage. It then divides by a standard coverage rate of 350 square feet per gallon — the typical spread rate most interior paints list on their can — to tell you exactly how many gallons to buy.",
    "Everything runs instantly in your browser as you adjust dimensions, so you can quickly compare scenarios: one coat versus two, a room with a lot of windows versus a windowless one, or a larger accent wall versus the whole room.",
  ],
  howItWorks: [
    { title: "Enter room dimensions", description: "Input the room's length, width, and ceiling height in feet." },
    { title: "Subtract openings", description: "Enter the total square footage of doors and windows to exclude." },
    { title: "Set number of coats", description: "Choose one or two coats — the calculator scales the gallons needed accordingly." },
  ],
  examples: [
    {
      label: "12ft x 10ft room, 8ft ceilings, 2 coats",
      input: "Length: 12, Width: 10, Height: 8, Openings: 40 sq ft, Coats: 2",
      output: "≈ 2.1 gallons needed",
    },
  ],
  faqs: [
    {
      question: "Why 350 square feet per gallon?",
      answer: "That's the typical spread rate listed on most interior paint cans for a smooth wall. Textured or porous surfaces (like new drywall) may need more paint per coat — check your specific product's label for its exact coverage rate.",
    },
    {
      question: "Should I round up the gallon estimate?",
      answer: "Yes — paint stores sell in whole gallons or quarts, and having a small surplus for touch-ups later is worth it. The calculator's result already reflects the raw math; round up to the nearest can size when buying.",
    },
    {
      question: "Does this include the ceiling?",
      answer: "No — this calculates wall area only. If you're also painting the ceiling, calculate that separately using the ceiling's length times width, divided by 350.",
    },
    {
      question: "Is my room data sent anywhere?",
      answer: "No — every calculation runs locally in your browser using plain arithmetic. Nothing you enter is transmitted or stored.",
    },
  ],
};
