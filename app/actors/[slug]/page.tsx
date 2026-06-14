import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PersonProfile from "@/components/people/PersonProfile";
import { getPersonWithFilms } from "@/lib/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPersonWithFilms(slug);
  if (!data) return { title: "Actor not found — Kotfilm" };
  return {
    title: `${data.person.name} — Actor — Kotfilm`,
    description: `Films featuring ${data.person.name} in the Kotfilm guide to Soviet cinema.`,
  };
}

export default async function ActorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getPersonWithFilms(slug);
  if (!data || data.actedIn.length === 0) notFound();

  return <PersonProfile data={data} role="actor" />;
}
