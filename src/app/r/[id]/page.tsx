"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvaluationResult, ratingName as computeRatingName } from "@/lib/types";
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
  const ratingNameVal = r.rating_name || computeRatingName(r.overall);
  const verdict = r.verdict || "";

  return (
    <div className="flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <ScoreDisplay result={{ ...result, rating_name: ratingNameVal, verdict }} />

        <div className="mt-6" />

        <MirrorSection
          lead={mirrorLead}
          bullets={mirrorBullets}
        />

        {/* Full horizontal rule before category sections */}
        <hr className="mt-8 mb-6 border-foreground/20" />

        {result.categories.map((cat, i) => (
          <div key={cat.name}>
            <CategoryCard category={cat} />
            {i < result.categories.length - 1 && (
              <hr className="my-4 border-foreground/20" />
            )}
          </div>
        ))}

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="rounded-lg border border-[#1a5a8a] bg-[#1a5a8a] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[#1a5a8a]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Review Another Document
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="rounded-lg border border-gray-border px-8 py-3 text-sm uppercase tracking-[0.15em] text-[#1a5a8a] transition-colors hover:border-[#1a5a8a] hover:bg-[#1a5a8a] hover:text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Share This Review
          </button>
        </div>
      </div>
    </div>
  );
}
