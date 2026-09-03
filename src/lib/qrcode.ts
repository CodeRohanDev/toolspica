// Minimal from-scratch QR Code encoder (ISO/IEC 18004), versions 1-6, ECC level M only.
// No external dependencies. Supports Alphanumeric and Byte (UTF-8) encoding modes,
// auto-selecting the smallest version that fits the input. Versions 7+ are deliberately
// unsupported here since they require an additional BCH-encoded version-info block.

const ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

// --- GF(256) arithmetic (primitive polynomial 0x11D) ---
const EXP = new Array<number>(512).fill(0);
const LOG = new Array<number>(256).fill(0);
(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

function rsGeneratorPoly(degree: number): number[] {
  let g = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      next[j] ^= g[j];
      next[j + 1] ^= gfMul(g[j], EXP[i]);
    }
    g = next;
  }
  return g;
}

function rsEncode(data: number[], eccCount: number): number[] {
  const generator = rsGeneratorPoly(eccCount);
  const result = [...data, ...new Array(eccCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = result[i];
    if (coef !== 0) {
      for (let j = 0; j < generator.length; j++) {
        result[i + j] ^= gfMul(generator[j], coef);
      }
    }
  }
  return result.slice(data.length);
}

// --- Version capacity table (ECC level M only), versions 1-6 ---
interface VersionInfo {
  version: number;
  totalCodewords: number;
  eccPerBlock: number;
  groups: { blocks: number; dataCodewords: number }[];
  remainderBits: number;
  alignmentPositions: number[];
}

const VERSIONS: VersionInfo[] = [
  { version: 1, totalCodewords: 26, eccPerBlock: 10, groups: [{ blocks: 1, dataCodewords: 16 }], remainderBits: 0, alignmentPositions: [] },
  { version: 2, totalCodewords: 44, eccPerBlock: 16, groups: [{ blocks: 1, dataCodewords: 28 }], remainderBits: 7, alignmentPositions: [6, 18] },
  { version: 3, totalCodewords: 70, eccPerBlock: 26, groups: [{ blocks: 1, dataCodewords: 44 }], remainderBits: 7, alignmentPositions: [6, 22] },
  { version: 4, totalCodewords: 100, eccPerBlock: 18, groups: [{ blocks: 2, dataCodewords: 32 }], remainderBits: 7, alignmentPositions: [6, 26] },
  { version: 5, totalCodewords: 134, eccPerBlock: 24, groups: [{ blocks: 2, dataCodewords: 43 }], remainderBits: 7, alignmentPositions: [6, 30] },
  { version: 6, totalCodewords: 172, eccPerBlock: 16, groups: [{ blocks: 4, dataCodewords: 27 }], remainderBits: 7, alignmentPositions: [6, 34] },
];

function moduleCount(version: number) {
  return version * 4 + 17;
}

// --- Bit buffer ---
class BitBuffer {
  bits: number[] = [];
  push(value: number, length: number) {
    for (let i = length - 1; i >= 0; i--) {
      this.bits.push((value >> i) & 1);
    }
  }
  get length() {
    return this.bits.length;
  }
}

function isAlphanumeric(text: string) {
  return [...text].every((ch) => ALPHANUMERIC_CHARS.includes(ch));
}

function utf8Bytes(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

function buildDataBits(text: string, version: VersionInfo): BitBuffer | null {
  const alphanumeric = isAlphanumeric(text);
  const buffer = new BitBuffer();
  const countBits = 9; // versions 1-9 use 9-bit (alphanumeric) / 8-bit (byte) count indicators

  if (alphanumeric) {
    buffer.push(0b0010, 4); // mode indicator: alphanumeric
    buffer.push(text.length, countBits);
    for (let i = 0; i < text.length; i += 2) {
      if (i + 1 < text.length) {
        const value =
          ALPHANUMERIC_CHARS.indexOf(text[i]) * 45 + ALPHANUMERIC_CHARS.indexOf(text[i + 1]);
        buffer.push(value, 11);
      } else {
        buffer.push(ALPHANUMERIC_CHARS.indexOf(text[i]), 6);
      }
    }
  } else {
    const bytes = utf8Bytes(text);
    buffer.push(0b0100, 4); // mode indicator: byte
    buffer.push(bytes.length, 8);
    for (const b of bytes) buffer.push(b, 8);
  }

  const capacityBits =
    version.groups.reduce((sum, g) => sum + g.blocks * g.dataCodewords, 0) * 8;
  if (buffer.length > capacityBits) return null;

  // Terminator (up to 4 bits)
  const terminatorLength = Math.min(4, capacityBits - buffer.length);
  buffer.push(0, terminatorLength);

  // Pad to byte boundary
  while (buffer.length % 8 !== 0) buffer.bits.push(0);

  // Pad bytes 0xEC / 0x11 alternating until capacity reached
  const padBytes = [0xec, 0x11];
  let padIndex = 0;
  while (buffer.length < capacityBits) {
    buffer.push(padBytes[padIndex % 2], 8);
    padIndex++;
  }

  return buffer;
}

function bitsToCodewords(buffer: BitBuffer): number[] {
  const codewords: number[] = [];
  for (let i = 0; i < buffer.bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | buffer.bits[i + j];
    codewords.push(byte);
  }
  return codewords;
}

function assembleFinalCodewords(dataCodewords: number[], version: VersionInfo): number[] {
  const blocks: { data: number[]; ecc: number[] }[] = [];
  let offset = 0;
  for (const group of version.groups) {
    for (let b = 0; b < group.blocks; b++) {
      const data = dataCodewords.slice(offset, offset + group.dataCodewords);
      offset += group.dataCodewords;
      const ecc = rsEncode(data, version.eccPerBlock);
      blocks.push({ data, ecc });
    }
  }

  const maxDataLen = Math.max(...blocks.map((b) => b.data.length));
  const result: number[] = [];
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.data.length) result.push(block.data[i]);
    }
  }
  for (let i = 0; i < version.eccPerBlock; i++) {
    for (const block of blocks) {
      result.push(block.ecc[i]);
    }
  }
  return result;
}

