import type { ToolContent } from "./types";

export const zodiacSignFinderContent: ToolContent = {
  heroSubtitle: "Find Your Zodiac Sign from Your Birth Date",
  overview: [
    "Each of the twelve Western zodiac signs corresponds to a specific date range based on the sun's position relative to a constellation at the time of birth — and while most people know their own sign, remembering the exact boundary dates or looking up someone else's sign from their birthday usually means a quick search.",
    "This tool takes any birth date and instantly returns the corresponding zodiac sign, its symbol, ruling element (Fire, Earth, Air, or Water), and a handful of commonly associated personality traits — using the standard Western tropical zodiac date ranges.",
    "It's built for quick, fun lookups — checking your own sign, a friend's, or exploring the trait associations for each sign — and works for any date, past or future.",
  ],
  howItWorks: [
    { title: "Enter a birth date", description: "Select any date using the date picker." },
    { title: "See the zodiac sign", description: "View the sign, symbol, date range, and element instantly." },
    { title: "Browse associated traits", description: "See a few commonly associated personality traits for that sign." },
  ],
  examples: [
    {
      label: "Birth date of June 15",
      input: "Date: June 15",
      output: "Gemini ♊ (May 21 – Jun 20), Air sign — Curious, Adaptable, Witty",
    },
  ],
  faqs: [
    {
      question: "What if my birthday falls right on a boundary date?",
      answer: "Boundary dates can vary slightly by source (by a day or so) since they depend on the exact date of the sun's ecliptic position each year — this tool uses the most commonly cited standard boundary dates.",
    },
    {
      question: "Is this based on astrology or astronomy?",
      answer: "This uses the traditional Western tropical zodiac system used in popular astrology — it's presented for entertainment purposes and isn't based on scientific astronomical claims about personality.",
    },
    {
      question: "Does this account for zodiac systems from other cultures?",
      answer: "No — this covers only the twelve-sign Western tropical zodiac. Chinese zodiac (based on birth year) and Vedic/sidereal astrology use different systems entirely.",
    },
    {
      question: "Is my birth date stored anywhere?",
      answer: "No — the lookup happens entirely in your browser and your birth date is never sent to or stored on any server.",
    },
  ],
};
