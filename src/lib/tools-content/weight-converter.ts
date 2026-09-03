import type { ToolContent } from "./types";

export const weightConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Kilograms, Pounds, Ounces & More",
  overview: [
    "Weight (technically mass, though used interchangeably in everyday conversion) is measured in metric units (milligrams through metric tons) in most of the world, while the US primarily uses pounds and ounces, and the UK still commonly uses stone for body weight specifically — three overlapping systems that regularly need converting between each other.",
    "This tool converts between seven common units: milligrams, grams, kilograms, and metric tons on the metric side; ounces, pounds, and stone on the imperial/US side. The pound is defined as exactly 0.45359237 kilograms internationally, the precise value this tool uses rather than a rounded 0.454 approximation.",
    "Stone (used primarily in the UK and Ireland for body weight) is less familiar to those outside those regions but converts cleanly — 1 stone equals exactly 14 pounds, or roughly 6.35 kilograms — and this tool handles it alongside the more universally recognized units.",
    "This is useful for cooking and baking with recipes from different countries, tracking body weight across different regional unit conventions, shipping and freight calculations, or any situation needing an exact weight conversion.",
  ],
  howItWorks: [
    {
      title: "Enter a value and select its unit",
      description: "Any of the seven supported weight units.",
    },
    {
      title: "Select the unit to convert to",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact result",
      description: "Plus the value converted into every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Kilograms to pounds",
      input: "1 kilogram",
      output: "2.204623 pounds",
    },
    {
      label: "Stone to kilograms",
      input: "10 stone",
      output: "63.502932 kilograms",
    },
  ],
  faqs: [
    {
      question: "Is the pound exactly 0.45359237 kilograms?",
      answer:
        "Yes — this is the exact internationally agreed definition of the avoirdupois pound, standardized in 1959, not a rounded approximation. This tool uses that precise value for every pound-related conversion.",
    },
    {
      question: "Why does the UK use stone for body weight specifically?",
      answer:
        "Stone remains a common colloquial unit for body weight in the UK and Ireland even though the rest of everyday measurement has largely shifted to metric — it's a specific cultural holdout for this one use case, with 1 stone equal to exactly 14 pounds.",
    },
    {
      question: "What's the difference between a metric ton and a US ton?",
      answer:
        "This tool's \"metric ton\" (tonne) equals exactly 1,000 kilograms. A US short ton (not included here) equals 2,000 pounds (about 907 kg), and a UK long ton equals 2,240 pounds (about 1,016 kg) — three genuinely different units that happen to share the word \"ton,\" a common source of confusion in shipping and freight contexts.",
    },
    {
      question: "Is weight the same as mass?",
      answer:
        "Technically, weight is a force (mass times gravitational acceleration) while mass is an intrinsic property of matter — but in everyday conversion and common usage, the terms are used interchangeably, and this tool (like virtually all everyday weight converters) treats them as equivalent for practical purposes.",
    },
    {
      question: "How precise are the results shown?",
      answer:
        "Results display to several decimal places using exact conversion factors, giving precision well beyond what's needed for most everyday purposes while still being available for contexts (like precise cooking or scientific work) where extra decimal precision matters.",
    },
  ],
};
