import type { ToolContent } from "./types";

export const handwritingPracticeSheetGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Printable Handwriting Practice Sheet",
  overview: [
    "Handwriting practice sheets follow a well-established format for a reason — ruled guide lines (a baseline, a midline, and a top line) teach consistent letter height and positioning far better than practicing on blank paper, which is why they're standard in early childhood education and handwriting-improvement workbooks alike.",
    "This tool generates a full-page practice sheet with your chosen text (letters, words, or a short phrase) repeated across multiple rows, each row built on proper three-line handwriting guides — a dashed top line, a dashed midline, and a solid baseline. The first row shows the text at full strength as a model to copy, and subsequent rows show it faded lighter, functioning as a tracing guide that gradually asks for more independent writing.",
    "The output is sized to standard US Letter paper for clean printing, making this useful for a parent or teacher creating quick practice sheets for a specific letter, word, or spelling list, without needing dedicated handwriting workbook software.",
  ],
  howItWorks: [
    { title: "Enter the text to practice", description: "Letters, a word, or a short phrase." },
    { title: "Choose the number of rows", description: "More rows means more repetition on one page." },
    { title: "Download and print", description: "Save as a Letter-sized PNG, ready to print." },
  ],
  examples: [
    {
      label: "Letter practice",
      input: "Text: \"ABC abc\", Rows: 6",
      output: "handwriting-practice.png — six rows of ruled lines with the text repeated, fading after the first row.",
    },
  ],
  faqs: [
    {
      question: "What do the three lines on each row represent?",
      answer:
        "The top dashed line marks the height for tall letters and capitals, the middle dashed line (midline) marks the height for lowercase letters, and the solid baseline is where every letter sits — the standard three-line format used in handwriting instruction.",
    },
    {
      question: "Why does the text get lighter after the first row?",
      answer:
        "The first row is a solid model to copy from, while the fainter rows are meant to be traced over directly, gradually building muscle memory — a common progression used in handwriting workbooks.",
    },
    {
      question: "Can I generate a sheet for a full word or short sentence?",
      answer:
        "Yes — enter any text, not just single letters. Shorter text repeats more times across the row width; longer phrases will repeat fewer times per row.",
    },
    {
      question: "Is my text sent anywhere?",
      answer:
        "No — the sheet is generated entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