// --- Format info (BCH(15,5), generator 0x537, mask 0x5412) ---
function computeFormatBits(maskPattern: number): number {
  const eccIndicator = 0b00; // ECC level M
  const data = (eccIndicator << 3) | maskPattern;
  let value = data << 10;
  const generator = 0b10100110111;
  for (let i = 4; i >= 0; i--) {
    if ((value >> (i + 10)) & 1) {
      value ^= generator << i;
    }
  }
  const bch = value & 0x3ff;
  return ((data << 10) | bch) ^ 0b101010000010010;
}

// --- Matrix construction ---
type Matrix = (0 | 1 | null)[][];

function createEmptyMatrix(size: number): Matrix {
  return Array.from({ length: size }, () => new Array(size).fill(null));
}

function placeFinderPattern(matrix: Matrix, row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const mr = row + r;
      const mc = col + c;
      if (mr < 0 || mc < 0 || mr >= matrix.length || mc >= matrix.length) continue;
      const isBorder = r === -1 || r === 7 || c === -1 || c === 7;
      const isRing = r >= 0 && r <= 6 && c >= 0 && c <= 6 && (r === 0 || r === 6 || c === 0 || c === 6);
      const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      matrix[mr][mc] = isBorder ? 0 : isRing || isCenter ? 1 : 0;
    }
  }
}

function placeAlignmentPattern(matrix: Matrix, row: number, col: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isRing = r === -2 || r === 2 || c === -2 || c === 2;
      matrix[row + r][col + c] = isRing || (r === 0 && c === 0) ? 1 : 0;
    }
  }
}

