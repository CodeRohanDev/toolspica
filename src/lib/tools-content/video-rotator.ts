import type { ToolContent } from "./types";

export const videoRotatorContent: ToolContent = {
  heroSubtitle: "Fix a Sideways Video Recorded in the Wrong Orientation",
  overview: [
    "A video recorded holding the phone the wrong way ends up sideways or upside-down, and unlike photos (where many viewers auto-correct based on embedded orientation metadata), sideways video usually just plays sideways everywhere it's shared. This tool actually re-renders the video frames in the corrected orientation, rather than just adding a metadata flag some players might ignore.",
    "Three rotation options are available — 90°, 180°, and 270° — covering every case a wrong-orientation recording can produce. For 90° and 270° rotations, the video's width and height swap (a landscape video becomes portrait, or vice versa), which is the geometrically correct behavior for an actual rotation rather than a crop or stretch.",
    "A real FFmpeg build compiled to WebAssembly performs the rotation entirely inside your browser using the transpose filter, physically re-encoding every frame in the new orientation — this guarantees the fix displays correctly in absolutely any video player, since the pixels themselves are now actually right-side-up rather than relying on a rotation hint the player has to honor.",
    "Audio passes through unmodified during this process, since rotation is purely a visual transformation with no bearing on the sound.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose 90°, 180°, or 270°", description: "Pick the rotation that corrects the orientation." },
    { title: "Rotate and download", description: "Every frame is re-encoded right-side-up." },
  ],
  examples: [
    { label: "Fixing a sideways phone recording", input: "landscape-rotated video needing 90° correction", output: "the same video, now correctly oriented portrait" },
  ],
  faqs: [
    { question: "Will this fix work in every video player?", answer: "Yes — the pixels are physically re-encoded in the corrected orientation rather than relying on a rotation metadata flag, so it displays correctly everywhere, unlike some fixes that depend on the player honoring rotation hints." },
    { question: "Does width and height change with rotation?", answer: "For 90° and 270° rotations, yes — a landscape video correctly becomes portrait and vice versa, which is the geometrically accurate result of an actual rotation." },
    { question: "Is my video uploaded anywhere?", answer: "No — rotation runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will the audio be affected?", answer: "No — audio passes through unchanged; rotation only affects the visual frames." },
    { question: "What if my video is only slightly tilted, not a clean 90°/180°/270°?", answer: "This tool only supports the three standard rotation angles — a small arbitrary tilt correction would need a different tool capable of fine-angle rotation with cropping." },
  ],
};
