// Bitcoin address validation: Base58Check (legacy P2PKH / P2SH) and Bech32
// (native SegWit, BIP173). Verified against real, independently-sourced
// on-chain addresses (via blockchain.info) covering all three formats,
// including confirming mutated addresses are correctly rejected.

const B58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function base58Decode(str: string): number[] {
  let num = BigInt(0);
  for (const ch of str) {
    const idx = B58_ALPHABET.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid Base58 character: "${ch}"`);
    num = num * BigInt(58) + BigInt(idx);
  }
  let hex = num.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  const bytes: number[] = [];
  if (hex !== "0") {
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  let leadingZeros = 0;
  for (const ch of str) {
    if (ch === "1") leadingZeros++;
    else break;
  }
  return [...Array(leadingZeros).fill(0), ...bytes];
}

async function sha256(bytes: number[]): Promise<number[]> {
  const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
  return Array.from(new Uint8Array(digest));
}

const VERSION_NAMES: Record<number, string> = {
  0x00: "P2PKH (Legacy, starts with 1)",
  0x05: "P2SH (Script hash, starts with 3)",
};

export interface AddressValidationResult {
  valid: boolean;
  format: string | null;
  reason: string | null;
}

async function validateBase58Check(address: string): Promise<AddressValidationResult> {
  let decoded: number[];
  try {
    decoded = base58Decode(address);
  } catch {
    return { valid: false, format: null, reason: "Contains characters outside the Base58 alphabet." };
  }
  if (decoded.length < 5) {
    return { valid: false, format: null, reason: "Too short to be a valid address." };
  }
  const payload = decoded.slice(0, decoded.length - 4);
  const checksum = decoded.slice(decoded.length - 4);
  const hash1 = await sha256(payload);
  const hash2 = await sha256(hash1);
  const expected = hash2.slice(0, 4);
  const match = checksum.every((b, i) => b === expected[i]);
  if (!match) {
    return { valid: false, format: null, reason: "Checksum doesn't match — likely a typo somewhere in the address." };
  }
  const version = payload[0];
  return {
    valid: true,
    format: VERSION_NAMES[version] ?? `Base58Check (version byte 0x${version.toString(16)})`,
    reason: null,
  };
}

const BECH32_CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const BECH32_GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function bech32Polymod(values: number[]): number {
  let chk = 1;
  for (const v of values) {
    const b = chk >>> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) {
      if ((b >>> i) & 1) chk ^= BECH32_GEN[i];
    }
  }
  return chk >>> 0;
}

function bech32HrpExpand(hrp: string): number[] {
  const result: number[] = [];
  for (const c of hrp) result.push(c.charCodeAt(0) >> 5);
  result.push(0);
  for (const c of hrp) result.push(c.charCodeAt(0) & 31);
  return result;
}

function validateBech32(address: string): AddressValidationResult {
  const lower = address.toLowerCase();
  const upper = address.toUpperCase();
  if (address !== lower && address !== upper) {
    return { valid: false, format: null, reason: "Mixed uppercase and lowercase isn't allowed in Bech32 addresses." };
  }
  const s = lower;
  const pos = s.lastIndexOf("1");
  if (pos < 1 || pos + 7 > s.length) {
    return { valid: false, format: null, reason: "Invalid Bech32 structure." };
  }
  const hrp = s.slice(0, pos);
  if (hrp !== "bc" && hrp !== "tb") {
    return { valid: false, format: null, reason: `Unrecognized human-readable prefix "${hrp}".` };
  }
  const dataPart = s.slice(pos + 1);
  const data: number[] = [];
  for (const c of dataPart) {
    const idx = BECH32_CHARSET.indexOf(c);
    if (idx === -1) {
      return { valid: false, format: null, reason: `Invalid Bech32 character: "${c}".` };
    }
    data.push(idx);
  }
  if (bech32Polymod(bech32HrpExpand(hrp).concat(data)) !== 1) {
    return { valid: false, format: null, reason: "Checksum doesn't match — likely a typo somewhere in the address." };
  }
  const witnessVersion = data[0];
  const network = hrp === "bc" ? "mainnet" : "testnet";
  return {
    valid: true,
    format: `Bech32 SegWit v${witnessVersion} (${network})`,
    reason: null,
  };
}

export async function validateBitcoinAddress(address: string): Promise<AddressValidationResult> {
  const trimmed = address.trim();
  if (!trimmed) return { valid: false, format: null, reason: "Enter an address." };
  if (trimmed.toLowerCase().startsWith("bc1") || trimmed.toLowerCase().startsWith("tb1")) {
    return validateBech32(trimmed);
  }
  return validateBase58Check(trimmed);
}
