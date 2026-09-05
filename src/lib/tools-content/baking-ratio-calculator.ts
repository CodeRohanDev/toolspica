import type { ToolContent } from "./types";

export const bakingRatioCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Bread Dough Ingredients Using Baker's Percentage",
  overview: [
    "Professional bakers rarely write recipes in cups and grams directly — instead they use 'baker's percentage,' where every ingredient's weight is expressed as a percentage of the total flour weight, making it trivial to scale a recipe to any batch size while keeping the same dough characteristics.",
    "This calculator applies baker's percentage ratios for several common dough types — lean bread, pizza, enriched dough, and a rough sourdough approximation — to whatever flour weight you enter, instantly computing the exact water, salt, and yeast (or starter) weight needed in grams.",
    "Because everything scales directly off the flour weight, you can make a tiny test batch or a huge one without ever recalculating ratios by hand — just change the flour weight and every other ingredient updates proportionally.",
  ],
  howItWorks: [
    { title: "Choose a dough type", description: "Select from lean bread, pizza, enriched dough, or sourdough presets." },
    { title: "Enter your flour weight", description: "Input how many grams of flour you're using." },
    { title: "Read the ingredient weights", description: "See water, salt, and yeast/starter weights computed instantly." },
  ],
  examples: [
    {
      label: "500g flour, lean bread dough",
      input: "Flour: 500g, Type: Lean bread dough",
      output: "Water: 325g, Salt: 10g, Yeast: 5g",
    },
  ],
  faqs: [
    {
      question: "What is baker's percentage?",
      answer: "It's a ratio system where flour is always 100%, and every other ingredient's weight is expressed as a percentage of that flour weight — for example, 65% water means the water weighs 65% of the flour weight.",
    },
    {
      question: "How accurate is the sourdough preset?",
      answer: "Sourdough recipes vary widely by starter hydration and baker's preference, so the sourdough preset is a rough approximation. Adjust the flour weight and treat the output as a reasonable starting point rather than an exact recipe.",
    },
    {
      question: "Can I use this for non-bread baked goods?",
      answer: "Baker's percentage is most standard for bread and pizza dough. Cakes, cookies, and pastries typically don't follow this ratio system as consistently.",
    },
    {
      question: "Is this calculated on a server?",
      answer: "No — all ratios are applied locally in your browser using basic multiplication. Nothing is sent anywhere.",
    },
  ],
};
