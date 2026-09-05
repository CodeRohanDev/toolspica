import type { ToolContent } from "./types";

export const citationGeneratorContent: ToolContent = {
  heroSubtitle: "Generate APA, MLA & Chicago Citations Instantly",
  overview: [
    "Every academic paper and most serious research writing requires citing sources in a specific, consistent format — but the exact punctuation, ordering, and formatting rules for APA, MLA, and Chicago style are genuinely easy to get wrong or forget between assignments, especially when you're switching between styles for different classes or publications.",
    "This tool takes the basic details of a source — author, title, publisher or source name, year, and an optional URL — and formats them correctly in all three of the most commonly required academic citation styles at once: APA (common in social sciences and psychology), MLA (common in humanities and literature), and Chicago (common in history and some social sciences). Each format follows the specific punctuation and ordering conventions for that style, so you don't have to memorize where the parentheses, periods, and quotation marks go.",
    "Because citation requirements vary a lot by source type (a book, a journal article, a webpage, and an interview all technically have slightly different citation templates in the full style guides), this tool generates the general-purpose \"webpage or article\" format that covers the large majority of everyday citation needs. For highly specific source types (legal documents, government reports, multi-author academic papers), check the specific rule in your assigned style guide.",
  ],
  howItWorks: [
    { title: "Enter source details", description: "Fill in author, title, source, year, and an optional URL." },
    { title: "Review all three formats", description: "See the citation formatted correctly in APA, MLA, and Chicago style at once." },
    { title: "Copy the one you need", description: "Copy the citation in whichever style your assignment requires." },
  ],
  examples: [
    {
      label: "Example source",
      input: "Author: Smith, Jane, Title: Climate Trends, Source: Nature, Year: 2025",
      output: "APA: Smith, Jane (2025). Climate Trends. Nature.\nMLA: Smith, Jane. \"Climate Trends.\" Nature, 2025.",
    },
  ],
  faqs: [
    {
      question: "Which citation style should I use?",
      answer:
        "It depends on your field or your assignment's requirements — APA is common in psychology and social sciences, MLA in literature and humanities, and Chicago in history. Check with your instructor or publication's style guide if you're unsure.",
    },
    {
      question: "Does this handle books, videos, or interviews differently from webpages?",
      answer:
        "This tool generates the general article/webpage citation format, which covers most everyday sourcing needs. Books, videos, interviews, and legal sources each have their own specific templates in the full style guides — check those directly for less common source types.",
    },
    {
      question: "What if I don't have a URL for the source?",
      answer:
        "Leave the URL field blank — the citation will still generate correctly without it, formatted as a print or non-web source.",
    },
    {
      question: "Is my source information sent anywhere?",
      answer:
        "No — citations are formatted entirely in your browser as you type. Nothing is uploaded or stored.",
    },
  ],
};
