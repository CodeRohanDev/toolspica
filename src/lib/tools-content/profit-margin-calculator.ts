import type { ToolContent } from "./types";

export const profitMarginCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Profit Margin & Markup From Cost and Price",
  overview: [
    "Profit margin and markup are two related but genuinely different percentages, and confusing them is a common pricing mistake — margin is profit as a percentage of the selling price, while markup is profit as a percentage of the cost. A 50% markup on a $60 cost gives a $90 price, but that same $90 price only represents a 33% margin, not 50% — the two numbers diverge more the higher they get, which trips up pricing decisions when the wrong one is used.",
    "This tool calculates both from just two inputs — your selling price (or revenue) and your cost. Margin is calculated as (price − cost) ÷ price × 100, while markup is calculated as (price − cost) ÷ cost × 100. Both describe the same underlying profit dollar amount, just expressed relative to a different base number, which is exactly why they produce different percentages for the same transaction.",
    "Margin is generally the more useful figure for understanding overall business profitability, since it directly relates to how much of each revenue dollar is actually profit — a business with a 40% margin keeps 40 cents of profit for every dollar of revenue. Markup is more commonly used when setting a price from a known cost, since it directly answers \"how much do I add on top of what this costs me.\"",
    "This is useful for pricing a product or service, checking whether a margin is healthy relative to industry norms, or simply understanding the real profitability of a transaction once cost is factored in — a $100 sale means very different things depending on whether the cost behind it was $20 or $80.",
  ],
  howItWorks: [
    {
      title: "Enter your selling price and cost",
      description: "The price you charge and what it actually cost you.",
    },
    {
      title: "View margin and markup together",
      description: "Both percentages calculated instantly from the same two numbers.",
    },
    {
      title: "See the profit amount",
      description: "The actual dollar profit behind both percentages.",
    },
  ],
  examples: [
    {
      label: "Margin and markup comparison",
      input: "Price $90, cost $60",
      output: "Margin: 33.33% — Markup: 50%",
    },
  ],
  faqs: [
    {
      question: "Why are margin and markup different percentages for the same sale?",
      answer:
        "Margin divides profit by the selling price, while markup divides profit by the cost — since the selling price is always higher than the cost (assuming a profitable sale), dividing by the larger number (price) always produces a smaller percentage than dividing by the smaller number (cost). They describe the same profit dollar amount from two different reference points.",
    },
    {
      question: "Which one should I use when pricing a product?",
      answer:
        "Markup is often more practical when starting from a known cost and deciding what to charge (\"I want to mark this up by 40%\"), while margin is more useful for evaluating overall profitability against revenue (\"I want a 25% margin across my business\"). Both are legitimate, just answering slightly different questions.",
    },
    {
      question: "Can margin ever be higher than markup?",
      answer:
        "No — margin is always a lower percentage than markup for the same transaction (as long as there's a profit at all), since it's calculated against the larger price figure rather than the smaller cost figure. They only become equal in the mathematical edge case of a cost of zero.",
    },
    {
      question: "What does a negative margin mean?",
      answer:
        "A negative margin means the selling price is actually lower than the cost — you're losing money on every unit sold, which the tool would show as a negative percentage rather than a normal profit margin.",
    },
    {
      question: "Does this account for other business expenses beyond the direct cost?",
      answer:
        "No — this calculates gross margin and markup based purely on the price and direct cost you enter. It doesn't factor in overhead, marketing, or other indirect business expenses, which would need to be included in a full net profitability calculation.",
    },
  ],
};
