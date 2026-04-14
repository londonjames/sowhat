import Anthropic from "@anthropic-ai/sdk";
import { EvaluationResult, calculateOverall, ratingName } from "./types";

const SYSTEM_PROMPT = `You are a senior document reviewer with decades of experience evaluating business documents: board decks, strategy memos, investment proposals, client deliverables, internal communications, and presentations.

Your job is to evaluate a document across three dimensions and provide honest, specific feedback. You are not a cheerleader. You are a trusted colleague who tells the truth, kindly but directly.

## Your Task

Read the document carefully. Then produce a structured evaluation using the submit_evaluation tool.

### Part 1: The Main So What

Identify the overarching message in one sentence (maximum 25 words — it must fit on two lines of a page). Then list 2-3 supporting takeaways as bullet points. Each bullet must be one sentence, maximum 20 words. Brevity is non-negotiable.

If the document is confusing, say so honestly and list what you can piece together.

### Part 2: Verdict

Write a single punchy sentence that captures the quality of the document. This should feel like a confident editorial judgment — direct and memorable. Examples of tone: "A solid proposal that buries its best argument on page 3." or "Clear intent, but the data does the heavy lifting while the narrative coasts."

### Part 3: Scoring

Rate the document on three categories, each on a scale of 0.5 to 5.0 in 0.5 increments:

**Intent (weight: 20%)** — Is it immediately clear what this document is trying to achieve and what it wants from the reader?

**Delivery (weight: 50%)** — Does the document actually make the case? Is the argument complete, supported, and does it land?

**Narrative (weight: 30%)** — Is there a clear story pulling you through? Does every section earn its place?

### Part 4: Category Feedback

For each category, provide:
1. A headline: a single bold sentence (max 15 words) that captures the judgment for this category. Like a newspaper headline — punchy and direct.
2. Current state (diagnosis): 2-3 observations about the current state. Each should be one sentence, 15-25 words. These display as bullet points in a narrow column.
3. Action items (prescription): 1-3 specific, numbered action items. Each must start with a SHORT BOLDED PREFIX IN CAPS followed by a colon, then the detail. Example: "LEAD WITH THE DECISION: Move the break-even timeline and investment requirements to page 1." The prefix should be 2-5 words that capture the action. If the category scores 4.5+, a single item like "NO CHANGES NEEDED: This section is strong as-is." is fine.

## Important

- Be calibrated. A competent, well-researched document with real data and clear structure should score 3.5-4. Reserve 2-3 for documents with genuine structural problems. A 4.5+ means outstanding work that needs almost no revision. Not every document needs a crisp "ask" — strategy discussions, alignment memos, and informational briefings are valid formats.
- Be specific. Reference actual content from the document.
- Be concise. Every sentence should earn its place. No filler.
- Use half-star increments only: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0.`;

