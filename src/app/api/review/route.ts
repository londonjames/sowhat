import { NextRequest, NextResponse } from "next/server";
import { getReview } from "@/lib/redis";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const data = await getReview(id);
  if (!data) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}
