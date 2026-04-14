import { ratingName } from "@/lib/types";

interface VerdictSealProps {
  score: number;
}

function stampColor(score: number): string {
  if (score >= 80) return "#1a6b35";
  if (score >= 60) return "#1a5a8a";
  if (score >= 40) return "#8b6914";
  return "#8b3a3a";
}

export default function VerdictSeal({ score }: VerdictSealProps) {
  const name = ratingName(score).toUpperCase();
  const color = stampColor(score);
  const filterId = `stamp-rough-${score}`;

  return (
    <svg
      width="320"
      height="200"
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      style={{ transform: "rotate(-2deg)" }}
    >
      <defs>
        {/* Rough/distressed edge filter */}
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* Outer rectangle */}
        <rect
          x="6" y="6" width="308" height="188" rx="12"
          stroke={color} strokeWidth="4" fill="none"
          opacity="0.85"
        />
        {/* Inner rectangle */}
        <rect
          x="16" y="16" width="288" height="168" rx="8"
          stroke={color} strokeWidth="1.5" fill="none"
          opacity="0.6"
        />
        {/* Rating name — large */}
        <text
          x="160" y="68"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'EB Garamond', Georgia, serif"
          fontSize="36"
          fontWeight="700"
          fill={color}
          letterSpacing="0.1em"
          opacity="0.9"
        >
          {name}
        </text>
        {/* Divider */}
        <line x1="50" y1="90" x2="270" y2="90" stroke={color} strokeWidth="2" opacity="0.7" />
        {/* Score */}
        <text
          x="160" y="130"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'EB Garamond', Georgia, serif"
          fontSize="52"
          fontWeight="700"
          fill={color}
          opacity="0.9"
        >
          {score}/100
        </text>
        {/* Divider */}
        <line x1="50" y1="155" x2="270" y2="155" stroke={color} strokeWidth="2" opacity="0.7" />
        {/* Bottom label */}
        <text
          x="160" y="176"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'EB Garamond', Georgia, serif"
          fontSize="14"
          fontWeight="600"
          fill={color}
          letterSpacing="0.15em"
          opacity="0.7"
        >
          DOCUMENT REVIEW
        </text>
      </g>
    </svg>
  );
}
