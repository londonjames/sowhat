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
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light">
            What&rsquo;s happening
          </p>
          <p className="mt-2 text-base leading-relaxed text-gray">
            {category.feedback}
          </p>
        </div>

        <div className="flex items-start pt-6 text-gray-border">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light">
            What to do
          </p>
          <p className="mt-2 text-base leading-relaxed text-gray">
            {category.improvement}
          </p>
        </div>
      </div>
    </section>
  );
}
