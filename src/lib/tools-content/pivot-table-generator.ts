import type { ToolContent } from "./types";

export const pivotTableGeneratorContent: ToolContent = {
  heroSubtitle: "Summarize CSV Data into a Pivot Table",
  overview: [
    "A raw list of transactions or records — sales by region and product, survey responses by category — hides its own patterns until it's summarized: totals by group, counts by category, averages across a dimension. Building that summary by hand means manually grouping and adding up rows, or opening a full spreadsheet app just for one quick summary.",
    "This tool takes CSV data and builds a real pivot table: pick which column becomes the row grouping, which becomes the column grouping, which numeric column gets aggregated, and how (sum, count, or average) — and see the summarized cross-tabulation instantly, with row and column totals calculated automatically.",
    "This performs the actual pivot calculation, not just a preview — every cell shows the real aggregated value for that row-and-column combination, computed directly from your data, exportable as CSV to drop into a report or further analysis.",
  ],
  howItWorks: [
    { title: "Paste your CSV data", description: "Include a header row identifying each column." },
    { title: "Pick row, column, and value fields", description: "Choose which columns to group by and which to aggregate." },
    { title: "Choose an aggregation", description: "Sum, count, or average — see the pivot table update instantly." },
  ],
  examples: [
    {
      label: "Sales by region and product",
      input: "region,product,sales data, Rows: region, Columns: product, Values: sales, Sum",
      output: "A table showing total sales for each region-product combination, with row/column totals.",
    },
  ],
  faqs: [
    {
      question: "What's the difference between Sum, Count, and Average?",
      answer:
        "Sum adds up all matching values, Count counts how many rows match (ignoring the actual values), and Average divides the sum by the count — pick whichever answers the question you actually need about your data.",
    },
    {
      question: "Can I export the pivot table result?",
      answer:
        "Yes — the \"Copy as CSV\" button copies the summarized table exactly as shown, ready to paste into a spreadsheet or report.",
    },
    {
      question: "What happens if my value column contains non-numeric data?",
      answer:
        "Non-numeric values are treated as zero for Sum and Average calculations, so make sure your selected value column actually contains numbers for a meaningful result.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — the entire pivot calculation runs in your browser using JavaScript. Nothing you paste is uploaded or stored.",
    },
  ],
};
