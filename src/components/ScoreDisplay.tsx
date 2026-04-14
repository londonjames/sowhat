import StarRating from "./StarRating";
import { EvaluationResult } from "@/lib/types";

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {result.rating_name}
        </h1>
        <span className="text-xl text-gray">({result.overall}/100)</span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray">
        <div className="flex items-center gap-2">
          <span>Intent</span>
          <StarRating rating={result.scores.intent} />
        </div>
        <div className="flex items-center gap-2">
          <span>Delivery</span>
          <StarRating rating={result.scores.delivery} />
        </div>
        <div className="flex items-center gap-2">
          <span>Narrative</span>
          <StarRating rating={result.scores.narrative} />
        </div>
      </div>

      <p className="mt-1 text-center text-lg italic text-gray">
        &ldquo;{result.verdict}&rdquo;
      </p>
    </div>
  );
}
