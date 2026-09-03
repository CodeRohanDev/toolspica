import type { ToolContent } from "./types";

export const zipCreatorContent: ToolContent = {
  heroSubtitle: "Bundle Multiple Files Into One ZIP Archive",
  overview: [
    "Sending several files together as one attachment, or just bundling a set of related documents, is what ZIP archives are for — and creating one usually needs your operating system's built-in compression feature or a separate app. This tool builds a real, standard ZIP file directly in your browser from any files you add.",
    "Files are stored using the ZIP format's standard structure (local file headers, a central directory, and an end-of-central-directory record) with entries kept uncompressed (stored, not DEFLATE-compressed) — this keeps the tool simple and fast while still producing a fully valid, standard ZIP that any unzip tool can open correctly.",
    "Add as many files as you need, and they're bundled together in one download — useful for sending a batch of files as a single attachment or just keeping a set of documents together in one place.",
    "Everything happens locally: your files are read and packaged into the ZIP entirely in your browser, with nothing uploaded to a server during the process.",
  ],
  howItWorks: [
    { title: "Add your files", description: "Select as many files as you want to bundle." },
    { title: "Create the ZIP", description: "Files are packaged into a standard ZIP archive locally." },
    { title: "Download the archive", description: "One ZIP file containing everything you added." },
  ],
  examples: [
    { label: "Bundling files for one attachment", input: "5 separate documents", output: "one ZIP file containing all 5" },
  ],
  faqs: [
    { question: "Is my file uploaded to a server?", answer: "No — the ZIP is built entirely in your browser; your files never leave your device." },
    { question: "Why aren't the files compressed inside the ZIP?", answer: "Entries are stored uncompressed for simplicity and speed — the ZIP is still fully standard and valid, just without DEFLATE compression applied to each entry." },
    { question: "Will this ZIP open correctly in any unzip tool?", answer: "Yes — it follows the standard ZIP file structure (local headers, central directory, end-of-central-directory record) that any compliant unzip tool recognizes." },
    { question: "Is there a file count or size limit?", answer: "No hard limit is enforced, though very large or numerous files will take longer to process and use more browser memory." },
    { question: "Can I add a password to the resulting ZIP?", answer: "Not with this tool — use the ZIP Password Protector tool instead if you need an encrypted archive." },
  ],
};
