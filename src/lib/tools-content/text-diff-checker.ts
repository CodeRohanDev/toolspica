import type { ToolContent } from "./types";

export const textDiffCheckerContent: ToolContent = {
  heroSubtitle: "Compare Two Blocks of Text and See Exactly What Changed",
  overview: [
    "Comparing two versions of a document, a paragraph, or a block of code by eye is slow and unreliable — small changes like a swapped word, a removed sentence, or a shifted line easily hide in plain sight when you're scanning two blocks of text side by side. A proper diff tool solves this by computing the actual line-by-line differences and highlighting exactly what was added and what was removed, the same underlying approach version control systems like Git use to show you what changed in a commit.",
    "This tool compares two blocks of text you paste in — an \"original\" and a \"changed\" version — and produces a line-by-line diff: lines only in the changed version are marked as additions, lines only in the original are marked as removals, and unchanged lines are shown as context so you can see where the changes sit. A summary count of lines added and removed gives you an at-a-glance sense of how substantial the edit was before you read the detail.",
    "This is a line-based diff, meaning it compares whole lines against each other rather than tracking word-level or character-level changes within a line — that makes it fast and easy to read for comparing paragraphs, articles, configuration files, or code, though a single-character change inside a long line will still show that whole line as changed rather than highlighting just the one character that moved.",
  ],
  howItWorks: [
    { title: "Paste the original text", description: "Paste the first, original version into the left box." },
    { title: "Paste the changed text", description: "Paste the updated version into the right box." },
    { title: "Review the diff", description: "See added lines, removed lines, and a summary count of the changes." },
  ],
  examples: [
    {
      label: "Simple line change",
      input: "Original: \"The quick brown fox.\"\nChanged: \"The quick red fox jumps.\"",
      output: "- The quick brown fox.\n+ The quick red fox jumps.",
    },
  ],
  faqs: [
    {
      question: "Does this compare word-by-word or whole lines?",
      answer:
        "This is a line-based diff — it compares entire lines against each other. If even one word changes within a line, that whole line is shown as removed and its replacement as added, rather than highlighting just the specific word that changed.",
    },
    {
      question: "Can I use this to compare code files?",
      answer:
        "Yes — line-based diffing is exactly how tools like Git show changes, so this works well for comparing code, configuration files, or any plain-text content organized into lines.",
    },
    {
      question: "Is there a limit to how much text I can compare?",
      answer:
        "There's no hard-coded limit, but very large documents (thousands of lines) may take a moment to render and scroll through, since the entire diff is computed and displayed in your browser at once.",
    },
    {
      question: "Is either block of text uploaded anywhere?",
      answer:
        "No — the comparison runs entirely in your browser using JavaScript. Neither text block is ever sent to a server.",
    },
  ],
};
