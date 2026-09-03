import type { ToolContent } from "./types";

export const mkvToMp4Content: ToolContent = {
  heroSubtitle: "Convert an MKV File to Widely-Compatible MP4",
  overview: [
    "MKV (Matroska) is a flexible container format that supports far more codecs, subtitle formats, and multiple audio tracks than most devices actually know how to play — it's popular for archiving and advanced media libraries precisely because of that flexibility, but that same flexibility is exactly what makes MKV files fail to open on phones, smart TVs, and many web platforms. Converting to MP4 trades some of that flexibility for near-universal playability.",
    "A real FFmpeg build compiled to WebAssembly handles the conversion entirely inside your browser, decoding whatever video and audio codecs the source MKV actually uses (which can vary widely, since MKV places no real restriction on codec choice) and re-encoding to standard H.264 video and AAC audio in an MP4 container.",
    "Because MKV files can contain codecs, multiple audio tracks, or subtitle formats that MP4 simply can't hold, this conversion selects the primary video and audio tracks and re-encodes them into the more restrictive but far more compatible MP4 structure — any secondary audio tracks or embedded subtitle streams from the source MKV are not carried over.",
    "The trade-off is straightforward: MKV's extra flexibility for multiple tracks and advanced features is given up in exchange for a file that opens correctly on essentially any device or platform, which is usually exactly the trade a user reaching for this tool wants to make.",
  ],
  howItWorks: [
    { title: "Upload your MKV file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg decodes and re-encodes to H.264/AAC MP4." },
    { title: "Download the MP4", description: "A widely compatible video file, ready to play anywhere." },
  ],
  examples: [
    { label: "Making an MKV file playable on a phone", input: "movie.mkv with an uncommon codec", output: "an MP4 file that plays on any modern phone" },
  ],
  faqs: [
    { question: "Why won't my MKV file play on my phone or smart TV?", answer: "MKV supports a much wider range of codecs than most devices actually implement — the file may use a codec your device simply doesn't know how to decode, which is exactly what converting to standard H.264/AAC MP4 resolves." },
    { question: "What happens to multiple audio tracks or subtitles in the MKV?", answer: "This conversion carries over the primary video and audio tracks only — additional audio tracks or embedded subtitle streams from the source MKV aren't included in the MP4 output, since MP4 doesn't support MKV's full range of extra features." },
    { question: "Is my video uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does converting reduce video quality?", answer: "Since this is a genuine re-encode, some quality change is inherent, though generally not noticeable at normal viewing sizes with standard settings." },
    { question: "How long does conversion take?", answer: "Proportional to the video's length and resolution — a progress bar tracks the actual encoding progress as it runs." },
  ],
};
