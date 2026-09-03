import type { ToolContent } from "./types";

export const heartRateZoneCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your Training Heart Rate Zones",
  overview: [
    "Training at the right heart rate intensity matters for getting the specific result you're after — fat-burning, aerobic endurance, or high-intensity performance work all correspond to different heart rate zones, and training in the wrong zone for your goal is a common reason progress stalls. This tool calculates five standard training zones based on your estimated maximum heart rate.",
    "Maximum heart rate is estimated using the widely used 220 minus age formula — simple and reasonably accurate for most people, though individual variation exists and it becomes less precise at older ages. From that estimated max, the five zones are calculated as percentage ranges: Zone 1 (50-60%, warm-up/recovery), Zone 2 (60-70%, fat burning), Zone 3 (70-80%, aerobic base), Zone 4 (80-90%, threshold), and Zone 5 (90-100%, maximum effort).",
    "If you provide a resting heart rate, the calculation switches to the Karvonen method (also called the heart rate reserve method), which is generally considered more accurate than the simple percentage-of-max approach. It calculates zones as a percentage of the difference between max and resting heart rate, then adds back the resting rate — this accounts for individual fitness level differences that a flat percentage of max heart rate alone misses.",
    "This is useful for structuring interval training, ensuring easy recovery runs actually stay easy, or following a specific training zone prescribed by a coach or training plan — a heart rate monitor during exercise is what makes these zones actionable in real time, not just a reference number.",
  ],
  howItWorks: [
    {
      title: "Enter your age",
      description: "Used to estimate your maximum heart rate.",
    },
    {
      title: "Optionally add your resting heart rate",
      description: "Enables the more accurate Karvonen (heart rate reserve) method.",
    },
    {
      title: "View your five training zones",
      description: "Each zone shown as a beats-per-minute range.",
    },
  ],
  examples: [
    {
      label: "Zones using max heart rate only",
      input: "Age 30 (max HR 190)",
      output: "Zone 2 (fat burn): 114–133 bpm",
    },
    {
      label: "Zones using Karvonen method",
      input: "Age 30, resting HR 65",
      output: "Zone 2 (fat burn): 140–153 bpm",
    },
  ],
  faqs: [
    {
      question: "Why do the zones change when I add a resting heart rate?",
      answer:
        "The Karvonen method accounts for your heart rate reserve — the range between resting and max heart rate — rather than just a flat percentage of max. Two people with the same max heart rate but very different fitness levels (and therefore different resting heart rates) get meaningfully different, more individually accurate zones with this method.",
    },
    {
      question: "How accurate is the 220 minus age formula for max heart rate?",
      answer:
        "It's a widely used, simple estimate, but individual variation is real — actual max heart rate for people of the same age can differ by 10-20 beats or more. A supervised maximal exercise test gives a precise individual number, but this formula is a reasonable general estimate for training zone purposes.",
    },
    {
      question: "Which zone should I train in for fat loss?",
      answer:
        "Zone 2 is commonly associated with \"fat burning\" because a higher percentage of calories burned at that intensity come from fat versus carbohydrate stores — but total calories burned (which matters more for overall fat loss) is often higher at greater intensities, so zone choice should reflect your specific training goal, not just fat-burning percentage.",
    },
    {
      question: "Do I need a heart rate monitor to use these zones?",
      answer:
        "For real-time training, yes — a chest strap or wrist-based heart rate monitor is what lets you actually stay within a target zone during exercise. Without one, this calculation still provides useful reference numbers, but you can't verify you're in the intended zone during the workout itself.",
    },
    {
      question: "Should I consult a doctor before starting intense heart rate zone training?",
      answer:
        "Yes, especially Zone 4 and 5 high-intensity work — if you have any cardiovascular condition, are new to exercise, or are significantly increasing training intensity, checking with a doctor first is a reasonable precaution before this general estimate.",
    },
  ],
};
