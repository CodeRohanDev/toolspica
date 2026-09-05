import type { ToolContent } from "./types";

export const flashcardMakerContent: ToolContent = {
  heroSubtitle: "Turn a Term List Into Flippable Study Flashcards",
  overview: [
    "Flashcards work because they force active recall — trying to remember the answer before seeing it, rather than just re-reading notes passively — which research on learning consistently shows is far more effective for retention than passive review. Physical index cards work fine but are easy to lose, hard to reorganize, and inconvenient to study from a phone.",
    "This tool turns a plain list of term-and-definition pairs (one per line, separated by a pipe character) into an interactive flashcard deck — click a card to flip between the term and its definition, and navigate through the deck with Previous and Next buttons, all directly in the browser with no account or app install needed.",
    "Because the deck is built from plain text you type or paste, it's easy to reuse — copy a term list from your notes, a textbook glossary, or a study guide, paste it in with the term-and-definition format, and the deck is ready immediately. There's no save/sync between sessions currently, so treat this as a quick study session tool rather than a long-term flashcard library.",
  ],
  howItWorks: [
    { title: "Enter term | definition pairs", description: "One per line, separated by a pipe character." },
    { title: "Click to flip", description: "Click a card to reveal the definition, click again to flip back." },
    { title: "Navigate the deck", description: "Use Previous and Next to move through all your cards." },
  ],
  examples: [
    {
      label: "Sample deck",
      input: "Mitochondria | The powerhouse of the cell\nPhotosynthesis | The process plants use to convert light into energy",
      output: "A two-card deck you can flip through and study.",
    },
  ],
  faqs: [
    {
      question: "Can I save my flashcard deck for later?",
      answer:
        "Not currently — the deck exists only in your browser for the current session. Keep your original term list saved as a text file or note so you can paste it back in next time.",
    },
    {
      question: "Is there a limit to how many cards I can add?",
      answer:
        "No hard limit — add as many term-and-definition pairs as you need, though a very long list may be easier to study in smaller focused sessions.",
    },
    {
      question: "What if my definition contains a pipe character?",
      answer:
        "Only the first pipe character on each line splits term from definition, so any additional pipe characters within the definition text are preserved as part of it.",
    },
    {
      question: "Is my flashcard content sent anywhere?",
      answer:
        "No — everything runs entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
