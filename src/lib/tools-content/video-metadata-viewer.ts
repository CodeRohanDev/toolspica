import type { ToolContent } from "./types";

export const videoMetadataViewerContent: ToolContent = {
  heroSubtitle: "Check a Video File's Resolution, Duration & Size",
  overview: [
    "Confirming a video's exact resolution, runtime, or file size before uploading it somewhere with specific requirements usually means opening it in a media player and checking a properties dialog, or waiting for an upload to fail against a limit you didn't know you were hitting.",
    "This tool reads a video file's metadata directly in your browser — resolution, duration, file size, MIME type, and last-modified date — alongside a playable preview, so you can confirm exactly what you're about to upload or share before committing to it.",
    "This reads metadata through your browser's native video decoding, so the resolution and duration shown are accurate to what the file actually contains — not just an estimate based on file size or container format alone.",
  ],
  howItWorks: [
    { title: "Upload a video file", description: "Choose any video file your browser can play." },
    { title: "Review the metadata", description: "See resolution, duration, file size, and type." },
    { title: "Preview the video", description: "Play it directly to confirm it's the right file." },
  ],
  examples: [
    {
      label: "Checking before upload",
      input: "clip.mp4",
      output: "Resolution: 1920 × 1080, Duration: 2:15, File size: 45.3 MB.",
    },
  ],
  faqs: [
    {
      question: "Does this show the video's codec or bitrate?",
      answer:
        "No — this shows resolution, duration, file size, and MIME type, which covers the most commonly needed checks. Codec-level details require more specialized inspection tools.",
    },
    {
      question: "What video formats are supported?",
      answer:
        "Any format your browser can natively play — MP4 and WebM have the broadest support across modern browsers.",
    },
    {
      question: "Why is the resolution more useful than the file's stated dimensions?",
      answer:
        "The resolution shown comes from actually decoding the video's first frame, reflecting the real playable dimensions rather than metadata that could be inaccurate or missing in the container.",
    },
    {
      question: "Is my video uploaded to a server?",
      answer:
        "No — metadata is read entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
