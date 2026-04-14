import VerdictSeal from "./VerdictSeal";
import { EvaluationResult } from "@/lib/types";

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Critic + Seal + Rating Name */}
      <div className="flex items-center gap-5">
        <CriticIllustration />
        <VerdictSeal score={result.overall} />
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-light">
            My Verdict
          </p>
          <h1
            className="text-5xl font-medium italic text-foreground"
            style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
          >
            {result.rating_name}
          </h1>
        </div>
      </div>

      {/* Verdict quote */}
      <p
        className="text-center text-xl italic text-gray"
        style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
      >
        &ldquo;{result.verdict}&rdquo;
      </p>
    </div>
  );
}

function CriticIllustration() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Head */}
      <ellipse cx="60" cy="38" rx="22" ry="26" fill="#333" />
      {/* Hair swept back */}
      <path
        d="M38 30c0-16 10-24 22-24s22 8 22 24c0 2-1 4-2 5 1-14-8-22-20-22S40 17 41 31c-2-1-3-3-3-1z"
        fill="#222"
      />
      {/* Face */}
      <ellipse cx="60" cy="42" rx="17" ry="20" fill="#f0dcc8" />
      {/* Glasses frames */}
      <rect x="44" y="36" width="14" height="10" rx="3" stroke="#333" strokeWidth="1.5" fill="none" />
      <rect x="62" y="36" width="14" height="10" rx="3" stroke="#333" strokeWidth="1.5" fill="none" />
      <line x1="58" y1="41" x2="62" y2="41" stroke="#333" strokeWidth="1.5" />
      {/* Eyes behind glasses */}
      <circle cx="51" cy="41" r="1.5" fill="#333" />
      <circle cx="69" cy="41" r="1.5" fill="#333" />
      {/* Eyebrows - slightly raised, critical */}
      <path d="M45 34c2-2 6-2 8 0" stroke="#444" strokeWidth="1" fill="none" />
      <path d="M67 34c2-2 6-2 8 0" stroke="#444" strokeWidth="1" fill="none" />
      {/* Nose */}
      <path d="M60 44v6c0 1-2 2-3 2" stroke="#c9a88a" strokeWidth="1" fill="none" />
      {/* Mouth - slight knowing smirk */}
      <path d="M53 55c3 2 8 2 12-1" stroke="#b88a6f" strokeWidth="1.2" fill="none" />
      {/* Neck */}
      <rect x="54" y="60" width="12" height="8" fill="#f0dcc8" />
      {/* Shoulders / blazer */}
      <path
        d="M30 100c0-20 12-32 30-32s30 12 30 32"
        fill="#333"
      />
      {/* Blazer lapels */}
      <path d="M52 68l-8 20h6l6-14z" fill="#444" />
      <path d="M68 68l8 20h-6l-6-14z" fill="#444" />
      {/* Shirt collar */}
      <path d="M54 68l6 10 6-10" fill="white" />
      {/* Pen in pocket */}
      <line x1="42" y1="82" x2="44" y2="72" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
      {/* Document in hand */}
      <rect x="78" y="88" width="18" height="24" rx="1" fill="white" stroke="#ddd" strokeWidth="0.75" />
      <line x1="82" y1="94" x2="92" y2="94" stroke="#ddd" strokeWidth="0.75" />
      <line x1="82" y1="98" x2="92" y2="98" stroke="#ddd" strokeWidth="0.75" />
      <line x1="82" y1="102" x2="88" y2="102" stroke="#ddd" strokeWidth="0.75" />
    </svg>
  );
}
