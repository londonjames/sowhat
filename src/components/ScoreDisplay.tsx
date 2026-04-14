import StarRating from "./StarRating";
import { EvaluationResult } from "@/lib/types";

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {result.rating_name}
        </h1>
        <span className="text-xl text-gray-light">({result.overall}/100)</span>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { label: "Intent", score: result.scores.intent },
          { label: "Delivery", score: result.scores.delivery },
          { label: "Narrative", score: result.scores.narrative },
        ].map(({ label, score }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-20 text-right text-sm text-gray-light">
              {label}
            </span>
            <StarRating rating={score} />
          </div>
        ))}
      </div>

      <p className="mt-1 text-center text-xl italic text-gray">
        &ldquo;{result.verdict}&rdquo;
      </p>
    </div>
  );
}
