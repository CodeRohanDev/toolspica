"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALES: Record<string, number[]> = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
  "Blues": [0, 3, 5, 6, 7, 10],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
};

const INTERVAL_NAMES = [
  "Unison", "Minor 2nd", "Major 2nd", "Minor 3rd", "Major 3rd", "Perfect 4th",
  "Tritone", "Perfect 5th", "Minor 6th", "Major 6th", "Minor 7th", "Major 7th",
];

export function MusicIntervalAndScaleCalculator() {
  const [rootNote, setRootNote] = React.useState("C");
  const [scaleName, setScaleName] = React.useState("Major");

  const rootIndex = NOTES.indexOf(rootNote);
  const scaleIntervals = SCALES[scaleName];
  const scaleNotes = scaleIntervals.map((interval) => NOTES[(rootIndex + interval) % 12]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Root note</Label>
          <select value={rootNote} onChange={(e) => setRootNote(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {NOTES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Scale</Label>
          <select value={scaleName} onChange={(e) => setScaleName(e.target.value)} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {Object.keys(SCALES).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {scaleNotes.map((note, i) => (
          <div key={i} className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
            <p className="text-lg font-semibold">{note}</p>
            <p className="text-xs text-muted-foreground">{INTERVAL_NAMES[scaleIntervals[i]]}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto border-t pt-4">
        <p className="mb-2 text-sm font-medium text-muted-foreground">All intervals from {rootNote}</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-2">Semitones</th>
              <th className="pb-2">Interval</th>
              <th className="pb-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {INTERVAL_NAMES.map((name, i) => (
              <tr key={i} className="border-t">
                <td className="py-1">{i}</td>
                <td className="py-1">{name}</td>
                <td className="py-1 font-medium">{NOTES[(rootIndex + i) % 12]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
