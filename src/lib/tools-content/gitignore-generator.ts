import type { ToolContent } from "./types";

export const gitignoreGeneratorContent: ToolContent = {
  overview: [
    "A `.gitignore` file tells Git which files and folders to never track — build output, dependency directories, local environment files with secrets, and editor or OS-specific clutter that has no business being committed to a shared repository. Setting one up correctly at the start of a project prevents a whole category of common Git mistakes: accidentally committing `node_modules` (which can be hundreds of megabytes and is entirely regeneratable), leaking a `.env` file containing real API keys, or polluting a repository with `.DS_Store` files that mean nothing to anyone but your own Mac.",
    "This tool generates a combined `.gitignore` by letting you select any number of relevant templates for your project's stack and tooling, then concatenating them together with clear comment headers separating each section. Rather than hunting down and copy-pasting several separate reference files from different sources, you pick what applies (say, Node, React/Next.js, and macOS together) and get one clean, ready-to-use file covering everything at once.",
    "The available templates cover the combinations that come up constantly in real projects: language/runtime ecosystems (Node, Python, Java), popular frameworks (React/Next.js), and operating-system or editor-specific junk files (macOS's `.DS_Store`, Windows's `Thumbs.db`, VSCode's and IntelliJ's local settings folders) — since most real projects need at least one language template plus at least one OS/editor template, selecting multiple options and combining them is the normal, expected way to use this tool rather than an edge case.",
    "It's worth noting that a `.gitignore` only prevents files from being added going forward — it has no effect on files that are already tracked by Git. If a file you want ignored (like `.env`) has already been committed, you'll additionally need to remove it from Git's tracking (`git rm --cached <file>`) before the `.gitignore` rule takes effect for it.",
  ],
  howItWorks: [
    {
      title: "Select your stack",
      description: "Pick any combination of language, framework, and OS/editor templates.",
    },
    {
      title: "Review the combined output",
      description: "All selected templates are merged into one file with clear section headers.",
    },
    {
      title: "Copy into your project",
      description: "Save the result as a `.gitignore` file in your repository's root directory.",
    },
  ],
  examples: [
    {
      label: "Combining Node and macOS templates",
      input: "Selected: Node, macOS",
      output: "# Node\nnode_modules/\n...\n\n# macOS\n.DS_Store\n...",
    },
  ],
  faqs: [
    {
      question: "Will this remove files that are already tracked by Git?",
      answer:
        "No — a `.gitignore` file only prevents new, untracked files from being added in the future. If a file you want ignored (like a `.env` file) has already been committed, you need to explicitly untrack it first with `git rm --cached <filename>`, then commit that removal, before the ignore rule takes effect.",
    },
    {
      question: "Should I select multiple templates for my project?",
      answer:
        "Yes, generally — most real projects need at least one language/framework template (like Node or Python) plus at least one OS or editor template (like macOS or VSCode), since you're ignoring both your project's build artifacts and your own local development environment's clutter.",
    },
    {
      question: "Where should I place the .gitignore file?",
      answer:
        "In the root directory of your Git repository. Git also supports nested `.gitignore` files in subdirectories for folder-specific rules, but a single root-level file covers the vast majority of everyday needs.",
    },
    {
      question: "Why should I ignore node_modules instead of committing it?",
      answer:
        "It's entirely regeneratable from your `package.json` and lock file via `npm install`, and committing it would bloat your repository with potentially hundreds of megabytes of dependency code that has nothing to do with your actual project's history.",
    },
    {
      question: "Can I edit the generated .gitignore after downloading it?",
      answer:
        "Yes — it's a plain text file, and you should feel free to add project-specific entries beyond the templates provided here, like a custom build output directory or a specific local config file unique to your setup.",
    },
  ],
};
