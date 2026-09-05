import type { ToolContent } from "./types";

export const bpmTapTempoToolContent: ToolContent = {
  heroSubtitle: "Find the BPM of Any Song by Tapping Along",
  overview: [
    "Figuring out a song's tempo — its beats per minute — without specialized software usually means either guessing or manually timing several beats with a stopwatch and doing division by hand, both of which are slow and imprecise compared to just tapping along in real time.",
    "This tool measures the time between your taps as you click or tap along to a beat, averaging your last several taps to compute a stable BPM reading that updates live as you keep tapping — the same technique built into professional DJ and music production software.",
    "It automatically resets if you pause for more than 2.5 seconds, so you can start a fresh reading for a new song without manually clearing the previous one, and keeps a rolling window of your last 10 taps for a smoothed, accurate average rather than being thrown off by a single mistimed tap.",
  ],
  howItWorks: [
    { title: "Tap along to the beat", description: "Click the TAP button in rhythm with the music you're measuring." },
    { title: "Watch the BPM update", description: "The tempo reading refines with each tap based on your recent timing." },
    { title: "Reset for a new song", description: "Pause for 2.5+ seconds or hit Reset to start a fresh measurement." },
  ],
  examples: [
    {
      label: "Tapping along to a moderate-tempo song",
      input: "Taps roughly 2 per second, sustained",
      output: "≈ 120 BPM",
    },
  ],
  faqs: [
    {
      question: "How many taps do I need for an accurate reading?",
      answer: "The BPM updates after just 2 taps, but accuracy improves with more — tapping along for 8-10 beats gives a stable, reliable average since it smooths out small timing inconsistencies in any single tap.",
    },
    {
      question: "Why does it reset after a pause?",
      answer: "A gap longer than 2.5 seconds between taps almost certainly means you've stopped tapping to the previous beat, so the tool assumes you're starting a new measurement rather than continuing the old one.",
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes — tapping works the same way with touch as with a mouse click, making it easy to tap along to music playing from another device or speaker.",
    },
    {
      question: "Is my tapping data recorded anywhere?",
      answer: "No — tap timestamps exist only temporarily in your browser's memory to compute the average and are discarded immediately, never sent anywhere.",
    },
  ],
};
