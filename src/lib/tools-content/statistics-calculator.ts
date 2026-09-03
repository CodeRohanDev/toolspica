import type { ToolContent } from "./types";

export const statisticsCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Mean, Median, Mode & More Instantly",
  overview: [
    "Mean, median, and mode are the three most common measures of \"central tendency\" — different ways of describing what a typical or central value looks like in a set of numbers — and each tells a genuinely different story about the same dataset. Calculating all three by hand for anything beyond a handful of numbers is slow and error-prone, especially finding the median (which requires sorting first) or the mode (which requires counting every value's frequency).",
    "This tool accepts any list of numbers — separated by commas, spaces, or line breaks, pasted directly from a spreadsheet or typed manually — and instantly calculates the mean (the sum divided by the count, what most people mean by \"average\"), the median (the middle value once sorted, or the average of the two middle values for an even-sized list), and the mode (the most frequently occurring value or values, with multiple modes shown if there's a tie).",
    "Why all three matter: the mean is sensitive to extreme outliers (a single very large or very small value can pull it noticeably), while the median is more resistant to outliers and often better represents a \"typical\" value in skewed data (like household income, where the mean is often much higher than the median due to a small number of very high earners). The mode is uniquely useful for identifying the single most common value, which the mean and median don't capture at all.",
    "Beyond the three central tendency measures, the tool also shows count, sum, minimum, maximum, and range (max minus min) — a complete quick statistical summary useful for a classroom assignment, a quick data quality check, or getting oriented in a new dataset before deeper analysis.",
  ],
  howItWorks: [
    {
      title: "Enter your numbers",
      description: "Separated by commas, spaces, or line breaks — any format works.",
    },
    {
      title: "View the full statistical summary",
      description: "Mean, median, mode, count, sum, min, max, and range calculated instantly.",
    },
    {
      title: "Edit and recalculate freely",
      description: "Results update live as you add, remove, or change numbers.",
    },
  ],
  examples: [
    {
      label: "Mixed dataset with a repeated value",
      input: "4, 8, 6, 5, 3, 8",
      output: "Mean: 5.6667 — Median: 5.5 — Mode: 8",
    },
    {
      label: "No repeated values",
      input: "10, 20, 30, 40",
      output: "Mean: 25 — Median: 25 — Mode: none",
    },
  ],
  faqs: [
    {
      question: "What's the difference between mean and median?",
      answer:
        "Mean is the sum of all values divided by the count — the standard \"average.\" Median is the middle value once the data is sorted, and it's less affected by extreme outliers than the mean, which is why median is often used for things like income or home prices where a few very high values could skew the mean upward.",
    },
    {
      question: "Why does the mode sometimes show 'none'?",
      answer:
        "If every value in the dataset appears exactly once, there's no single most-frequent value, so no meaningful mode exists — the tool shows \"none\" rather than arbitrarily picking one of the equally-frequent values.",
    },
    {
      question: "Can a dataset have more than one mode?",
      answer:
        "Yes — if two or more values are tied for the highest frequency, the dataset is considered multimodal, and this tool lists all of the tied values as the mode rather than showing just one.",
    },
    {
      question: "How is the median calculated for an even number of values?",
      answer:
        "For an even-sized dataset, there's no single middle value, so the median is calculated as the average of the two middle values once the data is sorted — for example, in {10, 20, 30, 40}, the median is (20+30)/2 = 25.",
    },
    {
      question: "What input formats does this tool accept?",
      answer:
        "Numbers can be separated by commas, spaces, line breaks, or a mix of all three — including pasting a column directly from a spreadsheet, which typically comes through as one number per line and is handled correctly.",
    },
  ],
};
