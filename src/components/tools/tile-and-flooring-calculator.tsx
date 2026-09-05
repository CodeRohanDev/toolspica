"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function TileAndFlooringCalculator() {
  const [roomLength, setRoomLength] = React.useState(15);
  const [roomWidth, setRoomWidth] = React.useState(12);
  const [tileLength, setTileLength] = React.useState(12);
  const [tileWidth, setTileWidth] = React.useState(12);
  const [waste, setWaste] = React.useState(10);

  const roomArea = roomLength * roomWidth;
  const tileAreaSqFt = (tileLength * tileWidth) / 144; // inches to sq ft
  const tilesNeeded = tileAreaSqFt > 0 ? Math.ceil((roomArea * (1 + waste / 100)) / tileAreaSqFt) : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">Room dimensions (feet)</p>
      <div className="mt-1.5 grid grid-cols-2 gap-3">
        <Input type="number" value={roomLength} onChange={(e) => setRoomLength(Number(e.target.value))} placeholder="Length" />
        <Input type="number" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value))} placeholder="Width" />
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">Tile size (inches)</p>
      <div className="mt-1.5 grid grid-cols-2 gap-3">
        <Input type="number" value={tileLength} onChange={(e) => setTileLength(Number(e.target.value))} placeholder="Length" />
        <Input type="number" value={tileWidth} onChange={(e) => setTileWidth(Number(e.target.value))} placeholder="Width" />
      </div>

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Waste/cut allowance: {waste}%</Label>
        <input type="range" min={5} max={20} value={waste} onChange={(e) => setWaste(Number(e.target.value))} className="mt-2 w-full" />
      </div>

      <StatBar items={[{ label: "room area", value: `${roomArea.toFixed(0)} sq ft` }, { label: "tiles needed", value: tilesNeeded }]} />
      <p className="mt-2 text-xs text-muted-foreground">
        Waste allowance accounts for cuts, breakage, and pattern matching — 10% is standard for a
        straight-lay pattern, higher for diagonal layouts.
      </p>
    </div>
  );
}
