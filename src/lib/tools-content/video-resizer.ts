import type { ToolContent } from "./types";

export const videoResizerContent: ToolContent = {
  heroSubtitle: "Resize a Video to a Specific Width, Aspect Preserved",
  overview: [
    "Reducing a video's resolution — to shrink file size, meet a platform's upload dimensions, or match a specific display size — is a common need distinct from cropping (which removes content) or compressing (which reduces bitrate at the same resolution). This tool changes the actual pixel dimensions while automatically preserving the original aspect ratio.",
    "You set only the target width; height is calculated automatically to keep the video's original proportions exactly intact, so there's no risk of accidentally stretching or squashing the picture out of shape by entering a mismatched height yourself.",
    "A real FFmpeg build compiled to WebAssembly performs the resize entirely inside your browser using the scale filter, with the height dimension set to automatically round to the nearest even number — a technical requirement of the H.264 codec, handled transparently so the encode doesn't fail on an odd height value.",
    "Resizing to a smaller width is one of the most effective ways to reduce file size, since fewer total pixels means significantly less data to encode per frame — often a bigger size reduction than compression settings alone can achieve without visible quality loss.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the target width", description: "Height scales automatically to preserve aspect ratio." },
    { title: "Resize and download", description: "A re-encoded video at the new dimensions." },
  ],
  examples: [
    { label: "Shrinking a 4K video for web use", input: "3840px-wide video, resized to 1280px width", output: "a 1280x720 video, aspect ratio preserved exactly" },
  ],
  faqs: [
    { question: "Will my video get stretched or distorted?", answer: "No — only width is set directly; height is calculated automatically to preserve the exact original aspect ratio, so there's no risk of accidental stretching." },
    { question: "Does resizing reduce file size significantly?", answer: "Yes, often substantially — fewer total pixels per frame means less data to encode, which is one of the most effective ways to shrink a video beyond what compression settings alone can achieve." },
    { question: "Is my video uploaded anywhere?", answer: "No — resizing runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What happens if the calculated height is an odd number?", answer: "It's automatically rounded to the nearest even number, since H.264 requires even dimensions — this is handled transparently so the resize doesn't fail." },
    { question: "Can I make a video larger instead of smaller?", answer: "Yes — entering a width larger than the original will upscale the video, though upscaling can't add detail that wasn't in the source, so the result may look softer than a genuinely higher-resolution recording." },
  ],
};
