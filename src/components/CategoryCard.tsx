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
        <p className="mt-3 text-2xl font-semibold leading-snug text-foreground">
          {category.headline}
        </p>
      )}

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            What&rsquo;s happening
          </p>
          <p className="mt-3 text-lg leading-relaxed text-gray">
            {category.feedback}
          </p>
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
            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Action Items
          </p>
          <ol className="mt-3 space-y-3">
            {actions.map((action, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-lg leading-relaxed text-gray"
              >
                <span className="shrink-0 font-semibold text-foreground">
                  {i + 1}.
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
