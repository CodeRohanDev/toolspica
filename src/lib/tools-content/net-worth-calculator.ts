import type { ToolContent } from "./types";

export const netWorthCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Net Worth From Assets & Liabilities",
  overview: [
    "Net worth is the single clearest snapshot of overall financial position — everything you own minus everything you owe, at a specific point in time. It's a more complete picture than income alone, since two people earning the same salary can have wildly different net worth depending on savings, debt, and accumulated assets.",
    "This tool lets you list out assets (cash and savings, investments, retirement accounts, property, vehicles, or anything else of value) and liabilities (credit card debt, loans, mortgages, or anything else owed) as separate line items, add as many of each as your actual financial picture requires, and calculates the total automatically: total assets minus total liabilities equals net worth.",
    "Breaking net worth into individual line items rather than just entering two lump-sum totals is genuinely useful — it forces a complete accounting of what actually counts, and makes it easy to update just one figure (like a fluctuating investment balance) without recalculating everything else by hand.",
    "Tracking net worth over time — recalculating it every few months or annually with updated figures — is one of the most commonly recommended personal finance habits, since it captures the combined effect of saving, debt paydown, and investment growth (or decline) in a single number, rather than tracking each of those separately.",
  ],
  howItWorks: [
    {
      title: "List your assets",
      description: "Cash, investments, property, and anything else of value — add as many rows as needed.",
    },
    {
      title: "List your liabilities",
      description: "Credit card debt, loans, and anything else you owe.",
    },
    {
      title: "View your net worth",
      description: "Total assets minus total liabilities, calculated instantly.",
    },
  ],
  examples: [
    {
      label: "Simple net worth calculation",
      input: "Assets: $15,000 cash + $40,000 investments. Liabilities: $3,000 credit card + $12,000 loan",
      output: "Net worth: $40,000 ($55,000 assets − $15,000 liabilities)",
    },
  ],
  faqs: [
    {
      question: "What counts as an asset?",
      answer:
        "Anything with real monetary value you own — cash and savings account balances, investment and retirement account balances, the equity value of property or vehicles, and any other item with genuine resale or cash value. Personal items without meaningful resale value (furniture, clothing) are typically excluded from a net worth calculation.",
    },
    {
      question: "Should I include my home's full value or just my equity?",
      answer:
        "If you list your home's full market value as an asset, you should also list the remaining mortgage balance as a liability — the two together correctly net out to your actual home equity. Listing only one side would overstate or understate your true net worth.",
    },
    {
      question: "Can net worth be negative?",
      answer:
        "Yes — if total liabilities exceed total assets, net worth is negative, which is common early in life (particularly with student loans or a recent home purchase) and isn't inherently a sign of poor financial health on its own, especially if assets are actively growing.",
    },
    {
      question: "How often should I recalculate my net worth?",
      answer:
        "Many people find quarterly or annual recalculation useful for tracking meaningful trends over time without over-focusing on short-term market fluctuations in investment account values, which can swing net worth up or down without reflecting any real change in saving or spending behavior.",
    },
    {
      question: "Is my financial data saved anywhere when I use this tool?",
      answer:
        "No — everything you enter stays in your browser for the current session only and is never sent to or stored on any server, which matters given how sensitive this kind of financial detail is.",
    },
  ],
};
