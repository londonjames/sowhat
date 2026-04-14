import { ratingName } from "@/lib/types";

interface VerdictSealProps {
  score: number;
}

const SEAL_COLORS: Record<string, { ring: string; text: string; bg: string }> = {
  "Crystal Clear": { ring: "#16a34a", text: "#16a34a", bg: "#f0fdf4" },
  "On Point": { ring: "#16a34a", text: "#16a34a", bg: "#f0fdf4" },
  "In the Right Direction": { ring: "#d97706", text: "#d97706", bg: "#fffbeb" },
  "Hazy": { ring: "#d97706", text: "#d97706", bg: "#fffbeb" },
  "Muddled": { ring: "#dc2626", text: "#dc2626", bg: "#fef2f2" },
  "Adrift": { ring: "#dc2626", text: "#dc2626", bg: "#fef2f2" },
  "Lost": { ring: "#dc2626", text: "#dc2626", bg: "#fef2f2" },
};

export default function VerdictSeal({ score }: VerdictSealProps) {
  const name = ratingName(score);
  const colors = SEAL_COLORS[name] || SEAL_COLORS["Muddled"];

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer decorative ring with notches */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const innerR = 68;
        const outerR = 76;
        const x1 = 80 + innerR * Math.cos(angle);
        const y1 = 80 + innerR * Math.sin(angle);
        const x2 = 80 + outerR * Math.cos(angle);
        const y2 = 80 + outerR * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors.ring}
            strokeWidth="1.5"
            opacity="0.4"
          />
        );
      })}
      {/* Outer circle */}
      <circle cx="80" cy="80" r="72" stroke={colors.ring} strokeWidth="2" fill="none" />
      {/* Inner circle */}
      <circle cx="80" cy="80" r="62" stroke={colors.ring} strokeWidth="1" fill={colors.bg} />
      {/* Score number */}
      <text
        x="80"
        y="72"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-garamond), Georgia, serif"
        fontSize="42"
        fontWeight="600"
        fill={colors.text}
      >
        {score}
      </text>
      {/* Divider line */}
      <line x1="50" y1="88" x2="110" y2="88" stroke={colors.ring} strokeWidth="0.75" opacity="0.5" />
      {/* "out of 100" */}
      <text
        x="80"
        y="102"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="10"
        fontWeight="500"
        fill={colors.text}
        opacity="0.7"
        letterSpacing="0.1em"
      >
        OUT OF 100
      </text>
    </svg>
  );
}
