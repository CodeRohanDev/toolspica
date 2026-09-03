import type { ToolContent } from "./types";

export const macroCalculatorContent: ToolContent = {
  heroSubtitle: "Convert Calorie Targets Into Protein, Carbs & Fat Grams",
  overview: [
    "A total daily calorie target alone doesn't say anything about diet composition — the same calorie number can be hit with wildly different ratios of protein, carbohydrates, and fat, and that ratio matters for goals like muscle retention during weight loss, athletic performance, or personal dietary preference. This tool converts a calorie target and a macro percentage split into actual grams to track.",
    "The conversion uses the standard calorie values for each macronutrient: protein and carbohydrates both provide 4 calories per gram, while fat provides 9 calories per gram — nearly double. This is why a 30% fat allocation translates to fewer grams than a 30% protein or carb allocation at the same calorie percentage, since each gram of fat carries more than twice the caloric weight.",
    "Three common presets are included as starting points: Balanced (30% protein / 40% carbs / 30% fat), Low-carb (40% protein / 20% carbs / 40% fat), and High-protein (40% protein / 30% carbs / 30% fat) — though any custom percentage split can be entered directly, and the tool normalizes automatically even if the three percentages don't sum to exactly 100.",
    "This is useful for anyone following a specific macro-based diet approach (common in bodybuilding, athletic performance nutrition, and popular diet plans like low-carb or high-protein approaches), translating a nutritionist or coach's percentage recommendation into an actual daily gram target, or simply understanding what a given calorie and macro split actually looks like in food terms.",
  ],
  howItWorks: [
    {
      title: "Enter your daily calorie target",
      description: "From a calorie calculator or your own target.",
    },
    {
      title: "Choose a preset or set custom percentages",
      description: "Protein, carbs, and fat as a percentage of total calories.",
    },
    {
      title: "View your gram targets",
      description: "Converted using each macronutrient's actual calories per gram.",
    },
  ],
  examples: [
    {
      label: "Balanced macro split",
      input: "2,200 calories, 30% protein / 40% carbs / 30% fat",
      output: "Protein: 165g — Carbs: 220g — Fat: 73g",
    },
  ],
  faqs: [
    {
      question: "Why does fat get fewer grams than protein or carbs at the same percentage?",
      answer:
        "Fat provides 9 calories per gram, more than double protein and carbs' 4 calories per gram — so the same calorie allocation (say, 30% of total calories) converts to noticeably fewer grams of fat than the equivalent percentage of protein or carbs.",
    },
    {
      question: "What macro split should I use?",
      answer:
        "This depends heavily on individual goals, activity level, and personal preference — there's no single universally correct split. The presets here reflect commonly referenced starting points, but a registered dietitian or sports nutritionist can provide guidance tailored to specific goals like muscle building, endurance performance, or medical dietary needs.",
    },
    {
      question: "Does this account for fiber or other nutritional details?",
      answer:
        "No — this calculates only the three macronutrients (protein, carbs, fat) from a calorie and percentage target. It doesn't break down fiber, sugar, micronutrients, or other nutritional details that a full diet plan would typically also track.",
    },
    {
      question: "What happens if my percentages don't add up to 100%?",
      answer:
        "The tool normalizes automatically, calculating each macro's share relative to the total percentage entered rather than requiring an exact 100% sum — useful if you're experimenting with different ratios without needing to manually rebalance every time.",
    },
    {
      question: "Should I use this if I have a medical condition requiring specific dietary macros?",
      answer:
        "No — for a medically prescribed diet (like for diabetes management or a specific health condition), always follow the specific guidance from your doctor or dietitian rather than a general macro split calculator like this one.",
    },
  ],
};
