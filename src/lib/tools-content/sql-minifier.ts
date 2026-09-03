import type { ToolContent } from "./types";

export const sqlMinifierContent: ToolContent = {
  heroSubtitle: "Collapse a Formatted SQL Query Into a Single Compact Line",
  overview: [
    "A carefully formatted, multi-line SQL query is great for reading in a code editor, but sometimes you need it as a single compact line — pasting into a config value, a one-line log statement, or a system that doesn't handle multi-line strings gracefully. This tool strips comments and collapses all whitespace and line breaks down to single spaces.",
    "Both single-line (`--`) and block (`/* */`) SQL comments are removed before whitespace collapsing, so any inline documentation in your query doesn't end up jammed into the minified output. The result is functionally identical SQL, just without the formatting.",
    "Useful for embedding a query into a single-line environment variable, a one-line curl command, or any context where a multi-line formatted query would need to be manually reflowed anyway.",
  ],
  howItWorks: [
    { title: "Paste your formatted SQL", description: "Multi-line, indented, with or without comments." },
    { title: "Comments and line breaks collapse", description: "Everything reduces to a single line." },
    { title: "Copy the compact result", description: "Ready to paste anywhere a single line is needed." },
  ],
  examples: [
    { label: "Minifying a formatted query", input: "SELECT id, name\\nFROM users\\n-- active only\\nWHERE active = 1", output: "SELECT id, name FROM users WHERE active = 1" },
  ],
  faqs: [
    { question: "Are both comment styles supported?", answer: "Yes — both single-line (--) and block (/* */) comment styles are stripped before minification." },
    { question: "Does this change my query's logic?", answer: "No — only comments and whitespace are removed; the SQL keywords and structure remain functionally identical." },
    { question: "Is my query uploaded anywhere?", answer: "No — minification happens entirely in your browser." },
    { question: "Can I reformat a minified query back to readable form?", answer: "Yes — paste the result into our SQL Formatter tool to reindent it around clause keywords." },
    { question: "Does this work on any SQL dialect?", answer: "Yes — comment and whitespace handling work the same way across MySQL, PostgreSQL, SQL Server, and SQLite." },
  ],
};
