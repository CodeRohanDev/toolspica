import type { ToolContent } from "./types";

export const movToMp4Content: ToolContent = {
  heroSubtitle: "Convert an iPhone/QuickTime MOV File to MP4",
  overview: [
    "iPhones and QuickTime save video in the .mov container by default, which internally usually already uses H.264 or HEVC video — but the .mov container itself trips up some websites, upload forms, and non-Apple software that specifically expect .mp4, even though the actual video data inside is often nearly identical to what a proper MP4 would contain. This tool re-wraps and re-encodes a MOV file as a standard MP4.",
    "A real FFmpeg build compiled to WebAssembly handles this entirely inside your browser, decoding the source video (whatever codec it actually uses — H.264 and HEVC are both common in MOV files from Apple devices) and re-encoding to H.264/AAC in an MP4 container, the combination most broadly supported across platforms that don't recognize .mov specifically.",
    "This is a genuine re-encode rather than a fast container-only swap, since MOV files can contain HEVC video (H.265), which many web platforms and older software still don't support even though Apple devices handle it natively — converting to H.264 resolves that compatibility gap on top of just fixing the container format.",
    "The result is a video file that opens correctly on virtually any platform or device that accepts video uploads at all, resolving both the container mismatch and any underlying codec incompatibility in one step.",
  ],
  howItWorks: [
    { title: "Upload your MOV file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg decodes and re-encodes to H.264/AAC MP4." },
    { title: "Download the MP4", description: "A widely compatible video file, ready to share." },
  ],
  examples: [
    { label: "Fixing an iPhone video for a website upload form", input: "IMG_1234.MOV from an iPhone", output: "an MP4 file that the upload form accepts" },
  ],
  faqs: [
    { question: "Why doesn't my website or app accept an iPhone .mov file directly?", answer: "Some platforms specifically expect the .mp4 container and don't recognize .mov, even when the underlying video codec would otherwise be compatible — this tool re-wraps and re-encodes to resolve that mismatch." },
    { question: "Does this also fix HEVC compatibility issues?", answer: "Yes — MOV files from Apple devices often use HEVC (H.265), which many platforms and older software don't support even though Apple devices play it natively. Re-encoding to H.264 resolves that separately from the container format itself." },
    { question: "Is my video uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will video quality change during conversion?", answer: "Since this is a genuine re-encode (especially when converting from HEVC), some quality change is inherent, though generally not noticeable at normal viewing sizes with standard settings." },
    { question: "How long does conversion take?", answer: "Proportional to the video's length and resolution — a progress bar tracks the actual encoding progress as it runs." },
  ],
};
