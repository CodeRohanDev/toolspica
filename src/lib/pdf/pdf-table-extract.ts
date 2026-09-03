// Heuristic row/column reconstruction from PDF text positions. PDFs have no
// semantic table structure, so this clusters text items by y-coordinate
// into rows, then splits each row into cells wherever the horizontal gap
// between consecutive items is unusually large relative to that row's
// typical spacing — a standard, if approximate, technique for recovering
// tabular layout from position data alone.

export interface PositionedTextItem {
  str: string;
  x: number;
  y: number;
  width: number;
}

export function extractRows(items: PositionedTextItem[], yTolerance = 3): string[][] {
  const nonEmpty = items.filter((it) => it.str.trim().length > 0);
  if (nonEmpty.length === 0) return [];

  const sorted = [...nonEmpty].sort((a, b) => b.y - a.y);
  const rows: PositionedTextItem[][] = [];
  for (const item of sorted) {
    const row = rows.find((r) => Math.abs(r[0].y - item.y) <= yTolerance);
    if (row) row.push(item);
    else rows.push([item]);
  }

  return rows.map((row) => {
    const sortedRow = [...row].sort((a, b) => a.x - b.x);
    const gaps: number[] = [];
    for (let i = 1; i < sortedRow.length; i++) {
      gaps.push(sortedRow[i].x - (sortedRow[i - 1].x + sortedRow[i - 1].width));
    }
    const avgCharWidth =
      sortedRow.reduce((s, it) => s + (it.width / Math.max(1, it.str.length)), 0) / sortedRow.length || 5;
    const cellGapThreshold = avgCharWidth * 2.5;

    const cells: string[] = [];
    let current = sortedRow[0].str;
    for (let i = 1; i < sortedRow.length; i++) {
      if (gaps[i - 1] > cellGapThreshold) {
        cells.push(current.trim());
        current = sortedRow[i].str;
      } else {
        current += sortedRow[i].str;
      }
    }
    cells.push(current.trim());
    return cells.filter((c) => c.length > 0);
  });
}

export function rowsToCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => (cell.includes(",") || cell.includes('"') ? `"${cell.replace(/"/g, '""')}"` : cell))
        .join(",")
    )
    .join("\n");
}
