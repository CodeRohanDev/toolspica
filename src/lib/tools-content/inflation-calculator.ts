import type { ToolContent } from "./types";

export const inflationCalculatorContent: ToolContent = {
  heroSubtitle: "See How Inflation Changes Purchasing Power Over Time",
  overview: [
    "Inflation steadily erodes purchasing power over time — the same dollar amount buys progressively less as prices rise, which is why $1,000 today won't have the same real value in 10 or 20 years, even without spending a cent of it. This tool calculates exactly how much a given amount is worth at a different point in time, once a constant average inflation rate is applied.",
    "\"Future value\" mode answers the forward-looking question: given today's amount and an assumed average inflation rate, what amount of money in the future would have equivalent purchasing power — useful for understanding how much a retirement target or long-term savings goal needs to grow just to keep pace with rising prices, separate from any actual investment growth.",
    "\"Past equivalent value\" mode answers the reverse question: given today's amount, what did that same purchasing power look like some number of years ago — useful for understanding historical context, like realizing that a $50,000 salary today doesn't represent nearly as much real purchasing power as the same number did decades earlier.",
    "It's important to understand this is a directional estimate, not an official historical inflation calculation. Real-world inflation varies significantly year to year and isn't a smooth constant rate — a government statistics agency's official inflation calculator, based on actual historical price index data, would be more precise for a specific historical period. This tool uses a single average rate you provide, which is useful for planning and general understanding but isn't a precise historical record.",
  ],
  howItWorks: [
    {
      title: "Choose future value or past equivalent value",
      description: "Future projects an amount forward; past converts it backward.",
    },
    {
      title: "Enter the amount, number of years, and inflation rate",
      description: "Rate defaults to 3%, a commonly cited long-run average — adjust as needed.",
    },
    {
      title: "View the inflation-adjusted amount",
      description: "See the equivalent purchasing power at the other point in time.",
    },
  ],
  examples: [
    {
      label: "Future value (purchasing power erosion)",
      input: "$1,000 today, 10 years, 3% average inflation",
      output: "$1,343.92 needed in 10 years for equivalent purchasing power",
    },
    {
      label: "Past equivalent value",
      input: "$1,000 today, 10 years ago, 3% average inflation",
      output: "$744.09 had equivalent purchasing power 10 years ago",
    },
  ],
  faqs: [
    {
      question: "Why does the future value amount need to be higher than the starting amount?",
      answer:
        "Since inflation reduces purchasing power over time, a larger dollar amount is needed in the future to buy the same goods and services that the starting amount buys today — the future value calculation shows exactly how much larger that amount needs to be at the assumed inflation rate.",
    },
    {
      question: "What inflation rate should I use?",
      answer:
        "3% is a commonly cited long-run average for many economies, but actual inflation varies significantly by country and time period, sometimes considerably higher or lower in a given year. Use a rate that reflects your specific planning assumption or the region you're interested in.",
    },
    {
      question: "Is this the same as an official government inflation calculator?",
      answer:
        "No — official inflation calculators (like the US Bureau of Labor Statistics' CPI calculator) use actual historical price index data for precise year-by-year conversions. This tool uses a single constant average rate you provide, which is useful for forward-looking planning and general understanding, but not a precise historical record.",
    },
    {
      question: "How does this relate to retirement or savings goal planning?",
      answer:
        "Understanding inflation's effect on a savings target is essential — a retirement goal calculated in today's dollars needs to be inflated forward to know the actual future dollar amount required, since the cost of living will be higher by the time that goal needs to be reached.",
    },
    {
      question: "Why is the past value lower than today's amount?",
      answer:
        "Since prices generally rise over time, the same dollar amount had more purchasing power in the past than it does today — so a smaller amount of money in the past was equivalent to today's larger amount, which is exactly what the past equivalent value calculation shows.",
    },
  ],
};
