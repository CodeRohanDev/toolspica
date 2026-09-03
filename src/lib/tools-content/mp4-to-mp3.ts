import type { ToolContent } from "./types";

export const mp4ToMp3Content: ToolContent = {
  heroSubtitle: "Extract an MP4's Audio Track as an MP3",
  overview: [
    "MP4 is the default format most cameras, phones, and screen recorders save video in, and a huge share of the time someone wants \"just the audio\" from a video, it's specifically an MP4 they're starting from — a recorded meeting, a filmed performance, a video someone sent that's really just audio with a picture attached. This tool is built for exactly that common case.",
    "A real FFmpeg build compiled to WebAssembly strips the video stream entirely and re-encodes the audio track as MP3 at a high VBR quality setting (quality level 2), running the whole process inside your browser rather than on a remote server. This works regardless of what audio codec the source MP4 actually used internally, since the audio is decoded before being re-encoded to MP3.",
    "The video stream is discarded during processing, not merely hidden in the output — the resulting MP3 contains only the audio, with no leftover video data taking up space.",
    "This is scoped specifically to MP4 input, matching how the tool is typically searched for and used — for other video container formats (WebM, MOV, AVI, MKV), the more general Extract Audio from Video or Video to Audio Converter tools handle the same extraction.",
  ],
  howItWorks: [
    { title: "Upload your MP4 file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Audio is extracted and encoded", description: "The audio track is decoded and re-encoded as MP3." },
    { title: "Download the MP3", description: "Just the sound, with the video discarded entirely." },
  ],
  examples: [
    { label: "Getting the audio from a recorded meeting", input: "recorded-meeting.mp4", output: "an MP3 with just the spoken audio from the meeting" },
  ],
  faqs: [
    { question: "Does this only work on .mp4 files?", answer: "Yes, this tool is scoped specifically to MP4 input — for WebM, MOV, AVI, MKV, or other video containers, use the more general Extract Audio from Video or Video to Audio Converter tools instead." },
    { question: "Is my video uploaded to a server?", answer: "No — extraction happens entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What quality is the extracted MP3?", answer: "VBR quality level 2, a high-quality setting that balances strong audio fidelity with reasonable file size, suitable for both spoken word and music content." },
    { question: "Does the video content affect the resulting audio quality?", answer: "No — only the audio stream is decoded and re-encoded; video is discarded entirely and has no bearing on the audio processing." },
    { question: "Can I choose WAV or another format instead of MP3?", answer: "Use the Video to Audio Converter tool instead, which supports MP3, WAV, OGG, and FLAC output formats." },
  ],
};
