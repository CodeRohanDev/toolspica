"use client";

import * as React from "react";
import { createSevenZip } from "@/lib/sevenzip-setup";

export interface SevenZipFileResult {
  name: string;
  data: Uint8Array;
}

export function useSevenZipJob() {
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  /** Writes `inputs` into a fresh sandbox, runs `args` via 7zz's CLI, then reads back every file matching `outputPattern` (a substring or predicate). */
  const run = React.useCallback(
    async (
      inputs: SevenZipFileResult[],
      args: string[],
      readBack: (fs: Awaited<ReturnType<typeof createSevenZip>>["FS"]) => SevenZipFileResult[]
    ): Promise<SevenZipFileResult[]> => {
      setProcessing(true);
      setError(null);
      try {
        const sevenZip = await createSevenZip();
        for (const input of inputs) sevenZip.FS.writeFile(input.name, input.data);
        sevenZip.callMain(args);
        return readBack(sevenZip.FS);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Archive processing failed — the file may be corrupted, encrypted, or in an unsupported variant.");
        throw err;
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  return { run, processing, error, setError };
}
