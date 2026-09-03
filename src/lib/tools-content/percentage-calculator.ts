import type { ToolContent } from "./types";

export const percentageCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Percentages, Percent Change & More",
  overview: [
    "\"Percentage calculator\" actually covers three genuinely different questions people ask, and mixing them up is the single most common source of percentage-math mistakes: finding X% of a number (what's 20% of 150?), finding what percent one number is of another (60 is what percent of 240?), and finding the percent change between two numbers (a price went from 80 to 100 — what's the percent increase?). This tool handles all three as distinct modes rather than forcing everything through one formula, because each one really is a different calculation.",
    "\"X% of Y\" is the most common everyday use — calculating a tip, a discount amount, a commission, or any straightforward percentage of a value. The math is simple (percentage ÷ 100 × value) but doing it reliably in your head for awkward numbers like 17% of 84 is exactly the kind of small arithmetic task worth automating.",
    "\"X is what % of Y\" answers a different question — given a part and a whole, what percentage does the part represent? This comes up constantly in reporting contexts: what percent of a budget was spent, what percent of students passed, what percent of a goal has been reached. It's the inverse operation of the first mode, and confusing the two is an easy mistake to make.",
    "\"Percent increase/decrease\" calculates the percentage change between an original and a new value — how much did a price, a metric, or a measurement change in percentage terms. This is the calculation behind headlines like \"sales grew 12%\" or \"prices rose 8% year over year,\" and it specifically requires knowing which number is the starting point, since percent change is calculated relative to the original value, not the new one.",
  ],
  howItWorks: [
    {
      title: "Choose the calculation you need",
      description:
        "Pick X% of Y, X is what % of Y, or percent increase/decrease.",
    },
    {
      title: "Enter your two values",
      description: "Field labels update to match exactly what each mode needs.",
    },
    {
      title: "Read the instant result",
      description: "The answer updates live as you type, with no calculate button needed.",
    },
  ],
  examples: [
    {
      label: "X% of Y",
      input: "20% of 150",
      output: "30",
    },
    {
      label: "Percent increase",
      input: "From 80 to 100",
      output: "+25.00% (increase)",
    },
  ],
  faqs: [
    {
      question: "What's the difference between 'X% of Y' and 'X is what % of Y'?",
      answer:
        "\"X% of Y\" starts with a known percentage and finds the resulting value (20% of 150 = 30). \"X is what % of Y\" does the reverse — it starts with two actual values and finds what percentage relationship they have (30 is what % of 150 = 20%). They're inverse operations of each other.",
    },
    {
      question: "Why is percent change calculated relative to the original value, not the new one?",
      answer:
        "Percent change is defined as (new − original) ÷ original × 100 — always relative to the starting point, because that's what \"percent increase from X\" means. Dividing by the new value instead would answer a different question and produce a different, non-standard result.",
    },
    {
      question: "Can percent change be negative?",
      answer:
        "Yes — if the new value is lower than the original, the result is negative, representing a percentage decrease. The tool labels this clearly as \"decrease\" alongside the negative number.",
    },
    {
      question: "Why can't the 'of value' or 'whole value' be zero in some modes?",
      answer:
        "Dividing by zero is mathematically undefined — \"X is what % of 0\" or a percent change starting from 0 has no valid percentage answer, since there's no baseline to compare against. The tool flags this rather than showing a meaningless result like Infinity.",
    },
    {
      question: "Does this handle decimal percentages, like 12.5%?",
      answer:
        "Yes — all three modes accept and correctly calculate with decimal values, both for the percentage itself and for the numbers being compared.",
    },
  ],
};
