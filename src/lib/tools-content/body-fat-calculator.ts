import type { ToolContent } from "./types";

export const bodyFatCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Body Fat Percentage Using the U.S. Navy Method",
  overview: [
    "Body fat percentage — the proportion of total body weight that's fat tissue versus lean mass — is a more informative measure of body composition than weight or BMI alone, since two people at the same weight and height can have very different body fat percentages depending on muscle mass. This tool estimates it using the U.S. Navy circumference method, a well-established approach that doesn't require special equipment.",
    "The method uses simple tape-measure circumference measurements — neck, waist, and (for women) hip — combined with height, in a formula derived from research correlating these circumferences with body fat measured by more precise methods. The formula differs between men and women, reflecting the different way body fat typically distributes.",
    "This is an estimate, not a precise clinical measurement — the Navy method typically has an accuracy margin of a few percentage points compared to gold-standard methods like DEXA scans or hydrostatic weighing, which measure body composition directly rather than estimating it from circumferences. It's most useful for tracking relative change over time (is body fat trending down as you train) rather than as an exact absolute number.",
    "The category shown alongside the percentage — Essential fat, Athletic, Fitness, Average, Above average — reflects commonly referenced fitness industry ranges, useful for general context on where a given percentage typically falls, though individual health considerations vary and these categories aren't a medical diagnosis.",
  ],
  howItWorks: [
    {
      title: "Select your sex and measurement unit",
      description: "The formula and required measurements differ between men and women.",
    },
    {
      title: "Measure and enter neck, waist, and (for women) hip circumference",
      description: "Plus your height — use a flexible tape measure for accuracy.",
    },
    {
      title: "View your estimated body fat percentage",
      description: "Alongside a general fitness category for context.",
    },
  ],
  examples: [
    {
      label: "Male body fat estimate",
      input: "Height 178 cm, neck 38 cm, waist 90 cm",
      output: "Body fat: 20.1% — Average",
    },
    {
      label: "Female body fat estimate",
      input: "Height 165 cm, neck 32 cm, waist 75 cm, hip 95 cm",
      output: "Body fat: 27.4% — Average",
    },
  ],
  faqs: [
    {
      question: "How accurate is the Navy method compared to other body fat measurements?",
      answer:
        "It's a well-validated estimation method, but circumference-based methods typically carry a margin of error of a few percentage points compared to gold-standard methods like DEXA scans, hydrostatic weighing, or bioelectrical impedance devices, which measure body composition more directly rather than estimating it from tape measurements.",
    },
    {
      question: "Why does the formula require different measurements for men and women?",
      answer:
        "Men and women tend to store body fat differently on average — women typically carry more fat in the hip area, which is why the female formula includes a hip measurement that the male formula doesn't need. The formulas themselves are also derived from separate research populations for each sex.",
    },
    {
      question: "How should I measure my waist and neck accurately?",
      answer:
        "Use a flexible tape measure, keep it snug but not compressing the skin, and measure at a consistent point each time — typically the narrowest point of the neck, and at the navel level for the waist — for the most consistent, comparable results over repeated measurements.",
    },
    {
      question: "Is this a better indicator of health than BMI?",
      answer:
        "Body fat percentage gives more information about body composition than BMI, which can't distinguish muscle from fat — a muscular person can show a \"high\" BMI while actually having low body fat. That said, body fat percentage alone still doesn't capture everything about metabolic health, and both measurements are best considered alongside other health indicators.",
    },
    {
      question: "Can I use this to track progress over time?",
      answer:
        "Yes — even though the absolute number carries some margin of error, tracking the same measurement method consistently over weeks or months gives a reasonably reliable signal of whether body fat percentage is trending up, down, or staying stable.",
    },
  ],
};
