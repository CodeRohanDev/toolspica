import type { ToolContent } from "./types";

export const wavToMp3Content: ToolContent = {
  heroSubtitle: "Compress an Uncompressed WAV File Down to MP3",
  overview: [
    "WAV files are uncompressed and correspondingly large — often five to ten times the size of an equivalent MP3 for the same audio. When a WAV file needs to be shared, emailed, or stored more compactly rather than kept for further lossless editing, converting to MP3 shrinks it dramatically while keeping audio quality high at typical settings.",
    "A real FFmpeg build compiled to WebAssembly handles the encoding entirely inside your browser, decoding the WAV's uncompressed PCM samples and encoding them as MP3 at a high VBR quality setting (quality level 2) — a strong balance of size reduction and audio fidelity for general use.",
    "Since this converts from a lossless source, the resulting MP3's quality is limited only by the MP3 encoding itself, not by any prior compression the WAV might have carried — you're getting the cleanest possible MP3 encode available from that source audio.",
    "This is the natural finishing step after lossless editing: work with uncompressed WAV throughout an editing process for maximum quality, then convert the final result to MP3 for sharing or distribution once editing is complete.",
  ],
  howItWorks: [
    { title: "Upload your WAV file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "The uncompressed audio is encoded as MP3." },
    { title: "Download the MP3", description: "A dramatically smaller file, ready to share." },
  ],
  examples: [
    { label: "Shrinking a WAV file for sharing", input: "large uncompressed WAV recording", output: "a much smaller MP3, high audio quality preserved" },
  ],
  faqs: [
    { question: "How much smaller will the MP3 be?", answer: "Typically five to ten times smaller than the source WAV, since WAV stores audio completely uncompressed while MP3 applies significant, efficient compression." },
    { question: "Is my WAV file uploaded to a server?", answer: "No — encoding runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What MP3 quality does this produce?", answer: "VBR (variable bitrate) quality level 2, a strong, high-quality setting appropriate for both spoken word and music content." },
    { question: "Should I edit audio in WAV or MP3?", answer: "WAV is better for editing (lossless, no generational quality loss from repeated saves); converting to MP3 as a final step for sharing or distribution is the typical workflow once editing is finished." },
    { question: "Will the MP3 sound identical to the WAV?", answer: "At the quality setting used here, the difference is generally not perceptible for most listeners and content, though MP3's lossy compression does discard some audio detail as part of achieving its smaller file size." },
  ],
};
