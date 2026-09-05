import type { ToolContent } from "./types";

export const bettingOddsConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Decimal, American, and Fractional Betting Odds",
  overview: [
    "Sportsbooks and betting markets around the world use different odds formats — decimal odds are common in Europe and Australia, American (moneyline) odds dominate US sportsbooks, and fractional odds are traditional in the UK — and comparing odds across formats or platforms requires converting between them correctly.",
    "This tool converts between all three formats instantly: enter odds in decimal or American format and see the equivalent in all three systems, plus the implied win probability that the odds represent, letting you quickly evaluate or compare betting lines regardless of which format they're quoted in.",
    "It also computes the fractional odds representation by finding the closest simple fraction to the decimal value, matching how fractional odds are typically displayed (like 5/1 or 7/2) rather than as an unreduced decimal ratio.",
  ],
  howItWorks: [
    { title: "Enter odds in one format", description: "Input decimal odds or American odds — the other updates automatically." },
    { title: "See all three formats", description: "View fractional odds and implied probability alongside your input." },
    { title: "Compare across sportsbooks", description: "Use the converted values to compare lines quoted in different formats." },
  ],
  examples: [
    {
      label: "Decimal odds of 2.50",
      input: "Decimal: 2.50",
      output: "American: +150, Fractional: 3/2, Implied probability: 40.0%",
    },
  ],
  faqs: [
    {
      question: "What does implied probability mean?",
      answer: "It's the win probability that the odds mathematically imply — for example, decimal odds of 2.0 imply a 50% chance of winning. It's calculated as 1 divided by the decimal odds.",
    },
    {
      question: "Why do probabilities across all outcomes add up to more than 100%?",
      answer: "Sportsbooks build in a margin (called the 'vig' or 'overround') by pricing all outcomes so their implied probabilities sum to slightly over 100% — that difference is the bookmaker's built-in edge.",
    },
    {
      question: "How does American odds notation work?",
      answer: "Positive American odds (like +150) show how much profit a $100 bet would win; negative American odds (like -150) show how much you'd need to bet to win $100 profit.",
    },
    {
      question: "Is this tool affiliated with any sportsbook?",
      answer: "No — this is an independent conversion calculator for reference purposes only, with no connection to any betting platform or service.",
    },
  ],
};
