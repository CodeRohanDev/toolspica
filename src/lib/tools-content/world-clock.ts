import type { ToolContent } from "./types";

export const worldClockContent: ToolContent = {
  heroSubtitle: "Live Time in Multiple Timezones, Side by Side",
  overview: [
    "Coordinating anything across timezones — a call, a deadline, a launch — usually means mental math with UTC offsets and remembering who observes daylight saving. This tool shows live, updating clocks for several timezones at once, side by side, using your browser's built-in Intl timezone support rather than any external time API.",
    "A default set of commonly needed zones is shown on load — UTC, New York, Los Angeles, London, Kolkata, Tokyo, and Sydney — and you can add any additional IANA timezone name (like Europe/Paris or Asia/Singapore) to the list. Each clock updates every second and automatically accounts for daylight saving time changes, since it relies on the browser's own timezone database rather than a static offset.",
    "This is genuinely useful for remote teams checking who's currently in their working hours, scheduling a call across regions, or just satisfying curiosity about what time it is somewhere else right now — all without opening a dozen separate searches.",
  ],
  howItWorks: [
    { title: "View the default zones", description: "UTC and six commonly needed regional times." },
    { title: "Add any IANA timezone", description: "Type a name like Europe/Paris to add it." },
    { title: "Watch live updates", description: "Every clock updates every second automatically." },
  ],
  examples: [
    { label: "Checking overlap for a call", input: "New York and Tokyo clocks side by side", output: "See exactly what local time each city currently shows" },
  ],
  faqs: [
    { question: "Does this account for daylight saving time automatically?", answer: "Yes — it uses your browser's built-in timezone database (Intl API), which correctly handles daylight saving transitions for each region." },
    { question: "What timezone names can I add?", answer: "Any valid IANA timezone identifier, like Europe/Paris or Asia/Singapore — city-only names or abbreviations like EST aren't supported." },
    { question: "Is this pulling time from an external server?", answer: "No — it uses your device's system clock combined with the browser's built-in timezone data, no external API involved." },
    { question: "Can I remove a timezone from the list?", answer: "Currently you can add new zones; removing individual ones isn't yet supported — refresh the page to reset to the default set." },
    { question: "Why do two cities in the same country show different times?", answer: "Some countries span multiple timezones (like the US or Australia), so cities within the same country can show genuinely different local times." },
  ],
};
