import type { ToolContent } from "./types";

export const tarGzCreatorContent: ToolContent = {
  heroSubtitle: "Bundle Files Into a .tar.gz Archive",
  overview: [
    "The .tar.gz combination — files bundled with TAR, then compressed with GZIP — is the standard way to distribute file collections across Linux and macOS, from source code releases to backup bundles. This tool builds a genuine .tar.gz archive from any files you add, entirely in your browser.",
    "The process happens in two real steps using a 7-Zip build compiled to WebAssembly: files are first bundled into a standard TAR archive, then that TAR file is compressed with GZIP — exactly the same two-step process command-line tools use, just running inside your browser instead of a terminal.",
    "This produces a file that opens correctly with any standard tar utility (`tar -xzf` on the command line, or any GUI archive tool that recognizes .tar.gz) — a genuinely standard file, not a simplified approximation.",
    "Everything runs locally: your files are bundled and compressed entirely inside your browser's WebAssembly sandbox, with nothing uploaded to a server during the process.",
  ],
  howItWorks: [
    { title: "Add your files", description: "Select the files to bundle together." },
    { title: "Bundle and compress", description: "Files are packed into TAR, then compressed with GZIP." },
    { title: "Download the .tar.gz", description: "A standard archive, ready to share or extract anywhere." },
  ],
  examples: [
    { label: "Creating a distributable file bundle", input: "several project files", output: "archive.tar.gz, ready to distribute" },
  ],
  faqs: [
    { question: "Will this open correctly with `tar -xzf` on the command line?", answer: "Yes — it's a genuine, standard .tar.gz file, produced by the same real TAR-then-GZIP process any command-line tool would use." },
    { question: "Is my file uploaded anywhere?", answer: "No — bundling and compression both happen entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Why use .tar.gz instead of ZIP?", answer: "It's the conventional format on Linux and macOS for distributing file collections — ZIP works just as well technically, but .tar.gz is what most Unix-based tooling and workflows expect by default." },
    { question: "Does this preserve folder structure?", answer: "Yes — files keep their relative structure when bundled into the TAR layer before compression." },
    { question: "Can I extract a .tar.gz file with this site's tools?", answer: "Yes — decompress the GZIP layer with the GZIP Extractor tool, then extract the resulting TAR with the TAR Extractor tool, or use Archive Format Converter to do both steps in sequence." },
  ],
};
