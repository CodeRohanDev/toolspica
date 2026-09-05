import type { ToolContent } from "./types";

export const gifMakerFromVideoContent: ToolContent = {
  heroSubtitle: "Turn a Clip from Any Video into an Animated GIF",
  overview: [
    "A short, looping clip from a video — a reaction moment, a demo of a UI interaction, a highlight from a longer recording — is far easier to drop into a chat, a forum post, or a README than the full video file, and GIFs autoplay everywhere without needing a video player. Making one usually means a dedicated screen-recording or video-editing app.",
    "This tool takes any video file, lets you pick the exact start time and duration of the clip, and converts just that segment into an animated GIF — building a custom color palette from the actual clip first for sharper colors than a generic palette produces, at a frame rate and width you control.",
    "Because GIFs have no audio track, any sound in the source video is dropped automatically — only the visual frames carry over. Processing runs through FFmpeg compiled to WebAssembly directly in your browser, so nothing is uploaded, and there's no server-side file size or duration limit.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "Choose the video file containing the clip you want." },
    { title: "Set start time and duration", description: "Pick exactly which segment of the video becomes the GIF." },
    { title: "Download the GIF", description: "Get an animated GIF of just that clip." },
  ],
  examples: [
    {
      label: "A 3-second clip",
      input: "demo.mp4, start at 12s, duration 3s",
      output: "demo.gif — a 3-second looping animation starting from the 12-second mark.",
    },
  ],
  faqs: [
    {
      question: "Does the GIF include the video's audio?",
      answer:
        "No — the GIF format doesn't support audio, so any sound in the source video is automatically dropped. Only the visual frames are included.",
    },
    {
      question: "How long can the GIF clip be?",
      answer:
        "There's no hard limit, but keeping clips short (a few seconds) is recommended — GIF file sizes grow quickly with duration since every frame is stored, unlike efficiently compressed video formats.",
    },
    {
      question: "Why does the frame rate matter?",
      answer:
        "A lower frame rate (like 10 fps) keeps file size down while still looking smooth for most content — video's original frame rate (often 24-60 fps) is usually unnecessary and much heavier for a GIF.",
    },
    {
      question: "Is my video uploaded to a server?",
      answer:
        "No — the entire conversion happens locally in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
