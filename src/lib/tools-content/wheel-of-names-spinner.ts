import type { ToolContent } from "./types";

export const wheelOfNamesSpinnerContent: ToolContent = {
  heroSubtitle: "Spin a Wheel to Pick a Random Name",
  overview: [
    "A spinning wheel turns a random pick into an actual moment — for a classroom cold-call, a giveaway winner, deciding who presents first, or any group decision where the process itself should feel fair and visible to everyone watching.",
    "This tool draws a colorful wheel divided into equal slices, one per name you enter, then spins it with a realistic multi-rotation animation that gradually slows to a stop, landing on one name under a fixed pointer.",
    "Every slice is exactly equal in size, so every name has precisely the same chance of winning regardless of where it happens to sit on the wheel — the visual spin is genuinely tied to a random outcome, not just decorative.",
    "This is useful for classroom name-picking and cold-calling, raffle and giveaway drawings, deciding turn order for a game, team-building icebreakers, and any group decision that benefits from a visible, obviously-fair random process.",
  ],
  howItWorks: [
    {
      title: "Enter your names",
      description: "One name per line, up to 24 names on the wheel.",
    },
    {
      title: "Click Spin",
      description: "The wheel spins through several full rotations before slowing to a stop.",
    },
    {
      title: "See the winner",
      description: "Whichever name lands under the pointer is declared the winner.",
    },
  ],
  examples: [
    {
      label: "Picking who presents first in class",
      input: "6 student names entered",
      output: "The wheel spins and stops on one randomly chosen student",
    },
  ],
  faqs: [
    {
      question: "Does every name have an equal chance of winning?",
      answer:
        "Yes — the wheel is divided into equal-sized slices, one per name, so regardless of a name's position on the wheel, every entry has exactly the same probability of being the winner.",
    },
    {
      question: "Is the spin result actually random, or is it just an animation?",
      answer:
        "It's genuinely random — the final resting angle is determined by a random rotation amount, and the winner is calculated directly from where that angle lands, not chosen separately from the animation.",
    },
    {
      question: "How many names can I add to the wheel?",
      answer:
        "Up to 24 names. Beyond that, slices would become too thin to read clearly, so the tool caps the list to keep every name legible on the wheel.",
    },
    {
      question: "Can I remove the winner and spin again for a second prize?",
      answer:
        "Yes — just delete the winning name from your list and spin again; the wheel will rebuild with equal slices for the remaining names.",
    },
    {
      question: "Why does the wheel spin for several rotations instead of stopping instantly?",
      answer:
        "The multi-rotation spin with a gradual slowdown makes the randomness feel visible and fair to everyone watching, rather than an instant result that's harder to trust at a glance — much like a real spinning wheel or raffle drum.",
    },
  ],
};
