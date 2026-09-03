import type { ToolContent } from "./types";

export const waistToHipRatioCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Waist-to-Hip Ratio & Health Risk Category",
  overview: [
    "Waist-to-hip ratio is a simple measurement — waist circumference divided by hip circumference — that reflects where body fat is distributed, which research has linked to cardiovascular health risk independently of overall weight or BMI. Fat stored around the waist (an \"apple\" body shape) is associated with different health risk patterns than fat stored around the hips (a \"pear\" shape), even at the same total body weight.",
    "The calculation itself is straightforward division, but the health context comes from comparing the resulting ratio against WHO (World Health Organization) reference thresholds, which differ between men and women reflecting typical differences in fat distribution patterns between the sexes. For men, a ratio below 0.90 is categorized as low risk, 0.90 to 0.99 as moderate, and 1.0 or above as high risk. For women, the thresholds are lower — below 0.80 is low risk, 0.80 to 0.84 is moderate, and 0.85 or above is high risk.",
    "This measurement is unit-independent as long as both waist and hip are measured in the same unit (both in centimeters, or both in inches) — the ratio itself is just a proportion, so it doesn't matter which unit system you use as long as it's consistent between the two measurements.",
    "Waist-to-hip ratio is one of several body composition metrics (alongside BMI and body fat percentage) that together give a fuller picture than any single number alone — it's particularly useful because unlike BMI, it captures something about fat distribution, not just total body mass relative to height.",
  ],
  howItWorks: [
    {
      title: "Select your sex",
      description: "Risk categories differ between men and women.",
    },
    {
      title: "Measure and enter waist and hip circumference",
      description: "Use the same unit for both measurements.",
    },
    {
      title: "View your ratio and risk category",
      description: "Compared against WHO reference thresholds.",
    },
  ],
  examples: [
    {
      label: "Male waist-to-hip ratio",
      input: "Waist 85 cm, hip 100 cm",
      output: "Ratio: 0.85 — Low risk",
    },
    {
      label: "Female waist-to-hip ratio",
      input: "Waist 75 cm, hip 95 cm",
      output: "Ratio: 0.79 — Low risk",
    },
  ],
  faqs: [
    {
      question: "Why do men and women have different risk thresholds for the same ratio?",
      answer:
        "Men and women naturally tend to store body fat differently on average — men more commonly around the abdomen, women more commonly around the hips — so the same absolute ratio doesn't carry the same health risk association for both sexes, which is why WHO reference thresholds are set differently for men and women.",
    },
    {
      question: "How should I measure waist and hip circumference correctly?",
      answer:
        "Measure waist circumference at the narrowest point of the torso (typically just above the belly button) and hip circumference at the widest point of the hips and buttocks, using a flexible tape measure kept snug but not compressing the skin, ideally while standing relaxed rather than holding in your stomach.",
    },
    {
      question: "Is waist-to-hip ratio better than BMI for assessing health risk?",
      answer:
        "They measure different things — BMI reflects overall weight relative to height, while waist-to-hip ratio reflects fat distribution pattern. Research suggests waist-to-hip ratio may be a better predictor of cardiovascular risk specifically, but both, along with other measures, give a more complete picture together than either alone.",
    },
    {
      question: "Can waist-to-hip ratio change without my weight changing?",
      answer:
        "Yes — fat distribution can shift due to factors like age, hormonal changes, and lifestyle changes even without any change in total body weight, which is exactly why this ratio provides different information than weight or BMI alone.",
    },
    {
      question: "Is a 'high risk' category a diagnosis?",
      answer:
        "No — this is a general population-level risk association based on WHO reference data, not an individual medical diagnosis. A high ratio is a signal worth discussing with a healthcare provider as part of a broader health assessment, not a standalone diagnosis of any specific condition.",
    },
  ],
};
