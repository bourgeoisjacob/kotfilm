import { getJson } from "./http";

// Pulls structured film metadata from Wikidata's official API
// (Special:EntityData + wbgetentities for label resolution).
//
// Property map (verified against live entities):
//   P1476 title (original-language)   P57  director        P161 cast
//   P577  publication date            P495 country         P272 production company (studio)
//   P2047 runtime (minutes)           P18  image (Commons)  P345 IMDb id
//   P136  genre

export type WikidataFilm = {
  qid: string;
  title: string; // English label
  originalTitle?: string;
  year?: number;
  director?: string;
  cast: string[];
  country?: string;
  studio?: string;
  runtimeMinutes?: number;
  genres: string[];
  imageFile?: string; // Commons file name (no "File:" prefix)
  imdbId?: string;
  enwikiTitle?: string; // for the Wikipedia REST API
};

type Claim = {
  mainsnak?: { datavalue?: { value?: unknown } };
};
type Entity = {
  labels?: Record<string, { value: string }>;
  sitelinks?: Record<string, { title: string }>;
  claims?: Record<string, Claim[]>;
};

const firstClaimValue = (entity: Entity, prop: string): unknown =>
  entity.claims?.[prop]?.[0]?.mainsnak?.datavalue?.value;

const allEntityIds = (entity: Entity, prop: string): string[] =>
  (entity.claims?.[prop] ?? [])
    .map((c) => c.mainsnak?.datavalue?.value)
    .filter((v): v is { id: string } => typeof v === "object" && v !== null && "id" in v)
    .map((v) => v.id);

/** Resolve a batch of Q-ids to their English labels in one API call. */
async function resolveLabels(ids: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids)].slice(0, 50); // API caps at 50 ids/request
  if (unique.length === 0) return new Map();
  const url =
    `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json` +
    `&props=labels&languages=en&ids=${unique.join("|")}`;
  const data = await getJson<{ entities: Record<string, Entity> }>(url);
  const map = new Map<string, string>();
  for (const [id, ent] of Object.entries(data.entities)) {
    const label = ent.labels?.en?.value;
    if (label) map.set(id, label);
  }
  return map;
}

export async function fetchWikidataFilm(qid: string): Promise<WikidataFilm> {
  const data = await getJson<{ entities: Record<string, Entity> }>(
    `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`,
  );
  const entity = data.entities[qid];
  if (!entity) throw new Error(`Wikidata entity ${qid} not found`);

  const title = entity.labels?.en?.value;
  if (!title) throw new Error(`${qid} has no English label`);

  // Collect every referenced entity id, then resolve all labels at once.
  const directorId = allEntityIds(entity, "P57")[0];
  const castIds = allEntityIds(entity, "P161").slice(0, 8);
  const countryId = allEntityIds(entity, "P495")[0];
  const studioId = allEntityIds(entity, "P272")[0];
  const genreIds = allEntityIds(entity, "P136");
  const labels = await resolveLabels([
    ...(directorId ? [directorId] : []),
    ...castIds,
    ...(countryId ? [countryId] : []),
    ...(studioId ? [studioId] : []),
    ...genreIds,
  ]);

  const titleClaim = firstClaimValue(entity, "P1476") as
    | { text?: string }
    | undefined;
  const dateClaim = firstClaimValue(entity, "P577") as
    | { time?: string }
    | undefined;
  const runtimeClaim = firstClaimValue(entity, "P2047") as
    | { amount?: string }
    | undefined;

  const year = dateClaim?.time
    ? Number.parseInt(dateClaim.time.slice(1, 5), 10)
    : undefined;
  const runtimeMinutes = runtimeClaim?.amount
    ? Math.round(Number.parseFloat(runtimeClaim.amount))
    : undefined;

  return {
    qid,
    title,
    originalTitle: titleClaim?.text,
    year: Number.isNaN(year) ? undefined : year,
    director: directorId ? labels.get(directorId) : undefined,
    cast: castIds.map((id) => labels.get(id)).filter((n): n is string => !!n),
    country: countryId ? labels.get(countryId) : undefined,
    studio: studioId ? labels.get(studioId) : undefined,
    runtimeMinutes,
    genres: genreIds.map((id) => labels.get(id)).filter((n): n is string => !!n),
    imageFile: firstClaimValue(entity, "P18") as string | undefined,
    imdbId: firstClaimValue(entity, "P345") as string | undefined,
    enwikiTitle: entity.sitelinks?.enwiki?.title,
  };
}
