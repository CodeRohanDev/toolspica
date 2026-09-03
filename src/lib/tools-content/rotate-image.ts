import type { ToolContent } from "./types";

export const rotateImageContent: ToolContent = {
  overview: [
    "A photo taken sideways or upside down is one of the most common small annoyances in everyday file management — a phone camera held the wrong way, a scanned document that came out rotated, or an image downloaded from somewhere that just doesn't match the orientation you need. Rotate Image fixes this in one click with quick 90-degree presets, the increment that covers the overwhelming majority of real rotation needs.",
    "Three buttons handle it: rotate left 90°, rotate right 90°, and rotate 180° (for a fully upside-down image). Because a 90-degree rotation swaps an image's width and height, this tool automatically resizes the output canvas to match — rotating a 1920×1080 landscape photo 90° correctly produces a 1080×1920 portrait result, not a cropped or stretched version squeezed into the original dimensions, which is a common mistake naive rotation implementations make.",
    "Processing happens entirely with the HTML canvas API directly in your browser: the image is drawn onto a canvas rotated by the exact angle, then exported back into an image file. Because this is a real pixel-level redraw rather than just a CSS visual transform, the rotation is baked into the actual downloaded file — opening it in any other program will show the corrected orientation, not just how it happened to display on this page.",
    "This tool preserves full image quality for lossless formats and exports rotated JPEGs at high quality (92%), so repeated small edits don't visibly degrade the image. For a specific, non-90° rotation angle (like straightening a slightly tilted photo by 3 degrees), use the Image Rotator by Angle tool instead, which supports any angle from -180° to 180° with a live preview.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in or select the image you need rotated." },
    { title: "Click a rotation button", description: "Rotate left, right, or a full 180° — the result updates instantly." },
    { title: "Download the result", description: "The rotated image is ready to save, with dimensions automatically adjusted." },
  ],
  examples: [
    { label: "Fixing a sideways photo", input: "1920×1080 landscape photo, rotated 90° right", output: "1080×1920 portrait image, correctly oriented" },
  ],
  faqs: [
    { question: "Does rotating change the image's file size dramatically?", answer: "Not usually — rotation doesn't add or remove visual detail, so the file size after rotating stays roughly similar to the original, aside from small differences from re-encoding (especially for JPEG, which uses lossy compression on each save)." },
    { question: "Will this fix a photo that's tilted by a small amount, like 5 degrees?", answer: "Not with the 90° presets here — for a small, precise tilt correction, use the Image Rotator by Angle tool, which lets you dial in any exact angle rather than only 90° increments." },
    { question: "Does the output keep the same file format as my upload?", answer: "Yes, for most formats — the tool re-exports using your original file's type where supported. If your browser can't re-encode that specific format, the result falls back to PNG to guarantee a valid, lossless output." },
    { question: "Can I rotate a PNG with transparency?", answer: "Yes — transparent areas are preserved correctly through the rotation, since the canvas operation respects the alpha channel throughout." },
    { question: "Is there a limit to how many times I can rotate an image?", answer: "No — click rotate as many times as you like; each click is a fresh rotation calculated from the currently displayed result, so four 90° right rotations correctly bring you back to the original orientation." },
  ],
};
