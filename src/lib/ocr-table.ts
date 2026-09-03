export interface OcrWord {
  text: string;
  x: number;
  y: number;
  width: number;
}

interface TesseractBlocks {
  blocks?: {
    paragraphs: { lines: { words: { text: string; bbox: { x0: number; y0: number; x1: number; y1: number } }[] }[] }[];
  }[] | null;
}

export function flattenWords(data: TesseractBlocks): OcrWord[] {
  const words: OcrWord[] = [];
  for (const block of data.blocks ?? []) {
    for (const para of block.paragraphs) {
      for (const line of para.lines) {
        for (const w of line.words) {
          words.push({ text: w.text, x: w.bbox.x0, y: w.bbox.y0, width: w.bbox.x1 - w.bbox.x0 });
        }
      }
    }
  }
  return words;
}

/** Clusters OCR words into rows (top-to-bottom) then columns (gap-based), same heuristic as the PDF table extractor. */
export function wordsToRows(words: OcrWord[], yTolerance = 8): string[][] {
  if (words.length === 0) return [];
  const sorted = [...words].sort((a, b) => a.y - b.y);
  const rows: OcrWord[][] = [];
  for (const w of sorted) {
    const row = rows.find((r) => Math.abs(r[0].y - w.y) <= yTolerance);
    if (row) row.push(w);
    else rows.push([w]);
  }

  return rows.map((row) => {
    const sortedRow = [...row].sort((a, b) => a.x - b.x);
    const avgCharWidth = sortedRow.reduce((s, w) => s + w.width / Math.max(1, w.text.length), 0) / sortedRow.length || 8;
    const gapThreshold = avgCharWidth * 2.5;

    const cells: string[] = [];
    let current = sortedRow[0].text;
    let prevEnd = sortedRow[0].x + sortedRow[0].width;
    for (let i = 1; i < sortedRow.length; i++) {
      const gap = sortedRow[i].x - prevEnd;
      if (gap > gapThreshold) {
        cells.push(current.trim());
        current = sortedRow[i].text;
      } else {
        current += " " + sortedRow[i].text;
      }
      prevEnd = sortedRow[i].x + sortedRow[i].width;
    }
    cells.push(current.trim());
    return cells;
  });
}