const EVALUATION_TOOL: Anthropic.Messages.Tool = {
  name: "submit_evaluation",
  description: "Submit the structured evaluation of the document",
  input_schema: {
    type: "object" as const,
    required: [
      "mirror_lead",
      "mirror_bullets",
      "verdict",
      "intent",
      "delivery",
      "narrative",
      "intent_headline",
      "intent_feedback",
      "intent_improvement",
      "delivery_headline",
      "delivery_feedback",
      "delivery_improvement",
      "narrative_headline",
      "narrative_feedback",
      "narrative_improvement",
    ],
    properties: {
      mirror_lead: {
        type: "string" as const,
        description:
          "The overarching message in ONE sentence, MAXIMUM 25 words. Must fit on two lines.",
      },
      mirror_bullets: {
        type: "array" as const,
        items: { type: "string" as const },
        description:
          "2-3 supporting takeaways. Each MUST be one sentence, MAXIMUM 20 words each.",
      },
      verdict: {
        type: "string" as const,
        description:
          "A single punchy sentence capturing the quality of the document",
      },
      intent: {
        type: "number" as const,
        description: "Intent score from 0.5 to 5.0 in 0.5 increments",
      },
      delivery: {
        type: "number" as const,
        description: "Delivery score from 0.5 to 5.0 in 0.5 increments",
      },
      narrative: {
        type: "number" as const,
        description: "Narrative score from 0.5 to 5.0 in 0.5 increments",
      },
      intent_headline: {
        type: "string" as const,
        description: "Bold 1-sentence headline for Intent (max 15 words)",
      },
      intent_feedback: {
        type: "string" as const,
        description: "2-3 sentences (15-25 words each) on Intent's current state",
      },
      intent_improvement: {
        type: "string" as const,
        description: "1-2 specific prescriptions for improving Intent",
      },
      intent_actions: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "1-3 action items for Intent. Each MUST start with BOLD CAPS PREFIX followed by colon. Max 25 words each.",
      },
      delivery_headline: {
        type: "string" as const,
        description: "Bold 1-sentence headline for Delivery (max 15 words)",
      },
      delivery_feedback: {
        type: "string" as const,
        description: "2-3 sentences (15-25 words each) on Delivery's current state",
      },
      delivery_improvement: {
        type: "string" as const,
        description: "1-2 specific prescriptions for improving Delivery",
      },
      delivery_actions: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "1-3 action items for Delivery. Each MUST start with BOLD CAPS PREFIX followed by colon. Max 25 words each.",
      },
      narrative_headline: {
        type: "string" as const,
        description: "Bold 1-sentence headline for Narrative (max 15 words)",
      },
      narrative_feedback: {
        type: "string" as const,
        description: "2-3 sentences (15-25 words each) on Narrative's current state",
      },
      narrative_improvement: {
        type: "string" as const,
        description: "1-2 specific prescriptions for improving Narrative",
      },
      narrative_actions: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "1-3 action items for Narrative. Each MUST start with BOLD CAPS PREFIX followed by colon. Max 25 words each.",
      },
    },
  },
};

function clampScore(score: number): number {
  const clamped = Math.max(0.5, Math.min(5.0, score));
  return Math.round(clamped * 2) / 2;
}

export async function evaluateDocument(
  text: string
): Promise<EvaluationResult> {
  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: [EVALUATION_TOOL],
    tool_choice: { type: "tool", name: "submit_evaluation" },
    messages: [
      {
        role: "user",
        content: `Please evaluate this document:\n\n${text}`,
      },
    ],
  });

  const toolBlock = message.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock =>
      block.type === "tool_use"
  );
  if (!toolBlock) {
    throw new Error("No evaluation returned from Claude");
  }

  const input = toolBlock.input as Record<string, unknown>;

  const intentScore = clampScore(input.intent as number);
  const deliveryScore = clampScore(input.delivery as number);
  const narrativeScore = clampScore(input.narrative as number);
  const overall = calculateOverall(intentScore, deliveryScore, narrativeScore);

  return {
    mirror_lead: input.mirror_lead as string,
    mirror_bullets: input.mirror_bullets as string[],
    verdict: input.verdict as string,
    scores: {
      intent: intentScore,
      delivery: deliveryScore,
      narrative: narrativeScore,
    },
    overall,
    rating_name: ratingName(overall),
    categories: [
      {
        name: "Intent",
        score: intentScore,
        headline: input.intent_headline as string,
        feedback: input.intent_feedback as string,
        improvement: input.intent_improvement as string,
        actions: (input.intent_actions as string[]) || [],
      },
      {
        name: "Delivery",
        score: deliveryScore,
        headline: input.delivery_headline as string,
        feedback: input.delivery_feedback as string,
        improvement: input.delivery_improvement as string,
        actions: (input.delivery_actions as string[]) || [],
      },
      {
        name: "Narrative",
        score: narrativeScore,
        headline: input.narrative_headline as string,
        feedback: input.narrative_feedback as string,
        improvement: input.narrative_improvement as string,
        actions: (input.narrative_actions as string[]) || [],
      },
    ],
  };
}
