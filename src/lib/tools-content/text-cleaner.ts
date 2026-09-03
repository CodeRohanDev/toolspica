import type { ToolContent } from "./types";

export const textCleanerContent: ToolContent = {
  overview: [
    "Text copied from a webpage, a PDF, an email, or a chat app almost never comes out clean. It arrives with leftover HTML tags from a copy-paste that grabbed formatting along with the words, double and triple spaces where line-wrapping or table columns collapsed oddly, stray line breaks in the middle of what should be one paragraph, and odd symbols left behind by a font-encoding mismatch. Text Cleaner runs a configurable set of cleanup passes over pasted text in one click, instead of you manually hunting down and fixing each of these issues by hand.",
    "Five independent toggles control exactly what gets cleaned. \"Strip HTML tags\" removes anything that looks like a markup tag (`<div>`, `<span style=\"...\">`, `<br>`, and so on) — common when copying from a rendered webpage or an HTML email that carried its formatting along for the ride. \"Collapse extra spaces\" reduces any run of multiple spaces or tabs down to a single space and trims leading/trailing whitespace from every line, fixing the ragged spacing that often comes from copying a table or a PDF with unusual column alignment. \"Remove line breaks\" joins everything onto fewer lines by turning line breaks into single spaces — useful when a paragraph got broken across many short lines by a narrow source column and you want it flowing as normal prose again. \"Remove special characters\" strips out anything that isn't a standard letter, number, common punctuation mark, or whitespace, which cleans up stray symbols, smart-quote artifacts, or encoding glitches (mangled character sequences that show up as odd marks when a document's encoding doesn't match what's expected). \"Trim start/end whitespace\" removes any blank space at the very beginning or end of the whole text block.",
    "Because each pass is a toggle rather than a fixed pipeline, you control exactly how aggressive the cleanup is — turn on just \"Strip HTML tags\" if that's your only problem, or combine all five for a maximally aggressive clean when pasting from a genuinely messy source. The defaults (HTML stripping, space collapsing, and trimming enabled; line-break removal and special-character stripping off) cover the most common case — pasted web content — without being so aggressive that it accidentally mangles well-formatted text.",
  ],
  howItWorks: [
    {
      title: "Paste your messy text",
      description: "Drop in text copied from a webpage, PDF, email, or chat.",
    },
    {
      title: "Toggle the cleanup passes you need",
      description:
        "Turn on HTML stripping, space collapsing, line-break removal, or special-character removal as needed.",
    },
    {
      title: "Copy the cleaned result",
      description: "The cleaned text updates instantly and is ready to copy.",
    },
  ],
  examples: [
    {
      label: "Cleaning pasted web content",
      input: "<p>Hello   <b>world</b>!!  \n\n  Extra   spaces here.</p>",
      output: "Hello world!! Extra spaces here.",
    },
  ],
  faqs: [
    {
      question: "Will Strip HTML tags remove the actual text content too?",
      answer:
        "No — it only removes the tags themselves (like `<div>` or `<b>`), leaving the text content between them intact. \"Hello <b>world</b>\" becomes \"Hello world\", not an empty string.",
    },
    {
      question: "Why is Remove line breaks turned off by default?",
      answer:
        "Because it's a destructive change for text that's already correctly formatted — joining every line into one flowing paragraph is only useful when a paragraph got artificially broken into short lines by a narrow source column, and turning it on for already-correct text would incorrectly merge separate paragraphs together.",
    },
    {
      question: "What counts as a \"special character\" that gets removed?",
      answer:
        "Anything other than letters, numbers, whitespace, and a small set of common punctuation (periods, commas, exclamation points, question marks, quotes, and hyphens). This is aimed at removing encoding artifacts and stray symbols, not stripping normal sentence punctuation.",
    },
    {
      question: "Can I clean text without collapsing intentional double spaces?",
      answer:
        "Turn off \"Collapse extra spaces\" if you specifically need to preserve multiple consecutive spaces — for example, in text meant to align in a monospace font. With it off, only the other selected cleanup passes run.",
    },
    {
      question: "Is this the same as the Remove Extra Spaces tool?",
      answer:
        "Remove Extra Spaces is a smaller, focused version of just the spacing-cleanup part of this tool. Text Cleaner adds HTML stripping, line-break joining, and special-character removal on top, for messier text that needs more than just spacing fixed.",
    },
  ],
};
