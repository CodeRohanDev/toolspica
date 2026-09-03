import type { ToolContent } from "./types";

export const onlineStopwatchContent: ToolContent = {
  heroSubtitle: "A Precise Stopwatch With Lap Timing, Right in Your Browser",
  overview: [
    "A stopwatch is one of those tools you need occasionally but rarely have handy — this one is always one tab away, with no app to install and no ads interrupting a timed activity. It counts up from zero with centisecond precision, and includes full lap timing so you can record split times without stopping the overall clock.",
    "Timing is calculated from actual elapsed wall-clock time rather than counting timer ticks, which avoids the drift that simpler interval-based stopwatches can accumulate over long sessions. Each lap you record is added to a running list above the clock, most recent first, so you can review your splits at a glance.",
    "Useful for workouts, cooking, timing presentations or speeches, or any activity where you need an accurate running clock with the ability to mark specific moments along the way without resetting to zero.",
  ],
  howItWorks: [
    { title: "Press Start", description: "The stopwatch begins counting from zero." },
    { title: "Press Lap to record splits", description: "Mark a moment without stopping the clock." },
    { title: "Pause or reset anytime", description: "Full control over the running timer." },
  ],
  examples: [
    { label: "Timing interval workout splits", input: "Start, then Lap after each interval", output: "A list of split times, most recent first" },
  ],
  faqs: [
    { question: "How precise is this stopwatch?", answer: "It displays down to centiseconds (hundredths of a second) and calculates elapsed time from actual wall-clock time to avoid drift over long sessions." },
    { question: "Does the lap list save between sessions?", answer: "No — laps are cleared when you reset the stopwatch or close the tab." },
    { question: "Can I use this for a workout with multiple rounds?", answer: "Yes — use the Lap button to mark the end of each round while the overall clock keeps running." },
    { question: "Does the stopwatch keep running if I switch tabs?", answer: "Yes — it's based on actual elapsed time, so switching tabs or minimizing the browser doesn't affect accuracy." },
    { question: "Is there a countdown timer version instead?", answer: "Yes — see our Countdown to Date Widget or Pomodoro Timer for countdown-style timing." },
  ],
};
