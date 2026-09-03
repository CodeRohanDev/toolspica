import type { ToolContent } from "./types";

export const stepsToCaloriesCalculatorContent: ToolContent = {
  heroSubtitle: "Convert Step Count Into Estimated Calories Burned",
  overview: [
    "A fitness tracker or phone reliably counts steps, but converting that count into calories burned requires factoring in body weight — a heavier person burns more calories covering the same number of steps than a lighter person does, since moving more body mass takes more energy. This tool estimates calories burned from step count and body weight together.",
    "The estimate is based on an average stride length and typical walking-pace energy expenditure — roughly 0.0005 calories burned per step per kilogram of body weight, a commonly cited approximation that produces results in the same general range as most consumer fitness trackers' step-based calorie estimates.",
    "Alongside calories, the tool estimates the distance covered, based on an average adult stride length of roughly 0.76 meters per step — useful context alongside the calorie figure, since \"10,000 steps\" is more meaningful once you can see it represents roughly 7-8 kilometers of walking.",
    "This is a general estimate, not a precise individual measurement — actual calorie burn varies with walking pace (a brisk walk burns meaningfully more than a slow stroll for the same step count), terrain (uphill walking burns more), individual stride length, and metabolic differences between people. A dedicated fitness tracker with heart rate monitoring generally provides a more personalized estimate than a step-count-only formula.",
  ],
  howItWorks: [
    {
      title: "Enter your step count",
      description: "From a fitness tracker, phone pedometer, or manual count.",
    },
    {
      title: "Enter your body weight",
      description: "Heavier body weight means more calories burned per step.",
    },
    {
      title: "View estimated calories and distance",
      description: "Both calculated from average stride length and walking energy expenditure.",
    },
  ],
  examples: [
    {
      label: "Steps to calories estimate",
      input: "10,000 steps, 70 kg body weight",
      output: "≈350 calories burned (≈7.6 km walked)",
    },
  ],
  faqs: [
    {
      question: "Why does body weight affect calories burned for the same number of steps?",
      answer:
        "Moving a heavier body mass over the same distance requires more energy than moving a lighter one, so at the same step count and pace, a person with higher body weight burns more calories than a person with lower body weight covering the identical distance.",
    },
    {
      question: "Does walking pace change how many calories I burn per step?",
      answer:
        "Yes, meaningfully — a brisk walk burns noticeably more calories per step than a slow, leisurely stroll, since faster movement requires more energy expenditure. This calculator uses an average walking-pace assumption, so a much faster or slower pace would shift actual calories burned up or down from this estimate.",
    },
    {
      question: "How accurate is the stride length assumption?",
      answer:
        "0.76 meters per step is a reasonable average for adults, but actual stride length varies with height, leg length, and walking style — a taller person with longer legs typically covers more distance per step than this average assumes, and vice versa for a shorter person.",
    },
    {
      question: "Is this as accurate as a fitness tracker's calorie estimate?",
      answer:
        "A dedicated fitness tracker, especially one with heart rate monitoring, generally provides a more personalized and accurate estimate since it can account for actual pace and physiological response, not just a step count and body weight formula. This tool is useful for a quick general estimate without needing tracker data.",
    },
    {
      question: "Does this account for running instead of walking?",
      answer:
        "No — this formula is calibrated for typical walking-pace energy expenditure. Running burns significantly more calories per step (and covers considerably more distance per step) than walking, so this estimate would understate calories burned for a run.",
    },
  ],
};
