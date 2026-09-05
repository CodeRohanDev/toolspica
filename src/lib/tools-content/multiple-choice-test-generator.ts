import type { ToolContent } from "./types";

export const multipleChoiceTestGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Printable Multiple-Choice Test with an Answer Key",
  overview: [
    "Writing a multiple-choice test involves two separate but linked documents that need to stay in sync — the test itself (with lettered options) and a separate answer key — and manually keeping the lettering and correct answers consistent between both gets error-prone once a test has more than a handful of questions.",
    "This tool takes a plain-text format — a question, followed by its options on separate lines, with the correct option marked using a leading asterisk — and generates both a clean, lettered test (A, B, C, D...) and a matching answer key automatically, guaranteed to stay in sync since both are generated from the same source.",
    "Questions are separated by a blank line, so you can paste in as many as needed in one block of text. The letter assigned to each option is based on its position in your list, not the asterisk — so the correct answer can be in any position without needing to be moved to a specific spot.",
  ],
  howItWorks: [
    { title: "Enter questions and options", description: "One question per block, options below it, blank line between questions." },
    { title: "Mark the correct option", description: "Add a * before the correct option's text." },
    { title: "Copy the test and answer key", description: "Both are generated together and guaranteed to match." },
  ],
  examples: [
    {
      label: "One question",
      input: "What is the capital of France?\nLondon\n*Paris\nBerlin\nMadrid",
      output: "1. What is the capital of France?\n   A. London\n   B. Paris\n   C. Berlin\n   D. Madrid\n\nAnswer key: 1. B",
    },
  ],
  faqs: [
    {
      question: "How do I mark the correct answer?",
      answer:
        "Add an asterisk (*) directly before the correct option's text on its own line — the asterisk itself doesn't appear in the generated test, only in the answer key logic behind the scenes.",
    },
    {
      question: "How many options can each question have?",
      answer:
        "Up to six per question (lettered A through F) — most multiple-choice questions use four, but this supports more if needed.",
    },
    {
      question: "How do I separate multiple questions?",
      answer:
        "Leave a blank line between each question's block of options and the next question — that blank line is what tells the tool where one question ends and the next begins.",
    },
    {
      question: "Is my test content sent anywhere?",
      answer:
        "No — the test and answer key are generated entirely in your browser. Nothing is uploaded or stored.",
    },
  ],
};
