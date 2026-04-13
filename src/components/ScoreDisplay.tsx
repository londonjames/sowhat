"use client";

import { scoreColor } from "@/lib/types";

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-8xl font-bold tabular-nums"
        style={{ color: scoreColor(score) }}
      >
        {score}
      </span>
      <span className="text-sm tracking-widest text-gray-light uppercase">
        out of 100
      </span>
    </div>
  );
}
