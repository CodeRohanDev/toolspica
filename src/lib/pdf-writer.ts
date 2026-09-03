// Minimal multi-page PDF writer: one JPEG image per page, embedded directly
// via DCTDecode (no re-encoding — the original JPEG bytes are used as-is).
// Verified by rasterizing generated PDFs with Poppler's pdftoppm and
// confirming pixel-exact matches against the source images at multiple
// sample points across multi-page output; also checked with pdfinfo that
// page count and structure are valid.

export interface PdfImagePage {
  width: number;
  height: number;
  jpegBytes: Uint8Array;
}

function concatBuffers(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(total);
  let pos = 0;
  for (const c of chunks) {
    result.set(c, pos);
    pos += c.length;
  }
  return result;
}

export function buildImagePdf(images: PdfImagePage[]): Uint8Array {
  const encoder = new TextEncoder();
  const n = images.length;
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let currentLength = 0;

  function push(chunk: Uint8Array) {
    parts.push(chunk);
    currentLength += chunk.length;
  }

  push(encoder.encode("%PDF-1.4\n"));

  function addObj(num: number, dictStr: string, streamBytes?: Uint8Array) {
    offsets[num] = currentLength;
    let header = `${num} 0 obj\n${dictStr}`;
    if (streamBytes) {
      header += "\nstream\n";
      push(encoder.encode(header));
      push(streamBytes);
      push(encoder.encode("\nendstream\nendobj\n"));
    } else {
      push(encoder.encode(`${header}\nendobj\n`));
    }
  }

  const pageObjNums: number[] = [];
  for (let i = 0; i < n; i++) pageObjNums.push(3 + i * 3);

  addObj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  addObj(2, `<< /Type /Pages /Kids [${pageObjNums.map((x) => `${x} 0 R`).join(" ")}] /Count ${n} >>`);

  images.forEach((img, i) => {
    const pageNum = 3 + i * 3;
    const imgNum = 4 + i * 3;
    const contentNum = 5 + i * 3;
    addObj(
      pageNum,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${img.width} ${img.height}] /Resources << /XObject << /Im0 ${imgNum} 0 R >> >> /Contents ${contentNum} 0 R >>`
    );
    addObj(
      imgNum,
      `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.jpegBytes.length} >>`,
      img.jpegBytes
    );
    const contentStream = `q ${img.width} 0 0 ${img.height} 0 0 cm /Im0 Do Q`;
    const contentBuf = encoder.encode(contentStream);
    addObj(contentNum, `<< /Length ${contentBuf.length} >>`, contentBuf);
  });

  const totalObjs = 2 + n * 3;
  const xrefStart = currentLength;
  let xref = `xref\n0 ${totalObjs + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= totalObjs; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  push(encoder.encode(xref));
  push(encoder.encode(`trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`));

  return concatBuffers(parts);
}
