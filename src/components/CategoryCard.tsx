import StarRating from "./StarRating";
import { CategoryEvaluation } from "@/lib/types";

const CATEGORY_NUMBER: Record<string, string> = {
  Intent: "(1)",
  Delivery: "(2)",
  Narrative: "(3)",
};

interface CategoryCardProps {
  category: CategoryEvaluation;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const actions = category.actions?.length
    ? category.actions
    : category.improvement
      ? [category.improvement]
      : [];

  // Parse feedback into bullet points (split on sentences)
  const feedbackBullets = category.feedback
    ? category.feedback
        .split(/(?<=\.)\s+/)
        .filter((s) => s.trim().length > 10)
    : [];

  return (
    <section className="py-6">
      <div className="flex items-center gap-4">
        <h2
          className="text-lg uppercase tracking-[0.2em] text-gray-light"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {CATEGORY_NUMBER[category.name]} {category.name}
        </h2>
        <StarRating rating={category.score} />
      </div>

      {category.headline && (
        <p className="mt-3 text-xl font-semibold leading-snug text-foreground">
          {category.headline}
        </p>
      )}

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
        <div>
          <p
            className="text-xs uppercase tracking-[0.15em] text-gray-light"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Current State
          </p>
          <ul className="mt-3 space-y-2">
            {feedbackBullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-lg leading-relaxed text-gray"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-light" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start pt-8 text-gray-border">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M4 10h12M12 5l5 5-5 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <p
            className="text-xs uppercase tracking-[0.15em] text-gray-light"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Action Items
          </p>
          <ol className="mt-3 space-y-3">
            {actions.map((action, i) => {
              // Parse "BOLD PREFIX: rest of text" pattern
              const colonIdx = action.indexOf(":");
              const hasBoldPrefix =
                colonIdx > 0 &&
                colonIdx < 60 &&
                action.slice(0, colonIdx).toUpperCase() ===
                  action.slice(0, colonIdx);

              return (
                <li
                  key={i}
                  className="flex gap-2.5 text-lg leading-relaxed text-gray"
                >
                  <span className="shrink-0 font-semibold text-foreground">
                    {i + 1}.
                  </span>
                  {hasBoldPrefix ? (
                    <span>
                      <span className="font-bold text-foreground">
                        {action.slice(0, colonIdx + 1)}
                      </span>{" "}
                      {action.slice(colonIdx + 1).trim()}
                    </span>
                  ) : (
                    action
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
