import type { ToolContent } from "./types";

export const videoToGifContent: ToolContent = {
  heroSubtitle: "Turn a Video Clip Into a Looping Animated GIF",
  overview: [
    "GIFs remain the universal format for short, looping clips shared in chats, forums, and social posts — no player controls, no click-to-play, just an image that moves. Turning a video into one usually meant a dedicated converter tool; this one runs a real FFmpeg build compiled to WebAssembly directly in your browser to do the conversion locally.",
    "Two controls shape the trade-off every GIF conversion has to make: frame rate (how smooth the motion looks) and width (how large and detailed the image is). Since GIF has no efficient video-style compression — every frame is essentially stored as its own image — both settings directly and significantly affect the final file size, especially for longer clips.",
    "The scale filter uses Lanczos resampling, a high-quality downscaling algorithm that keeps the reduced-size GIF looking sharp rather than blurry, which matters more than usual for GIFs since they're often viewed at a fraction of the source video's original resolution.",
    "GIFs are inherently large for anything beyond a few seconds of content — this is a fundamental property of the format, not a limitation of this tool. Lowering the frame rate and width are the two most effective levers for keeping a GIF a reasonable size.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set FPS and width", description: "Lower values keep the file size manageable." },
    { title: "Convert and download", description: "A looping animated GIF is ready to save." },
  ],
  examples: [
    { label: "Making a short reaction clip", input: "5-second video clip, 10fps, 400px wide", output: "a compact, shareable animated GIF" },
  ],
  faqs: [
    { question: "Why are GIFs so much larger than the equivalent video clip?", answer: "GIF has no efficient video-style compression between frames — each frame is essentially stored as its own image — so file size grows quickly with duration, frame rate, and resolution. This is inherent to the format, not something a converter can avoid." },
    { question: "What FPS and width should I use?", answer: "Lower FPS (5-10) and a smaller width (under 400px) keep file size reasonable for longer clips; higher values look smoother and sharper but produce much larger files, especially past a few seconds." },
    { question: "Is my video uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does the GIF include audio?", answer: "No — the GIF format doesn't support audio at all, so any sound in the source video is dropped, which is a limitation of the GIF format itself." },
    { question: "Why does the tool use Lanczos scaling?", answer: "It's a high-quality resampling algorithm that keeps the downscaled GIF looking sharp rather than blurry, which matters since GIFs are often viewed much smaller than the source video's resolution." },
  ],
};
