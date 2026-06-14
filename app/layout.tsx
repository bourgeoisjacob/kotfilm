import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Providers from "@/components/auth/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchlistSync from "@/components/watchlist/WatchlistSync";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kotfilm — Catnip for Soviet Film Lovers",
  description:
    "A curated guide to Soviet cinema, built on public and freely-licensed sources.",
  icons: { icon: "/kotfilm-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={display.variable}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <WatchlistSync />
        </Providers>
      </body>
    </html>
  );
}
