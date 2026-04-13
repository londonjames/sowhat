import StarRating from "./StarRating";
import { CategoryEvaluation } from "@/lib/types";

const WEIGHTS: Record<string, string> = {
  Intent: "20%",
  Delivery: "50%",
  Narrative: "30%",
};

interface CategoryCardProps {
  category: CategoryEvaluation;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="rounded-xl border border-gray-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {category.name}
          </h3>
          <p className="text-xs text-gray-light">
            Weight: {WEIGHTS[category.name]}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={category.score} />
          <span className="text-sm text-gray">
            {category.score} / 5
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {category.feedback}
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium tracking-widest text-gray-light uppercase">
            How to Improve
          </h4>
          <p className="text-sm leading-relaxed text-foreground/90">
            {category.improvement}
          </p>
        </div>
      </div>
    </div>
  );
}
