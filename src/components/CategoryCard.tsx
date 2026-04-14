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
    <div>
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-medium tracking-[0.2em] text-gray-light uppercase">
          {CATEGORY_NUMBER[category.name]} {category.name}
        </h3>
        <StarRating rating={category.score} />
      </div>

      <p className="mt-3 text-base leading-relaxed text-foreground/80">
        {category.feedback}
      </p>

      <div className="mt-4">
        <h4 className="text-xs font-medium tracking-[0.15em] text-gray-light uppercase">
          How to Improve
        </h4>
        <p className="mt-2 text-base leading-relaxed text-foreground/80">
          {category.improvement}
        </p>
      </div>
    </div>
  );
}
