import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

export async function saveReview(
  id: string,
  data: Record<string, unknown>
): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;
  try {
    await r.set(`sowhat:${id}`, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export async function getReview(
  id: string
): Promise<Record<string, unknown> | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    const data = await r.get<string>(`sowhat:${id}`);
    if (!data) return null;
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return null;
  }
}
