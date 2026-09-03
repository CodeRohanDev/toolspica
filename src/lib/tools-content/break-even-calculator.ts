import type { ToolContent } from "./types";

export const breakEvenCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate How Many Units You Need to Sell to Break Even",
  overview: [
    "The break-even point is the exact number of units a business needs to sell before it starts making a profit — below that number, total costs still exceed total revenue, and above it, every additional unit sold contributes pure profit. Knowing this number precisely, rather than a rough guess, is foundational to pricing decisions, budgeting, and evaluating whether a new product or business idea is financially viable at all.",
    "This tool uses the standard break-even formula: fixed costs divided by the contribution margin per unit, where contribution margin is the selling price per unit minus the variable cost per unit. Fixed costs are expenses that don't change with production volume (rent, salaries, insurance), while variable costs scale directly with each unit produced (materials, per-unit labor, packaging).",
    "The contribution margin is the real engine of this calculation — it represents how much of each unit's sale price is left over after covering that unit's own variable cost, available to go toward paying off the fixed costs first, then toward profit once fixed costs are fully covered. A thin contribution margin means needing to sell a lot of units just to break even; a healthy margin means reaching profitability with far fewer sales.",
    "Beyond the break-even unit count, the tool shows the break-even revenue (units × price) — useful for comparing against a sales target or forecast — and the contribution margin per unit itself, which is worth watching independently since even small changes in price or variable cost can shift the break-even point substantially.",
  ],
  howItWorks: [
    {
      title: "Enter your fixed costs",
      description: "Total costs that don't change with how many units you sell.",
    },
    {
      title: "Enter variable cost and price per unit",
      description: "The cost to produce each unit, and what you sell it for.",
    },
    {
      title: "View your break-even point",
      description: "The exact number of units, and the revenue that represents.",
    },
  ],
  examples: [
    {
      label: "Break-even calculation",
      input: "Fixed costs $10,000, variable cost $15/unit, price $25/unit",
      output: "Break-even: 1,000 units ($25,000 in revenue)",
    },
  ],
  faqs: [
    {
      question: "What's the difference between fixed costs and variable costs?",
      answer:
        "Fixed costs stay the same regardless of how many units you sell — rent, insurance, salaried staff. Variable costs scale directly with production volume — raw materials, per-unit shipping, hourly labor tied to output. Getting this classification right for your specific business is essential for an accurate break-even calculation.",
    },
    {
      question: "What happens if the price per unit is lower than the variable cost per unit?",
      answer:
        "You'd be losing money on every single unit sold, before fixed costs are even considered — there's no number of units that would let you break even, since each additional sale makes the loss worse, not better. The tool flags this situation clearly rather than showing a misleading result.",
    },
    {
      question: "Why does a small change in price have such a big effect on the break-even point?",
      answer:
        "Price directly affects the contribution margin, which is the denominator in the break-even formula — a small price increase widens the contribution margin proportionally more than it might seem, meaningfully lowering the number of units needed to break even, and vice versa for a price decrease.",
    },
    {
      question: "Does the break-even point account for taxes?",
      answer:
        "No — this is a pre-tax break-even calculation based purely on fixed costs, variable costs, and price. Taxes would apply to profit after the break-even point is exceeded, but don't factor into the break-even calculation itself.",
    },
    {
      question: "Is reaching the break-even point the same as being profitable?",
      answer:
        "Reaching exactly the break-even point means revenue exactly equals total costs — zero profit, zero loss. Genuine profitability starts with the very next unit sold beyond that point, since fixed costs are now fully covered and each additional unit's contribution margin becomes pure profit.",
    },
  ],
};
