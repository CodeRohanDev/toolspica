import type { ToolContent } from "./types";

export const socialMediaResizerContent: ToolContent = {
  overview: [
    "Every social platform expects images at specific pixel dimensions, and getting it wrong has real consequences: a photo uploaded at the wrong aspect ratio gets automatically cropped by the platform in ways you didn't choose (often cutting off exactly the part of the image you cared about), or displayed with awkward letterboxing and empty space around it. Manually resizing and cropping an image correctly for each platform's exact requirements, by hand, in a general image editor, is tedious enough that most people just accept whatever automatic crop the platform applies instead.",
    "This tool eliminates that guesswork with one-click presets for the dimensions that matter most: Instagram Post (1080×1080, a square format), Instagram Story (1080×1920, tall and full-screen), Facebook Post (1200×630, a wide landscape format optimized for feed display), X/Twitter Post (1600×900, a 16:9 widescreen format), LinkedIn Post (1200×627, close to Facebook's ratio but sized specifically for LinkedIn's feed), and YouTube Thumbnail (1280×720, the standard HD video thumbnail size).",
    "Rather than stretching your image to awkwardly fill the target dimensions (which would distort faces and straight lines), this tool uses a \"cover\" fit: your image is scaled up or down so it completely fills the target box with no empty space, then centered and cropped to match the exact required aspect ratio. This is the same approach professional design tools use, and it means the important, undistorted parts of your image are far more likely to stay visible after platform-specific cropping.",
    "Because centered cover-cropping keeps the middle of your image but crops equally from the edges on whichever dimension doesn't match, this works best when your subject is reasonably centered in the original photo — for a photo with an off-center subject that a plain center-crop would cut off awkwardly, you may want to crop the source image to roughly center your subject first, using the Crop Image tool, before resizing to a social preset here.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the photo or graphic you want to resize." },
    { title: "Pick a platform preset", description: "Choose the exact dimensions for the platform you're posting to." },
    { title: "Download the result", description: "A correctly-sized, center-cropped JPG is ready to upload." },
  ],
  examples: [
    { label: "Preparing an Instagram Story", input: "A landscape 1600×900 photo", output: "A 1080×1920 vertical crop, centered on the original image" },
  ],
  faqs: [
    { question: "Will this stretch or distort my image?", answer: "No — the tool uses a \"cover\" fit that scales your image proportionally (never distorting its aspect ratio) and crops any excess to exactly fill the target dimensions, the same technique professional design software uses rather than a naive stretch-to-fit." },
    { question: "What happens if my subject isn't centered in the original photo?", answer: "Since the crop is centered by default, an off-center subject might get partially cropped out when converting to a very different aspect ratio (like a wide landscape to a tall Instagram Story). For best results, crop your source image to roughly center the subject first if needed." },
    { question: "Why does the output always download as a JPG?", answer: "JPG is universally accepted by every major social platform and produces a reasonably sized file at high quality, making it a safe, practical default for social media uploads across the board." },
    { question: "Are these exact dimensions still correct, since platforms sometimes change their specs?", answer: "These presets reflect commonly recommended, widely-used dimensions for each platform as of this tool's design — platforms do occasionally adjust their exact recommended sizes over time, so for a critical, pixel-perfect campaign asset, it's worth double-checking the platform's current official specs." },
    { question: "Can I add my own custom dimensions instead of a preset?", answer: "Not currently — this tool offers the six most commonly needed social presets. For a fully custom size, a general-purpose image resizer with manual width and height fields would be a better fit." },
  ],
};
