"use client";

// Shared pdfjs-dist configuration. The worker script and font/cmap data
// are served as static files from /public/pdfjs (copied from
// node_modules/pdfjs-dist at setup time) so pdfjs works identically under
// webpack or Turbopack without bundler-specific worker resolution.

import * as pdfjsLib from "pdfjs-dist";

let configured = false;

export function getPdfjs() {
  if (!configured) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    configured = true;
  }
  return pdfjsLib;
}

export function loadPdfDocument(data: Uint8Array | ArrayBuffer) {
  const pdfjs = getPdfjs();
  return pdfjs.getDocument({
    data,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
  }).promise;
}
