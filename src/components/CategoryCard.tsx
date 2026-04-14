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
    <section className="py-5">
      <div className="flex items-center gap-4">
        <h2 className="text-base uppercase tracking-[0.2em] text-gray-light md:text-lg">
          {CATEGORY_NUMBER[category.name]} {category.name}
        </h2>
        <StarRating rating={category.score} />
      </div>

      {category.headline && (
        <p
          className="mt-3 text-2xl font-semibold leading-snug text-foreground"
          style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
        >
          {category.headline}
        </p>
      )}

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] gap-5 items-start">
        {/* Diagnosis */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light">
            What&rsquo;s happening
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-gray">
            {category.feedback}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-start pt-6 text-gray-border">
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

        {/* Action Items */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light">
            Action Items
          </p>
          <ol className="mt-2 space-y-2">
            {actions.map((action, i) => (
              <li
                key={i}
                className="flex gap-2 text-[0.95rem] leading-relaxed text-gray"
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
