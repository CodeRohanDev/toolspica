import type { ToolContent } from "./types";

export const jetLagAdjustmentCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate How Long It Will Take to Adjust to a New Time Zone",
  overview: [
    "Jet lag severity and recovery time depend on two things most people don't think to separate: how many hours of time difference you're crossing, and which direction you're traveling — eastward travel is consistently harder to adjust to than westward travel covering the same number of hours, because it shortens your day rather than lengthening it.",
    "This calculator takes your home and destination time zone offsets from UTC, computes the time difference and travel direction, and estimates recovery time using the general chronobiology guideline of roughly one day per hour of eastward shift, and about one day per 1.5 hours of westward shift.",
    "It also gives direction-specific tips — like seeking morning light after eastward travel or evening light after westward travel — since managing light exposure is one of the most effective ways to help your body clock adjust faster to a new time zone.",
  ],
  howItWorks: [
    { title: "Enter both time zone offsets", description: "Input your home and destination UTC offsets." },
    { title: "See the time difference and direction", description: "View how many hours you're shifting and whether it's eastward or westward." },
    { title: "Read the adjustment estimate", description: "Get an estimated number of days to fully adjust, plus tips." },
  ],
  examples: [
    {
      label: "Flying from UTC+0 to UTC+9",
      input: "Home: UTC+0, Destination: UTC+9",
      output: "9 hours eastward, ≈ 9 days to fully adjust",
    },
  ],
  faqs: [
    {
      question: "Why is eastward travel harder to adjust to?",
      answer: "Eastward travel effectively shortens your day, requiring you to fall asleep earlier than your body clock expects — most people find it easier to stay up later (as westward travel requires) than to fall asleep earlier than usual.",
    },
    {
      question: "Can I speed up adjustment before I travel?",
      answer: "Yes — gradually shifting your sleep schedule by an hour a day in the days leading up to eastward travel (or staying up later before westward travel) can reduce jet lag once you arrive.",
    },
    {
      question: "Does crossing fewer time zones always mean less jet lag?",
      answer: "Generally yes, though direction still matters — a 3-hour eastward shift can feel similar to or worse than a 5-hour westward shift for many travelers.",
    },
    {
      question: "Is this estimate exact?",
      answer: "No — it's a general estimate based on typical chronobiology research. Individual adjustment speed varies by age, sleep habits, and how well you manage light exposure and sleep timing during travel.",
    },
  ],
};
