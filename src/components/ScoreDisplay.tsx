import VerdictSeal from "./VerdictSeal";
import { EvaluationResult } from "@/lib/types";

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <VerdictSeal score={result.overall} />
      <p
        className="max-w-lg text-center text-2xl leading-relaxed italic"
        style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#666" }}
      >
        {result.verdict}
      </p>
    </div>
  );
}
