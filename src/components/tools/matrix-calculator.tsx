"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinant,
  inverseMatrix,
  createEmptyMatrix,
  type Matrix,
} from "@/lib/matrix";

type Operation = "add" | "subtract" | "multiply" | "transpose" | "determinant" | "inverse";

const OPERATIONS: { value: Operation; label: string; needsB: boolean }[] = [
  { value: "add", label: "A + B", needsB: true },
  { value: "subtract", label: "A − B", needsB: true },
  { value: "multiply", label: "A × B", needsB: true },
  { value: "transpose", label: "Transpose A", needsB: false },
  { value: "determinant", label: "Determinant of A", needsB: false },
  { value: "inverse", label: "Inverse of A", needsB: false },
];

function fmt(n: number): string {
  const rounded = Math.round(n * 1e6) / 1e6;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function MatrixGrid({
  matrix,
  onChange,
  label,
}: {
  matrix: Matrix;
  onChange: (m: Matrix) => void;
  label: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-1.5 inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(0, 3.5rem))` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <Input
              key={`${i}-${j}`}
              value={val}
              onChange={(e) => {
                const next = matrix.map((r) => r.slice());
                next[i][j] = parseFloat(e.target.value) || 0;
                onChange(next);
              }}
              className="h-9 px-1 text-center font-mono text-sm"
            />
          ))
        )}
      </div>
    </div>
  );
}

export function MatrixCalculator() {
  const [size, setSize] = React.useState(2);
  const [operation, setOperation] = React.useState<Operation>("multiply");
  const [matrixA, setMatrixA] = React.useState<Matrix>(createEmptyMatrix(2, 2));
  const [matrixB, setMatrixB] = React.useState<Matrix>(createEmptyMatrix(2, 2));
  const [error, setError] = React.useState<string | null>(null);

  function resize(n: number) {
    setSize(n);
    setMatrixA(createEmptyMatrix(n, n));
    setMatrixB(createEmptyMatrix(n, n));
    setError(null);
  }

  const result = React.useMemo(() => {
    setError(null);
    try {
      switch (operation) {
        case "add":
          return { matrix: addMatrices(matrixA, matrixB) };
        case "subtract":
          return { matrix: subtractMatrices(matrixA, matrixB) };
        case "multiply":
          return { matrix: multiplyMatrices(matrixA, matrixB) };
        case "transpose":
          return { matrix: transposeMatrix(matrixA) };
        case "determinant":
          return { scalar: determinant(matrixA) };
        case "inverse":
          return { matrix: inverseMatrix(matrixA) };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't compute this operation.");
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, matrixA, matrixB]);

  const activeOp = OPERATIONS.find((o) => o.value === operation)!;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Matrix size</Label>
          <Select value={String(size)} onValueChange={(v) => v && resize(Number(v))}>
            <SelectTrigger className="mt-1.5 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}×{n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Operation</Label>
          <Select value={operation} onValueChange={(v) => v && setOperation(v as Operation)}>
            <SelectTrigger className="mt-1.5 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPERATIONS.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-8">
        <MatrixGrid matrix={matrixA} onChange={setMatrixA} label="Matrix A" />
        {activeOp.needsB && <MatrixGrid matrix={matrixB} onChange={setMatrixB} label="Matrix B" />}
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5">
          <p className="text-sm font-medium">Result</p>
          {"scalar" in result ? (
            <p className="mt-1.5 font-mono text-lg font-semibold">{fmt(result.scalar!)}</p>
          ) : (
            <div
              className="mt-1.5 inline-grid gap-1"
              style={{ gridTemplateColumns: `repeat(${result.matrix![0].length}, minmax(0, 3.5rem))` }}
            >
              {result.matrix!.map((row, i) =>
                row.map((val, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="flex h-9 items-center justify-center rounded-md border bg-muted/40 font-mono text-sm"
                  >
                    {fmt(val)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
