import type { ToolContent } from "./types";

export const randomEmojiGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random Emoji Instantly",
  overview: [
    "A handful of random emoji makes a surprisingly fun prompt — for an emoji-guessing party game, a random reaction picker, or just decorating a message with something more interesting than the same 3 emoji everyone defaults to.",
    "This tool generates a batch of random emoji from a broad, curated set spanning faces, gestures, animals, nature, food, activities, and objects, so results feel varied rather than repeatedly landing on the same narrow category.",
    "Generate anywhere from a single emoji up to 30 at once, then copy the full result with one click — handy for pasting straight into a chat, a game prompt, or a design mockup.",
    "This is useful for party games like emoji charades or story-guessing, picking a random reaction or sticker, adding variety to social posts, and testing how an app or UI renders emoji content.",
  ],
  howItWorks: [
    {
      title: "Choose how many emoji",
      description: "From 1 up to 30 at once.",
    },
    {
      title: "Click Generate",
      description: "A fresh random set of emoji appears instantly.",
    },
    {
      title: "Copy the results",
      description: "One click copies every emoji shown, ready to paste anywhere.",
    },
  ],
  examples: [
    {
      label: "Generating emoji for a guessing game",
      input: "3 emoji",
      output: "🦄 🍕 🚀",
    },
  ],
  faqs: [
    {
      question: "Can the same emoji appear more than once in a batch?",
      answer:
        "Yes — each emoji is drawn independently, so with a larger batch it's possible (though not guaranteed) for the same emoji to appear more than once, just like independent dice rolls can repeat.",
    },
    {
      question: "Will the emoji look the same on every device?",
      answer:
        "The underlying emoji is the same, but the visual style can differ slightly between platforms (Apple, Google, Samsung, etc.) since each renders its own emoji artwork for the same character — this is standard emoji behavior everywhere, not specific to this tool.",
    },
    {
      question: "What categories of emoji are included?",
      answer:
        "A broad mix: faces and expressions, hand gestures, animals, nature and weather, food and drink, sports and activities, and everyday objects — chosen for variety rather than concentrating on any one theme.",
    },
    {
      question: "Can I use this for a party game?",
      answer:
        "Yes — generating a few random emoji is a quick way to create prompts for games like emoji charades, story building, or guess-the-phrase.",
    },
    {
      question: "Does generating again give a completely different set?",
      answer:
        "Yes — every generation is independent and random, so clicking Generate again produces a fresh set unrelated to the previous one.",
    },
  ],
};
