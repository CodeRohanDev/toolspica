import type { ToolContent } from "./types";

export const standardDeviationCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Sample or Population Standard Deviation",
  overview: [
    "Standard deviation measures how spread out a set of numbers is around its average — a small standard deviation means the values cluster tightly around the mean, while a large one means they're scattered widely. It's one of the most commonly used statistics for understanding variability, whether that's test scores, measurements, financial returns, or any dataset where consistency matters as much as the average itself.",
    "This tool calculates standard deviation with a genuinely important distinction most calculators get wrong or skip entirely: sample standard deviation versus population standard deviation. Population standard deviation divides the sum of squared differences by the total count (n), used when your data represents the entire group you care about. Sample standard deviation divides by one less than the count (n − 1), used when your data is a sample drawn from a larger population you're trying to make inferences about — this correction (called Bessel's correction) compensates for the fact that a sample tends to slightly underestimate the true population variability.",
    "Choosing the wrong one produces a subtly wrong answer that looks plausible, which is why this tool makes the choice explicit rather than silently picking one. In practice, sample standard deviation is the more commonly needed calculation — most real-world data collection (survey responses, a batch of test scores, a set of measurements) represents a sample rather than a complete population, but the choice genuinely depends on what your specific dataset represents.",
    "Alongside the standard deviation itself, the tool shows the underlying mean and variance (standard deviation squared) — variance is the value actually used in many statistical formulas and tests, while standard deviation is more interpretable since it's in the same units as the original data.",
  ],
  howItWorks: [
    {
      title: "Enter your numbers",
      description: "Separated by commas, spaces, or line breaks.",
    },
    {
      title: "Choose sample or population",
      description: "Sample if your data is drawn from a larger group; population if it's the complete dataset.",
    },
    {
      title: "View the result",
      description: "Standard deviation, variance, and mean are calculated instantly.",
    },
  ],
  examples: [
    {
      label: "Sample standard deviation",
      input: "4, 8, 6, 5, 3, 8 (sample)",
      output: "Mean: 5.6667 — Std dev: 2.0656",
    },
    {
      label: "Population standard deviation",
      input: "4, 8, 6, 5, 3, 8 (population)",
      output: "Mean: 5.6667 — Std dev: 1.8856",
    },
  ],
  faqs: [
    {
      question: "Should I use sample or population standard deviation?",
      answer:
        "Use population standard deviation only when your data represents every member of the group you're analyzing — a full dataset, not a subset. Use sample standard deviation when your numbers are a sample drawn from a larger population you're trying to draw conclusions about, which is the more common case in most real-world data analysis.",
    },
    {
      question: "Why does sample standard deviation divide by n − 1 instead of n?",
      answer:
        "This is called Bessel's correction — dividing by n − 1 instead of n compensates for the fact that a sample's mean is calculated from the same data being measured, which tends to slightly underestimate the true variability of the full population the sample came from. The correction produces a slightly larger, more accurate estimate.",
    },
    {
      question: "What's the difference between variance and standard deviation?",
      answer:
        "Variance is the average of the squared differences from the mean, while standard deviation is the square root of variance. Standard deviation is more interpretable because it's expressed in the same units as the original data, while variance is in squared units.",
    },
    {
      question: "Why is sample standard deviation always slightly larger than population standard deviation for the same data?",
      answer:
        "Because sample standard deviation divides by a smaller number (n − 1 instead of n), the result is always slightly larger for the same dataset — the difference shrinks as the sample size grows, since the difference between n and n − 1 becomes proportionally smaller.",
    },
    {
      question: "Can I calculate standard deviation with just one number?",
      answer:
        "Population standard deviation of a single value is technically 0 (no variability). Sample standard deviation requires at least 2 values, since dividing by n − 1 with only one data point would mean dividing by zero, which is undefined.",
    },
  ],
};
