"use client";

import { useId } from "react";

interface StarRatingProps {
  rating: number; // 0.5-5.0 in 0.5 steps
}

export default function StarRating({ rating }: StarRatingProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill =
          rating >= star ? "full" : rating >= star - 0.5 ? "half" : "empty";
        return (
          <Star key={star} fill={fill} clipId={`${id}-star-${star}`} />
        );
      })}
    </div>
  );
}

function Star({
  fill,
  clipId,
}: {
  fill: "full" | "half" | "empty";
  clipId: string;
}) {
  const path =
    "M10 1.5l2.47 5.01L18.5 7.4l-4.25 4.14 1 5.83L10 14.48l-5.25 2.89 1-5.83L1.5 7.4l6.03-.89L10 1.5z";
  const gold = "var(--star-gold)";
  const dim = "var(--gray-border)";

  if (fill === "full") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d={path} fill={gold} stroke={gold} strokeWidth="1" />
      </svg>
    );
  }

  if (fill === "half") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="10" height="20" />
          </clipPath>
        </defs>
        <path d={path} fill={gold} clipPath={`url(#${clipId})`} />
        <path d={path} fill="none" stroke={gold} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={path} fill="none" stroke={dim} strokeWidth="1" />
    </svg>
  );
}
