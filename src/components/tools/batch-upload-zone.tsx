"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";

interface BatchUploadZoneProps {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  label?: string;
}

export function BatchUploadZone({ onFilesSelect, accept, label }: BatchUploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    onFilesSelect(Array.from(files));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:border-brand/50 ${
        isDragging ? "border-brand bg-brand-soft" : "border-muted-foreground/25"
      }`}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-muted">
        <UploadCloud className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm font-medium">{label ?? "Drop files here, or click to browse"}</p>
      <p className="text-xs text-muted-foreground">
        Select any number of files — processed locally in your browser, never uploaded
      </p>
      <input ref={inputRef} type="file" accept={accept} multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}
