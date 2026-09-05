import type { ToolContent } from "./types";

export const tripBudgetCalculatorContent: ToolContent = {
  heroSubtitle: "Plan and Total Your Trip Budget by Category",
  overview: [
    "Estimating a trip's total cost means adding up several very different kinds of expenses — a one-time flight cost per traveler, and daily costs like lodging, food, and activities that scale with both trip length and number of travelers — a calculation that's easy to get wrong if you don't separate the per-trip and per-day categories correctly.",
    "This calculator lets you enter your trip length and number of travelers once, then set per-person costs for flights (a one-time cost) and per-person, per-day estimates for lodging, food, local transport, activities, shopping, and a miscellaneous buffer — automatically scaling each category by the right multiplier.",
    "The result shows your total trip budget, cost per person, and average cost per day across all travelers, making it easy to compare different budget scenarios — a budget backpacking trip versus a comfortable one — before you actually book anything.",
  ],
  howItWorks: [
    { title: "Enter trip length and travelers", description: "Input how many days the trip is and how many people are going." },
    { title: "Set per-category costs", description: "Enter your estimated spending for flights, lodging, food, and other categories." },
    { title: "Read your total budget", description: "See total cost, cost per person, and cost per day instantly." },
  ],
  examples: [
    {
      label: "7-day trip, 2 travelers",
      input: "Days: 7, Travelers: 2, standard default costs",
      output: "Total budget: ≈ $6,065, per person: ≈ $3,033",
    },
  ],
  faqs: [
    {
      question: "Why is flight cost treated differently from other categories?",
      answer: "Flights are typically a one-time cost per traveler regardless of trip length, while lodging, food, and activities are ongoing costs that accumulate each day of the trip — so they need separate scaling logic.",
    },
    {
      question: "Should I include a buffer for unexpected expenses?",
      answer: "Yes — the miscellaneous/buffer category is meant for exactly that. A common rule of thumb is to budget an extra 10-15% beyond your planned expenses for unexpected costs.",
    },
    {
      question: "Can I use this for a solo trip?",
      answer: "Yes — just set travelers to 1 and the per-person costs will apply directly without splitting.",
    },
    {
      question: "Is my trip budget data saved anywhere?",
      answer: "No — all totals are calculated locally in your browser as you type, and nothing is stored or transmitted.",
    },
  ],
};
