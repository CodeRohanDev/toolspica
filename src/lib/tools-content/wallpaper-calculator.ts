import type { ToolContent } from "./types";

export const wallpaperCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate How Many Wallpaper Rolls You Need",
  overview: [
    "Wallpaper is sold in rolls of fixed width and length, and figuring out how many rolls a room needs means working through two separate divisions: how many vertical strips fit around the room's perimeter, and how many of those strips one roll can yield based on wall height — a calculation that's easy to get subtly wrong by hand.",
    "This calculator takes your room's length and width to compute total wall perimeter, divides that by your wallpaper roll's width to get the number of strips needed, then separately divides the roll's length by your ceiling height to see how many strips each roll yields, before combining both numbers into a final roll count.",
    "Default roll dimensions (21 inches wide, 33 feet long) match a standard US single roll, but you can adjust both values to match the specific wallpaper product you're using — European rolls, for instance, commonly use different width and length standards.",
  ],
  howItWorks: [
    { title: "Enter room dimensions", description: "Input the room's length, width, and ceiling height in feet." },
    { title: "Enter roll specifications", description: "Input your wallpaper roll's width in inches and length in feet." },
    { title: "See the roll count", description: "View strips needed, strips per roll, and total rolls to buy." },
  ],
  examples: [
    {
      label: "12ft x 10ft room, 8ft ceilings, standard US roll",
      input: "Room: 12x10, Height: 8, Roll: 21in x 33ft",
      output: "13 strips needed, 4 rolls to buy",
    },
  ],
  faqs: [
    {
      question: "Should I buy extra rolls for pattern matching?",
      answer: "Yes — wallpapers with a repeating pattern often lose material to pattern alignment between strips. Consider adding one extra roll for patterned wallpaper, especially with large repeat sizes.",
    },
    {
      question: "Does this account for doors and windows?",
      answer: "No — this calculates strips needed for full wall perimeter. For rooms with large openings, you can slightly reduce the effective perimeter, though most installers still buy for the full wall length since partial strips are often still needed.",
    },
    {
      question: "What if my roll dimensions differ from the default?",
      answer: "Just update the roll width and length fields to match your specific product — the label on the wallpaper roll or its packaging lists both dimensions.",
    },
    {
      question: "Is this calculator private?",
      answer: "Completely — every calculation happens in your browser using the numbers you enter. Nothing is sent to a server.",
    },
  ],
};
