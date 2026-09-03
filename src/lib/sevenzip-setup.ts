"use client";

import type { SevenZipModule } from "7z-wasm";

let wasmBinaryPromise: Promise<ArrayBuffer> | null = null;

function getWasmBinary(): Promise<ArrayBuffer> {
  if (!wasmBinaryPromise) {
    wasmBinaryPromise = fetch("/7z-wasm/7zz.wasm").then((r) => r.arrayBuffer());
  }
  return wasmBinaryPromise;
}

/** Creates a fresh 7-Zip WASM module instance with its own isolated virtual filesystem. */
export async function createSevenZip(): Promise<SevenZipModule> {
  const { default: SevenZip } = await import("7z-wasm");
  const wasmBinary = await getWasmBinary();
  return SevenZip({ wasmBinary, print: () => {}, printErr: () => {} });
}

export interface ExtractedEntry {
  name: string;
  data: Uint8Array;
}

function walkFs(fs: SevenZipModule["FS"], dir: string, out: string[]) {
  for (const name of fs.readdir(dir)) {
    if (name === "." || name === "..") continue;
    const full = `${dir}/${name}`;
    if (fs.isDir(fs.stat(full).mode)) walkFs(fs, full, out);
    else out.push(full);
  }
}

/** Extracts any archive format 7-Zip supports (tar, 7z, rar, iso, cab, ...) and returns every file's bytes. */
export async function extractArchive(buffer: Uint8Array, inputName: string, password?: string): Promise<ExtractedEntry[]> {
  const sevenZip = await createSevenZip();
  sevenZip.FS.writeFile(inputName, buffer);
  sevenZip.FS.mkdir("out");
  sevenZip.FS.chdir("out");
  const args = password ? ["x", `../${inputName}`, `-p${password}`, "-y"] : ["x", `../${inputName}`, "-y"];
  sevenZip.callMain(args);
  const paths: string[] = [];
  walkFs(sevenZip.FS, ".", paths);
  return paths.map((p) => ({
    name: p.replace(/^\.\//, ""),
    data: sevenZip.FS.readFile(p) as Uint8Array,
  }));
}
