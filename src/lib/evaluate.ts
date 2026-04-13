import Anthropic from "@anthropic-ai/sdk";
import { EvaluationResult, calculateOverall } from "./types";

const SYSTEM_PROMPT = `You are a senior document reviewer with decades of experience evaluating business documents: board decks, strategy memos, investment proposals, client deliverables, internal communications, and presentations.

Your job is to evaluate a document across three dimensions and provide honest, specific feedback. You are not a cheerleader. You are a trusted colleague who tells the truth, kindly but directly.

## Your Task

Read the document carefully. Then produce a structured evaluation using the submit_evaluation tool.

### Part 1: The Mirror

Write 3-5 sentences as though you are a first-time reader reflecting back what you took away. What is this document about? What is it asking you to do or believe? What are the two or three points that come through most strongly?

Be neutral. No judgment. Just reflect what lands. If the document is confusing, reflect that confusion honestly: "I'm not entirely sure what this document is asking me to do. It seems to be about X, but it could also be about Y."

### Part 2: Scoring

Rate the document on three categories, each on a scale of 0.5 to 5.0 in 0.5 increments:

**Intent (weight: 20%)** — Is it immediately clear what this document is trying to achieve and what it wants from the reader? Within the first few sentences, can you tell what it's for?

Scoring guide:
- 0.5-1: The document's purpose is unclear. A reader would struggle to explain what it's for or what's being asked of them.
- 1.5-2: There are hints of purpose, but it takes significant effort to piece together. The goal is implicit rather than stated.
- 2.5-3: The purpose is discernible but could be sharper. A reader could explain the goal, but might get some nuance wrong.
- 3.5-4: The purpose is clear. A reader knows what the document is for and what's expected of them. Minor room for improvement.
- 4.5-5: Crystal clear from the opening. A reader could state the exact purpose and their role after the first few sentences.

**Delivery (weight: 50%)** — Does the document actually make the case? Is the argument complete, supported, and does it land?

Scoring guide:
- 0.5-1: The argument is missing, incoherent, or fundamentally unsupported. Key claims lack evidence.
- 1.5-2: There's an argument, but it has significant gaps. Important counterpoints are ignored, evidence is thin, or the logic doesn't hold.
- 2.5-3: The argument is present and partially supported. Some claims land well, others need more evidence or tighter reasoning.
- 3.5-4: The argument is solid and well-supported. Most claims have evidence. A few areas could be strengthened but the case fundamentally lands.
- 4.5-5: Airtight. Every claim is supported, counterpoints are addressed, the logic flows, and the reader is convinced.

**Narrative (weight: 30%)** — Is there a clear story pulling you through? Does every section earn its place and build toward the point?

Scoring guide:
- 0.5-1: No discernible narrative structure. The document reads as disconnected pieces. Significant sections don't serve the goal.
- 1.5-2: There's a loose structure, but sections feel out of order or disconnected. Several paragraphs don't earn their place.
- 2.5-3: There's a narrative thread, but it frays in places. Some transitions are weak and a few sections could be cut or moved.
- 3.5-4: Strong narrative arc. The document flows well, sections build on each other, and most content earns its place. Minor tightening needed.
- 4.5-5: Masterful structure. Every section earns its place, transitions are seamless, and the reader is pulled through effortlessly. The story serves the argument perfectly.

### Part 3: Category Feedback

For each category, provide:
1. A specific assessment of what's working and what isn't. Reference actual content from the document. Be concrete.
2. Specific, actionable improvement suggestions. Not "make it clearer" but "move the recommendation to the opening" or "the data on page 3 supports your case but isn't connected to your conclusion."

## Important

- Be honest. A mediocre document should score 2-3, not 3.5-4. Reserve 4.5+ for genuinely excellent work.
- Be specific. Every piece of feedback should reference something concrete in the document.
- Use half-star increments only: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0.`;

const EVALUATION_TOOL: Anthropic.Messages.Tool = {
  name: "submit_evaluation",
  description: "Submit the structured evaluation of the document",
  input_schema: {
    type: "object" as const,
    required: ["mirror", "intent", "delivery", "narrative"],
    properties: {
      mirror: {
        type: "string" as const,
        description:
          "3-5 sentence first-time reader reflection of what the document communicates",
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
      intent_feedback: {
        type: "string" as const,
        description:
          "Specific feedback on what's working and what isn't for Intent",
      },
      intent_improvement: {
        type: "string" as const,
        description:
          "Specific, actionable suggestions for improving Intent",
      },
      delivery_feedback: {
        type: "string" as const,
        description:
          "Specific feedback on what's working and what isn't for Delivery",
      },
      delivery_improvement: {
        type: "string" as const,
        description:
          "Specific, actionable suggestions for improving Delivery",
      },
      narrative_feedback: {
        type: "string" as const,
        description:
          "Specific feedback on what's working and what isn't for Narrative",
      },
      narrative_improvement: {
        type: "string" as const,
        description:
          "Specific, actionable suggestions for improving Narrative",
      },
    },
  },
};

function clampScore(score: number): number {
  const clamped = Math.max(0.5, Math.min(5.0, score));
  return Math.round(clamped * 2) / 2; // Round to nearest 0.5
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

  return {
    mirror: input.mirror as string,
    scores: {
      intent: intentScore,
      delivery: deliveryScore,
      narrative: narrativeScore,
    },
    overall: calculateOverall(intentScore, deliveryScore, narrativeScore),
    categories: [
      {
        name: "Intent",
        score: intentScore,
        feedback: input.intent_feedback as string,
        improvement: input.intent_improvement as string,
      },
      {
        name: "Delivery",
        score: deliveryScore,
        feedback: input.delivery_feedback as string,
        improvement: input.delivery_improvement as string,
      },
      {
        name: "Narrative",
        score: narrativeScore,
        feedback: input.narrative_feedback as string,
        improvement: input.narrative_improvement as string,
      },
    ],
  };
}
