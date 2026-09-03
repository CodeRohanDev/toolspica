"use client";

interface HeifImage {
  get_width(): number;
  get_height(): number;
  display(
    imageData: ImageData,
    callback: (displayData: ImageData | null) => void
  ): void;
}

interface HeifDecoderInstance {
  decode(buffer: Uint8Array): HeifImage[];
}

interface LibheifModule {
  HeifDecoder: new () => HeifDecoderInstance;
}

let libheifPromise: Promise<LibheifModule> | null = null;

function getLibheif(): Promise<LibheifModule> {
  if (!libheifPromise) {
    libheifPromise = import("libheif-js/wasm-bundle").then(
      (mod) => (mod as unknown as { default: LibheifModule }).default
    );
  }
  return libheifPromise;
}

/** Decodes a HEIC/HEIF file's primary image onto a canvas, entirely client-side via WASM. */
export async function decodeHeicToCanvas(file: File): Promise<HTMLCanvasElement> {
  const libheif = await getLibheif();
  const buffer = new Uint8Array(await file.arrayBuffer());
  const decoder = new libheif.HeifDecoder();
  const images = decoder.decode(buffer);
  if (images.length === 0) throw new Error("No image found in this HEIC file.");

  const image = images[0];
  const width = image.get_width();
  const height = image.get_height();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);

  await new Promise<void>((resolve, reject) => {
    image.display(imageData, (displayData) => {
      if (!displayData) {
        reject(new Error("Couldn't decode this HEIC file — it may be corrupted or use an unsupported variant."));
        return;
      }
      resolve();
    });
  });

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
