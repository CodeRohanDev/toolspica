import type { ToolContent } from "./types";

export const markupCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Selling Price From Cost + Markup %",
  overview: [
    "Setting a retail price often starts from a known cost and a target markup percentage — \"I want to mark this up by 50%\" — which is a genuinely different calculation direction than analyzing an existing price's profitability. This tool is built specifically for that forward direction: given a cost and a markup percentage, what should the selling price be.",
    "The calculation is straightforward but easy to fumble mentally for anything beyond round numbers: markup is calculated as a percentage of cost, not of the final price (that's margin, a related but different figure). A 50% markup on a $60 cost adds $30 (50% of $60) to reach a $90 selling price — this tool calculates that instantly for any cost and markup percentage.",
    "A second mode reverses the calculation: given a known cost and an existing selling price, what markup percentage does that represent? This is useful for checking an existing price against a target markup policy, or reverse-engineering the markup being applied on a product you're comparing against.",
    "Alongside whichever direction you're calculating, the tool also shows the resulting margin percentage — since margin and markup are different numbers for the same transaction, having both visible together helps avoid the common confusion between the two when discussing pricing with others who might be using either term.",
  ],
  howItWorks: [
    {
      title: "Choose your calculation direction",
      description: "Cost + markup % to find price, or cost + price to find the markup %.",
    },
    {
      title: "Enter your known values",
      description: "Fields adjust to match whichever direction you selected.",
    },
    {
      title: "View the result",
      description: "Selling price or markup %, plus profit and margin, calculated instantly.",
    },
  ],
  examples: [
    {
      label: "Price from cost and markup",
      input: "Cost $60, markup 50%",
      output: "Selling price: $90 (profit $30, margin 33.33%)",
    },
  ],
  faqs: [
    {
      question: "Why is markup different from margin for the same product?",
      answer:
        "Markup calculates profit as a percentage of cost, while margin calculates the same profit dollar amount as a percentage of the selling price. Since the selling price is always higher than cost on a profitable sale, dividing by the larger number (price) always produces a smaller percentage — which is why a 50% markup only equals a 33.33% margin, not 50%.",
    },
    {
      question: "How do I decide what markup percentage to use?",
      answer:
        "This varies significantly by industry and business model — retail, wholesale, and service businesses often have very different typical markup ranges. This tool calculates the resulting price for whatever markup percentage you choose; deciding the right target percentage is a business and industry-specific decision.",
    },
    {
      question: "Can I use this to check if my current pricing matches my markup policy?",
      answer:
        "Yes — use the \"cost + price → markup %\" mode to check what markup an existing price actually represents, useful for auditing pricing consistency across a product line or verifying a price matches a stated markup policy.",
    },
    {
      question: "Does markup account for taxes or other fees?",
      answer:
        "No — this calculates a straightforward markup on the direct cost you enter. Any taxes, payment processing fees, or other costs not included in your \"cost\" figure would need to be factored in separately or added to the cost input before calculating.",
    },
    {
      question: "What's a 100% markup equivalent to in margin terms?",
      answer:
        "A 100% markup means doubling the cost to set the price (a $50 cost becomes a $100 price), which works out to exactly a 50% margin — this is actually the one point where the relationship between the two is a clean, easy-to-remember ratio.",
    },
  ],
};
