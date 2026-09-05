import type { ToolContent } from "./types";

export const icsCalendarFileViewerContent: ToolContent = {
  heroSubtitle: "View Events Inside an .ics Calendar File",
  overview: [
    "A .ics calendar file — exported from Google Calendar, Outlook, or sent as a meeting invite — is plain text following the iCalendar format, but reading its raw content directly means parsing lines like DTSTART and SUMMARY by hand rather than seeing an actual event.",
    "This tool parses an .ics file and displays every event it contains as a readable card — title, start and end time, location, and description — the way a calendar app would show them, instead of raw iCalendar field codes.",
    "A single .ics file can contain multiple events (a full calendar export, or a recurring series), and every VEVENT block found in the file is parsed and shown as its own card, so you can review an entire exported calendar at once.",
  ],
  howItWorks: [
    { title: "Upload a .ics file", description: "Choose a calendar file exported or received as an invite." },
    { title: "Review the events", description: "See title, date/time, location, and description for each event." },
    { title: "Check multiple events at once", description: "A file with several events shows every one as its own card." },
  ],
  examples: [
    {
      label: "Meeting invite",
      input: "A .ics file with a single meeting event",
      output: "A card showing the meeting title, date/time, and location.",
    },
  ],
  faqs: [
    {
      question: "Can this view a full exported calendar with many events?",
      answer:
        "Yes — every event (VEVENT block) found in the file is parsed and displayed as its own card, so a full calendar export shows all its events at once.",
    },
    {
      question: "Does this handle recurring events?",
      answer:
        "Each occurrence defined in the file is shown as parsed, but this doesn't expand a recurrence rule (RRULE) into its individual future occurrences — it shows what's explicitly present in the file.",
    },
    {
      question: "Does this add the events to my calendar?",
      answer:
        "No — this is a read-only viewer for inspecting file contents. Open the .ics file with your calendar app directly to actually import the events.",
    },
    {
      question: "Is my calendar file uploaded to a server?",
      answer:
        "No — parsing happens entirely in your browser. Nothing about your calendar or event details is uploaded anywhere.",
    },
  ],
};
