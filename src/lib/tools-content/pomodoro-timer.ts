import type { ToolContent } from "./types";

export const pomodoroTimerContent: ToolContent = {
  heroSubtitle: "25-Minute Focus Sessions With Short and Long Breaks",
  overview: [
    "The Pomodoro Technique breaks work into focused 25-minute intervals separated by short breaks, with a longer break after every few cycles — a simple structure that helps maintain concentration and prevents burnout during long work sessions. This timer implements the classic technique with one click to start: 25-minute focus blocks, 5-minute short breaks, and 15-minute long breaks.",
    "Switch between the three modes anytime, and the timer tracks how many full focus cycles you've completed in the current session, giving you a visible sense of progress through your work day. A gentle audio cue plays when a timer completes, so you don't need to keep glancing at the screen to know when a session has ended.",
    "This runs entirely in your browser tab with no account, no app download, and no data collection — just open it, hit start, and work. Keep the tab open in the background while you focus elsewhere; the countdown continues accurately regardless of which window has focus.",
  ],
  howItWorks: [
    { title: "Choose a session type", description: "25-minute focus, 5-minute short break, or 15-minute long break." },
    { title: "Start the timer", description: "Watch the countdown, or work in another tab while it runs." },
    { title: "Track your cycles", description: "See how many focus sessions you've completed." },
  ],
  examples: [
    { label: "Running a focus block", input: "Click Focus 25m, then Start", output: "A 25-minute countdown with an audio alert at completion" },
  ],
  faqs: [
    { question: "Does the timer keep running if I switch tabs?", answer: "Yes — the countdown is based on actual elapsed time, so it stays accurate even if the tab isn't in focus." },
    { question: "Can I customize the interval lengths?", answer: "The current version uses the classic 25/5/15 minute structure; custom durations aren't yet supported." },
    { question: "Will I get a notification when a session ends?", answer: "A short audio cue plays automatically when the countdown reaches zero." },
    { question: "Does closing the tab reset my cycle count?", answer: "Yes — the cycle counter only persists for the current browser tab session and resets on reload." },
    { question: "Is any of my usage data tracked?", answer: "No — the timer runs entirely locally with no account, tracking, or data collection." },
  ],
};
