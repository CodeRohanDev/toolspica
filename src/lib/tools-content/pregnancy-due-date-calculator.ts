import type { ToolContent } from "./types";

export const pregnancyDueDateCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Your Due Date & Current Week of Pregnancy",
  overview: [
    "A pregnancy due date is conventionally calculated as 280 days (40 weeks) from the first day of the last menstrual period (LMP) — a method called Naegele's rule, standard in obstetric practice for decades. This counts from before conception actually happens, since ovulation and conception typically occur around two weeks after the period starts, which is why \"40 weeks pregnant\" doesn't mean 40 weeks since conception.",
    "This tool supports both calculation methods: from the first day of the last period (adding 280 days, the standard clinical default) or from a known conception date if that's more precisely known (adding 266 days, accounting for the roughly 14-day head start the LMP method already includes). Both methods estimate the same underlying due date when the cycle is a standard 28 days — the conception-date method is simply more direct when the exact conception date is known.",
    "Beyond the estimated due date, the tool shows current progress in weeks and days, and which trimester that falls into — the first trimester runs through week 12, the second through week 27, and the third from week 28 to delivery. This progress calculation uses today's date automatically, so it stays accurate as time passes without needing to re-enter anything.",
    "It's important to understand what a due date actually represents statistically: it's the estimated midpoint of a normal-term delivery window, not a precise prediction — only a small percentage of babies are actually born exactly on their calculated due date, with the large majority arriving anywhere within a couple of weeks on either side, which is considered entirely normal.",
  ],
  howItWorks: [
    {
      title: "Choose your calculation method",
      description: "Based on the first day of your last period, or a known conception date.",
    },
    {
      title: "Enter the relevant date",
      description: "The tool applies the correct standard offset for your chosen method.",
    },
    {
      title: "View your estimated due date and current progress",
      description: "See the due date, current week and day, and trimester.",
    },
  ],
  examples: [
    {
      label: "Calculated from last period",
      input: "Last period started March 1",
      output: "Estimated due date: December 6",
    },
    {
      label: "Calculated from known conception date",
      input: "Conception date March 15",
      output: "Estimated due date: December 6",
    },
  ],
  faqs: [
    {
      question: "Why does the last-period method add 280 days when conception happens later?",
      answer:
        "This is the standard clinical convention (Naegele's rule) — counting from the last period start rather than the actual conception date, which is often not precisely known. It intentionally builds in the roughly 14-day gap between the period starting and typical ovulation/conception for a standard 28-day cycle.",
    },
    {
      question: "How accurate is a calculated due date?",
      answer:
        "It's a statistical estimate of the midpoint of a normal delivery window, not a precise prediction — only about 5% of babies are born on their exact calculated due date, with the large majority born within roughly two weeks before or after, which is considered a normal range. A clinical ultrasound-based estimate, especially in early pregnancy, is generally more precise than a calendar-based calculation.",
    },
    {
      question: "What's the difference between the two calculation methods here?",
      answer:
        "The last-period method (280 days) is the standard default and works well for a typical 28-day cycle. The conception-date method (266 days) is more direct when the actual conception date is known — for example, from fertility tracking or IVF — and can be more accurate for cycles that don't follow the standard 28-day assumption.",
    },
    {
      question: "How is the trimester determined?",
      answer:
        "This tool uses the common convention of weeks 1-12 as the first trimester, weeks 13-27 as the second, and weeks 28 onward as the third — though exact trimester boundaries are sometimes defined slightly differently between different medical sources.",
    },
    {
      question: "Is this a substitute for prenatal medical care?",
      answer:
        "No — this tool provides a general estimate for informational purposes only. A confirmed due date, along with all prenatal care and monitoring, should come from a qualified healthcare provider, who can use clinical measurements for a more precise, individualized assessment.",
    },
  ],
};
