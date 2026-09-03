import type { ToolContent } from "./types";

export const sqlFormatterContent: ToolContent = {
  heroSubtitle: "Reindent a Single-Line SQL Query Into Readable, Clause-Broken SQL",
  overview: [
    "A SQL query copied from a log file, a database tool's query history, or an ORM's debug output often arrives as one dense, hard-to-scan line. This tool breaks it back apart onto separate lines around major clause keywords — SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, and more — making the query's actual structure immediately visible.",
    "It's a keyword-based reindenter rather than a full SQL parser: it recognizes and breaks on standard clause keywords and adds line breaks after commas in column or value lists, which handles the vast majority of everyday queries cleanly without needing to understand your specific database dialect's full grammar.",
    "This is genuinely useful for reviewing a complex query someone else wrote, debugging a slow query by seeing its clause structure at a glance, or just making a one-line query readable enough to paste into documentation or a code review comment.",
  ],
  howItWorks: [
    { title: "Paste your SQL query", description: "Single-line or already partially formatted." },
    { title: "Keywords are automatically reindented", description: "SELECT, FROM, WHERE, JOIN, and more break onto new lines." },
    { title: "Copy the formatted result", description: "A readable, clause-broken version of your query." },
  ],
  examples: [
    { label: "Formatting a one-line query", input: "select id, name from users where active = 1 order by name", output: "SELECT id,\\n  name\\nFROM users\\nWHERE active = 1\\nORDER BY name" },
  ],
  faqs: [
    { question: "Does this parse and validate my SQL syntax?", answer: "No — it's a keyword-based reindenter, not a full SQL parser, so it won't catch syntax errors or validate against a specific database dialect." },
    { question: "Does it work with any SQL dialect?", answer: "It recognizes standard ANSI SQL clause keywords common across MySQL, PostgreSQL, SQL Server, and SQLite." },
    { question: "Will this change my query's behavior?", answer: "No — it only adds line breaks and whitespace; the query logic and keywords remain exactly as written." },
    { question: "Is my query uploaded anywhere?", answer: "No — formatting happens entirely in your browser." },
    { question: "Can I minify a formatted query back down?", answer: "Yes — use our SQL Minifier tool to collapse a formatted query back to a single compact line." },
  ],
};
