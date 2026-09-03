import type { ToolContent } from "./types";

export const lotteryNumberGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random Lottery Numbers for Popular Games",
  overview: [
    "Picking lottery numbers by hand — birthdays, anniversaries, \"lucky\" numbers — tends to cluster on numbers under 31, which studies of lottery ticket purchases actually show is exactly what most players do. That doesn't change your odds, but it does mean human-picked numbers cluster more than a genuine random draw, which matters if you'd rather not split a jackpot with a room full of people who all played their birthdays.",
    "This tool generates numbers for popular lottery formats — 6/49 style games, Powerball, Mega Millions, and EuroMillions — each preset built with the exact main-number and bonus-number ranges and counts that game actually uses.",
    "Every number in a generated set is guaranteed unique within its category (no repeated main numbers, no repeated bonus numbers), matching how a real lottery draw works, where balls aren't returned to the pool once drawn.",
    "This is useful for picking numbers before buying a real ticket, running an office lottery pool draw, simulating lottery draws for statistics or probability lessons, and generating quick picks without relying on official terminal randomization.",
  ],
  howItWorks: [
    {
      title: "Choose a lottery format",
      description: "6/49 Lotto, Powerball, Mega Millions, or EuroMillions.",
    },
    {
      title: "Click Generate",
      description: "Main numbers and any required bonus number are drawn.",
    },
    {
      title: "See your numbers",
      description: "Displayed in the format's standard layout, ready to fill in a play slip.",
    },
  ],
  examples: [
    {
      label: "Generating a Powerball ticket",
      input: "Format: Powerball",
      output: "Main: 7, 19, 23, 41, 58 — Powerball: 12",
    },
  ],
  faqs: [
    {
      question: "Does using randomly generated numbers improve my odds of winning?",
      answer:
        "No — every possible number combination in a real lottery draw has exactly the same odds regardless of how it was chosen. Random generation doesn't improve your odds; it just avoids the human clustering bias toward low, birthday-range numbers.",
    },
    {
      question: "Are the main numbers guaranteed not to repeat?",
      answer:
        "Yes — within a single generated set, main numbers are always unique, exactly matching how a real lottery drum draws each ball only once.",
    },
    {
      question: "Which lottery formats are supported?",
      answer:
        "6/49 style Lotto, Powerball, Mega Millions, and EuroMillions — each preset uses that specific game's actual number ranges and counts for main and bonus numbers.",
    },
    {
      question: "Can I use these numbers on an actual lottery ticket?",
      answer:
        "Yes — they're valid, properly formatted picks for the selected game. Just double check your local game's current rules, since number ranges occasionally change over time.",
    },
    {
      question: "Why do some formats have a separate bonus number?",
      answer:
        "Games like Powerball and Mega Millions draw an extra ball (the Powerball or Mega Ball) from a separate pool with its own range, which is why it's generated and shown separately from the main numbers.",
    },
  ],
};
