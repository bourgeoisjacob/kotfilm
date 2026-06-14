import { AlertTriangle, Archive, BadgeCheck, Boxes } from "lucide-react";

// Trust levels mirror WatchLink.sourceType in prisma/schema.prisma. An unverified
// source must never be presented as official (see CLAUDE.md copyright rules).
const TRUST = {
  OFFICIAL: {
    label: "Official source",
    icon: BadgeCheck,
    className: "bg-kot-gold text-kot-ink",
  },
  ARCHIVE: {
    label: "Archive",
    icon: Archive,
    className: "bg-kot-tan text-kot-ink",
  },
  PUBLIC_REPOSITORY: {
    label: "Public repository",
    icon: Boxes,
    className: "bg-kot-tan text-kot-ink",
  },
  UNVERIFIED: {
    label: "Source needs verification",
    icon: AlertTriangle,
    className: "border border-kot-red bg-kot-creamHi text-kot-red",
  },
} as const;

export type TrustLevel = keyof typeof TRUST;

export function trustLabel(sourceType: string): string {
  return (TRUST[sourceType as TrustLevel] ?? TRUST.UNVERIFIED).label;
}

export default function TrustBadge({ sourceType }: { sourceType: string }) {
  const trust = TRUST[sourceType as TrustLevel] ?? TRUST.UNVERIFIED;
  const Icon = trust.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${trust.className}`}
    >
      <Icon aria-hidden className="h-3.5 w-3.5" />
      {trust.label}
    </span>
  );
}
