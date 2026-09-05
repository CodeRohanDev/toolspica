import type { ToolContent } from "./types";

export const quizGeneratorContent: ToolContent = {
  heroSubtitle: "Turn a Question List Into an Interactive, Scored Quiz",
  overview: [
    "Testing yourself with real questions and immediate feedback is a genuinely more effective way to study than re-reading notes — but building an actual interactive quiz usually means either a dedicated quiz app or manually checking your own answers against a key by hand, which breaks the flow of self-testing.",
    "This tool takes a plain list of question-and-answer pairs (one per line, separated by a pipe character) and turns it into an interactive quiz: answer each question in a text field, submit when done, and get immediate per-question feedback showing which answers were correct and the right answer for anything missed, plus a final score.",
    "Answer matching is case-insensitive but requires an exact text match otherwise — so short, unambiguous answers (a name, a number, a single word or short phrase) work best, while long free-text answers with many acceptable phrasings won't score reliably since this doesn't evaluate meaning, only matching text.",
  ],
  howItWorks: [
    { title: "Enter question | answer pairs", description: "One per line, separated by a pipe character." },
    { title: "Start the quiz", description: "Answer each question in the text field provided." },
    { title: "Submit and review your score", description: "See which answers were correct, the right answers for any misses, and your total score." },
  ],
  examples: [
    {
      label: "Sample quiz",
      input: "What is the capital of France? | Paris\n2 + 2 = ? | 4",
      output: "A two-question quiz, scored out of 2 after submission.",
    },
  ],
  faqs: [
    {
      question: "Is answer matching case-sensitive?",
      answer:
        "No — answers are matched case-insensitively, so \"paris\" and \"Paris\" both count as correct, but the text otherwise needs to match exactly.",
    },
    {
      question: "Can this handle long, open-ended answers?",
      answer:
        "Not reliably — this checks for an exact text match (ignoring case), not meaning, so it works best for short, specific answers like a name, number, date, or single word rather than free-form essay-style responses.",
    },
    {
      question: "Can I retake the quiz after submitting?",
      answer:
        "Yes — use \"Edit Questions\" to go back, then start the quiz again for a fresh attempt.",
    },
    {
      question: "Is my quiz content or my answers sent anywhere?",
      answer:
        "No — the entire quiz runs in your browser, and scoring happens locally. Nothing is uploaded or stored.",
    },
  ],
};
