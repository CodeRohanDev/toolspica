import type { ToolContent } from "./types";

export const rotateImageByAngleContent: ToolContent = {
  overview: [
    "Not every rotation problem fits neatly into 90-degree steps — a photo that's just slightly tilted (a horizon that's a few degrees off level, a scanned document that wasn't perfectly aligned) needs a precise, arbitrary-angle correction rather than a quarter-turn. This tool provides exactly that: a live slider covering the full range from -180° to 180°, letting you dial in the exact rotation needed and see the result update in real time as you adjust it.",
    "The most common real use case is straightening a tilted horizon or a slightly crooked scan — dragging the slider by small increments while watching the live preview until the horizon (or any reference line in the image) sits perfectly level is far faster and more precise than guessing an angle, applying it, and checking the result repeatedly in a less interactive tool.",
    "A genuinely tricky detail this tool handles correctly: rotating a rectangular image by an arbitrary angle (anything other than a clean 90° multiple) means the rotated content no longer fits neatly within the original rectangular dimensions — the corners of the tilted image extend beyond the original boundary. This tool automatically calculates the exact bounding box needed to contain the entire rotated image without clipping any part of it, expanding the canvas as needed so nothing gets cut off at the edges, unlike simpler rotation implementations that keep the original canvas size and lose the corners.",
    "Because the rotated image no longer fills the new, larger rectangular canvas completely (the corners of that new bounding box are empty, outside the tilted image's actual edges), the result is always exported as PNG, preserving those newly-created empty areas as proper transparency rather than an unwanted solid color.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image you need to rotate by a precise angle." },
    { title: "Drag the angle slider", description: "Adjust from -180° to 180° and watch the live preview update." },
    { title: "Download the result", description: "The rotated image, fully preserved with no clipped corners, is ready to save." },
  ],
  examples: [
    { label: "Straightening a tilted horizon", input: "Photo with horizon tilted 4° off level", output: "Same photo rotated -4°, with the horizon perfectly level" },
  ],
  faqs: [
    { question: "Why is the output image larger than my original?", answer: "Rotating by an angle that isn't a multiple of 90° means the tilted image's corners extend beyond the original rectangle's boundaries. This tool automatically expands the canvas to the exact bounding box needed to contain the whole rotated image without cropping anything, which is why the result is larger and includes some transparent corner areas." },
    { question: "What's in the transparent corner areas of my result?", answer: "Those are the parts of the new, larger bounding-box canvas that fall outside your actual tilted image — since there's no image content there, they're left transparent (which is also why the result is always exported as PNG) rather than filled with an unwanted background color." },
    { question: "How is this different from the Rotate Image tool?", answer: "Rotate Image offers quick 90°/180°/270° preset buttons for full quarter-turns. This tool supports any exact angle via a live slider, specifically built for fine adjustments like straightening a slightly tilted photo rather than full quarter or half turns." },
    { question: "Can I type an exact angle instead of dragging the slider?", answer: "The current interface uses a slider for quick, interactive adjustment — for pixel-perfect repeatability at an exact known angle, drag carefully to the desired value while watching the numeric readout next to the slider." },
    { question: "Does rotating at an angle reduce image quality?", answer: "There's some unavoidable resampling involved in redrawing pixels at a non-90° angle (a normal characteristic of any rotation at an arbitrary angle, in any software), but for typical small corrective rotations (a few degrees), the visual difference is minimal and generally not noticeable." },
  ],
};
