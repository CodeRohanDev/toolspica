"use client";

import * as React from "react";
import { Upload } from "lucide-react";

const MAX_BYTES = 65536;

function toHexLine(bytes: Uint8Array, offset: number): { hex: string; ascii: string } {
  const chunk = bytes.slice(offset, offset + 16);
  const hexParts: string[] = [];
  let ascii = "";
  for (let i = 0; i < 16; i++) {
    if (i < chunk.length) {
      const b = chunk[i];
      hexParts.push(b.toString(16).padStart(2, "0"));
      ascii += b >= 32 && b <= 126 ? String.fromCharCode(b) : ".";
    } else {
      hexParts.push("  ");
    }
    if (i === 7) hexParts.push("");
  }
  return { hex: hexParts.join(" "), ascii };
}

export function HexViewer() {
  const [bytes, setBytes] = React.useState<Uint8Array | null>(null);
  const [fileName, setFileName] = React.useState("");
  const [truncated, setTruncated] = React.useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const buffer = new Uint8Array(await file.arrayBuffer());
    setTruncated(buffer.length > MAX_BYTES);
    setBytes(buffer.slice(0, MAX_BYTES));
  }

  const lines = React.useMemo(() => {
    if (!bytes) return [];
    const result: { offset: number; hex: string; ascii: string }[] = [];
    for (let offset = 0; offset < bytes.length; offset += 16) {
      const { hex, ascii } = toHexLine(bytes, offset);
      result.push({ offset, hex, ascii });
    }
    return result;
  }, [bytes]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload any file"}
        <input type="file" onChange={handleUpload} className="hidden" />
      </label>

      {lines.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs">
          {lines.map((line) => (
            <div key={line.offset} className="whitespace-pre">
              <span className="text-muted-foreground">{line.offset.toString(16).padStart(8, "0")}</span>{"  "}
              {line.hex}
              {"  "}
              <span className="text-muted-foreground">{line.ascii}</span>
            </div>
          ))}
          {truncated && <p className="mt-2 text-muted-foreground">(showing first {MAX_BYTES.toLocaleString()} bytes)</p>}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows the raw byte content of any file — hex values on the left, printable ASCII
        characters on the right. Useful for inspecting file headers and binary structure.
      </p>
    </div>
  );
}
