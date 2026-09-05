"use client";

import * as React from "react";
import { Upload, Calendar } from "lucide-react";

interface CalendarEvent {
  summary: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

function unfold(text: string): string {
  return text.replace(/\r?\n[ \t]/g, "");
}

function formatIcsDate(value: string): string {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?/);
  if (!match) return value;
  const [, y, mo, d, , h, mi] = match;
  if (h) return `${y}-${mo}-${d} ${h}:${mi}`;
  return `${y}-${mo}-${d}`;
}

function parseIcs(text: string): CalendarEvent[] {
  const unfolded = unfold(text);
  const blocks = unfolded.split(/BEGIN:VEVENT/).slice(1);
  return blocks.map((block) => {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const event: CalendarEvent = { summary: "", start: "", end: "", location: "", description: "" };
    for (const line of lines) {
      const [rawKey, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      const key = rawKey.split(";")[0].toUpperCase();
      if (key === "SUMMARY") event.summary = value;
      else if (key === "DTSTART") event.start = formatIcsDate(value);
      else if (key === "DTEND") event.end = formatIcsDate(value);
      else if (key === "LOCATION") event.location = value.replace(/\\,/g, ",");
      else if (key === "DESCRIPTION") event.description = value.replace(/\\n/g, " ").replace(/\\,/g, ",");
    }
    return event;
  }).filter((e) => e.summary || e.start);
}

export function IcsCalendarFileViewer() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [fileName, setFileName] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    setEvents(parseIcs(text));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a .ics calendar file"}
        <input type="file" accept=".ics" onChange={handleUpload} className="hidden" />
      </label>

      {events.length > 0 ? (
        <div className="mt-4 space-y-3">
          {events.map((event, i) => (
            <div key={i} className="flex gap-3 rounded-lg border p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Calendar className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{event.summary || "(no title)"}</p>
                <p className="text-xs text-muted-foreground">
                  {event.start}
                  {event.end ? ` — ${event.end}` : ""}
                </p>
                {event.location && <p className="text-xs text-muted-foreground">{event.location}</p>}
                {event.description && <p className="mt-1 text-xs">{event.description}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        fileName && <p className="mt-3 text-sm text-muted-foreground">No events found in this file.</p>
      )}
    </div>
  );
}
