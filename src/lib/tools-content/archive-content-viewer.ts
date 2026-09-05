import type { ToolContent } from "./types";

export const archiveContentViewerContent: ToolContent = {
  heroSubtitle: "See What's Inside a ZIP, TAR, 7Z, or RAR Without Extracting",
  overview: [
    "Checking what's actually inside an archive file before committing to extract it — is this the right download, does it contain what you expect — usually means extracting it first and then looking, which wastes time and disk space if it turns out to be the wrong file.",
    "This tool reads an archive's internal file listing directly in your browser and shows every contained file's name and size in a table, without writing anything to your device's disk — supporting ZIP, TAR, 7Z, RAR, and GZIP, the most common archive formats.",
    "This works by decompressing the archive into browser memory to build an accurate listing (rather than just reading a lightweight index, which not every format exposes cleanly), so very large archives may take a moment longer than a simple index read would.",
  ],
  howItWorks: [
    { title: "Upload an archive file", description: "Choose a .zip, .tar, .7z, .rar, or .gz file." },
    { title: "Review the file listing", description: "See every contained file's name and size." },
    { title: "Check the total size", description: "A summary shows total file count and combined size." },
  ],
  examples: [
    {
      label: "Checking a download",
      input: "project-backup.zip",
      output: "A table listing every file inside, e.g. src/index.js (2.1 KB), README.md (890 B).",
    },
  ],
  faqs: [
    {
      question: "Which archive formats are supported?",
      answer:
        "ZIP, TAR, 7Z, RAR, and GZIP — the most widely used archive formats, all handled through the same underlying archive engine.",
    },
    {
      question: "Does this work on password-protected archives?",
      answer:
        "No — password-protected archives currently aren't supported for listing; you'll see an error if the archive requires a password to read.",
    },
    {
      question: "Does this extract the files to my device?",
      answer:
        "No — files are read into browser memory only to build the listing. Nothing is written to your device's disk unless you separately choose to extract the archive with another tool.",
    },
    {
      question: "Is my archive uploaded to a server?",
      answer:
        "No — the entire listing is generated in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
