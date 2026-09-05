import type { ToolContent } from "./types";

export const billSplitCalculatorContent: ToolContent = {
  heroSubtitle: "Split a Bill Evenly or by What Each Person Ordered",
  overview: [
    "Splitting a restaurant bill fairly gets complicated the moment tip is involved and people ordered different amounts — dividing the total evenly is easy but unfair if one person ordered a $40 steak and another had a $10 salad, while splitting by individual subtotals with tip proportionally allocated requires more careful math.",
    "This calculator supports both approaches: an even split, where the bill plus tip is divided equally among everyone, and a proportional split, where you enter each person's individual subtotal and the tool allocates the tip and total proportionally based on how much each person actually ordered.",
    "Add or remove people as needed, name each person, and see their exact share update instantly as you adjust the bill total, tip percentage, or individual subtotals — no more doing this math on a napkin at the table.",
  ],
  howItWorks: [
    { title: "Enter the bill total and tip", description: "Input the pre-tip bill amount and your chosen tip percentage." },
    { title: "Choose a split method", description: "Pick even split, or split by what each person ordered." },
    { title: "Read each person's share", description: "See the exact amount each person owes, including their share of the tip." },
  ],
  examples: [
    {
      label: "$100 bill, 15% tip, split evenly between 2 people",
      input: "Bill: $100, Tip: 15%, People: 2, Split: Even",
      output: "Each person owes $57.50",
    },
  ],
  faqs: [
    {
      question: "How does the proportional split work?",
      answer: "Each person's share of the grand total (bill plus tip) is calculated based on what percentage of the total subtotal they individually ordered — so someone who ordered 40% of the food pays 40% of the total including tip.",
    },
    {
      question: "Can I split a bill among more than a few people?",
      answer: "Yes — you can add as many people as needed using the 'Add person' button, and each person's share recalculates automatically.",
    },
    {
      question: "Does this handle tax separately from tip?",
      answer: "No — this treats the bill total as the amount tip is calculated on. If your bill already includes tax, the tip percentage will apply to that combined amount, which is common practice at many restaurants.",
    },
    {
      question: "Is my bill information shared with anyone?",
      answer: "No — all calculations happen locally in your browser. Nothing about your bill or the people splitting it is sent anywhere.",
    },
  ],
};
