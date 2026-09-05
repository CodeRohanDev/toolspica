import type { ToolContent } from "./types";

export const readabilityCheckerContent: ToolContent = {
  heroSubtitle: "Check How Easy Your Writing Is to Read",
  overview: [
    "Writing that's technically correct can still be hard to read if sentences run long and words get needlessly complex — and it's genuinely difficult to judge your own writing's readability just by re-reading it, since you already understand what you meant to say. Readability scoring gives an objective, numeric answer instead of a gut feeling.",
    "This tool calculates the Flesch Reading Ease score, a widely used readability formula based on average sentence length and average syllables per word — higher scores mean easier reading, roughly on a 0-100 scale, where 60-70 is considered easily understood by most adult readers and scores below 30 indicate genuinely dense, academic-level writing. It also shows the corresponding Flesch-Kincaid Grade Level, an estimate of the US school grade level needed to comprehend the text on first read.",
    "Alongside the two headline scores, the tool shows word count, sentence count, and average words per sentence — often the single biggest lever for improving readability, since breaking up long sentences typically does more for reading ease than swapping individual words. This is a mechanical, formula-based measure of structural readability; it doesn't judge clarity of argument, tone, or whether the content is actually correct, just how demanding the sentence and word structure is to parse.",
  ],
  howItWorks: [
    { title: "Paste your text", description: "Paste an article, blog post, or any block of writing." },
    { title: "Read the score", description: "See the Flesch Reading Ease score and what it means for your audience." },
    { title: "Check the supporting stats", description: "Word count, sentence count, and average sentence length help pinpoint what to shorten." },
  ],
  examples: [
    {
      label: "Short, simple sentences",
      input: "The cat sat on the mat. It was warm. The sun was out.",
      output: "Flesch score in the 90s — very easy to read.",
    },
  ],
  faqs: [
    {
      question: "What's a good Flesch Reading Ease score for a blog post?",
      answer:
        "Most general-audience blog content aims for 60-70, considered easily understood by most adult readers. Technical or academic writing often scores lower (30-50) simply because the subject matter requires more precise, complex language.",
    },
    {
      question: "What's the single biggest way to improve a low score?",
      answer:
        "Shortening sentences almost always has the biggest impact — average words per sentence carries heavy weight in the formula, more so than swapping individual complex words for simpler ones.",
    },
    {
      question: "Does a high readability score mean the writing is actually good?",
      answer:
        "Not necessarily — this is a structural measure of sentence and word complexity, not a judgment of argument quality, accuracy, or tone. Highly readable text can still be poorly organized or unclear in its actual meaning.",
    },
    {
      question: "Is my text sent to a server to calculate the score?",
      answer:
        "No — the score is calculated entirely in your browser using JavaScript. Nothing you paste is uploaded or stored.",
    },
  ],
};
