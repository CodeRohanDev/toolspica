import type { ToolContent } from "./types";

export const calorieCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Daily Calorie Needs for Weight Goals",
  overview: [
    "Total daily calorie needs — how much you actually burn in a day, including all activity, not just resting metabolism — is the number that matters for weight management, and it depends on combining your BMR (Basal Metabolic Rate) with an activity level multiplier that accounts for exercise, daily movement, and lifestyle.",
    "This tool calculates BMR using the Mifflin-St Jeor equation, then multiplies it by one of five standard activity level factors, ranging from sedentary (little to no exercise, multiplier 1.2) up to extremely active (intense daily training plus a physically demanding job, multiplier 1.9). The result is your estimated maintenance calories — the amount needed to keep your current weight stable.",
    "From that maintenance number, the tool also shows calorie targets for common weight goals: a 250 or 500 calorie daily deficit for mild or standard weight loss, and a 250 or 500 calorie daily surplus for mild or standard weight gain. A pound of body fat represents roughly 3,500 calories, which is why a 500-calorie daily deficit is commonly associated with roughly one pound of weight loss per week — though this is a simplified rule of thumb, not an exact guarantee for every individual.",
    "Choosing the right activity level honestly is the biggest source of error in this kind of calculation — most people tend to overestimate their actual activity level, which leads to an inflated calorie target. If weight isn't changing as the numbers here would predict over several weeks, that's a signal to reassess the activity level assumption or actual intake tracking accuracy, not necessarily a sign the formula itself is wrong.",
  ],
  howItWorks: [
    {
      title: "Enter your sex, age, height, and weight",
      description: "Used to calculate your BMR as the baseline.",
    },
    {
      title: "Select your activity level honestly",
      description: "This is the single biggest factor affecting accuracy.",
    },
    {
      title: "View maintenance calories and goal-based targets",
      description: "Mild and standard deficit or surplus targets shown alongside maintenance.",
    },
  ],
  examples: [
    {
      label: "Maintenance calories for a moderately active person",
      input: "Male, age 30, 175 cm, 70 kg, moderately active (×1.55)",
      output: "Maintenance: 2,556 calories/day",
    },
  ],
  faqs: [
    {
      question: "Why is choosing the right activity level so important?",
      answer:
        "The activity multiplier has a bigger effect on the final number than small differences in age or weight — most people tend to overestimate how active they really are, which inflates the calculated calorie target. Being honest about actual weekly exercise frequency and daily activity level (a desk job versus a physically active one) matters more than getting height or weight exactly precise.",
    },
    {
      question: "Why is a 500-calorie deficit associated with one pound of weight loss per week?",
      answer:
        "A pound of body fat represents roughly 3,500 calories, and 500 calories × 7 days = 3,500 — this is a commonly cited rule of thumb, though actual weight loss varies by individual due to metabolic adaptation, water weight fluctuations, and other factors, so it's a useful estimate rather than a precise guarantee.",
    },
    {
      question: "Should I eat exactly at my maintenance calories if I want to maintain my current weight?",
      answer:
        "This is a solid starting estimate, but actual maintenance calories can shift over time as your weight, activity level, and metabolism change — it's worth reassessing periodically and adjusting based on actual observed weight trends rather than treating the initial number as permanently fixed.",
    },
    {
      question: "Is a mild deficit or a standard deficit better for weight loss?",
      answer:
        "This depends on individual goals and preferences — a smaller (250-calorie) deficit is generally more sustainable and easier to maintain long-term with less impact on energy levels, while a larger (500-calorie) deficit produces faster results but can be harder to sustain and may increase muscle loss risk if not paired with adequate protein and resistance training.",
    },
    {
      question: "Should I consult a professional before making significant calorie changes?",
      answer:
        "For significant or sustained calorie deficits, underlying health conditions, or specific fitness goals, consulting a doctor or registered dietitian is worthwhile — this tool provides a general estimate for planning purposes, not personalized medical or nutritional advice.",
    },
  ],
};
