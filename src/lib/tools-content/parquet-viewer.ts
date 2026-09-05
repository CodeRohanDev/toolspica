import type { ToolContent } from "./types";

export const parquetViewerContent: ToolContent = {
  heroSubtitle: "View a Parquet File's Data as a Table",
  overview: [
    "Apache Parquet is the standard columnar storage format across data engineering, analytics, and machine learning pipelines — but its binary, column-oriented structure makes it completely unreadable without specialized tooling like a Python script or a full data platform, even for a quick check of what a file actually contains.",
    "This tool reads a .parquet file directly in your browser and displays its data as a familiar table — column names as headers, rows of actual data below — along with the file's total row and column counts, without needing pandas, Spark, or any data platform installed.",
    "For files with a large number of rows, only the first 200 are loaded and displayed, since the goal here is a quick look at a file's schema and sample data rather than a full data-processing tool — for actual data analysis at scale, a proper data engineering tool is still the right choice.",
  ],
  howItWorks: [
    { title: "Upload a .parquet file", description: "Choose a Parquet file from your device." },
    { title: "Review the schema and data", description: "See column names and the first 200 rows of actual data." },
    { title: "Check the total row count", description: "The full file's row count is shown even though only a sample is displayed." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A Parquet file exported from a data pipeline",
      output: "A table showing column headers and the first 200 rows of data, with total row count noted.",
    },
  ],
  faqs: [
    {
      question: "Why does this only show the first 200 rows?",
      answer:
        "This is designed for a quick look at a file's structure and sample data, not full-scale data processing — for analyzing every row of a large dataset, a dedicated data engineering tool (Python/pandas, Spark) is the right fit.",
    },
    {
      question: "What Parquet features are supported?",
      answer:
        "This supports all standard Parquet types, encodings, and compression codecs used in the format, since it's built on a parser designed to handle the full Parquet specification.",
    },
    {
      question: "Does this work on very large Parquet files?",
      answer:
        "The tool reads file metadata and only the rows needed for the sample display, so it doesn't need to load an entire multi-gigabyte file into memory just to preview it.",
    },
    {
      question: "Is my Parquet file uploaded to a server?",
      answer:
        "No — the file is read and parsed entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
