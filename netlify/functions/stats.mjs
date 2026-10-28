// Private stats for /admin/. Needs the admin password in the x-key header.
// To change the password, add an environment variable STATS_PASSWORD in Netlify
// (Site configuration, Environment variables). Until then the built-in password works.
import { createHash, timingSafeEqual } from "node:crypto";
import { collect } from "../lib/stats.mjs";

const BUILT_IN_HASH = "9e4cc6ef26418abbca511e6a6535bfbe283ec0da63183f7b5595123cb8b8cbe0";
const sha = (s) => createHash("sha256").update(s).digest();

function allowed(key) {
  if (!key) return false;
  const want = process.env.STATS_PASSWORD ? sha(process.env.STATS_PASSWORD) : Buffer.from(BUILT_IN_HASH, "hex");
  return timingSafeEqual(sha(key), want);
}

export default async (req) => {
  if (!allowed(req.headers.get("x-key") || "")) {
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: "wrong password" }, { status: 401 });
  }
  try {
    const data = await collect();
    return Response.json(data, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "could not read stats" }, { status: 500 });
  }
};

export const config = { path: "/api/stats" };
