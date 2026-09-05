import type { ToolContent } from "./types";

export const textPronunciationGuideContent: ToolContent = {
  heroSubtitle: "Hear How to Pronounce Any Word",
  overview: [
    "An unfamiliar word — a name, a technical term, a word encountered only in reading — is genuinely hard to pronounce confidently from spelling alone, especially with English's many irregular pronunciation patterns. Seeing the phonetic spelling helps, but hearing it said correctly is the fastest way to actually learn it.",
    "This tool takes a word or short phrase, looks up each unique word, and shows its IPA phonetic spelling alongside a native audio pronunciation you can play with one click — checking pronunciation for several unfamiliar words from the same passage in one pass rather than looking each one up separately.",
    "Audio pronunciations come from real recorded speech data included in the dictionary source, not synthesized text-to-speech — so what you hear is an actual spoken pronunciation, though not every word in the dataset has an audio recording available.",
  ],
  howItWorks: [
    { title: "Paste a word or phrase", description: "Enter one word or a short passage with several unfamiliar words." },
    { title: "Review the phonetic spelling", description: "See the IPA pronunciation guide for each word." },
    { title: "Play the audio", description: "Click the speaker icon to hear the word spoken aloud." },
  ],
  examples: [
    {
      label: "Checking a tricky word",
      input: "entrepreneur",
      output: "/ˌɒntrəprəˈnɜː/ — with an audio playback button.",
    },
  ],
  faqs: [
    {
      question: "Is the audio real speech or computer-generated?",
      answer:
        "It's real recorded pronunciation data included in the dictionary source, not synthesized text-to-speech — though not every word has an audio recording available.",
    },
    {
      question: "How many words can I check at once?",
      answer:
        "Up to 15 unique words per lookup — paste a sentence or short paragraph and every distinct word in it gets checked together.",
    },
    {
      question: "What if a word has no pronunciation data available?",
      answer:
        "It's shown as \"no entry found\" rather than a guessed or incorrect pronunciation — this happens for very obscure terms or names not in the dictionary dataset.",
    },
    {
      question: "Is my text sent to this site's own server?",
      answer:
        "No — each word is looked up directly from your browser against a dictionary API. This site's own servers never see what you typed.",
    },
  ],
};
