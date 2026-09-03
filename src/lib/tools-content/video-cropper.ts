import type { ToolContent } from "./types";

export const videoCropperContent: ToolContent = {
  heroSubtitle: "Trim Equal Margins Off All Sides of a Video Frame",
  overview: [
    "Unwanted borders around a video's actual content — black bars from a mismatched aspect ratio, a recording that captured more of the surroundings than intended, or just wanting to zoom in slightly on the frame — call for cropping rather than resizing, since cropping removes pixels rather than scaling them down. This tool trims an equal percentage off all four sides, centered on the frame.",
    "A real FFmpeg build compiled to WebAssembly performs the crop entirely inside your browser using the crop filter, computing exact pixel dimensions from your chosen percentage relative to the video's actual width and height — this means the same percentage setting scales correctly whether your source video is a small phone recording or a large 4K file.",
    "Because cropping requires re-encoding (the crop filter changes every frame's actual pixel content, unlike operations that can stream-copy), the video is fully re-encoded to H.264 during processing — the audio track is copied through unchanged, since audio isn't affected by a visual crop.",
    "The crop is always centered and symmetric across all four sides — for asymmetric cropping (removing more from one side than another, or targeting a very specific region), a more advanced video editor with manual crop-box positioning would be needed instead.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the crop margin", description: "Choose what percentage to trim from each side." },
    { title: "Crop and download", description: "A centered crop is re-encoded and ready to save." },
  ],
  examples: [
    { label: "Removing black bars from letterboxed footage", input: "video with visible black borders, 15% margin", output: "the same video with the borders trimmed away" },
  ],
  faqs: [
    { question: "Is the crop always centered?", answer: "Yes — this trims an equal percentage from all four sides, centered on the frame. For asymmetric cropping targeting a specific region, a more advanced video editor would be needed." },
    { question: "Does the percentage scale correctly for any resolution?", answer: "Yes — the crop margin is computed as a percentage of the video's actual width and height, so the same setting behaves proportionally whether the source is a small recording or a large 4K file." },
    { question: "Does cropping affect the audio?", answer: "No — audio is copied through unchanged since a visual crop has no bearing on sound; only the video frames are re-encoded." },
    { question: "Is my video uploaded anywhere?", answer: "No — cropping runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Why does cropping require re-encoding when muting didn't?", answer: "Cropping changes the actual pixel content of every frame, which requires decoding and re-encoding — unlike muting, which only removes a stream without touching video data, cropping can't be done as a simple stream copy." },
  ],
};
