import type { ToolContent } from "./types";

export const moonPhaseCalculatorContent: ToolContent = {
  heroSubtitle: "Find the Moon Phase for Any Date",
  overview: [
    "The moon cycles through its full set of phases roughly every 29.5 days — a period astronomers call the synodic month — and calculating which phase falls on any given date requires knowing precisely how many days have elapsed since a known reference new moon and where that lands within the current cycle.",
    "This calculator uses a known reference new moon (January 6, 2000) and the precise average length of the synodic month to compute the moon's age and phase for any date you enter, showing the phase name, its emoji symbol, the moon's exact age in days, and its percentage of illumination.",
    "Because it's based on a precise astronomical constant rather than an approximation, it stays accurate to within about a day for any date — past, present, or years into the future — making it useful for planning stargazing, photography, or simply satisfying curiosity about a specific date's moon phase.",
  ],
  howItWorks: [
    { title: "Enter a date", description: "Select any date using the date picker — defaults to today." },
    { title: "See the moon phase", description: "View the phase name, emoji, and moon age in days." },
    { title: "Check illumination percentage", description: "See what percentage of the moon's visible face is illuminated." },
  ],
  examples: [
    {
      label: "Checking today's moon phase",
      input: "Date: today",
      output: "e.g. Waxing Gibbous 🌔, Moon age: 11.2 days, 78% illuminated",
    },
  ],
  faqs: [
    {
      question: "How accurate is this calculation?",
      answer: "It's accurate to within roughly a day for any date, since it uses the precise average synodic month length rather than a rough approximation — small variations occur because the moon's actual orbital period fluctuates slightly month to month.",
    },
    {
      question: "What's the difference between moon age and illumination percentage?",
      answer: "Moon age is how many days into the current ~29.5-day cycle you are, while illumination percentage is how much of the moon's visible face is lit by the sun — the two are related but described differently.",
    },
    {
      question: "Can I check a moon phase for a future date?",
      answer: "Yes — since the calculation is based on a mathematical cycle rather than live observation data, it works equally well for any past or future date.",
    },
    {
      question: "Is this calculated using an external astronomy API?",
      answer: "No — the phase is computed using a well-known astronomical formula entirely in your browser, with no external requests or data sent anywhere.",
    },
  ],
};
