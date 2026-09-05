import type { ToolContent } from "./types";

export const gitPatchDiffFileViewerContent: ToolContent = {
  heroSubtitle: "View a .patch or .diff File with Syntax Highlighting",
  overview: [
    "A raw .patch or .diff file is plain text, but reading it that way makes it hard to quickly tell what was added versus removed — the +/- prefixes are there, but without color they blend together in a wall of monospace text.",
    "This tool color-codes a patch or diff file line by line: added lines in green, removed lines in red, hunk headers (the @@ markers showing line numbers) in blue, and file headers bolded — the same visual convention used by Git and GitHub's own diff views — plus a summary count of total lines added and removed.",
    "This works with standard unified diff format, the output of `git diff`, `git format-patch`, and most version control and code review tools, since that format is the de facto standard for representing line-based changes.",
  ],
  howItWorks: [
    { title: "Paste or upload the patch file", description: "Paste the diff text directly, or upload a .patch or .diff file." },
    { title: "Review the color-coded view", description: "Added, removed, and header lines are visually distinguished." },
    { title: "Check the summary count", description: "See the total lines added and removed at a glance." },
  ],
  examples: [
    {
      label: "Simple diff",
      input: "-const x = 1;\n+const x = 2;",
      output: "The removed line shown in red, the added line shown in green.",
    },
  ],
  faqs: [
    {
      question: "What diff format does this expect?",
      answer:
        "Standard unified diff format — the output of `git diff`, `git format-patch`, and most version control systems and code review tools use this same format.",
    },
    {
      question: "Does this apply the patch to any files?",
      answer:
        "No — this only visualizes the diff content for reading; it doesn't apply changes to any actual files. Use `git apply` or your version control tool to actually apply a patch.",
    },
    {
      question: "Can I view a multi-file patch?",
      answer:
        "Yes — file header lines (+++ and ---) are highlighted separately, making it easy to see where one file's changes end and the next file's changes begin in a multi-file patch.",
    },
    {
      question: "Is my patch content sent anywhere?",
      answer:
        "No — the entire view is rendered in your browser. Nothing you paste or upload is sent to a server.",
    },
  ],
};
