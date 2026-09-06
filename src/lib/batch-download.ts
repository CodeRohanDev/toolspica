import JSZip from "jszip";
import { downloadBlob } from "@/lib/image-processing";

export async function downloadAllAsZip(files: { name: string; blob: Blob }[], zipName: string) {
  const zip = new JSZip();
  const usedNames = new Set<string>();
  for (const f of files) {
    let name = f.name;
    let i = 2;
    while (usedNames.has(name)) {
      const dot = f.name.lastIndexOf(".");
      name = dot > 0 ? `${f.name.slice(0, dot)} (${i})${f.name.slice(dot)}` : `${f.name} (${i})`;
      i++;
    }
    usedNames.add(name);
    zip.file(name, f.blob);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, zipName);
}
