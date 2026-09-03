"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HASH_UNITS = [
  { value: "1e9", label: "GH/s" },
  { value: "1e12", label: "TH/s" },
  { value: "1e15", label: "PH/s" },
  { value: "1e18", label: "EH/s" },
];

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

export function MiningProfitabilityCalculator() {
  const [hashRate, setHashRate] = React.useState("100");
  const [hashUnit, setHashUnit] = React.useState("1e12");
  const [powerWatts, setPowerWatts] = React.useState("3250");
  const [electricityCost, setElectricityCost] = React.useState("0.08");
  const [poolFee, setPoolFee] = React.useState("1");
  const [difficulty, setDifficulty] = React.useState("125000000000000");
  const [blockReward, setBlockReward] = React.useState("3.125");
  const [blockTimeSeconds, setBlockTimeSeconds] = React.useState("600");
  const [coinPrice, setCoinPrice] = React.useState("70000");

  const hashRateHs = (parseFloat(hashRate) || 0) * parseFloat(hashUnit);
  const power = parseFloat(powerWatts) || 0;
  const elecCost = parseFloat(electricityCost) || 0;
  const fee = (parseFloat(poolFee) || 0) / 100;
  const diff = parseFloat(difficulty) || 0;
  const reward = parseFloat(blockReward) || 0;
  const blockTime = parseFloat(blockTimeSeconds) || 600;
  const price = parseFloat(coinPrice) || 0;

  const networkHashRate = (diff * 2 ** 32) / blockTime;
  const yourShare = networkHashRate > 0 ? hashRateHs / networkHashRate : 0;
  const blocksPerDay = 86400 / blockTime;
  const dailyCoins = yourShare * blocksPerDay * reward * (1 - fee);
  const dailyRevenue = dailyCoins * price;
  const dailyPowerCost = (power / 1000) * 24 * elecCost;
  const dailyProfit = dailyRevenue - dailyPowerCost;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="mine-hashrate" className="text-sm text-muted-foreground">
            Your hash rate
          </Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id="mine-hashrate"
              value={hashRate}
              onChange={(e) => setHashRate(e.target.value)}
              className="font-mono"
            />
            <Select value={hashUnit} onValueChange={(v) => v && setHashUnit(v)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HASH_UNITS.map((u) => (
                  <SelectItem key={u.value} value={u.value}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="mine-power" className="text-sm text-muted-foreground">
            Power consumption (watts)
          </Label>
          <Input
            id="mine-power"
            value={powerWatts}
            onChange={(e) => setPowerWatts(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-elec" className="text-sm text-muted-foreground">
            Electricity cost ($/kWh)
          </Label>
          <Input
            id="mine-elec"
            value={electricityCost}
            onChange={(e) => setElectricityCost(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-fee" className="text-sm text-muted-foreground">
            Pool fee (%)
          </Label>
          <Input
            id="mine-fee"
            value={poolFee}
            onChange={(e) => setPoolFee(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-difficulty" className="text-sm text-muted-foreground">
            Network difficulty
          </Label>
          <Input
            id="mine-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-reward" className="text-sm text-muted-foreground">
            Block reward (coins)
          </Label>
          <Input
            id="mine-reward"
            value={blockReward}
            onChange={(e) => setBlockReward(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-blocktime" className="text-sm text-muted-foreground">
            Average block time (seconds)
          </Label>
          <Input
            id="mine-blocktime"
            value={blockTimeSeconds}
            onChange={(e) => setBlockTimeSeconds(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="mine-price" className="text-sm text-muted-foreground">
            Coin price ($)
          </Label>
          <Input
            id="mine-price"
            value={coinPrice}
            onChange={(e) => setCoinPrice(e.target.value)}
            className="mt-1.5 font-mono"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Daily coins earned", value: `${fmt(dailyCoins, 8)}` },
          { label: "Daily revenue", value: `$${fmt(dailyRevenue)}` },
          { label: "Daily power cost", value: `$${fmt(dailyPowerCost)}` },
          { label: "Daily profit", value: `$${fmt(dailyProfit)}` },
          { label: "Monthly profit", value: `$${fmt(dailyProfit * 30)}` },
          { label: "Yearly profit", value: `$${fmt(dailyProfit * 365)}` },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </p>
            <p
              className={`mt-1 font-mono text-sm font-semibold ${
                item.label.includes("profit") && dailyProfit < 0 ? "text-destructive" : ""
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Estimates only — network difficulty and coin price both change constantly, so actual
        results will drift from this snapshot over time. Enter the current network difficulty and
        price for the most accurate estimate.
      </p>
    </div>
  );
}
