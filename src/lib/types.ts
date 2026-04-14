export interface CategoryEvaluation {
  name: string;
  score: number; // 0.5-5.0 in 0.5 increments
  headline: string;
  feedback: string;
  improvement: string; // kept for backward compat
  actions: string[]; // 1-3 numbered action items
}

export interface EvaluationResult {
  mirror_lead: string;
  mirror_bullets: string[];
  verdict: string;
  scores: {
    intent: number;
    delivery: number;
    narrative: number;
  };
  overall: number;
  rating_name: string;
  categories: CategoryEvaluation[];
}

export function calculateOverall(
  intent: number,
  delivery: number,
  narrative: number
): number {
  return Math.round((intent / 5) * 20 + (delivery / 5) * 50 + (narrative / 5) * 30);
}

export function ratingName(score: number): string {
  if (score >= 90) return "Crystal Clear";
  if (score >= 80) return "On Point";
  if (score >= 70) return "Getting There";
  if (score >= 60) return "Hazy";
  if (score >= 40) return "Muddled";
  if (score >= 20) return "Lost";
  return "Nope";
}

export function scoreColor(score: number): string {
  if (score >= 80) return "var(--score-green)";
  if (score >= 60) return "var(--score-amber)";
  return "var(--score-red)";
}
