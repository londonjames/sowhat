export interface CategoryEvaluation {
  name: string;
  score: number; // 0.5-5.0 in 0.5 increments
  feedback: string;
  improvement: string;
}

export interface EvaluationResult {
  mirror: string;
  scores: {
    intent: number;
    delivery: number;
    narrative: number;
  };
  overall: number; // 0-100, calculated server-side
  categories: CategoryEvaluation[];
}

export function calculateOverall(intent: number, delivery: number, narrative: number): number {
  return Math.round((intent / 5) * 20 + (delivery / 5) * 50 + (narrative / 5) * 30);
}

export function scoreColor(score: number): string {
  if (score >= 80) return "var(--score-green)";
  if (score >= 60) return "var(--score-amber)";
  return "var(--score-red)";
}
