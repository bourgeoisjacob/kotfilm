import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Kotfilm",
  description: "About Kotfilm.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
        About
      </h1>
      {/* Content intentionally left blank for now. */}
    </main>
  );
}
