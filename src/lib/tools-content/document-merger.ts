import type { ToolContent } from "./types";

export const documentMergerContent: ToolContent = {
  heroSubtitle: "Combine Multiple Text or Word Documents into One",
  overview: [
    "Combining several separate documents — meeting notes from different sessions, chapters drafted as separate files, contributions collected from different people — into a single file is a genuinely common cleanup task before sharing or archiving, usually done by manually copy-pasting content between open windows.",
    "This tool takes multiple .txt or .docx files, lets you reorder them into the sequence you want, and merges them into a single .docx document — each source file's name inserted as a heading before its content, so the combined document stays clearly organized by original source.",
    "Text-only content transfers over — original formatting like bold, italics, and images from source .docx files isn't preserved in the merge, since this focuses on combining plain content correctly rather than replicating every formatting detail from each source file.",
  ],
  howItWorks: [
    { title: "Add your files", description: "Upload multiple .txt or .docx files." },
    { title: "Reorder if needed", description: "Use the up/down arrows to set the final document order." },
    { title: "Merge and download", description: "Get a single .docx combining all files, each labeled by its original filename." },
  ],
  examples: [
    {
      label: "Three files merged",
      input: "notes-monday.txt, notes-tuesday.txt, notes-wednesday.docx",
      output: "merged-document.docx — all three combined, each under its own filename heading.",
    },
  ],
  faqs: [
    {
      question: "Does this preserve formatting from the original .docx files?",
      answer:
        "No — only the plain text content is extracted and merged; bold, italics, images, and other formatting from source .docx files aren't carried over into the combined document.",
    },
    {
      question: "Can I change the order the files are merged in?",
      answer:
        "Yes — use the up and down arrows next to each file to reorder them before merging; the final document follows whatever order is shown in the list.",
    },
    {
      question: "Can I merge .pdf files with this tool?",
      answer:
        "No — this supports .txt and .docx files only. For combining PDFs specifically, use this site's dedicated PDF Merge tool instead.",
    },
    {
      question: "Are my files uploaded to a server?",
      answer:
        "No — every file is read and merged entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
