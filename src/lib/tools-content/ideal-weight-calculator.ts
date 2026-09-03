import type { ToolContent } from "./types";

export const idealWeightCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Ideal Weight Using 3 Medical Formulas",
  overview: [
    "\"Ideal weight\" formulas were originally developed decades ago for medical purposes — primarily for calculating drug dosages based on body size — not as a personal fitness or aesthetic target, which is an important distinction often lost in how these numbers get used and interpreted today. This tool calculates ideal weight using three of the most established formulas from medical literature, all based purely on height and sex.",
    "The Devine formula (1974), originally created for medication dosing calculations, is the most widely referenced and is shown as the primary result here. The Robinson formula (1983) and Hamwi formula (1964) are two other commonly cited variations, each derived from slightly different population data and producing slightly different results — showing all three together illustrates that \"ideal weight\" isn't a single precise number but a range depending on which reference formula is used.",
    "These formulas are based purely on height and sex — they don't account for muscle mass, bone density, frame size, or body composition at all, which is why a very muscular, athletic person will show as significantly \"overweight\" by these formulas despite having low body fat and being in excellent health. This is a known and significant limitation, not a flaw specific to any one formula.",
    "The practical value here is historical and reference context — understanding where these commonly cited numbers originally came from and what they were designed for — rather than treating any single result as a personalized target weight. A body composition measurement (like body fat percentage) combined with input from a healthcare provider gives a far more meaningful picture of healthy weight for a specific individual than these formulas alone.",
  ],
  howItWorks: [
    {
      title: "Select your sex",
      description: "Each formula uses a different constant for men and women.",
    },
    {
      title: "Enter your height",
      description: "The only other input these formulas require.",
    },
    {
      title: "View results from three formulas",
      description: "Devine, Robinson, and Hamwi, side by side for comparison.",
    },
  ],
  examples: [
    {
      label: "Male ideal weight",
      input: "Male, 175 cm",
      output: "Devine: 70.5 kg",
    },
    {
      label: "Female ideal weight",
      input: "Female, 165 cm",
      output: "Devine: 56.9 kg",
    },
  ],
  faqs: [
    {
      question: "Why were these formulas originally created?",
      answer:
        "The Devine formula, the most widely used of the three, was originally developed in 1974 specifically to help calculate appropriate medication dosages based on body size — not as a general fitness or aesthetic target, which is a common misunderstanding of what these formulas were designed to do.",
    },
    {
      question: "Why do the three formulas give different results for the same height?",
      answer:
        "Each formula was derived from a different research population and study, using slightly different statistical assumptions — there's no single universally agreed \"ideal weight\" formula, which is exactly why showing all three together illustrates that these are estimates within a range, not one precise number.",
    },
    {
      question: "Why would a muscular athlete show as 'overweight' by these formulas?",
      answer:
        "These formulas are based purely on height and sex, with no accounting for muscle mass or body composition at all — since muscle is denser than fat, a lean, muscular person naturally weighs more than these formulas suggest for their height, despite having low body fat and excellent health markers.",
    },
    {
      question: "Should I use this number as my actual weight-loss target?",
      answer:
        "Not directly — these are population-average, historically medical-dosing-oriented formulas, not personalized health targets. A healthcare provider considering your specific body composition, frame size, and health history can give far more meaningful, individualized weight guidance than any of these general formulas alone.",
    },
    {
      question: "Is BMI a better measure than these ideal weight formulas?",
      answer:
        "Both have similar limitations — neither BMI nor these ideal weight formulas account for body composition, so both can misclassify a muscular person as overweight. Body fat percentage, measured directly, is generally a more informative single number, though a full health assessment considers multiple factors together.",
    },
  ],
};
