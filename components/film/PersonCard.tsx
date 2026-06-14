import Link from "next/link";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function PersonCard({
  name,
  href,
  role,
}: {
  name: string;
  href: string;
  role: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-kot-line bg-kot-cream p-3 transition-colors hover:border-kot-red"
    >
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-kot-char font-display text-sm font-semibold text-kot-creamHi"
      >
        {initials(name)}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
          {name}
        </span>
        <span className="text-xs uppercase tracking-wider text-kot-char/75">
          {role}
        </span>
      </span>
    </Link>
  );
}
