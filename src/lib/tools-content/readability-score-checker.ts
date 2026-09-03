import type { ToolContent } from "./types";

export const readabilityScoreCheckerContent: ToolContent = {
  heroSubtitle: "Check Your Text's Flesch Reading Ease Score and Grade Level",
  overview: [
    "The Flesch Reading Ease test is one of the oldest and most widely used readability formulas, scoring text from 0 to 100 based on average sentence length and syllables per word — higher scores mean easier reading. It's the same underlying formula Microsoft Word's readability statistics and many content tools use, calculated here entirely client-side using the standard published formula.",
    "Paste in any text and get an instant score along with a plain-language label (Very Easy through Very Difficult) and an approximate U.S. grade level using the companion Flesch-Kincaid Grade Level formula. Both formulas are computed from the same underlying counts: total words, sentences, and syllables, estimated using a standard vowel-cluster syllable-counting heuristic.",
    "This is useful for writers checking whether a piece matches its intended audience — marketing copy generally reads best around the 60-70 range (roughly 8th-9th grade level), while academic or technical writing can reasonably sit lower. Syllable counting is a heuristic estimate, not a dictionary lookup, so treat the exact number as a close approximation rather than a perfectly precise count.",
  ],
  howItWorks: [
    { title: "Paste your text", description: "Any article, email, or piece of copy." },
    { title: "Read the Flesch score", description: "See your score and plain-language difficulty label." },
    { title: "Check grade level", description: "An approximate U.S. school grade level equivalent." },
  ],
  examples: [
    { label: "Checking marketing copy", input: "A 200-word product description", output: "Flesch score: 68 (Standard), Grade level: 7.2" },
  ],
  faqs: [
    { question: "What's a good Flesch Reading Ease score?", answer: "60-70 is considered \"Standard,\" easily understood by 13-15 year olds — a common target for general web content and marketing copy." },
    { question: "How is syllable count estimated?", answer: "Using a vowel-cluster heuristic (counting groups of vowels) rather than a full dictionary lookup, so it's a close approximation rather than exact." },
    { question: "Does higher word count affect the score?", answer: "Not directly — the formulas use averages (words per sentence, syllables per word), so they work consistently across different text lengths." },
    { question: "Is this the same formula Microsoft Word uses?", answer: "Yes — both the Flesch Reading Ease and Flesch-Kincaid Grade Level formulas here are the same standard, published formulas Word's readability statistics use." },
    { question: "Is my text uploaded anywhere?", answer: "No — the entire analysis runs locally in your browser." },
  ],
};
