import type { ToolContent } from "./types";

export const splitArchiveBySizeContent: ToolContent = {
  heroSubtitle: "Split Any Large File Into Size-Limited Parts",
  overview: [
    "A large archive or file that exceeds an upload limit, an email attachment cap, or a USB drive's file size restriction sometimes just needs to be broken into smaller pieces to move around. This tool splits any file into raw byte-range parts, each capped at a size you choose.",
    "This is a generic byte split, not a self-extracting or archive-aware multi-volume format — it works on literally any file (an archive, a video, a disk image) by cutting it at fixed byte boundaries into sequentially numbered parts (.001, .002, and so on).",
    "To reassemble the original file, the parts need to be concatenated back together in order — on Mac or Linux, `cat file.001 file.002 > file` does this; on Windows, `copy /b file.001+file.002 file` achieves the same result from the command line.",
    "Everything happens locally in your browser — the file is read and split into parts entirely on your device, with nothing uploaded to a server during the process.",
  ],
  howItWorks: [
    { title: "Upload any large file", description: "Works on archives, videos, or any file type." },
    { title: "Set the max size per part", description: "Choose your target size limit in MB." },
    { title: "Download the numbered parts", description: "Reassemble later by concatenating them in order." },
  ],
  examples: [
    { label: "Splitting a large file to fit a size limit", input: "500MB file, 100MB per part", output: "5 parts named .001 through .005" },
  ],
  faqs: [
    { question: "How do I put the file back together?", answer: "Concatenate the parts in order: `cat file.001 file.002 > file` on Mac/Linux, or `copy /b file.001+file.002 file` on Windows." },
    { question: "Is this the same as a multi-volume ZIP or RAR?", answer: "No — this is a generic byte split that works on any file type, not an archive-format-aware multi-volume split. The parts on their own aren't openable as archives until reassembled." },
    { question: "Is my file uploaded anywhere?", answer: "No — splitting happens entirely in your browser; the file never leaves your device." },
    { question: "Can I split any file type with this?", answer: "Yes — since it's a raw byte split with no understanding of the file's format, it works identically on any file, archive or otherwise." },
    { question: "What happens to the last part if the file doesn't divide evenly?", answer: "The final part is simply whatever bytes remain, which will usually be smaller than your specified maximum size." },
  ],
};
