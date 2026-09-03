import type { ToolContent } from "./types";

export const randomWordGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random English Words Instantly",
  overview: [
    "A single random word is a surprisingly versatile starting point — for word games like Scattergories or Taboo, a naming brainstorm that needs an unexpected spark, a writing prompt exercise, or a vocabulary drill. Thinking of a genuinely random word on demand is harder than it sounds, since the human mind tends to default to the same handful of familiar words.",
    "This tool generates a batch of random English words drawn from a curated list spanning concrete nouns, adjectives, and evocative vocabulary — words chosen to be broadly recognizable and useful as prompts, not obscure dictionary entries nobody's heard of. Generate anywhere from one word up to 50 at once.",
    "Each word in a batch is guaranteed unique (no duplicates within the same generation), so a request for 10 words always returns 10 genuinely different words rather than risking repeats diluting the result.",
    "This is useful for word-based party games, brainstorming a product or project name by combining random words, writing prompts and creative exercises, vocabulary practice, or generating quick placeholder labels for a mockup or test.",
  ],
  howItWorks: [
    {
      title: "Choose how many words",
      description: "From 1 up to 50 at once.",
    },
    {
      title: "Click Generate",
      description: "A fresh, unique set of random words appears instantly.",
    },
    {
      title: "Copy the results",
      description: "One click copies the full list, comma-separated.",
    },
  ],
  examples: [
    {
      label: "Generating words for a naming brainstorm",
      input: "5 words",
      output: "lantern, harbor, quartz, meadow, compass",
    },
  ],
  faqs: [
    {
      question: "Can the same word appear twice in one batch?",
      answer:
        "No — words within a single generated batch are guaranteed unique, so a request for 10 words always returns 10 genuinely different words, not a batch that might contain repeats.",
    },
    {
      question: "What kind of words are in the word list?",
      answer:
        "A mix of broadly recognizable concrete nouns and evocative adjectives — words chosen specifically for being useful and interesting as prompts or game words, not obscure or overly technical vocabulary that most people wouldn't recognize.",
    },
    {
      question: "How can I use this for a naming brainstorm?",
      answer:
        "Generate a handful of words and try combining two of them, or use a single word as an unexpected anchor to riff off of — random word combination is a classic, genuinely effective brainstorming technique for breaking out of predictable naming patterns.",
    },
    {
      question: "Is this suitable for word games like Scattergories or Balderdash?",
      answer:
        "Yes — generating a random word (or letter-adjacent prompt) is exactly the kind of quick, unbiased prompt these games need, and having a instant source beats flipping through a dictionary or app.",
    },
    {
      question: "Does clicking Generate again give completely different words?",
      answer:
        "Yes — every generation is fresh and independent, so clicking again gives you an entirely new random set with no relationship to the previous batch.",
    },
  ],
};
