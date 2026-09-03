import type { ToolContent } from "./types";

export const videoThumbnailGeneratorContent: ToolContent = {
  heroSubtitle: "Grab a Single Frame From a Video as an Image",
  overview: [
    "Every video needs a representative still image at some point — a thumbnail for a video listing, a preview image for a link share, a specific moment worth saving as a photo. This tool grabs exactly one frame from a precise timestamp you choose and saves it as a PNG, using a real FFmpeg build compiled to WebAssembly running entirely inside your browser.",
    "Once a video is uploaded, its duration is detected automatically and the timestamp field defaults to roughly the midpoint — a reasonable default starting point for most videos, since the middle frame is often more visually representative than the very first frame, which for many videos is blank, a loading screen, or otherwise unrepresentative.",
    "The timestamp is fully editable in seconds, so you can pick any exact moment in the video rather than being limited to the automatically suggested midpoint — useful when a specific frame (a title card, a key visual moment) is what you actually need.",
    "The extracted frame is generated as a lossless PNG, previewed directly on the page immediately after generation, and downloaded automatically — a fast, single-purpose tool for the common \"I just need one frame as an image\" need.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "Duration is detected and a default timestamp suggested." },
    { title: "Set the exact timestamp", description: "Choose precisely which moment to capture, in seconds." },
    { title: "Generate the thumbnail", description: "A PNG image of that frame previews and downloads." },
  ],
  examples: [
    { label: "Grabbing a video's thumbnail image", input: "video, timestamp at 12 seconds", output: "a PNG image of the frame at exactly that moment" },
  ],
  faqs: [
    { question: "Why does the timestamp default to the middle rather than the start?", answer: "The very first frame of many videos is blank, a loading screen, or otherwise unrepresentative — the midpoint is a more reasonable default starting point, though you can set any timestamp you want." },
    { question: "Is my video uploaded anywhere?", answer: "No — frame extraction runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What image format is the thumbnail saved as?", answer: "PNG, a lossless format, so the extracted frame is captured at full quality with no compression artifacts." },
    { question: "Can I generate multiple thumbnails from different timestamps?", answer: "Yes — run the tool again with a different timestamp for each frame you want; for extracting many frames at a regular interval automatically, use the Video Frame Extractor tool instead." },
    { question: "What if I enter a timestamp beyond the video's length?", answer: "FFmpeg will be unable to extract a frame at a point that doesn't exist in the video, so keep the timestamp within the detected duration shown for your file." },
  ],
};
