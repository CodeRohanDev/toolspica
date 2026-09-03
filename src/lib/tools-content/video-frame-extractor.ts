import type { ToolContent } from "./types";

export const videoFrameExtractorContent: ToolContent = {
  heroSubtitle: "Extract Frames From a Video at a Regular Interval",
  overview: [
    "Some tasks need many still frames from a video rather than just one — building a contact-sheet-style overview, feeding frames into an image analysis workflow, or reviewing a video frame-by-frame at a coarser interval than watching it in real time. This tool extracts a frame at a regular time interval throughout the entire video, using a real FFmpeg build compiled to WebAssembly running inside your browser.",
    "You set how often to capture a frame — from every half-second up to every 10 seconds — and FFmpeg's fps filter generates exactly one PNG per interval across the full length of the video, rather than requiring you to specify exact timestamps one at a time.",
    "Each extracted frame is saved as a lossless PNG. When more than one frame is produced (which is the common case for anything longer than a few seconds), all the frames are bundled together into a single ZIP file for download, so you get one file containing everything rather than triggering dozens of individual downloads.",
    "The number of frames extracted scales directly with the video's length divided by your chosen interval — a 10-minute video at a 5-second interval produces 120 frames, so shorter intervals on longer videos can generate a substantial number of images and take real processing time to complete.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the extraction interval", description: "Choose how often to capture a frame, from 0.5s to 10s." },
    { title: "Extract and download", description: "All frames bundle into a single ZIP file." },
  ],
  examples: [
    { label: "Building a frame overview of a short video", input: "60-second video, 2-second interval", output: "30 PNG frames bundled into one ZIP file" },
  ],
  faqs: [
    { question: "How many frames will I get?", answer: "Roughly the video's total duration divided by your chosen interval — a 10-minute video at a 5-second interval produces about 120 frames." },
    { question: "How do I download multiple extracted frames?", answer: "When more than one frame is extracted, they're automatically bundled into a single ZIP file rather than triggering separate downloads for each image." },
    { question: "Is my video uploaded anywhere?", answer: "No — frame extraction runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What format are the extracted frames?", answer: "Lossless PNG images, capturing each frame at full quality with no compression artifacts." },
    { question: "Will a very short interval on a long video take a long time?", answer: "Yes — a shorter interval on a longer video produces many more frames, which increases both processing time and the number of images bundled into the resulting ZIP file." },
  ],
};
