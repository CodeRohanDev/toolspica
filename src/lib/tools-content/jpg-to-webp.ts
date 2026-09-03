import type { ToolContent } from "./types";

export const jpgToWebpContent: ToolContent = {
  overview: [
    "WebP consistently achieves noticeably smaller file sizes than JPEG at equivalent visual quality — typically cited as 25-35% smaller for comparable photo quality, based on Google's own published benchmarks from WebP's development. For anyone running a website, that difference translates directly into faster page loads, lower bandwidth costs, and better Core Web Vitals scores (specifically Largest Contentful Paint, a factor in Google's search ranking), which is exactly why converting existing JPG images to WebP is one of the most common, highest-leverage website performance optimizations available.",
    "This tool converts a JPG into WebP format using your browser's native WebP encoder — the same encoding technology built into Chrome, Firefox, and Edge — with a quality slider to control the compression level. Because you're converting from one lossy format to another, some additional quality loss is unavoidable in principle, but at reasonable quality settings (80% and above) the difference is generally imperceptible while the file size savings remain substantial.",
    "Browser support for WebP is now effectively universal — every major browser (Chrome, Firefox, Safari, Edge) has supported displaying WebP images since 2020 or earlier, which removes the historical objection to using WebP on a public website (older concerns about spotty browser support are now outdated). Modern web performance best practices, including Google's own PageSpeed Insights recommendations, explicitly suggest serving WebP (or the newer AVIF) instead of JPEG wherever practical.",
    "A common real-world pattern is to keep your original JPGs as a fallback (using an HTML `<picture>` element to serve WebP to browsers that support it and JPG to any that don't) rather than replacing your JPGs entirely — this tool is exactly what you'd use to generate that WebP version from your existing JPG source images.",
  ],
  howItWorks: [
    { title: "Upload your JPG", description: "Drop in the JPEG image you want converted." },
    { title: "Set the quality level", description: "Higher quality preserves more detail; lower quality reduces file size further." },
    { title: "Download your WebP", description: "The smaller WebP file, with a size comparison, is ready to save." },
  ],
  examples: [
    { label: "Optimizing a website image", input: "820 KB JPG photo", output: "540 KB WebP at 85% quality — comparable quality, ~34% smaller" },
  ],
  faqs: [
    { question: "How much smaller will my file actually be?", answer: "It varies by image content, but 25-35% smaller than an equivalent-quality JPEG is a commonly cited, realistic range based on WebP's own published benchmarks — photos with lots of fine detail or noise tend to see smaller relative savings than smoother images." },
    { question: "Do I need to worry about browser compatibility with WebP now?", answer: "No — every major browser (Chrome, Firefox, Safari, and Edge) has supported displaying WebP images since 2020 or earlier, so compatibility concerns that were valid several years ago are now outdated for essentially all current web traffic." },
    { question: "Should I delete my original JPGs after converting to WebP?", answer: "Not necessarily — a common best practice is to keep both and use an HTML `<picture>` element to serve WebP to modern browsers with a JPG fallback for any edge cases, rather than fully committing to one format." },
    { question: "Will converting to WebP improve my website's Google ranking?", answer: "Indirectly — smaller image files improve page load speed and Core Web Vitals metrics (particularly Largest Contentful Paint), which are factors Google's ranking systems do consider, though image format alone is one of many contributing signals, not a guaranteed ranking boost by itself." },
    { question: "Can I convert a WebP back to JPG later if needed?", answer: "Yes — use the WebP to JPG tool for the reverse conversion whenever you need broader compatibility again." },
  ],
};
