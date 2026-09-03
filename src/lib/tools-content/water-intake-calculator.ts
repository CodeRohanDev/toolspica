import type { ToolContent } from "./types";

export const waterIntakeCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Recommended Daily Water Intake",
  overview: [
    "The old \"eight glasses a day\" guideline is a generic rule of thumb that doesn't account for the biggest factor in actual hydration needs: body size. A larger person has more body mass and generally needs more water than a smaller person, which is why a weight-based calculation gives a more personalized starting estimate than a flat, one-size-fits-all number.",
    "This tool uses a commonly cited baseline of roughly 35 milliliters of water per kilogram of body weight — a widely referenced general hydration guideline — then adds additional water for exercise, since physical activity increases fluid loss through sweat that needs replacing beyond the baseline amount.",
    "The exercise addition is calculated at roughly 350ml for every 30 minutes of activity, a reasonable general estimate for moderate-intensity exercise, though actual sweat loss varies significantly based on exercise intensity, individual sweat rate, and ambient temperature — someone training hard in hot weather loses considerably more fluid than someone doing light activity in a cool room.",
    "This is a general estimation tool, not personalized medical guidance — actual hydration needs vary with climate, altitude, overall health, certain medical conditions (including some that require fluid restriction), and pregnancy or breastfeeding status. For anyone with a specific medical condition affecting fluid needs, guidance from a doctor takes priority over a general calculator like this one.",
  ],
  howItWorks: [
    {
      title: "Enter your body weight",
      description: "The primary factor in the baseline calculation.",
    },
    {
      title: "Enter your daily exercise minutes",
      description: "Additional water is added to account for fluid lost through sweat.",
    },
    {
      title: "View your recommended daily intake",
      description: "Shown in liters, milliliters, and approximate glasses.",
    },
  ],
  examples: [
    {
      label: "Water intake with exercise",
      input: "70 kg body weight, 30 minutes of exercise",
      output: "2.8 L recommended (≈11 glasses)",
    },
  ],
  faqs: [
    {
      question: "Why isn't 'eight glasses a day' a good enough guideline?",
      answer:
        "Eight glasses (roughly 2 liters) is a rough average that doesn't scale with body size — a much larger or smaller person than the assumption behind that guideline has meaningfully different actual needs. A weight-based calculation, like the one this tool uses, gives a more personalized starting estimate.",
    },
    {
      question: "Does this account for water from food, not just drinking?",
      answer:
        "No — this estimates total fluid intake from beverages. In practice, food (especially fruits, vegetables, and soups) contributes a meaningful portion of total daily hydration too, so actual beverage intake needed might be somewhat lower than this figure if you eat a lot of water-rich foods.",
    },
    {
      question: "Does hot weather or altitude change how much water I need?",
      answer:
        "Yes — both increase fluid loss (through sweat in heat, and through increased respiration at altitude), meaning actual needs in those conditions are typically higher than this baseline estimate accounts for. Adjust intake upward in hot climates or at elevation, and pay attention to thirst and urine color as additional signals.",
    },
    {
      question: "Can drinking too much water be a problem?",
      answer:
        "Yes — while rare, drinking excessive amounts of water in a short period can lead to a dangerous condition called hyponatremia (diluted blood sodium levels), particularly relevant for endurance athletes. This calculator provides a general daily guideline, not a recommendation to force-drink water beyond what feels reasonable.",
    },
    {
      question: "Should I follow this exactly if I have a medical condition affecting fluid intake?",
      answer:
        "No — certain medical conditions (including some heart, kidney, and liver conditions) can require specific fluid restrictions or increased intake that override a general calculation like this one. Always follow guidance from your doctor if you have a condition affecting fluid balance.",
    },
  ],
};
