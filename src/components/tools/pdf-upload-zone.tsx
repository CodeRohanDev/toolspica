"use client";

import * as React from "react";
import { FileText, X } from "lucide-react";
import { formatBytes } from "@/lib/pdf/pdf-helpers";

interface PdfUploadZoneProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  multiple?: boolean;
  onFilesSelect?: (files: File[]) => void;
  label?: string;
}

export function PdfUploadZone({
  file,
  onFileSelect,
  onClear,
  multiple,
  onFilesSelect,
  label = "Drop a PDF, or click to browse",
}: PdfUploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (multiple && onFilesSelect) {
      onFilesSelect(Array.from(files).filter((f) => f.type === "application/pdf"));
    } else {
      const picked = files[0];
      if (picked) onFileSelect(picked);
    }
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
      onClick={() => (!file || multiple) && inputRef.current?.click()}
      className={`relative flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
        isDragging ? "border-brand bg-brand-soft" : "border-muted-foreground/25"
      } ${!file || multiple ? "cursor-pointer hover:border-brand/50" : ""}`}
    >
      {file && !multiple ? (
        <>
          <span className="flex size-11 items-center justify-center rounded-full bg-muted">
            <FileText className="size-5 text-muted-foreground" />
          </span>
          <p className="max-w-full truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </>
      ) : (
        <>
          <span className="flex size-11 items-center justify-center rounded-full bg-muted">
            <FileText className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">Processed locally in your browser — never uploaded</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
