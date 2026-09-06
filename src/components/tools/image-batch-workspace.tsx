"use client";

import * as React from "react";
import { Loader2, Download, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { useObjectUrl } from "@/lib/use-object-url";
import { downloadBlob, formatBytes } from "@/lib/image-processing";
import { downloadAllAsZip } from "@/lib/batch-download";
import type { BatchItem } from "@/lib/use-batch-files";

const CHECKERBOARD_STYLE: React.CSSProperties = {
  backgroundImage:
    "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
  backgroundSize: "16px 16px",
};

interface ImageBatchWorkspaceProps {
  items: BatchItem[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (id: string) => void;
  accept?: string;
  uploadLabel?: string;
  zipName?: string;
}

export function ImageBatchWorkspace({
  items,
  onFilesSelect,
  onRemove,
  accept = "image/*",
  uploadLabel,
  zipName = "converted-images.zip",
}: ImageBatchWorkspaceProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const addMoreInputRef = React.useRef<HTMLInputElement>(null);

  const active = items.find((i) => i.id === activeId) ?? items[0] ?? null;

  React.useEffect(() => {
    if (items.length > 0 && !items.some((i) => i.id === activeId)) {
      Promise.resolve().then(() => setActiveId(items[0].id));
    }
  }, [items, activeId]);

  const originalUrl = useObjectUrl(active?.file);
  const resultUrl = useObjectUrl(active?.resultBlob);

  if (items.length === 0) {
    return <BatchUploadZone accept={accept} onFilesSelect={onFilesSelect} label={uploadLabel} />;
  }

  const doneItems = items.filter((item) => item.status === "done" && item.resultBlob);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Original</p>
          <div
            className="mt-2 flex min-h-[240px] items-center justify-center overflow-hidden rounded-xl border"
            style={CHECKERBOARD_STYLE}
          >
            {originalUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={originalUrl} alt="Original" className="max-h-[420px] max-w-full object-contain" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Live preview</p>
          <div
            className="mt-2 flex min-h-[240px] items-center justify-center overflow-hidden rounded-xl border"
            style={CHECKERBOARD_STYLE}
          >
            {active && (active.status === "processing" || active.status === "queued") && (
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            )}
            {active?.status === "error" && (
              <p className="p-4 text-center text-sm text-destructive">{active.error}</p>
            )}
            {resultUrl && active?.status === "done" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Live preview" className="max-h-[420px] max-w-full object-contain" />
            )}
          </div>
          {active?.status === "done" && active.resultBlob && (
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {formatBytes(active.file.size)} → {formatBytes(active.resultBlob.size)}
              </p>
              <Button
                type="button"
                size="sm"
                onClick={() => downloadBlob(active.resultBlob!, active.resultName ?? active.file.name)}
              >
                <Download className="size-3.5" />
                Download
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <ThumbButton
            key={item.id}
            item={item}
            active={item.id === active?.id}
            onSelect={() => setActiveId(item.id)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
        <button
          type="button"
          onClick={() => addMoreInputRef.current?.click()}
          className="flex size-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-dashed text-muted-foreground hover:border-brand/50 hover:text-foreground"
          aria-label="Add more images"
        >
          <Plus className="size-4" />
        </button>
        <input
          ref={addMoreInputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) onFilesSelect(Array.from(e.target.files));
            e.target.value = "";
          }}
        />
      </div>

      {doneItems.length > 1 && (
        <div className="mt-3 flex justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              downloadAllAsZip(
                doneItems.map((item) => ({ name: item.resultName ?? item.file.name, blob: item.resultBlob! })),
                zipName
              )
            }
          >
            <Download className="size-4" />
            Download all ({doneItems.length}) as ZIP
          </Button>
        </div>
      )}
    </div>
  );
}

function ThumbButton({
  item,
  active,
  onSelect,
  onRemove,
}: {
  item: BatchItem;
  active: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const thumbUrl = useObjectUrl(item.file);
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onSelect}
        className={`block size-14 overflow-hidden rounded-lg border-2 ${active ? "border-brand" : "border-transparent hover:border-brand/40"}`}
        style={CHECKERBOARD_STYLE}
        aria-label={`Show ${item.file.name}`}
      >
        {thumbUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbUrl} alt="" className="size-full object-cover" />
        )}
      </button>
      {item.status === "processing" || item.status === "queued" ? (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-background shadow">
          <Loader2 className="size-3 animate-spin text-muted-foreground" />
        </span>
      ) : item.status === "error" ? (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[8px] text-destructive-foreground shadow">
          !
        </span>
      ) : (
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-emerald-500 shadow" />
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -bottom-1 -left-1 flex size-4 items-center justify-center rounded-full bg-background opacity-0 shadow group-hover:opacity-100"
        aria-label={`Remove ${item.file.name}`}
      >
        <X className="size-3" />
      </button>
    </div>
  );
}
