import type { ToolContent } from "./types";

export const paceCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Running Pace & Speed From Distance and Time",
  overview: [
    "Runners track pace — time per kilometer or mile — far more than raw speed, since pace is the number that directly maps to race splits, training plans, and the mental math of \"can I hold this for the whole run.\" This tool calculates both pace and speed from any distance and finish time, in either kilometers or miles.",
    "The calculation converts your total time into minutes, divides by distance to get pace (minutes per unit distance), and separately calculates speed (distance per hour) from the same inputs — the two numbers describe the same performance from different angles, and different contexts call for one or the other. Race results and training logs typically use pace; some other contexts (like comparing to a general fitness benchmark) use speed instead.",
    "Getting pace right for a specific target race time is a common use case — running a full marathon in a target time requires knowing the exact per-kilometer or per-mile pace needed to hit that goal, which this tool calculates directly from a target distance and time.",
    "This is useful for checking your actual pace from a completed run, calculating what pace you'd need to hit a specific goal time, or converting between the pace and speed formats different apps, races, and training plans use.",
  ],
  howItWorks: [
    {
      title: "Choose kilometers or miles",
      description: "Whichever unit your run was measured or planned in.",
    },
    {
      title: "Enter the distance and total time",
      description: "Hours, minutes, and seconds for the time.",
    },
    {
      title: "View your pace and speed",
      description: "Both calculated instantly from the same inputs.",
    },
  ],
  examples: [
    {
      label: "5K pace calculation",
      input: "5 km in 25 minutes",
      output: "Pace: 5:00 /km — Speed: 12 km/h",
    },
  ],
  faqs: [
    {
      question: "What's the difference between pace and speed?",
      answer:
        "Pace is time per unit of distance (minutes per kilometer or mile) — lower is faster. Speed is distance per unit of time (kilometers or miles per hour) — higher is faster. They describe the same performance, just expressed in opposite directions, and different contexts (race timing versus general fitness tracking) tend to favor one or the other.",
    },
    {
      question: "How can I use this to plan a target race pace?",
      answer:
        "Enter your race distance and your target finish time, and the calculated pace tells you exactly what per-kilometer or per-mile split you need to maintain throughout the race to hit that goal — useful for pacing strategy before race day.",
    },
    {
      question: "Why does pace matter more than speed for runners?",
      answer:
        "Race splits, training plan targets, and mile markers during a run are almost universally communicated in pace (time per distance), since that's what a runner actually monitors mile by mile — speed in km/h or mph is a less intuitive unit to track in real time while running.",
    },
    {
      question: "Can I use this for cycling or other activities, not just running?",
      answer:
        "Yes — the pace and speed math is identical regardless of activity, though speed (rather than pace) is more commonly used for cycling. Enter any distance and time and both figures calculate correctly regardless of the specific activity.",
    },
    {
      question: "Does this account for elevation change or terrain during the run?",
      answer:
        "No — this calculates average pace and speed based purely on total distance and total time, without adjusting for hills, terrain, or effort variation during the run. A run with significant elevation gain will feel harder than the average pace alone suggests.",
    },
  ],
};
