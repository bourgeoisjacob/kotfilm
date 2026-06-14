"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export type FilterOption = { value: string; label: string };

type Props = {
  decades: number[];
  genres: FilterOption[];
  directors: FilterOption[];
  actors: FilterOption[];
  studios: FilterOption[];
  subtitles: FilterOption[];
};

const SORTS: FilterOption[] = [
  { value: "title", label: "Title (A–Z)" },
  { value: "year", label: "Year" },
  { value: "director", label: "Director" },
  { value: "classics", label: "Starter classics" },
  { value: "recent", label: "Recently added" },
];

const selectClass =
  "rounded-md border border-kot-line bg-kot-creamHi px-3 py-2 text-sm text-kot-ink focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30";

export default function CatalogueFilters({
  decades,
  genres,
  directors,
  actors,
  studios,
  subtitles,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const commit = (params: URLSearchParams) => {
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    commit(params);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParam("q", query.trim());
  };

  const clearAll = () => {
    setQuery("");
    commit(new URLSearchParams());
  };

  const current = (key: string) => searchParams.get(key) ?? "";
  const hasFilters = [...searchParams.keys()].length > 0;

  return (
    <section
      aria-label="Search, filter, and sort"
      className="flex flex-col gap-4 rounded-lg border border-kot-line bg-kot-cream p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={submitSearch} role="search" className="relative flex-1">
          <label htmlFor="catalogue-search" className="sr-only">
            Search films, directors, actors
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kot-char/60"
          />
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search films, directors, actors…"
            className="w-full rounded-md border border-kot-line bg-kot-creamHi py-2 pl-9 pr-3 text-sm text-kot-ink placeholder:text-kot-char/55 focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30"
          />
        </form>

        <label className="flex items-center gap-2 text-sm text-kot-ink">
          <span className="font-display uppercase tracking-wider text-kot-char">
            Sort
          </span>
          <select
            aria-label="Sort films"
            className={selectClass}
            value={current("sort") || "title"}
            onChange={(e) => setParam("sort", e.target.value === "title" ? "" : e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          label="Decade"
          value={current("decade")}
          onChange={(v) => setParam("decade", v)}
          options={decades.map((d) => ({ value: String(d), label: `${d}s` }))}
        />
        <Dropdown
          label="Genre"
          value={current("genre")}
          onChange={(v) => setParam("genre", v)}
          options={genres}
        />
        <Dropdown
          label="Director"
          value={current("director")}
          onChange={(v) => setParam("director", v)}
          options={directors}
        />
        <Dropdown
          label="Actor"
          value={current("actor")}
          onChange={(v) => setParam("actor", v)}
          options={actors}
        />
        <Dropdown
          label="Studio"
          value={current("studio")}
          onChange={(v) => setParam("studio", v)}
          options={studios}
        />
        <Dropdown
          label="Subtitles"
          value={current("subtitle")}
          onChange={(v) => setParam("subtitle", v)}
          options={subtitles}
        />

        <label className="flex items-center gap-2 text-sm text-kot-ink">
          <input
            type="checkbox"
            className="h-4 w-4 accent-kot-red"
            checked={current("watch") === "1"}
            onChange={(e) => setParam("watch", e.target.checked ? "1" : "")}
          />
          Available to watch
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 rounded-md border border-kot-line px-3 py-2 text-sm text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red"
          >
            <X aria-hidden className="h-3.5 w-3.5" />
            Clear
          </button>
        )}

        <span
          aria-live="polite"
          className={`text-xs uppercase tracking-wider text-kot-char/70 ${
            isPending ? "opacity-100" : "opacity-0"
          }`}
        >
          Updating…
        </span>
      </div>
    </section>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-kot-ink">
      <span className="font-display uppercase tracking-wider text-kot-char">
        {label}
      </span>
      <select
        aria-label={label}
        className={selectClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
