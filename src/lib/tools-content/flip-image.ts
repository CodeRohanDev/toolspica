import type { ToolContent } from "./types";

export const flipImageContent: ToolContent = {
  overview: [
    "Flipping an image mirrors it across an axis — horizontally (left becomes right, like looking in a mirror) or vertically (top becomes bottom, like a reflection in water) — which is a genuinely different operation from rotating, even though the two are easy to mix up. Rotating turns an image around a center point while preserving its left-to-right reading direction; flipping reverses that direction entirely, which is exactly why text or asymmetric logos look obviously wrong when flipped but look fine when rotated in 90° steps.",
    "The most common real use case is correcting a front-facing camera or webcam photo: many front cameras capture a mirrored image (so text on your shirt or in the background reads backwards), and a horizontal flip corrects it back to how it actually looked in real life. Other uses include creating a mirrored version of a graphic for a design layout that needs symmetry, flipping a scanned image that came out reversed, or simply creating a reflection effect for a design element.",
    "This tool supports both flip directions independently and lets you combine them — flipping both horizontally and vertically at once is mathematically equivalent to a 180° rotation, which this tool correctly produces if you enable both toggles together. Each flip is applied to the currently displayed result, so toggling a flip on and back off returns you exactly to the previous state.",
    "Like every image transform here, flipping is done with actual pixel-level canvas manipulation, not a CSS visual trick — the exported file has the flip permanently applied, so it displays correctly flipped in any other program, not just in this browser tab.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in or select the image you want to flip." },
    { title: "Toggle horizontal or vertical flip", description: "Enable either or both — the preview updates instantly." },
    { title: "Download the result", description: "The flipped image is exported at full quality, ready to save." },
  ],
  examples: [
    { label: "Correcting a mirrored selfie", input: "Front-camera photo with reversed text", output: "Horizontally flipped photo with correctly readable text" },
  ],
  faqs: [
    { question: "Why does my front-camera photo look mirrored in the first place?", answer: "Many phone and webcam front cameras display and sometimes save a horizontally mirrored preview by default, so it feels natural like looking in a mirror while taking the photo — but that means any text or asymmetric detail in the shot reads backwards until corrected." },
    { question: "What's the difference between flipping and rotating?", answer: "Rotating spins an image around its center, preserving its left-to-right reading direction. Flipping mirrors it across an axis, reversing that direction — which is why flipped text looks backwards while rotated text (in 90° steps) still reads normally, just sideways." },
    { question: "What happens if I enable both horizontal and vertical flip?", answer: "The two flips combine into the same result as rotating the image 180° — every point ends up diagonally opposite from where it started." },
    { question: "Does flipping affect image quality?", answer: "No — flipping simply rearranges existing pixels without any resampling or quality loss for lossless formats. JPEG output involves standard re-encoding, exported here at high quality to keep any difference imperceptible." },
    { question: "Can I flip an animated GIF?", answer: "No — this tool processes static images only. Flipping every frame of an animated GIF requires frame-by-frame processing that this tool doesn't currently support." },
  ],
};
