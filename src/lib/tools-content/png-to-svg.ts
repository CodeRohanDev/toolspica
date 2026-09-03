import type { ToolContent } from "./types";

export const pngToSvgContent: ToolContent = {
  heroSubtitle: "Trace a Raster Image Into Scalable Vector Paths",
  overview: [
    "A PNG is a fixed grid of pixels — scale it up and it gets blurry or blocky. An SVG is a set of mathematical paths that stay perfectly crisp at any size, which is exactly what's needed for a logo going onto a huge banner, an icon that needs to scale cleanly across screen sizes, or graphics feeding into a vector design tool. This tool traces a raster image's color regions and converts them into actual SVG vector paths, right in your browser.",
    "The tracing works by detecting distinct color regions in the image and generating smooth vector outlines (using straight-line and quadratic curve segments) around each one, then assembling them into layered SVG paths. A colors slider controls how many distinct color regions the tracer looks for — fewer colors produce a simpler, smaller SVG with bolder shapes; more colors capture finer gradations at the cost of a larger, more complex file.",
    "This is genuinely well suited to logos, icons, line art, and other images that are naturally made of a small number of flat color regions — the output for these can look nearly indistinguishable from a hand-drawn vector, and dramatically smaller than the source PNG. It's honestly not the right tool for photographs: a photo has thousands of subtle color gradations, so tracing one produces a large, visually messy SVG full of tiny fragmented paths rather than a clean result — this is an inherent limitation of vectorizing photographic content, not a flaw specific to this implementation.",
    "Everything happens locally using a pure JavaScript tracing algorithm — no WebAssembly, no upload, and the result previews live as you adjust the color count, so you can dial in the right balance of detail versus file size before downloading.",
  ],
  howItWorks: [
    { title: "Upload a PNG or JPG", description: "Works best on logos, icons, and flat-color graphics." },
    { title: "Adjust the color count", description: "Fewer colors give a simpler SVG; more capture finer detail." },
    { title: "Download the SVG", description: "Get a genuine, scalable vector file traced from your image." },
  ],
  examples: [
    { label: "Vectorizing a logo", input: "128x128 PNG logo with 4 flat colors", output: "compact SVG that scales cleanly to any size, billboard included" },
  ],
  faqs: [
    { question: "Will this work well on a photograph?", answer: "Not really — photos have thousands of subtle color gradations, so tracing one produces a large, visually messy SVG with lots of small fragmented paths rather than a clean vector. This tool is built for logos, icons, and flat-color graphics." },
    { question: "What does the colors slider actually control?", answer: "How many distinct color regions the tracer looks for. Fewer colors produce a simpler, smaller SVG with bolder shapes; more colors capture finer gradations but increase file size and complexity." },
    { question: "Is the output a real vector file, or an embedded image?", answer: "A genuine vector file — actual SVG path elements with color fills, not a raster image embedded inside an SVG wrapper. It will scale to any size with zero blurriness." },
    { question: "Is my image uploaded anywhere for tracing?", answer: "No — tracing runs entirely in your browser using a pure JavaScript algorithm, no WebAssembly or server upload involved." },
    { question: "Can I trace a JPG as well as a PNG?", answer: "Yes — any raster format your browser can decode works, though PNG's typically flatter, cleaner color regions (especially for logos and icons) tend to trace more cleanly than JPEG's compression artifacts." },
  ],
};