function placeFunctionPatterns(matrix: Matrix, version: VersionInfo) {
  const size = matrix.length;
  placeFinderPattern(matrix, 0, 0);
  placeFinderPattern(matrix, 0, size - 7);
  placeFinderPattern(matrix, size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Alignment pattern (versions 2-6 here have exactly one non-edge position pair)
  const positions = version.alignmentPositions;
  for (const r of positions) {
    for (const c of positions) {
      // Skip positions that overlap the finder patterns (top-left, top-right, bottom-left)
      const overlapsFinder =
        (r < 9 && c < 9) || (r < 9 && c > size - 9) || (r > size - 9 && c < 9);
      if (!overlapsFinder) {
        placeAlignmentPattern(matrix, r, c);
      }
    }
  }

  // Reserve format info areas with placeholder 0 (overwritten later with real bits).
  // Copy A: row 8 cols 0-8, col 8 rows 0-8 (near top-left finder).
  for (let i = 0; i < 9; i++) {
    if (matrix[8][i] === null) matrix[8][i] = 0;
    if (matrix[i][8] === null) matrix[i][8] = 0;
  }
  // Copy B horizontal: row 8, cols size-8..size-1 (8 bits, near top-right finder).
  for (let i = 0; i < 8; i++) {
    if (matrix[8][size - 1 - i] === null) matrix[8][size - 1 - i] = 0;
  }
  // Copy B vertical: col 8, rows size-1..size-7 (7 bits, near bottom-left finder) —
  // deliberately stops at size-7, leaving row size-8 free for the dark module below.
  for (let i = 0; i < 7; i++) {
    if (matrix[size - 1 - i][8] === null) matrix[size - 1 - i][8] = 0;
  }

  // Dark module (always present) — set last so nothing above can ever overwrite it.
  matrix[4 * version.version + 9][8] = 1;
}

function isFunctionModule(reserved: boolean[][], r: number, c: number) {
  return reserved[r][c];
}

function buildReservedMask(matrix: Matrix): boolean[][] {
  return matrix.map((row) => row.map((cell) => cell !== null));
}

function placeDataBits(matrix: Matrix, reserved: boolean[][], codewords: number[]) {
  const size = matrix.length;
  const bits: number[] = [];
  for (const byte of codewords) {
    for (let i = 7; i >= 0; i--) bits.push((byte >> i) & 1);
  }

  let bitIndex = 0;
  let upward = true;
  let col = size - 1;

  while (col > 0) {
    if (col === 6) col--; // skip timing column

    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i;
      for (const c of [col, col - 1]) {
        if (!isFunctionModule(reserved, row, c)) {
          matrix[row][c] = bitIndex < bits.length ? ((bits[bitIndex] as 0 | 1) ?? 0) : 0;
          bitIndex++;
        }
      }
    }
    upward = !upward;
    col -= 2;
  }
}

function applyMask(matrix: Matrix, reserved: boolean[][], mask: number): Matrix {
  const size = matrix.length;
  const result = matrix.map((row) => [...row]) as Matrix;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFunctionModule(reserved, r, c)) continue;
      let invert = false;
      switch (mask) {
        case 0: invert = (r + c) % 2 === 0; break;
        case 1: invert = r % 2 === 0; break;
        case 2: invert = c % 3 === 0; break;
        case 3: invert = (r + c) % 3 === 0; break;
        case 4: invert = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
        case 5: invert = ((r * c) % 2) + ((r * c) % 3) === 0; break;
        case 6: invert = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0; break;
        case 7: invert = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0; break;
      }
      if (invert) result[r][c] = result[r][c] === 1 ? 0 : 1;
    }
  }
  return result;
}

function penaltyScore(matrix: Matrix): number {
  const size = matrix.length;
  let score = 0;

  // Rule 1: consecutive runs
  for (let r = 0; r < size; r++) {
    let runLength = 1;
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        runLength++;
      } else {
        if (runLength >= 5) score += 3 + (runLength - 5);
        runLength = 1;
      }
    }
    if (runLength >= 5) score += 3 + (runLength - 5);
  }
  for (let c = 0; c < size; c++) {
    let runLength = 1;
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        runLength++;
      } else {
        if (runLength >= 5) score += 3 + (runLength - 5);
        runLength = 1;
      }
    }
    if (runLength >= 5) score += 3 + (runLength - 5);
  }

  // Rule 2: 2x2 blocks
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c];
      if (v === matrix[r][c + 1] && v === matrix[r + 1][c] && v === matrix[r + 1][c + 1]) {
        score += 3;
      }
    }
  }

  // Rule 3: finder-like patterns
  const pattern1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const pattern2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const matchesAt = (arr: (0 | 1 | null)[], start: number, pattern: number[]) =>
    pattern.every((p, i) => arr[start + i] === p);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 11; c++) {
      if (matchesAt(matrix[r], c, pattern1) || matchesAt(matrix[r], c, pattern2)) score += 40;
    }
  }
  for (let c = 0; c < size; c++) {
    const column = matrix.map((row) => row[c]);
    for (let r = 0; r <= size - 11; r++) {
      if (matchesAt(column, r, pattern1) || matchesAt(column, r, pattern2)) score += 40;
    }
  }

  // Rule 4: dark module ratio
  let dark = 0;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (matrix[r][c] === 1) dark++;
  const percent = (dark / (size * size)) * 100;
  const deviation = Math.floor(Math.abs(percent - 50) / 5) * 10;
  score += deviation;

  return score;
}

