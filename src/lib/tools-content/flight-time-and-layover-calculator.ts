import type { ToolContent } from "./types";

export const flightTimeAndLayoverCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Total Flight Time and Layover Duration for Multi-Leg Trips",
  overview: [
    "A multi-leg itinerary with connecting flights makes it surprisingly hard to figure out your total time in the air versus time spent waiting in airports — especially once each flight crosses time zones, since simple clock-time subtraction between departure and arrival stops making sense.",
    "This calculator takes the departure and arrival date-time for each flight segment in your itinerary, computes the actual flight duration for each leg by comparing full timestamps (correctly handling time zone changes when you enter each time as shown on your boarding pass), and calculates layover time as the gap between one flight's arrival and the next flight's departure.",
    "Add as many connecting flights as your itinerary needs, and see a full breakdown of every leg's flight time and every layover, plus your grand totals for time actually flying versus time spent on the ground between flights.",
  ],
  howItWorks: [
    { title: "Enter your first flight", description: "Input its departure and arrival date and time." },
    { title: "Add connecting flights", description: "Add each additional flight leg with its own departure and arrival." },
    { title: "Read the full breakdown", description: "See each leg's duration, each layover, and your trip totals." },
  ],
  examples: [
    {
      label: "Two-leg trip with a layover",
      input: "Flight 1: 9:00 AM - 11:30 AM, Flight 2: 1:00 PM - 3:45 PM",
      output: "Total flight time: 5h 15m, Total layover: 1h 30m",
    },
  ],
  faqs: [
    {
      question: "How should I enter times for flights crossing time zones?",
      answer: "Enter each flight's departure and arrival exactly as shown on your boarding pass or itinerary — those times are already in each airport's local time zone, so the calculator correctly computes duration using full timestamps rather than assuming a single time zone.",
    },
    {
      question: "What if I have a very short or overnight layover?",
      answer: "Enter the exact departure time of your connecting flight as scheduled — the calculator handles overnight layovers correctly since it works from full date-time values rather than just clock times.",
    },
    {
      question: "Can I calculate a one-way trip with no connections?",
      answer: "Yes — just fill in your single flight's departure and arrival without adding any connecting legs.",
    },
    {
      question: "Is my itinerary data private?",
      answer: "Yes — everything is calculated locally in your browser and no flight details are sent to any server.",
    },
  ],
};
