import type { Metadata, Viewport } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Providers from "@/components/auth/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WatchlistSync from "@/components/watchlist/WatchlistSync";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "Kotfilm",
  title: "Kotfilm — Catnip for Soviet Film Lovers",
  description:
    "A curated guide to Soviet cinema, built on public and freely-licensed sources.",
  icons: {
    icon: "/kotfilm-icon.png",
    apple: "/apple-icon-180.png",
  },
  appleWebApp: {
    capable: true,
    title: "Kotfilm",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#9e2b25",
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
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  );
}
