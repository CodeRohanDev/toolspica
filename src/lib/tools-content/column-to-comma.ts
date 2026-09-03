import type { ToolContent } from "./types";

export const columnToCommaContent: ToolContent = {
  overview: [
    "Spreadsheet and database exports frequently give you data as a single column — one value per row, pasted as one value per line once you copy it into a text editor — but plenty of other places you need that same data expect a comma-separated (or semicolon- or pipe-separated) list instead: a SQL `IN (...)` clause, a comma-separated tag field, a JavaScript array you're about to paste into code, or a form field that only accepts a single-line, delimited value.",
    "Retyping or manually joining a column of values with commas is exactly the kind of mechanical, error-prone task worth automating — miss a comma, add an extra space inconsistently, or forget to skip a stray blank row, and you end up debugging a subtly malformed list. This tool takes a column of values (pasted directly from a spreadsheet, one per line) and joins them with your choice of separator, handling the spacing and formatting consistently every time.",
    "Three separator choices cover the situations that come up most often: comma (the default and most universal choice, used in CSV-adjacent contexts, SQL IN clauses, and general lists), semicolon (common in some European CSV conventions and certain data formats that reserve the comma for decimal points), and pipe (commonly used as a delimiter specifically because it rarely appears naturally within the data itself, unlike commas which can appear inside text values).",
    "The \"wrap each value in quotes\" option is essential for a specific common use case: building a SQL `IN ('value1', 'value2', 'value3')` clause or a JavaScript array of strings (`[\"value1\", \"value2\"]`) both require each individual value to be quoted, not just separated by commas — this tool handles that formatting automatically rather than requiring you to add quotes to every line by hand.",
  ],
  howItWorks: [
    {
      title: "Paste your column of values",
      description: "One value per line, exactly as copied from a spreadsheet or list.",
    },
    {
      title: "Choose a separator and formatting",
      description: "Pick comma, semicolon, or pipe, and whether to wrap each value in quotes.",
    },
    {
      title: "Copy the joined result",
      description: "A single-line, delimited string is generated instantly.",
    },
  ],
  examples: [
    {
      label: "Joining a column with quotes (for SQL or code)",
      input: "apple\nbanana\ncherry",
      output: '"apple", "banana", "cherry"',
    },
  ],
  faqs: [
    {
      question: "Can I convert back from a comma-separated list to a column?",
      answer:
        "Not with this tool directly — it's built for the column-to-list direction. For the reverse, a quick Find & Replace (replacing your separator with a line break) works well.",
    },
    {
      question: "Why would I need quotes around each value?",
      answer:
        "Building a SQL `IN ('a', 'b', 'c')` clause or a JavaScript array of strings both require each value individually wrapped in quotes — this option adds that formatting automatically so you don't have to edit every line by hand.",
    },
    {
      question: "What happens to blank lines in my pasted column?",
      answer:
        "By default they're skipped entirely (via \"Skip empty lines\"), so a stray blank row from your spreadadsheet doesn't produce an empty, awkward entry in your joined list. Turn the option off if you specifically want blank entries preserved.",
    },
    {
      question: "Does this trim extra spaces from each value?",
      answer:
        "Yes — each line is trimmed of leading and trailing whitespace before joining, so accidental spacing from copying out of a spreadsheet cell doesn't carry through into your final list.",
    },
    {
      question: "Why choose pipe instead of comma as a separator?",
      answer:
        "Pipe (|) is a common choice specifically when your actual data values might themselves contain commas — using a separator that's unlikely to appear naturally within the data avoids ambiguity about where one value ends and the next begins.",
    },
  ],
};
