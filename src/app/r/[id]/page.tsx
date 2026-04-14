"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvaluationResult } from "@/lib/types";
import MirrorSection from "@/components/MirrorSection";
import ScoreDisplay from "@/components/ScoreDisplay";
import CategoryCard from "@/components/CategoryCard";

function getSessionResult(): EvaluationResult | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("sowhat_result");
    if (!stored) return null;
    sessionStorage.removeItem("sowhat_result");
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export default function SavedReviewPage() {
  const params = useParams();
  const router = useRouter();
  const cachedResult = useMemo(() => getSessionResult(), []);
  const [result, setResult] = useState<EvaluationResult | null>(cachedResult);
  const [loading, setLoading] = useState(!cachedResult);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cachedResult) return; // Already have data from sessionStorage

    const id = params.id as string;
    if (!id) return;
    fetch(`/api/review?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setResult(data.evaluation);
        setLoading(false);
      })
      .catch(() => {
        setError("Review not found.");
        setLoading(false);
      });
  }, [params.id, cachedResult]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-border border-t-accent" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray">{error || "Review not found."}</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-xl border border-gray-border px-6 py-2 text-sm text-foreground hover:bg-surface"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl space-y-10">
        <MirrorSection text={result.mirror} />

        <div className="flex justify-center py-4">
          <ScoreDisplay score={result.overall} />
        </div>

        <div className="space-y-4">
          {result.categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
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
