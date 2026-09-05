"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function WallpaperCalculator() {
  const [roomLength, setRoomLength] = React.useState(12);
  const [roomWidth, setRoomWidth] = React.useState(10);
  const [height, setHeight] = React.useState(8);
  const [rollWidth, setRollWidth] = React.useState(21); // inches, standard US roll
  const [rollLength, setRollLength] = React.useState(33); // feet per roll

  const perimeter = 2 * (roomLength + roomWidth);
  const stripsNeeded = Math.ceil((perimeter * 12) / rollWidth);
  const stripsPerRoll = Math.floor(rollLength / height);
  const rollsNeeded = stripsPerRoll > 0 ? Math.ceil(stripsNeeded / stripsPerRoll) : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Room dimensions (feet)</p>
      <div className="mt-1.5 grid grid-cols-3 gap-3">
        <Input type="number" value={roomLength} onChange={(e) => setRoomLength(Number(e.target.value))} placeholder="Length" />
        <Input type="number" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value))} placeholder="Width" />
        <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="Height" />
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">Roll size</p>
      <div className="mt-1.5 grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Width (inches)</Label>
          <Input type="number" value={rollWidth} onChange={(e) => setRollWidth(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Length per roll (ft)</Label>
          <Input type="number" value={rollLength} onChange={(e) => setRollLength(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <StatBar items={[{ label: "wall strips needed", value: stripsNeeded }, { label: "strips per roll", value: stripsPerRoll }, { label: "rolls to buy", value: rollsNeeded }]} />
      <p className="mt-2 text-xs text-muted-foreground">
        Default roll size (21in × 33ft) matches a standard US single roll — adjust to match the
        specific wallpaper you&apos;re using.
      </p>
    </div>
  );
}
