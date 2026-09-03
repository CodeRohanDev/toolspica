import type { ToolContent } from "./types";

export const isoExtractorContent: ToolContent = {
  heroSubtitle: "Extract Files From an ISO Disc Image",
  overview: [
    "ISO files are exact copies of a CD/DVD disc's contents, commonly used for software distribution and operating system installers, but browsers and many everyday tools have no built-in way to open one without mounting it as a virtual drive. This tool reads an ISO 9660 disc image and extracts its files entirely in your browser using a real 7-Zip build compiled to WebAssembly.",
    "Every file inside the disc image is listed with its size once extraction completes, and everything bundles together into a single ZIP for download — no need to mount the ISO as a virtual drive just to grab its contents.",
    "ISO files are often large — several hundred megabytes to multiple gigabytes for a full disc image — so extraction can use significant browser memory and take real time proportional to the disc image's size.",
    "Everything runs locally: the disc image is read and extracted entirely inside your browser's WebAssembly sandbox, with nothing uploaded to a server at any point.",
  ],
  howItWorks: [
    { title: "Upload your ISO file", description: "Its contents are extracted automatically." },
    { title: "Review the file list", description: "See every extracted file's name and size (may take a moment on large ISOs)." },
    { title: "Download all as ZIP", description: "Every extracted file bundled into one download." },
  ],
  examples: [
    { label: "Extracting files from an installer disc image", input: "installer.iso", output: "every contained file, downloadable as a ZIP" },
  ],
  faqs: [
    { question: "Is my ISO file uploaded anywhere?", answer: "No — extraction runs entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Will a multi-gigabyte ISO work?", answer: "It can, but large disc images use significant browser memory and take real time proportional to the file's size — very large ISOs may be slow or memory-constrained depending on your device." },
    { question: "Do I need to mount the ISO first?", answer: "No — this reads the disc image's file structure directly, without needing to mount it as a virtual drive." },
    { question: "Does this preserve the disc's original folder structure?", answer: "Yes — extracted files keep their original paths from the disc image, bundled together in the resulting ZIP." },
    { question: "Can this extract a bootable OS installer ISO?", answer: "Yes — it reads the standard ISO 9660 file system regardless of whether the disc is also bootable; boot sector data itself isn't something you'd need extracted as a regular file." },
  ],
};
