import type { ToolContent } from "./types";

export const gifSpeedChangerContent: ToolContent = {
  heroSubtitle: "Speed Up or Slow Down an Animated GIF",
  overview: [
    "An animated GIF's timing is baked into the file when it's created — if it plays too fast to follow or too slow to hold attention, fixing that means re-encoding the animation at a different speed, not something a GIF viewer or image editor can adjust on the fly.",
    "This tool re-encodes an animated GIF's playback speed by a factor you choose — from a quarter-speed slow motion effect up to four times faster than the original — while rebuilding the color palette so the result stays visually sharp.",
    "Speeding up shows fewer effective frames per second of real time, while slowing down stretches each frame's display duration — both change how briskly the loop feels without needing to touch the original source material. Processing runs through FFmpeg compiled to WebAssembly directly in your browser.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to retime." },
    { title: "Pick a speed multiplier", description: "From 0.25x (slower) up to 4x (faster) than the original." },
    { title: "Download the retimed GIF", description: "Get the same animation at the new playback speed." },
  ],
  examples: [
    {
      label: "Doubling speed",
      input: "walk-cycle.gif at 2x speed",
      output: "walk-cycle-2x.gif — the same animation playing twice as fast.",
    },
  ],
  faqs: [
    {
      question: "Does changing speed affect the file size?",
      answer:
        "Speeding up can slightly reduce file size since less total playback time needs to be represented; slowing down can slightly increase it, though the effect is usually modest.",
    },
    {
      question: "Can I slow a GIF down to create a slow-motion effect?",
      answer:
        "Yes — set the speed below 1x (down to 0.25x) to stretch out the timing and create a slow-motion feel from the original animation.",
    },
    {
      question: "Does this change the number of frames in the GIF?",
      answer:
        "No — the same frames are kept, just displayed for a longer or shorter duration each, rather than frames being added or removed.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — retiming happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
