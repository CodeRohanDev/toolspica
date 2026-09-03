import type { ToolContent } from "./types";

export const bmrCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Basal Metabolic Rate (BMR)",
  overview: [
    "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to keep essential functions running — breathing, circulation, cell production, brain and organ function — with no physical activity factored in at all. It represents the floor of your daily calorie burn, not your total daily energy expenditure.",
    "This tool calculates BMR using the Mifflin-St Jeor equation, widely regarded in nutrition science as more accurate than older formulas like Harris-Benedict for most people, particularly at higher body weights. The equation uses weight, height, age, and biological sex — sex is included because, on average, men carry more lean muscle mass than women at the same weight, and muscle burns more calories at rest than fat tissue does.",
    "BMR alone isn't the number to use for calorie planning — it deliberately excludes all activity, digestion, and movement, which together typically account for a substantial share of total daily calorie burn for most people. That's why this tool also shows BMR multiplied by common activity level factors, giving a rough range of total daily calories at different activity levels, though the dedicated Calorie Calculator tool provides a more complete, adjustable version of that full calculation.",
    "Understanding your BMR is useful context for any calorie-related goal — weight loss, maintenance, or gain — since it represents the baseline your body needs regardless of activity, and any total calorie target should be built on top of it, not confused with it.",
  ],
  howItWorks: [
    {
      title: "Select your sex and enter age, height, and weight",
      description: "Metric or imperial units, whichever you prefer.",
    },
    {
      title: "View your BMR",
      description: "Calories burned per day at complete rest.",
    },
    {
      title: "See activity-level estimates",
      description: "BMR scaled by common activity multipliers for context.",
    },
  ],
  examples: [
    {
      label: "Male BMR calculation",
      input: "Male, age 30, 175 cm, 70 kg",
      output: "BMR: 1,649 calories/day",
    },
    {
      label: "Female BMR calculation",
      input: "Female, age 30, 165 cm, 60 kg",
      output: "BMR: 1,320 calories/day",
    },
  ],
  faqs: [
    {
      question: "Why does BMR differ between men and women at the same height and weight?",
      answer:
        "On average, men carry more lean muscle mass than women at an equivalent height and weight, and muscle tissue burns more calories at rest than fat tissue does — the Mifflin-St Jeor equation accounts for this with a different constant for each sex, based on population averages.",
    },
    {
      question: "Is BMR the number of calories I should eat per day?",
      answer:
        "No — BMR represents calories burned at complete rest with zero activity, which underestimates real daily needs for almost everyone. Total daily calorie needs (BMR plus activity) is a higher number, which the Calorie Calculator tool calculates directly.",
    },
    {
      question: "Why does this use Mifflin-St Jeor instead of the older Harris-Benedict equation?",
      answer:
        "Multiple validation studies have found Mifflin-St Jeor to be more accurate than Harris-Benedict for the general population, particularly for individuals who are overweight or obese, which is why most modern nutrition guidance has shifted to recommending it as the standard equation.",
    },
    {
      question: "Does BMR change as I lose or gain weight?",
      answer:
        "Yes — since BMR is calculated from current weight and height, it recalculates to a different value as your weight changes, generally decreasing somewhat as weight decreases (since there's less body mass to maintain) and increasing as weight increases.",
    },
    {
      question: "Is this calculation exact for every individual?",
      answer:
        "No — it's a population-average formula, accurate for most people but not perfectly individualized. Actual BMR varies based on genetics, muscle mass, hormonal factors, and other individual variables that a height/weight/age formula can't fully capture — indirect calorimetry testing is the clinical gold standard for a precise individual measurement.",
    },
  ],
};
