import type { ToolContent } from "./types";

export const videoTrimmerContent: ToolContent = {
  heroSubtitle: "Cut a Video to an Exact Start and End Time",
  overview: [
    "Trimming dead space off the start of a screen recording, pulling a specific moment out of a longer clip, or cutting a video down to just the relevant section is one of the most common video editing needs — and it doesn't require a full editor. This tool reads a video's actual duration automatically once uploaded, then lets you set precise start and end times before cutting.",
    "Under the hood, a real FFmpeg build compiled to WebAssembly runs the trim entirely inside your browser, re-encoding the selected range to H.264/AAC for frame-accurate cutting — this differs from a fast stream-copy trim (which can only cut at existing keyframes and may be imprecise), guaranteeing the output starts and ends exactly where you specify.",
    "Start and end times are entered in minute:second format and automatically validated — the tool won't let you set an end time before the start time, catching the most common input mistake before wasting processing time on an invalid trim.",
    "Because the entire video is decoded and re-encoded rather than just copied, this works reliably regardless of where the cut points fall relative to the original video's internal keyframe structure — a genuine trade-off of processing time for cutting precision.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "Duration is detected automatically." },
    { title: "Set start and end times", description: "Enter exact minute:second boundaries for the section to keep." },
    { title: "Trim and download", description: "A precisely cut video is re-encoded and ready to save." },
  ],
  examples: [
    { label: "Cutting a highlight from a longer recording", input: "10-minute video, trimmed to 1:20–2:45", output: "an 85-second clip starting and ending exactly there" },
  ],
  faqs: [
    { question: "Will the trim points be frame-accurate?", answer: "Yes — the video is fully re-encoded rather than stream-copied, so the output starts and ends exactly at the times you specify, regardless of where the nearest keyframes happen to fall." },
    { question: "Is my video uploaded anywhere?", answer: "No — trimming runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Why does trimming take real processing time instead of finishing instantly?", answer: "Frame-accurate trimming requires decoding and re-encoding the selected range rather than just copying existing data, which is what makes exact cut points possible." },
    { question: "What time format should I use?", answer: "Minutes and seconds separated by a colon, like 1:23 for one minute twenty-three seconds — the tool detects and pre-fills the full duration so you know the valid range." },
    { question: "Can I trim multiple separate sections out of one video?", answer: "This tool cuts one continuous section at a time — for splicing together several separate clips or ranges, use the Video Joiner by Timeline tool instead." },
  ],
};
