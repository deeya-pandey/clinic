import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { clinic, configuredSiteUrl, siteUrl } from "@/content/clinic";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${clinic.name}, Butwal`,
  description: `Dermatology and skin and hair consultations at ${clinic.name}, ${clinic.address.full}.`,
  // Preview builds without a public URL stay out of search results.
  robots: configuredSiteUrl ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#12433d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col pb-14 sm:pb-0">
        <a
          href="#main"
          className="sr-only rounded-md bg-forest px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
