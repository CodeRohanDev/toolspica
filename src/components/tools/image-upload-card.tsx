"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import { formatBytes } from "@/lib/image-processing";

interface ImageUploadCardProps {
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  accept?: string;
  label?: string;
}

export function ImageUploadCard({
  file,
  previewUrl,
  onFileSelect,
  onClear,
  accept = "image/*",
  label = "Original",
}: ImageUploadCardProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function handleFiles(files: FileList | null) {
    const picked = files?.[0];
    if (picked) onFileSelect(picked);
  }

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
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
        onClick={() => !previewUrl && inputRef.current?.click()}
        className={`relative mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          isDragging ? "border-brand bg-brand-soft" : "border-muted-foreground/25"
        } ${!previewUrl ? "cursor-pointer hover:border-brand/50" : ""}`}
        style={
          previewUrl
            ? {
                backgroundImage:
                  "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
                backgroundSize: "20px 20px",
              }
            : undefined
        }
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="size-full object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
              aria-label="Remove image"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted">
              <ImagePlus className="size-5 text-muted-foreground" />
            </span>
            <p className="text-sm font-medium">Drop an image, or click to browse</p>
            <p className="text-xs text-muted-foreground">
              Processed locally in your browser — never uploaded
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {file && (
        <p className="mt-1.5 truncate text-xs text-muted-foreground">
          {file.name} · {formatBytes(file.size)}
        </p>
      )}
    </div>
  );
}
