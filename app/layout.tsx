import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Oxanium } from "next/font/google";
import { site } from "@/content";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
/** Display face for the hero name. Swap this one import to try a different look. */
const display = Oxanium({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display-face" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.roles[0]}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.roles[0]}`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} ${display.variable}`}>
      <head>
        {/* Without JS, skip the reveal-on-scroll so content is never stuck invisible. */}
        <noscript>
          <style>{`.reveal,.split-char{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
