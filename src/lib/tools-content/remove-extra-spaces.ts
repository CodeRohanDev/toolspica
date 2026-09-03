import type { ToolContent } from "./types";

export const removeExtraSpacesContent: ToolContent = {
  overview: [
    "Extra spaces creep into text constantly and quietly: two spaces after a period (a typing habit many people learned on typewriters, where it made sense, but which modern proportional fonts don't need), a stray double space left behind after deleting a word, or a whole block of oddly-spaced text pasted from a PDF or a table where column alignment relied on repeated spaces instead of real formatting. Individually these are invisible in a text editor, but they cause real problems downstream: extra spaces can break exact-match searches, inflate character counts against a strict limit, look sloppy in published copy, and occasionally cause visible double-gaps in rendered HTML or a document layout.",
    "This tool does one job well: it collapses every run of two or more spaces or tabs on a line down to a single space, and (by default) trims any leading or trailing whitespace from each line so text doesn't start or end with invisible padding. A separate toggle lets you also strip out entirely blank lines, which is useful when text was pasted with extra paragraph breaks between every line — common when copying from a PDF or a webpage that used empty paragraphs for visual spacing rather than proper formatting.",
    "It's a narrower, more predictable tool than a full text cleaner: it only touches whitespace, never removing punctuation, HTML, or actual words, which makes it safe to run on any text without worrying about it altering content you didn't intend to change. The result shows exactly how many extra spaces were removed, so you get quick confirmation of what changed even when the difference isn't visually obvious at a glance.",
    "Everything runs instantly in your browser as you type or paste, using a straightforward regular expression pass over each line — there's no upload, no file size limit, and no noticeable delay even on long documents.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Drop in text with inconsistent or doubled-up spacing.",
    },
    {
      title: "Choose your options",
      description: "Decide whether to trim each line's edges and remove fully blank lines.",
    },
    {
      title: "Copy the cleaned text",
      description: "The result, with a count of spaces removed, appears instantly.",
    },
  ],
  examples: [
    {
      label: "Doubled spaces after periods",
      input: "This is a  sentence.  It has  extra spaces.",
      output: "This is a sentence. It has extra spaces.",
    },
  ],
  faqs: [
    {
      question: "Does this remove the space between two separate paragraphs?",
      answer:
        "Only if you turn on \"Remove blank lines\" — by default, blank lines separating paragraphs are left alone, since that spacing is usually intentional. The core collapsing behavior only affects runs of spaces and tabs within a single line.",
    },
    {
      question: "Will this fix spacing inside a table pasted from a PDF?",
      answer:
        "It will collapse repeated spaces used to fake column alignment, but since it only works with plain text (not the original table structure), the result may need manual reformatting if you need the columns to stay visually aligned — text-based space alignment doesn't survive proportional-font rendering anyway.",
    },
    {
      question: "Does it convert tabs to spaces?",
      answer:
        "It treats runs of spaces and tabs together as a single unit when collapsing, so a mix like \"word \\t\\t word\" becomes \"word word\" — a single regular space, not a preserved tab character.",
    },
    {
      question: "Is this different from Text Cleaner?",
      answer:
        "Yes — this tool is a focused subset that only handles spacing issues (collapsing, trimming, optional blank-line removal). Text Cleaner additionally strips HTML tags, joins broken line breaks, and removes special characters, for messier text that needs more than a spacing fix.",
    },
    {
      question: "Can I undo the change if I don't like the result?",
      answer:
        "The tool doesn't modify your original input box — it shows the cleaned version separately below, so your original pasted text stays untouched above and you can always start over by editing it directly.",
    },
  ],
};
