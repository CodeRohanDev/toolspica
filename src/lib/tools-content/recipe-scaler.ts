import type { ToolContent } from "./types";

export const recipeScalerContent: ToolContent = {
  heroSubtitle: "Scale Any Recipe Up or Down to a New Serving Size",
  overview: [
    "Doubling a recipe for a dinner party, or halving one to cook for just yourself, means multiplying every single ingredient quantity by the same scaling factor — a tedious and error-prone task when a recipe has a dozen ingredients, especially once fractions like 1/2 or 3/4 cup get involved.",
    "This tool takes your original recipe's serving count and your target serving count to compute a scaling factor, then applies that factor to every line of your pasted ingredient list — recognizing whole numbers, decimals, and simple fractions at the start of each line and leaving the rest of the text (the ingredient name and any notes) untouched.",
    "Just paste your ingredient list one item per line with the quantity first, adjust the serving counts, and get back a fully scaled version instantly, ready to copy into your own notes or cooking app.",
  ],
  howItWorks: [
    { title: "Enter serving counts", description: "Input the recipe's original serving size and your target serving size." },
    { title: "Paste your ingredients", description: "Enter one ingredient per line, with the quantity at the start of the line." },
    { title: "Copy the scaled recipe", description: "Every quantity is multiplied by the scaling factor automatically." },
  ],
  examples: [
    {
      label: "Scaling a 4-serving recipe to 8 servings",
      input: "2 cups flour (scale from 4 to 8 servings)",
      output: "4 cups flour",
    },
  ],
  faqs: [
    {
      question: "What quantity formats are supported?",
      answer: "Whole numbers (2), decimals (1.5), and simple fractions (1/2, 3/4) at the very start of each ingredient line. Mixed numbers like '1 1/2' or ranges like '2-3' aren't recognized and will be left unscaled.",
    },
    {
      question: "Does it round the scaled quantities?",
      answer: "Results are shown to two decimal places when not a whole number, trimming trailing zeros — so 0.6666 becomes 0.67, and exact halves and quarters display cleanly.",
    },
    {
      question: "Can I scale non-cooking measurements too?",
      answer: "Yes — since it just multiplies the leading number on each line, it works for any list of quantities, not only food ingredients.",
    },
    {
      question: "Is my recipe uploaded anywhere?",
      answer: "No — the scaling happens entirely in your browser using text parsing and arithmetic. Your recipe text never leaves your device.",
    },
  ],
};
