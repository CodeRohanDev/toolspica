import type { ToolContent } from "./types";

export const blurImageContent: ToolContent = {
  overview: [
    "Blurring an image softens its detail by averaging each pixel with its surrounding neighbors, spreading sharp edges and fine detail into a smooth gradient. It's a genuinely useful editing tool for a specific set of practical purposes: obscuring a sensitive detail in a screenshot (a license plate, a name, a document's fine print) before sharing it publicly, creating a soft, out-of-focus background effect behind text or a design element, softening a busy background so a subject stands out more, or generating a blurred placeholder version of an image for a page's loading state.",
    "This tool applies a genuine Gaussian-style blur using the browser's native canvas filter API — the exact same blur rendering engine used for CSS `filter: blur()` effects — rather than a simplified approximation. The blur strength slider controls the radius of that effect in pixels: a small value produces a subtle softening, while a large value can render fine detail almost completely unrecognizable, useful specifically for privacy redaction where you want a detail genuinely obscured rather than just softened.",
    "It's worth being clear about blur's limits as a privacy tool: a light-to-moderate blur can sometimes be partially reversed using deconvolution or AI-based sharpening techniques, particularly for text or simple shapes with predictable patterns. For anything genuinely sensitive that must never be recoverable, a strong blur (or better, a solid black box covering the area entirely) is the safer choice than a light blur that might still leave enough signal for sophisticated reconstruction.",
    "Processing happens with real pixel-level canvas rendering, so the blur is permanently baked into the exported image file — it will display blurred in any other program or platform you share it to, not just in this browser tab, which matters specifically for the redaction use case where the blur needs to survive being viewed elsewhere.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image you want to blur." },
    { title: "Adjust the blur strength", description: "Drag the slider to control how strong the blur effect is." },
    { title: "Download the result", description: "The blurred image is exported as a new file, ready to save or share." },
  ],
  examples: [
    { label: "Softening a background", input: "Sharp photo with a busy background", output: "Same photo with background softened at 8px blur strength" },
  ],
  faqs: [
    { question: "Can a blurred detail be un-blurred or reversed later?", answer: "Light-to-moderate blurs can sometimes be partially reconstructed using specialized deconvolution or AI-sharpening techniques, especially for predictable content like text. For genuinely sensitive information that must stay hidden, use a strong blur or a solid opaque box instead of a light blur." },
    { question: "Does this blur the whole image, or can I blur just part of it?", answer: "This tool applies blur to the entire image uniformly. For blurring only a specific region (like a face or license plate) while keeping the rest sharp, you'd need a tool that supports selective, region-based blurring." },
    { question: "Why does a high blur setting make my image look almost solid-colored?", answer: "At very high blur radii, the averaging effect spreads each pixel's color across such a wide area that fine detail is essentially eliminated, leaving only broad color regions — this is expected behavior and is actually useful when you specifically want strong obscuring rather than a subtle soft-focus effect." },
    { question: "Will blurring reduce my image's file size?", answer: "Often yes, especially for JPEG output — blurred images have less high-frequency detail, which compresses more efficiently, so a blurred version can end up meaningfully smaller than the sharp original at the same quality setting." },
    { question: "Is this the same blur effect as a camera's depth-of-field bokeh?", answer: "Not exactly — this applies a uniform blur across the whole image, while a camera's natural depth-of-field bokeh varies blur intensity based on distance from the focal plane and has its own characteristic shape influenced by the lens. This tool produces a simpler, uniform softening rather than simulating optical bokeh." },
  ],
};
