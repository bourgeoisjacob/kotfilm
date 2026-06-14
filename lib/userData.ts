import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { filmCardInclude } from "@/lib/queries";

/** The signed-in user's id, or null when signed out. */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export type FilmUserState = {
  inWatchlist: boolean;
  isFavorite: boolean;
  watched: boolean;
  rating: number | null;
};

/** The signed-in user's personalization for one film (null when signed out). */
export async function getFilmUserState(
  filmId: string,
): Promise<FilmUserState | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const [watchlist, favorite, watched, rating] = await Promise.all([
    prisma.watchlistItem.findFirst({ where: { userId, filmId } }),
    prisma.favorite.findUnique({ where: { userId_filmId: { userId, filmId } } }),
    prisma.watched.findUnique({ where: { userId_filmId: { userId, filmId } } }),
    prisma.rating.findUnique({ where: { userId_filmId: { userId, filmId } } }),
  ]);

  return {
    inWatchlist: !!watchlist,
    isFavorite: !!favorite,
    watched: !!watched,
    rating: rating?.value ?? null,
  };
}

/** Auth + the set of film slugs in the user's DB watchlist (for film cards). */
export async function getWatchlistContext(): Promise<{
  signedIn: boolean;
  savedSlugs: Set<string>;
}> {
  const userId = await getCurrentUserId();
  if (!userId) return { signedIn: false, savedSlugs: new Set() };

  const items = await prisma.watchlistItem.findMany({
    where: { userId },
    select: { film: { select: { slug: true } } },
  });
  return { signedIn: true, savedSlugs: new Set(items.map((i) => i.film.slug)) };
}

/** The signed-in user's favorites, ratings, and watched history (newest first). */
export async function getUserActivity(userId: string) {
  const [favorites, ratings, watched] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { film: { include: filmCardInclude } },
    }),
    prisma.rating.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { film: { include: filmCardInclude } },
    }),
    prisma.watched.findMany({
      where: { userId },
      orderBy: { watchedAt: "desc" },
      include: { film: { include: filmCardInclude } },
    }),
  ]);
  return { favorites, ratings, watched };
}

/** The signed-in user's watchlist, newest first, with minimal film data. */
export async function getDbWatchlist(userId: string) {
  return prisma.watchlistItem.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      filmId: true,
      film: {
        select: {
          slug: true,
          title: true,
          year: true,
          director: { select: { name: true } },
        },
      },
    },
  });
}
