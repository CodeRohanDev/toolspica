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
import { X, Plus } from "lucide-react";

const GRADE_POINTS: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

let nextId = 3;

export function GpaCalculator() {
  const [courses, setCourses] = React.useState<Course[]>([
    { id: 1, name: "Course 1", grade: "A", credits: "3" },
    { id: 2, name: "Course 2", grade: "B", credits: "3" },
  ]);

  function addCourse() {
    setCourses((prev) => [
      ...prev,
      { id: nextId++, name: `Course ${prev.length + 1}`, grade: "A", credits: "3" },
    ]);
  }

  function removeCourse(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function updateCourse(id: number, field: keyof Course, value: string) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  const validCourses = courses.filter((c) => c.credits !== "" && parseFloat(c.credits) > 0);
  const totalCredits = validCourses.reduce((sum, c) => sum + (parseFloat(c.credits) || 0), 0);
  const totalPoints = validCourses.reduce(
    (sum, c) => sum + GRADE_POINTS[c.grade] * (parseFloat(c.credits) || 0),
    0
  );
  const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="space-y-2">
        {courses.map((course) => (
          <div key={course.id} className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Course</Label>
              <Input
                value={course.name}
                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Grade</Label>
              <Select
                value={course.grade}
                onValueChange={(value) => value && updateCourse(course.id, "grade", value)}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">Credits</Label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                value={course.credits}
                onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                placeholder="3"
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeCourse(course.id)}
              disabled={courses.length <= 1}
              aria-label="Remove course"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addCourse} className="mt-3">
        <Plus className="size-3.5" /> Add course
      </Button>

      {gpa !== null && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{gpa}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            GPA across {totalCredits} credit hours
          </p>
        </div>
      )}
    </div>
  );
}
