import type { ToolContent } from "./types";

export const depreciationCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Straight-Line or Declining Balance Depreciation",
  overview: [
    "Depreciation spreads the cost of a business asset — equipment, a vehicle, machinery — across its useful life, rather than expensing the full cost the moment it's purchased. This matters for accurate financial reporting and, in many jurisdictions, for tax purposes, since it reflects how the asset actually loses value and gets used up over time rather than all at once.",
    "This tool supports the two most common depreciation methods, and they produce genuinely different schedules. Straight-line depreciation spreads the depreciable amount (cost minus salvage value) evenly across every year of useful life — the simplest method, with the same dollar amount depreciated each year. Double-declining balance depreciation front-loads the expense, depreciating a fixed percentage of the remaining book value each year, which means larger deductions in the early years and progressively smaller ones later.",
    "The choice between methods reflects a real assumption about how the asset loses value: straight-line assumes even wear over time, appropriate for many general assets, while declining balance assumes an asset loses more of its value early on (common for equipment and vehicles that depreciate fastest right after purchase, matching how resale value often actually behaves).",
    "The full year-by-year schedule shows exactly how the book value declines under whichever method you choose, correctly stopping at the salvage value rather than depreciating below it — a detail that matters for the declining balance method especially, since its percentage-based calculation would otherwise overshoot the salvage floor in later years.",
  ],
  howItWorks: [
    {
      title: "Choose straight-line or declining balance",
      description: "Each produces a genuinely different depreciation schedule.",
    },
    {
      title: "Enter the asset cost, salvage value, and useful life",
      description: "Salvage value is the estimated worth at the end of its useful life.",
    },
    {
      title: "View the full year-by-year schedule",
      description: "Depreciation amount and remaining book value for every year.",
    },
  ],
  examples: [
    {
      label: "Straight-line depreciation",
      input: "$20,000 cost, $2,000 salvage, 5-year life",
      output: "$3,600 depreciated evenly each year",
    },
    {
      label: "Double-declining balance depreciation",
      input: "$20,000 cost, $2,000 salvage, 5-year life",
      output: "Year 1: $8,000 — Year 2: $4,800 — declining each year, floored at $2,000",
    },
  ],
  faqs: [
    {
      question: "Which depreciation method should I use?",
      answer:
        "Straight-line is simpler and assumes even value loss over time, appropriate for many general assets. Declining balance front-loads the expense, better matching assets that lose value fastest early on, like vehicles and some equipment. Check your specific accounting standards or tax jurisdiction's rules, since some require or restrict certain methods for certain asset types.",
    },
    {
      question: "What is salvage value?",
      answer:
        "Salvage value (also called residual value) is the estimated worth of the asset at the end of its useful life — what you could sell it for once it's fully depreciated. It's subtracted from the cost before calculating straight-line depreciation, and it acts as a floor the declining balance method won't depreciate below.",
    },
    {
      question: "Why does double-declining balance depreciation shrink every year?",
      answer:
        "The method applies a fixed percentage rate to the remaining book value each year, not the original cost — since the book value itself shrinks every year, the same percentage produces a progressively smaller dollar amount, which is exactly the front-loaded pattern the method is designed to produce.",
    },
    {
      question: "Does this match how tax depreciation actually works?",
      answer:
        "This shows standard straight-line and declining balance methods used broadly in accounting, but actual tax depreciation rules (like MACRS in the US) often use specific prescribed schedules and conventions that differ from these general accounting methods — check with a tax professional for depreciation used specifically for tax filing.",
    },
    {
      question: "What happens if I set the salvage value to zero?",
      answer:
        "With a zero salvage value, straight-line depreciation spreads the full asset cost evenly across its useful life, and declining balance continues to depreciate toward zero rather than stopping at some remaining floor value — both are valid, common scenarios for assets with no meaningful resale value.",
    },
  ],
};
