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

      <p className="mt-3 text-2xl font-semibold leading-snug text-foreground">
        {category.headline}
      </p>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-light">
            What&rsquo;s happening
          </p>
          <p className="mt-2 text-base leading-relaxed text-gray">
            {category.feedback}
          </p>
        </div>

        <div className="flex items-center pt-6 text-gray-border">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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
