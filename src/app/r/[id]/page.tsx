"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvaluationResult } from "@/lib/types";
import ScoreDisplay from "@/components/ScoreDisplay";
import MirrorSection from "@/components/MirrorSection";
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
    if (cachedResult) return;
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

  return <ReviewLayout result={result} />;
}

function ReviewLayout({ result }: { result: EvaluationResult }) {
  const router = useRouter();

  // Backward compat: old evals have `mirror` string, new have `mirror_lead` + `mirror_bullets`
  const r = result as EvaluationResult & { mirror?: string };
  const mirrorLead = r.mirror_lead || r.mirror || "";
  const mirrorBullets = r.mirror_bullets || [];
  const ratingName = r.rating_name || "Reviewed";
  const verdict = r.verdict || "";

  return (
    <div className="flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <ScoreDisplay result={{ ...result, rating_name: ratingName, verdict }} />

        <hr className="border-gray-border" />

        <MirrorSection
          lead={mirrorLead}
          bullets={mirrorBullets}
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
