"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

// Lets the viewer override the auto-detected region so watch links point at a
// copy that plays where they are (some official uploads are geo-blocked).
export default function RegionSelector({
  detectedCountry,
  override,
}: {
  detectedCountry: string | null;
  override: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const set = (value: string) => {
    if (value) document.cookie = `kf_region=${value}; path=/; max-age=31536000; samesite=lax`;
    else document.cookie = "kf_region=; path=/; max-age=0; samesite=lax";
    startTransition(() => router.refresh());
  };

  return (
    <label
      title="Choose where you are watching from"
      className={`flex items-center gap-1 text-kot-ink/80 ${pending ? "opacity-60" : ""}`}
    >
      <Globe aria-hidden className="h-4 w-4 text-kot-char/70" />
      <span className="sr-only">Watching from</span>
      <select
        aria-label="Watching from"
        value={override}
        onChange={(e) => set(e.target.value)}
        className="cursor-pointer rounded border border-kot-line bg-kot-creamHi px-1.5 py-1 text-xs text-kot-ink focus:border-kot-red focus:outline-none"
      >
        <option value="">
          Auto{detectedCountry ? ` (${detectedCountry})` : ""}
        </option>
        <option value="eu">Europe / Russia</option>
        <option value="row">Outside Europe</option>
      </select>
    </label>
  );
}
