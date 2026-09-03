// EAN-13 / UPC-A barcode encoder. UPC-A is encoded here as EAN-13 with a
// leading "0" digit, which is the standard, universally compatible approach
// (every UPC-A scanner reads EAN-13, and a leading-zero EAN-13 is a UPC-A).

const L_CODE: Record<string, string> = {
  "0": "0001101", "1": "0011001", "2": "0010011", "3": "0111101", "4": "0100011",
  "5": "0110001", "6": "0101111", "7": "0111011", "8": "0110111", "9": "0001011",
};

const G_CODE: Record<string, string> = {
  "0": "0100111", "1": "0110011", "2": "0011011", "3": "0100001", "4": "0011101",
  "5": "0111001", "6": "0000101", "7": "0010001", "8": "0001001", "9": "0010111",
};

const R_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(L_CODE).map(([digit, pattern]) => [
    digit,
    pattern.split("").map((b) => (b === "0" ? "1" : "0")).join(""),
  ])
);

// For each possible first digit (0-9), the parity pattern (L/G) used for the
// next 6 digits.
const FIRST_DIGIT_PARITY: Record<string, string> = {
  "0": "LLLLLL", "1": "LLGLGG", "2": "LLGGLG", "3": "LLGGGL", "4": "LGLLGG",
  "5": "LGGLLG", "6": "LGGGLL", "7": "LGLGLG", "8": "LGLGGL", "9": "LGGLGL",
};

export function calculateEan13CheckDigit(first12Digits: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(first12Digits[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  return (10 - (sum % 10)) % 10;
}

export interface BarcodeEncoding {
  /** Bar widths in modules, each element alternates bar/space starting with a bar. */
  widths: number[];
  fullCode: string;
}

/** Encodes a 12-digit input (without check digit) into a full 13-digit EAN-13 barcode. */
export function encodeEan13(digits12: string): BarcodeEncoding {
  if (!/^\d{12}$/.test(digits12)) {
    throw new Error("EAN-13 requires exactly 12 digits (check digit is calculated automatically)");
  }
  const checkDigit = calculateEan13CheckDigit(digits12);
  const fullCode = digits12 + checkDigit;

  const firstDigit = fullCode[0];
  const parity = FIRST_DIGIT_PARITY[firstDigit];
  const leftDigits = fullCode.slice(1, 7);
  const rightDigits = fullCode.slice(7, 13);

  const bits: string[] = [];
  bits.push("101"); // start guard

  for (let i = 0; i < 6; i++) {
    const digit = leftDigits[i];
    bits.push(parity[i] === "L" ? L_CODE[digit] : G_CODE[digit]);
  }

  bits.push("01010"); // center guard

  for (let i = 0; i < 6; i++) {
    bits.push(R_CODE[rightDigits[i]]);
  }

  bits.push("101"); // end guard

  const bitString = bits.join("");
  const widths: number[] = [];
  let current = bitString[0];
  let runLength = 1;
  for (let i = 1; i < bitString.length; i++) {
    if (bitString[i] === current) {
      runLength++;
    } else {
      widths.push(runLength);
      current = bitString[i];
      runLength = 1;
    }
  }
  widths.push(runLength);

  return { widths, fullCode };
}

/** UPC-A is EAN-13 with a leading zero digit. Accepts an 11-digit UPC-A body. */
export function encodeUpcA(digits11: string): BarcodeEncoding {
  if (!/^\d{11}$/.test(digits11)) {
    throw new Error("UPC-A requires exactly 11 digits (check digit is calculated automatically)");
  }
  return encodeEan13("0" + digits11);
}
