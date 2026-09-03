import type { ToolContent } from "./types";

export const codeBeautifierContent: ToolContent = {
  heroSubtitle: "Reindent Minified or Messy Code Across C-Style Languages",
  overview: [
    "Minified or single-line code — JavaScript, JSON-like structures, CSS, or any C-style syntax using braces, brackets, and parentheses — is unreadable without reformatting. This tool reindents code generically by tracking bracket depth: opening braces, brackets, and parens increase indentation, closing ones decrease it, and semicolons break statements onto their own lines.",
    "It's a genuinely universal approach rather than a language-specific formatter: because it works purely on bracket and statement-terminator characters rather than parsing a specific language's grammar, it works reasonably well across JavaScript, C, Java, CSS, and other brace-delimited languages without needing to select which language you're formatting.",
    "This trades language-specific precision (like Prettier's deep understanding of JavaScript syntax) for broad applicability — useful for a quick reformat of minified code from any C-style language when you don't want to identify the exact language or install a dedicated formatter first.",
  ],
  howItWorks: [
    { title: "Paste minified or messy code", description: "JavaScript, CSS, JSON-like, or other brace-delimited code." },
    { title: "Structure rebuilds automatically", description: "Bracket depth tracking adds proper indentation." },
    { title: "Copy the beautified result", description: "Readable, indented code." },
  ],
  examples: [
    { label: "Beautifying a minified function", input: "function add(a,b){return a+b;}", output: "function add(a,b){\\n  return a+b;\\n}" },
  ],
  faqs: [
    { question: "Does this work for any programming language?", answer: "It works well for C-style languages using braces, brackets, and semicolons (JavaScript, Java, C, CSS); languages with significant whitespace like Python aren't a good fit for this approach." },
    { question: "Is this as accurate as a language-specific formatter like Prettier?", answer: "No — it's a generic bracket-depth reindenter, not a full language parser, so it won't handle every edge case a dedicated formatter would." },
    { question: "Will this change my code's logic?", answer: "No — only whitespace and line breaks are added; the actual code tokens remain unchanged." },
    { question: "Is my code uploaded anywhere?", answer: "No — beautification runs entirely in your browser." },
    { question: "Does it handle strings containing braces correctly?", answer: "This version doesn't specifically track string literal boundaries, so braces or semicolons inside string content can occasionally affect indentation — review the output for code with unusual string content." },
  ],
};
