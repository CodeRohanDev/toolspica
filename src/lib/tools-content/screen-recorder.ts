import type { ToolContent } from "./types";

export const screenRecorderContent: ToolContent = {
  heroSubtitle: "Record Your Screen Directly in the Browser",
  overview: [
    "Capturing a screen recording — for a tutorial, a bug report, a demo — usually means installing dedicated screen-capture software just for an occasional need. This tool uses your browser's own native screen-capture and recording APIs, meaning there's genuinely nothing to install: click start, pick what to share, and record.",
    "When you start recording, your browser itself prompts you to choose exactly what to capture — an entire screen, a specific application window, or a single browser tab — using the operating system's native screen-picker interface, the same one behind video conferencing screen-sharing features you've likely already used.",
    "Recording stops either by clicking the stop button or by ending the shared screen/window/tab through the browser's own sharing indicator, and the captured video is encoded as WebM directly by your browser as it happens — there's no separate processing or upload step after recording finishes, since the file is ready to preview and download immediately.",
    "Everything happens locally: the video stream never leaves your device, there's no server involved in capturing or encoding, and the recording is only ever transmitted anywhere if you choose to upload or share the downloaded file yourself afterward.",
  ],
  howItWorks: [
    { title: "Click start recording", description: "Your browser asks what screen, window, or tab to capture." },
    { title: "Record your screen", description: "Recording continues until you stop it or end the sharing." },
    { title: "Preview and download", description: "The captured video is ready as a WebM file immediately." },
  ],
  examples: [
    { label: "Recording a quick software demo", input: "browser tab shared for 2 minutes", output: "a downloadable WebM screen recording, ready immediately" },
  ],
  faqs: [
    { question: "Is any recording software installed on my computer?", answer: "No — this uses your browser's own native screen-capture and recording APIs entirely; nothing is installed, and no plugin or extension is required." },
    { question: "Is my recording uploaded anywhere?", answer: "No — the screen capture and encoding happen entirely on your device using browser-native APIs; the video never leaves your computer unless you choose to share the downloaded file yourself." },
    { question: "What can I choose to record?", answer: "Your browser's native screen-picker lets you choose an entire screen, a specific application window, or a single browser tab, depending on what your operating system and browser support." },
    { question: "What format does the recording download as?", answer: "WebM, the format your browser's native MediaRecorder API encodes to directly — no additional conversion step is needed before the file is ready to download." },
    { question: "Can I record my microphone along with the screen?", answer: "Audio capture depends on what you share and your browser's permissions — many browsers include system or tab audio when you choose to share it during the screen-picker step." },
  ],
};
