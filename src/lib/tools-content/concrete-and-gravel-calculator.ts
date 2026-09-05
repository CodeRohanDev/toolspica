import type { ToolContent } from "./types";

export const concreteAndGravelCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Cubic Yards and Bags Needed for Concrete, Gravel, or Mulch",
  overview: [
    "Ordering concrete, gravel, sand, or mulch requires knowing the volume you need, not just the surface area — a patio slab or a gravel driveway has depth as well as length and width, and getting that third dimension into the calculation is where manual math most often goes wrong.",
    "This calculator multiplies your area's length, width, and depth to get cubic feet, then converts that to cubic yards (the unit most bulk material suppliers quote pricing in) and to the number of standard 80-pound pre-mixed bags you'd need if buying bagged material instead of bulk delivery.",
    "It works identically for concrete, gravel, sand, topsoil, or mulch — just enter the footprint and how deep you want the material, and adjust the bag-yield constant if your specific product's bag size differs from the standard 80-pound assumption.",
  ],
  howItWorks: [
    { title: "Enter the area dimensions", description: "Input the length and width of the area in feet." },
    { title: "Enter the fill depth", description: "Input how deep the material layer should be, in inches." },
    { title: "Read the volume needed", description: "See cubic feet, cubic yards, and estimated bag count instantly." },
  ],
  examples: [
    {
      label: "10ft x 10ft patio slab, 4 inches deep",
      input: "Length: 10, Width: 10, Depth: 4 inches",
      output: "33.3 cubic feet, 1.24 cubic yards, ~56 bags (80lb)",
    },
  ],
  faqs: [
    {
      question: "Should I order extra material?",
      answer: "Yes — suppliers generally recommend ordering 5-10% extra to account for spillage, uneven ground, and compaction, especially for bulk deliveries where a shortfall means a second delivery fee.",
    },
    {
      question: "Does the bag count assume a specific product?",
      answer: "It assumes a standard 80-pound bag yielding about 0.6 cubic feet, which is typical for pre-mixed concrete and many gravel products. Check your specific bag's label — yield can vary by material and brand.",
    },
    {
      question: "Is bulk delivery cheaper than bags for large projects?",
      answer: "Usually yes, once you need more than roughly 1-2 cubic yards — bulk delivery pricing per cubic yard is typically much lower than the equivalent number of bags, though it requires more prep for placement.",
    },
    {
      question: "Is this calculation private?",
      answer: "Yes — all math happens locally in your browser. No project details are sent to any server.",
    },
  ],
};
