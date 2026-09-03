import type { ToolContent } from "./types";

export const percentageChangeCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Percentage Increase or Decrease",
  overview: [
    "Percentage change measures how much a value has grown or shrunk relative to its starting point — a $10 increase means something very different depending on whether the original value was $20 or $2,000, which is exactly why percentage change (not just the raw difference) is the meaningful way to compare growth or decline.",
    "This tool calculates percentage change using the standard formula: ((new value − original value) / original value) × 100. A positive result means an increase, a negative result means a decrease, and the calculation correctly handles negative original values by dividing by the absolute value, keeping the sign meaningful.",
    "Percentage change shows up constantly in everyday and professional contexts: tracking price changes, measuring revenue or population growth, comparing performance metrics over time, and calculating investment returns. Getting the direction (increase vs. decrease) and magnitude right matters for any decision based on the result.",
    "This is useful for calculating price increases or discounts, tracking business metrics like revenue or user growth between two periods, comparing before-and-after measurements in any context, and checking percentage change calculations done manually.",
  ],
  howItWorks: [
    {
      title: "Enter the original value",
      description: "The starting point you're measuring change from.",
    },
    {
      title: "Enter the new value",
      description: "The value after the change occurred.",
    },
    {
      title: "See the percentage change",
      description: "Positive for an increase, negative for a decrease.",
    },
  ],
  examples: [
    {
      label: "Calculating a price increase",
      input: "Original: $80, New: $100",
      output: "+25% increase",
    },
    {
      label: "Calculating a decline",
      input: "Original: 500, New: 350",
      output: "-30% decrease",
    },
  ],
  faqs: [
    {
      question: "Why isn't percentage change symmetric — why doesn't going up 25% and back down 25% return to the original value?",
      answer:
        "Because each percentage change is calculated relative to a different base value. Going from 80 to 100 is a 25% increase, but going from 100 back to 80 is only a 20% decrease — the base value (100 vs. 80) changed, so the same percentage doesn't apply symmetrically in both directions.",
    },
    {
      question: "What does a percentage change of exactly -100% mean?",
      answer:
        "It means the new value is exactly zero — a complete loss of the original value. Percentage change can go below -100% only in specific contexts (like a value becoming negative), which the standard formula handles but is worth double-checking makes sense for your specific situation.",
    },
    {
      question: "Why divide by the absolute value of the original number?",
      answer:
        "This keeps the sign of the result meaningful specifically when the original value is negative — dividing by the raw (possibly negative) original value could flip the sign in a confusing way, while using the absolute value ensures a genuine increase always shows as positive and a genuine decrease always shows as negative.",
    },
    {
      question: "Is percentage change the same as percentage points?",
      answer:
        "No, and this is a common mix-up — going from a 10% rate to a 15% rate is a 5 percentage point increase, but it's a 50% relative percentage increase (since 5 is 50% of the original 10). This tool calculates relative percentage change, not the difference in percentage points.",
    },
    {
      question: "Can I use this for calculating a discount?",
      answer:
        "Yes — enter the original price as the original value and the discounted price as the new value; the result will show as a negative percentage representing the discount rate.",
    },
  ],
};
