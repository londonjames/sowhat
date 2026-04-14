"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { EvaluationResult } from "@/lib/types";
import ScoreDisplay from "@/components/ScoreDisplay";
import MirrorSection from "@/components/MirrorSection";
import CategoryCard from "@/components/CategoryCard";

function getStoredResult(): EvaluationResult | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("sowhat_result");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export default function ReviewPage() {
  const router = useRouter();
  const result = useMemo(() => getStoredResult(), []);

  if (!result) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-border border-t-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <ScoreDisplay result={result} />

        <hr className="border-gray-border" />

        <MirrorSection
          lead={result.mirror_lead}
          bullets={result.mirror_bullets}
        />

        <hr className="border-gray-border" />

        <div className="space-y-10">
          {result.categories.map((cat, i) => (
            <div key={cat.name}>
              <CategoryCard category={cat} />
              {i < result.categories.length - 1 && (
                <hr className="mt-10 border-gray-border" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-gray-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Review Another Document
          </button>
        </div>
      </div>
    </div>
  );
}
