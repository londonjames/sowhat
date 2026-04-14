import { NextRequest, NextResponse } from "next/server";
import { evaluateDocument } from "@/lib/evaluate";
import { saveReview } from "@/lib/redis";

export const maxDuration = 60;

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB (Vercel serverless limit)
const MIN_TEXT_LENGTH = 100;
const MAX_TEXT_LENGTH = 50_000;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let documentText: string;
    let truncated = false;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 4.5MB." },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      try {
        const { extractText } = await import("@/lib/extract");
        documentText = await extractText(buffer, file.name);
      } catch {
        return NextResponse.json(
          {
            error:
              "Couldn't extract text from this file. Try pasting the content directly.",
          },
          { status: 400 }
        );
      }
    } else {
      const body = await request.json();
      if (!body.text || typeof body.text !== "string") {
        return NextResponse.json(
          { error: "No text provided" },
          { status: 400 }
        );
      }
      documentText = body.text;
    }

    if (documentText.trim().length < MIN_TEXT_LENGTH) {
      return NextResponse.json(
        {
          error:
            "Document is too short to evaluate meaningfully. Please provide at least 100 characters.",
        },
        { status: 400 }
      );
    }

    if (documentText.length > MAX_TEXT_LENGTH) {
      documentText = documentText.slice(0, MAX_TEXT_LENGTH);
      truncated = true;
    }

    const evaluation = await evaluateDocument(documentText);

    // Generate a short ID and persist to Redis
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    await saveReview(id, {
      evaluation,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ evaluation, truncated, id });
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Sorry, this evaluation didn't generate. Please try again." },
      { status: 500 }
    );
  }
}
