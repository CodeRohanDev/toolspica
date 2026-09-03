"use client";

import * as React from "react";
import { FileVideo, FileAudio, FileArchive, X } from "lucide-react";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface MediaUploadZoneProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  accept?: string;
  kind?: "video" | "audio" | "archive";
  label?: string;
  multiple?: boolean;
  onFilesSelect?: (files: File[]) => void;
}

export function MediaUploadZone({
  file,
  onFileSelect,
  onClear,
  accept = "video/*",
  kind = "video",
  label,
  multiple,
  onFilesSelect,
}: MediaUploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const Icon = kind === "audio" ? FileAudio : kind === "archive" ? FileArchive : FileVideo;

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (multiple && onFilesSelect) {
      onFilesSelect(Array.from(files));
    } else {
      onFileSelect(files[0]);
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
            <Icon className="size-5 text-muted-foreground" />
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
            <Icon className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm font-medium">
            {label ?? `Drop a${kind === "audio" ? "n audio" : kind === "archive" ? "n archive" : " video"} file, or click to browse`}
          </p>
          <p className="text-xs text-muted-foreground">Processed locally in your browser — never uploaded</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

export { formatBytes };
