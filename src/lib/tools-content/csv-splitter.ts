import type { ToolContent } from "./types";

export const csvSplitterContent: ToolContent = {
  heroSubtitle: "Split a Large CSV File into Smaller Chunks",
  overview: [
    "A large CSV file sometimes needs to be broken into smaller pieces — a system with a row-count import limit, distributing chunks of data across a team, or splitting one big export into manageable batches for testing. Doing this manually means counting rows and copy-pasting sections one at a time.",
    "This tool takes CSV data and splits it into multiple smaller CSV files based on a row count you specify, with the original header row automatically repeated at the top of every chunk — so each resulting file is immediately valid and usable on its own, not just a headerless fragment.",
    "Each chunk is shown individually with its own copy and download buttons, so you can grab exactly the pieces you need rather than downloading everything as one bundled archive. The row count you set applies to data rows only — the repeated header in each file doesn't count toward that limit.",
  ],
  howItWorks: [
    { title: "Paste your CSV data", description: "Paste the full CSV content you want to split." },
    { title: "Set rows per file", description: "Choose how many data rows each resulting chunk should contain." },
    { title: "Copy or download each chunk", description: "Each split file includes the original header and is ready to use immediately." },
  ],
  examples: [
    {
      label: "4 rows split into chunks of 2",
      input: "name,age\nAlice,30\nBob,25\nCarol,28\nDave,35 (rows per file: 2)",
      output: "split-1.csv (Alice, Bob) and split-2.csv (Carol, Dave), each with the header row.",
    },
  ],
  faqs: [
    {
      question: "Does every split file include the header row?",
      answer:
        "Yes — the original header row is automatically repeated at the top of every chunk, so each file is immediately valid and usable on its own without needing the header re-added manually.",
    },
    {
      question: "Does the header row count toward the rows-per-file limit?",
      answer:
        "No — the rows-per-file setting applies only to data rows. The header is added on top of that count in every chunk.",
    },
    {
      question: "Can I download all the split files at once?",
      answer:
        "Each chunk has its own individual download button — there's currently no single \"download all as zip\" option, so files are saved one at a time.",
    },
    {
      question: "Is my CSV data sent anywhere?",
      answer:
        "No — splitting happens entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};
