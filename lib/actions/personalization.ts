"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// A signed-out watchlist can hold at most this many slugs when merged into an
// account — bounds the work an authenticated request can trigger.
const mergeSlugsSchema = z
  .array(z.string().regex(/^[a-z0-9-]+$/).max(120))
  .max(200);

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

export async function setRating(filmId: string, value: number) {
  const userId = await requireUserId();
  const v = Math.max(1, Math.min(5, Math.round(value)));
  await prisma.rating.upsert({
    where: { userId_filmId: { userId, filmId } },
    update: { value: v },
    create: { userId, filmId, value: v },
  });
}

export async function clearRating(filmId: string) {
  const userId = await requireUserId();
  await prisma.rating.deleteMany({ where: { userId, filmId } });
}

export async function toggleFavorite(filmId: string) {
  const userId = await requireUserId();
  const existing = await prisma.favorite.findUnique({
    where: { userId_filmId: { userId, filmId } },
  });
  if (existing) await prisma.favorite.delete({ where: { id: existing.id } });
  else await prisma.favorite.create({ data: { userId, filmId } });
}

export async function toggleWatched(filmId: string) {
  const userId = await requireUserId();
  const existing = await prisma.watched.findUnique({
    where: { userId_filmId: { userId, filmId } },
  });
  if (existing) await prisma.watched.delete({ where: { id: existing.id } });
  else await prisma.watched.create({ data: { userId, filmId } });
}

export async function addWatchlist(filmId: string) {
  const userId = await requireUserId();
  const existing = await prisma.watchlistItem.findFirst({
    where: { userId, filmId },
  });
  if (!existing) await prisma.watchlistItem.create({ data: { userId, filmId } });
  revalidatePath("/watchlist");
}

export async function removeWatchlist(filmId: string) {
  const userId = await requireUserId();
  await prisma.watchlistItem.deleteMany({ where: { userId, filmId } });
  revalidatePath("/watchlist");
}

/** Merge a signed-out localStorage watchlist (slugs) into the account, once. */
export async function mergeLocalWatchlist(slugs: string[]) {
  const userId = await requireUserId();
  const parsed = mergeSlugsSchema.safeParse(slugs);
  if (!parsed.success) return;
  const cleanSlugs = Array.from(new Set(parsed.data));
  if (cleanSlugs.length === 0) return;

  const films = await prisma.film.findMany({
    where: { slug: { in: cleanSlugs } },
    select: { id: true },
  });
  const existing = await prisma.watchlistItem.findMany({
    where: { userId, filmId: { in: films.map((f) => f.id) } },
    select: { filmId: true },
  });
  const have = new Set(existing.map((e) => e.filmId));
  const toCreate = films.filter((f) => !have.has(f.id));

  if (toCreate.length > 0) {
    await prisma.$transaction(
      toCreate.map((f) =>
        prisma.watchlistItem.create({ data: { userId, filmId: f.id } }),
      ),
    );
  }
  revalidatePath("/watchlist");
}
