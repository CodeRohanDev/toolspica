import type { ToolContent } from "./types";

export const flvToMp4Content: ToolContent = {
  heroSubtitle: "Convert an Old Flash Video (FLV) File to MP4",
  overview: [
    "FLV (Flash Video) was the dominant web video format for over a decade before Flash was discontinued across every major browser — old downloads, archived web videos, and legacy recordings sometimes still exist only in this now-obsolete format. Converting to MP4 makes this old content playable again on modern devices and software that have no reason to support Flash-era formats anymore.",
    "A real FFmpeg build compiled to WebAssembly handles the conversion entirely inside your browser, decoding the FLV's typically older video and audio codecs (often Sorenson Spark or VP6 video with MP3 or AAC audio, depending on the file's age) and re-encoding to modern H.264 video and AAC audio in a standard MP4 container.",
    "Since Flash's discontinuation, essentially no current software or platform expects FLV input directly — this conversion isn't just a compatibility nicety but often the only practical way to get old FLV content playable again in anything modern.",
    "The result is a standard MP4 file, indistinguishable in format from any other MP4 recorded natively, ready to open in current media players, editors, or upload to any platform that accepts video.",
  ],
  howItWorks: [
    { title: "Upload your FLV file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg decodes and re-encodes to H.264/AAC MP4." },
    { title: "Download the MP4", description: "A modern, universally playable video file." },
  ],
  examples: [
    { label: "Recovering an old Flash-era video", input: "archived .flv file from before Flash's discontinuation", output: "a modern MP4 file, playable in any current software" },
  ],
  faqs: [
    { question: "Why won't my FLV file open in any current software?", answer: "Flash was discontinued across every major browser, and essentially no modern software or platform retains support for the FLV format — converting to MP4 is generally the only practical path to making old FLV content playable again." },
    { question: "Is my video uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What codecs do FLV files typically use internally?", answer: "It varies by age — often Sorenson Spark or VP6 for video with MP3 or AAC for audio, all of which are decoded automatically before re-encoding to modern H.264/AAC." },
    { question: "Does converting reduce quality?", answer: "Since this is a genuine re-encode, some quality change is inherent, though generally not noticeable at normal viewing sizes with standard settings — and often the source FLV was already fairly low quality given the era and codecs involved." },
    { question: "How long does conversion take?", answer: "Proportional to the video's length and resolution — a progress bar tracks the actual encoding progress as it runs." },
  ],
};
