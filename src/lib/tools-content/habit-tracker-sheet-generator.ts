import type { ToolContent } from "./types";

export const habitTrackerSheetGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Printable or Digital Habit Tracker Grid",
  overview: [
    "Habit tracking works best as a simple visual grid — a habit per row, a day per column, a checkmark for each day it was done — because the visual pattern of consecutive checkmarks (or gaps) is itself motivating in a way a plain to-do list isn't. Building that grid from scratch in a spreadsheet or notebook takes setup time before you've tracked a single day.",
    "This tool gives you a ready-made habit tracker: list your habits (one per line), choose how many days to track (a week, a month, or anything in between), and get an interactive grid where clicking a cell toggles a checkmark for that habit on that day — usable directly in the browser or exported as a CSV to print or move into a spreadsheet.",
    "Because the grid is generated from a plain list of habits you type, it's easy to start a fresh tracker for a new month or a new set of goals — just update the habit list and day count, and a new blank grid is ready immediately, without any account or setup step.",
  ],
  howItWorks: [
    { title: "List your habits", description: "One habit per line — anything you want to track daily." },
    { title: "Set the number of days", description: "Choose a week, a month, or any range in between." },
    { title: "Click cells to check off days", description: "Click any cell to mark a habit done for that day." },
  ],
  examples: [
    {
      label: "Sample tracker",
      input: "Habits: Drink water, Exercise — Days: 30",
      output: "A 2-row, 30-column grid you can click through daily.",
    },
  ],
  faqs: [
    {
      question: "Does this save my progress between visits?",
      answer:
        "No — the grid exists in your browser for the current session. Export it as CSV regularly if you want to keep a running record across days without losing progress on refresh.",
    },
    {
      question: "Can I track more than one month at a time?",
      answer:
        "The day range supports up to 31 days per tracker — for longer-term tracking, export and start a fresh grid for each new month.",
    },
    {
      question: "Can I print this out as a physical tracker?",
      answer:
        "Export as CSV, open it in a spreadsheet app, and print from there for a physical copy — the on-screen version itself is designed for interactive clicking rather than direct printing.",
    },
    {
      question: "Is my habit data sent anywhere?",
      answer:
        "No — the tracker is built and exported entirely in your browser. Nothing is uploaded to a server.",
    },
  ],
};
