import type { ToolContent } from "./types";

export const ovulationCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Your Ovulation Date & Fertile Window",
  overview: [
    "Ovulation — the release of an egg from the ovary — typically happens around 14 days before the start of the next period, regardless of how long the overall cycle is. That means the timing of ovulation is calculated backward from the next expected period, not forward from the start of the current one, which is a common point of confusion when estimating fertility timing by hand.",
    "This tool takes the first day of your last period and your average cycle length, then calculates the estimated next period date, works backward 14 days from that to estimate ovulation, and shows a fertile window — the days around ovulation when conception is most likely, accounting for sperm viability (up to about 5 days) and the egg's shorter viable window (about 24 hours) after release.",
    "Cycle length matters significantly here — a 28-day cycle and a 35-day cycle produce noticeably different ovulation date estimates even from the same period start date, since the luteal phase (the roughly 14-day span from ovulation to the next period) stays relatively consistent while the follicular phase (before ovulation) is what varies most between different cycle lengths.",
    "This is a statistical estimate based on average cycle patterns, not a measurement of an individual's actual ovulation — cycles vary naturally from month to month even for the same person, and this calendar-based method doesn't detect the biological signs (like basal body temperature shifts or LH surges) that dedicated fertility tracking methods use. It's a useful starting reference point, not a substitute for clinical fertility tracking or medical guidance.",
  ],
  howItWorks: [
    {
      title: "Enter the first day of your last period",
      description: "The starting reference point for the calculation.",
    },
    {
      title: "Enter your average cycle length",
      description: "Defaults to 28 days — adjust to match your typical cycle.",
    },
    {
      title: "View your estimated ovulation date and fertile window",
      description: "Calculated by working backward 14 days from your estimated next period.",
    },
  ],
  examples: [
    {
      label: "28-day cycle",
      input: "Last period started June 1, cycle length 28 days",
      output: "Estimated ovulation: June 15 — Fertile window: June 10-16",
    },
    {
      label: "35-day cycle",
      input: "Last period started June 1, cycle length 35 days",
      output: "Estimated ovulation: June 22 — Fertile window: June 17-23",
    },
  ],
  faqs: [
    {
      question: "Why is ovulation calculated backward from the next period, not forward from the last one?",
      answer:
        "The luteal phase — the time from ovulation to the start of the next period — is relatively consistent at around 14 days for most people, while the phase before ovulation varies more between cycles and individuals. Working backward from the (estimated) next period gives a more reliable estimate than assuming ovulation always falls on a fixed day count after the last period started.",
    },
    {
      question: "How accurate is a calendar-based ovulation estimate?",
      answer:
        "It's a useful statistical estimate based on average cycle patterns, but actual ovulation timing varies naturally from cycle to cycle, even for the same person. Methods that track actual biological signals — basal body temperature, LH surge test strips, or cervical mucus changes — are more precise for anyone relying on ovulation timing for family planning.",
    },
    {
      question: "What if my cycle length varies from month to month?",
      answer:
        "Enter your typical or average cycle length for the best estimate — if your cycles vary significantly, the estimate becomes less reliable, and a cycle-tracking app or method that adapts to your actual observed patterns over several months would give a more accurate picture.",
    },
    {
      question: "Why does the fertile window include days before ovulation?",
      answer:
        "Sperm can survive in the reproductive tract for up to about 5 days, meaning intercourse in the days before ovulation can still result in conception once the egg is released — the fertile window accounts for that, not just the single day of ovulation itself.",
    },
    {
      question: "Is this tool a substitute for medical fertility advice?",
      answer:
        "No — this provides a general statistical estimate for informational purposes only. For fertility planning, conception difficulties, or any medical concern, consult a healthcare provider who can offer guidance specific to your individual situation.",
    },
  ],
};
