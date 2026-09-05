import type { ToolContent } from "./types";

export const bibliographyGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Full Bibliography from Multiple Sources",
  overview: [
    "A single citation is straightforward; a full bibliography or works-cited page — correctly alphabetized, consistently formatted, covering every source used in a paper — is where things get tedious to assemble by hand, especially once you're past five or six sources and need to double-check ordering and formatting consistency across all of them.",
    "This tool lets you add as many sources as you need, each with author, title, source, and year, then automatically alphabetizes them by author's last name and formats the entire list in your chosen citation style (APA, MLA, or Chicago) — producing a ready-to-paste bibliography or works-cited section rather than one citation at a time.",
    "Because a bibliography's whole value is in its consistency, this tool applies the exact same formatting rules to every entry in the list and keeps them in the right alphabetical order automatically as you add or edit sources, so you don't have to manually re-sort or re-check formatting each time you add one more reference.",
  ],
  howItWorks: [
    { title: "Add each source", description: "Enter author, title, source, and year for every reference you need to cite." },
    { title: "Pick a citation style", description: "Choose APA, MLA, or Chicago — the whole list reformats instantly." },
    { title: "Copy the full bibliography", description: "Get an alphabetized, consistently formatted list ready to paste into your paper." },
  ],
  examples: [
    {
      label: "Two sources, alphabetized",
      input: "Adams, John (2023); Smith, Jane (2025)",
      output: "Adams, John (2023). Title. Source.\n\nSmith, Jane (2025). Title. Source.",
    },
  ],
  faqs: [
    {
      question: "How is the list ordered?",
      answer:
        "Alphabetically by author's last name, automatically, matching the standard convention for APA, MLA, and Chicago bibliographies and works-cited pages.",
    },
    {
      question: "Can I remove or edit a source after adding it?",
      answer:
        "Yes — each source has its own remove button, and every field stays editable at any time, with the formatted list updating live as you make changes.",
    },
    {
      question: "Does switching citation style reformat every entry?",
      answer:
        "Yes — picking a different style (APA, MLA, or Chicago) instantly reformats every source in the list to match, so you don't need to re-enter anything when your assignment's required style changes.",
    },
    {
      question: "Is any of my source information saved or uploaded?",
      answer:
        "No — everything is generated and held entirely in your browser for the current session. Nothing is uploaded, and refreshing the page clears the list.",
    },
  ],
};
