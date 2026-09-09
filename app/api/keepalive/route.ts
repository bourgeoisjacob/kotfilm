import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Pinged daily by a Vercel Cron (see vercel.json "crons") to keep the free-tier
// Supabase database from pausing after ~7 idle days. Runs one trivial read.
export async function GET() {
  try {
    const films = await prisma.film.count();
    return Response.json({ ok: true, films });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "db error" },
      { status: 500 },
    );
  }
}
