"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Loader2, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/image-processing";
import { downloadAllAsZip } from "@/lib/batch-download";
import { useObjectUrl } from "@/lib/use-object-url";
import type { BatchItem } from "@/lib/use-batch-files";

interface BatchFileListProps {
  items: BatchItem[];
  onRemove?: (id: string) => void;
  zipName?: string;
}

function BatchFileRow({ item, onRemove }: { item: BatchItem; onRemove?: (id: string) => void }) {
  const isImage = item.file.type.startsWith("image/");
  const originalUrl = useObjectUrl(isImage ? item.file : null);
  const resultUrl = useObjectUrl(isImage && item.status === "done" ? (item.resultBlob ?? null) : null);

  return (
    <div className="flex items-center gap-3 p-3">
      {isImage && (originalUrl || resultUrl) && (
        <div className="flex shrink-0 items-center gap-1.5">
          {originalUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={originalUrl}
              alt=""
              className="size-10 rounded-md border object-cover"
              style={{
                backgroundImage:
                  "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
                backgroundSize: "10px 10px",
              }}
            />
          )}
          {resultUrl && (
            <>
              <span className="text-xs text-muted-foreground">→</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt=""
                className="size-10 rounded-md border object-cover"
                style={{
                  backgroundImage:
                    "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
                  backgroundSize: "10px 10px",
                }}
              />
            </>
          )}
        </div>
      )}

      {item.status === "processing" && (
        <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
      )}
      {item.status === "queued" && (
        <Loader2 className="size-4 shrink-0 text-muted-foreground opacity-40" />
      )}
      {item.status === "done" && <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />}
      {item.status === "error" && <XCircle className="size-4 shrink-0 text-destructive" />}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{item.file.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {item.status === "error"
            ? item.error
            : item.status === "done" && item.resultBlob
              ? `${formatBytes(item.file.size)} → ${formatBytes(item.resultBlob.size)}`
              : formatBytes(item.file.size)}
        </p>
      </div>
      {item.status === "done" && item.resultBlob && (
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => downloadBlob(item.resultBlob!, item.resultName ?? item.file.name)}
          aria-label={`Download ${item.resultName ?? item.file.name}`}
        >
          <Download className="size-4" />
        </Button>
      )}
      {onRemove && (
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.file.name}`}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}

export function BatchFileList({ items, onRemove, zipName = "converted-files.zip" }: BatchFileListProps) {
  if (items.length === 0) return null;

  const doneItems = items.filter((item) => item.status === "done" && item.resultBlob);

  return (
    <div className="mt-4 space-y-3">
      {doneItems.length > 1 && (
        <div className="flex justify-end">
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
      <div className="divide-y overflow-hidden rounded-lg border">
        {items.map((item) => (
          <BatchFileRow key={item.id} item={item} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
