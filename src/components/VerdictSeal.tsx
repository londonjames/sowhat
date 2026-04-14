import { ratingName } from "@/lib/types";

interface VerdictSealProps {
  score: number;
}

function stampColor(score: number): string {
  if (score >= 80) return "#1a7a3a";
  if (score >= 60) return "#1a5a8a";
  if (score >= 40) return "#92600a";
  return "#8b3a3a";
}

export default function VerdictSeal({ score }: VerdictSealProps) {
  const name = ratingName(score);
  const color = stampColor(score);

  return (
    <svg
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer rounded rectangle */}
      <rect
        x="4" y="4" width="192" height="152" rx="12"
        stroke={color} strokeWidth="3" fill="none"
      />
      {/* Inner rounded rectangle */}
      <rect
        x="12" y="12" width="176" height="136" rx="8"
        stroke={color} strokeWidth="1" fill="none"
      />
      {/* Rating name at top */}
      <text
        x="100" y="48"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'EB Garamond', Georgia, serif"
        fontSize="24"
        fontWeight="700"
        fill={color}
        letterSpacing="0.05em"
      >
        {name.toUpperCase()}
      </text>
      {/* Divider line */}
      <line x1="40" y1="64" x2="160" y2="64" stroke={color} strokeWidth="1.5" />
      {/* Score number — big and bold */}
      <text
        x="100" y="96"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'EB Garamond', Georgia, serif"
        fontSize="48"
        fontWeight="700"
        fill={color}
      >
        {score}/100
      </text>
      {/* Divider line */}
      <line x1="40" y1="118" x2="160" y2="118" stroke={color} strokeWidth="1.5" />
      {/* Bottom label */}
      <text
        x="100" y="138"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Inter', sans-serif"
        fontSize="10"
        fontWeight="600"
        fill={color}
        letterSpacing="0.2em"
      >
        DOCUMENT REVIEW
      </text>
    </svg>
  );
}
