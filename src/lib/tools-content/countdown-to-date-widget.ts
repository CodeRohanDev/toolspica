import type { ToolContent } from "./types";

export const countdownToDateWidgetContent: ToolContent = {
  heroSubtitle: "See Exactly How Much Time Is Left Until Any Date",
  overview: [
    "Whether it's a launch date, a deadline, a wedding, or a countdown to an event you're genuinely excited about, this widget shows a live, second-by-second countdown broken into days, hours, minutes, and seconds until the moment you specify. Pick any future date and time, and watch the numbers count down in real time.",
    "It works in reverse too — if you enter a date that's already passed, the widget automatically switches to showing elapsed time since that date instead, which is handy for tracking how long it's been since a milestone rather than how long until an upcoming one.",
    "Everything runs off your device's local clock with no server involved, so the countdown stays accurate and private. Keep the tab open on a second monitor during a launch, or just check in periodically to see how close you're getting to a date that matters.",
  ],
  howItWorks: [
    { title: "Pick a target date and time", description: "Any date, past or future." },
    { title: "Watch the live countdown", description: "Days, hours, minutes, and seconds update every second." },
    { title: "See elapsed time for past dates", description: "Automatically switches direction if the date has passed." },
  ],
  examples: [
    { label: "Counting down to a product launch", input: "A date 45 days in the future", output: "45 Days, 6 Hours, 22 Min, 10 Sec — live updating" },
  ],
  faqs: [
    { question: "What happens if I pick a date in the past?", answer: "The widget automatically shows elapsed time since that date instead of a countdown to it." },
    { question: "Does this account for my local timezone?", answer: "Yes — the date/time picker uses your device's local timezone automatically." },
    { question: "Does the countdown keep running if I leave the tab open?", answer: "Yes — it updates every second for as long as the tab stays open." },
    { question: "Can I set a countdown to a recurring event, like every birthday?", answer: "No — this widget counts down to one specific date and time you set; recurring countdowns aren't supported." },
    { question: "Is my target date sent anywhere?", answer: "No — the countdown calculation happens entirely in your browser." },
  ],
};
