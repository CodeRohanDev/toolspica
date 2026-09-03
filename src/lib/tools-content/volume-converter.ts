import type { ToolContent } from "./types";

export const volumeConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Liters, Gallons, Cups & More",
  overview: [
    "Volume measurement splits across metric units (milliliters, liters, cubic meters) and several distinct US customary units (gallons, quarts, pints, cups, fluid ounces) — and even within the imperial family, US and UK (Imperial) gallons are genuinely different sizes, a common source of confusion when converting fuel economy or liquid volume figures across countries.",
    "This tool converts between nine common volume units, using US customary definitions for gallon, quart, pint, cup, and fluid ounce (the versions most commonly referenced online and in US recipes and products), plus the separately defined Imperial gallon for UK/Commonwealth contexts. A US gallon (3.785411784 liters) is meaningfully smaller than an Imperial gallon (4.54609 liters) — roughly 17% smaller — which matters for accurate cross-border conversions.",
    "The cubic meter is included as the large-scale metric unit, useful for shipping container volumes, room or tank capacity, and other bulk volume contexts where liters become an unwieldy unit to work with directly.",
    "This is useful for cooking with recipes from a different country, comparing fuel tank or container capacities across US and UK/metric specifications, chemistry or lab work requiring precise volume conversion, or any situation needing to convert between these overlapping systems accurately.",
  ],
  howItWorks: [
    {
      title: "Enter a volume value and select its unit",
      description: "Any of the nine supported volume units.",
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
      label: "Liters to US gallons",
      input: "1 liter",
      output: "0.264172 US gallons",
    },
    {
      label: "US cups to milliliters",
      input: "1 US cup",
      output: "236.588237 milliliters",
    },
  ],
  faqs: [
    {
      question: "Why are US and Imperial gallons different sizes?",
      answer:
        "The US gallon (3.785411784 liters) and the Imperial gallon (4.54609 liters, used in the UK and some Commonwealth countries) developed from different historical standards and were never unified — the Imperial gallon is roughly 20% larger, which matters significantly for anything measured in gallons across the two systems, like fuel economy comparisons.",
    },
    {
      question: "Does this use US or UK definitions for cups and fluid ounces?",
      answer:
        "This tool uses US customary definitions throughout (US cup, US fluid ounce, US pint, US quart, US gallon) alongside the metric units and the Imperial gallon specifically — the most common combination needed for US recipe conversion and general international volume conversion.",
    },
    {
      question: "Why is a US cup exactly 236.5882365 milliliters?",
      answer:
        "This is the precise, legally defined US customary cup measurement, derived from its exact relationship to the US gallon (1 gallon = 16 cups). It's a specific, non-round metric value precisely because it was defined based on the pre-existing imperial system's internal fractions, not designed to align cleanly with metric units.",
    },
    {
      question: "Can I use this for cooking measurement conversion?",
      answer:
        "Yes — this tool works for general and cooking volume conversion alike, though the dedicated Cooking Measurement Converter is scoped specifically to the units that actually show up in recipes (teaspoons through gallons), which may be a more focused fit for kitchen use specifically.",
    },
    {
      question: "Why is cubic meter included alongside liter?",
      answer:
        "For larger volumes — a shipping container, a water tank, a room's air volume — liters become an unwieldy unit requiring very large numbers, so cubic meters (1 m³ = 1,000 liters) provide a more practical scale for bulk volume contexts.",
    },
  ],
};
