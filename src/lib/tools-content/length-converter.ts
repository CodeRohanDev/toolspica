import type { ToolContent } from "./types";

export const lengthConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Millimeters, Meters, Feet, Miles & More",
  overview: [
    "Length is measured in two entirely separate systems worldwide — metric (millimeters through kilometers) and imperial/US customary (inches through miles) — and converting accurately between them requires precise conversion factors, not rounded approximations that compound into meaningful errors over larger distances.",
    "This tool converts between eight common length units: millimeters, centimeters, meters, and kilometers on the metric side; inches, feet, yards, and miles on the imperial side. Every conversion factor used is the internationally defined exact value (for example, exactly 25.4 millimeters per inch, the internationally agreed definition since 1959), not a rounded approximation.",
    "Beyond converting between just two units at a time, the tool shows the entered value converted into every other unit simultaneously — useful for quickly seeing a measurement across the full range of units without repeating the conversion one pair at a time.",
    "This is useful for construction and engineering work crossing between metric and imperial specifications, international recipe or product measurements, sports and fitness distances, or any situation requiring an exact length conversion rather than a rough mental estimate.",
  ],
  howItWorks: [
    {
      title: "Enter a value and select its unit",
      description: "Any of the eight supported length units.",
    },
    {
      title: "Select the unit to convert to",
      description: "Use the swap button to quickly reverse direction.",
    },
    {
      title: "View the exact result",
      description: "Plus the same value converted into every other unit at once.",
    },
  ],
  examples: [
    {
      label: "Meters to feet",
      input: "1 meter",
      output: "3.280840 feet",
    },
    {
      label: "Miles to kilometers",
      input: "1 mile",
      output: "1.609344 kilometers",
    },
  ],
  faqs: [
    {
      question: "Why is 1 inch exactly 25.4 millimeters?",
      answer:
        "This isn't a rounded approximation — 25.4 mm per inch has been the internationally agreed, exact definition of the inch since 1959, adopted by English-speaking countries to standardize imperial measurements against the metric system precisely.",
    },
    {
      question: "Is a mile always exactly 1,609.344 meters?",
      answer:
        "Yes — the international mile is defined as exactly 1,609.344 meters, derived directly from the standardized inch definition (1 mile = 5,280 feet = 63,360 inches = 63,360 × 25.4 mm). This tool uses that exact value, not a rounded 1.6 km approximation.",
    },
    {
      question: "Which countries primarily use imperial units for length?",
      answer:
        "The United States is the most prominent user of imperial units (inches, feet, miles) for everyday measurement, while the UK uses a mix of both systems depending on context (miles for road distances, but metric for most other measurements). Nearly all other countries use the metric system exclusively.",
    },
    {
      question: "Why does this tool show conversions to every unit at once, not just one pair?",
      answer:
        "Seeing a single measurement across every supported unit at once is often more useful than repeating a one-at-a-time conversion, especially when you're not sure yet which specific unit you'll ultimately need.",
    },
    {
      question: "Is there any rounding error in these conversions?",
      answer:
        "The conversion factors themselves are exact internationally defined values, so the only rounding happens in the final displayed decimal places, controlled to a reasonable precision (typically 4-6 decimal places) rather than truncating early in the calculation.",
    },
  ],
};
