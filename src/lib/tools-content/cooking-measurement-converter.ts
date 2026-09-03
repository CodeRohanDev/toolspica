import type { ToolContent } from "./types";

export const cookingMeasurementConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Cups, Tablespoons, Milliliters & More",
  overview: [
    "Recipes from different countries and different sources use different volume measurement conventions — American recipes lean heavily on cups, tablespoons, and teaspoons, while recipes from metric countries use milliliters and liters, making conversion a routine necessity when cooking from an international recipe or scaling a recipe using a different measuring tool than what you have on hand.",
    "This tool converts between the nine volume units that actually show up in recipes: teaspoons, tablespoons, fluid ounces, cups, pints, quarts, and gallons (US customary), alongside milliliters and liters (metric) — a focused unit list scoped specifically to cooking, unlike the broader general Volume Converter which also includes cubic meters and Imperial gallons less relevant to a kitchen.",
    "All conversions use precise US customary definitions (1 US teaspoon = 4.92892159375 ml, 1 US cup = 236.5882365 ml, and so on) — the standard convention assumed by most American recipes and measuring cup sets, though it's worth noting that some countries define \"cup\" slightly differently (an Australian cup, for instance, is 250 ml exactly, distinct from the US cup used here).",
    "This is useful for converting an American recipe's cup and tablespoon measurements into milliliters for a metric measuring set, scaling a recipe up or down using a different-sized measuring tool, or understanding a recipe's ingredient quantities when following along from a source using unfamiliar units.",
  ],
  howItWorks: [
    {
      title: "Enter a measurement and select its unit",
      description: "Any of the nine common cooking volume units.",
    },
    {
      title: "Select the target unit",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact converted result",
      description: "Plus the value in every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Cups to milliliters",
      input: "1 cup",
      output: "236.59 ml",
    },
    {
      label: "Tablespoons to teaspoons",
      input: "1 tablespoon",
      output: "3 teaspoons",
    },
  ],
  faqs: [
    {
      question: "Are these US or metric cup measurements?",
      answer:
        "This tool uses the US customary cup (236.5882365 ml), the standard assumed by most American recipes and US measuring cup sets. Some other countries define \"cup\" slightly differently — an Australian cup is exactly 250 ml, for instance — so if you're working with a non-US recipe, check which cup definition it's actually using.",
    },
    {
      question: "Why is 1 tablespoon exactly 3 teaspoons?",
      answer:
        "This is a fixed, exact relationship in US customary volume measurement, not an approximation — 3 teaspoons combine to exactly 1 tablespoon by definition, which is why this specific conversion always comes out as a clean whole number.",
    },
    {
      question: "Should I use weight instead of volume for baking measurements?",
      answer:
        "Many professional bakers recommend weight (grams) over volume (cups) for dry ingredients like flour specifically, since volume measurements can vary based on how tightly an ingredient is packed — but this tool converts between volume units only, matching what most home recipes actually specify.",
    },
    {
      question: "Why does this tool have a different unit list than the general Volume Converter?",
      answer:
        "This tool is scoped specifically to units that actually show up in recipes — leaving out cubic meters and Imperial gallons, which are rarely relevant in a kitchen context — making it faster to find the right unit than scrolling through the broader general-purpose volume unit list.",
    },
    {
      question: "How precise are the conversions?",
      answer:
        "All conversions use the exact defined US customary volume relationships, so results are precise to whatever decimal precision is displayed — useful for exact recipe scaling, though in practice, kitchen measuring tools themselves usually have more real-world variance than the math does.",
    },
  ],
};
