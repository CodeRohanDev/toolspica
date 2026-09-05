import type { ToolContent } from "./types";

export const chartGeneratorFromCsvContent: ToolContent = {
  heroSubtitle: "Turn CSV Data into a Quick Bar Chart",
  overview: [
    "Sometimes you just need to see the shape of a small dataset — is this month higher than last, which category stands out — without opening a full spreadsheet app, picking a chart type from a menu, and formatting axes. A quick visual read of a small CSV is often all that's actually needed.",
    "This tool takes CSV data, lets you pick which column holds the labels (like month names or categories) and which holds the numeric values, and instantly renders a bar chart directly from that data — no spreadsheet software, no chart wizard, just paste and pick two columns.",
    "This is a lightweight, single-chart-type tool (bar charts only) meant for a fast visual check of small-to-medium datasets, not a full charting library — for more chart types, custom styling, or genuinely large datasets, a dedicated spreadsheet app or charting tool is the better choice. This covers the common \"just show me the bars\" case quickly.",
  ],
  howItWorks: [
    { title: "Paste your CSV data", description: "Include a header row with column names." },
    { title: "Pick label and value columns", description: "Choose which column holds categories and which holds numbers." },
    { title: "View the chart", description: "A bar chart renders instantly from your selected columns." },
  ],
  examples: [
    {
      label: "Monthly sales",
      input: "month,sales\nJan,120\nFeb,180\nMar,150",
      output: "A three-bar chart showing Jan, Feb, and Mar sales values.",
    },
  ],
  faqs: [
    {
      question: "Can this generate line charts or pie charts instead of bars?",
      answer:
        "No — this tool generates bar charts only, focused on a fast visual read of category-vs-value data. For other chart types, a dedicated spreadsheet or charting tool is the better fit.",
    },
    {
      question: "What happens if my value column contains non-numeric text?",
      answer:
        "Non-numeric values are treated as zero in the chart, so make sure your selected value column actually contains numbers for an accurate result.",
    },
    {
      question: "Can I download the chart as an image?",
      answer:
        "Not directly through a button currently — you can right-click the rendered chart and save it as an image using your browser's built-in image-save option.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — the chart is rendered entirely in your browser using canvas. Nothing you paste is uploaded or stored.",
    },
  ],
};
