import type { ToolContent } from "./types";

export const discountCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Sale Price, Savings & Tax Instantly",
  overview: [
    "A storefront sign advertising \"30% off\" tells you the discount rate, but not the actual dollar amount you'll save or the final price you'll pay at checkout — and mental math on an odd original price (like 30% off $47.99) is easy to get wrong. This tool takes an original price and a discount percentage and instantly calculates the amount saved, the price after discount, and — with an optional sales tax rate — the true final price you'd actually pay.",
    "The order of operations here matters and matches how real checkouts work: the discount is applied to the original price first, and sales tax (where applicable) is calculated on the already-discounted price, not the original. Applying tax before the discount, or on the pre-discount price, would overstate what you actually owe — this tool follows the standard retail calculation order to keep the final number accurate.",
    "This is useful well beyond just \"is this a good deal\" curiosity at a single store. Comparing two different discounts (say, 25% off versus a flat amount off) on the same item is far easier once both are converted into an actual final price rather than compared as raw percentages. It's also useful for budgeting during a sale — quickly checking whether several discounted items together will fit within a spending limit, including tax.",
    "The tax field is entirely optional. Leaving it blank calculates just the discount math (amount saved and price after discount), which is all that's needed in regions or contexts where sales tax doesn't apply or isn't relevant to the comparison being made.",
  ],
  howItWorks: [
    {
      title: "Enter the original price",
      description: "The price before any discount is applied.",
    },
    {
      title: "Enter the discount percentage",
      description: "The advertised discount rate, e.g. 25 for 25% off.",
    },
    {
      title: "Optionally add a sales tax rate",
      description: "Applied to the discounted price, matching how checkout totals are usually calculated.",
    },
  ],
  examples: [
    {
      label: "Simple discount",
      input: "Original price 80, discount 25%",
      output: "Amount saved: 20 — Final price: 60",
    },
    {
      label: "Discount plus tax",
      input: "Original price 100, discount 20%, tax 8%",
      output: "Price after discount: 80 — Tax added: 6.40 — Final price: 86.40",
    },
  ],
  faqs: [
    {
      question: "Why is tax calculated on the discounted price, not the original price?",
      answer:
        "This matches how sales tax actually works at checkout in most jurisdictions — tax is charged on the amount you're actually being charged for the item, which is the price after the discount is subtracted, not the original sticker price.",
    },
    {
      question: "Can I use this to compare two different discounts on the same item?",
      answer:
        "Yes — run the calculation once for each discount option and compare the resulting final prices directly. This is more reliable than comparing raw percentages, especially when discounts are structured differently (a flat amount vs. a percentage).",
    },
    {
      question: "Does this handle a discount over 100%?",
      answer:
        "The calculation itself would produce a negative final price, which isn't a realistic real-world discount — a discount is always a percentage between 0 and 100 in practice, and the tool's output should be read with that assumption in mind.",
    },
    {
      question: "Is the sales tax field required?",
      answer:
        "No — leave it blank and the tool calculates just the discount amount and post-discount price, without adding any tax. It's there for when a full final-price calculation including tax is useful.",
    },
    {
      question: "Why doesn't the tool show a currency symbol?",
      answer:
        "The calculation is currency-agnostic — the numbers represent the same math regardless of whether you're working in dollars, euros, rupees, or any other currency, so the tool deliberately doesn't assume one.",
    },
  ],
};
