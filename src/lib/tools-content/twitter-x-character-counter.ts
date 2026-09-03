import type { ToolContent } from "./types";

export const twitterXCharacterCounterContent: ToolContent = {
  heroSubtitle: "Live Character Count Against X's 280-Character Limit",
  overview: [
    "X (formerly Twitter) caps standard posts at 280 characters, and going even one character over means the post simply won't publish until you trim it down. Instead of writing in the actual X composer and getting surprised at the last second, this tool gives you a live character count and a visual progress ring as you type, so you always know exactly how much room you have left.",
    "The counter updates on every keystroke, turning yellow as you approach the limit and red once you've gone over, with an exact count of how many characters need to be cut. This is especially useful for drafting several post variations side by side, or for writing in a distraction-free space before copying the final version over to X itself.",
    "Character counting for X follows the platform's standard rule of counting each character as one, including spaces, punctuation, and emoji (though emoji technically can count as more than one character depending on the specific symbol) — this tool uses standard JavaScript string length, which matches X's counting for the vast majority of everyday text.",
  ],
  howItWorks: [
    { title: "Write your post", description: "Type or paste your draft into the box." },
    { title: "Watch the live counter", description: "See remaining characters update in real time." },
    { title: "Trim if needed", description: "Get an exact over-limit count if you've gone too long." },
  ],
  examples: [
    { label: "Checking a draft post", input: "A 295-character draft", output: "15 characters over the limit — needs trimming" },
  ],
  faqs: [
    { question: "Does this match X's exact character count?", answer: "Yes, for standard text — it uses the same one-character-per-character counting rule X uses for the vast majority of content." },
    { question: "Do links count differently on X?", answer: "Yes — X automatically shortens all links to a fixed length (23 characters) regardless of the original URL's length, which this tool doesn't simulate." },
    { question: "Do emoji count as more than one character?", answer: "Some multi-codepoint emoji can count as 2 on X's own system; this tool uses standard character length, which may differ slightly for complex emoji." },
    { question: "Is there a character limit for X Premium accounts?", answer: "Yes — Premium subscribers get a much higher limit (up to 25,000 characters) for long-form posts, which this 280-character counter doesn't cover." },
    { question: "Is my post text saved anywhere?", answer: "No — everything stays local in your browser tab and is cleared when you navigate away." },
  ],
};
