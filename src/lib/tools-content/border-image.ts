import type { ToolContent } from "./types";

export const borderImageContent: ToolContent = {
  overview: [
    "Adding a border frames an image with a solid strip of color around its edges — a simple effect that immediately makes a photo feel more finished and gallery-like, helps a product photo or thumbnail stand out against a busy background it might be placed on, or creates visual consistency across a set of images used together, like a photo grid or portfolio where a matching border ties everything together.",
    "Unlike a CSS border (which is applied only within a specific web page's styling and doesn't travel with the image file itself), this tool bakes the border directly into the exported image, expanding the canvas outward by your chosen width and filling that new space with your chosen color before drawing the original image centered inside it. The result is a genuinely new, larger image file with the border permanently part of it — it displays correctly bordered wherever the file goes, not just on a specifically-styled webpage.",
    "Two controls give you full control over the effect: border width (in pixels, controlling how thick the frame is relative to the image) and border color (any color you choose via the color picker, from a classic white photo-frame look to a bold brand color or a subtle dark frame for a moodier presentation). Because the border expands the canvas outward rather than covering part of the original image, none of your actual photo content is ever cropped or hidden by the border.",
    "This tool always exports as PNG, since a solid-color border combined with any source image (including ones with transparency) is best represented losslessly — this avoids any JPEG compression artifacts appearing right at the sharp edge between your border and the image content, which is exactly the kind of high-contrast boundary where JPEG artifacts are most visually noticeable.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the photo or graphic you want to frame." },
    { title: "Set the border width and color", description: "Choose how thick the frame is and pick any color." },
    { title: "Download the result", description: "Your image with a permanent border baked in is ready to save." },
  ],
  examples: [
    { label: "Adding a classic white frame", input: "Photo with no border", output: "Same photo with a 20px white border added around all sides" },
  ],
  faqs: [
    { question: "Does the border cover part of my original image?", answer: "No — the canvas is expanded outward by the border width before your image is drawn, so the full original image content stays completely intact and visible; the border adds new space around it rather than covering existing content." },
    { question: "Can I use a different color or width on each side?", answer: "Not currently — this tool applies a uniform border width and color on all four sides. For an asymmetric or multi-color frame, you'd need a more advanced image editor." },
    { question: "Why does this always export as PNG?", answer: "A solid-color border creates a sharp, high-contrast edge against your image content, which is exactly the kind of boundary where JPEG's lossy compression artifacts are most visible. PNG's lossless compression keeps that edge perfectly clean." },
    { question: "Will adding a border change my image's aspect ratio?", answer: "Yes, slightly — since the border adds equal width to all four sides, a perfectly square image stays square, but the overall proportions shift slightly for non-square images since the border adds the same absolute width to both the shorter and longer dimensions." },
    { question: "Can I add a border to an image that already has transparency?", answer: "Yes — the original image's transparency is preserved exactly within its area; only the new bordered region around it is filled with your solid chosen color." },
  ],
};