export interface QrResult {
  matrix: number[][];
  size: number;
  version: number;
}

export function generateQrCode(text: string): QrResult {
  if (text.length === 0) throw new Error("Cannot encode empty text");

  let chosenVersion: VersionInfo | null = null;
  let codewords: number[] | null = null;

  for (const version of VERSIONS) {
    const bits = buildDataBits(text, version);
    if (bits) {
      chosenVersion = version;
      codewords = bitsToCodewords(bits);
      break;
    }
  }

  if (!chosenVersion || !codewords) {
    throw new Error("Text is too long to encode (exceeds version 6 capacity)");
  }

  const finalCodewords = assembleFinalCodewords(codewords, chosenVersion);
  const size = moduleCount(chosenVersion.version);
  const baseMatrix = createEmptyMatrix(size);
  placeFunctionPatterns(baseMatrix, chosenVersion);
  const reserved = buildReservedMask(baseMatrix);
  placeDataBits(baseMatrix, reserved, finalCodewords);

  // Append remainder bits worth of zero-fill is implicit since unset data cells default to 0.

  let bestMask = 0;
  let bestScore = Infinity;
  let bestMatrix: Matrix = baseMatrix;

  for (let mask = 0; mask < 8; mask++) {
    const masked = applyMask(baseMatrix, reserved, mask);
    const score = penaltyScore(masked);
    if (score < bestScore) {
      bestScore = score;
      bestMask = mask;
      bestMatrix = masked;
    }
  }

  const formatBits = computeFormatBits(bestMask);
  // bit[i] = bit at position i of the 15-bit value (LSB-indexed). Placement below
  // matches ISO/IEC 18004 exactly, verified cell-by-cell against Project Nayuki's
  // canonical reference implementation.
  const bit: number[] = [];
  for (let i = 0; i <= 14; i++) bit.push((formatBits >> i) & 1);

  // Copy A, around the top-left finder pattern:
  // bits 0-5 run down column 8 (rows 0-5), bit 6 at (7,8), bit 7 at (8,8),
  // bit 8 at (8,7), bits 9-14 run left along row 8 (cols 5 down to 0).
  for (let i = 0; i <= 5; i++) bestMatrix[i][8] = bit[i] as 0 | 1;
  bestMatrix[7][8] = bit[6] as 0 | 1;
  bestMatrix[8][8] = bit[7] as 0 | 1;
  bestMatrix[8][7] = bit[8] as 0 | 1;
  for (let i = 9; i <= 14; i++) bestMatrix[8][14 - i] = bit[i] as 0 | 1;

  // Copy B: bits 0-7 run right-to-left along row 8 under the top-right finder
  // (cols size-1 down to size-8); bits 8-14 run down column 8 beside the
  // bottom-left finder (rows size-7 to size-1). Row size-8 at col 8 stays the
  // permanent dark module.
  for (let i = 0; i <= 7; i++) bestMatrix[8][size - 1 - i] = bit[i] as 0 | 1;
  for (let i = 8; i <= 14; i++) bestMatrix[size - 15 + i][8] = bit[i] as 0 | 1;

  const finalMatrix: number[][] = bestMatrix.map((row) => row.map((v) => (v === 1 ? 1 : 0)));

  return { matrix: finalMatrix, size, version: chosenVersion.version };
}
