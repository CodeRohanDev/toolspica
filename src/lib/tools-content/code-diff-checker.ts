import type { ToolContent } from "./types";

export const codeDiffCheckerContent: ToolContent = {
  heroSubtitle: "Compare Two Code Snippets, Line by Line",
  overview: [
    "Spotting exactly what changed between two versions of a function, config file, or code snippet by eye is slow and error-prone, especially once whitespace and reordering enter the picture. This tool runs a real line-based diff algorithm (longest common subsequence) between two code blocks and highlights every added and removed line clearly, color-coded and ready to scan.",
    "Unlike a naive line-by-line comparison, the LCS-based algorithm correctly identifies lines that moved or stayed the same even when other lines around them changed — so a single line inserted in the middle doesn't cause every subsequent line to falsely show as different, which is exactly the failure mode of simpler diff approaches.",
    "This is genuinely useful for reviewing a colleague's proposed code change pasted outside of a proper git diff, comparing two versions of a config file, or checking exactly what an AI tool or refactor changed in a function without needing a full version control setup.",
  ],
  howItWorks: [
    { title: "Paste original code", description: "The starting version of your snippet." },
    { title: "Paste modified code", description: "The changed version to compare against." },
    { title: "Review the highlighted diff", description: "Added lines in green, removed lines in red." },
  ],
  examples: [
    { label: "Comparing two function versions", input: "Original vs. refactored function", output: "Line-by-line diff showing exactly what changed" },
  ],
  faqs: [
    { question: "Does this diff by character or by line?", answer: "By line — it identifies which entire lines were added, removed, or stayed the same, rather than highlighting individual changed characters within a line." },
    { question: "Does it work for any programming language?", answer: "Yes — the diff algorithm is language-agnostic since it compares raw text lines, regardless of syntax." },
    { question: "Why does a single changed line sometimes show extra lines as different?", answer: "If whitespace or indentation also changed on that line, it counts as a different line entirely — the diff is exact-match based per line." },
    { question: "Is my code uploaded anywhere?", answer: "No — the comparison runs entirely in your browser." },
    { question: "Is this the same as a git diff?", answer: "Conceptually similar (same LCS-based approach many diff tools use), but this compares two pasted snippets directly rather than git history." },
  ],
};
