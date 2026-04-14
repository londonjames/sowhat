import Image from "next/image";
import { EvaluationResult } from "@/lib/types";

const STAMP_IMAGES: Record<string, string> = {
  "Crystal Clear": "/stamps/crystal-clear.png",
  "On Point": "/stamps/on-point.png",
  "Getting There": "/stamps/getting-there.png",
  "Hazy": "/stamps/hazy.png",
  "Muddled": "/stamps/muddled.png",
  "Lost": "/stamps/lost.png",
  "Nope": "/stamps/nope.png",
};

interface ScoreDisplayProps {
  result: EvaluationResult;
}

export default function ScoreDisplay({ result }: ScoreDisplayProps) {
  const stampSrc = STAMP_IMAGES[result.rating_name] || STAMP_IMAGES["Muddled"];

  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src={stampSrc}
        alt={result.rating_name}
        width={320}
        height={200}
        className="h-auto w-[280px]"
        priority
      />
      <p
        className="max-w-lg text-center text-2xl leading-relaxed"
        style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
      >
        <span className="font-bold">{result.overall}/100</span>
        {result.verdict && (
          <>
            {" — "}
            <span className="italic">{result.verdict}</span>
          </>
        )}
      </p>
    </div>
  );
}
