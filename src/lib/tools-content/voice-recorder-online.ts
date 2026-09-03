import type { ToolContent } from "./types";

export const voiceRecorderOnlineContent: ToolContent = {
  heroSubtitle: "Record Audio From Your Microphone, No App Needed",
  overview: [
    "Recording a quick voice memo, capturing a thought before it's forgotten, or grabbing a short audio clip shouldn't require opening a separate app or installing recording software. This tool uses your browser's own native microphone-recording API, meaning there's genuinely nothing to install — click start, allow microphone access, and record.",
    "When you start recording, your browser prompts you for microphone permission using its own standard permission dialog — the same mechanism behind video calls and voice messaging features you've likely already used, so there's no unfamiliar interface to navigate.",
    "Recording stops when you click the stop button, and the captured audio is encoded directly by your browser as it happens — there's no separate processing or upload step afterward, since the file is ready to preview and download immediately once you stop.",
    "Everything happens locally: your voice is captured, encoded, and made available for download entirely on your device, with no server involved at any point in the recording process.",
  ],
  howItWorks: [
    { title: "Click start recording", description: "Your browser asks for microphone permission." },
    { title: "Record your audio", description: "Recording continues until you click stop." },
    { title: "Preview and download", description: "The captured audio is ready immediately." },
  ],
  examples: [
    { label: "Recording a quick voice memo", input: "30 seconds of microphone audio", output: "a downloadable audio file, ready immediately" },
  ],
  faqs: [
    { question: "Is any recording software installed on my computer?", answer: "No — this uses your browser's own native microphone-recording API entirely; nothing is installed, and no plugin or extension is required." },
    { question: "Is my recording uploaded anywhere?", answer: "No — recording and encoding happen entirely on your device using browser-native APIs; the audio never leaves your computer unless you choose to share the downloaded file yourself." },
    { question: "What permission does the browser ask for?", answer: "Microphone access, using your browser's standard permission dialog — the same one used by video calling and voice messaging features." },
    { question: "What format does the recording download as?", answer: "The format your browser's native MediaRecorder API encodes to by default, which varies slightly by browser but is broadly playable audio, ready to download immediately after stopping." },
    { question: "Can I convert the recording to MP3 afterward?", answer: "Yes — run the downloaded file through the MP3 Converter tool if you specifically need it in MP3 format." },
  ],
};
