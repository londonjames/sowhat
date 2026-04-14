import VerdictSeal from "./VerdictSeal";
import { EvaluationResult } from "@/lib/types";

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Seal + Rating Name side by side */}
      <div className="flex items-center gap-8">
        <VerdictSeal score={result.overall} />
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-light">
            My Verdict
          </p>
          <h1
            className="mt-1 text-5xl font-medium italic text-foreground md:text-6xl"
            style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
          >
            {result.rating_name}
          </h1>
        </div>
      </div>

      {/* Verdict quote */}
      <p
        className="max-w-md text-center text-xl leading-relaxed italic text-gray"
        style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
      >
        {result.verdict}
      </p>
    </div>
  );
}
