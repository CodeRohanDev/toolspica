// Passphrase-based AES-256-GCM encryption using the browser's native Web
// Crypto API. PBKDF2 derives the key so a plain human passphrase never
// touches AES directly. Everything runs client-side — the passphrase and
// plaintext never leave the browser.

const PBKDF2_ITERATIONS = 250_000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Encrypts bytes with a passphrase. Output packs salt + iv + ciphertext together. */
export async function encryptBytes(plaintext: Uint8Array, passphrase: string): Promise<Uint8Array> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(passphrase, salt);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, plaintext as BufferSource)
  );
  const packed = new Uint8Array(salt.length + iv.length + ciphertext.length);
  packed.set(salt, 0);
  packed.set(iv, salt.length);
  packed.set(ciphertext, salt.length + iv.length);
  return packed;
}

export async function encryptText(plaintext: string, passphrase: string): Promise<string> {
  const packed = await encryptBytes(new TextEncoder().encode(plaintext), passphrase);
  return bytesToBase64(packed);
}

/** Decrypts bytes produced by encryptBytes. Throws if the passphrase is wrong or data is corrupt. */
export async function decryptBytes(packed: Uint8Array, passphrase: string): Promise<Uint8Array> {
  if (packed.length < SALT_LENGTH + IV_LENGTH) {
    throw new Error("This doesn't look like valid encrypted data.");
  }
  const salt = packed.slice(0, SALT_LENGTH);
  const iv = packed.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = packed.slice(SALT_LENGTH + IV_LENGTH);
  const key = await deriveKey(passphrase, salt);
  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      key,
      ciphertext as BufferSource
    );
    return new Uint8Array(plaintext);
  } catch {
    throw new Error("Decryption failed — wrong passphrase, or the data is corrupted.");
  }
}

export async function decryptText(packedBase64: string, passphrase: string): Promise<string> {
  const packed = base64ToBytes(packedBase64);
  const plaintext = await decryptBytes(packed, passphrase);
  return new TextDecoder().decode(plaintext);
}

export { bytesToBase64, base64ToBytes };
