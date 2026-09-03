import type { ToolContent } from "./types";

export const bmiCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Body Mass Index in Metric or Imperial Units",
  overview: [
    "Body Mass Index (BMI) is a simple ratio of weight to height, widely used as a quick, population-level screening indicator for whether someone's weight falls in a range associated with typical, underweight, overweight, or obese categories. It's calculated the same way everywhere — weight divided by height squared — but the exact formula and units differ depending on whether you're working in metric or imperial measurements, which is why this tool supports both directly rather than forcing a manual conversion first.",
    "In metric units, BMI is weight in kilograms divided by height in meters squared. In imperial units, the standard formula is 703 times weight in pounds divided by height in inches squared — the 703 constant exists specifically to make the imperial calculation produce the same BMI scale as the metric formula, despite using pounds and inches instead of kilograms and meters. This tool applies whichever formula matches your chosen unit system automatically.",
    "The result is categorized using the standard World Health Organization BMI ranges: below 18.5 is Underweight, 18.5 to 24.9 is Normal weight, 25 to 29.9 is Overweight, and 30 and above is Obese. These categories are a useful, quick screening reference, but BMI is a population-level statistical tool, not a diagnostic measurement of individual health — it doesn't account for muscle mass, bone density, body composition, age, or sex, which is why a muscular athlete can show a numerically \"high\" BMI despite having low body fat.",
    "This tool is meant for a quick, informational check of where a height/weight combination falls on the standard BMI scale — genuinely useful for general awareness, tracking a change over time, or satisfying curiosity about the calculation — but it isn't a substitute for a full health assessment from a medical professional, who would weigh BMI alongside other individual factors.",
  ],
  howItWorks: [
    {
      title: "Choose your unit system",
      description: "Metric (centimeters and kilograms) or Imperial (feet, inches, and pounds).",
    },
    {
      title: "Enter your height and weight",
      description: "Fields update to match the unit system you picked.",
    },
    {
      title: "View your BMI and category",
      description: "The calculated BMI and its standard category (Underweight through Obese) update instantly.",
    },
  ],
  examples: [
    {
      label: "Metric calculation",
      input: "Height 170 cm, weight 65 kg",
      output: "BMI 22.5 — Normal weight",
    },
    {
      label: "Imperial calculation",
      input: "Height 5 ft 7 in, weight 145 lb",
      output: "BMI 22.7 — Normal weight",
    },
  ],
  faqs: [
    {
      question: "Why does the imperial formula use the number 703?",
      answer:
        "703 is a conversion constant that adjusts the pounds-and-inches version of the formula to produce the same numeric BMI scale as the kilograms-and-meters metric formula. Without it, using pounds and inches directly would produce a completely different, non-comparable number.",
    },
    {
      question: "Is BMI accurate for athletes or very muscular people?",
      answer:
        "Not particularly — BMI only accounts for total weight relative to height, and can't distinguish between muscle and fat. A muscular athlete can register as \"overweight\" by BMI despite having a low body fat percentage, which is a well-known limitation of the metric.",
    },
    {
      question: "What BMI range counts as 'Normal weight'?",
      answer:
        "18.5 to 24.9 is classified as Normal weight under the standard WHO ranges used by this tool. Below 18.5 is Underweight, 25 to 29.9 is Overweight, and 30 or above is Obese.",
    },
    {
      question: "Does BMI account for age or sex?",
      answer:
        "No — the standard adult BMI formula and category ranges used here are the same regardless of age or sex, which is one of its known limitations. Some clinical contexts use age- and sex-adjusted references instead, particularly for children.",
    },
    {
      question: "Should I make health decisions based only on my BMI?",
      answer:
        "BMI is a useful quick screening number, not a full health diagnosis — it doesn't measure body composition, fitness level, or other individual health factors. For an actual health assessment, it's best considered alongside other measurements and a medical professional's evaluation.",
    },
  ],
};
