import type { ToolContent } from "./types";

export const reverseGifMakerContent: ToolContent = {
  heroSubtitle: "Play an Animated GIF Backward",
  overview: [
    "Playing an animation in reverse is a genuinely popular effect — a boomerang-style back-and-forth loop, a comedic \"undo\" moment, or just an interesting visual reversal — but a GIF's frame order is fixed at creation time, so reversing it means actually re-encoding the frame sequence, not something a GIF viewer can toggle.",
    "This tool decodes an animated GIF, reverses the order of every frame, and re-encodes it as a new animated GIF that plays the entire sequence backward, looping continuously the same way the original did.",
    "The reversed version keeps the same frame timing and resolution as the original — only the playback order changes, so if the source GIF played smoothly, the reversed version does too. Processing runs through FFmpeg compiled to WebAssembly directly in your browser.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to reverse." },
    { title: "Reverse it", description: "Every frame's order is flipped from last to first." },
    { title: "Download the reversed GIF", description: "Get a new GIF playing the animation backward." },
  ],
  examples: [
    {
      label: "Simple reversal",
      input: "bounce.gif (ball drops and bounces)",
      output: "bounce-reversed.gif — the ball appears to rise and settle, playing the original sequence backward.",
    },
  ],
  faqs: [
    {
      question: "Does reversing change the GIF's file size significantly?",
      answer:
        "No — the same number of frames at the same resolution are re-encoded, so the file size stays roughly the same as the original.",
    },
    {
      question: "Can I combine this with a speed change?",
      answer:
        "Not in a single step currently — reverse the GIF here first, then run the result through the GIF Speed Changer tool if you also want to adjust playback speed.",
    },
    {
      question: "Does the reversed GIF still loop continuously?",
      answer:
        "Yes — it's encoded with the same continuous looping behavior as the original, just playing the frame sequence in reverse order.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — reversing happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
