import type { ToolContent } from "./types";

export const sleepCycleCalculatorContent: ToolContent = {
  heroSubtitle: "Find the Best Bedtime or Wake-Up Time Based on Sleep Cycles",
  overview: [
    "Waking up mid-sleep-cycle — during deep sleep rather than a lighter phase — is a major reason people feel groggy even after a seemingly adequate number of hours in bed, since sleep moves through roughly 90-minute cycles and waking between cycles rather than in the middle of one tends to feel noticeably more refreshing.",
    "This calculator works in either direction: tell it when you need to wake up, and it counts backward in whole 90-minute cycles (plus the typical 15 minutes it takes to fall asleep) to suggest several possible bedtimes; or tell it when you're going to bed, and it counts forward to suggest several wake-up times, each aligned to a whole number of sleep cycles.",
    "Each suggested time shows how many cycles and total hours of sleep it represents, letting you pick a time that balances getting enough sleep against your actual schedule constraints.",
  ],
  howItWorks: [
    { title: "Choose your mode", description: "Select whether you're setting a wake-up time or a bedtime." },
    { title: "Enter the known time", description: "Input the wake-up time or bedtime you already know." },
    { title: "See suggested times", description: "View several options aligned to whole sleep cycles." },
  ],
  examples: [
    {
      label: "Need to wake up at 7:00 AM",
      input: "Mode: wake-up time, Time: 7:00 AM",
      output: "Suggested bedtimes include 9:45 PM (6 cycles) and 11:15 PM (5 cycles)",
    },
  ],
  faqs: [
    {
      question: "Why 90 minutes per sleep cycle?",
      answer: "A full sleep cycle — moving through light sleep, deep sleep, and REM sleep — averages roughly 90 minutes for most adults, though it can vary somewhat from person to person and night to night.",
    },
    {
      question: "Why does it add 15 minutes for falling asleep?",
      answer: "Most people don't fall asleep the instant they get into bed — 15 minutes is a commonly used average, so the calculator adds it to bedtime suggestions to more accurately predict your actual wake time.",
    },
    {
      question: "Is fewer, longer sleep cycles always better?",
      answer: "Generally, 5-6 cycles (7.5-9 hours) is the commonly recommended range for adults — 3-4 cycles is on the low end and better suited as a short-term option than a regular sleep routine.",
    },
    {
      question: "Is my sleep data stored anywhere?",
      answer: "No — this calculates entirely in your browser based on the current time you enter, with nothing saved or transmitted.",
    },
  ],
};
