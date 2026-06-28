import type { MetadataRoute } from "next";

// Web app manifest — makes Kotfilm installable (home-screen icon, splash,
// standalone window). Served by Next at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kotfilm — Catnip for Soviet Film Lovers",
    short_name: "Kotfilm",
    description:
      "A curated guide to Soviet cinema, built on public and freely-licensed sources.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#efe4cd",
    theme_color: "#9e2b25",
    categories: ["entertainment", "education", "books"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
