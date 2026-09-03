import type { ToolContent } from "./types";

export const roundedCornersImageContent: ToolContent = {
  overview: [
    "Rounded corners on an image are one of the most recognizable visual patterns in modern app and web design — profile pictures, product thumbnails, cards, and avatars across nearly every popular app and website use softened, rounded corners rather than sharp right angles, since the effect reads as friendlier and more polished than a plain rectangular crop.",
    "While rounded corners can often be applied purely with CSS (`border-radius`) when an image is displayed on a webpage, that approach only works within that specific web context — the underlying image file itself remains a plain rectangle. This tool bakes the rounded corners directly into the actual exported image file, which is exactly what you need when the image is going somewhere CSS can't reach: a document, a presentation slide, an app icon submission, a printed design, or any platform that doesn't support custom CSS styling for uploaded images.",
    "This tool clips your image using a rounded-rectangle path drawn directly on the canvas, cutting away everything outside that rounded shape. Because the corners of a rounded rectangle are, by definition, no longer covered by the image, those clipped-away areas become transparent — which means the result is always exported as PNG (the format that supports transparency), regardless of what format your original image was in.",
    "The corner radius slider lets you control exactly how rounded the corners are, from a subtle softening at low values to a fully circular result once the radius reaches half of the image's shorter dimension (at which point a square image becomes a perfect circle) — the tool automatically caps the radius so it can never exceed that mathematical maximum, preventing a distorted or broken-looking result.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image you want to add rounded corners to." },
    { title: "Adjust the corner radius", description: "Drag the slider to control how rounded the corners are." },
    { title: "Download the result", description: "A PNG with transparent, rounded corners is ready to save." },
  ],
  examples: [
    { label: "Rounding a profile photo", input: "Square profile photo with sharp corners", output: "Same photo with softly rounded corners on a transparent background" },
  ],
  faqs: [
    { question: "Why is my result always a PNG, even if I uploaded a JPG?", answer: "Rounding the corners cuts away the image's original corner areas, which become transparent — since JPG can't represent transparency at all, the result is always exported as PNG, the format that properly supports it." },
    { question: "Can I make a perfectly circular image with this tool?", answer: "Yes — on a square image, setting the radius to half the image's width (or height) produces a perfect circle, and the tool automatically caps the maximum radius at exactly that point so you can't exceed it into an invalid or broken shape." },
    { question: "What happens if my image isn't square?", answer: "Rounded corners work on any rectangular image, not just square ones — the radius is capped based on the shorter of the two dimensions, so very rounded corners on a wide, short image will look proportionally different than on a tall, narrow one." },
    { question: "Will this work well for a non-square Instagram-style profile picture?", answer: "Yes — this is one of the most common uses. Upload your photo, set a large radius (or the maximum, for a full circle), and export a properly rounded or circular version ready for any platform expecting that shape." },
    { question: "Does rounding the corners crop or resize my image?", answer: "No — the overall image dimensions stay exactly the same; only the four corner areas outside the rounded-rectangle shape become transparent. Nothing is cropped from the center or resized." },
  ],
};
