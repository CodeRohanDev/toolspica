import type { ToolContent } from "./types";

export const countdownTimerGeneratorContent: ToolContent = {
  heroSubtitle: "Live Countdown to Any Date and Time",
  overview: [
    "A one-time calculation of \"how many days until X\" gets stale the moment time passes — a live countdown that updates continuously is far more useful for tracking anticipation toward a launch, an event, a deadline, or any specific future moment. This tool takes any target date and time and shows a continuously updating countdown broken into days, hours, minutes, and seconds.",
    "The countdown updates every second, right in your browser, without needing to refresh the page or re-run a calculation. This makes it genuinely useful as a live reference while you have the page open — watching a product launch countdown tick down, tracking the exact time remaining before a deadline, or just building anticipation for a personal event like a trip or a birthday.",
    "Once the target date and time is reached, the countdown clearly shows that zero has been reached rather than continuing to count into confusing negative territory or freezing at zero without explanation. The target can be set to any date and time, past or future — setting a past date immediately shows the countdown has already been reached.",
    "Alongside the days/hours/minutes/seconds breakdown, the tool also shows the total remaining time in decimal hours, useful when you need a single combined number rather than four separate units — for scheduling, planning, or comparing against another duration.",
  ],
  howItWorks: [
    {
      title: "Enter the target date and time",
      description: "The specific future moment you're counting down to.",
    },
    {
      title: "Watch the live countdown",
      description: "Days, hours, minutes, and seconds update automatically every second.",
    },
    {
      title: "See it reach zero",
      description: "The countdown clearly indicates when the target moment has been reached.",
    },
  ],
  examples: [
    {
      label: "Countdown to a future event",
      input: "Target: December 31, 2026, 11:59 PM",
      output: "Live countdown showing days, hours, minutes, and seconds remaining",
    },
  ],
  faqs: [
    {
      question: "Does the countdown keep updating without me refreshing the page?",
      answer:
        "Yes — once you set a target date and time, the countdown updates automatically every second using a live timer running in your browser, with no need to refresh or re-enter anything.",
    },
    {
      question: "What happens when the countdown reaches zero?",
      answer:
        "The tool clearly displays that the target date and time has been reached, rather than continuing to count into negative numbers or leaving a confusing frozen display.",
    },
    {
      question: "Does the countdown keep running if I switch to a different browser tab?",
      answer:
        "The timer continues running as long as the page stays open, though browsers sometimes throttle background tab timers slightly to save resources — switching back to the tab will show the correct, up-to-date countdown regardless.",
    },
    {
      question: "Can I set a countdown to a date in a different time zone?",
      answer:
        "The date and time you enter is interpreted in your device's local time zone, matching what your computer or phone considers \"now.\" For converting a specific time from a different time zone first, use the Time Zone Converter, then enter the converted local time here.",
    },
    {
      question: "Is there a limit to how far in the future I can set the target?",
      answer:
        "No — you can set the target date and time as far into the future as needed, whether it's days, months, or years away, and the countdown will calculate and display the full remaining duration.",
    },
  ],
};
