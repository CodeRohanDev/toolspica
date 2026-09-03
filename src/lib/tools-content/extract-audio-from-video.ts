import type { ToolContent } from "./types";

export const extractAudioFromVideoContent: ToolContent = {
  heroSubtitle: "Pull Just the Audio Track Out of Any Video",
  overview: [
    "Plenty of video content is really audio content that happens to have a picture attached — a recorded lecture, a podcast filmed on video, a music performance, an interview. Getting just the sound out without the video usually meant opening a video editor just to export audio. This tool does exactly that in one step: upload a video, get back an MP3 of just its audio track.",
    "A real FFmpeg build compiled to WebAssembly runs the extraction entirely inside your browser, decoding the video's audio stream and re-encoding it as MP3 at a high quality setting (VBR quality level 2, a strong balance of size and fidelity) — this works regardless of what audio codec the original video actually used internally, since FFmpeg decodes it first before re-encoding.",
    "The video stream itself is discarded entirely during processing rather than merely ignored in the output, so no video data is retained or wasted — the result is purely and only the extracted, re-encoded audio.",
    "This handles any video container your browser's FFmpeg build can read (MP4, WebM, MOV, AVI, MKV, and more), making it a general-purpose \"get the sound out\" tool rather than being tied to one specific video format.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Audio is extracted and encoded", description: "The audio track is decoded and re-encoded as MP3." },
    { title: "Download the MP3", description: "Just the sound, with the video discarded entirely." },
  ],
  examples: [
    { label: "Getting the audio from a recorded lecture", input: "45-minute lecture video", output: "a 45-minute MP3 with just the spoken audio" },
  ],
  faqs: [
    { question: "Does this work regardless of the video's format?", answer: "Yes — it handles any video container your browser's FFmpeg build can read, including MP4, WebM, MOV, AVI, and MKV, since the audio is decoded before being re-encoded to MP3." },
    { question: "Is my video uploaded to a server?", answer: "No — extraction happens entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What MP3 quality does the extracted audio use?", answer: "VBR quality level 2, a high-quality setting that balances strong fidelity with reasonable file size — suitable for spoken word, music, or any general audio content." },
    { question: "Can I choose a different output format instead of MP3?", answer: "Use the Video to Audio Converter tool instead, which lets you pick between MP3, WAV, OGG, and FLAC output." },
    { question: "Will the video track affect the output at all?", answer: "No — the video is fully discarded during processing; only the decoded and re-encoded audio remains in the output file." },
  ],
};
