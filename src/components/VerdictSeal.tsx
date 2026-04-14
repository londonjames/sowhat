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
  const name = ratingName(score).toUpperCase();
  const color = stampColor(score);
  // Scale font down for long names
  const nameFontSize = name.length > 12 ? 16 : name.length > 8 ? 20 : 24;

  return (
    <svg
      width="180"
      height="140"
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer rounded rectangle */}
      <rect
        x="3" y="3" width="174" height="134" rx="10"
        stroke={color} strokeWidth="3" fill="none"
      />
      {/* Inner rounded rectangle */}
      <rect
        x="10" y="10" width="160" height="120" rx="6"
        stroke={color} strokeWidth="1" fill="none"
      />
      {/* Rating name at top */}
      <text
        x="90" y="38"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'EB Garamond', Georgia, serif"
        fontSize={nameFontSize}
        fontWeight="700"
        fill={color}
        letterSpacing="0.08em"
      >
        {name}
      </text>
      {/* Divider line */}
      <line x1="30" y1="52" x2="150" y2="52" stroke={color} strokeWidth="1.5" />
      {/* Score number */}
      <text
        x="90" y="82"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'EB Garamond', Georgia, serif"
        fontSize="40"
        fontWeight="700"
        fill={color}
      >
        {score}/100
      </text>
      {/* Divider line */}
      <line x1="30" y1="102" x2="150" y2="102" stroke={color} strokeWidth="1.5" />
      {/* Bottom label */}
      <text
        x="90" y="120"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Inter', sans-serif"
        fontSize="9"
        fontWeight="600"
        fill={color}
        letterSpacing="0.2em"
      >
        DOCUMENT REVIEW
      </text>
    </svg>
  );
}
