import type { ToolContent } from "./types";

export const videoToAudioConverterContent: ToolContent = {
  heroSubtitle: "Extract a Video's Audio in the Format You Need",
  overview: [
    "Different situations call for different audio formats when pulling sound out of a video — MP3 for general compatibility, WAV when a downstream tool needs uncompressed lossless audio, OGG or FLAC for open, efficient alternatives. This tool covers all four from a single interface, decoding the video's audio track and re-encoding it into whichever format you pick.",
    "A real FFmpeg build compiled to WebAssembly runs entirely inside your browser to handle the extraction and encoding — this works on any video container format your browser's FFmpeg build can read (MP4, WebM, MOV, AVI, MKV, and more), since the video is decoded first regardless of its original format before the audio-only output is produced.",
    "Each output format uses appropriate settings: MP3 at a high VBR quality level, WAV as uncompressed 16-bit PCM, OGG with the Vorbis codec at a strong quality setting, and FLAC with its native lossless compression — matching what each format is actually meant for rather than applying one generic setting across all of them.",
    "The video stream is fully discarded during processing in every case — none of the output formats carry any video data, only the extracted and re-encoded audio.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose an output format", description: "MP3, WAV, OGG, or FLAC." },
    { title: "Convert and download", description: "The extracted audio, encoded in your chosen format." },
  ],
  examples: [
    { label: "Getting lossless audio from a video for editing", input: "video file, WAV format selected", output: "an uncompressed WAV file with the video's audio track" },
  ],
  faqs: [
    { question: "Which format should I choose?", answer: "MP3 for general sharing and compatibility, WAV if a downstream editing tool needs uncompressed lossless input, OGG or FLAC for open-format alternatives — FLAC specifically if you want lossless compression rather than WAV's uncompressed size." },
    { question: "Does this work on any video format?", answer: "Yes — any video container your browser's FFmpeg build can decode, including MP4, WebM, MOV, AVI, and MKV, since the video is always fully decoded before audio extraction regardless of its original format." },
    { question: "Is my video uploaded anywhere?", answer: "No — the whole process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will the video content end up in the output file?", answer: "No — video is discarded entirely during processing in every output format; only the extracted, re-encoded audio remains." },
    { question: "What's the difference between OGG and FLAC here?", answer: "OGG (Vorbis) is a lossy but efficient compressed format similar in purpose to MP3; FLAC is lossless, preserving every bit of the decoded audio at the cost of a larger file than OGG or MP3." },
  ],
};
