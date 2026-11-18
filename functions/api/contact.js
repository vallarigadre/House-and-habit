// Contact page form. Saves each message in D1; they show under "Messages" on /admin/.
import { ensureTables } from "./_db.js";
import { onRequestGet as statsGate } from "./stats.js";

const EMAIL = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,}$/i;
const clip = (v, n) => (v || "").toString().trim().slice(0, n);

export async function onRequestPost({ request, env }) {
  const sent = new URL("/contact/sent/", request.url);
  try {
    const f = await request.formData();
    if (clip(f.get("company"), 10)) return Response.redirect(sent, 303); // honeypot
    const email = clip(f.get("email"), 200).toLowerCase();
    const message = clip(f.get("message"), 4000);
    if (!EMAIL.test(email) || !message) return Response.redirect(new URL("/contact/?error=1", request.url), 303);
    await ensureTables(env.DB);
    await env.DB.prepare(`INSERT INTO messages (created,name,email,topic,message) VALUES (?,?,?,?,?)`)
      .bind(new Date().toISOString(), clip(f.get("name"), 100), email, clip(f.get("topic"), 60), message).run();
  } catch (e) {
    console.error("contact failed", e);
  }
  return Response.redirect(sent, 303);
}

// The admin page reads messages here (needs the stats password).
export async function onRequestGet(ctx) {
  const gate = await statsGate(ctx);
  if (gate.status !== 200) return gate;
  const { results } = await ctx.env.DB.prepare(`SELECT created,name,email,topic,message FROM messages ORDER BY created DESC LIMIT 200`).all();
  return Response.json({ messages: results }, { headers: { "cache-control": "no-store" } });
}
