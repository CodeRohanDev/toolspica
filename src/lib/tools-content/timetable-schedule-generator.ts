import type { ToolContent } from "./types";

export const timetableScheduleGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Weekly Timetable and Export It as CSV",
  overview: [
    "A weekly schedule — class timetable, work shift plan, or a personal routine — is genuinely easier to plan visually as a grid of days and hours than as a list, since a grid immediately shows gaps and overlaps that a list format hides. Building that grid by hand in a spreadsheet means manually setting up rows, columns, and borders before even entering the actual schedule.",
    "This tool gives you a ready-made weekly grid — days of the week across the top, a configurable range of hours down the side — where you click directly into any cell to type what happens during that time slot. Adjust the start and end hour to match your actual schedule's range, whether that's a school day or a full 24-hour shift rotation.",
    "Once filled in, export the whole grid as a CSV file, which opens directly in Excel, Google Sheets, or Numbers for further editing, printing, or sharing — useful for handing off a finalized schedule to someone else or keeping a backup outside the browser.",
  ],
  howItWorks: [
    { title: "Set your hour range", description: "Choose the start and end hour that match your schedule." },
    { title: "Fill in the grid", description: "Click any cell and type what happens during that day and hour." },
    { title: "Export as CSV", description: "Download the completed schedule to open in a spreadsheet app." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "Start: 8, End: 18, Monday 9:00 = \"Math class\"",
      output: "A weekly grid with \"Math class\" in the Monday, 9:00 cell.",
    },
  ],
  faqs: [
    {
      question: "Can I set an overnight or 24-hour range?",
      answer:
        "Yes — set the start and end hour to cover any range up to a full 24 hours, useful for shift schedules or a full-day personal routine rather than just a typical school or work day range.",
    },
    {
      question: "Does this save automatically?",
      answer:
        "No — the grid exists in your browser for the current session. Export it as CSV once you're happy with it to keep a permanent copy.",
    },
    {
      question: "Can I open the exported file in Excel or Google Sheets?",
      answer:
        "Yes — the export is a standard CSV file, which both Excel and Google Sheets (and most other spreadsheet apps) open directly.",
    },
    {
      question: "Is my schedule data sent anywhere?",
      answer:
        "No — the entire grid is built and exported directly in your browser. Nothing is uploaded to a server.",
    },
  ],
};
